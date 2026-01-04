import Hapi from 'hapi';

/**
 * CORS Configuration
 * 
 * Production: Uses ALLOWED_ORIGINS environment variable (comma-separated list)
 * Development: Falls back to localhost origins when NODE_ENV !== 'production'
 */
const isProduction = process.env.NODE_ENV === 'production';

// Development fallback origins (localhost variants)
const developmentOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

// Production origins from environment variable
const getProductionOrigins = () => {
  const envOrigins = process.env.ALLOWED_ORIGINS;
  if (!envOrigins) {
    console.warn('⚠️  ALLOWED_ORIGINS not set in production. Using empty allowlist.');
    return [];
  }
  return envOrigins.split(',').map(origin => origin.trim()).filter(Boolean);
};

// Determine allowed origins based on environment
const getAllowedOrigins = () => {
  if (isProduction) {
    return getProductionOrigins();
  }
  // In development, combine env origins (if any) with localhost fallbacks
  const envOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
    : [];
  return [...new Set([...developmentOrigins, ...envOrigins])];
};

const allowedOrigins = getAllowedOrigins();

// Custom origin validation function
const validateOrigin = (origin) => {
  // Allow requests with no origin (same-origin, curl, Postman, etc.)
  if (!origin) return true;
  return allowedOrigins.includes(origin);
};

const server = new Hapi.Server({
  host: '127.0.0.1',
  port: process.env.PORT || '8080',
  routes: {
    cors: {
      origin: allowedOrigins.length > 0 ? allowedOrigins : (isProduction ? [] : ['*']),
      headers: ['Accept', 'Content-Type'],
      additionalHeaders: ['X-Requested-With'],
    },
  },
});

async function main() {
  await server.register([{
    plugin: require('./shifts-mock-api'),
    routes: { prefix: '/shifts' },
  }]);

  await server.start();

  console.info(`✅  API server is listening at ${server.info.uri.toLowerCase()}`);
  console.info(`🔒  CORS mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.info(`🌐  Allowed origins: ${allowedOrigins.length > 0 ? allowedOrigins.join(', ') : '(wildcard - dev only)'}`);
}

main();
