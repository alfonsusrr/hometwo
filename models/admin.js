const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

// Level: 1 = superadmin (can edit everything), 2 = analyst (can see statistics, cannot edit admin role)
// 3 = assistant (can add new room, see incoming request) 
const adminSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 3
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

adminSchema.methods.generateRefreshToken = async function(prevToken) {
    const admin = this

    let newTokens = [...admin.refreshToken]
    if (prevToken) {
        newTokens = newTokens.filter((token) => {
            return token.token != prevToken
        })
    }

    const token = jwt.sign({ uid: admin.uid }, process.env.JWT_SECRET, { expiresIn: '60d'})

    const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)
    await Admin.updateOne({ uid: admin.uid }, { refreshToken: newTokens.concat({ token })})

    return token
}

adminSchema.methods.generateAccessToken = async function(prevToken) {
    const admin = this

    let newTokens = [...admin.accessToken]
    if (prevToken) {
        newTokens = newTokens.filter((token) => {
            return token.token !== prevToken
        })
    }
    const token = jwt.sign({ uid: admin.uid }, process.env.JWT_SECRET, { expiresIn: '1d'})

    const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)
    await Admin.updateOne({ uid: admin.uid }, { accessToken: newTokens.concat({ token })})

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