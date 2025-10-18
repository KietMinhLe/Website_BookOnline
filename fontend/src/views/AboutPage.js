import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-50 via-transparent to-blue-50 opacity-60"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-25 animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent">
              Về BookStore
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
              Nền tảng mua sắm sách trực tuyến hàng đầu Việt Nam, 
              mang đến trải nghiệm đọc sách tuyệt vời cho mọi người
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl font-bold text-red-600 mb-2">50K+</div>
                <div className="text-gray-700 text-lg font-medium">Sách có sẵn</div>
                <div className="text-gray-500 text-sm">Từ 100+ nhà xuất bản</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl font-bold text-blue-600 mb-2">100K+</div>
                <div className="text-gray-700 text-lg font-medium">Khách hàng</div>
                <div className="text-gray-500 text-sm">Trên toàn quốc</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl font-bold text-green-600 mb-2">99%</div>
                <div className="text-gray-700 text-lg font-medium">Hài lòng</div>
                <div className="text-gray-500 text-sm">Từ khách hàng</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="group">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-1 shadow-2xl group-hover:shadow-red-500/25 transition-all duration-300">
              <div className="bg-white rounded-3xl p-10 h-full">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900">Sứ mệnh</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Chúng tôi cam kết mang đến những cuốn sách chất lượng cao, 
                  đa dạng về thể loại và phù hợp với mọi lứa tuổi. 
                  Mục tiêu của chúng tôi là khuyến khích văn hóa đọc sách 
                  và phát triển tri thức trong cộng đồng.
                </p>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-1 shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
              <div className="bg-white rounded-3xl p-10 h-full">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900">Tầm nhìn</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Trở thành nền tảng thương mại điện tử sách hàng đầu Việt Nam, 
                  nơi mọi người có thể dễ dàng tìm kiếm, mua sắm và thưởng thức 
                  những cuốn sách hay nhất từ khắp nơi trên thế giới.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những nguyên tắc và giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chất lượng</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chúng tôi chỉ cung cấp những cuốn sách chính hãng, 
                chất lượng cao từ các nhà xuất bản uy tín.
              </p>
            </div>

            <div className="text-center group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Đam mê</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chúng tôi yêu sách và tin rằng sách có thể thay đổi cuộc đời, 
                truyền cảm hứng và mở ra những chân trời mới.
              </p>
            </div>

            <div className="text-center group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cộng đồng</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Xây dựng một cộng đồng yêu sách, nơi mọi người có thể 
                chia sẻ, học hỏi và phát triển cùng nhau.
              </p>
            </div>
          </div>
        </div>
        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tại sao chọn BookStore?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những lý do khiến BookStore trở thành lựa chọn hàng đầu của khách hàng
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 min-w-[140px]">
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <div className="text-red-600 text-lg">⚡</div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Giao hàng nhanh</h3>
              <p className="text-sm text-gray-600">24h tại TP.HCM</p>
            </div>
            
            <div className="text-center group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 min-w-[140px]">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <div className="text-green-600 text-lg">💰</div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Giá tốt nhất</h3>
              <p className="text-sm text-gray-600">Cạnh tranh nhất</p>
            </div>
            
            <div className="text-center group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 min-w-[140px]">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <div className="text-blue-600 text-lg">🛡️</div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Bảo hành</h3>
              <p className="text-sm text-gray-600">30 ngày đổi trả</p>
            </div>
            
            <div className="text-center group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 min-w-[140px]">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <div className="text-white text-lg">💬</div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Hỗ trợ 24/7</h3>
              <p className="text-sm text-gray-600">Chuyên nghiệp</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-3xl p-16 text-center text-gray-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-4 h-4 bg-red-500 opacity-30 rounded-full animate-ping"></div>
            <div className="absolute top-20 right-20 w-3 h-3 bg-yellow-500 opacity-40 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-blue-500 opacity-25 rounded-full animate-bounce"></div>
            <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-green-500 opacity-50 rounded-full animate-ping"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
              Sẵn sàng bắt đầu hành trình đọc sách?
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Khám phá thế giới sách vô tận và tìm kiếm những cuốn sách phù hợp với bạn
            </p>
            

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">24/7</div>
                <div className="text-gray-700 text-lg">Hỗ trợ khách hàng</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">30</div>
                <div className="text-gray-700 text-lg">Ngày đổi trả miễn phí</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">100%</div>
                <div className="text-gray-700 text-lg">Sách chính hãng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
