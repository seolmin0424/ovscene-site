/* ==========================================================
   OVSCENE — 데이터 정의
   모먼트 / 취향 축 / 진단 문항 / 스타일 / 제품
   ========================================================== */
window.OVS = window.OVS || {};

/* ---------- 모먼트: 상황 · 기분 ---------- */
OVS.MOMENTS = [
  { id: "rest", ko: "퇴근 후 휴식", en: "After Work", kind: "daily",
    line: "오늘 하루를 여기서 내려놓기",
    desc: "천장등을 끄고 낮은 빛 하나만 남기는 저녁. 몸에서 힘을 빼는 데 필요한 것들.",
    cats: ["조명", "향", "패브릭"], style: "eco" },
  { id: "focus", ko: "집중", en: "Deep Focus", kind: "daily",
    line: "시야에서 잡음을 걷어내기",
    desc: "책상 위 시선이 닿는 범위만 정리합니다. 빛은 위가 아니라 손끝으로.",
    cats: ["조명", "오브제", "사운드"], style: "modern" },
  { id: "refresh", ko: "기분전환", en: "Reset", kind: "daily",
    line: "가구를 안 옮기고 방을 바꾸기",
    desc: "가장 자주 보는 벽 한 면과 색 하나만 바꿉니다. 가장 적은 비용으로 가장 큰 인상 변화.",
    cats: ["오브제", "패브릭", "향"], style: "kitsch" },
  { id: "drink", ko: "혼술", en: "Alone, A Drink", kind: "daily",
    line: "잔과 빛과 소리를 갖추기",
    desc: "혼자 마시는 한 잔을 대충 마시지 않기 위한 구성. 잔, 트레이, 낮은 조도, 소리.",
    cats: ["식기·잔", "조명", "사운드"], style: "vintage" },
  { id: "morning", ko: "주말 아침", en: "Slow Morning", kind: "daily",
    line: "일어나서 처음 닿는 것들",
    desc: "커튼을 열고 물을 끓이는 20분. 손이 닿는 순서대로 놓아둡니다.",
    cats: ["식기·잔", "패브릭", "오브제"], style: "eco" },

  { id: "exam", ko: "시험 끝난 날", en: "It's Over", kind: "special",
    line: "끝낸 나에게 주는 것",
    desc: "다음 일정을 생각하지 않아도 되는 하루. 실용성은 잠시 빼두고 고릅니다.",
    cats: ["향", "식기·잔", "도서"], style: "vintage" },
  { id: "rain", ko: "비 오는 날 저녁", en: "Rainy Evening", kind: "special",
    line: "밖에 안 나가도 되는 밤",
    desc: "창밖 소리가 배경이 되는 저녁. 읽을 것, 마실 것, 낮은 조도.",
    cats: ["도서", "조명", "향"], style: "vintage" },
  { id: "month", ko: "새로운 한 달", en: "New Month", kind: "special",
    line: "1일에 방부터 바꾸기",
    desc: "달이 바뀔 때 방도 한 칸 바꿔봅니다. 다짐보다 배치를 먼저.",
    cats: ["오브제", "향", "패브릭"], style: "modern" }
];

/* ---------- 스타일(취향 프로필의 결과 라벨) ---------- */
OVS.STYLES = [
  { id: "modern", ko: "모던", en: "Modern", c: ["#2E2E2C", "#9BA0A6", "#E3E2DE", "#FFFFFF"], line: "#2E2E2C",
    kw: "Matte · Steel · White",
    desc: "군더더기 없는 면과 무채색. 각진 실루엣과 무광 마감으로 방의 소음을 줄입니다." },
  { id: "vintage", ko: "빈티지", en: "Vintage", c: ["#6E4526", "#B4813F", "#D9C29A", "#EFE3CA"], line: "#5A381E",
    kw: "Walnut · Brass · Amber glass",
    desc: "원목과 황동, 흐린 유리. 시간이 묻은 물건들로 방에 밀도를 더합니다." },
  { id: "kitsch", ko: "키치", en: "Kitsch", c: ["#E4482E", "#F5B301", "#2F6BE0", "#EA6BA6"], line: "#22201E",
    kw: "Primary · Gloss · Oversized",
    desc: "원색과 유광, 과장된 형태. 하나만 놓아도 방의 표정이 완전히 바뀝니다." },
  { id: "eco", ko: "에코", en: "Eco", c: ["#5F7048", "#94A57C", "#C8CBB2", "#E6E2D2"], line: "#3E4A31",
    kw: "Linen · Rattan · Clay",
    desc: "리넨과 라탄, 무유약 도기. 손이 닿는 곳마다 질감이 남는 소재 위주입니다." },
  { id: "metallic", ko: "메탈릭", en: "Metallic", c: ["#7C828A", "#AEB4BA", "#C9A25F", "#E7E9EB"], line: "#3C4046",
    kw: "Chrome · Brass · Mirror",
    desc: "크롬과 황동, 거울면. 좁은 방에서 빛을 한 번 더 튕겨 공간을 넓혀 보이게 합니다." }
];

