// 다국어 번역 데이터
const translations = {
  ko: {
    hero_title: '전 세계 명품, 가장 똑똑하게 사는 법',
    hero_subtitle: '실시간 가격비교 · 검증된 리뷰 · 정품 인증 가이드',
    hero_description: '에르메스부터 롤렉스까지, 당신의 명품 쇼핑을 완벽하게',
    search_placeholder: '브랜드명 또는 제품명 검색 (예: HERMES, Birkin, 롤렉스...)',
    search_button: '검색',
    stat_stores: '글로벌 쇼핑몰',
    stat_products: '명품 제품',
    stat_reviews: '실사용 리뷰',
    stat_trust: '판매처 신뢰등급',
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
    popular_brands: '인기 브랜드',
    best_deals: '실시간 최저가',
    footer_copyright: '© 2024 Luxury Review Hub. All rights reserved.',
    footer_tagline: '전 세계 명품 쇼핑의 새로운 기준',
    enter_keyword: '검색어를 입력해주세요'
  },
  en: {
    hero_title: 'Shop Luxury Smarter, Worldwide',
    hero_subtitle: 'Real-time Price Comparison · Verified Reviews · Authentication Guide',
    hero_description: 'From Hermès to Rolex, Perfect Your Luxury Shopping',
    search_placeholder: 'Search brands or products (e.g., HERMES, Birkin, Rolex...)',
    search_button: 'Search',
    stat_stores: 'Global Stores',
    stat_products: 'Luxury Products',
    stat_reviews: 'Real Reviews',
    stat_trust: 'Seller Trust Rating',
    features_title: 'Key Features',
    feature_price_title: 'Real-time Price Comparison',
    feature_price_desc: 'Compare prices from luxury stores worldwide and find the best deals.',
    feature_seller_title: 'Verified Sellers',
    feature_seller_desc: 'A-D trust rating system ensures safe purchases.',
    feature_review_title: 'User Reviews',
    feature_review_desc: 'Make smart choices with honest reviews from real buyers.',
    feature_auth_title: 'Authentication Guide',
    feature_auth_desc: 'Detailed brand-specific authentication methods.',
    feature_trend_title: 'Price Trend Analysis',
    feature_trend_desc: 'Analyze historical prices to find the best time to buy.',
    feature_global_title: 'Global Shopping Support',
    feature_global_desc: 'International shopping guide with customs information.',
    popular_brands: 'Popular Brands',
    best_deals: 'Best Deals',
    footer_copyright: '© 2024 Luxury Review Hub. All rights reserved.',
    footer_tagline: 'The New Standard for Global Luxury Shopping',
    enter_keyword: 'Please enter a search keyword'
  },
  zh: {
    hero_title: '全球奢侈品，最聪明的购买方式',
    hero_subtitle: '实时价格比较 · 认证评论 · 正品认证指南',
    hero_description: '从爱马仕到劳力士，完善您的奢侈品购物',
    search_placeholder: '搜索品牌或产品（例如：HERMES、Birkin、劳力士...）',
    search_button: '搜索',
    stat_stores: '全球商店',
    stat_products: '奢侈品产品',
    stat_reviews: '真实评论',
    stat_trust: '卖家信任评级',
    features_title: '主要功能',
    feature_price_title: '实时价格比较',
    feature_price_desc: '比较全球奢侈品商店的价格，找到最优惠的价格。',
    feature_seller_title: '认证卖家',
    feature_seller_desc: 'A-D信任评级系统确保安全购买。',
    feature_review_title: '用户评论',
    feature_review_desc: '通过真实买家的诚实评论做出明智选择。',
    feature_auth_title: '认证指南',
    feature_auth_desc: '详细的品牌特定认证方法。',
    feature_trend_title: '价格趋势分析',
    feature_trend_desc: '分析历史价格以找到最佳购买时机。',
    feature_global_title: '全球购物支持',
    feature_global_desc: '包含海关信息的国际购物指南。',
    popular_brands: '热门品牌',
    best_deals: '最优惠价格',
    footer_copyright: '© 2024 Luxury Review Hub. 保留所有权利。',
    footer_tagline: '全球奢侈品购物的新标准',
    enter_keyword: '请输入搜索关键词'
  },
  ja: {
    hero_title: '世界の高級品を、最もスマートに購入',
    hero_subtitle: 'リアルタイム価格比較 · 認証レビュー · 正規品認証ガイド',
    hero_description: 'エルメスからロレックスまで、あなたの高級品ショッピングを完璧に',
    search_placeholder: 'ブランド名または製品名を検索（例：HERMES、Birkin、ロレックス...）',
    search_button: '検索',
    stat_stores: 'グローバルストア',
    stat_products: '高級品製品',
    stat_reviews: '実際のレビュー',
    stat_trust: '販売者信頼評価',
    features_title: '主な機能',
    feature_price_title: 'リアルタイム価格比較',
    feature_price_desc: '世界中の高級品店の価格を比較し、最安値を見つけます。',
    feature_seller_title: '認証された販売者',
    feature_seller_desc: 'A-D信頼評価システムで安全な購入を保証します。',
    feature_review_title: 'ユーザーレビュー',
    feature_review_desc: '実際の購入者の正直なレビューで賢い選択をしてください。',
    feature_auth_title: '認証ガイド',
    feature_auth_desc: '詳細なブランド固有の認証方法。',
    feature_trend_title: '価格トレンド分析',
    feature_trend_desc: '過去の価格を分析して最適な購入時期を見つけます。',
    feature_global_title: 'グローバルショッピングサポート',
    feature_global_desc: '関税情報を含む国際ショッピングガイド。',
    popular_brands: '人気ブランド',
    best_deals: 'ベストディール',
    footer_copyright: '© 2024 Luxury Review Hub. 全著作権所有。',
    footer_tagline: 'グローバル高級品ショッピングの新基準',
    enter_keyword: '検索キーワードを入力してください'
  },
  vi: {
    hero_title: 'Mua sắm hàng xa xỉ thông minh hơn',
    hero_subtitle: 'So sánh giá thời gian thực · Đánh giá đã xác minh · Hướng dẫn xác thực',
    hero_description: 'Từ Hermès đến Rolex, Hoàn thiện việc mua sắm hàng xa xỉ của bạn',
    search_placeholder: 'Tìm kiếm thương hiệu hoặc sản phẩm (ví dụ: HERMES, Birkin, Rolex...)',
    search_button: 'Tìm kiếm',
    stat_stores: 'Cửa hàng toàn cầu',
    stat_products: 'Sản phẩm xa xỉ',
    stat_reviews: 'Đánh giá thực tế',
    stat_trust: 'Xếp hạng tin cậy người bán',
    features_title: 'Tính năng chính',
    feature_price_title: 'So sánh giá thời gian thực',
    feature_price_desc: 'So sánh giá từ các cửa hàng xa xỉ trên toàn thế giới và tìm ưu đãi tốt nhất.',
    feature_seller_title: 'Người bán đã xác minh',
    feature_seller_desc: 'Hệ thống xếp hạng tin cậy A-D đảm bảo mua hàng an toàn.',
    feature_review_title: 'Đánh giá người dùng',
    feature_review_desc: 'Đưa ra lựa chọn thông minh với đánh giá trung thực từ người mua thực tế.',
    feature_auth_title: 'Hướng dẫn xác thực',
    feature_auth_desc: 'Phương pháp xác thực chi tiết theo thương hiệu.',
    feature_trend_title: 'Phân tích xu hướng giá',
    feature_trend_desc: 'Phân tích giá lịch sử để tìm thời điểm mua tốt nhất.',
    feature_global_title: 'Hỗ trợ mua sắm toàn cầu',
    feature_global_desc: 'Hướng dẫn mua sắm quốc tế với thông tin hải quan.',
    popular_brands: 'Thương hiệu phổ biến',
    best_deals: 'Ưu đãi tốt nhất',
    footer_copyright: '© 2024 Luxury Review Hub. Đã đăng ký bản quyền.',
    footer_tagline: 'Tiêu chuẩn mới cho mua sắm hàng xa xỉ toàn cầu',
    enter_keyword: 'Vui lòng nhập từ khóa tìm kiếm'
  },
  mn: {
    hero_title: 'Дэлхийн тансаг бараа, хамгийн ухаалаг худалдан авалт',
    hero_subtitle: 'Бодит цагийн үнийн харьцуулалт · Баталгаажсан сэтгэгдэл · Баталгаажуулах заавар',
    hero_description: 'Hermès-ээс Rolex хүртэл, Таны тансаг худалдан авалтыг төгс болго',
    search_placeholder: 'Брэнд эсвэл бүтээгдэхүүн хайх (жишээ нь: HERMES, Birkin, Rolex...)',
    search_button: 'Хайх',
    stat_stores: 'Дэлхийн дэлгүүрүүд',
    stat_products: 'Тансаг бүтээгдэхүүнүүд',
    stat_reviews: 'Бодит сэтгэгдэл',
    stat_trust: 'Худалдагчийн итгэлцлийн үнэлгээ',
    features_title: 'Гол онцлог',
    feature_price_title: 'Бодит цагийн үнийн харьцуулалт',
    feature_price_desc: 'Дэлхийн тансаг дэлгүүрүүдийн үнийг харьцуулж, хамгийн сайн үнийг олоорой.',
    feature_seller_title: 'Баталгаажсан худалдагчид',
    feature_seller_desc: 'A-D итгэлцлийн үнэлгээний систем нь аюулгүй худалдан авалтыг баталгаажуулна.',
    feature_review_title: 'Хэрэглэгчийн сэтгэгдэл',
    feature_review_desc: 'Жинхэнэ худалдан авагчдын үнэнч сэтгэгдлээр ухаалаг сонголт хийгээрэй.',
    feature_auth_title: 'Баталгаажуулах заавар',
    feature_auth_desc: 'Брэндийн тусгай баталгаажуулах аргууд.',
    feature_trend_title: 'Үнийн чиг хандлагын шинжилгээ',
    feature_trend_desc: 'Түүхэн үнийг шинжлэн худалдан авах хамгийн сайн цагийг олоорой.',
    feature_global_title: 'Дэлхийн худалдан авалтын дэмжлэг',
    feature_global_desc: 'Гаалийн мэдээлэл бүхий олон улсын худалдан авалтын заавар.',
    popular_brands: 'Алдартай брэндүүд',
    best_deals: 'Хамгийн сайн үнэ',
    footer_copyright: '© 2024 Luxury Review Hub. Бүх эрх хуулиар хамгаалагдсан.',
    footer_tagline: 'Дэлхийн тансаг худалдан авалтын шинэ стандарт',
    enter_keyword: 'Хайлтын түлхүүр үг оруулна уу'
  },
  ru: {
    hero_title: 'Покупайте роскошь умнее по всему миру',
    hero_subtitle: 'Сравнение цен в реальном времени · Проверенные отзывы · Руководство по аутентификации',
    hero_description: 'От Hermès до Rolex, Совершенствуйте свои покупки роскоши',
    search_placeholder: 'Поиск брендов или товаров (например: HERMES, Birkin, Rolex...)',
    search_button: 'Поиск',
    stat_stores: 'Глобальные магазины',
    stat_products: 'Роскошные товары',
    stat_reviews: 'Реальные отзывы',
    stat_trust: 'Рейтинг доверия продавцов',
    features_title: 'Ключевые функции',
    feature_price_title: 'Сравнение цен в реальном времени',
    feature_price_desc: 'Сравнивайте цены роскошных магазинов по всему миру и находите лучшие предложения.',
    feature_seller_title: 'Проверенные продавцы',
    feature_seller_desc: 'Система рейтинга доверия A-D обеспечивает безопасные покупки.',
    feature_review_title: 'Отзывы пользователей',
    feature_review_desc: 'Делайте умный выбор с честными отзывами от реальных покупателей.',
    feature_auth_title: 'Руководство по аутентификации',
    feature_auth_desc: 'Подробные методы аутентификации для конкретных брендов.',
    feature_trend_title: 'Анализ ценовых трендов',
    feature_trend_desc: 'Анализируйте исторические цены, чтобы найти лучшее время для покупки.',
    feature_global_title: 'Поддержка глобальных покупок',
    feature_global_desc: 'Руководство по международным покупкам с таможенной информацией.',
    popular_brands: 'Популярные бренды',
    best_deals: 'Лучшие предложения',
    footer_copyright: '© 2024 Luxury Review Hub. Все права защищены.',
    footer_tagline: 'Новый стандарт глобального шопинга роскоши',
    enter_keyword: 'Пожалуйста, введите ключевое слово для поиска'
  }
};

