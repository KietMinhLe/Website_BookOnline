import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Action types
const CART_ACTIONS = {
  LOAD_CART: 'LOAD_CART',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART'
};

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null
};

// Helper functions
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cartItems');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price || item.giaBan || 0) * item.quantity, 0);
};

const calculateItemCount = (items) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

// Reducer
const cartReducer = (state, action) => {
  let newItems;
  
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      const cart = action.payload;
      return {
        ...state,
        items: cart,
        total: calculateTotal(cart),
        itemCount: calculateItemCount(cart),
        loading: false
      };

    case CART_ACTIONS.ADD_ITEM:
      const { book, quantity } = action.payload;
      console.log('ADD_ITEM reducer - book:', book.tieuDe, 'quantity:', quantity);
      
      const existingItemIndex = state.items.findIndex(item => item.id === book.id);
      console.log('Existing item index:', existingItemIndex);
      
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
        console.log('Updated existing item quantity to:', newItems[existingItemIndex].quantity);
      } else {
        const newItem = {
          ...book,
          quantity,
          price: book.price || book.giaBan || 0,
          title: book.title || book.tieuDe,
          image: book.image || book.hinhAnh
        };
        newItems = [...state.items, newItem];
        console.log('Added new item:', newItem.tieuDe);
      }
      
      console.log('Final items count:', newItems.length);
      saveCartToStorage(newItems);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      const { bookId, quantity: newQuantity } = action.payload;
      newItems = state.items.map(item =>
        item.id === bookId 
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      );
      
      saveCartToStorage(newItems);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };

    case CART_ACTIONS.REMOVE_ITEM:
      const { bookId: removeBookId } = action.payload;
      newItems = state.items.filter(item => item.id !== removeBookId);
      
      saveCartToStorage(newItems);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };

    case CART_ACTIONS.CLEAR_CART:
      saveCartToStorage([]);
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };

    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      dispatch({
        type: CART_ACTIONS.LOAD_CART,
        payload: getCartFromStorage()
      });
    };

    loadCart();
  }, []);

  // Actions
  const addToCart = (book, quantity = 1) => {
    console.log('Adding to cart:', book.tieuDe, 'quantity:', quantity);
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { book, quantity }
    });
  };

  const updateQuantity = (bookId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { bookId, quantity }
    });
  };

  const removeFromCart = (bookId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { bookId }
    });
  };

  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR_CART
    });
  };

  const isInCart = (bookId) => {
    return state.items.some(item => item.id === bookId);
  };

  const getItemQuantity = (bookId) => {
    const item = state.items.find(item => item.id === bookId);
    return item ? item.quantity : 0;
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
