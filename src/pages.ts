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
          
          /* 언어 선택 버튼 - 모던하고 세련되게 */
          .lang-container {
            position: relative;
            display: inline-block;
            z-index: 9999;
          }
          .lang-btn {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
            backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 255, 255, 1);
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 700;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
            color: #667eea;
            font-size: 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
          }
          .lang-btn:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.95));
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 1) inset;
            transform: translateY(-2px);
          }
          .lang-btn:active {
            transform: translateY(0);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }
          .lang-menu {
            position: absolute;
            top: calc(100% + 12px);
            right: 0;
            background: linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%);
            border: 2px solid rgba(102, 126, 234, 0.2);
            border-radius: 16px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
            max-height: 320px;
            min-width: 200px;
            overflow-y: auto;
            overflow-x: hidden;
            z-index: 10000;
            display: none;
          }
          .lang-menu.show {
            display: block;
          }
          .lang-option {
            padding: 12px 18px;
            cursor: pointer;
            transition: all 0.25s ease;
            border-bottom: 1px solid rgba(102, 126, 234, 0.08);
            display: flex;
            align-items: center;
            background: transparent;
            border: none;
            width: 100%;
            text-align: left;
          }
          .lang-option:last-child {
            border-bottom: none;
          }
          .lang-option:hover {
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.12), rgba(118, 75, 162, 0.08));
            padding-left: 22px;
          }
          .lang-option.active {
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.18), rgba(118, 75, 162, 0.12));
            font-weight: 600;
            color: #667eea;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Hero Section -->
        <div class="gradient-bg text-white">
            <div class="container mx-auto px-4 py-4">
                <!-- Language Selector -->
                <div class="flex justify-end items-center mb-3">
                    <div id="langSelector" class="relative z-50"></div>
                </div>
                
                <div class="text-center animate-fade-in py-4">
                    <h1 class="text-xl md:text-3xl font-bold mb-3">
                        <i class="fas fa-gem mr-2 text-lg md:text-2xl"></i>
                        <span id="hero-title"></span>
                    </h1>
                    <p class="text-sm md:text-base mb-3 opacity-90" id="hero-subtitle"></p>
                    <p class="text-xs md:text-sm mb-4 opacity-80" id="hero-description"></p>
                    
                    <!-- Search Bar -->
                    <div class="max-w-3xl mx-auto">
                        <div class="relative">
                            <input 
                                type="text" 
                                id="searchInput"
                                placeholder=""
                                class="w-full px-4 py-3 pr-28 rounded-full text-gray-800 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg"
                            >
                            <button 
                                onclick="searchProducts()"
                                class="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-all text-sm"
                            >
                                <i class="fas fa-search mr-1"></i><span id="search-btn"></span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6 max-w-4xl mx-auto">
                        <div class="glass rounded-lg p-2">
                            <div class="text-lg md:text-2xl font-bold">200+</div>
                            <div class="text-xs opacity-80" id="stat-stores"></div>
                        </div>
                        <div class="glass rounded-lg p-2">
                            <div class="text-lg md:text-2xl font-bold">10,000+</div>
                            <div class="text-xs opacity-80" id="stat-products"></div>
                        </div>
                        <div class="glass rounded-lg p-2">
                            <div class="text-lg md:text-2xl font-bold">50,000+</div>
                            <div class="text-xs opacity-80" id="stat-reviews"></div>
                        </div>
                        <div class="glass rounded-lg p-2">
                            <div class="text-lg md:text-2xl font-bold">A~D</div>
                            <div class="text-xs opacity-80" id="stat-trust"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
                <i class="fas fa-star text-yellow-500 mr-1 text-lg"></i>
                <span id="features-title"></span>
            </h2>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">💰</div>
                    <h3 class="text-sm md:text-base font-bold mb-1" id="feature-price-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-price-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">✅</div>
                    <h3 class="text-sm md:text-base font-bold mb-1" id="feature-seller-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-seller-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">📝</div>
                    <h3 class="text-sm md:text-base font-bold mb-1" id="feature-review-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-review-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">🔍</div>
                    <h3 class="text-sm md:text-base font-bold mb-1" id="feature-auth-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-auth-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">📊</div>
                    <h3 class="text-sm md:text-base font-bold mb-1" id="feature-trend-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-trend-desc"></p>
                </div>
                
                <div class="bg-white rounded-xl p-4 shadow-md card-hover transition-all">
                    <div class="text-3xl mb-2">🌍</div>
                    <h3 class="text-sm md:text-base font-bold mb-1" id="feature-global-title"></h3>
                    <p class="text-xs text-gray-600" id="feature-global-desc"></p>
                </div>
            </div>
        </div>

        <!-- Popular Brands -->
        <div class="bg-white py-8">
            <div class="container mx-auto px-4">
                <h2 class="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
                    <i class="fas fa-crown text-yellow-500 mr-1 text-lg"></i>
                    <span id="popular-brands-title"></span>
                </h2>
                <div id="popularBrands" class="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div class="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- Best Deals -->
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
                <i class="fas fa-fire text-red-500 mr-1 text-lg"></i>
                <span id="best-deals-title"></span>
            </h2>
            <div id="bestDeals" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
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
        <script>
          console.log('=== 메인 스크립트 로드 시작 ===');
          
          // i18n.js 로드 대기 함수
          function waitForI18n(callback, maxAttempts = 50) {
            let attempts = 0;
            const checkInterval = setInterval(function() {
              attempts++;
              console.log('i18n 로드 확인 시도:', attempts);
              
              if (typeof t === 'function' && typeof getLangSelectorHTML === 'function' && typeof initLangSelector === 'function') {
                console.log('✅ i18n.js 완전히 로드됨');
                clearInterval(checkInterval);
                callback();
              } else if (attempts >= maxAttempts) {
                console.error('❌ i18n.js 로드 실패 (타임아웃)');
                clearInterval(checkInterval);
              }
            }, 100);
          }
          
          // 다국어 텍스트 적용
          function applyTranslations() {
            console.log('applyTranslations 시작');
            try {
              if (typeof t !== 'function') {
                console.error('번역 함수를 사용할 수 없습니다');
                return;
              }
              
              // 안전하게 요소 업데이트
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
                'search-results-title': 'search_results',
                'footer-copyright': 'footer_copyright',
                'footer-tagline': 'footer_tagline'
              };
              
              Object.keys(elements).forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                  el.textContent = t(elements[id]);
                }
              });
              
              // 검색 입력란 placeholder
              const searchInput = document.getElementById('searchInput');
              if (searchInput) {
                searchInput.placeholder = t('search_placeholder');
              }
              
              // 언어 선택기 추가
              if (typeof getLangSelectorHTML === 'function') {
                const langSelector = document.getElementById('langSelector');
                if (langSelector) {
                  langSelector.innerHTML = getLangSelectorHTML();
                  console.log('언어 선택기 HTML 추가됨');
                  
                  // 언어 선택기 이벤트 초기화
                  setTimeout(function() {
                    if (typeof initLangSelector === 'function') {
                      initLangSelector();
                      console.log('언어 선택기 이벤트 초기화 완료');
                    }
                  }, 100);
                }
              }
              
              console.log('applyTranslations 완료');
            } catch (error) {
              console.error('applyTranslations 오류:', error);
            }
          }
          
          // 검색 기능
          async function searchProducts() {
            console.log('검색 시작');
            try {
              const searchInput = document.getElementById('searchInput');
              if (!searchInput) {
                console.error('검색 입력란을 찾을 수 없습니다');
                return;
              }
              
              const keyword = searchInput.value.trim();
              if (!keyword) {
                const msg = typeof t === 'function' ? t('enter_keyword') : '검색어를 입력해주세요';
                alert(msg);
                return;
              }
              
              console.log('검색어:', keyword);
              const response = await axios.get('/api/search?q=' + encodeURIComponent(keyword));
              console.log('검색 결과:', response.data);
              displaySearchResults(response.data.data);
            } catch (error) {
              console.error('검색 오류:', error);
              alert('검색 중 오류가 발생했습니다');
            }
          }
          
          // 전역 스코프에 함수 노출
          window.searchProducts = searchProducts;
          
          // 검색 결과 표시
          function displaySearchResults(data) {
            console.log('검색 결과 표시 시작:', data);
            try {
              const resultsDiv = document.getElementById('searchResults');
              const contentDiv = document.getElementById('searchContent');
              
              if (!resultsDiv || !contentDiv) {
                console.error('결과 표시 영역을 찾을 수 없습니다');
                return;
              }
              
              let html = '';
              
              if (data.brands && data.brands.length > 0) {
                const brandsTitle = typeof t === 'function' ? t('popular_brands') : '인기 브랜드';
                html += '<h3 class="text-xl font-bold mb-4">' + brandsTitle + '</h3>';
                html += '<div class="grid md:grid-cols-3 gap-4 mb-8">';
                data.brands.forEach(brand => {
                  html += \`
                    <div class="bg-white rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition-all" onclick="location.href='/brand/\${brand.id}'">
                      <h4 class="font-bold text-lg">\${brand.name}</h4>
                      <p class="text-sm text-gray-600">\${brand.category || ''}</p>
                    </div>
                  \`;
                });
                html += '</div>';
              }
              
              if (data.products && data.products.length > 0) {
                const productsTitle = typeof t === 'function' ? t('brand_products') : '제품 목록';
                html += '<h3 class="text-xl font-bold mb-4">' + productsTitle + '</h3>';
                html += '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">';
                data.products.forEach(product => {
                  html += \`
                    <div class="bg-white rounded-lg p-6 shadow card-hover cursor-pointer" onclick="location.href='/product/\${product.id}'">
                      <h4 class="font-bold text-lg mb-2">\${product.brand_name || ''}</h4>
                      <p class="text-gray-800 mb-2">\${product.model_name || ''}</p>
                      <p class="text-purple-600 font-bold">\${product.official_price ? product.official_price.toLocaleString() + '원' : ''}</p>
                    </div>
                  \`;
                });
                html += '</div>';
              }
              
              if ((!data.brands || data.brands.length === 0) && (!data.products || data.products.length === 0)) {
                const noResultsText = typeof t === 'function' ? t('no_results') : '검색 결과가 없습니다';
                html = '<p class="text-center text-gray-600">' + noResultsText + '</p>';
              }
              
              contentDiv.innerHTML = html;
              resultsDiv.classList.remove('hidden');
              resultsDiv.scrollIntoView({ behavior: 'smooth' });
              
              console.log('검색 결과 표시 완료');
            } catch (error) {
              console.error('검색 결과 표시 오류:', error);
            }
          }
          
          // 인기 브랜드 로드
          async function loadPopularBrands() {
            console.log('인기 브랜드 로드 시작');
            try {
              const response = await axios.get('/api/brands/top/popular');
              console.log('인기 브랜드 데이터:', response.data);
              const brands = response.data.data || [];
              
              const productsText = typeof t === 'function' ? t('products_count') : '개 제품';
              
              const html = brands.map(brand => \`
                <div class="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg card-hover cursor-pointer transition-all" onclick="location.href='/brand/\${brand.id}'">
                  <h3 class="font-bold text-lg mb-2">\${brand.name}</h3>
                  <p class="text-sm opacity-90">\${brand.category || ''}</p>
                  <p class="text-xs mt-2 opacity-75">\${brand.product_count || 0} \${productsText}</p>
                </div>
              \`).join('');
              
              const container = document.getElementById('popularBrands');
              if (container) {
                container.innerHTML = html;
                console.log('인기 브랜드 표시 완료');
              }
            } catch (error) {
              console.error('인기 브랜드 로드 오류:', error);
            }
          }
          
          // 최저가 상품 로드
          async function loadBestDeals() {
            console.log('최저가 상품 로드 시작');
            try {
              const response = await axios.get('/api/products/deals/best');
              console.log('최저가 상품 데이터:', response.data);
              const products = response.data.data || [];
              
              const saveText = typeof t === 'function' ? t('save_amount') : '절약';
              
              const html = products.map(product => \`
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover cursor-pointer transition-all" onclick="location.href='/product/\${product.id}'">
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
                    <p class="text-sm text-green-600 mt-2">
                      <i class="fas fa-check-circle mr-1"></i>
                      \${((product.official_price || 0) - (product.lowest_price || 0)).toLocaleString()} \${saveText}
                    </p>
                  </div>
                </div>
              \`).join('');
              
              const container = document.getElementById('bestDeals');
              if (container) {
                container.innerHTML = html;
                console.log('최저가 상품 표시 완료');
              }
            } catch (error) {
              console.error('최저가 상품 로드 오류:', error);
            }
          }
          
          // 페이지 로드 시 실행
          document.addEventListener('DOMContentLoaded', function() {
            console.log('=== DOM 로드 완료 ===');
            
            // i18n.js 로드 대기
            waitForI18n(function() {
              console.log('=== i18n 로드 완료, 초기화 시작 ===');
              
              try {
                // 다국어 적용
                applyTranslations();
                
                // 데이터 로드
                loadPopularBrands();
                loadBestDeals();
                
                // 엔터키로 검색
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                  searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                      searchProducts();
                    }
                  });
                  console.log('검색 입력란 이벤트 등록 완료');
                }
                
                console.log('=== 앱 초기화 완료 ===');
              } catch (error) {
                console.error('초기화 오류:', error);
              }
            });
          });
        </script>
        <script src="/static/i18n.js"></script>
    </body>
    </html>
  `;
}