// 현재 언어 (LocalStorage에서 가져오기)
let currentLang = localStorage.getItem('lang') || 'ko';

// 번역 함수
function t(key) {
  return translations[currentLang]?.[key] || translations['ko'][key] || key;
}

// 언어 변경 함수
function changeLang(lang) {
  localStorage.setItem('lang', lang);
  window.location.reload();
}

// 드롭다운 토글 함수
function toggleLangMenu() {
  const langMenu = document.getElementById('langMenu');
  if (langMenu) {
    langMenu.classList.toggle('show');
  }
}

// 언어 선택기 HTML 생성
function getLangSelectorHTML() {
  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'mn', name: 'Монгол', flag: '🇲🇳' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];
  
  const currentLangData = languages.find(l => l.code === currentLang);
  
  return `
    <div class="lang-container">
      <button id="langBtn" class="lang-btn" type="button" onclick="window.toggleLangMenu(); return false;">
        <i class="fas fa-globe"></i>
        <span class="font-bold">${currentLangData.flag} ${currentLangData.name}</span>
        <i class="fas fa-chevron-down text-xs"></i>
      </button>
      <div id="langMenu" class="lang-menu">
        ${languages.map(lang => `
          <button 
            type="button"
            onclick="window.changeLang('${lang.code}'); return false;" 
            class="lang-option ${lang.code === currentLang ? 'active' : ''}">
            <span class="text-xl mr-2">${lang.flag}</span>
            <span class="text-sm">${lang.name}</span>
            ${lang.code === currentLang ? '<i class="fas fa-check text-purple-600 ml-auto text-sm"></i>' : ''}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// 언어 선택기 초기화 (외부 클릭 처리)
function initLangSelector() {
  setTimeout(function() {
    const langMenu = document.getElementById('langMenu');
    const langBtn = document.getElementById('langBtn');
    
    if (!langMenu || !langBtn) return;
    
    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', function(e) {
      if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove('show');
      }
    });
    
    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        langMenu.classList.remove('show');
      }
    });
  }, 100);
}

// 전역 스코프에 함수 노출
window.t = t;
window.changeLang = changeLang;
window.toggleLangMenu = toggleLangMenu;
window.getLangSelectorHTML = getLangSelectorHTML;
window.initLangSelector = initLangSelector;
