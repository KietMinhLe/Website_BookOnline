import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import { 
  AdminLayout, 
  AdminRoute, 
  AdminDashboard, 
  AdminLoginPage,
  AdminBooksPage,
  AdminOrdersPage,
  AdminUsersPage,
  AdminCategoriesPage,
  AdminSettingsPage,
  AdminReportsPage
} from './admin';
import HomePage from './views/HomePage';
import BooksPage from './views/BooksPage';
import BookDetailPage from './views/BookDetailPage';
import CategoriesPage from './views/CategoriesPage';
import CategoryDetailPage from './views/CategoryDetailPage';
import AboutPage from './views/AboutPage';
import CartPage from './views/CartPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ProfilePage from './views/ProfilePage';
import OrdersPage from './views/OrdersPage';
import CheckoutPage from './views/CheckoutPage';
import NotificationPage from './views/NotificationPage';
import HelpPage from './views/HelpPage';
import ShippingPage from './views/ShippingPage';
import ReturnPage from './views/ReturnPage';
import PrivacyPage from './views/PrivacyPage';
import NotFoundPage from './views/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        {/* Admin Routes - No Layout (No Header/Footer) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={
          <AdminRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/books" element={<AdminBooksPage />} />
                <Route path="/orders" element={<AdminOrdersPage />} />
                <Route path="/users" element={<AdminUsersPage />} />
                <Route path="/categories" element={<AdminCategoriesPage />} />
                <Route path="/settings" element={<AdminSettingsPage />} />
                <Route path="/reports" element={<AdminReportsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AdminLayout>
          </AdminRoute>
        } />
        
        {/* User Routes - With Layout (Header/Footer) */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:slug" element={<CategoryDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Support Pages */}
              <Route path="/help" element={<HelpPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/return" element={<ReturnPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
      
      {/* Toast Container for all pages */}
      <ToastContainer />
    </>
  );
}

export default App;