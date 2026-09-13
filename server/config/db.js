import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the URI from environment variables.
 * Does NOT crash the process if the connection fails initially —
 * logs a clear error so the rest of the API can still respond
 * (e.g. health checks) while the database is unavailable.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      '[db] MONGODB_URI is not set. Create server/.env from .env.example and set your MongoDB connection string.'
    );
    return false;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('[db] Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('[db] Failed to connect to MongoDB:', error.message);
    return false;
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

mongoose.connection.on('disconnected', () => {
  console.warn('[db] MongoDB disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('[db] MongoDB connection error:', err.message);
});
