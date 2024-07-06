import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { generateToken } from './utils/jwt';
import { authenticate } from './middleware/auth';
import { User } from './models/User';

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
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

app.get('/protected', authenticate, (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
