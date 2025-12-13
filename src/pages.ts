// HTML 페이지 생성 함수들

export function getMainPageHTML() {
  const timestamp = Date.now();
  
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
          
          /* 언어 선택 버튼 */
          .lang-container {
            position: relative;
            display: inline-block;
            z-index: 9999;
          }
          .lang-btn {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95));
            backdrop-filter: blur(20px);
            border: 3px solid rgba(255, 255, 255, 1);
            padding: 14px 28px;
            border-radius: 30px;
            font-weight: 800;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.35);
            color: #667eea;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.3s ease;
            min-width: 200px;
            justify-content: space-between;
          }
          .lang-btn:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          }
          .lang-menu {
            position: absolute;
            top: calc(100% + 15px);
            right: 0;
            background: #ffffff;
            border: 3px solid rgba(102, 126, 234, 0.3);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-height: 450px;
            min-width: 280px;
            overflow-y: auto;
            z-index: 10000;
            display: none;
          }
          .lang-menu.show {
            display: block;
            animation: slideDown 0.3s ease;
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .lang-option {
            padding: 18px 24px;
            cursor: pointer;
            transition: all 0.25s ease;
            border-bottom: 2px solid rgba(102, 126, 234, 0.1);
            display: flex;
            align-items: center;
            gap: 16px;
            background: transparent;
            border-left: none;
            border-right: none;
            border-top: none;
            width: 100%;
            text-align: left;
            font-size: 17px;
            font-weight: 600;
          }
          .lang-option:last-child {
            border-bottom: none;
          }
          .lang-option:hover {
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.12));
            padding-left: 30px;
            transform: translateX(5px);
          }
          .lang-option.active {
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.25), rgba(118, 75, 162, 0.18));
            font-weight: 800;
            color: #667eea;
            border-left: 5px solid #667eea;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Hero Section -->
        <div class="gradient-bg text-white">
            <div class="container mx-auto px-4 py-6">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-2xl md:text-3xl font-bold">
                        <i class="fas fa-gem mr-2"></i>
                        Luxury Review Hub
                    </h1>
                    <div id="langSelector" class="relative z-50"></div>
                </div>

                <div class="text-center py-8 md:py-12 animate-fade-in">
                    <h2 class="text-3xl md:text-5xl font-bold mb-4" id="hero-title"></h2>
                    <p class="text-lg md:text-xl mb-2 opacity-90" id="hero-subtitle"></p>
                    <p class="text-sm md:text-base opacity-80 mb-8" id="hero-description"></p>
                    
                    <div class="max-w-2xl mx-auto">
                        <div class="flex gap-2">
                            <input type="text" id="searchInput" class="flex-1 px-6 py-3 rounded-full text-gray-800 text-lg" />
                            <button onclick="window.searchProducts()" class="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold px-8 py-3 rounded-full transition-all" id="search-btn"></button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
                        <div class="glass rounded-xl p-4">
                            <div class="text-3xl font-bold mb-1">200+</div>
                            <div class="text-sm opacity-90" id="stat-stores"></div>
                        </div>
                        <div class="glass rounded-xl p-4">
                            <div class="text-3xl font-bold mb-1">50,000+</div>
                            <div class="text-sm opacity-90" id="stat-products"></div>
                        </div>
                        <div class="glass rounded-xl p-4">
                            <div class="text-3xl font-bold mb-1">10,000+</div>
                            <div class="text-sm opacity-90" id="stat-reviews"></div>
                        </div>
                        <div class="glass rounded-xl p-4">
                            <div class="text-3xl font-bold mb-1">A~D</div>
                            <div class="text-sm opacity-90" id="stat-trust"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
                <i class="fas fa-star text-yellow-500 mr-1"></i>
                <span id="features-title"></span>
            </h2>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">💰</div>
                    <h3 class="font-bold mb-1" id="feature-price-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-price-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">✅</div>
                    <h3 class="font-bold mb-1" id="feature-seller-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-seller-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">📝</div>
                    <h3 class="font-bold mb-1" id="feature-review-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-review-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">🔍</div>
                    <h3 class="font-bold mb-1" id="feature-auth-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-auth-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">📊</div>
                    <h3 class="font-bold mb-1" id="feature-trend-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-trend-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">🌍</div>
                    <h3 class="font-bold mb-1" id="feature-global-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-global-desc"></p>
                </div>
            </div>
        </div>

        <!-- Popular Brands -->
        <div class="bg-white py-8">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
                    <i class="fas fa-crown text-yellow-500 mr-1"></i>
                    <span id="popular-brands-title"></span>
                </h2>
                <div id="popularBrands" class="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div class="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- Best Deals -->
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
                <i class="fas fa-fire text-red-500 mr-1"></i>
                <span id="best-deals-title"></span>
            </h2>
            <div id="bestDeals" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="gradient-bg text-white py-12 mt-16">
            <div class="container mx-auto px-4 text-center">
                <p class="text-lg mb-4" id="footer-copyright"></p>
                <p class="opacity-80" id="footer-tagline"></p>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/i18n.js?t=${timestamp}"></script>
        <script>
          // 전역 함수 선언
          window.searchProducts = async function() {
            const input = document.getElementById('searchInput');
            const keyword = input ? input.value.trim() : '';
            if (!keyword) {
              alert(window.t ? window.t('enter_keyword') : '검색어를 입력해주세요');
              return;
            }
            try {
              const response = await axios.get('/api/search?q=' + encodeURIComponent(keyword));
              console.log('검색 결과:', response.data);
            } catch (error) {
              console.error('검색 오류:', error);
            }
          };

          // 페이지 초기화
          function initApp() {
            console.log('🚀 앱 초기화 시작');
            
            // 번역 함수 확인
            if (typeof window.t !== 'function') {
              console.log('⏳ 번역 함수 대기중...');
              setTimeout(initApp, 50);
              return;
            }
            
            console.log('✅ 번역 함수 확인');
            
            // 텍스트 업데이트
            const elements = {
              'hero-title': 'hero_title',
              'hero-subtitle': 'hero_subtitle',
              'hero-description': 'hero_description',
              'search-btn': 'search_button',
              'stat-stores': 'stat_stores',
              'stat-products': 'stat_products',
              'stat-reviews': 'stat_reviews',
              'stat-trust': 'stat_trust',
              'features-title': 'features_title',
              'feature-price-title': 'feature_price_title',
              'feature-price-desc': 'feature_price_desc',
              'feature-seller-title': 'feature_seller_title',
              'feature-seller-desc': 'feature_seller_desc',
              'feature-review-title': 'feature_review_title',
              'feature-review-desc': 'feature_review_desc',
              'feature-auth-title': 'feature_auth_title',
              'feature-auth-desc': 'feature_auth_desc',
              'feature-trend-title': 'feature_trend_title',
              'feature-trend-desc': 'feature_trend_desc',
              'feature-global-title': 'feature_global_title',
              'feature-global-desc': 'feature_global_desc',
              'popular-brands-title': 'popular_brands',
              'best-deals-title': 'best_deals',
              'footer-copyright': 'footer_copyright',
              'footer-tagline': 'footer_tagline'
            };
            
            Object.keys(elements).forEach(id => {
              const el = document.getElementById(id);
              if (el && window.t) {
                el.textContent = window.t(elements[id]);
              }
            });
            
            // 검색창 placeholder
            const searchInput = document.getElementById('searchInput');
            if (searchInput && window.t) {
              searchInput.placeholder = window.t('search_placeholder');
            }
            
            // 언어 선택기 추가
            const langSelector = document.getElementById('langSelector');
            if (langSelector && window.getLangSelectorHTML) {
              langSelector.innerHTML = window.getLangSelectorHTML();
              if (window.initLangSelector) {
                window.initLangSelector();
              }
            }
            
            // 데이터 로드
            loadPopularBrands();
            loadBestDeals();
            
            console.log('✅ 초기화 완료');
          }
          
          // DOMContentLoaded에서 initApp 실행
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
          } else {
            initApp();
          }
          
          // 인기 브랜드 로드
          async function loadPopularBrands() {
            try {
              const response = await axios.get('/api/brands/top/popular');
              const brands = response.data.data || [];
              const html = brands.map(brand => \`
                <div class="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg card-hover cursor-pointer">
                  <h3 class="font-bold text-lg">\${brand.name}</h3>
                  <p class="text-sm opacity-90">\${brand.category || ''}</p>
                </div>
              \`).join('');
              const container = document.getElementById('popularBrands');
              if (container) container.innerHTML = html;
            } catch (error) {
              console.error('브랜드 로드 오류:', error);
            }
          }
          
          // 최저가 상품 로드
          async function loadBestDeals() {
            try {
              const response = await axios.get('/api/products/deals/best');
              const products = response.data.data || [];
              const html = products.map(product => \`
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h3 class="font-bold text-lg">\${product.brand_name || ''}</h3>
                      <p class="text-gray-600">\${product.model_name || ''}</p>
                    </div>
                    <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -\${product.discount_rate || 0}%
                    </span>
                  </div>
                  <div class="border-t pt-3">
                    <p class="text-sm text-gray-500 line-through">\${(product.official_price || 0).toLocaleString()}원</p>
                    <p class="text-2xl font-bold text-purple-600">\${(product.lowest_price || 0).toLocaleString()}원</p>
                  </div>
                </div>
              \`).join('');
              const container = document.getElementById('bestDeals');
              if (container) container.innerHTML = html;
            } catch (error) {
              console.error('상품 로드 오류:', error);
            }
          }
        </script>
    </body>
    </html>
  `;
}
