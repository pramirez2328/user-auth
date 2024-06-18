// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

interface DecodedToken {
  username: string;
  password: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;
    req.user = { username: decoded.username, password: decoded.password };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
