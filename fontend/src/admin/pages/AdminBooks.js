import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setBooks([
        { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kỹ năng sống', price: 89000, stock: 50, image: '/images/book1.jpg', description: 'Cuốn sách về nghệ thuật thu phục lòng người' },
        { id: 2, title: 'Tôi Tài Giỏi, Bạn Cũng Thế', author: 'Adam Khoo', category: 'Giáo dục', price: 120000, stock: 30, image: '/images/book2.jpg', description: 'Phương pháp học tập hiệu quả' },
        { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Lịch sử', price: 150000, stock: 25, image: '/images/book3.jpg', description: 'Lược sử loài người' },
        { id: 4, title: 'Atomic Habits', author: 'James Clear', category: 'Kỹ năng sống', price: 110000, stock: 40, image: '/images/book4.jpg', description: 'Thay đổi nhỏ tạo nên sự khác biệt lớn' },
        { id: 5, title: 'Clean Code', author: 'Robert Martin', category: 'Công nghệ', price: 200000, stock: 15, image: '/images/book5.jpg', description: 'Nghệ thuật viết code sạch' },
        { id: 6, title: 'The Lean Startup', author: 'Eric Ries', category: 'Kinh doanh', price: 130000, stock: 20, image: '/images/book6.jpg', description: 'Phương pháp khởi nghiệp tinh gọn' }
      ]);
      
      setIsLoading(false);
    };
    
    loadBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Kỹ năng sống', 'Giáo dục', 'Lịch sử', 'Công nghệ', 'Kinh doanh'];

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý sách</h1>
              <p className="text-gray-600">Quản lý danh mục sách trong hệ thống</p>
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
                + Thêm sách mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Filter */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                <input
                  type="text"
                  placeholder="Tìm theo tên sách hoặc tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Tất cả danh mục' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Danh sách sách ({filteredBooks.length})
              </h3>
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-w-3 aspect-h-4 mb-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{book.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">Tác giả: {book.author}</p>
                    <p className="text-sm text-gray-600 mb-2">Danh mục: {book.category}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-blue-600">₫{book.price.toLocaleString('vi-VN')}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        book.stock > 20 ? 'bg-green-100 text-green-800' : 
                        book.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {book.stock > 0 ? `Còn ${book.stock} cuốn` : 'Hết hàng'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
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
    </div>
  );
};

export default AdminBooks;
