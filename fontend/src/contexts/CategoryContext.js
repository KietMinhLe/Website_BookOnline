import React, { createContext, useContext, useReducer, useEffect } from 'react';
import categoryService from '../models/CategoryService';

// Initial state
const initialState = {
  categories: [],
  filteredCategories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
  searchTerm: '',
  sortBy: 'name',
  filters: {
    bookCountRange: [0, 1000],
    hasBooks: true,
    featured: false
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 20
  }
};

// Action types
const CATEGORY_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_FILTERED_CATEGORIES: 'SET_FILTERED_CATEGORIES',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  RESET_STATE: 'RESET_STATE'
};

// Reducer
const categoryReducer = (state, action) => {
  switch (action.type) {
    case CATEGORY_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case CATEGORY_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        filteredCategories: action.payload,
        isLoading: false,
        error: null
      };
    
    case CATEGORY_ACTIONS.SET_FILTERED_CATEGORIES:
      return {
        ...state,
        filteredCategories: action.payload
      };
    
    case CATEGORY_ACTIONS.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };
    
    case CATEGORY_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case CATEGORY_ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
        pagination: { ...state.pagination, currentPage: 1 }
      };
    
    case CATEGORY_ACTIONS.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
        pagination: { ...state.pagination, currentPage: 1 }
      };
    
    case CATEGORY_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, currentPage: 1 }
      };
    
    case CATEGORY_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      };
    
    case CATEGORY_ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        searchTerm: '',
        sortBy: 'name',
        filters: initialState.filters,
        pagination: { ...state.pagination, currentPage: 1 }
      };
    
    case CATEGORY_ACTIONS.RESET_STATE:
      return initialState;
    
    default:
      return state;
  }
};

// Create context
const CategoryContext = createContext();

// CategoryProvider component
export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  // Load categories
  const loadCategories = async () => {
    dispatch({ type: CATEGORY_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const result = await categoryService.getAllCategories();
      
      if (result.success) {
        dispatch({ type: CATEGORY_ACTIONS.SET_CATEGORIES, payload: result.data });
      } else {
        dispatch({ type: CATEGORY_ACTIONS.SET_ERROR, payload: result.error });
      }
    } catch (error) {
      dispatch({ type: CATEGORY_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Load category by slug
  const loadCategoryBySlug = async (slug) => {
    dispatch({ type: CATEGORY_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const result = await categoryService.getCategoryBySlug(slug);
      
      if (result.success) {
        dispatch({ type: CATEGORY_ACTIONS.SET_SELECTED_CATEGORY, payload: result.data });
      } else {
        dispatch({ type: CATEGORY_ACTIONS.SET_ERROR, payload: result.error });
      }
    } catch (error) {
      dispatch({ type: CATEGORY_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Filter and sort categories
  const applyFiltersAndSort = () => {
    let filtered = [...state.categories];

    // Search filter
    if (state.searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Book count filter
    filtered = filtered.filter(category =>
      category.bookCount >= state.filters.bookCountRange[0] &&
      category.bookCount <= state.filters.bookCountRange[1]
    );

    // Has books filter
    if (state.filters.hasBooks) {
      filtered = filtered.filter(category => category.bookCount > 0);
    }

    // Featured filter
    if (state.filters.featured) {
      filtered = filtered.filter(category => category.featured);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'bookCount':
          return b.bookCount - a.bookCount;
        case 'newest':
          return b.id - a.id;
        case 'popular':
          return (b.popularity || 0) - (a.popularity || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // Pagination
    const startIndex = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
    const endIndex = startIndex + state.pagination.itemsPerPage;
    const paginatedCategories = filtered.slice(startIndex, endIndex);

    dispatch({ type: CATEGORY_ACTIONS.SET_FILTERED_CATEGORIES, payload: paginatedCategories });
    
    // Update pagination
    const totalPages = Math.ceil(filtered.length / state.pagination.itemsPerPage);
    dispatch({ 
      type: CATEGORY_ACTIONS.SET_PAGINATION, 
      payload: { 
        ...state.pagination, 
        totalPages,
        totalItems: filtered.length
      } 
    });
  };

  // Actions
  const setSearchTerm = (term) => {
    dispatch({ type: CATEGORY_ACTIONS.SET_SEARCH_TERM, payload: term });
  };

  const setSortBy = (sortBy) => {
    dispatch({ type: CATEGORY_ACTIONS.SET_SORT_BY, payload: sortBy });
  };

  const setFilters = (filters) => {
    dispatch({ type: CATEGORY_ACTIONS.SET_FILTERS, payload: filters });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: CATEGORY_ACTIONS.SET_PAGINATION, payload: { currentPage: page } });
  };

  const clearFilters = () => {
    dispatch({ type: CATEGORY_ACTIONS.CLEAR_FILTERS });
  };

  const resetState = () => {
    dispatch({ type: CATEGORY_ACTIONS.RESET_STATE });
  };

  // Apply filters when dependencies change
  useEffect(() => {
    if (state.categories.length > 0) {
      applyFiltersAndSort();
    }
  }, [state.categories, state.searchTerm, state.sortBy, state.filters, state.pagination.currentPage]);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const value = {
    ...state,
    loadCategories,
    loadCategoryBySlug,
    setSearchTerm,
    setSortBy,
    setFilters,
    setCurrentPage,
    clearFilters,
    resetState
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use category context
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

export default CategoryContext;
