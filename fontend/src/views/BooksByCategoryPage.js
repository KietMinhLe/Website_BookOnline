import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';

const BooksByCategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategoryAndBooks();
  }, [slug, currentPage, sortBy, sortOrder, searchTerm]);

  const fetchCategoryAndBooks = async () => {
    try {
      setIsLoading(true);
      
      // Mock categories data - same as in CategoriesPage
      const categoriesData = {
        'lap-trinh': {
          id: 1,
          name: 'Lập trình',
          slug: 'lap-trinh',
          description: 'Sách về lập trình và phát triển phần mềm',
          bookCount: 245,
          color: 'from-blue-500 to-cyan-500'
        },
        'kinh-doanh': {
          id: 2,
          name: 'Kinh doanh',
          slug: 'kinh-doanh',
          description: 'Sách về khởi nghiệp và quản lý doanh nghiệp',
          bookCount: 189,
          color: 'from-green-500 to-emerald-500'
        },
        'thiet-ke': {
          id: 3,
          name: 'Thiết kế',
          slug: 'thiet-ke',
          description: 'Sách về thiết kế UI/UX và đồ họa',
          bookCount: 156,
          color: 'from-purple-500 to-pink-500'
        },
        'marketing': {
          id: 4,
          name: 'Marketing',
          slug: 'marketing',
          description: 'Sách về marketing và quảng cáo',
          bookCount: 178,
          color: 'from-orange-500 to-red-500'
        },
        'tai-chinh': {
          id: 5,
          name: 'Tài chính',
          slug: 'tai-chinh',
          description: 'Sách về đầu tư và quản lý tài chính',
          bookCount: 134,
          color: 'from-yellow-500 to-orange-500'
        },
        'ky-nang-mem': {
          id: 6,
          name: 'Kỹ năng mềm',
          slug: 'ky-nang-mem',
          description: 'Sách về phát triển kỹ năng cá nhân',
          bookCount: 267,
          color: 'from-indigo-500 to-purple-500'
        },
        'ngoai-ngu': {
          id: 7,
          name: 'Ngoại ngữ',
          slug: 'ngoai-ngu',
          description: 'Sách học tiếng Anh và các ngôn ngữ khác',
          bookCount: 198,
          color: 'from-teal-500 to-cyan-500'
        },
        'suc-khoe': {
          id: 8,
          name: 'Sức khỏe',
          slug: 'suc-khoe',
          description: 'Sách về sức khỏe và lối sống lành mạnh',
          bookCount: 145,
          color: 'from-emerald-500 to-teal-500'
        },
        'du-lich': {
          id: 9,
          name: 'Du lịch',
          slug: 'du-lich',
          description: 'Sách về du lịch và khám phá thế giới',
          bookCount: 123,
          color: 'from-sky-500 to-blue-500'
        },
        'nau-an': {
          id: 10,
          name: 'Nấu ăn',
          slug: 'nau-an',
          description: 'Sách về ẩm thực và nấu ăn',
          bookCount: 167,
          color: 'from-red-500 to-pink-500'
        },
        'the-thao': {
          id: 11,
          name: 'Thể thao',
          slug: 'the-thao',
          description: 'Sách về thể thao và fitness',
          bookCount: 98,
          color: 'from-orange-500 to-yellow-500'
        },
        'nghe-thuat': {
          id: 12,
          name: 'Nghệ thuật',
          slug: 'nghe-thuat',
          description: 'Sách về nghệ thuật và sáng tạo',
          bookCount: 112,
          color: 'from-pink-500 to-rose-500'
        }
      };

      // Mock books data for each category
      const booksData = {
        'lap-trinh': [
          {
            id: 1,
            title: 'Clean Code',
            author: 'Robert C. Martin',
            publisher: 'NXB Trẻ',
            price: 299000,
            image: '/images/books/clean-code.jpg',
            rating: 4.8,
            reviewCount: 1245,
            description: 'Cuốn sách kinh điển về viết code sạch và dễ bảo trì'
          },
          {
            id: 2,
            title: 'JavaScript: The Good Parts',
            author: 'Douglas Crockford',
            publisher: 'NXB Trẻ',
            price: 199000,
            image: '/images/books/javascript-good-parts.jpg',
            rating: 4.6,
            reviewCount: 892,
            description: 'Khám phá những phần tốt nhất của JavaScript'
          },
          {
            id: 3,
            title: 'React: Up & Running',
            author: 'Stoyan Stefanov',
            publisher: 'NXB Trẻ',
            price: 249000,
            image: '/images/books/react-up-running.jpg',
            rating: 4.7,
            reviewCount: 1567,
            description: 'Học React từ cơ bản đến nâng cao'
          },
          {
            id: 4,
            title: 'Python Crash Course',
            author: 'Eric Matthes',
            publisher: 'NXB Trẻ',
            price: 179000,
            image: '/images/books/python-crash-course.jpg',
            rating: 4.5,
            reviewCount: 2341,
            description: 'Khóa học Python cấp tốc cho người mới bắt đầu'
          },
          {
            id: 5,
            title: 'System Design Interview',
            author: 'Alex Xu',
            publisher: 'NXB Trẻ',
            price: 399000,
            image: '/images/books/system-design.jpg',
            rating: 4.9,
            reviewCount: 567,
            description: 'Chuẩn bị cho phỏng vấn thiết kế hệ thống'
          },
          {
            id: 6,
            title: 'Algorithms to Live By',
            author: 'Brian Christian',
            publisher: 'NXB Trẻ',
            price: 229000,
            image: '/images/books/algorithms-to-live-by.jpg',
            rating: 4.4,
            reviewCount: 1234,
            description: 'Thuật toán trong cuộc sống hàng ngày'
          }
        ],
        'kinh-doanh': [
          {
            id: 7,
            title: 'Lean Startup',
            author: 'Eric Ries',
            publisher: 'NXB Trẻ',
            price: 199000,
            image: '/images/books/lean-startup.jpg',
            rating: 4.7,
            reviewCount: 1890,
            description: 'Phương pháp khởi nghiệp tinh gọn'
          },
          {
            id: 8,
            title: 'Good to Great',
            author: 'Jim Collins',
            publisher: 'NXB Trẻ',
            price: 249000,
            image: '/images/books/good-to-great.jpg',
            rating: 4.6,
            reviewCount: 1456,
            description: 'Từ tốt đến vĩ đại'
          },
          {
            id: 9,
            title: 'The Lean Canvas',
            author: 'Ash Maurya',
            publisher: 'NXB Trẻ',
            price: 179000,
            image: '/images/books/lean-canvas.jpg',
            rating: 4.5,
            reviewCount: 987,
            description: 'Mô hình kinh doanh tinh gọn'
          },
          {
            id: 10,
            title: 'Zero to One',
            author: 'Peter Thiel',
            publisher: 'NXB Trẻ',
            price: 229000,
            image: '/images/books/zero-to-one.jpg',
            rating: 4.8,
            reviewCount: 2134,
            description: 'Từ không đến một'
          }
        ],
        'thiet-ke': [
          {
            id: 11,
            title: 'Don\'t Make Me Think',
            author: 'Steve Krug',
            publisher: 'NXB Trẻ',
            price: 199000,
            image: '/images/books/dont-make-me-think.jpg',
            rating: 4.7,
            reviewCount: 1678,
            description: 'Nguyên tắc thiết kế web thân thiện'
          },
          {
            id: 12,
            title: 'The Design of Everyday Things',
            author: 'Don Norman',
            publisher: 'NXB Trẻ',
            price: 249000,
            image: '/images/books/design-everyday-things.jpg',
            rating: 4.6,
            reviewCount: 1234,
            description: 'Thiết kế những thứ hàng ngày'
          }
        ],
        'marketing': [
          {
            id: 13,
            title: 'Influence: The Psychology of Persuasion',
            author: 'Robert Cialdini',
            publisher: 'NXB Trẻ',
            price: 229000,
            image: '/images/books/influence.jpg',
            rating: 4.8,
            reviewCount: 1890,
            description: 'Tâm lý học thuyết phục trong marketing'
          },
          {
            id: 14,
            title: 'Contagious: Why Things Catch On',
            author: 'Jonah Berger',
            publisher: 'NXB Trẻ',
            price: 199000,
            image: '/images/books/contagious.jpg',
            rating: 4.5,
            reviewCount: 1456,
            description: 'Tại sao mọi thứ trở nên viral'
          }
        ],
        'tai-chinh': [
          {
            id: 15,
            title: 'Rich Dad Poor Dad',
            author: 'Robert Kiyosaki',
            publisher: 'NXB Trẻ',
            price: 179000,
            image: '/images/books/rich-dad-poor-dad.jpg',
            rating: 4.6,
            reviewCount: 2341,
            description: 'Cha giàu cha nghèo'
          },
          {
            id: 16,
            title: 'The Intelligent Investor',
            author: 'Benjamin Graham',
            publisher: 'NXB Trẻ',
            price: 299000,
            image: '/images/books/intelligent-investor.jpg',
            rating: 4.7,
            reviewCount: 1678,
            description: 'Nhà đầu tư thông minh'
          }
        ],
        'ky-nang-mem': [
          {
            id: 17,
            title: 'Atomic Habits',
            author: 'James Clear',
            publisher: 'NXB Trẻ',
            price: 199000,
            image: '/images/books/atomic-habits.jpg',
            rating: 4.8,
            reviewCount: 2134,
            description: 'Thói quen nguyên tử'
          },
          {
            id: 18,
            title: 'The 7 Habits of Highly Effective People',
            author: 'Stephen Covey',
            publisher: 'NXB Trẻ',
            price: 249000,
            image: '/images/books/7-habits.jpg',
            rating: 4.7,
            reviewCount: 1890,
            description: '7 thói quen của người thành đạt'
          }
        ],
        'ngoai-ngu': [
          {
            id: 19,
            title: 'English Grammar in Use',
            author: 'Raymond Murphy',
            publisher: 'NXB Trẻ',
            price: 179000,
            image: '/images/books/english-grammar.jpg',
            rating: 4.6,
            reviewCount: 1456,
            description: 'Ngữ pháp tiếng Anh thực hành'
          },
          {
            id: 20,
            title: 'Cambridge IELTS',
            author: 'Cambridge University Press',
            publisher: 'NXB Trẻ',
            price: 229000,
            image: '/images/books/cambridge-ielts.jpg',
            rating: 4.7,
            reviewCount: 1234,
            description: 'Tài liệu luyện thi IELTS'
          }
        ],
        'suc-khoe': [
          {
            id: 21,
            title: 'The Blue Zones',
            author: 'Dan Buettner',
            publisher: 'NXB Trẻ',
            price: 199000,
            image: '/images/books/blue-zones.jpg',
            rating: 4.5,
            reviewCount: 1678,
            description: 'Vùng xanh - bí quyết sống lâu'
          },
          {
            id: 22,
            title: 'Why We Sleep',
            author: 'Matthew Walker',
            publisher: 'NXB Trẻ',
            price: 229000,
            image: '/images/books/why-we-sleep.jpg',
            rating: 4.8,
            reviewCount: 1890,
            description: 'Tại sao chúng ta ngủ'
          }
        ],
        'du-lich': [
          {
            id: 23,
            title: 'Lonely Planet Vietnam',
            author: 'Lonely Planet',
            publisher: 'NXB Trẻ',
            price: 299000,
            image: '/images/books/lonely-planet-vietnam.jpg',
            rating: 4.6,
            reviewCount: 1234,
            description: 'Cẩm nang du lịch Việt Nam'
          },
          {
            id: 24,
            title: 'Eat, Pray, Love',
            author: 'Elizabeth Gilbert',
            publisher: 'NXB Trẻ',
            price: 179000,
            image: '/images/books/eat-pray-love.jpg',
            rating: 4.4,
            reviewCount: 1456,
            description: 'Ăn, cầu nguyện, yêu'
          }
        ],
        'nau-an': [
          {
            id: 25,
            title: 'Mastering the Art of French Cooking',
            author: 'Julia Child',
            publisher: 'NXB Trẻ',
            price: 399000,
            image: '/images/books/french-cooking.jpg',
            rating: 4.7,
            reviewCount: 1678,
            description: 'Nghệ thuật nấu ăn Pháp'
          },
          {
            id: 26,
            title: 'Salt, Fat, Acid, Heat',
            author: 'Samin Nosrat',
            publisher: 'NXB Trẻ',
            price: 229000,
            image: '/images/books/salt-fat-acid-heat.jpg',
            rating: 4.8,
            reviewCount: 1890,
            description: 'Muối, mỡ, axit, nhiệt'
          }
        ],
        'the-thao': [
          {
            id: 27,
            title: 'Born to Run',
            author: 'Christopher McDougall',
            publisher: 'NXB Trẻ',
            price: 199000,
            image: '/images/books/born-to-run.jpg',
            rating: 4.5,
            reviewCount: 1234,
            description: 'Sinh ra để chạy'
          },
          {
            id: 28,
            title: 'The Sports Gene',
            author: 'David Epstein',
            publisher: 'NXB Trẻ',
            price: 229000,
            image: '/images/books/sports-gene.jpg',
            rating: 4.6,
            reviewCount: 1456,
            description: 'Gen thể thao'
          }
        ],
        'nghe-thuat': [
          {
            id: 29,
            title: 'The Story of Art',
            author: 'E.H. Gombrich',
            publisher: 'NXB Trẻ',
            price: 299000,
            image: '/images/books/story-of-art.jpg',
            rating: 4.7,
            reviewCount: 1678,
            description: 'Câu chuyện nghệ thuật'
          },
          {
            id: 30,
            title: 'Ways of Seeing',
            author: 'John Berger',
            publisher: 'NXB Trẻ',
            price: 199000,
            image: '/images/books/ways-of-seeing.jpg',
            rating: 4.6,
            reviewCount: 1234,
            description: 'Cách nhìn'
          }
        ]
      };

      // Get category data
      const categoryData = categoriesData[slug];
      if (!categoryData) {
        setError('Không tìm thấy danh mục');
        return;
      }

      // Get books for this category
      const categoryBooks = booksData[slug] || [];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCategory(categoryData);
      setBooks(categoryBooks);
      setTotalPages(Math.ceil(categoryBooks.length / 12));
    } catch (err) {
      setError('Không thể tải dữ liệu danh mục');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    // Implement search logic here
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/categories" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Quay lại danh mục
          </Link>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy danh mục</h2>
          <p className="text-gray-600 mb-4">Danh mục bạn tìm kiếm không tồn tại</p>
          <Link 
            to="/categories" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Quay lại danh mục
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className={`bg-gradient-to-r ${category.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Link 
              to="/categories" 
              className="text-white hover:text-blue-200 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Danh mục
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-white text-opacity-90 max-w-3xl mx-auto mb-6">
              {category.description}
            </p>
            <div className="flex items-center justify-center text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {category.bookCount} sách
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm sách trong danh mục..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Sắp xếp theo:</label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="created_at-desc">Mới nhất</option>
                <option value="created_at-asc">Cũ nhất</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="rating-desc">Đánh giá cao nhất</option>
                <option value="title-asc">Tên A-Z</option>
                <option value="title-desc">Tên Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Không có sách nào</h3>
            <p className="text-gray-600">Danh mục này chưa có sách nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksByCategoryPage;
