const mongoose = require('mongoose')
const StateList = require('./stateList')

const stateListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    abbr: {
        type: String,
        required: true,
        unique: true
    },
})



module.exports = mongoose.models.StateList || mongoose.model('StateList', stateListSchema)