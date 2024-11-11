import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
// JSON body parsing using built-in middleware
app.use(express.json());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const users = {};  // Add this line before your routes


// CreateAuth a new user
apiRouter.post('/auth/login', async (req, res) => {
    console.log("Contact has been made!")
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        const user = users[username];
        
        if (user) {
            return res.status(409).json({ msg: 'Existing user' });
        }

        const newUser = { 
            username, 
            password, 
            token: uuidv4() 
        };
        users[username] = newUser;

        res.status(201).json({ token: newUser.token });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
