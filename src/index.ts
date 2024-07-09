import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { generateToken } from './utils/jwt';

import { User } from './models/User';

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/auth')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }

  const token = generateToken({ username, password });
  res.json({ token });
});

app.post('/register', async (req: Request, res: Response) => {
  const { username, password, fullname } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const newUser = new User({
    username,
    password,
    fullname,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error('Error creating the user', error);
    res.status(500).json({ message: 'Error creating the user.' });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
