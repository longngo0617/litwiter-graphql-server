const { model, Schema } = require('mongoose');

const chatSchema = new Schema({
    from: String,
    to: String,
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

module.exports = model('Chat', chatSchema);
