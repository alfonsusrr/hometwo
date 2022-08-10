const mongoose = require('mongoose')

const optInEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.models.OptInEmail || mongoose.model('OptInEmail', optInEmailSchema)