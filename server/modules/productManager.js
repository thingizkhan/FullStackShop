const { connectToDatabase, client } = require('../db');
const { ObjectId } = require('mongodb');

async function addProduct(product) {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    try {
        const result = await collection.insertOne(product);
        console.log(`New product inserted with the following id: ${result.insertedId}`);
        return result.insertedId; // Return the insertedId
    } catch (err) {
        console.error('Error inserting product:', err);
        throw err;
    } finally {
        await client.close();
    }
}

async function getProducts() {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    try {
        const products = await collection.find({}).toArray();
        return products;
    } catch (err) {
        console.error('Error fetching products:', err);
        throw err;
    } finally {
        await client.close();
    }
}

async function getProductById(id) {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    try {
        const product = await collection.findOne({ _id: new ObjectId(id) });
        return product;
    } catch (err) {
        console.error('Error fetching product:', err);
        throw err;
    } finally {
        await client.close();
    }
}

module.exports = { addProduct, getProducts, getProductById };
