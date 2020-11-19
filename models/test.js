const mongoose = require('mongoose')

const Test = mongoose.model('Test', new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer1: {
        type: String,
        required: true,
        trim: true
    }, 
    answer2: {
        type: String,
        required: true,
        trim: true
    }, 
    answer3: {
        type: String,
        required: true,
        trim: true
    }, 
    answer4: {
        type: String,
        required: true,
        trim: true
    }
}))

module.exports = Test