/* ---------- 취향 프로필 6축 ---------- */
OVS.AXES = [
  { id: "color",    ko: "색상",   left: "무채색",   right: "원색" },
  { id: "material", ko: "소재",   left: "매끈함",   right: "거친 질감" },
  { id: "light",    ko: "조명",   left: "밝고 시원", right: "낮고 따뜻" },
  { id: "scent",    ko: "향",     left: "시트러스", right: "우디" },
  { id: "style",    ko: "스타일", left: "미니멀",   right: "맥시멀" },
  { id: "budget",   ko: "가격대", left: "실용",     right: "소장" }
];

/* 축 값(0~100)을 사람이 읽는 말로 */
OVS.axisWord = function (id, v) {
  var w = {
    color:    ["거의 무채색", "무채색에 한 톤", "중간 채도", "색을 즐기는 편", "원색 선호"],
    material: ["매끈한 마감", "매끈함에 가까움", "섞어 쓰는 편", "질감 있는 편", "손맛 나는 질감"],
    light:    ["밝고 시원한 빛", "다소 밝은 편", "상황에 따라", "낮고 따뜻한 편", "아주 낮은 조도"],
    scent:    ["시트러스·클린", "가벼운 향", "무향에 가까움", "우디한 편", "짙은 우디·스모키"],
    style:    ["철저한 미니멀", "여백이 많은 편", "적당히 채움", "채우는 편", "맥시멀"],
    budget:   ["실용 우선", "가성비 중시", "균형", "좋은 걸 오래", "소장 가치 우선"]
  }[id];
  return w[Math.min(4, Math.floor(v / 20))];
};

/* ---------- 진단 문항 ---------- */
OVS.QUESTIONS = [
  { q: "지금 방에서 가장 마음에 드는 건 무엇인가요?", hint: "하나만 고르셔도 됩니다",
    opts: [
      { t: "빛이 드는 각도", s: "창가 자리가 제일 좋아요", d: { light: -18, style: -8 } },
      { t: "나무 가구의 색", s: "손에 닿는 질감이 좋아요", d: { material: 20, color: -6 } },
      { t: "모아둔 물건들", s: "하나씩 늘어나는 게 좋아요", d: { style: 22, color: 10 } },
      { t: "아무것도 없는 벽", s: "비어 있어야 편해요", d: { style: -24, color: -14 } }
    ] },
  { q: "손이 먼저 가는 소재는?", hint: "만졌을 때 기분이 좋은 쪽",
    opts: [
      { t: "리넨 · 라탄", s: "성기고 자연스러운", d: { material: 24, color: -6 } },
      { t: "유리 · 스테인리스", s: "차갑고 매끈한", d: { material: -24, light: -10 } },
      { t: "원목", s: "따뜻하고 무거운", d: { material: 14, light: 12 } },
      { t: "무유약 도기", s: "거칠고 두꺼운", d: { material: 20, style: 6 } }
    ] },
  { q: "밤에 방에서 켜두는 불빛은?", hint: "잠들기 한 시간 전 기준",
    opts: [
      { t: "천장등 그대로", s: "밝은 게 편해요", d: { light: -26 } },
      { t: "스탠드 하나", s: "한 곳만 밝히는", d: { light: 16 } },
      { t: "캔들 · 무드등", s: "거의 어둡게", d: { light: 26, scent: 12 } },
      { t: "아무것도 안 켬", s: "그냥 자요", d: { light: 6, budget: -12 } }
    ] },
  { q: "방에서 나면 좋을 냄새는?", hint: "문을 열었을 때",
    opts: [
      { t: "갓 세탁한 냄새", s: "리넨 · 머스크", d: { scent: -14, material: 8 } },
      { t: "나무 · 연기", s: "우디 · 스모키", d: { scent: 26, light: 10 } },
      { t: "시트러스", s: "베르가못 · 레몬", d: { scent: -26 } },
      { t: "아무 냄새도 안 났으면", s: "무향이 제일 좋아요", d: { scent: 0, style: -10 } }
    ] },
  { q: "물건이 하나씩 늘어나는 건?", hint: "솔직하게",
    opts: [
      { t: "좋아요, 방이 채워지는 느낌", s: "", d: { style: 26, budget: 10 } },
      { t: "필요한 것만 있으면 돼요", s: "", d: { style: -20, budget: -10 } },
      { t: "예쁘면 늘어나도 괜찮아요", s: "", d: { style: 14, color: 12, budget: 14 } },
      { t: "부담스러워요, 정리가 안 돼서", s: "", d: { style: -26 } }
    ] },
  { q: "한 달에 나를 위해 쓸 수 있는 돈은?", hint: "생활비 말고, 기분을 위한 돈",
    opts: [
      { t: "2만원 정도", s: "작은 것 하나", d: { budget: -26 } },
      { t: "5만원 정도", s: "제대로 된 것 하나", d: { budget: -4 } },
      { t: "10만원 정도", s: "오래 쓸 것 하나", d: { budget: 20 } },
      { t: "금액보다 마음에 드는지", s: "", d: { budget: 30, style: 8 } }
    ] }
];

