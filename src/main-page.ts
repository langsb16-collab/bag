export const mainPageHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>럭셔리 리뷰 허브 - 전 세계 명품 가격비교 & 리뷰</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script>
      // 다국어 번역 데이터 임베드
      const translations = {
        ko: { heroTitle: '전 세계 명품, 가장 똑똑하게 사는 법', heroSubtitle: '실시간 가격비교 · 검증된 리뷰 · 정품 인증 가이드', searchPlaceholder: '브랜드명 또는 제품명 검색...', searchButton: '검색' },
        en: { heroTitle: 'The Smartest Way to Buy Luxury Worldwide', heroSubtitle: 'Real-time Price Comparison · Verified Reviews', searchPlaceholder: 'Search brand or product...', searchButton: 'Search' },
        zh: { heroTitle: '全球奢侈品，最聪明的购买方式', heroSubtitle: '实时价格比较 · 验证评论', searchPlaceholder: '搜索品牌或产品...', searchButton: '搜索' },
        ja: { heroTitle: '世界中の高級品、最もスマートに購入', heroSubtitle: 'リアルタイム価格比較 · 検証済みレビュー', searchPlaceholder: 'ブランド名または製品名を検索...', searchButton: '検索' },
        vi: { heroTitle: 'Cách Thông Minh Nhất Mua Hàng Xa Xỉ', heroSubtitle: 'So Sánh Giá · Đánh Giá Đã Xác Minh', searchPlaceholder: 'Tìm kiếm thương hiệu...', searchButton: 'Tìm kiếm' },
        mn: { heroTitle: 'Дэлхийн тансаг барааг худалдаж авах арга', heroSubtitle: 'Үнийн харьцуулалт · Баталгаажсан үнэлгээ', searchPlaceholder: 'Брэнд хайх...', searchButton: 'Хайх' },
        ru: { heroTitle: 'Умный способ купить роскошь', heroSubtitle: 'Сравнение цен · Проверенные отзывы', searchPlaceholder: 'Поиск бренда...', searchButton: 'Поиск' }
      };
      let currentLang = localStorage.getItem('language') || 'ko';
      function t(key) { return translations[currentLang][key] || translations['ko'][key] || key; }
      function changeLang(lang) { currentLang = lang; localStorage.setItem('language', lang); location.reload(); }
      const languageNames = { ko: '한국어', en: 'English', zh: '中文', ja: '日本語', vi: 'Tiếng Việt', mn: 'Монгол', ru: 'Русский' };
    </script>
