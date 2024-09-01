require('dotenv').config();
const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const { addUser } = require('./modules/userManager');
const { addProduct, getProducts, getProductById } = require('./modules/productManager'); // Ensure this is correctly imported
const fs = require('fs');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.use(fileUpload());

// Example GET request
router.post('/login', (req, res) => {
    console.log('You logged in');
    res.json({ message: 'You logged in' });
});

// Example POST request
router.post('/signup', (req, res) => {
    const user = req.body;
    addUser(user);
    res.json({ message: 'You signed up', user });
});

router.post('/products', async (req, res) => {
    const { name, description, price } = req.body;
    const image = req.files?.image;

    if (!name || !description || !price || !image) {
        return res.status(400).send('All fields are required');
    }

    const product = {
        name,
        description,
        price: parseFloat(price),
    };

    try {
        const productId = await addProduct(product);
        // If doesn't have image mime type prevent from uploading
        if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

        // Move the uploaded image to our upload folder
        image.mv(path.join(__dirname, 'upload', productId.toString() + ".jpg"));
        res.status(201).json(productId);
    } catch (err) {
        console.error('Error adding product:', err); // Log the error for debugging
        res.status(500).send(err.message);
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await getProducts();
        const productsWithImages = await Promise.all(products.map(async (product) => {
            const imagePath = path.join(__dirname, 'upload', `${product._id}.jpg`);
            let imageBase64 = null;
            if (fs.existsSync(imagePath)) {
                const imageBuffer = fs.readFileSync(imagePath);
                imageBase64 = imageBuffer.toString('base64');
            }
            return {
                ...product,
                image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : null
            };
        }));
        res.json(productsWithImages);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send(err.message);
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        const imagePath = path.join(__dirname, 'upload', `${product._id}.jpg`);
        const imageUrl = fs.existsSync(imagePath) ? `/upload/${product._id}.jpg` : null;
        res.json({
            ...product,
            image: imageUrl
        });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send(err.message);
    }
});

router.post('/create-checkout-session', async (req, res) => {
    const { cart } = req.body;
    const lineItems = cart.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: 1,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: process.env.SUCCESS_URL, // Ensure this matches your React route
            cancel_url: process.env.CANCEL_URL,   // Ensure this matches your React route
        });
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
