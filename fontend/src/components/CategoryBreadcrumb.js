import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CategoryBreadcrumb = () => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'Trang chủ', path: '/' }
    ];

    if (pathSegments[0] === 'categories') {
      breadcrumbs.push({ name: 'Danh mục', path: '/categories' });
      
      if (pathSegments[1]) {
        // Get category name from slug (you might want to get this from context)
        const categoryName = pathSegments[1]
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        breadcrumbs.push({ 
          name: categoryName, 
          path: `/categories/${pathSegments[1]}`,
          current: true 
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {breadcrumb.current ? (
            <span className="text-gray-900 font-medium">{breadcrumb.name}</span>
          ) : (
            <Link 
              to={breadcrumb.path}
              className="hover:text-blue-600 transition-colors"
            >
              {breadcrumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default CategoryBreadcrumb;