</head>
<body class="bg-gray-50">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);" class="text-white">
        <div class="container mx-auto px-4 py-16 md:py-24">
            <div class="flex justify-end mb-4">
                <select onchange="changeLang(this.value)" class="px-4 py-2 rounded-lg text-gray-800">
                    <option value="ko">🇰🇷 한국어</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="zh">🇨🇳 中文</option>
                    <option value="ja">🇯🇵 日本語</option>
                    <option value="vi">🇻🇳 Tiếng Việt</option>
                    <option value="mn">🇲🇳 Монгол</option>
                    <option value="ru">🇷🇺 Русский</option>
                </select>
            </div>
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">
                    <i class="fas fa-gem mr-3"></i>
                    <span id="heroTitle"></span>
                </h1>
                <p class="text-xl md:text-2xl mb-8 opacity-90" id="heroSubtitle"></p>
                <div class="max-w-3xl mx-auto">
                    <div class="relative">
                        <input type="text" id="searchInput" class="w-full px-6 py-5 pr-16 rounded-full text-gray-800 text-lg">
                        <button onclick="searchProducts()" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                            <i class="fas fa-search mr-2"></i><span id="searchButton"></span>
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
                    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);" class="rounded-lg p-4">
                        <div class="text-3xl font-bold">200+</div>
                        <div class="text-sm opacity-80">Global Stores</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);" class="rounded-lg p-4">
                        <div class="text-3xl font-bold">10,000+</div>
                        <div class="text-sm opacity-80">Luxury Products</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);" class="rounded-lg p-4">
                        <div class="text-3xl font-bold">50,000+</div>
                        <div class="text-sm opacity-80">User Reviews</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);" class="rounded-lg p-4">
                        <div class="text-3xl font-bold">A~D</div>
                        <div class="text-sm opacity-80">Trust Rating</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-center mb-12"><i class="fas fa-crown text-yellow-500 mr-2"></i>Popular Brands</h2>
        <div id="popularBrands" class="grid grid-cols-2 md:grid-cols-5 gap-6"></div>
    </div>
    <div class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-center mb-12"><i class="fas fa-fire text-red-500 mr-2"></i>Best Deals</h2>
        <div id="bestDeals" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
    </div>
    <div id="searchResults" class="container mx-auto px-4 py-8 hidden">
        <h2 class="text-2xl font-bold mb-6">Search Results</h2>
        <div id="searchContent"></div>
    </div>
    <footer style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);" class="text-white py-12 mt-16">
        <div class="container mx-auto px-4 text-center">
            <p class="text-lg mb-4">© 2024 Luxury Review Hub. All rights reserved.</p>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
      function initTranslations() {
        document.getElementById('heroTitle').textContent = t('heroTitle');
        document.getElementById('heroSubtitle').textContent = t('heroSubtitle');
        document.getElementById('searchInput').placeholder = t('searchPlaceholder');
        document.getElementById('searchButton').textContent = t('searchButton');
        document.querySelector('select').value = currentLang;
      }
      async function searchProducts() {
        const keyword = document.getElementById('searchInput').value.trim();
        if (!keyword) { alert('Please enter search keyword'); return; }
        try {
          const response = await axios.get('/api/search?q=' + encodeURIComponent(keyword));
          displaySearchResults(response.data.data);
        } catch (error) { console.error('Search error:', error); }
      }
      function displaySearchResults(data) {
        const resultsDiv = document.getElementById('searchResults');
        const contentDiv = document.getElementById('searchContent');
        let html = '';
        if (data.brands.length > 0) {
          html += '<h3 class="text-xl font-bold mb-4">Brands</h3><div class="grid md:grid-cols-3 gap-4 mb-8">';
          data.brands.forEach(brand => {
            html += \`<div class="bg-white rounded-lg p-4 shadow cursor-pointer" onclick="location.href='/brand/\${brand.id}'">
              <h4 class="font-bold text-lg">\${brand.name}</h4>
              <p class="text-sm text-gray-600">\${brand.category}</p>
            </div>\`;
          });
          html += '</div>';
        }
        if (data.products.length > 0) {
          html += '<h3 class="text-xl font-bold mb-4">Products</h3><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">';
          data.products.forEach(product => {
            html += \`<div class="bg-white rounded-lg p-6 shadow cursor-pointer" onclick="location.href='/product/\${product.id}'">
              <h4 class="font-bold text-lg mb-2">\${product.brand_name}</h4>
              <p class="text-gray-800 mb-2">\${product.model_name}</p>
              <p class="text-purple-600 font-bold">\${product.official_price ? product.official_price.toLocaleString() : 'Price Inquiry'}</p>
            </div>\`;
          });
          html += '</div>';
        }
        if (data.brands.length === 0 && data.products.length === 0) html = '<p class="text-center text-gray-600">No results found</p>';
        contentDiv.innerHTML = html;
        resultsDiv.classList.remove('hidden');
      }
      async function loadPopularBrands() {
        try {
          const response = await axios.get('/api/brands/top/popular');
          const brands = response.data.data;
          const html = brands.map(brand => \`
            <div style="background: linear-gradient(to bottom right, #a855f7, #ec4899);" class="text-white rounded-xl p-6 shadow-lg cursor-pointer" onclick="location.href='/brand/\${brand.id}'">
              <h3 class="font-bold text-lg mb-2">\${brand.name}</h3>
              <p class="text-sm opacity-90">\${brand.category}</p>
              <p class="text-xs mt-2 opacity-75">\${brand.product_count || 0} Products</p>
            </div>
          \`).join('');
          document.getElementById('popularBrands').innerHTML = html;
        } catch (error) { console.error('Brand load error:', error); }
      }
      async function loadBestDeals() {
        try {
          const response = await axios.get('/api/products/deals/best');
          const products = response.data.data;
          const html = products.map(product => \`
            <div class="bg-white rounded-xl p-6 shadow-lg cursor-pointer" onclick="location.href='/product/\${product.id}'">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-bold text-lg">\${product.brand_name}</h3>
                  <p class="text-gray-600">\${product.model_name}</p>
                </div>
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-\${product.discount_rate}%</span>
              </div>
              <div class="border-t pt-3">
                <p class="text-sm text-gray-500 line-through">\${product.official_price.toLocaleString()}</p>
                <p class="text-2xl font-bold text-purple-600">\${product.lowest_price.toLocaleString()}</p>
              </div>
            </div>
          \`).join('');
          document.getElementById('bestDeals').innerHTML = html;
        } catch (error) { console.error('Best deals load error:', error); }
      }
      document.getElementById('searchInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') searchProducts(); });
      initTranslations();
      loadPopularBrands();
      loadBestDeals();
    </script>
</body>
</html>`;
