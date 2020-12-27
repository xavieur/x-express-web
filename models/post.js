const mongoose = require('mongoose')

const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    snippet: {
        type: String,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    }
}))

module.exports = Post