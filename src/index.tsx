import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { getMainPageHTML } from './pages'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS 설정
app.use('/api/*', cors())

// Static 파일 제공
app.use('/static/*', serveStatic())

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
  return c.html(getMainPageHTML())
})

export default app
