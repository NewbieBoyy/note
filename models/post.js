const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: {
        type: String,
        
    },
    content: {
        type: String,
        
    },
    tag: {
        type: String,
    },
    creator: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        }
    ]

    
}, { timestamps: true });

module.exports = mongoose.model('Note', postSchema)