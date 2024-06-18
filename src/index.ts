/// <reference path="./types/express.d.ts" />

import express, { Request, Response } from 'express';
import { generateToken } from './utils/jwt';
import { authenticate } from './middleware/auth';

const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }

  const token = generateToken({ username, password });
  res.json({ token });
});

app.get('/protected', authenticate, (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