/* ---------- 제품 ---------- */
OVS.PRODUCTS = [
  { id: "globe-amber", name: "앰버 글로브 무드등", cat: "조명", price: 68000, type: "globe",
    moments: ["rest", "drink", "rain"], styles: ["vintage", "eco"],
    desc: "2700K 앰버 유리 글로브. 천장등을 끄고 이것만 켜도 방의 온도가 내려갑니다.",
    spec: { "소재": "유리 · 원목 베이스", "크기": "지름 14cm", "색온도": "2700K 앰버", "전원": "USB-C 충전 · 8시간" },
    why: "낮고 따뜻한 조도를 선호하는 프로필에서 가장 먼저 추천되는 품목입니다." },
  { id: "clip-lamp", name: "클립 리딩 램프", cat: "조명", price: 42000, type: "lampshade",
    moments: ["focus", "rain"], styles: ["modern", "metallic"],
    desc: "선반이든 침대 헤드든 물리는 곳이면 켜지는 집중광 램프. 각도 조절 180도.",
    spec: { "소재": "알루미늄", "크기": "높이 22cm", "색온도": "4000K 조절 3단", "전원": "USB-C 상시" },
    why: "책상 위 시야를 좁히는 데 쓰는 조명입니다. 집중 모먼트의 기본 구성." },
  { id: "woodwick", name: "우드윅 캔들 60g", cat: "향", price: 28000, type: "candle",
    moments: ["rest", "rain", "month"], styles: ["vintage", "eco"],
    desc: "좁은 방을 기준으로 발향을 낮춘 60g. 심지가 타는 소리가 함께 납니다.",
    spec: { "용량": "60g · 약 15시간", "향": "샌달우드 · 시더", "소재": "소이 왁스", "심지": "우드윅" },
    why: "우디 계열을 선호하고 조도가 낮은 방에 맞춘 발향 강도입니다." },
  { id: "linen-mist", name: "리넨 룸 스프레이", cat: "향", price: 24000, type: "bottle",
    moments: ["morning", "refresh"], styles: ["eco", "modern"],
    desc: "침구와 커튼에 뿌리는 미스트. 아침에 창을 열면서 한 번.",
    spec: { "용량": "100ml", "향": "코튼 · 화이트머스크", "사용": "패브릭 전용", "원산지": "국내 제조" },
    why: "시트러스·클린 계열 취향에서 가장 실패가 적은 입문 품목입니다." },
  { id: "linen-cushion", name: "워시드 리넨 쿠션 커버", cat: "패브릭", price: 39000, type: "cushion",
    moments: ["rest", "morning"], styles: ["eco"],
    desc: "여러 번 빤 것처럼 처리한 리넨. 45×45 규격이라 기본 속통에 그대로 들어갑니다.",
    spec: { "소재": "리넨 100%", "크기": "45 × 45cm", "세탁": "찬물 기계세탁", "색상": "오트 · 모스" },
    why: "질감 있는 소재를 선호하는 프로필의 기본 패브릭." },
  { id: "rattan-tray", name: "라탄 사이드 트레이", cat: "오브제", price: 34000, type: "tray",
    moments: ["drink", "morning"], styles: ["eco", "vintage"],
    desc: "잔과 작은 접시가 함께 올라가는 크기. 자리를 정해주는 역할을 합니다.",
    spec: { "소재": "라탄 · 원목 프레임", "크기": "32 × 22cm", "무게": "340g", "관리": "마른 천" },
    why: "물건의 자리를 정하는 도구. 정리가 어렵다고 답한 프로필에 우선 배치됩니다." },
  { id: "glass-2p", name: "두꺼운 유리 텀블러 2P", cat: "식기·잔", price: 26000, type: "glass",
    moments: ["drink", "morning"], styles: ["modern", "metallic"],
    desc: "손에 쥐는 무게가 있는 두께. 뜨거운 것과 찬 것 모두 가능합니다.",
    spec: { "소재": "내열 유리", "용량": "300ml × 2", "내열": "-20 ~ 120℃", "식기세척기": "가능" },
    why: "매끈한 마감을 선호하는 프로필에서 사용 빈도가 가장 높은 품목." },
  { id: "matte-mug", name: "무광 세라믹 머그", cat: "식기·잔", price: 22000, type: "mug",
    moments: ["morning", "focus"], styles: ["modern", "eco"],
    desc: "겉은 무광, 안쪽만 유약. 책상에 하루 종일 두어도 눈에 걸리지 않는 색.",
    spec: { "소재": "석기질 도자", "용량": "320ml", "전자레인지": "가능", "색상": "그레이 · 오트" },
    why: "무채색 선호도가 높은 프로필의 기본 잔." },
  { id: "oak-stool", name: "오크 라운드 스툴", cat: "가구", price: 118000, type: "stool",
    moments: ["rest", "refresh"], styles: ["eco", "vintage"],
    desc: "앉는 자리이자 사이드 테이블. 침대 옆 1미터를 정리하는 가장 빠른 방법.",
    spec: { "소재": "오크 원목", "크기": "지름 34 · 높이 44cm", "하중": "120kg", "조립": "다리 4개 · 10분" },
    why: "가구를 옮기지 않고 배치를 바꾸고 싶을 때 추천되는 소형 가구." },
  { id: "steel-shelf", name: "스틸 월 셀프", cat: "가구", price: 76000, type: "shelf",
    moments: ["focus", "refresh"], styles: ["modern", "metallic"],
    desc: "벽 한 면만 쓰는 얇은 선반. 시선이 가는 높이에 물건 세 개만 올립니다.",
    spec: { "소재": "분체도장 스틸", "크기": "60 × 14cm", "하중": "8kg", "설치": "앵커 2개 포함" },
    why: "미니멀 성향에서 수납을 늘리지 않고 정리하는 방식으로 제안됩니다." },
  { id: "bud-vase", name: "드라이플라워 버드 베이스", cat: "오브제", price: 32000, type: "vase",
    moments: ["month", "refresh"], styles: ["eco", "vintage"],
    desc: "한 줄기만 꽂는 좁은 목. 드라이플라워 한 대와 함께 배송됩니다.",
    spec: { "소재": "유리 · 무유약 도기 택1", "크기": "높이 16cm", "구성": "베이스 + 드라이 1대", "관리": "물 없이" },
    why: "가장 적은 비용으로 방의 인상을 바꾸는 품목으로 분류됩니다." },
  { id: "art-print", name: "아트 프린트 + 원목 액자", cat: "오브제", price: 46000, type: "frame",
    moments: ["month", "refresh"], styles: ["vintage", "modern"],
    desc: "A4 프린트와 원목 프레임. 벽 한 면을 바꾸는 가장 저렴한 방법입니다.",
    spec: { "크기": "A4 · 프레임 포함", "소재": "오크 프레임 · 무광지", "설치": "못 · 무타공 훅 포함", "선택": "프린트 6종" },
    why: "가장 자주 보는 벽 한 면을 바꾸는 기분전환 모먼트의 대표 품목." },
  { id: "mini-speaker", name: "미니 블루투스 스피커", cat: "사운드", price: 89000, type: "speaker",
    moments: ["drink", "focus", "morning"], styles: ["modern", "metallic"],
    desc: "손바닥 크기, 12시간 재생. 방 하나를 채우기에 충분한 출력입니다.",
    spec: { "출력": "10W", "재생": "최대 12시간", "연결": "Bluetooth 5.3", "방수": "IPX5" },
    why: "혼술 · 집중 모먼트에서 조명 다음으로 만족도가 높은 품목입니다." },
  { id: "essay-set", name: "독립출판 에세이 3권", cat: "도서", price: 42000, type: "book",
    moments: ["rain", "exam"], styles: ["vintage", "eco"],
    desc: "직접 검색하지 않았을 소규모 출판사 셀렉트. 매달 구성이 바뀝니다.",
    spec: { "구성": "도서 3권", "형태": "문고 · 반양장 혼합", "선정": "월간 셀렉트", "비고": "구성 랜덤" },
    why: "혼자 보내는 저녁 시간이 긴 프로필에 우선 추천됩니다." },
  { id: "clay-planter", name: "무유약 도기 플랜터", cat: "오브제", price: 29000, type: "plant",
    moments: ["morning", "refresh"], styles: ["eco"],
    desc: "유약을 바르지 않아 흙 냄새가 남는 화분. 소품 식물 한 포트와 함께.",
    spec: { "소재": "무유약 도기", "크기": "지름 12 · 높이 11cm", "구성": "화분 + 받침 + 식물", "배수": "구멍 있음" },
    why: "질감을 선호하는 프로필에서 관리 부담이 가장 적은 자연 요소." },
  { id: "linen-rug", name: "리넨 워시드 러그", cat: "패브릭", price: 88000, type: "rug",
    moments: ["rest", "morning"], styles: ["eco", "modern"],
    desc: "침대에서 내려올 때 발이 처음 닿는 자리. 세탁기에 그대로 들어갑니다.",
    spec: { "소재": "리넨 혼방", "크기": "70 × 120cm", "두께": "6mm", "세탁": "기계세탁 가능" },
    why: "아침 동선을 바꾸는 품목으로 주말 아침 모먼트에 배치됩니다." },
  { id: "whisky-set", name: "위스키 글라스 + 아이스볼", cat: "식기·잔", price: 54000, type: "glass",
    moments: ["drink", "exam"], styles: ["vintage", "metallic"],
    desc: "잔 하나와 실리콘 아이스볼 몰드. 혼자 마시는 한 잔을 대충 마시지 않기 위한 구성.",
    spec: { "구성": "글라스 1 · 몰드 1", "용량": "300ml", "소재": "무연 크리스탈", "몰드": "지름 6cm 구형" },
    why: "혼술 모먼트에서 만족도 1위 구성. 소장 성향 프로필에 우선 노출됩니다." },
  { id: "mood-clock", name: "타이머 · 무드 클락", cat: "오브제", price: 58000, type: "clock",
    moments: ["focus", "month"], styles: ["modern"],
    desc: "뒤집으면 25분 타이머가 시작됩니다. 알람은 소리 대신 빛으로.",
    spec: { "기능": "시계 · 뒤집기 타이머", "크기": "9 × 9cm", "알림": "무음 · 빛", "전원": "USB-C 충전" },
    why: "집중 모먼트에서 소리에 방해받고 싶지 않은 프로필에 제안됩니다." }
];

