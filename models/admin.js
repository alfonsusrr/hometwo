const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    refreshToken: [{
        token: {
            type: String,
            required: true
        }
    }],
    accessToken: [{ 
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

adminSchema.methods.generateRefreshToken = async function(prevToken, role) {
    const admin = this

    let newTokens = [...admin.refreshToken]
    if (prevToken) {
        newTokens = newTokens.filter((token) => {
            return token.token != prevToken
        })
    }

    const token = jwt.sign({ uid: admin.uid, role }, process.env.JWT_SECRET, { expiresIn: '60d'})

    admin.refreshToken = newTokens.concat({ token })
    await admin.save()

    return token
}

adminSchema.methods.generateAccessToken = async function(prevToken, role) {
    const admin = this

    let newTokens = [...admin.accessToken]
    if (prevToken) {
        newTokens = newTokens.filter((token) => {
            return token.token !== prevToken
        })
    }
    const token = jwt.sign({ uid: admin.uid, role }, process.env.JWT_SECRET, { expiresIn: '1d'})

    admin.accessToken = newTokens.concat({ token })
    await admin.save()

    return token
}

adminSchema.methods.adminLogout = async function(prevTokens) {
    const admin = this
    const { refreshToken, accessToken } = prevTokens

    admin.refreshToken = admin.refreshToken.filter((token) => {
        return token.token !== refreshToken
    })

    admin.accessToken = admin.accessToken.filter((token) => {
        return token.token  !== accessToken
    })

    await admin.save()
}

module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema)