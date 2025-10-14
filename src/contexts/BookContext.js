import React, { createContext, useContext, useReducer, useEffect } from 'react';
import BookService from '../models/BookService';

// Action types
const BOOK_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_BOOKS: 'SET_BOOKS',
  SET_CURRENT_BOOK: 'SET_CURRENT_BOOK',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  CLEAR_SEARCH: 'CLEAR_SEARCH'
};

// Initial state
const initialState = {
  books: [],
  currentBook: null,
  categories: [],
  searchResults: [],
  loading: false,
  error: null,
  searchQuery: ''
};

// Reducer
const bookReducer = (state, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case BOOK_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case BOOK_ACTIONS.SET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case BOOK_ACTIONS.SET_CURRENT_BOOK:
      return {
        ...state,
        currentBook: action.payload,
        loading: false,
        error: null
      };

    case BOOK_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null
      };

    case BOOK_ACTIONS.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
        searchQuery: action.query,
        loading: false,
        error: null
      };

    case BOOK_ACTIONS.CLEAR_SEARCH:
      return {
        ...state,
        searchResults: [],
        searchQuery: ''
      };

    default:
      return state;
  }
};

// Context
const BookContext = createContext();

// Provider component
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Load books and categories on mount
  useEffect(() => {
    loadBooks();
    loadCategories();
  }, []);

  // Actions
  const loadBooks = async () => {
    try {
      dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
      const books = await BookService.getAllBooks();
      dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: books });
    } catch (error) {
      // Nếu không có backend, sử dụng dữ liệu mẫu
      console.log('Backend không khả dụng, sử dụng dữ liệu mẫu:', error.message);
      const mockBooks = [
        {
          id: 1,
          tieuDe: "Đắc Nhân Tâm",
          tacGia: "Dale Carnegie",
          nhaXuatBan: "NXB Tổng hợp TP.HCM",
          namXuatBan: 2023,
          giaBan: 89000,
          giaGoc: 120000,
          hinhAnh: "/images/dacnhantam.jpg",
          moTa: "Cuốn sách kinh điển về nghệ thuật giao tiếp và thuyết phục.",
          danhGia: 4.5,
          soTrang: 320,
          kichThuoc: "13 x 20.5 cm",
          trongLuong: "300g"
        },
        {
          id: 2,
          tieuDe: "Nhà Giả Kim",
          tacGia: "Paulo Coelho",
          nhaXuatBan: "NXB Hội Nhà Văn",
          namXuatBan: 2023,
          giaBan: 95000,
          giaGoc: 110000,
          hinhAnh: "/images/nhagiakim.jpg",
          moTa: "Câu chuyện về hành trình tìm kiếm kho báu và ý nghĩa cuộc sống.",
          danhGia: 4.7,
          soTrang: 180,
          kichThuoc: "13 x 20.5 cm",
          trongLuong: "250g"
        },
        {
          id: 3,
          tieuDe: "Tôi Tài Giỏi, Bạn Cũng Thế",
          tacGia: "Adam Khoo",
          nhaXuatBan: "NXB Phụ Nữ",
          namXuatBan: 2023,
          giaBan: 120000,
          giaGoc: 150000,
          hinhAnh: "/images/toitaigioi.jpg",
          moTa: "Cuốn sách về phương pháp học tập hiệu quả và phát triển bản thân.",
          danhGia: 4.3,
          soTrang: 400,
          kichThuoc: "14 x 20.5 cm",
          trongLuong: "450g"
        },
        {
          id: 4,
          tieuDe: "7 Thói Quen Của Người Thành Đạt",
          tacGia: "Stephen R. Covey",
          nhaXuatBan: "NXB Tổng hợp TP.HCM",
          namXuatBan: 2023,
          giaBan: 180000,
          giaGoc: 200000,
          hinhAnh: "/images/7thoiquen.jpg",
          moTa: "7 thói quen giúp bạn trở thành người thành đạt trong cuộc sống.",
          danhGia: 4.6,
          soTrang: 450,
          kichThuoc: "15 x 22 cm",
          trongLuong: "600g"
        },
        {
          id: 5,
          tieuDe: "Sapiens - Lược Sử Loài Người",
          tacGia: "Yuval Noah Harari",
          nhaXuatBan: "NXB Thế Giới",
          namXuatBan: 2023,
          giaBan: 220000,
          giaGoc: 250000,
          hinhAnh: "/images/sapiens.jpg",
          moTa: "Lịch sử tiến hóa và phát triển của loài người từ thời tiền sử đến hiện tại.",
          danhGia: 4.8,
          soTrang: 500,
          kichThuoc: "15 x 22 cm",
          trongLuong: "700g"
        }
      ];
      dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: mockBooks });
    }
  };

  const loadBookById = async (id) => {
    try {
      dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
      const book = await BookService.getBookById(id);
      dispatch({ type: BOOK_ACTIONS.SET_CURRENT_BOOK, payload: book });
    } catch (error) {
      // Sử dụng dữ liệu mẫu nếu không có backend
      const mockBooks = [
        {
          id: 1,
          tieuDe: "Đắc Nhân Tâm",
          tacGia: "Dale Carnegie",
          nhaXuatBan: "NXB Tổng hợp TP.HCM",
          namXuatBan: 2023,
          giaBan: 89000,
          giaGoc: 120000,
          hinhAnh: "/images/book-1-dac-nhan-tam.jpg",
          moTa: "Cuốn sách kinh điển về nghệ thuật giao tiếp và thuyết phục.",
          danhGia: 4.5,
          soTrang: 320,
          kichThuoc: "13 x 20.5 cm",
          trongLuong: "300g"
        }
      ];
      const book = mockBooks.find(b => b.id === parseInt(id)) || mockBooks[0];
      dispatch({ type: BOOK_ACTIONS.SET_CURRENT_BOOK, payload: book });
    }
  };

  const loadBooksByCategory = async (categoryId) => {
    try {
      dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
      const books = await BookService.getBooksByCategory(categoryId);
      dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: books });
    } catch (error) {
      dispatch({ type: BOOK_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const loadCategories = async () => {
    try {
      dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
      const categories = await BookService.getCategories();
      dispatch({ type: BOOK_ACTIONS.SET_CATEGORIES, payload: categories });
    } catch (error) {
      // Sử dụng dữ liệu mẫu nếu không có backend
      console.log('Backend không khả dụng cho categories, sử dụng dữ liệu mẫu:', error.message);
      const mockCategories = [
        { id: 1, ten: "Tiểu thuyết" },
        { id: 2, ten: "Khoa học" },
        { id: 3, ten: "Lịch sử" },
        { id: 4, ten: "Nghệ thuật" },
        { id: 5, ten: "Thể thao" },
        { id: 6, ten: "Du lịch" }
      ];
      dispatch({ type: BOOK_ACTIONS.SET_CATEGORIES, payload: mockCategories });
    }
  };

  const searchBooks = async (query) => {
    if (!query.trim()) {
      dispatch({ type: BOOK_ACTIONS.CLEAR_SEARCH });
      return;
    }

    try {
      dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
      const results = await BookService.searchBooks(query);
      dispatch({ 
        type: BOOK_ACTIONS.SET_SEARCH_RESULTS, 
        payload: results,
        query: query
      });
    } catch (error) {
      dispatch({ type: BOOK_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const clearSearch = () => {
    dispatch({ type: BOOK_ACTIONS.CLEAR_SEARCH });
  };

  const clearError = () => {
    dispatch({ type: BOOK_ACTIONS.SET_ERROR, payload: null });
  };

  const value = {
    ...state,
    loadBooks,
    loadBookById,
    loadBooksByCategory,
    loadCategories,
    searchBooks,
    clearSearch,
    clearError
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

// Hook to use book context
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
