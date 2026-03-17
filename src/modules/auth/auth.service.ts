import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt';
import { query } from '../../config/database';

export class AuthService {
  static async register(userData: any) {
    const { username, email, password } = userData;

    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email;
    `;

    const result = await query(insertQuery, [username, email, hashedPassword]);

    return result.rows[0];
  }

  static async login(credentials: any) {
    const { email, password } = credentials;

    const result = await query('SELECT id, username, email, password FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ id: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    };
  }
}
