const mongoose = require('mongoose')

const facilitySchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.models.Facility || mongoose.model('Facility', facilitySchema)