const mongoose = require('mongoose')
const Rules = require('./rule')
const UniversityList = require('./universityList')
const StateList = require('./stateList')
const Facility = require('./facility')
const User = require('./user')

const roomSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false
    },
    contact: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    consent: {
        type: Boolean,
        default: true
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
        default: 'United States'
    }, 
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false,
    }, 
    school: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UniversityList'
    }],
    facilities: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Facility'
    }],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        require: true
    },
    additionalPrice: [{
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            require: true
        },
    }],
    roomPictures: [{
        type: String,
    }],
    propertyPictures: [{
        type: String,
    }],
    listedRules: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Rule'
    }],
    additionalRules: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema)