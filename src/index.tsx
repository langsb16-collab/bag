import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS 설정
app.use('/api/*', cors())

// Static 파일 제공
app.use('/static/*', serveStatic({ root: './' }))

// ==================== API 라우트 ====================

// 1. 브랜드 목록 조회
app.get('/api/brands', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare('SELECT * FROM brands ORDER BY name').all()
  return c.json({ success: true, data: results })
})

// 2. 브랜드 상세 조회
app.get('/api/brands/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  const brand = await DB.prepare('SELECT * FROM brands WHERE id = ?').bind(id).first()
  
  if (!brand) {
    return c.json({ success: false, message: '브랜드를 찾을 수 없습니다' }, 404)
  }
  
  return c.json({ success: true, data: brand })
})

// 3. 제품 목록 조회 (브랜드별)
app.get('/api/products', async (c) => {
  const { DB } = c.env
  const brandId = c.req.query('brand_id')
  
  let query = `
    SELECT p.*, b.name as brand_name 
    FROM products p 
    LEFT JOIN brands b ON p.brand_id = b.id
  `
  
  if (brandId) {
    query += ` WHERE p.brand_id = ?`
    const { results } = await DB.prepare(query).bind(brandId).all()
    return c.json({ success: true, data: results })
  } else {
    query += ` ORDER BY p.created_at DESC LIMIT 50`
    const { results } = await DB.prepare(query).all()
    return c.json({ success: true, data: results })
  }
})

// 4. 제품 상세 조회
app.get('/api/products/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  const product = await DB.prepare(`
    SELECT p.*, b.name as brand_name, b.category as brand_category
    FROM products p
    LEFT JOIN brands b ON p.brand_id = b.id
    WHERE p.id = ?
  `).bind(id).first()
  
  if (!product) {
    return c.json({ success: false, message: '제품을 찾을 수 없습니다' }, 404)
  }
  
  return c.json({ success: true, data: product })
})

// 5. 가격 정보 조회 (제품별)
app.get('/api/prices/:productId', async (c) => {
  const { DB } = c.env
  const productId = c.req.param('productId')
  
  const { results } = await DB.prepare(`
    SELECT pr.*, s.name as seller_name, s.country, s.trust_rating, s.verified
    FROM price_records pr
    LEFT JOIN sellers s ON pr.seller_id = s.id
    WHERE pr.product_id = ?
    ORDER BY pr.price ASC
  `).bind(productId).all()
  
  return c.json({ success: true, data: results })
})

// 6. 가격 정보 등록
app.post('/api/prices', async (c) => {
  const { DB } = c.env
  const { product_id, seller_id, price, currency, url, reported_by } = await c.req.json()
  
  if (!product_id || !seller_id || !price || !reported_by) {
    return c.json({ success: false, message: '필수 정보가 누락되었습니다' }, 400)
  }
  
  const result = await DB.prepare(`
    INSERT INTO price_records (product_id, seller_id, price, currency, url, reported_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(product_id, seller_id, price, currency || 'KRW', url || '', reported_by).run()
  
  return c.json({ success: true, data: { id: result.meta.last_row_id } })
})

// 7. 리뷰 목록 조회 (제품별)
app.get('/api/reviews/:productId', async (c) => {
  const { DB } = c.env
  const productId = c.req.param('productId')
  
  const { results } = await DB.prepare(`
    SELECT r.*, s.name as seller_name
    FROM reviews r
    LEFT JOIN sellers s ON r.seller_id = s.id
    WHERE r.product_id = ?
    ORDER BY r.created_at DESC
  `).bind(productId).all()
  
  return c.json({ success: true, data: results })
})

