
const GroupChat=require('../../models/GroupChat');
const checkAuth = require('../../util/check-auth');

module.exports={
    Query:{
        async getGroups(){
             try{
                const groups=await GroupChat.find();
                return groups;
            }
            catch(err){
                throw new Error(err);
            }
        },
        async getGroup(_,{groupId}){
            try{
                const group=await GroupChat.findById(groupId);
                
                if(group){
                    return group;
                }
                else throw new Error("Phong nay khong ton tai")
                
            }
            catch(err){
                throw new Error(err);
            }
        },
        async getGroupChat(_,{},context){
            try{
                const user=checkAuth(context);
                const groups=await GroupChat.find();
                const group = groups.find(ele => ele.members.find(e => e.username == user.username))
                console.log(group)
                if(groups){
                    return groups;
                }
                else throw new Error("nguoi dung nay k ton tai")
                
            }
            catch(err){
                throw new Error(err);
            }
        },
    },
    Mutation:{
        async createGroupChat(_,{body},context){
            const user=checkAuth(context);

            const newGroup = new GroupChat({
                body:body,
                leader:user.username, 
                 members:({
                    username:user.username,
                    createdAt:new Date().toISOString(),
                })                   
              });
            
            const group = await newGroup.save();
            console.log(group)
            
            context.pubsub.publish('NEW_GROUPCHAT', {
                newGroup: group
            });
            return group;
        },
        async createContentGroupChat(_,{groupId,content},context){
            const {username}=checkAuth(context);
            if(content.trim()===''){
                throw new Error('N???i dung chat kh??ng ???????c ????? tr???ng');
            }
            const chat=await GroupChat.findById(groupId)
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
                throw new Error('Kh??ng t??m th???y id group')
            }
        }
    }
};

