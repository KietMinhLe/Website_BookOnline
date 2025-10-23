import { useState, useEffect, useCallback } from 'react';
import { Cart } from '../models';

export const useCartController = () => {
  const [cart, setCart] = useState(new Cart());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart from localStorage khi component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        setCart(Cart.fromJSON(cartData));
      } catch (err) {
        console.error('Error loading cart from localStorage:', err);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage khi cart thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.toJSON()));
  }, [cart]);

  // Thêm sách vào giỏ hàng
  const addToCart = useCallback((book, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      const newCart = new Cart();
      newCart.items = [...cart.items];
      newCart.total = cart.total;
      newCart.updatedAt = cart.updatedAt;
      
      newCart.addItem(book, quantity);
      setCart(newCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Xóa sách khỏi giỏ hàng
  const removeFromCart = useCallback((bookId) => {
    setLoading(true);
    setError(null);
    try {
      const newCart = new Cart();
      newCart.items = [...cart.items];
      newCart.total = cart.total;
      newCart.updatedAt = cart.updatedAt;
      
      newCart.removeItem(bookId);
      setCart(newCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Cập nhật số lượng sách trong giỏ hàng
  const updateQuantity = useCallback((bookId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const newCart = new Cart();
      newCart.items = [...cart.items];
      newCart.total = cart.total;
      newCart.updatedAt = cart.updatedAt;
      
      newCart.updateQuantity(bookId, quantity);
      setCart(newCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Xóa tất cả sách khỏi giỏ hàng
  const clearCart = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      const newCart = new Cart();
      setCart(newCart);
      localStorage.removeItem('cart');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Kiểm tra sách có trong giỏ hàng không
  const isInCart = useCallback((bookId) => {
    return cart.items.some(item => item.book.id === bookId);
  }, [cart.items]);

  // Lấy số lượng sách trong giỏ hàng
  const getQuantity = useCallback((bookId) => {
    const item = cart.items.find(item => item.book.id === bookId);
    return item ? item.quantity : 0;
  }, [cart.items]);

  // Tính tổng tiền với thuế và phí ship
  const calculateTotalWithTaxAndShipping = useCallback((taxRate = 0.1, shippingFee = 30000) => {
    const subtotal = cart.total;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingFee;
    
    return {
      subtotal,
      tax,
      shippingFee,
      total
    };
  }, [cart.total]);

  // Validate giỏ hàng trước khi checkout
  const validateCart = useCallback(() => {
    const errors = [];
    
    if (cart.isEmpty()) {
      errors.push('Giỏ hàng trống');
    }
    
    cart.items.forEach(item => {
      if (!item.book.isInStock()) {
        errors.push(`Sách "${item.book.title}" đã hết hàng`);
      }
      if (item.quantity > item.book.stock) {
        errors.push(`Số lượng sách "${item.book.title}" vượt quá số lượng có sẵn`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }, [cart]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    cart,
    loading,
    error,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getQuantity,
    calculateTotalWithTaxAndShipping,
    validateCart,
    clearError
  };
};

