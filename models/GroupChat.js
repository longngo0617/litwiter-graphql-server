const { model, Schema } = require('mongoose');

const groupChatSchema = new Schema({
    body: String,
    leader: String,
    members: [
        {
            username: String,
            createdAt: String,            
        }
    ],
    content: [
        {
            username: String,
            createdAt: String,
            content: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
});

module.exports = model('GroupChat', groupChatSchema);
