const {gql}=require('apollo-server')

module.exports=gql`
    type Post{
        id:ID!,
        body:String!,
        createdAt:String!,
        username:String!,
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }

    type RoomChat{
        id:ID!
        from:String!
        to:String!
        content:[Chat]!
    }
    type GroupChat{
        id:ID!
        body:String!
        leader:String!
        members:[Member]!
        content:[Chat]!
    }
    type Chat{
        id:ID!
        username:String!
        createdAt:String!
        content:String!
    }
    type Member{
        id:ID!
        username:String!
        createdAt:String!
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!    
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getPosts:[Post]
        getPost(postId: ID!): Post
        getChats:[RoomChat]
        getChat(roomId:ID!):RoomChat
        getUsers:[User]
        getUser(username:String!):User
        getRoomChat(username:String!):[RoomChat]
        getGroups:[GroupChat]
        getGroup(groupId:ID!):GroupChat
        getGroupChat:[GroupChat]
        
    }
    
    type Mutation{
        register(registerInput:RegisterInput):User!
        login(username:String!,password:String!):User!
        createPost(body: String!):Post!
        deletePost(postId:ID!):String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        createRoomChat(username:String!):RoomChat!
        createContentChat(roomId:String!,content:String!):RoomChat!
        createGroupChat(body:String!):GroupChat!
        createContentGroupChat(groupId:String!,content:String!):GroupChat!
    }
    type Subscription {
        newPost: Post!
    }
`;