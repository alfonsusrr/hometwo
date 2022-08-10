const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    isOwner: {
        type: Boolean,
        required: true,
        default: false
    },
    isCustomer: {
        type: Boolean,
        required: true,
        default: false
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

userSchema.methods.generateRefreshToken = async function(prevToken, role) {
    const user = this

    let newTokens = [...user.refreshToken]
    if (prevToken) {
        newTokens = newTokens.filter((token) => {
            return token.token != prevToken
        })
    }

    const token = jwt.sign({ uid: user.uid, role }, process.env.JWT_SECRET, { expiresIn: '60d'})

    user.refreshToken = newTokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.generateAccessToken = async function(prevToken, role) {
    const user = this

    let newTokens = [...user.accessToken]
    if (prevToken) {
        newTokens = newTokens.filter((token) => {
            return token.token !== prevToken
        })
    }
    const token = jwt.sign({ uid: user.uid, role }, process.env.JWT_SECRET, { expiresIn: '1d'})

    user.accessToken = newTokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.userLogout = async function(prevTokens) {
    const user = this
    const { refreshToken, accessToken } = prevTokens

    user.refreshToken = user.refreshToken.filter((token) => {
        return token.token !== refreshToken
    })

    user.accessToken = user.accessToken.filter((token) => {
        return token.token  !== accessToken
    })

    await user.save()
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)