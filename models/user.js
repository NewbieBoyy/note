const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    name: {
        type: String,
        
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note',
        }
    ]
});
module.exports = mongoose.model('User', userSchema);