import { query } from '../../config/database';

export class UserService {
  static async getAll() {
    const result = await query('SELECT id, username, email FROM users');
    return result.rows;
  }
}