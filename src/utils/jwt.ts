import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

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
