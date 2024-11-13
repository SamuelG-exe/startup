import dbConfig from './dbConfig.json' assert { type: 'json' };
import { MongoClient, ServerApiVersion } from 'mongodb';
const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

export async function addUser(username, password, token) {
    try {
      await client.connect();
      const database = client.db("FreelDB");
      const users = database.collection("Users");
      const auth = database.collection("Auth");
      
      // Add to Users collection
      await users.insertOne({
        username,
        password
      });
  
      // Add to Auth collection
      await auth.insertOne({
        username,
        token
      });
  
    } finally {
      await client.close();
    }
  }
  
  export async function findUser(username) {
    try {
      await client.connect();
      const database = client.db("FreelDB");
      const users = database.collection("Users");
      
      return await users.findOne({ username });
    } finally {
      await client.close();
    }
  }