const dbConfig = require('./dbConfig.json'); // JSON can be directly imported without `assert` in CommonJS
const { MongoClient, ServerApiVersion } = require('mongodb');
const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function addUser(username, password, token) {
    try {
        await client.connect();
        const database = client.db("FreelDB");
        const users = database.collection("Users");
        const auth = database.collection("Auth");
        
        await users.insertOne({ username, password });
        await auth.insertOne({ username, token });
        return true;
    } catch (error) {
        console.error('Add user error:', error);
        throw error;
    } finally {
        await client.close();
    }
}

async function findUser(username) {
    try {
        await client.connect();
        const database = client.db("FreelDB");
        const users = database.collection("Users");
        return await users.findOne({ username });
    } catch (error) {
        console.error('Find user error:', error);
        throw error;
    } finally {
        await client.close();
    }
}

async function addUserAuth(username, token) {
    try {
        await client.connect();
        const database = client.db("FreelDB");
        const auth = database.collection("Auth");
        await auth.insertOne({ username, token });
        return true;
    } catch (error) {
        console.error('Add auth error:', error);
        throw error;
    } finally {
        await client.close();
    }
}

async function removeAuthToken(username) {
    try {
        await client.connect();
        const database = client.db("FreelDB");
        const auth = database.collection("Auth");
        const result = await auth.deleteOne({ username });
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Remove auth error:', error);
        throw error;
    } finally {
        await client.close();
    }
}


module.exports = { addUser, findUser, addUserAuth, removeAuthToken };

