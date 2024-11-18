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

// Login route
apiRouter.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ 
                success: false,
                msg: 'Missing required fields' 
            });
        }
        
        const user = await findUser(username);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                msg: 'User not found' 
            });
        }

        if (user.password !== password) {
            return res.status(401).json({ 
                success: false,
                msg: 'Invalid credentials' 
            });
        }

        const token = uuidv4();
        await addUserAuth(username, token);
        console.log('Login successful for user:', username);
        return res.status(200).json({
            success: true,
            token,
            username: user.username,
            contentType: user.contentType
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            success: false,
            msg: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// Register route
apiRouter.post('/auth/register', async (req, res) => {
    try {
        const { username, password, contentType } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ 
                success: false,
                msg: 'Missing required fields' 
            });
        }

        const existingUser = await findUser(username);
        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                msg: 'Username already exists' 
            });
        }

        const token = uuidv4();
        await addUser(username, password, token, contentType);
        
        console.log('Register successful for user:', username);
        return res.status(200).json({
            success: true,
            token,
            username,
            contentType
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ 
            success: false,
            msg: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
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


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });