const Admin = require('../models/admin')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const addUser = async () => {

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
    }

    const connectionURL = 'mongodb://127.0.0.1:27017/hometwo'
    await mongoose.connect(connectionURL, opts).then(mongoose => {
        return mongoose
    })

    const saltRounds = 13
    const password = "alfonsusRR1"

    const encryptedPassword = bcrypt.hashSync(password, saltRounds)
    const admin = new Admin({
        uid: "alfonsus.rr",
        name: "Alfonsus Rodriques Rendy",
        password: encryptedPassword,
        level: 1
    })
    await admin.save()
}

addUser()