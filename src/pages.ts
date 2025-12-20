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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #3A3A3C;
          }
          .gradient-bg { 
            background: #111111;
          }
          .luxury-title {
            font-family: 'Playfair Display', 'Noto Sans KR', serif;
            color: #FFFFFF;
          }
          .luxury-subtitle {
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            color: #B3B3B3;
          }
          .section-title {
            font-family: 'Libre Baskerville', 'Noto Sans KR', serif;
            color: #1C1C1E;
          }
          .text-primary { color: #1C1C1E; }
          .text-body { color: #3A3A3C; }
          .text-secondary { color: #6E6E73; }
          .text-link { color: #0B1C2D; }
          .text-accent { color: #C9A24D; }
          .bg-luxury-dark { background: #111111; }
          .border-accent { border-color: #C9A24D; }
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
            background: rgba(201, 162, 77, 0.1);
            border: 1px solid #C9A24D;
            padding: 4px 8px;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(201, 162, 77, 0.2);
            color: #C9A24D;
            font-size: 11px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: all 0.2s ease;
            min-width: 70px;
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
          }
          .lang-btn:hover {
            background: rgba(201, 162, 77, 0.2);
            border-color: #D4B366;
          }
          .lang-menu {
            position: absolute;
            top: calc(100% + 5px);
            right: 0;
            background: #1C1C1E;
            border: 1px solid #C9A24D;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            max-height: 200px;
            min-width: 100px;
            overflow-y: auto;
            z-index: 10000;
            display: none;
          }
          .lang-menu.show {
            display: block;
          }
          .lang-option {
            padding: 6px 10px;
            cursor: pointer;
            transition: all 0.15s ease;
            border-bottom: 1px solid #2A2A2C;
            display: flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border-left: none;
            border-right: none;
            border-top: none;
            width: 100%;
            text-align: left;
            font-size: 11px;
            font-weight: 500;
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            color: #B3B3B3;
          }
          .lang-option:last-child {
            border-bottom: none;
          }
          .lang-option:hover {
            background: rgba(201, 162, 77, 0.1);
            color: #C9A24D;
          }
          .lang-option.active {
            background: rgba(201, 162, 77, 0.15);
            font-weight: 600;
            color: #C9A24D;
          }
        </style>
    </head>
    <body class="bg-white">
        <!-- Hero Section -->
        <div class="bg-luxury-dark text-white">
            <div class="container mx-auto px-4 py-3">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-lg md:text-xl font-bold luxury-title">
                        <i class="fas fa-gem mr-1 text-accent"></i>
                        Luxury Review Hub
                    </h1>
                    <div id="langSelector" class="relative z-50"></div>
                </div>

                <div class="text-center py-4 md:py-6 animate-fade-in">
                    <h2 class="text-xl md:text-3xl font-bold mb-2 luxury-title" id="hero-title"></h2>
                    <p class="text-sm md:text-base mb-1 luxury-subtitle" id="hero-subtitle"></p>
                    <p class="text-xs md:text-sm luxury-subtitle mb-4" id="hero-description"></p>
                    
                    <div class="max-w-2xl mx-auto">
                        <div class="flex gap-2">
                            <input type="text" id="searchInput" class="flex-1 px-4 py-2 rounded-full bg-white text-body text-sm border border-accent focus:outline-none focus:ring-2 focus:ring-accent" />
                            <button onclick="window.searchProducts()" class="bg-accent hover:opacity-90 text-white font-bold px-5 py-2 rounded-full transition-all text-sm" id="search-btn"></button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6 max-w-4xl mx-auto">
                        <div class="glass rounded-lg p-3 border border-accent">
                            <div class="text-xl font-bold mb-1 text-accent">200+</div>
                            <div class="text-xs luxury-subtitle" id="stat-stores"></div>
                        </div>
                        <div class="glass rounded-lg p-3 border border-accent">
                            <div class="text-xl font-bold mb-1 text-accent">50,000+</div>
                            <div class="text-xs luxury-subtitle" id="stat-products"></div>
                        </div>
                        <div class="glass rounded-lg p-3 border border-accent">
                            <div class="text-xl font-bold mb-1 text-accent">10,000+</div>
                            <div class="text-xs luxury-subtitle" id="stat-reviews"></div>
                        </div>
                        <div class="glass rounded-lg p-3 border border-accent">
                            <div class="text-xl font-bold mb-1 text-accent">A~D</div>
                            <div class="text-xs luxury-subtitle" id="stat-trust"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-2xl font-bold text-center mb-6 section-title">
                <i class="fas fa-star text-accent mr-1"></i>
                <span id="features-title"></span>
            </h2>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all border border-gray-200">
                    <div class="text-3xl mb-2">💰</div>
                    <h3 class="font-bold mb-1 text-primary" id="feature-price-title"></h3>
                    <p class="text-xs text-secondary" id="feature-price-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all border border-gray-200">
                    <div class="text-3xl mb-2">✅</div>
                    <h3 class="font-bold mb-1 text-primary" id="feature-seller-title"></h3>
                    <p class="text-xs text-secondary" id="feature-seller-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all border border-gray-200">
                    <div class="text-3xl mb-2">📝</div>
                    <h3 class="font-bold mb-1 text-primary" id="feature-review-title"></h3>
                    <p class="text-xs text-secondary" id="feature-review-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all border border-gray-200">
                    <div class="text-3xl mb-2">🔍</div>
                    <h3 class="font-bold mb-1 text-primary" id="feature-auth-title"></h3>
                    <p class="text-xs text-secondary" id="feature-auth-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all border border-gray-200">
                    <div class="text-3xl mb-2">📊</div>
                    <h3 class="font-bold mb-1 text-primary" id="feature-trend-title"></h3>
                    <p class="text-xs text-secondary" id="feature-trend-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all border border-gray-200">
                    <div class="text-3xl mb-2">🌍</div>
                    <h3 class="font-bold mb-1 text-primary" id="feature-global-title"></h3>
                    <p class="text-xs text-secondary" id="feature-global-desc"></p>
                </div>
            </div>
        </div>

        <!-- Popular Brands -->
        <div class="bg-gray-50 py-8">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-6 section-title">
                    <i class="fas fa-crown text-accent mr-1"></i>
                    <span id="popular-brands-title"></span>
                </h2>
                <div id="popularBrands" class="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div class="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- Best Deals -->
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-2xl font-bold text-center mb-6 section-title">
                <i class="fas fa-fire text-accent mr-1"></i>
                <span id="best-deals-title"></span>
            </h2>
            <div id="bestDeals" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-luxury-dark text-white py-12 mt-16">
            <div class="container mx-auto px-4 text-center">
                <p class="text-lg mb-4 luxury-title" id="footer-copyright"></p>
                <p class="luxury-subtitle" id="footer-tagline"></p>
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
