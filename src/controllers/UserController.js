import { useState, useEffect, useCallback } from 'react';
import { UserService } from '../services';
import { User } from '../models';

export const useUserController = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kiểm tra authentication khi component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(User.fromJSON(parsedUser));
        setIsAuthenticated(true);
      } catch (err) {
        // Nếu có lỗi parse, xóa data cũ
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Đăng ký
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { user: newUser, token } = await UserService.register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser.toJSON()));
      return { user: newUser, token };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Đăng nhập
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user: loggedInUser, token } = await UserService.login(email, password);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser.toJSON()));
      return { user: loggedInUser, token };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Đăng xuất
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await UserService.logout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (err) {
      // Ngay cả khi có lỗi, vẫn logout local
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật profile
  const updateProfile = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await UserService.updateProfile(userData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser.toJSON()));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Đổi mật khẩu
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await UserService.changePassword(currentPassword, newPassword);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Quên mật khẩu
  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      await UserService.forgotPassword(email);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset mật khẩu
  const resetPassword = useCallback(async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await UserService.resetPassword(token, newPassword);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy thông tin user hiện tại
  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const currentUser = await UserService.getCurrentUser();
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser.toJSON()));
      return currentUser;
    } catch (err) {
      setError(err.message);
      // Nếu không thể lấy thông tin user, logout
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Kiểm tra quyền admin
  const isAdmin = useCallback(() => {
    return user && user.isAdmin();
  }, [user]);

  // Kiểm tra quyền customer
  const isCustomer = useCallback(() => {
    return user && user.isCustomer();
  }, [user]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    user,
    loading,
    error,
    isAuthenticated,
    
    // Actions
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    isAdmin,
    isCustomer,
    clearError
  };
};

