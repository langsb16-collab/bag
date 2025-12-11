// HTML 페이지 생성 함수들

export function getMainPageHTML() {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Luxury Review Hub - Global Luxury Price Comparison</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .glass { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); }
          .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
          .transition-all { transition: all 0.3s ease; }
          .animate-fade-in { animation: fadeIn 0.6s ease-in; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Hero Section -->
        <div class="gradient-bg text-white">
            <div class="container mx-auto px-4 py-8">
                <!-- Language Selector -->
                <div class="flex justify-end mb-4">
                    <div id="langSelector"></div>
                </div>
                
                <div class="text-center animate-fade-in py-8 md:py-16">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        <i class="fas fa-gem mr-3"></i>
                        <span id="hero-title"></span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 opacity-90" id="hero-subtitle"></p>
                    <p class="text-lg md:text-xl mb-10 opacity-80" id="hero-description"></p>
                    
                    <!-- Search Bar -->
                    <div class="max-w-3xl mx-auto">
                        <div class="relative">
                            <input 
                                type="text" 
                                id="searchInput"
                                placeholder=""
                                class="w-full px-6 py-5 pr-16 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-2xl"
                            >
                            <button 
                                onclick="searchProducts()"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-all"
                            >
                                <i class="fas fa-search mr-2"></i><span id="search-btn"></span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
                        <div class="glass rounded-lg p-4">
                            <div class="text-3xl font-bold">200+</div>
                            <div class="text-sm opacity-80" id="stat-stores"></div>
                        </div>
                        <div class="glass rounded-lg p-4">
                            <div class="text-3xl font-bold">10,000+</div>
                            <div class="text-sm opacity-80" id="stat-products"></div>
                        </div>
                        <div class="glass rounded-lg p-4">
                            <div class="text-3xl font-bold">50,000+</div>
                            <div class="text-sm opacity-80" id="stat-reviews"></div>
                        </div>
                        <div class="glass rounded-lg p-4">
                            <div class="text-3xl font-bold">A~D</div>
                            <div class="text-sm opacity-80" id="stat-trust"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="container mx-auto px-4 py-16">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                <i class="fas fa-star text-yellow-500 mr-2"></i>
                <span id="features-title"></span>
            </h2>
            
            <div class="grid md:grid-cols-3 gap-8 mb-16">
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">💰</div>
                    <h3 class="text-xl font-bold mb-3" id="feature-price-title"></h3>
                    <p class="text-gray-600" id="feature-price-desc"></p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">✅</div>
                    <h3 class="text-xl font-bold mb-3" id="feature-seller-title"></h3>
                    <p class="text-gray-600" id="feature-seller-desc"></p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">📝</div>
                    <h3 class="text-xl font-bold mb-3" id="feature-review-title"></h3>
                    <p class="text-gray-600" id="feature-review-desc"></p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">🔍</div>
                    <h3 class="text-xl font-bold mb-3" id="feature-auth-title"></h3>
                    <p class="text-gray-600" id="feature-auth-desc"></p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">📊</div>
                    <h3 class="text-xl font-bold mb-3" id="feature-trend-title"></h3>
                    <p class="text-gray-600" id="feature-trend-desc"></p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">🌍</div>
                    <h3 class="text-xl font-bold mb-3" id="feature-global-title"></h3>
                    <p class="text-gray-600" id="feature-global-desc"></p>
                </div>
            </div>
        </div>

        <!-- Popular Brands -->
        <div class="bg-white py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-crown text-yellow-500 mr-2"></i>
                    <span id="popular-brands-title"></span>
                </h2>
                <div id="popularBrands" class="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div class="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- Best Deals -->
        <div class="container mx-auto px-4 py-16">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                <i class="fas fa-fire text-red-500 mr-2"></i>
                <span id="best-deals-title"></span>
            </h2>
            <div id="bestDeals" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            </div>
        </div>

        <!-- Search Results -->
        <div id="searchResults" class="container mx-auto px-4 py-8 hidden">
            <h2 class="text-2xl font-bold mb-6" id="search-results-title"></h2>
            <div id="searchContent"></div>
        </div>

        <!-- Footer -->
        <footer class="gradient-bg text-white py-12 mt-16">
            <div class="container mx-auto px-4 text-center">
                <p class="text-lg mb-4" id="footer-copyright"></p>
                <p class="opacity-80" id="footer-tagline"></p>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/i18n.js"></script>
        <script>
          // 다국어 텍스트 적용
          function applyTranslations() {
            document.getElementById('hero-title').textContent = t('hero_title');
            document.getElementById('hero-subtitle').textContent = t('hero_subtitle');
            document.getElementById('hero-description').textContent = t('hero_description');
            document.getElementById('searchInput').placeholder = t('search_placeholder');
            document.getElementById('search-btn').textContent = t('search_button');
            
            document.getElementById('stat-stores').textContent = t('stat_stores');
            document.getElementById('stat-products').textContent = t('stat_products');
            document.getElementById('stat-reviews').textContent = t('stat_reviews');
            document.getElementById('stat-trust').textContent = t('stat_trust');
            
            document.getElementById('features-title').textContent = t('features_title');
            document.getElementById('feature-price-title').textContent = t('feature_price_title');
            document.getElementById('feature-price-desc').textContent = t('feature_price_desc');
            document.getElementById('feature-seller-title').textContent = t('feature_seller_title');
            document.getElementById('feature-seller-desc').textContent = t('feature_seller_desc');
            document.getElementById('feature-review-title').textContent = t('feature_review_title');
            document.getElementById('feature-review-desc').textContent = t('feature_review_desc');
            document.getElementById('feature-auth-title').textContent = t('feature_auth_title');
            document.getElementById('feature-auth-desc').textContent = t('feature_auth_desc');
            document.getElementById('feature-trend-title').textContent = t('feature_trend_title');
            document.getElementById('feature-trend-desc').textContent = t('feature_trend_desc');
            document.getElementById('feature-global-title').textContent = t('feature_global_title');
            document.getElementById('feature-global-desc').textContent = t('feature_global_desc');
            
            document.getElementById('popular-brands-title').textContent = t('popular_brands');
            document.getElementById('best-deals-title').textContent = t('best_deals');
            document.getElementById('search-results-title').textContent = t('search_results');
            
            document.getElementById('footer-copyright').textContent = t('footer_copyright');
            document.getElementById('footer-tagline').textContent = t('footer_tagline');
            
            // 언어 선택기 추가
            document.getElementById('langSelector').innerHTML = getLangSelectorHTML();
          }
          
          // 검색 기능
          async function searchProducts() {
            const keyword = document.getElementById('searchInput').value.trim();
            if (!keyword) {
              alert(t('enter_keyword'));
              return;
            }
            
            try {
              const response = await axios.get('/api/search?q=' + encodeURIComponent(keyword));
              displaySearchResults(response.data.data);
            } catch (error) {
              console.error('검색 오류:', error);
              alert('검색 중 오류가 발생했습니다');
            }
          }
          
          // 검색 결과 표시
          function displaySearchResults(data) {
            const resultsDiv = document.getElementById('searchResults');
            const contentDiv = document.getElementById('searchContent');
            
            let html = '';
            
            if (data.brands.length > 0) {
              html += '<h3 class="text-xl font-bold mb-4">' + t('popular_brands') + '</h3>';
              html += '<div class="grid md:grid-cols-3 gap-4 mb-8">';
              data.brands.forEach(brand => {
                html += \`
                  <div class="bg-white rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition-all" onclick="location.href='/brand/\${brand.id}'">
                    <h4 class="font-bold text-lg">\${brand.name}</h4>
                    <p class="text-sm text-gray-600">\${brand.category}</p>
                  </div>
                \`;
              });
              html += '</div>';
            }
            
            if (data.products.length > 0) {
              html += '<h3 class="text-xl font-bold mb-4">' + t('brand_products') + '</h3>';
              html += '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">';
              data.products.forEach(product => {
                html += \`
                  <div class="bg-white rounded-lg p-6 shadow card-hover cursor-pointer" onclick="location.href='/product/\${product.id}'">
                    <h4 class="font-bold text-lg mb-2">\${product.brand_name}</h4>
                    <p class="text-gray-800 mb-2">\${product.model_name}</p>
                    <p class="text-purple-600 font-bold">\${product.official_price ? product.official_price.toLocaleString() + ' ' + (currentLang === 'en' ? 'USD' : currentLang === 'zh' ? '元' : currentLang === 'ja' ? '円' : currentLang === 'vi' ? 'VND' : currentLang === 'mn' ? '₮' : currentLang === 'ru' ? '₽' : '원') : t('official_price')}</p>
                  </div>
                \`;
              });
              html += '</div>';
            }
            
            if (data.brands.length === 0 && data.products.length === 0) {
              html = '<p class="text-center text-gray-600">' + t('no_results') + '</p>';
            }
            
            contentDiv.innerHTML = html;
            resultsDiv.classList.remove('hidden');
            resultsDiv.scrollIntoView({ behavior: 'smooth' });
          }
          
          // 엔터키로 검색
          document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchProducts();
          });
          
          // 인기 브랜드 로드
          async function loadPopularBrands() {
            try {
              const response = await axios.get('/api/brands/top/popular');
              const brands = response.data.data;
              
              const html = brands.map(brand => \`
                <div class="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg card-hover cursor-pointer transition-all" onclick="location.href='/brand/\${brand.id}'">
                  <h3 class="font-bold text-lg mb-2">\${brand.name}</h3>
                  <p class="text-sm opacity-90">\${brand.category}</p>
                  <p class="text-xs mt-2 opacity-75">\${brand.product_count || 0} \${t('products_count')}</p>
                </div>
              \`).join('');
              
              document.getElementById('popularBrands').innerHTML = html;
            } catch (error) {
              console.error('브랜드 로드 오류:', error);
            }
          }
          
          // 최저가 상품 로드
          async function loadBestDeals() {
            try {
              const response = await axios.get('/api/products/deals/best');
              const products = response.data.data;
              
              const html = products.map(product => \`
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover cursor-pointer transition-all" onclick="location.href='/product/\${product.id}'">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h3 class="font-bold text-lg">\${product.brand_name}</h3>
                      <p class="text-gray-600">\${product.model_name}</p>
                    </div>
                    <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -\${product.discount_rate}%
                    </span>
                  </div>
                  <div class="border-t pt-3">
                    <p class="text-sm text-gray-500 line-through">\${product.official_price.toLocaleString()}</p>
                    <p class="text-2xl font-bold text-purple-600">\${product.lowest_price.toLocaleString()}</p>
                    <p class="text-sm text-green-600 mt-2">
                      <i class="fas fa-check-circle mr-1"></i>
                      \${(product.official_price - product.lowest_price).toLocaleString()} \${t('save_amount')}
                    </p>
                  </div>
                </div>
              \`).join('');
              
              document.getElementById('bestDeals').innerHTML = html;
            } catch (error) {
              console.error('최저가 로드 오류:', error);
            }
          }
          
          // 페이지 로드 시 실행
          applyTranslations();
          loadPopularBrands();
          loadBestDeals();
        </script>
    </body>
    </html>
  `;
}
