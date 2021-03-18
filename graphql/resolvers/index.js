const postsResolvers=require('./posts');
const usersResolvers=require('./users');
const commentResolvers=require('./comment');
const ChatsResolver=require('./Chat');
const GroupChatReolver=require('./GroupChat');

module.exports ={
    Post: {       
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length      
    },
    Query:{
        ...postsResolvers.Query,
        ...ChatsResolver.Query,
        ...usersResolvers.Query,
        ...GroupChatReolver.Query,

    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...ChatsResolver.Mutation,
        ...GroupChatReolver.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription
        
    }
};