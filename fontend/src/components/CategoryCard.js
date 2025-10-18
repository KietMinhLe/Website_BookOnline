import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'Văn học': '📚',
      'Khoa học': '🔬',
      'Lịch sử': '🏛️',
      'Kinh tế': '💰',
      'Tâm lý học': '🧠',
      'Thiếu nhi': '👶',
      'Ngoại ngữ': '🌍',
      'Nghệ thuật': '🎨',
      'Y học': '⚕️',
      'Pháp luật': '⚖️',
      'Triết học': '🤔',
      'Du lịch': '✈️',
      'Thể thao': '⚽',
      'Nấu ăn': '👨‍🍳',
      'Làm vườn': '🌱',
      'Công nghệ': '💻',
      'Tôn giáo': '🕊️',
      'Huyền bí': '🔮',
      'Truyện tranh': '📖',
      'Sách giáo khoa': '📝'
    };
    return iconMap[categoryName] || '📖';
  };

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
        {/* Category Header */}
        <div className={`h-40 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center text-white">
              <div className="text-5xl mb-3 drop-shadow-lg">
                {getCategoryIcon(category.name)}
              </div>
              <h3 className="text-lg font-bold drop-shadow-md">{category.name}</h3>
            </div>
          </div>
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* Category Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
              {category.name}
            </h3>
            <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {category.bookCount}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {category.description}
          </p>
          
          {/* Action Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
              <span>Khám phá</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            
            {/* Featured Badge */}
            {category.featured && (
              <div className="flex items-center text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Nổi bật
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
