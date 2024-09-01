import React, { useState } from 'react';

function AdminPage() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        formData.append('image', productImage);

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Handle successful response
                console.log('Product uploaded successfully');
            } else {
                // Handle errors
                console.error('Failed to upload product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    return (
        <div>
            <h2>Welcome to the Admin Page</h2>
            <p>Only accessible by admin users.</p>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>
                        Product Name:
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Product Description:
                        <input
                            type="text"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Product Price:
                        <input
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Product Image:
                        <input
                            type="file"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                <button type="submit">Upload Product</button>
            </form>
        </div>
    );
}

export default AdminPage;
