import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setCategories([
        { id: 1, name: 'Kỹ năng sống', description: 'Sách về phát triển bản thân và kỹ năng', color: '#10B981', bookCount: 25 },
        { id: 2, name: 'Giáo dục', description: 'Sách giáo dục và học tập', color: '#F59E0B', bookCount: 18 },
        { id: 3, name: 'Lịch sử', description: 'Sách lịch sử và văn hóa', color: '#8B5CF6', bookCount: 12 },
        { id: 4, name: 'Công nghệ', description: 'Sách về công nghệ và lập trình', color: '#EF4444', bookCount: 20 },
        { id: 5, name: 'Kinh doanh', description: 'Sách về kinh doanh và khởi nghiệp', color: '#06B6D4', bookCount: 15 },
        { id: 6, name: 'Văn học', description: 'Tác phẩm văn học và tiểu thuyết', color: '#84CC16', bookCount: 30 }
      ]);
      
      setIsLoading(false);
    };
    
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Edit category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        ...formData,
        bookCount: 0
      };
      setCategories([...categories, newCategory]);
    }
    
    setShowAddModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', color: '#3B82F6' });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
              <p className="text-gray-600">Quản lý các danh mục sách trong hệ thống</p>
            </div>
            <div className="flex space-x-3">
              <Link 
                to="/admin" 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Quay lại Dashboard
              </Link>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Thêm danh mục mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Categories Grid */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Danh sách danh mục ({categories.length})
              </h3>
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <h4 className="font-semibold text-gray-900 text-lg">{category.name}</h4>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">
                        {category.bookCount} cuốn sách
                      </span>
                      <span 
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.name}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm hover:bg-red-200 transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên danh mục</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên danh mục"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Nhập mô tả danh mục"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Màu sắc</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingCategory(null);
                      setFormData({ name: '', description: '', color: '#3B82F6' });
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingCategory ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;