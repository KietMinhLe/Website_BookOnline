import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './contexts/BookContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { AdminProvider } from './admin/contexts/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './views/HomePage';
import BookDetailPage from './views/BookDetailPage';
import CartPage from './views/CartPage';
import CheckoutPage from './views/CheckoutPage';
import OrderSuccessPage from './views/OrderSuccessPage';
import AuthPage from './views/AuthPage';
import ProfilePage from './views/ProfilePage';
import OrdersPage from './views/OrdersPage';
import FavoritesPage from './views/FavoritesPage';
import CategoriesPage from './views/CategoriesPage';
import BooksByCategoryPage from './views/BooksByCategoryPage';
import AboutPage from './views/AboutPage';
import ContactPage from './views/ContactPage';

// Admin imports
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminBooks from './admin/pages/AdminBooks';
import AdminCategories from './admin/pages/AdminCategories';
import AdminOrders from './admin/pages/AdminOrders';
import AdminUsers from './admin/pages/AdminUsers';
import AdminAnalytics from './admin/pages/AdminAnalytics';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <CartProvider>
          <CategoryProvider>
            <AdminProvider>
              <Router>
                <Routes>
                  {/* User routes */}
                  <Route path="/*" element={
                    <div className="min-h-screen bg-gray-50 flex flex-col">
                      <Header />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/book/:id" element={<BookDetailPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="/order-success" element={<OrderSuccessPage />} />
                          <Route path="/login" element={<AuthPage />} />
                          <Route path="/register" element={<AuthPage />} />
                          <Route path="/profile" element={
                            <ProtectedRoute>
                              <ProfilePage />
                            </ProtectedRoute>
                          } />
                          <Route path="/orders" element={
                            <ProtectedRoute>
                              <OrdersPage />
                            </ProtectedRoute>
                          } />
                          <Route path="/favorites" element={
                            <ProtectedRoute>
                              <FavoritesPage />
                            </ProtectedRoute>
                          } />
                          <Route path="/categories" element={<CategoriesPage />} />
                          <Route path="/categories/:slug" element={<BooksByCategoryPage />} />
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
                  } />

                  {/* Admin routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/books" element={
                    <AdminProtectedRoute>
                      <AdminBooks />
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/categories" element={
                    <AdminProtectedRoute>
                      <AdminCategories />
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <AdminProtectedRoute>
                      <AdminOrders />
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <AdminProtectedRoute>
                      <AdminUsers />
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/analytics" element={
                    <AdminProtectedRoute>
                      <AdminAnalytics />
                    </AdminProtectedRoute>
                  } />
                </Routes>
              </Router>
            </AdminProvider>
          </CategoryProvider>
        </CartProvider>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;