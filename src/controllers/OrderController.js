import { useState, useEffect, useCallback } from 'react';
import { OrderService } from '../services';
import { Order } from '../models';

export const useOrderController = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderStats, setOrderStats] = useState(null);

  // Tạo đơn hàng mới
  const createOrder = useCallback(async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await OrderService.createOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy danh sách đơn hàng của user
  const fetchUserOrders = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await OrderService.getUserOrders(params);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy đơn hàng theo ID
  const fetchOrderById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const order = await OrderService.getOrderById(id);
      setCurrentOrder(order);
      return order;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật trạng thái đơn hàng (admin)
  const updateOrderStatus = useCallback(async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await OrderService.updateOrderStatus(id, status);
      setOrders(prev => prev.map(order => order.id === id ? updatedOrder : order));
      if (currentOrder && currentOrder.id === id) {
        setCurrentOrder(updatedOrder);
      }
      return updatedOrder;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentOrder]);

  // Hủy đơn hàng
  const cancelOrder = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const cancelledOrder = await OrderService.cancelOrder(id);
      setOrders(prev => prev.map(order => order.id === id ? cancelledOrder : order));
      if (currentOrder && currentOrder.id === id) {
        setCurrentOrder(cancelledOrder);
      }
      return cancelledOrder;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentOrder]);

  // Lấy tất cả đơn hàng (admin)
  const fetchAllOrders = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await OrderService.getAllOrders(params);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy thống kê đơn hàng (admin)
  const fetchOrderStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await OrderService.getOrderStats();
      setOrderStats(stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lọc đơn hàng theo trạng thái
  const filterOrdersByStatus = useCallback((status) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  // Lọc đơn hàng theo ngày
  const filterOrdersByDate = useCallback((startDate, endDate) => {
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  }, [orders]);

  // Tính tổng doanh thu
  const calculateTotalRevenue = useCallback(() => {
    return orders.reduce((total, order) => {
      if (order.status === 'delivered') {
        return total + order.total;
      }
      return total;
    }, 0);
  }, [orders]);

  // Tính số đơn hàng theo trạng thái
  const getOrderCountByStatus = useCallback(() => {
    const statusCount = {};
    orders.forEach(order => {
      statusCount[order.status] = (statusCount[order.status] || 0) + 1;
    });
    return statusCount;
  }, [orders]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    orders,
    currentOrder,
    loading,
    error,
    orderStats,
    
    // Actions
    createOrder,
    fetchUserOrders,
    fetchOrderById,
    updateOrderStatus,
    cancelOrder,
    fetchAllOrders,
    fetchOrderStats,
    filterOrdersByStatus,
    filterOrdersByDate,
    calculateTotalRevenue,
    getOrderCountByStatus,
    clearError
  };
};

