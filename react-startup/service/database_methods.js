const dbConfig = require('./dbConfig.json');
const { MongoClient, ServerApiVersion } = require('mongodb');
const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;

let dbClient = null;

const mongoOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    connectTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    retryWrites: true
};

async function getDbConnection() {
    try {
        if (!dbClient) {
            dbClient = await MongoClient.connect(url, mongoOptions);
            console.log('MongoDB connected successfully');
            
            dbClient.on('error', (error) => {
                console.error('MongoDB connection error:', error);
                dbClient = null;
            });
        }
        return dbClient;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

async function addUser(username, password, token) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const users = database.collection("Users");
        const auth = database.collection("Auth");
        
        await users.insertOne({ username, password });
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

module.exports = { addUser, findUser, addUserAuth, removeAuthToken };