// 8. 리뷰 등록
app.post('/api/reviews', async (c) => {
  const { DB } = c.env
  const { product_id, seller_id, rating, title, content, author_name } = await c.req.json()
  
  if (!product_id || !rating || !title || !content || !author_name) {
    return c.json({ success: false, message: '필수 정보가 누락되었습니다' }, 400)
  }
  
  if (rating < 1 || rating > 5) {
    return c.json({ success: false, message: '평점은 1~5 사이여야 합니다' }, 400)
  }
  
  const result = await DB.prepare(`
    INSERT INTO reviews (product_id, seller_id, rating, title, content, author_name)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(product_id, seller_id || null, rating, title, content, author_name).run()
  
  return c.json({ success: true, data: { id: result.meta.last_row_id } })
})

// 9. 판매처 목록 조회
app.get('/api/sellers', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare('SELECT * FROM sellers ORDER BY trust_rating, name').all()
  return c.json({ success: true, data: results })
})

// 10. 구매 가이드 조회
app.get('/api/guides', async (c) => {
  const { DB } = c.env
  const brandId = c.req.query('brand_id')
  const type = c.req.query('type')
  
  let query = `
    SELECT g.*, b.name as brand_name
    FROM guides g
    LEFT JOIN brands b ON g.brand_id = b.id
    WHERE 1=1
  `
  
  const params: any[] = []
  
  if (brandId) {
    query += ' AND g.brand_id = ?'
    params.push(brandId)
  }
  
  if (type) {
    query += ' AND g.type = ?'
    params.push(type)
  }
  
  query += ' ORDER BY g.views DESC, g.created_at DESC'
  
  const { results } = await DB.prepare(query).bind(...params).all()
  return c.json({ success: true, data: results })
})

// 11. 가이드 조회수 증가
app.post('/api/guides/:id/view', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  await DB.prepare('UPDATE guides SET views = views + 1 WHERE id = ?').bind(id).run()
  
  return c.json({ success: true })
})

// 12. 검색 API
app.get('/api/search', async (c) => {
  const { DB } = c.env
  const keyword = c.req.query('q')
  
  if (!keyword) {
    return c.json({ success: false, message: '검색어를 입력해주세요' }, 400)
  }
  
  const searchTerm = `%${keyword}%`
  
  // 브랜드 검색
  const { results: brands } = await DB.prepare(`
    SELECT * FROM brands 
    WHERE name LIKE ? OR description LIKE ?
    LIMIT 10
  `).bind(searchTerm, searchTerm).all()
  
  // 제품 검색
  const { results: products } = await DB.prepare(`
    SELECT p.*, b.name as brand_name
    FROM products p
    LEFT JOIN brands b ON p.brand_id = b.id
    WHERE p.model_name LIKE ? OR p.description LIKE ?
    LIMIT 20
  `).bind(searchTerm, searchTerm).all()
  
  return c.json({ 
    success: true, 
    data: { 
      brands,
      products
    } 
  })
})

// 13. 인기 브랜드 TOP 10
app.get('/api/brands/top/popular', async (c) => {
  const { DB } = c.env
  
  const { results } = await DB.prepare(`
    SELECT b.*, COUNT(p.id) as product_count
    FROM brands b
    LEFT JOIN products p ON b.id = p.brand_id
    GROUP BY b.id
    ORDER BY product_count DESC
    LIMIT 10
  `).all()
  
  return c.json({ success: true, data: results })
})

// 14. 최저가 상품 TOP 20
app.get('/api/products/deals/best', async (c) => {
  const { DB } = c.env
  
  const { results } = await DB.prepare(`
    SELECT 
      p.*,
      b.name as brand_name,
      MIN(pr.price) as lowest_price,
      p.official_price,
      ROUND((1 - CAST(MIN(pr.price) AS REAL) / CAST(p.official_price AS REAL)) * 100, 1) as discount_rate
    FROM products p
    LEFT JOIN brands b ON p.brand_id = b.id
    LEFT JOIN price_records pr ON p.id = pr.product_id
    WHERE p.official_price > 0 AND pr.price > 0
    GROUP BY p.id
    HAVING discount_rate > 5
    ORDER BY discount_rate DESC
    LIMIT 20
  `).all()
  
  return c.json({ success: true, data: results })
})

// ==================== 메인 페이지 ====================
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>럭셔리 리뷰 허브 - 전 세계 명품 가격비교 & 리뷰</title>
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
            <div class="container mx-auto px-4 py-16 md:py-24">
                <div class="text-center animate-fade-in">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        <i class="fas fa-gem mr-3"></i>
                        전 세계 명품, 가장 똑똑하게 사는 법
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 opacity-90">
                        실시간 가격비교 · 검증된 리뷰 · 정품 인증 가이드
                    </p>
                    <p class="text-lg md:text-xl mb-10 opacity-80">
                        에르메스부터 롤렉스까지, 당신의 명품 쇼핑을 완벽하게
                    </p>
                    
                    <!-- Search Bar -->
                    <div class="max-w-3xl mx-auto">
                        <div class="relative">
                            <input 
                                type="text" 
                                id="searchInput"
                                placeholder="브랜드명 또는 제품명 검색 (예: HERMES, Birkin, 롤렉스...)"
                                class="w-full px-6 py-5 pr-16 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-2xl"
                            >
                            <button 
                                onclick="searchProducts()"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-all"
                            >
                                <i class="fas fa-search mr-2"></i>검색
                            </button>
                        </div>
                    </div>
                    
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
                        <div class="glass rounded-lg p-4">
                            <div class="text-3xl font-bold">200+</div>
                            <div class="text-sm opacity-80">글로벌 쇼핑몰</div>
                        </div>
                        <div class="glass rounded-lg p-4">
                            <div class="text-3xl font-bold">10,000+</div>
                            <div class="text-sm opacity-80">명품 제품</div>
                        </div>
                        <div class="glass rounded-lg p-4">
                            <div class="text-3xl font-bold">50,000+</div>
                            <div class="text-sm opacity-80">실사용 리뷰</div>
                        </div>
                        <div class="glass rounded-lg p-4">
                            <div class="text-3xl font-bold">A~D</div>
                            <div class="text-sm opacity-80">판매처 신뢰등급</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="container mx-auto px-4 py-16">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                <i class="fas fa-star text-yellow-500 mr-2"></i>
                핵심 기능
            </h2>
            
            <div class="grid md:grid-cols-3 gap-8 mb-16">
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">💰</div>
                    <h3 class="text-xl font-bold mb-3">실시간 가격비교</h3>
                    <p class="text-gray-600">전 세계 명품 쇼핑몰의 가격을 한눈에 비교하고 최저가를 찾아드립니다.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">✅</div>
                    <h3 class="text-xl font-bold mb-3">검증된 판매처</h3>
                    <p class="text-gray-600">A~D 등급의 신뢰도 평가로 안전한 구매를 보장합니다.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">📝</div>
                    <h3 class="text-xl font-bold mb-3">실사용자 리뷰</h3>
                    <p class="text-gray-600">실제 구매자들의 솔직한 리뷰로 현명한 선택을 하세요.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">🔍</div>
                    <h3 class="text-xl font-bold mb-3">정품 인증 가이드</h3>
                    <p class="text-gray-600">브랜드별 정품 식별 방법을 상세하게 안내해드립니다.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">📊</div>
                    <h3 class="text-xl font-bold mb-3">가격 추세 분석</h3>
                    <p class="text-gray-600">과거 가격 변동을 분석하여 최적의 구매 시기를 알려드립니다.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover transition-all">
                    <div class="text-5xl mb-4">🌍</div>
                    <h3 class="text-xl font-bold mb-3">글로벌 쇼핑 지원</h3>
                    <p class="text-gray-600">해외직구 가이드와 관세 정보까지 모두 제공합니다.</p>
                </div>
            </div>
        </div>

        <!-- Popular Brands -->
        <div class="bg-white py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-crown text-yellow-500 mr-2"></i>
                    인기 브랜드
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
                실시간 최저가
            </h2>
            <div id="bestDeals" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            </div>
        </div>

        <!-- Search Results -->
        <div id="searchResults" class="container mx-auto px-4 py-8 hidden">
            <h2 class="text-2xl font-bold mb-6">검색 결과</h2>
            <div id="searchContent"></div>
        </div>

        <!-- Footer -->
        <footer class="gradient-bg text-white py-12 mt-16">
            <div class="container mx-auto px-4 text-center">
                <p class="text-lg mb-4">© 2024 Luxury Review Hub. All rights reserved.</p>
                <p class="opacity-80">전 세계 명품, 가장 똑똑하게 사는 법</p>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          // 검색 기능
          async function searchProducts() {
            const keyword = document.getElementById('searchInput').value.trim();
            if (!keyword) {
              alert('검색어를 입력해주세요');
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
              html += '<h3 class="text-xl font-bold mb-4">브랜드</h3>';
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
              html += '<h3 class="text-xl font-bold mb-4">제품</h3>';
              html += '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">';
              data.products.forEach(product => {
                html += \`
                  <div class="bg-white rounded-lg p-6 shadow card-hover cursor-pointer" onclick="location.href='/product/\${product.id}'">
                    <h4 class="font-bold text-lg mb-2">\${product.brand_name}</h4>
                    <p class="text-gray-800 mb-2">\${product.model_name}</p>
                    <p class="text-purple-600 font-bold">\${product.official_price ? product.official_price.toLocaleString() + '원' : '가격 문의'}</p>
                  </div>
                \`;
              });
              html += '</div>';
            }
            
            if (data.brands.length === 0 && data.products.length === 0) {
              html = '<p class="text-center text-gray-600">검색 결과가 없습니다</p>';
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
                  <p class="text-xs mt-2 opacity-75">\${brand.product_count || 0}개 제품</p>
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
                    <p class="text-sm text-gray-500 line-through">\${product.official_price.toLocaleString()}원</p>
                    <p class="text-2xl font-bold text-purple-600">\${product.lowest_price.toLocaleString()}원</p>
                    <p class="text-sm text-green-600 mt-2">
                      <i class="fas fa-check-circle mr-1"></i>
                      \${(product.official_price - product.lowest_price).toLocaleString()}원 절약
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
          loadPopularBrands();
          loadBestDeals();
        </script>
    </body>
    </html>
  `)
})

// 브랜드 상세 페이지
app.get('/brand/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  const brand = await DB.prepare('SELECT * FROM brands WHERE id = ?').bind(id).first()
  
  if (!brand) {
    return c.redirect('/')
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${brand.name} - 럭셔리 리뷰 허브</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
          .transition-all { transition: all 0.3s ease; }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="text-2xl font-bold text-purple-600">
                        <i class="fas fa-gem mr-2"></i>럭셔리 허브
                    </a>
                    <a href="/" class="text-gray-600 hover:text-purple-600">
                        <i class="fas fa-home mr-2"></i>홈
                    </a>
                </div>
            </div>
        </nav>

        <!-- Brand Header -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
            <div class="container mx-auto px-4">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${brand.name}</h1>
                <p class="text-xl opacity-90">${brand.category}</p>
                ${brand.description ? `<p class="mt-4 text-lg opacity-80">${brand.description}</p>` : ''}
                ${brand.official_website ? `<a href="${brand.official_website}" target="_blank" class="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-all"><i class="fas fa-external-link-alt mr-2"></i>공식 웹사이트</a>` : ''}
            </div>
        </div>

        <!-- Products -->
        <div class="container mx-auto px-4 py-12">
            <h2 class="text-3xl font-bold mb-8">
                <i class="fas fa-box-open text-purple-600 mr-2"></i>
                제품 목록
            </h2>
            <div id="productList" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            </div>
        </div>

        <!-- Guides -->
        <div class="bg-white py-12">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-8">
                    <i class="fas fa-book text-purple-600 mr-2"></i>
                    구매 가이드
                </h2>
                <div id="guideList" class="grid md:grid-cols-2 gap-6">
                    <div class="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          const brandId = ${id};
          
          // 제품 목록 로드
          async function loadProducts() {
            try {
              const response = await axios.get('/api/products?brand_id=' + brandId);
              const products = response.data.data;
              
              if (products.length === 0) {
                document.getElementById('productList').innerHTML = '<p class="text-gray-600 col-span-full text-center">등록된 제품이 없습니다</p>';
                return;
              }
              
              const html = products.map(product => \`
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover cursor-pointer transition-all" onclick="location.href='/product/\${product.id}'">
                  <h3 class="font-bold text-xl mb-2">\${product.model_name}</h3>
                  <p class="text-gray-600 mb-4">\${product.category}</p>
                  <div class="border-t pt-4">
                    <p class="text-sm text-gray-500 mb-1">정가</p>
                    <p class="text-2xl font-bold text-purple-600">\${product.official_price ? product.official_price.toLocaleString() + '원' : '가격 문의'}</p>
                  </div>
                  <button class="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all">
                    <i class="fas fa-search mr-2"></i>가격 비교하기
                  </button>
                </div>
              \`).join('');
              
              document.getElementById('productList').innerHTML = html;
            } catch (error) {
              console.error('제품 로드 오류:', error);
            }
          }
          
          // 가이드 로드
          async function loadGuides() {
            try {
              const response = await axios.get('/api/guides?brand_id=' + brandId);
              const guides = response.data.data;
              
              if (guides.length === 0) {
                document.getElementById('guideList').innerHTML = '<p class="text-gray-600 col-span-full text-center">등록된 가이드가 없습니다</p>';
                return;
              }
              
              const typeLabels = {
                'authentication': '정품 인증',
                'buying-tip': '구매 팁',
                'sizing': '사이즈 가이드',
                'care': '관리 방법'
              };
              
              const html = guides.map(guide => \`
                <div class="bg-gray-50 rounded-xl p-6 hover:shadow-lg cursor-pointer transition-all" onclick="viewGuide(\${guide.id})">
                  <span class="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-3">
                    \${typeLabels[guide.type] || guide.type}
                  </span>
                  <h3 class="font-bold text-lg mb-2">\${guide.title}</h3>
                  <p class="text-gray-600 text-sm line-clamp-2">\${guide.content.substring(0, 100)}...</p>
                  <p class="text-xs text-gray-500 mt-3">
                    <i class="fas fa-eye mr-1"></i>\${guide.views || 0} 조회
                  </p>
                </div>
              \`).join('');
              
              document.getElementById('guideList').innerHTML = html;
            } catch (error) {
              console.error('가이드 로드 오류:', error);
            }
          }
          
          function viewGuide(id) {
            // 조회수 증가
            axios.post('/api/guides/' + id + '/view');
            location.href = '/guide/' + id;
          }
          
          loadProducts();
          loadGuides();
        </script>
    </body>
    </html>
  `)
})

// 제품 상세 페이지
app.get('/product/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  const product = await DB.prepare(`
    SELECT p.*, b.name as brand_name, b.official_website
    FROM products p
    LEFT JOIN brands b ON p.brand_id = b.id
    WHERE p.id = ?
  `).bind(id).first()
  
  if (!product) {
    return c.redirect('/')
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${product.brand_name} ${product.model_name} - 럭셔리 리뷰 허브</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="text-2xl font-bold text-purple-600">
                        <i class="fas fa-gem mr-2"></i>럭셔리 허브
                    </a>
                    <div class="space-x-4">
                        <a href="/brand/${product.brand_id}" class="text-gray-600 hover:text-purple-600">
                            <i class="fas fa-arrow-left mr-2"></i>브랜드로 돌아가기
                        </a>
                        <a href="/" class="text-gray-600 hover:text-purple-600">
                            <i class="fas fa-home mr-2"></i>홈
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-12">
            <!-- Product Info -->
            <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-gray-100 rounded-xl flex items-center justify-center h-96">
                        <i class="fas fa-shopping-bag text-gray-300 text-9xl"></i>
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold mb-2">${product.brand_name}</h1>
                        <h2 class="text-2xl text-gray-700 mb-4">${product.model_name}</h2>
                        <p class="text-gray-600 mb-6">${product.description || ''}</p>
                        
                        <div class="bg-purple-50 rounded-xl p-6 mb-6">
                            <p class="text-sm text-gray-600 mb-2">정가</p>
                            <p class="text-4xl font-bold text-purple-600">${product.official_price ? product.official_price.toLocaleString() + '원' : '가격 문의'}</p>
                        </div>
                        
                        <div class="flex gap-3">
                            <button onclick="showPriceModal()" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold transition-all">
                                <i class="fas fa-tags mr-2"></i>가격 정보 등록
                            </button>
                            <button onclick="showReviewModal()" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-all">
                                <i class="fas fa-pen mr-2"></i>리뷰 작성
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Price Comparison -->
            <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 class="text-2xl font-bold mb-6">
                    <i class="fas fa-dollar-sign text-green-600 mr-2"></i>
                    가격 비교
                </h2>
                <div id="priceList">
                    <div class="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
                </div>
            </div>

            <!-- Reviews -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
                <h2 class="text-2xl font-bold mb-6">
                    <i class="fas fa-star text-yellow-500 mr-2"></i>
                    사용자 리뷰
                </h2>
                <div id="reviewList">
                    <div class="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- Price Modal -->
        <div id="priceModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                <h3 class="text-2xl font-bold mb-6">가격 정보 등록</h3>
                <form onsubmit="submitPrice(event)">
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">판매처</label>
                        <select id="sellerId" class="w-full border rounded-lg px-4 py-2" required>
                            <option value="">선택하세요</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">가격 (원)</label>
                        <input type="number" id="price" class="w-full border rounded-lg px-4 py-2" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">URL (선택)</label>
                        <input type="url" id="url" class="w-full border rounded-lg px-4 py-2">
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-bold mb-2">작성자</label>
                        <input type="text" id="reportedBy" class="w-full border rounded-lg px-4 py-2" required>
                    </div>
                    <div class="flex gap-3">
                        <button type="button" onclick="closePriceModal()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg">취소</button>
                        <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">등록</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Review Modal -->
        <div id="reviewModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
                <h3 class="text-2xl font-bold mb-6">리뷰 작성</h3>
                <form onsubmit="submitReview(event)">
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">평점</label>
                        <div class="flex gap-2">
                            <button type="button" onclick="setRating(1)" class="star-btn text-3xl">⭐</button>
                            <button type="button" onclick="setRating(2)" class="star-btn text-3xl">⭐</button>
                            <button type="button" onclick="setRating(3)" class="star-btn text-3xl">⭐</button>
                            <button type="button" onclick="setRating(4)" class="star-btn text-3xl">⭐</button>
                            <button type="button" onclick="setRating(5)" class="star-btn text-3xl">⭐</button>
                        </div>
                        <input type="hidden" id="rating" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">제목</label>
                        <input type="text" id="reviewTitle" class="w-full border rounded-lg px-4 py-2" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">내용</label>
                        <textarea id="reviewContent" class="w-full border rounded-lg px-4 py-2 h-32" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">작성자</label>
                        <input type="text" id="authorName" class="w-full border rounded-lg px-4 py-2" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-bold mb-2">구매처 (선택)</label>
                        <select id="reviewSellerId" class="w-full border rounded-lg px-4 py-2">
                            <option value="">선택하세요</option>
                        </select>
                    </div>
                    <div class="flex gap-3">
                        <button type="button" onclick="closeReviewModal()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg">취소</button>
                        <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">작성</button>
                    </div>
                </form>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          const productId = ${id};
          let currentRating = 0;
          
          // 가격 목록 로드
          async function loadPrices() {
            try {
              const response = await axios.get('/api/prices/' + productId);
              const prices = response.data.data;
              
              if (prices.length === 0) {
                document.getElementById('priceList').innerHTML = '<p class="text-gray-600 text-center py-8">등록된 가격 정보가 없습니다</p>';
                return;
              }
              
              const html = prices.map((price, index) => {
                const badgeColor = index === 0 ? 'bg-red-500' : 'bg-gray-300';
                const trustColors = {
                  'A': 'text-green-600',
                  'B': 'text-blue-600',
                  'C': 'text-orange-600',
                  'D': 'text-red-600'
                };
                
                return \`
                  <div class="border rounded-xl p-6 mb-4 hover:shadow-lg transition-all \${index === 0 ? 'border-red-500 border-2' : ''}">
                    <div class="flex justify-between items-start mb-3">
                      <div>
                        <h3 class="font-bold text-lg">\${price.seller_name}</h3>
                        <p class="text-sm text-gray-600">\${price.country}</p>
                      </div>
                      <div class="text-right">
                        \${index === 0 ? \`<span class="\${badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">최저가</span><br>\` : ''}
                        <span class="font-bold \${trustColors[price.trust_rating] || 'text-gray-600'}">신뢰등급: \${price.trust_rating}</span>
                        \${price.verified ? '<i class="fas fa-check-circle text-blue-500 ml-1"></i>' : ''}
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <p class="text-3xl font-bold text-purple-600">\${price.price.toLocaleString()}원</p>
                      \${price.url ? \`<a href="\${price.url}" target="_blank" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all"><i class="fas fa-external-link-alt mr-2"></i>구매하기</a>\` : ''}
                    </div>
                    <p class="text-xs text-gray-500 mt-3">등록: \${price.reported_by} · \${new Date(price.created_at).toLocaleDateString()}</p>
                  </div>
                \`;
              }).join('');
              
              document.getElementById('priceList').innerHTML = html;
            } catch (error) {
              console.error('가격 로드 오류:', error);
            }
          }
          
          // 리뷰 목록 로드
          async function loadReviews() {
            try {
              const response = await axios.get('/api/reviews/' + productId);
              const reviews = response.data.data;
              
              if (reviews.length === 0) {
                document.getElementById('reviewList').innerHTML = '<p class="text-gray-600 text-center py-8">작성된 리뷰가 없습니다</p>';
                return;
              }
              
              const html = reviews.map(review => \`
                <div class="border rounded-xl p-6 mb-4">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <div class="text-yellow-500 mb-1">\${'⭐'.repeat(review.rating)}</div>
                      <h3 class="font-bold text-lg">\${review.title}</h3>
                    </div>
                    \${review.purchase_verified ? '<span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">구매 인증</span>' : ''}
                  </div>
                  <p class="text-gray-700 mb-3">\${review.content}</p>
                  \${review.seller_name ? \`<p class="text-sm text-purple-600 mb-2"><i class="fas fa-store mr-1"></i>구매처: \${review.seller_name}</p>\` : ''}
                  <div class="flex justify-between items-center text-sm text-gray-500">
                    <span>\${review.author_name} · \${new Date(review.created_at).toLocaleDateString()}</span>
                    <span><i class="fas fa-thumbs-up mr-1"></i>\${review.likes || 0}</span>
                  </div>
                </div>
              \`).join('');
              
              document.getElementById('reviewList').innerHTML = html;
            } catch (error) {
              console.error('리뷰 로드 오류:', error);
            }
          }
          
          // 판매처 목록 로드
          async function loadSellers() {
            try {
              const response = await axios.get('/api/sellers');
              const sellers = response.data.data;
              
              const options = sellers.map(s => \`<option value="\${s.id}">\${s.name} (\${s.country}) - 신뢰등급 \${s.trust_rating}</option>\`).join('');
              document.getElementById('sellerId').innerHTML = '<option value="">선택하세요</option>' + options;
              document.getElementById('reviewSellerId').innerHTML = '<option value="">선택하세요</option>' + options;
            } catch (error) {
              console.error('판매처 로드 오류:', error);
            }
          }
          
          // 모달 제어
          function showPriceModal() {
            document.getElementById('priceModal').classList.remove('hidden');
            document.getElementById('priceModal').classList.add('flex');
          }
          
          function closePriceModal() {
            document.getElementById('priceModal').classList.add('hidden');
            document.getElementById('priceModal').classList.remove('flex');
          }
          
          function showReviewModal() {
            document.getElementById('reviewModal').classList.remove('hidden');
            document.getElementById('reviewModal').classList.add('flex');
          }
          
          function closeReviewModal() {
            document.getElementById('reviewModal').classList.add('hidden');
            document.getElementById('reviewModal').classList.remove('flex');
          }
          
          // 평점 선택
          function setRating(rating) {
            currentRating = rating;
            document.getElementById('rating').value = rating;
            
            const buttons = document.querySelectorAll('.star-btn');
            buttons.forEach((btn, index) => {
              if (index < rating) {
                btn.style.opacity = '1';
              } else {
                btn.style.opacity = '0.3';
              }
            });
          }
          
          // 가격 등록
          async function submitPrice(e) {
            e.preventDefault();
            
            try {
              await axios.post('/api/prices', {
                product_id: productId,
                seller_id: parseInt(document.getElementById('sellerId').value),
                price: parseInt(document.getElementById('price').value),
                url: document.getElementById('url').value,
                reported_by: document.getElementById('reportedBy').value
              });
              
              alert('가격 정보가 등록되었습니다!');
              closePriceModal();
              e.target.reset();
              loadPrices();
            } catch (error) {
              console.error('등록 오류:', error);
              alert('등록 중 오류가 발생했습니다');
            }
          }
          
          // 리뷰 등록
          async function submitReview(e) {
            e.preventDefault();
            
            if (!currentRating) {
              alert('평점을 선택해주세요');
              return;
            }
            
            try {
              const sellerIdValue = document.getElementById('reviewSellerId').value;
              
              await axios.post('/api/reviews', {
                product_id: productId,
                seller_id: sellerIdValue ? parseInt(sellerIdValue) : null,
                rating: currentRating,
                title: document.getElementById('reviewTitle').value,
                content: document.getElementById('reviewContent').value,
                author_name: document.getElementById('authorName').value
              });
              
              alert('리뷰가 작성되었습니다!');
              closeReviewModal();
              e.target.reset();
              currentRating = 0;
              loadReviews();
            } catch (error) {
              console.error('작성 오류:', error);
              alert('작성 중 오류가 발생했습니다');
            }
          }
          
          // 페이지 로드 시 실행
          loadPrices();
          loadReviews();
          loadSellers();
        </script>
    </body>
    </html>
  `)
})

export default app
