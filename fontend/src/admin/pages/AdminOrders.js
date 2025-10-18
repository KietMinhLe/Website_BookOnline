import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setOrders([
        { id: 1, customer: 'Nguyễn Văn A', email: 'nguyenvana@email.com', amount: 250000, status: 'Đã giao', date: '2024-01-15', items: 3 },
        { id: 2, customer: 'Trần Thị B', email: 'tranthib@email.com', amount: 180000, status: 'Đang giao', date: '2024-01-14', items: 2 },
        { id: 3, customer: 'Lê Văn C', email: 'levanc@email.com', amount: 320000, status: 'Chờ xử lý', date: '2024-01-13', items: 4 },
        { id: 4, customer: 'Phạm Thị D', email: 'phamthid@email.com', amount: 150000, status: 'Đã giao', date: '2024-01-12', items: 1 },
        { id: 5, customer: 'Hoàng Văn E', email: 'hoangvane@email.com', amount: 280000, status: 'Đang giao', date: '2024-01-11', items: 2 },
        { id: 6, customer: 'Vũ Thị F', email: 'vuthif@email.com', amount: 450000, status: 'Chờ xử lý', date: '2024-01-10', items: 5 },
        { id: 7, customer: 'Đỗ Văn G', email: 'dovang@email.com', amount: 200000, status: 'Đã giao', date: '2024-01-09', items: 2 },
        { id: 8, customer: 'Bùi Thị H', email: 'buithih@email.com', amount: 350000, status: 'Đang giao', date: '2024-01-08', items: 3 }
      ]);
      
      setIsLoading(false);
    };
    
    loadOrders();
  }, []);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã giao': return 'bg-green-100 text-green-800';
      case 'Đang giao': return 'bg-yellow-100 text-yellow-800';
      case 'Chờ xử lý': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
              <p className="text-gray-600">Quản lý và theo dõi đơn hàng của khách hàng</p>
            </div>
            <Link 
              to="/admin" 
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Quay lại Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filter */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Lọc theo trạng thái:</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="Chờ xử lý">Chờ xử lý</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Danh sách đơn hàng ({filteredOrders.length})
            </h3>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Khách hàng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tổng tiền
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày đặt
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.items} sản phẩm
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₫{order.amount.toLocaleString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            Xem chi tiết
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            Cập nhật
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
