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
        const content = database.collection("Content");
        const content_list = [];
        
        await users.insertOne({ username, password, contentType });
        await auth.insertOne({ 
            username, 
            token,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });
        await content.insertOne({ username, content_list })
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
        const auth = database.collection("Auth");
        const result = await auth.findOne({ token });
        
        if (!result) {
            return null;
        }

        if (new Date(auth.expiresAt) < new Date()) {
            // Token has expired
            await database.collection('Auth').deleteOne({ token }); // Optionally clean up expired token
            return null;
        }

        return result.username;
    } catch (error) {
        console.error('Error getting user by token:', error);
        throw error;
    }
}

async function addUserContent(username, imageLink) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        
        const result = await database.collection("Content").updateOne(
            { username: username },
            { $push: { content_list: imageLink } }
        );

        if (result.modifiedCount === 0) {
            throw new Error("No document was updated");
        }

        return result.modifiedCount;
        
    } catch (error) {
        console.error('Error adding image to stored content:', error);
        throw error;
    }
}

async function getUserContent(username) {
    const client = await getDbConnection();
    const database = client.db("FreelDB");
    const content = database.collection("Content");
    
    const result = await content.findOne(
        { username: username },
        { projection: { content_list: 1, _id: 0 } }
    );
    
    return result ? result.content_list : null;
}

async function getStoredProfiles(contentType){
    const client = await getDbConnection();
    const database = client.db("FreelDB");
    const profiles = database.collection("Users");

    try {
        // console.log("The received contentType = ", contentType);
        const matchingProfiles = await profiles.find({ contentType }).toArray();
        // console.log("Found profiles are: ", matchingProfiles);

        return matchingProfiles; // Return the array of matching profiles
    } 
    catch (error) {
        console.error("Error fetching profiles with contentType:", contentType, error);
        throw error; // Re-throw the error for the caller to handle
    }

}

async function getAllOtherUsernames(currentUsername) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const users = database.collection("Users");
        
        // Find all documents except the current user
        const result = await users.find(
            { username: { $ne: currentUsername } }, // $ne means "not equal"
            { projection: { username: 1, _id: 0 } }
        ).toArray();
        
        // Map the results to an array of just usernames
        const usernames = result.map(user => user.username);
        
        return usernames;
    } catch (error) {
        console.error('Error getting other usernames:', error);
        throw error;
    }
}





//websocket
async function saveChatMessage(sender, recipient, message) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const chatCollection = database.collection("Messages");
        
        await chatCollection.insertOne({
            sender,
            recipient,
            message,
            timestamp: new Date(),
            read: false
        });
        
        return true;
    } catch (error) {
        console.error('Error saving chat message:', error);
        throw error;
    }
}

async function getChatHistory(user1, user2) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const chatCollection = database.collection("Messages");
        
        // Find messages where either user is sender or recipient
        const messages = await chatCollection.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 }
            ]
        }).sort({ timestamp: 1 }).toArray();
        
        return messages;
    } catch (error) {
        console.error('Error retrieving chat history:', error);
        throw error;
    }
}

async function markMessagesAsRead(sender, recipient) {
    try {
        const client = await getDbConnection();
        const database = client.db("FreelDB");
        const chatCollection = database.collection("Messages");
        
        await chatCollection.updateMany(
            { 
                sender: sender, 
                recipient: recipient,
                read: false 
            },
            { $set: { read: true } }
        );
        
        return true;
    } catch (error) {
        console.error('Error marking messages as read:', error);
        throw error;
    }
}

module.exports = {
    saveChatMessage,
    getChatHistory,
    markMessagesAsRead, 
    getAllOtherUsernames, 
    addUser, 
    findUser, 
    addUserAuth, 
    removeAuthToken, 
    getUserByToken, 
    addUserContent, 
    getUserContent, 
    getStoredProfiles 
};