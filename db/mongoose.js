const mongoose = require('mongoose')

const connectionURL = process.env.MONGODB_URL 

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
 let cached = global.mongoose

 if (!cached) {
   cached = global.mongoose = { conn: null, promise: null }
 }

const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn
    }
    
    if (!cached.promise) {
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
    }

    cached.promise = mongoose.connect(connectionURL, opts).then(mongoose => {
        return mongoose
    })
    }

    cached.conn = await cached.promise

    return cached.conn
}

module.exports = dbConnect