const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hosted: {
        type: Boolean,
        required: true,
        default: false
    },
    country: {
        type: String,
        required: true,
        default: 'US'
    }, 
    state: {
        type: String,
        required
    }
})

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema)