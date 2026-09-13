import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isDbConnected } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URLS = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin || CLIENT_URLS.includes(origin)) {
    return true;
  }

  // Vite may select another port when the default one is already in use.
  return (
    process.env.NODE_ENV !== 'production' &&
    /^http:\/\/localhost:\d+$/.test(origin)
  );
}

// ------------------------------------------------------------------
// Core middleware
// ------------------------------------------------------------------
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------------------------------------------------
// Health check — always responds, even if MongoDB is unavailable,
// so the frontend/ops tooling can tell the two failure modes apart.
// ------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: isDbConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// ------------------------------------------------------------------
// API routes
// ------------------------------------------------------------------
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Friendly root response (useful when visiting the backend URL directly)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Portfolio API is running.',
    health: '/api/health',
    endpoints: ['/api/projects', '/api/contact'],
  });
});

// ------------------------------------------------------------------
// Error handling (must be registered last)
// ------------------------------------------------------------------
app.use(notFound);
app.use(errorHandler);

// ------------------------------------------------------------------
// Start server — the HTTP server starts regardless of DB connection
// outcome, so the API (and health check) stays reachable even if
// MongoDB is temporarily unavailable.
// ------------------------------------------------------------------
function start() {
  app.listen(PORT, () => {
    console.log(`[server] Portfolio API running on http://localhost:${PORT}`);
    console.log(
      `[server] Allowing requests from CLIENT_URL: ${CLIENT_URLS.join(', ')}`
    );
  });

  // Keep the API and health endpoint available while MongoDB is connecting.
  connectDB();
}

// start();

if (process.env.VERCEL) {
  await connectDB();
} else {
  start();
}

export default app;

// Prevent unhandled promise rejections from silently crashing the process
process.on('unhandledRejection', (err) => {
  console.error('[server] Unhandled promise rejection:', err.message);
});
