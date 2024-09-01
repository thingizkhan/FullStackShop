const { connectToDatabase, client } = require('../db');


async function addUser(user) {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    
    try {
      const result = await collection.insertOne(user);
      console.log(`New user inserted with the following id: ${result.insertedId}`);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await client.close();
    }
  }


  module.exports = {addUser};
