// 다국어 번역 데이터
const translations = {
  ko: {
    // 메인 히어로
    hero_title: '전 세계 명품, 가장 똑똑하게 사는 법',
    hero_subtitle: '실시간 가격비교 · 검증된 리뷰 · 정품 인증 가이드',
    hero_description: '에르메스부터 롤렉스까지, 당신의 명품 쇼핑을 완벽하게',
    search_placeholder: '브랜드명 또는 제품명 검색 (예: HERMES, Birkin, 롤렉스...)',
    search_button: '검색',
    
    // Quick Stats
    stat_stores: '글로벌 쇼핑몰',
    stat_products: '명품 제품',
    stat_reviews: '실사용 리뷰',
    stat_trust: '판매처 신뢰등급',
    
    // Features
    features_title: '핵심 기능',
    feature_price_title: '실시간 가격비교',
    feature_price_desc: '전 세계 명품 쇼핑몰의 가격을 한눈에 비교하고 최저가를 찾아드립니다.',
    feature_seller_title: '검증된 판매처',
    feature_seller_desc: 'A~D 등급의 신뢰도 평가로 안전한 구매를 보장합니다.',
    feature_review_title: '실사용자 리뷰',
    feature_review_desc: '실제 구매자들의 솔직한 리뷰로 현명한 선택을 하세요.',
    feature_auth_title: '정품 인증 가이드',
    feature_auth_desc: '브랜드별 정품 식별 방법을 상세하게 안내해드립니다.',
    feature_trend_title: '가격 추세 분석',
    feature_trend_desc: '과거 가격 변동을 분석하여 최적의 구매 시기를 알려드립니다.',
    feature_global_title: '글로벌 쇼핑 지원',
    feature_global_desc: '해외직구 가이드와 관세 정보까지 모두 제공합니다.',
    
    // Sections
    popular_brands: '인기 브랜드',
    best_deals: '실시간 최저가',
    search_results: '검색 결과',
    
    // Brand Page
    brand_products: '제품 목록',
    brand_guides: '구매 가이드',
    official_website: '공식 웹사이트',
    home: '홈',
    back_to_brand: '브랜드로 돌아가기',
    
    // Product Page
    official_price: '정가',
    price_comparison: '가격 비교',
    user_reviews: '사용자 리뷰',
    add_price: '가격 정보 등록',
    write_review: '리뷰 작성',
    buy_now: '구매하기',
    compare_price: '가격 비교하기',
    
    // Forms
    seller: '판매처',
    price: '가격',
    url: 'URL',
    author: '작성자',
    rating: '평점',
    title: '제목',
    content: '내용',
    select: '선택하세요',
    optional: '선택',
    required: '필수',
    cancel: '취소',
    submit: '등록',
    write: '작성',
    
    // Messages
    no_products: '등록된 제품이 없습니다',
    no_guides: '등록된 가이드가 없습니다',
    no_prices: '등록된 가격 정보가 없습니다',
    no_reviews: '작성된 리뷰가 없습니다',
    no_results: '검색 결과가 없습니다',
    enter_keyword: '검색어를 입력해주세요',
    enter_rating: '평점을 선택해주세요',
    
    // Product Details
    products_count: '개 제품',
    views_count: '조회',
    discount_rate: '할인',
    save_amount: '절약',
    lowest_price: '최저가',
    trust_rating: '신뢰등급',
    purchase_verified: '구매 인증',
    purchase_location: '구매처',
    
    // Guide Types
    guide_authentication: '정품 인증',
    guide_buying_tip: '구매 팁',
    guide_sizing: '사이즈 가이드',
    guide_care: '관리 방법',
    
    // Footer
    footer_copyright: '© 2024 Luxury Review Hub. All rights reserved.',
    footer_tagline: '전 세계 명품, 가장 똑똑하게 사는 법'
  },
  
  en: {
    hero_title: 'Smart Way to Buy Luxury Worldwide',
    hero_subtitle: 'Real-time Price Comparison · Verified Reviews · Authentication Guide',
    hero_description: 'From Hermès to Rolex, your perfect luxury shopping companion',
    search_placeholder: 'Search brand or product name (e.g., HERMES, Birkin, Rolex...)',
    search_button: 'Search',
    
    stat_stores: 'Global Stores',
    stat_products: 'Luxury Products',
    stat_reviews: 'User Reviews',
    stat_trust: 'Trust Rating',
    
    features_title: 'Key Features',
    feature_price_title: 'Real-time Price Comparison',
    feature_price_desc: 'Compare prices from luxury shopping malls worldwide and find the best deals.',
    feature_seller_title: 'Verified Sellers',
    feature_seller_desc: 'Safe shopping guaranteed with A-D trust rating system.',
    feature_review_title: 'User Reviews',
    feature_review_desc: 'Make smart choices with honest reviews from real buyers.',
    feature_auth_title: 'Authentication Guide',
    feature_auth_desc: 'Detailed brand-specific authentication methods.',
    feature_trend_title: 'Price Trend Analysis',
    feature_trend_desc: 'Find the best time to buy by analyzing price history.',
    feature_global_title: 'Global Shopping Support',
    feature_global_desc: 'Complete guide for overseas shopping and customs information.',
    
    popular_brands: 'Popular Brands',
    best_deals: 'Best Deals',
    search_results: 'Search Results',
    
    brand_products: 'Products',
    brand_guides: 'Buying Guides',
    official_website: 'Official Website',
    home: 'Home',
    back_to_brand: 'Back to Brand',
    
    official_price: 'Official Price',
    price_comparison: 'Price Comparison',
    user_reviews: 'User Reviews',
    add_price: 'Add Price Info',
    write_review: 'Write Review',
    buy_now: 'Buy Now',
    compare_price: 'Compare Price',
    
    seller: 'Seller',
    price: 'Price',
    url: 'URL',
    author: 'Author',
    rating: 'Rating',
    title: 'Title',
    content: 'Content',
    select: 'Select',
    optional: 'Optional',
    required: 'Required',
    cancel: 'Cancel',
    submit: 'Submit',
    write: 'Write',
    
    no_products: 'No products registered',
    no_guides: 'No guides available',
    no_prices: 'No price information',
    no_reviews: 'No reviews yet',
    no_results: 'No search results',
    enter_keyword: 'Please enter a keyword',
    enter_rating: 'Please select a rating',
    
    products_count: 'products',
    views_count: 'views',
    discount_rate: 'OFF',
    save_amount: 'Save',
    lowest_price: 'Lowest Price',
    trust_rating: 'Trust Rating',
    purchase_verified: 'Verified Purchase',
    purchase_location: 'Purchased at',
    
    guide_authentication: 'Authentication',
    guide_buying_tip: 'Buying Tips',
    guide_sizing: 'Sizing Guide',
    guide_care: 'Care Guide',
    
    footer_copyright: '© 2024 Luxury Review Hub. All rights reserved.',
    footer_tagline: 'Smart Way to Buy Luxury Worldwide'
  },
  
  zh: {
    hero_title: '全球奢侈品，最聪明的购买方式',
    hero_subtitle: '实时比价 · 认证评论 · 正品鉴定指南',
    hero_description: '从爱马仕到劳力士，您完美的奢侈品购物伴侣',
    search_placeholder: '搜索品牌或产品名称（例如：HERMES、Birkin、劳力士...）',
    search_button: '搜索',
    
    stat_stores: '全球商城',
    stat_products: '奢侈品产品',
    stat_reviews: '用户评论',
    stat_trust: '信任评级',
    
    features_title: '核心功能',
    feature_price_title: '实时比价',
    feature_price_desc: '比较全球奢侈品商城的价格，找到最优惠的价格。',
    feature_seller_title: '认证卖家',
    feature_seller_desc: 'A-D信任评级系统保障安全购物。',
    feature_review_title: '用户评论',
    feature_review_desc: '通过真实买家的诚实评论做出明智选择。',
    feature_auth_title: '正品鉴定指南',
    feature_auth_desc: '详细的品牌特定鉴定方法。',
    feature_trend_title: '价格趋势分析',
    feature_trend_desc: '通过分析价格历史找到最佳购买时机。',
    feature_global_title: '全球购物支持',
    feature_global_desc: '完整的海外购物指南和海关信息。',
    
    popular_brands: '热门品牌',
    best_deals: '最优惠价',
    search_results: '搜索结果',
    
    brand_products: '产品列表',
    brand_guides: '购买指南',
    official_website: '官方网站',
    home: '首页',
    back_to_brand: '返回品牌',
    
    official_price: '官方价格',
    price_comparison: '价格比较',
    user_reviews: '用户评论',
    add_price: '添加价格信息',
    write_review: '写评论',
    buy_now: '立即购买',
    compare_price: '比较价格',
    
    seller: '卖家',
    price: '价格',
    url: '网址',
    author: '作者',
    rating: '评分',
    title: '标题',
    content: '内容',
    select: '请选择',
    optional: '可选',
    required: '必填',
    cancel: '取消',
    submit: '提交',
    write: '发布',
    
    no_products: '暂无产品',
    no_guides: '暂无指南',
    no_prices: '暂无价格信息',
    no_reviews: '暂无评论',
    no_results: '无搜索结果',
    enter_keyword: '请输入关键词',
    enter_rating: '请选择评分',
    
    products_count: '个产品',
    views_count: '次浏览',
    discount_rate: '折扣',
    save_amount: '节省',
    lowest_price: '最低价',
    trust_rating: '信任评级',
    purchase_verified: '已验证购买',
    purchase_location: '购买地点',
    
    guide_authentication: '正品鉴定',
    guide_buying_tip: '购买技巧',
    guide_sizing: '尺寸指南',
    guide_care: '保养指南',
    
    footer_copyright: '© 2024 奢侈品评论中心。保留所有权利。',
    footer_tagline: '全球奢侈品，最聪明的购买方式'
  },
  
  ja: {
    hero_title: '世界中の高級品を、最もスマートに購入',
    hero_subtitle: 'リアルタイム価格比較 · 認証済みレビュー · 本物鑑定ガイド',
    hero_description: 'エルメスからロレックスまで、あなたの完璧なラグジュアリーショッピングパートナー',
    search_placeholder: 'ブランド名または製品名を検索（例：HERMES、Birkin、ロレックス...）',
    search_button: '検索',
    
    stat_stores: 'グローバルストア',
    stat_products: '高級品製品',
    stat_reviews: 'ユーザーレビュー',
    stat_trust: '信頼評価',
    
    features_title: '主な機能',
    feature_price_title: 'リアルタイム価格比較',
    feature_price_desc: '世界中の高級品ショッピングモールの価格を比較し、最安値を見つけます。',
    feature_seller_title: '認証済み販売者',
    feature_seller_desc: 'A-D信頼評価システムで安全なショッピングを保証します。',
    feature_review_title: 'ユーザーレビュー',
    feature_review_desc: '実際の購入者の正直なレビューでスマートな選択を。',
    feature_auth_title: '本物鑑定ガイド',
    feature_auth_desc: 'ブランド別の詳細な鑑定方法。',
    feature_trend_title: '価格トレンド分析',
    feature_trend_desc: '価格履歴を分析して最適な購入時期を見つけます。',
    feature_global_title: 'グローバルショッピングサポート',
    feature_global_desc: '海外ショッピングガイドと税関情報を完全提供。',
    
    popular_brands: '人気ブランド',
    best_deals: '最安値',
    search_results: '検索結果',
    
    brand_products: '製品リスト',
    brand_guides: '購入ガイド',
    official_website: '公式サイト',
    home: 'ホーム',
    back_to_brand: 'ブランドに戻る',
    
    official_price: '公式価格',
    price_comparison: '価格比較',
    user_reviews: 'ユーザーレビュー',
    add_price: '価格情報を追加',
    write_review: 'レビューを書く',
    buy_now: '今すぐ購入',
    compare_price: '価格を比較',
    
    seller: '販売者',
    price: '価格',
    url: 'URL',
    author: '著者',
    rating: '評価',
    title: 'タイトル',
    content: '内容',
    select: '選択してください',
    optional: 'オプション',
    required: '必須',
    cancel: 'キャンセル',
    submit: '送信',
    write: '投稿',
    
    no_products: '登録された製品はありません',
    no_guides: '利用可能なガイドはありません',
    no_prices: '価格情報はありません',
    no_reviews: 'まだレビューはありません',
    no_results: '検索結果はありません',
    enter_keyword: 'キーワードを入力してください',
    enter_rating: '評価を選択してください',
    
    products_count: '個の製品',
    views_count: '回の閲覧',
    discount_rate: 'オフ',
    save_amount: '節約',
    lowest_price: '最安値',
    trust_rating: '信頼評価',
    purchase_verified: '購入確認済み',
    purchase_location: '購入場所',
    
    guide_authentication: '本物鑑定',
    guide_buying_tip: '購入のヒント',
    guide_sizing: 'サイズガイド',
    guide_care: 'ケアガイド',
    
    footer_copyright: '© 2024 ラグジュアリーレビューハブ。全著作権所有。',
    footer_tagline: '世界中の高級品を、最もスマートに購入'
  },
  
  vi: {
    hero_title: 'Cách Mua Hàng Hiệu Thông Minh Nhất',
    hero_subtitle: 'So Sánh Giá Thời Gian Thực · Đánh Giá Xác Thực · Hướng Dẫn Xác Minh',
    hero_description: 'Từ Hermès đến Rolex, người bạn đồng hành mua sắm hàng hiệu hoàn hảo',
    search_placeholder: 'Tìm kiếm thương hiệu hoặc sản phẩm (VD: HERMES, Birkin, Rolex...)',
    search_button: 'Tìm kiếm',
    
    stat_stores: 'Cửa Hàng Toàn Cầu',
    stat_products: 'Sản Phẩm Cao Cấp',
    stat_reviews: 'Đánh Giá',
    stat_trust: 'Xếp Hạng Tin Cậy',
    
    features_title: 'Tính Năng Chính',
    feature_price_title: 'So Sánh Giá Thời Gian Thực',
    feature_price_desc: 'So sánh giá từ các trung tâm mua sắm xa xỉ trên toàn thế giới và tìm giá tốt nhất.',
    feature_seller_title: 'Người Bán Đã Xác Minh',
    feature_seller_desc: 'Mua sắm an toàn được đảm bảo với hệ thống xếp hạng tin cậy A-D.',
    feature_review_title: 'Đánh Giá Người Dùng',
    feature_review_desc: 'Đưa ra lựa chọn thông minh với đánh giá trung thực từ người mua thực tế.',
    feature_auth_title: 'Hướng Dẫn Xác Thực',
    feature_auth_desc: 'Phương pháp xác thực chi tiết theo từng thương hiệu.',
    feature_trend_title: 'Phân Tích Xu Hướng Giá',
    feature_trend_desc: 'Tìm thời điểm tốt nhất để mua bằng cách phân tích lịch sử giá.',
    feature_global_title: 'Hỗ Trợ Mua Sắm Toàn Cầu',
    feature_global_desc: 'Hướng dẫn hoàn chỉnh cho mua sắm nước ngoài và thông tin hải quan.',
    
    popular_brands: 'Thương Hiệu Phổ Biến',
    best_deals: 'Giá Tốt Nhất',
    search_results: 'Kết Quả Tìm Kiếm',
    
    brand_products: 'Danh Sách Sản Phẩm',
    brand_guides: 'Hướng Dẫn Mua Hàng',
    official_website: 'Website Chính Thức',
    home: 'Trang Chủ',
    back_to_brand: 'Quay Lại Thương Hiệu',
    
    official_price: 'Giá Chính Thức',
    price_comparison: 'So Sánh Giá',
    user_reviews: 'Đánh Giá Người Dùng',
    add_price: 'Thêm Thông Tin Giá',
    write_review: 'Viết Đánh Giá',
    buy_now: 'Mua Ngay',
    compare_price: 'So Sánh Giá',
    
    seller: 'Người Bán',
    price: 'Giá',
    url: 'Đường Dẫn',
    author: 'Tác Giả',
    rating: 'Xếp Hạng',
    title: 'Tiêu Đề',
    content: 'Nội Dung',
    select: 'Chọn',
    optional: 'Tùy Chọn',
    required: 'Bắt Buộc',
    cancel: 'Hủy',
    submit: 'Gửi',
    write: 'Đăng',
    
    no_products: 'Không có sản phẩm',
    no_guides: 'Không có hướng dẫn',
    no_prices: 'Không có thông tin giá',
    no_reviews: 'Chưa có đánh giá',
    no_results: 'Không có kết quả',
    enter_keyword: 'Vui lòng nhập từ khóa',
    enter_rating: 'Vui lòng chọn xếp hạng',
    
    products_count: 'sản phẩm',
    views_count: 'lượt xem',
    discount_rate: 'giảm',
    save_amount: 'tiết kiệm',
    lowest_price: 'Giá Thấp Nhất',
    trust_rating: 'Xếp Hạng Tin Cậy',
    purchase_verified: 'Đã Xác Minh Mua Hàng',
    purchase_location: 'Nơi Mua',
    
    guide_authentication: 'Xác Thực',
    guide_buying_tip: 'Mẹo Mua Hàng',
    guide_sizing: 'Hướng Dẫn Size',
    guide_care: 'Hướng Dẫn Bảo Quản',
    
    footer_copyright: '© 2024 Luxury Review Hub. Đã đăng ký bản quyền.',
    footer_tagline: 'Cách Mua Hàng Hiệu Thông Minh Nhất'
  },
  
  mn: {
    hero_title: 'Дэлхийн Тансаг Барааг Ухаалаг Худалдаж Авах Арга',
    hero_subtitle: 'Бодит Цагийн Үнийн Харьцуулалт · Баталгаажсан Сэтгэгдэл · Жинхэнэ Баталгаа',
    hero_description: 'Hermès-ээс Rolex хүртэл, таны төгс тансаг барааны дэлгүүрийн хамтрагч',
    search_placeholder: 'Брэнд эсвэл бүтээгдэхүүн хайх (жишээ: HERMES, Birkin, Rolex...)',
    search_button: 'Хайх',
    
    stat_stores: 'Дэлхийн Дэлгүүр',
    stat_products: 'Тансаг Бүтээгдэхүүн',
    stat_reviews: 'Хэрэглэгчийн Сэтгэгдэл',
    stat_trust: 'Итгэлцлийн Зэрэглэл',
    
    features_title: 'Үндсэн Онцлог',
    feature_price_title: 'Бодит Цагийн Үнийн Харьцуулалт',
    feature_price_desc: 'Дэлхийн тансаг барааны дэлгүүрүүдийн үнийг харьцуулж, хамгийн сайн үнийг олоорой.',
    feature_seller_title: 'Баталгаажсан Борлуулагч',
    feature_seller_desc: 'A-D итгэлцлийн зэрэглэлийн системээр аюулгүй худалдан авалт баталгаатай.',
    feature_review_title: 'Хэрэглэгчийн Сэтгэгдэл',
    feature_review_desc: 'Жинхэнэ худалдан авагчдын үнэнч сэтгэгдлээр ухаалаг сонголт хий.',
    feature_auth_title: 'Жинхэнэ Баталгаажуулалт',
    feature_auth_desc: 'Брэнд тус бүрийн нарийвчилсан баталгаажуулалтын арга.',
    feature_trend_title: 'Үнийн Хандлагын Шинжилгээ',
    feature_trend_desc: 'Үнийн түүхийг шинжлэн худалдан авах хамгийн сайн цагийг олоорой.',
    feature_global_title: 'Дэлхийн Худалдааны Дэмжлэг',
    feature_global_desc: 'Гадаад худалдааны бүрэн заавар болон гаалийн мэдээлэл.',
    
    popular_brands: 'Алдартай Брэнд',
    best_deals: 'Хамгийн Сайн Үнэ',
    search_results: 'Хайлтын Үр Дүн',
    
    brand_products: 'Бүтээгдэхүүний Жагсаалт',
    brand_guides: 'Худалдан Авалтын Заавар',
    official_website: 'Албан Ёсны Вэбсайт',
    home: 'Нүүр',
    back_to_brand: 'Брэнд Рүү Буцах',
    
    official_price: 'Албан Ёсны Үнэ',
    price_comparison: 'Үнийн Харьцуулалт',
    user_reviews: 'Хэрэглэгчийн Сэтгэгдэл',
    add_price: 'Үнийн Мэдээлэл Нэмэх',
    write_review: 'Сэтгэгдэл Бичих',
    buy_now: 'Одоо Худалдаж Авах',
    compare_price: 'Үнэ Харьцуулах',
    
    seller: 'Борлуулагч',
    price: 'Үнэ',
    url: 'Холбоос',
    author: 'Зохиогч',
    rating: 'Үнэлгээ',
    title: 'Гарчиг',
    content: 'Агуулга',
    select: 'Сонгох',
    optional: 'Сонголттой',
    required: 'Заавал',
    cancel: 'Цуцлах',
    submit: 'Илгээх',
    write: 'Нийтлэх',
    
    no_products: 'Бүтээгдэхүүн алга',
    no_guides: 'Заавар алга',
    no_prices: 'Үнийн мэдээлэл алга',
    no_reviews: 'Сэтгэгдэл алга',
    no_results: 'Хайлтын үр дүн алга',
    enter_keyword: 'Түлхүүр үг оруулна уу',
    enter_rating: 'Үнэлгээ сонгоно уу',
    
    products_count: 'бүтээгдэхүүн',
    views_count: 'үзэлт',
    discount_rate: 'хөнгөлөлт',
    save_amount: 'хэмнэлт',
    lowest_price: 'Хамгийн Бага Үнэ',
    trust_rating: 'Итгэлцлийн Зэрэглэл',
    purchase_verified: 'Баталгаажсан Худалдан Авалт',
    purchase_location: 'Худалдан Авсан Газар',
    
    guide_authentication: 'Жинхэнэ Баталгаажуулалт',
    guide_buying_tip: 'Худалдан Авах Зөвлөмж',
    guide_sizing: 'Хэмжээний Заавар',
    guide_care: 'Арчилгааны Заавар',
    
    footer_copyright: '© 2024 Luxury Review Hub. Бүх эрх хуулиар хамгаалагдсан.',
    footer_tagline: 'Дэлхийн Тансаг Барааг Ухаалаг Худалдаж Авах Арга'
  },
  
  ru: {
    hero_title: 'Умный Способ Покупки Люкса По Всему Миру',
    hero_subtitle: 'Сравнение Цен В Реальном Времени · Проверенные Отзывы · Руководство По Аутентификации',
    hero_description: 'От Hermès до Rolex, ваш идеальный помощник в покупке люксовых товаров',
    search_placeholder: 'Поиск бренда или товара (например: HERMES, Birkin, Rolex...)',
    search_button: 'Поиск',
    
    stat_stores: 'Магазинов По Всему Миру',
    stat_products: 'Люксовых Товаров',
    stat_reviews: 'Отзывов Пользователей',
    stat_trust: 'Рейтинг Доверия',
    
    features_title: 'Ключевые Функции',
    feature_price_title: 'Сравнение Цен В Реальном Времени',
    feature_price_desc: 'Сравнивайте цены в люксовых магазинах по всему миру и находите лучшие предложения.',
    feature_seller_title: 'Проверенные Продавцы',
    feature_seller_desc: 'Безопасные покупки гарантированы системой рейтинга доверия A-D.',
    feature_review_title: 'Отзывы Пользователей',
    feature_review_desc: 'Делайте умный выбор с честными отзывами от реальных покупателей.',
    feature_auth_title: 'Руководство По Аутентификации',
    feature_auth_desc: 'Подробные методы аутентификации для каждого бренда.',
    feature_trend_title: 'Анализ Ценовых Трендов',
    feature_trend_desc: 'Найдите лучшее время для покупки, анализируя историю цен.',
    feature_global_title: 'Поддержка Глобальных Покупок',
    feature_global_desc: 'Полное руководство по международным покупкам и таможенной информации.',
    
    popular_brands: 'Популярные Бренды',
    best_deals: 'Лучшие Предложения',
    search_results: 'Результаты Поиска',
    
    brand_products: 'Список Товаров',
    brand_guides: 'Руководства По Покупке',
    official_website: 'Официальный Сайт',
    home: 'Главная',
    back_to_brand: 'Вернуться К Бренду',
    
    official_price: 'Официальная Цена',
    price_comparison: 'Сравнение Цен',
    user_reviews: 'Отзывы Пользователей',
    add_price: 'Добавить Информацию О Цене',
    write_review: 'Написать Отзыв',
    buy_now: 'Купить Сейчас',
    compare_price: 'Сравнить Цены',
    
    seller: 'Продавец',
    price: 'Цена',
    url: 'Ссылка',
    author: 'Автор',
    rating: 'Рейтинг',
    title: 'Заголовок',
    content: 'Содержание',
    select: 'Выбрать',
    optional: 'Необязательно',
    required: 'Обязательно',
    cancel: 'Отмена',
    submit: 'Отправить',
    write: 'Опубликовать',
    
    no_products: 'Нет зарегистрированных товаров',
    no_guides: 'Руководства недоступны',
    no_prices: 'Нет информации о ценах',
    no_reviews: 'Пока нет отзывов',
    no_results: 'Нет результатов поиска',
    enter_keyword: 'Пожалуйста, введите ключевое слово',
    enter_rating: 'Пожалуйста, выберите рейтинг',
    
    products_count: 'товаров',
    views_count: 'просмотров',
    discount_rate: 'скидка',
    save_amount: 'экономия',
    lowest_price: 'Самая Низкая Цена',
    trust_rating: 'Рейтинг Доверия',
    purchase_verified: 'Подтвержденная Покупка',
    purchase_location: 'Место Покупки',
    
    guide_authentication: 'Аутентификация',
    guide_buying_tip: 'Советы По Покупке',
    guide_sizing: 'Размерная Таблица',
    guide_care: 'Уход',
    
    footer_copyright: '© 2024 Luxury Review Hub. Все права защищены.',
    footer_tagline: 'Умный Способ Покупки Люкса По Всему Миру'
  }
};

