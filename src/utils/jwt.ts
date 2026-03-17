import jwt from 'jsonwebtoken';
import { config } from '../config/env';

const JWT_SECRET = config.jwt.secret;

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '60s' });
};