-- 브랜드 샘플 데이터
INSERT OR IGNORE INTO brands (name, category, description, official_website) VALUES 
  ('HERMES', '지갑·가방', '1837년 설립된 프랑스 명품 브랜드. 버킨백, 켈리백으로 유명', 'https://www.hermes.com'),
  ('LOUIS VUITTON', '지갑·가방', '1854년 설립. LV 모노그램이 상징적인 프랑스 명품 브랜드', 'https://www.louisvuitton.com'),
  ('CHANEL', '지갑·가방·액세서리', '샤넬 클래식 플랩백, 샤넬 No.5 향수로 유명한 프랑스 명품', 'https://www.chanel.com'),
  ('GUCCI', '지갑·가방·구두', '1921년 이탈리아 피렌체에서 시작. GG 로고로 유명', 'https://www.gucci.com'),
  ('PRADA', '지갑·가방·구두', '이탈리아 밀라노 명품. 나일론 가방으로 유명', 'https://www.prada.com'),
  ('ROLEX', '시계', '스위스 럭셔리 시계 브랜드. 서브마리너, 데이토나 모델 유명', 'https://www.rolex.com'),
  ('OMEGA', '시계', '스위스 시계 브랜드. 스피드마스터, 시마스터 인기', 'https://www.omegawatches.com'),
  ('CARTIER', '시계·액세서리', '프랑스 주얼리 및 시계 명품. 러브 브레이슬릿 유명', 'https://www.cartier.com'),
  ('CHRISTIAN LOUBOUTIN', '구두', '레드 솔 힐로 유명한 프랑스 슈즈 브랜드', 'https://www.christianlouboutin.com'),
  ('BOTTEGA VENETA', '지갑·가방', '이탈리아 가죽 제품 명품. 인트레치아토 기법 유명', 'https://www.bottegaveneta.com');

-- 판매처 샘플 데이터
INSERT OR IGNORE INTO sellers (name, website, country, trust_rating, verified, notes) VALUES 
  ('신세계백화점', 'https://www.shinsegae.com', '한국', 'A', 1, '정품 보증, AS 완벽'),
  ('롯데백화점', 'https://www.lotteshopping.com', '한국', 'A', 1, '공식 수입원'),
  ('갤러리아백화점', 'https://www.galleria.co.kr', '한국', 'A', 1, 'VIP 서비스 우수'),
  ('Net-A-Porter', 'https://www.net-a-porter.com', '영국', 'A', 1, '글로벌 럭셔리 쇼핑몰'),
  ('MyTheresa', 'https://www.mytheresa.com', '독일', 'A', 1, '유럽 명품 직구'),
  ('SSENSE', 'https://www.ssense.com', '캐나다', 'A', 1, '디자이너 브랜드 특화'),
  ('Farfetch', 'https://www.farfetch.com', '영국', 'B', 1, '글로벌 부티크 연결'),
  ('트렌비', 'https://www.trenbe.com', '한국', 'B', 1, '명품 병행수입'),
  ('발란', 'https://www.balaan.co.kr', '한국', 'B', 1, '해외 직구 대행'),
  ('KREAM', 'https://kream.co.kr', '한국', 'B', 1, '리셀 플랫폼');

-- 제품 샘플 데이터
INSERT OR IGNORE INTO products (brand_id, model_name, category, description, official_price) VALUES 
  (1, 'Kelly 25', '가방', '에르메스 대표 핸드백. 25cm 사이즈', 15000000),
  (1, 'Birkin 30', '가방', '에르메스 버킨백 30cm', 18000000),
  (1, 'Constance 24', '가방', '에르메스 콘스탄스 크로스백', 12000000),
  (2, 'Neverfull MM', '가방', 'LV 네버풀 미디엄 토트백', 2100000),
  (2, 'Speedy 30', '가방', 'LV 스피디 30 보스턴백', 1800000),
  (3, 'Classic Flap Medium', '가방', '샤넬 클래식 플랩 미디엄', 11000000),
  (4, 'Marmont Small', '가방', '구찌 마몽 스몰 숄더백', 2400000),
  (5, 'Galleria Saffiano', '가방', '프라다 갤러리아 사피아노 가방', 3500000),
  (6, 'Submariner', '시계', '롤렉스 서브마리너 다이버 워치', 15000000),
  (7, 'Speedmaster', '시계', '오메가 스피드마스터 문워치', 8000000);

