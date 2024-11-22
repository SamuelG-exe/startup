const dbConfig = require('./dbConfig.json');
const { MongoClient } = require('mongodb');
const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;

let dbClient = null;

async function getDbConnection() {
    if (!dbClient) {
        try {
            dbClient = new MongoClient(url, { 
                tls: true, 
                serverSelectionTimeoutMS: 3000, 
                autoSelectFamily: false,
            });
            await dbClient.connect();
            console.log('MongoDB connected successfully');
            
            dbClient.on('error', (error) => {
                console.error('MongoDB connection error:', error);
                dbClient = null;
            });
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }
    return dbClient;
}

async function addUser(username, password, token, contentType) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const users = database.collection("Users");
        const auth = database.collection("Auth");
        
        await users.insertOne({ username, password, contentType });
        await auth.insertOne({ 
            username, 
            token,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });
        return true;
    } catch (error) {
        console.error('Add user error:', error);
        throw error;
    }
}

async function findUser(username) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const users = database.collection("Users");
        return await users.findOne({ username });
    } catch (error) {
        console.error('Find user error:', error);
        throw error;
    }
}

async function addUserAuth(username, token) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const auth = database.collection("Auth");
        
        // Remove any existing tokens for this user
        await auth.deleteMany({ username });
        
        // Add new token
        await auth.insertOne({ 
            username, 
            token,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });
        return true;
    } catch (error) {
        console.error('Add auth error:', error);
        throw error;
    }
}

async function removeAuthToken(username) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const auth = database.collection("Auth");
        const result = await auth.deleteMany({ username });
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Remove auth error:', error);
        throw error;
    }
}

async function getUserByToken(token) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const auth = database.collection("Auth").findOne({ token });
        
        if (!auth) {
            return null;
        }

        if (new Date(auth.expiresAt) < new Date()) {
            // Token has expired
            await database.collection('Auth').deleteOne({ token }); // Optionally clean up expired token
            return null;
        }

        return auth.username;
    } catch (error) {
        console.error('Error getting user by token:', error);
        throw error;
    }
}




module.exports = { addUser, findUser, addUserAuth, removeAuthToken, getUserByToken };