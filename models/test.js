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
    },
    solution: {
        type: Number,
        required: true,
        validate(value){
            if(value<1 || value>4){
                throw new Error('Solución no válida')
            }
        }
    }
}))

module.exports = Test