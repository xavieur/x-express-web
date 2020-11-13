const {Schema} = require('mongoose')

const Task = mongoose.model('Task', new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}))

module.exports = Task