import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}


let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Reduced to 5 seconds to handle Vercel's 10s limit
      socketTimeoutMS: 8000, // Reduced to 8 seconds for operations
      connectTimeoutMS: 5000, // Reduced to 5 seconds for initial connection
      maxPoolSize: 10, // Reduced pool size for serverless environment
      minPoolSize: 0, // Start with no connections for serverless
      retryWrites: true,
      retryReads: true,
      maxIdleTimeMS: 5000, // Close idle connections after 5 seconds
      heartbeatFrequencyMS: 2000, // Check connection health more frequently
      autoIndex: false, // Disable autoIndexing in production
      family: 4 // Use IPv4, since some environments have issues with IPv6
    }

    const maxRetries = 3
    let retryCount = 0

    const connectWithRetry = async () => {
      try {
        return await mongoose.connect(MONGODB_URI!, opts)
      } catch (error) {
        if (retryCount < maxRetries) {
          retryCount++
          const delay = Math.min(1000 * Math.pow(2, retryCount), 10000) // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay))
          return connectWithRetry()
        }
        throw error
      }
    }

    cached.promise = connectWithRetry().then((mongoose) => {
      mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error)
      })

      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Attempting to reconnect...')
      })

      mongoose.connection.on('connected', () => {
        console.info('Successfully connected to MongoDB')
      })

      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export default connectDB