-- 가격 정보 샘플 데이터
INSERT OR IGNORE INTO price_records (product_id, seller_id, price, url, reported_by, verified) VALUES 
  (1, 1, 16500000, 'https://www.shinsegae.com/item/kelly25', '김철수', 1),
  (1, 4, 14200000, 'https://www.net-a-porter.com/kelly', '이영희', 1),
  (4, 2, 2050000, 'https://www.lotteshopping.com/neverfull', '박민수', 1),
  (4, 8, 1850000, 'https://www.trenbe.com/lv-neverfull', '정수진', 1),
  (6, 3, 10800000, 'https://www.galleria.co.kr/chanel-flap', '최지훈', 1),
  (9, 1, 15200000, 'https://www.shinsegae.com/rolex-sub', '강민지', 1),
  (10, 5, 7200000, 'https://www.mytheresa.com/omega', '윤서영', 1);

-- 리뷰 샘플 데이터
INSERT OR IGNORE INTO reviews (product_id, seller_id, rating, title, content, author_name, purchase_verified) VALUES 
  (4, 2, 5, 'LV 네버풀 정품 구매 후기', '롯데백화점에서 구매했습니다. 정품 보증서와 쇼핑백 모두 완벽하게 받았어요. 실용적이고 튼튼해서 매일 사용 중입니다!', '김민지', 1),
  (4, 8, 4, '트렌비 직구 후기', '백화점보다 20만원 저렴하게 샀어요. 배송은 2주 걸렸지만 정품이고 상태도 좋습니다. 가성비 최고!', '이서연', 1),
  (6, 3, 5, '샤넬 플랩백 드디어 구매!', '갤러리아 VIP 행사에서 구매했습니다. 꿈에 그리던 가방이라 너무 만족스러워요. 가격은 비싸지만 평생 쓸 수 있을 것 같아요.', '박지은', 1),
  (9, 1, 5, '롤렉스 서브마리너 정품 구매', '신세계에서 정식으로 구매했습니다. 대기 기간은 6개월이었지만 정품이고 AS 보증도 완벽합니다. 투자 가치도 있어요.', '최현우', 1),
  (1, 4, 4, 'Net-A-Porter 해외직구 경험', '영국에서 직구했는데 관세 포함해도 국내보다 200만원 저렴했어요. 배송은 1주일, 상태 완벽합니다!', '정다은', 1);

-- 구매 가이드 샘플 데이터
INSERT OR IGNORE INTO guides (brand_id, title, content, type) VALUES 
  (1, '에르메스 정품 인증 방법', '1. 각인 확인: 제조 연도와 장인 마크가 명확해야 함\n2. 스티칭: 완벽하게 일정한 간격과 깔끔한 마무리\n3. 가죽 냄새: 천연 가죽 특유의 향\n4. 하드웨어: 무게감 있고 광택이 균일\n5. 정품 영수증과 더스트백 확인', 'authentication'),
  (2, 'LV 가방 구매 가이드', '1. 첫 명품 추천: 네버풀 또는 스피디\n2. 가격대: 180만원~250만원\n3. 구매처: 백화점 또는 공식 부티크\n4. 병행수입 주의: 반드시 영수증 확인\n5. 리셀 시 가치: 70-80% 유지', 'buying-tip'),
  (3, '샤넬 백 사이즈 가이드', '미니: 17cm (파티용)\n스몰: 20cm (데일리, 크로스백)\n미디엄: 25.5cm (가장 인기, 실용적)\n라지: 30cm (여행용, 수납공간 많음)\n\n추천: 첫 구매는 미디엄 사이즈!', 'sizing'),
  (4, '구찌 제품 관리 방법', '1. 가죽 제품: 전용 크림으로 월 1회 관리\n2. 캔버스: 부드러운 천으로 닦기\n3. 보관: 더스트백에 넣어 서늘한 곳\n4. 습기 주의: 제습제 사용\n5. 직사광선 피하기', 'care'),
  (6, '롤렉스 구매 전 체크리스트', '1. 정식 딜러에서 구매 (AS 보증)\n2. 대기 기간: 인기 모델 6개월~2년\n3. 병행수입 주의: 국내 AS 불가능\n4. 중고 구매시: 정품 감정 필수\n5. 투자 가치: 데이토나, 서브마리너 추천', 'buying-tip');
