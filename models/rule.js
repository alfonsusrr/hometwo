const mongoose = require('mongoose')

const ruleSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.models.Rule || mongoose.model('Rule', ruleSchema)