import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const app = express();
import {run, addUser, findUser} from './database_methods.js'

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
// JSON body parsing using built-in middleware
app.use(express.json());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/login', async (req, res) => {
    console.log("Contact has been made!");
    
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ msg: 'Missing required fields' });
      }
  
      // Check if user exists in FreelDB.Users
      const existingUser = await findUser(username);
      if (existingUser) {
        return res.status(409).json({ msg: 'Existing user' });
      }
  
      // Create new user with token
      const token = uuidv4();
      await addUser(username, password, token);
      
      res.status(201).json({ token });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