// 현재 언어
let currentLang = localStorage.getItem('lang') || 'ko';

// 번역 함수
function t(key) {
  return translations[currentLang][key] || translations['ko'][key] || key;
}

// 언어 변경 함수 (전역 스코프에 명시적으로 노출)
function changeLang(lang) {
  console.log('언어 변경:', lang);
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  // 즉시 새로고침
  window.location.reload();
}

// 전역 스코프에 명시적으로 등록
window.changeLang = changeLang;

// 언어 선택기 HTML
function getLangSelectorHTML() {
  const langs = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'mn', name: 'Монгол', flag: '🇲🇳' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];
  
  const currentLangData = langs.find(l => l.code === currentLang);
  
  return `
    <div class="lang-container">
      <button id="langBtn" class="lang-btn" type="button">
        <i class="fas fa-globe"></i>
        <span class="font-bold">${currentLangData.flag} ${currentLangData.name}</span>
        <i class="fas fa-chevron-down text-xs"></i>
      </button>
      <div id="langMenu" class="lang-menu">
        ${langs.map(lang => `
          <button 
            type="button"
            onclick="changeLang('${lang.code}')" 
            class="lang-option ${lang.code === currentLang ? 'active' : ''}">
            <span class="text-xl mr-2">${lang.flag}</span>
            <span class="text-sm">${lang.name}</span>
            ${lang.code === currentLang ? '<i class="fas fa-check text-purple-600 ml-auto text-sm"></i>' : '<span class="ml-auto"></span>'}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// 언어 선택기 초기화 함수
