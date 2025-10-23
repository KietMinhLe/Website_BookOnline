import { useState, useEffect, useCallback } from 'react';
import { BookService } from '../services';
import { Book } from '../models';

export const useBookController = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);

  // Lấy danh sách tất cả sách
  const fetchBooks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await BookService.getAllBooks(params);
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy sách theo ID
  const fetchBookById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const book = await BookService.getBookById(id);
      setCurrentBook(book);
      return book;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Tìm kiếm sách
  const searchBooks = useCallback(async (query, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const results = await BookService.searchBooks(query, filters);
      setSearchResults(results);
      return results;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy sách theo danh mục
  const fetchBooksByCategory = useCallback(async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await BookService.getBooksByCategory(categoryId);
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy sách bán chạy
  const fetchBestSellingBooks = useCallback(async (limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await BookService.getBestSellingBooks(limit);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy sách mới nhất
  const fetchNewestBooks = useCallback(async (limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await BookService.getNewestBooks(limit);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Tạo sách mới (admin)
  const createBook = useCallback(async (bookData) => {
    setLoading(true);
    setError(null);
    try {
      const newBook = await BookService.createBook(bookData);
      setBooks(prev => [...prev, newBook]);
      return newBook;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật sách (admin)
  const updateBook = useCallback(async (id, bookData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedBook = await BookService.updateBook(id, bookData);
      setBooks(prev => prev.map(book => book.id === id ? updatedBook : book));
      if (currentBook && currentBook.id === id) {
        setCurrentBook(updatedBook);
      }
      return updatedBook;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentBook]);

  // Xóa sách (admin)
  const deleteBook = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await BookService.deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
      if (currentBook && currentBook.id === id) {
        setCurrentBook(null);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentBook]);

  // Lọc sách theo giá
  const filterBooksByPrice = useCallback((minPrice, maxPrice) => {
    return books.filter(book => book.price >= minPrice && book.price <= maxPrice);
  }, [books]);

  // Sắp xếp sách
  const sortBooks = useCallback((sortBy) => {
    const sortedBooks = [...books].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'rating-desc':
          return b.getAverageRating() - a.getAverageRating();
        default:
          return 0;
      }
    });
    setBooks(sortedBooks);
  }, [books]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    books,
    loading,
    error,
    currentBook,
    searchResults,
    categories,
    
    // Actions
    fetchBooks,
    fetchBookById,
    searchBooks,
    fetchBooksByCategory,
    fetchBestSellingBooks,
    fetchNewestBooks,
    createBook,
    updateBook,
    deleteBook,
    filterBooksByPrice,
    sortBooks,
    clearError
  };
};

