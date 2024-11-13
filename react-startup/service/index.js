import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const app = express();
import {addUser, findUser} from './database_methods.js'

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.json());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Login endpoint
apiRouter.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }
    
    const user = await findUser(username);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    
    res.status(200).json({ token: user.token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Register endpoint
apiRouter.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const existingUser = await findUser(username);
    if (existingUser) {
      return res.status(409).json({ msg: 'Username already exists' });
    }

    const token = uuidv4();
    await addUser(username, password, token);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

apiRouter.post('/auth/logout', async (req, res) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ msg: 'Username is required' });
      }
  
      const success = await removeAuthToken(username);
      if (success) {
        res.status(200).json({ msg: 'Logged out successfully' });
      } else {
        res.status(404).json({ msg: 'No active session found' });
      }
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });