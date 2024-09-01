import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

function Product({ id, name, image, price, size }) {
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = { id, name, image, price, size };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div className="product">
            <Link to={`/products/${id}`}>
                {image && <div className="product-image" style={{ backgroundImage: `url(${image})` }}></div>}
                <h3 className="product-name">{name}</h3>
                <p className="product-size">Size: {size}</p>
            </Link>
            <button onClick={addToCart} style={{ backgroundColor: '#e63946', color: 'white' }}>Add to Cart</button>
        </div>
    );
}

export default Product;
