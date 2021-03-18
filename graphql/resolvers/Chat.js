const { AuthenticationError ,UserInputError } = require('apollo-server');

const Chat=require('../../models/Chat.js');
const User=require('../../models/User.js');
const checkAuth = require('../../util/check-auth');

module.exports ={
    Query:{
        async getChats(){
            try{
                const chats=await Chat.find();
                return chats;
            }
            catch(err){
                throw new Error(err);
            }
        },
        async getChat(_,{roomId}){
            try{
                const chat=await Chat.findById(roomId);
                
                if(chat){
                    return chat;
                }
                else throw new Error("Phong nay khong ton tai")
                
            }
            catch(err){
                throw new Error(err);
            }
        },
        async getRoomChat(_,{username}){
            try{
                const from=await Chat.find({from:username});
                const to=await Chat.find({to:username});

                for(var i=0;i<to.length;i++){
                    var tam=to[i].to                   
                    to[i].to=to[i].from;
                    to[i].from=tam;
                }   
                const chat=from.concat(to);

                if(chat){
                    return chat;
                }
                else throw new Error("nguoi dung nay k ton tai")
                
            }
            catch(err){
                throw new Error(err);
            }
        },
        
    },
    Mutation:{
        async createRoomChat(_, { username }, context){
            const user = checkAuth(context);
           /*  console.log(user)      */      
            try {
                const to = await User.findOne({username});

                if(to){
                    const newRoom = new Chat({
                        from:user.username,
                        to:to.username,                       
                      });
                    
                    const room = await newRoom.save();
                    
                    context.pubsub.publish('NEW_ROOMCHAT', {
                        newRoom: room
                    });
                    return room;
                }
                else{
                  throw new Error("Không tìm thấy người dùng này")
                }
          } catch (error) {
            throw new Error(err)
          }
            

        },
        async createContentChat(_,{roomId,content},context){
            const {username}=checkAuth(context);
            if(content.trim()===''){
                throw new Error('Nội dung chat không được để trống');
            }
            const chat=await Chat.findById(roomId)
            console.log(chat);
    
            if(chat){
                chat.content.push({
                    username,
                    createdAt: new Date().toISOString(),
                    content,
                })
                await chat.save();
                return chat;
            }
            else{
                throw new Error('Không tìm thấy id phòng')
            }
        }
    },
    
   
};
