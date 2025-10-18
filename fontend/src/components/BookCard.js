import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const BookCard = ({ book }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(book.id);
  const isAddingRef = useRef(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple rapid clicks
    if (isAddingRef.current) {
      console.log('Already adding, ignoring click');
      return;
    }
    
    isAddingRef.current = true;
    console.log('Button clicked for book:', book.tieuDe);
    addToCart(book, 1);
    
    // Reset after 500ms
    setTimeout(() => {
      isAddingRef.current = false;
    }, 500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-link">
        {/* Book Image */}
        <div className="book-image">
              <img
                src={book.hinhAnh || '/book-placeholder.svg'}
                alt={book.tieuDe}
                onError={(e) => {
                  e.target.src = '/book-placeholder.svg';
                }}
              />
        </div>

        {/* Book Info */}
        <div className="book-info">
          <h3 className="book-title">
            {book.tieuDe}
          </h3>
          
          {book.tacGia && (
            <p className="book-author">
              Tác giả: {book.tacGia}
            </p>
          )}

          {book.nhaXuatBan && (
            <p className="book-publisher">
              NXB: {book.nhaXuatBan}
            </p>
          )}

          {/* Rating unified slot */}
          <div className="rating-slot">
            {book.danhGia && (
              <div className="rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`star ${
                        i < Math.floor(book.danhGia)
                          ? 'star-filled'
                          : 'star-empty'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="rating-text">({book.danhGia}/5)</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - Outside Link */}
      <div className="book-actions">
        <span className="book-price">
          {formatPrice(book.giaBan || 0)}
        </span>
        
        <button
          onClick={handleAddToCart}
          className={`add-to-cart ${isInCart(book.id) ? 'added' : ''}`}
        >
          {isInCart(book.id) ? (
            <div className="flex items-center space-x-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs">({quantity})</span>
            </div>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
