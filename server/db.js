require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    return client.db('your_database_name');
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { client, connectToDatabase };
