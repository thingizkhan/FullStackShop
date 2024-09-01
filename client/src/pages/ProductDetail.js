import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const { _id, name, image, price, size } = product;
        const productToAdd = { id: _id, name, image, price, size };
        cart.push(productToAdd);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-detail">
            {product.image && <img src={product.image} alt={product.name} className="product-detail-image" />}
            <div className="product-detail-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Size: {product.size}</p>
                <div className="button-container">
                    <button onClick={addToCart}>Add to Cart</button>
                    <Link to="/">
                        <button>Back to Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
