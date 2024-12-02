const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { addUser, findUser, addUserAuth, removeAuthToken, getUserByToken, addUserContent, getUserContent } = require('./database_methods');
const bcrypt = require('bcrypt');


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

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
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

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = uuidv4();
        await addUser(username, hashedPassword, token, contentType);
        
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


apiRouter.post('/auth/content/add', async (req, res) => {    
    try {
        const { imageLink } = req.body;
        const authToken = req.headers.authorization?.split(' ')[1];

        // Validate input and authorization
        if (!imageLink) {
            return res.status(400).json({
                success: false,
                msg: 'No image link provided'
            });
        }

        if (!authToken) {
            return res.status(401).json({
                success: false,
                msg: 'No authorization token provided'
            });
        }

        // Get username from token (assuming you store username-token pairs)
        const username = await getUserByToken(authToken);
        if (!username) {
            return res.status(401).json({
                success: false,
                msg: 'Invalid or expired token'
            });
        }
        console.log("username found was: ", username);

        // Validate URL format
        try {
            new URL(imageLink);
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid image URL format'
            });
        }

        // Add content and get updated content array
        await addUserContent(username, imageLink);

        console.log('Content added successfully for user:', username);
        return res.status(200).json({
            success: true,
        });

    } catch (error) {
        console.error('Content addition error:', error);
        return res.status(500).json({
            success: false,
            msg: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }

});


apiRouter.get('/auth/content/get', async (req, res) => {
    const { username } = req.query; // Extract username from query parameters

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const content = await getUserContent(username); // Call your database method
        
        if (!content || content.length === 0) {
            return res.status(404).json({ error: 'No content found for the specified user' });
        }

        res.status(200).json(content); // Send back the retrieved content
    } catch (error) {
        console.error('Error fetching user content:', error);
        res.status(500).json({ error: 'Failed to fetch user content' });
    }
});





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });