const mongoose = require('mongoose')
const StateList = require('./stateList')

const universityListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'StateList'
    }
})

module.exports = mongoose.models.UniversityList || mongoose.model('UniversityList', universityListSchema)