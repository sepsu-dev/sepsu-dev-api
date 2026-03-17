import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  db: {
    url: process.env.DATABASE_URL || ''
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY || '',
    iv: process.env.ENCRYPTION_IV || ''
  },
  publicKey: process.env.PUBLIC_KEY || 'default_public_key'
};

// Simple validation to ensure critical keys are present in production
if (config.env === 'production') {
  if (!config.db.url || !config.jwt.secret || !config.encryption.key || !config.encryption.iv || !config.publicKey) {
    console.warn('⚠️ CRITICAL: Missing configuration in production environment!');
  }
}
