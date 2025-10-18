import React from 'react';

const FavoritesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Sách yêu thích</h1>
            
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có sách yêu thích</h3>
              <p className="mt-1 text-sm text-gray-500">
                Bạn chưa thêm sách nào vào danh sách yêu thích. Hãy khám phá và thêm sách yêu thích!
              </p>
              <div className="mt-6">
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Khám phá sách
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
