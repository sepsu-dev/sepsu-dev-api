import crypto from 'crypto';
import { config } from '../config/env';

const { key } = config.encryption;
const keyBuffer = Buffer.from(key, 'hex');

export const encrypt = (data: any): string => {
  const text = JSON.stringify(data);
  const dynamicIv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('chacha20', keyBuffer, dynamicIv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${dynamicIv.toString('hex')}${encrypted}`;
};

export const decrypt = (encryptedText: string): any => {
  const ivHex = encryptedText.substring(0, 32);
  const data = encryptedText.substring(32);

  if (!ivHex || !data) {
    throw new Error('Invalid encrypted data format');
  }

  const dynamicIvBuffer = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('chacha20', keyBuffer, dynamicIvBuffer);

  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};