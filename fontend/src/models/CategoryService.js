// CategoryService.js - Service để xử lý các API liên quan đến danh mục sách

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class CategoryService {
  // Lấy tất cả danh mục
  async getAllCategories() {
    try {
      // Mock data - replace with actual API call
      const mockCategories = [
        {
          id: 1,
          name: 'Văn học',
          slug: 'van-hoc',
          description: 'Những tác phẩm văn học kinh điển và đương đại',
          image: '/images/categories/van-hoc.jpg',
          bookCount: 156,
          color: 'from-purple-500 to-pink-500',
          featured: true,
          popularity: 95
        },
        {
          id: 2,
          name: 'Khoa học',
          slug: 'khoa-hoc',
          description: 'Sách khoa học, công nghệ và nghiên cứu',
          image: '/images/categories/khoa-hoc.jpg',
          bookCount: 89,
          color: 'from-blue-500 to-cyan-500',
          featured: false,
          popularity: 78
        },
        {
          id: 3,
          name: 'Lịch sử',
          slug: 'lich-su',
          description: 'Sách lịch sử Việt Nam và thế giới',
          image: '/images/categories/lich-su.jpg',
          bookCount: 67,
          color: 'from-amber-500 to-orange-500',
          featured: false,
          popularity: 65
        },
        {
          id: 4,
          name: 'Kinh tế',
          slug: 'kinh-te',
          description: 'Sách kinh tế, tài chính và kinh doanh',
          image: '/images/categories/kinh-te.jpg',
          bookCount: 124,
          color: 'from-green-500 to-emerald-500',
          featured: true,
          popularity: 82
        },
        {
          id: 5,
          name: 'Tâm lý học',
          slug: 'tam-ly-hoc',
          description: 'Sách về tâm lý học và phát triển bản thân',
          image: '/images/categories/tam-ly-hoc.jpg',
          bookCount: 78,
          color: 'from-indigo-500 to-purple-500',
          featured: false,
          popularity: 70
        },
        {
          id: 6,
          name: 'Thiếu nhi',
          slug: 'thieu-nhi',
          description: 'Sách dành cho trẻ em và thiếu nhi',
          image: '/images/categories/thieu-nhi.jpg',
          bookCount: 203,
          color: 'from-pink-500 to-rose-500',
          featured: true,
          popularity: 88
        },
        {
          id: 7,
          name: 'Ngoại ngữ',
          slug: 'ngoai-ngu',
          description: 'Sách học ngoại ngữ và từ điển',
          image: '/images/categories/ngoai-ngu.jpg',
          bookCount: 145,
          color: 'from-teal-500 to-cyan-500',
          featured: false,
          popularity: 75
        },
        {
          id: 8,
          name: 'Nghệ thuật',
          slug: 'nghe-thuat',
          description: 'Sách về nghệ thuật, mỹ thuật và thiết kế',
          image: '/images/categories/nghe-thuat.jpg',
          bookCount: 92,
          color: 'from-red-500 to-pink-500',
          featured: false,
          popularity: 68
        },
        {
          id: 9,
          name: 'Y học',
          slug: 'y-hoc',
          description: 'Sách y học, sức khỏe và dinh dưỡng',
          image: '/images/categories/y-hoc.jpg',
          bookCount: 134,
          color: 'from-emerald-500 to-teal-500',
          featured: false,
          popularity: 80
        },
        {
          id: 10,
          name: 'Pháp luật',
          slug: 'phap-luat',
          description: 'Sách pháp luật và luật học',
          image: '/images/categories/phap-luat.jpg',
          bookCount: 87,
          color: 'from-slate-500 to-gray-500',
          featured: false,
          popularity: 60
        },
        {
          id: 11,
          name: 'Triết học',
          slug: 'triet-hoc',
          description: 'Sách triết học và tư tưởng',
          image: '/images/categories/triet-hoc.jpg',
          bookCount: 56,
          color: 'from-violet-500 to-purple-500',
          featured: false,
          popularity: 55
        },
        {
          id: 12,
          name: 'Du lịch',
          slug: 'du-lich',
          description: 'Sách du lịch và khám phá thế giới',
          image: '/images/categories/du-lich.jpg',
          bookCount: 98,
          color: 'from-sky-500 to-blue-500',
          featured: false,
          popularity: 72
        },
        {
          id: 13,
          name: 'Thể thao',
          slug: 'the-thao',
          description: 'Sách về thể thao và vận động',
          image: '/images/categories/the-thao.jpg',
          bookCount: 73,
          color: 'from-orange-500 to-red-500',
          featured: false,
          popularity: 58
        },
        {
          id: 14,
          name: 'Nấu ăn',
          slug: 'nau-an',
          description: 'Sách nấu ăn và ẩm thực',
          image: '/images/categories/nau-an.jpg',
          bookCount: 112,
          color: 'from-yellow-500 to-orange-500',
          featured: false,
          popularity: 77
        },
        {
          id: 15,
          name: 'Làm vườn',
          slug: 'lam-vuon',
          description: 'Sách về làm vườn và cây cảnh',
          image: '/images/categories/lam-vuon.jpg',
          bookCount: 45,
          color: 'from-lime-500 to-green-500',
          featured: false,
          popularity: 45
        },
        {
          id: 16,
          name: 'Công nghệ',
          slug: 'cong-nghe',
          description: 'Sách về công nghệ thông tin và lập trình',
          image: '/images/categories/cong-nghe.jpg',
          bookCount: 167,
          color: 'from-cyan-500 to-blue-500',
          featured: true,
          popularity: 90
        },
        {
          id: 17,
          name: 'Tôn giáo',
          slug: 'ton-giao',
          description: 'Sách về tôn giáo và tâm linh',
          image: '/images/categories/ton-giao.jpg',
          bookCount: 89,
          color: 'from-amber-500 to-yellow-500',
          featured: false,
          popularity: 62
        },
        {
          id: 18,
          name: 'Huyền bí',
          slug: 'huyen-bi',
          description: 'Sách về huyền bí và siêu nhiên',
          image: '/images/categories/huyen-bi.jpg',
          bookCount: 76,
          color: 'from-purple-500 to-indigo-500',
          featured: false,
          popularity: 52
        },
        {
          id: 19,
          name: 'Truyện tranh',
          slug: 'truyen-tranh',
          description: 'Truyện tranh và manga',
          image: '/images/categories/truyen-tranh.jpg',
          bookCount: 234,
          color: 'from-rose-500 to-pink-500',
          featured: true,
          popularity: 85
        },
        {
          id: 20,
          name: 'Sách giáo khoa',
          slug: 'sach-giao-khoa',
          description: 'Sách giáo khoa và tài liệu học tập',
          image: '/images/categories/sach-giao-khoa.jpg',
          bookCount: 345,
          color: 'from-blue-500 to-indigo-500',
          featured: true,
          popularity: 92
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        data: mockCategories
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy danh mục theo ID
  async getCategoryById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải thông tin danh mục');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy danh mục theo slug
  async getCategoryBySlug(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/slug/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải thông tin danh mục');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy sách theo danh mục
  async getBooksByCategory(categoryId, params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 12,
        sort: params.sort || 'created_at',
        order: params.order || 'desc',
        ...params
      });

      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/books?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải sách theo danh mục');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy sách theo slug danh mục
  async getBooksByCategorySlug(slug, params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 12,
        sort: params.sort || 'created_at',
        order: params.order || 'desc',
        ...params
      });

      const response = await fetch(`${API_BASE_URL}/categories/slug/${slug}/books?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải sách theo danh mục');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Tìm kiếm sách trong danh mục
  async searchBooksInCategory(categoryId, searchTerm, params = {}) {
    try {
      const queryParams = new URLSearchParams({
        q: searchTerm,
        page: params.page || 1,
        limit: params.limit || 12,
        sort: params.sort || 'relevance',
        order: params.order || 'desc',
        ...params
      });

      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tìm kiếm sách trong danh mục');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy danh mục phổ biến
  async getPopularCategories(limit = 8) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/popular?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải danh mục phổ biến');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy sách mới trong danh mục
  async getNewBooksInCategory(categoryId, limit = 6) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/books/new?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải sách mới trong danh mục');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy sách bán chạy trong danh mục
  async getBestsellersInCategory(categoryId, limit = 6) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/books/bestsellers?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải sách bán chạy trong danh mục');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Lấy thống kê danh mục
  async getCategoryStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải thống kê danh mục');
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Tạo instance duy nhất
const categoryService = new CategoryService();

export default categoryService;
