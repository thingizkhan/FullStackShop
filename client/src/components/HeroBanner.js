import React, { useEffect, useState } from 'react';
import './HeroBanner.css';

const images = [
    '/images/sabuncuk1.jpeg',
    '/images/sabuncuk2.jpg',
    '/images/sabuncuk3.webp'
];

function HeroBanner() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-banner">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={index === currentImageIndex ? 'active' : ''}
                />
            ))}
            <div className="hero-content">
                <h1>Welcome to MyApp</h1>
                <p>Your journey to excellence starts here.</p>
                <button className="hero-button">Get Started</button>
            </div>
        </div>
    );
}

export default HeroBanner;
