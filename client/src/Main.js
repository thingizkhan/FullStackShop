import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminLogin from './components/AdminLogin';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import SuccessPage from './pages/SuccessPage';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/success" element={<Navigate to="/success" />} />
                    <Route path="/error" element={<Navigate to="/error" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;