/* ---------- 큐레이션 박스 (선택 구매) ---------- */
OVS.BOXES = [
  { id: "box-rest", name: "모먼트 박스 · 퇴근 후 휴식", cat: "큐레이션 박스", price: 79000, type: "globe",
    moments: ["rest"], styles: ["eco", "vintage"], random: true,
    desc: "조명 · 향 · 마실 것 · 읽을 것 네 가지가 들어갑니다. 개별 품목은 매번 달라집니다.",
    spec: { "구성": "4점", "품목": "조명 · 향 · 음료 · 도서", "구성 방식": "취향 프로필 기반 랜덤", "배송": "단건 · 정기 아님" },
    why: "무엇을 고를지 정하기 어려울 때. 프로필에서 제외 품목을 뺀 뒤 추첨합니다." },
  { id: "box-drink", name: "모먼트 박스 · 혼술", cat: "큐레이션 박스", price: 89000, type: "glass",
    moments: ["drink"], styles: ["vintage", "metallic"], random: true,
    desc: "잔 · 트레이 · 안주 도구 · 사운드 큐레이션. 개별 품목은 매번 달라집니다.",
    spec: { "구성": "4점", "품목": "잔 · 트레이 · 도구 · 플레이리스트", "구성 방식": "취향 프로필 기반 랜덤", "배송": "단건 · 정기 아님" },
    why: "혼술 모먼트를 한 번에 갖추고 싶을 때." },
  { id: "box-month", name: "모먼트 박스 · 새로운 한 달", cat: "큐레이션 박스", price: 99000, type: "frame",
    moments: ["month"], styles: ["modern", "vintage"], random: true,
    desc: "벽 · 향 · 패브릭을 한 번에 바꾸는 구성. 개별 품목은 매번 달라집니다.",
    spec: { "구성": "5점", "품목": "아트 · 향 · 패브릭 · 오브제", "구성 방식": "취향 프로필 기반 랜덤", "배송": "단건 · 정기 아님" },
    why: "달이 바뀔 때 방 전체 인상을 손보고 싶을 때." }
];

OVS.ALL_ITEMS = OVS.PRODUCTS.concat(OVS.BOXES);
OVS.CATS = ["전체", "조명", "향", "패브릭", "식기·잔", "오브제", "가구", "사운드", "도서", "큐레이션 박스"];
