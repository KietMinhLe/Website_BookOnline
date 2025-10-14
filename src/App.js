import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './contexts/BookContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './views/HomePage';
import BookDetailPage from './views/BookDetailPage';
import CartPage from './views/CartPage';
import CheckoutPage from './views/CheckoutPage';
import OrderSuccessPage from './views/OrderSuccessPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import CategoriesPage from './views/CategoriesPage';
import AboutPage from './views/AboutPage';
import ContactPage from './views/ContactPage';

function App() {
  return (
    <BookProvider>
      <CartProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/book/:id" element={<BookDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* 404 route */}
                <Route path="*" element={
                  <div className="bg-gray-50 py-12 md:py-16 flex items-center justify-center">
                    <div className="text-center px-4">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">404 - Không tìm thấy trang</h1>
                      <p className="text-gray-600">Trang bạn tìm kiếm không tồn tại</p>
                    </div>
                  </div>
                } />
              </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </CartProvider>
    </BookProvider>
  );
}

export default App;