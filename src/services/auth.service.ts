import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/db';

const tokenBlacklist = new Set<string>();

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string = 'user'
): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );
};

export const findUserByEmail = async (email: string): Promise<any | null> => {
  const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (id: number, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '2h',
  });
};

export const getUserById = async (id: number): Promise<any | null> => {
  const [rows]: any = await db.query(
    'SELECT id, name, email, role FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

export const logout = async (userId: number, token: string): Promise<void> => {
  tokenBlacklist.add(token);
  await db.query('UPDATE users SET last_logout = NOW() WHERE id = ?', [userId]);
};

export const isTokenBlacklisted = (token: string): boolean => {
  return tokenBlacklist.has(token);
};
