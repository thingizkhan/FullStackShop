import React, { useEffect, useState } from 'react';
import Product from './Product';
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list">
            {products.map((product) => (
                <Product
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    image={product.image}
                    size={product.size}
                />
            ))}
        </div>
    );
}

export default ProductList;
