import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Use a more secure key in a real application

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): object | null => {
  try {
    return jwt.verify(token, secretKey) as object;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};
