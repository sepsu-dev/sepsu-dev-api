import { Pool } from 'pg';
import { config } from './env';
import { logger } from '../utils/logger';

export const pool = new Pool({
  connectionString: config.db.url,
});

pool.on('connect', () => {
  logger.info('Database connected successfully');
});

pool.on('error', (err) => {
  logger.error(`Database error: ${err.message}`);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