function initLangSelector() {
  console.log('=== 언어 선택기 초기화 시작 ===');
  
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  
  if (!langBtn) {
    console.error('❌ 언어 버튼을 찾을 수 없습니다');
    return false;
  }
  
  if (!langMenu) {
    console.error('❌ 언어 메뉴를 찾을 수 없습니다');
    return false;
  }
  
  console.log('✅ 언어 버튼 발견:', langBtn);
  console.log('✅ 언어 메뉴 발견:', langMenu);
  
  // 이전 이벤트 리스너 제거 (중복 방지)
  const newLangBtn = langBtn.cloneNode(true);
  langBtn.parentNode.replaceChild(newLangBtn, langBtn);
  
  // 새 버튼에 클릭 이벤트 등록
  newLangBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🖱️ 언어 버튼 클릭됨');
    
    const isShowing = langMenu.classList.contains('show');
    if (isShowing) {
      langMenu.classList.remove('show');
      console.log('언어 메뉴 닫힘');
    } else {
      langMenu.classList.add('show');
      console.log('언어 메뉴 열림');
    }
  });
  
  // 메뉴 외부 클릭 시 닫기
  document.addEventListener('click', function(e) {
    if (!newLangBtn.contains(e.target) && !langMenu.contains(e.target)) {
      if (langMenu.classList.contains('show')) {
        langMenu.classList.remove('show');
        console.log('메뉴 외부 클릭으로 닫힘');
      }
    }
  });
  
  // ESC 키로 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && langMenu.classList.contains('show')) {
      langMenu.classList.remove('show');
      console.log('ESC 키로 메뉴 닫힘');
    }
  });
  
  console.log('=== 언어 선택기 초기화 완료 ===');
  return true;
}
