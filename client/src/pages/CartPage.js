import React, { useState, useEffect } from 'react';
import './CartPage.css';

function CartPage() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
    }, [cart]);

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePayNow = async () => {
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart })
            });
            const session = await response.json();
            console.log(session.url);
            window.location.href = session.url;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        <button onClick={handlePayNow}>Pay Now</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;