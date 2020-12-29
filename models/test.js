const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
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
        validate(value) {
            if (value < 1 || value > 4) {
                throw new Error('Solución no válida')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

const Test = mongoose.model('Test', testSchema)

module.exports = Test