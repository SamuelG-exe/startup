const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { addUser, findUser, addUserAuth, removeAuthToken } = require('./database_methods');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }
        
        console.log('Attempting to find user:', username);
        const user = await findUser(username);
        if (!user) {
            console.log('User not found:', username);
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.password !== password) {
            console.log('Invalid password attempt for user:', username);
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        console.log('Generating token for user:', username);
        const token = uuidv4();
        await addUserAuth(username, token);
        
        console.log('Login successful for user:', username);
        res.status(200).json({
            token,
            username: user.username
        });
    } catch (error) {
        console.error('Login error details:', {
            name: error.name,
            code: error.code,
            message: error.message,
            stack: error.stack
        });

        if (error.name === 'MongoServerSelectionError') {
            return res.status(503).json({ 
                msg: 'Database connection error', 
                details: 'Unable to connect to database. Please try again later.' 
            });
        }
        
        res.status(500).json({ 
            msg: 'Server error', 
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

apiRouter.post('/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        console.log('Checking for existing user:', username);
        const existingUser = await findUser(username);
        if (existingUser) {
            console.log('Username already exists:', username);
            return res.status(409).json({ error: 'Username already exists' });
        }

        console.log('Creating new user:', username);
        const token = uuidv4();
        await addUser(username, password, token);
        
        console.log('Registration successful for user:', username);
        res.status(200).json({
            token,
            username: username
        });
    } catch (error) {
        console.error('Registration error details:', {
            name: error.name,
            code: error.code,
            message: error.message,
            stack: error.stack
        });

        if (error.name === 'MongoServerSelectionError') {
            return res.status(503).json({ 
                msg: 'Database connection error', 
                details: 'Unable to connect to database. Please try again later.' 
            });
        }

        res.status(500).json({ 
            msg: 'Server error', 
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

apiRouter.post('/auth/logout', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ msg: 'Username is required' });
        }

        console.log('Attempting to logout user:', username);
        const success = await removeAuthToken(username);
        
        if (success) {
            console.log('Logout successful for user:', username);
            res.status(200).json({ msg: 'Logged out successfully' });
        } else {
            console.log('No active session found for user:', username);
            res.status(404).json({ msg: 'No active session found' });
        }
    } catch (error) {
        console.error('Logout error details:', {
            name: error.name,
            code: error.code,
            message: error.message,
            stack: error.stack
        });

        if (error.name === 'MongoServerSelectionError') {
            return res.status(503).json({ 
                msg: 'Database connection error', 
                details: 'Unable to connect to database. Please try again later.' 
            });
        }

        res.status(500).json({ 
            msg: 'Server error', 
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});