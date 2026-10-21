type Locale = "vi" | "en"

/*
 * Peer theo năm sinh (chủ dự án chốt 21/10/2026). Mã Peer "1985 · 042" = năm 1985, số thứ tự 42 trong năm
 * (API lưu 19850042). Từ năm suy ra Can Chi, con giáp và mệnh (ngũ hành nạp âm, vòng 60 năm), mệnh quyết
 * định màu thẻ: 5 hành × dương (năm chẵn, đậm) / âm (năm lẻ, nhạt) = 10 màu.
 *
 * Hình con giáp: Microsoft Fluent Emoji "High Contrast" (MIT), trong `public/zodiac/`.
 * Cùng bảng với web đại lý (20142199-Mindo-Web src/lib/peer-menh.ts) và app.
 */

export const FIRST_PEER_YEAR = 1950
export const LAST_PEER_YEAR = 2030

export type Element = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]
const CHI_EN = ["Rat", "Buffalo", "Tiger", "Cat", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
const ZODIAC_FILE = ["rat", "water_buffalo", "tiger", "cat", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"]

/** 30 mệnh nạp âm, mỗi mệnh hai năm liền nhau, bắt đầu từ Giáp Tý (1984, 1985) */
const NAP_AM: Array<[vi: string, meaningVi: string, en: string, meaningEn: string]> = [
  ["Hải Trung Kim", "Vàng trong biển", "Sea Metal", "Gold in the sea"],
  ["Lô Trung Hỏa", "Lửa trong lò", "Furnace Fire", "Fire in the furnace"],
  ["Đại Lâm Mộc", "Gỗ rừng lớn", "Great Forest Wood", "Wood of the great forest"],
  ["Lộ Bàng Thổ", "Đất ven đường", "Roadside Earth", "Earth by the road"],
  ["Kiếm Phong Kim", "Vàng mũi kiếm", "Sword-edge Metal", "Metal of the sword's edge"],
  ["Sơn Đầu Hỏa", "Lửa đỉnh núi", "Mountain-top Fire", "Fire on the mountain top"],
  ["Giản Hạ Thủy", "Nước dưới khe", "Brook Water", "Water beneath the brook"],
  ["Thành Đầu Thổ", "Đất trên thành", "City-wall Earth", "Earth on the city wall"],
  ["Bạch Lạp Kim", "Vàng chân nến", "Candle-wax Metal", "Metal of the candlestick"],
  ["Dương Liễu Mộc", "Gỗ cây dương liễu", "Willow Wood", "Wood of the willow"],
  ["Tuyền Trung Thủy", "Nước trong suối", "Spring Water", "Water from the spring"],
  ["Ốc Thượng Thổ", "Đất trên mái nhà", "Rooftop Earth", "Earth on the roof"],
  ["Tích Lịch Hỏa", "Lửa sấm sét", "Thunderbolt Fire", "Fire of the thunderbolt"],
  ["Tùng Bách Mộc", "Gỗ tùng bách", "Pine Wood", "Wood of pine and cypress"],
  ["Trường Lưu Thủy", "Nước sông dài", "Long River Water", "Water of the long river"],
  ["Sa Trung Kim", "Vàng trong cát", "Sand Metal", "Gold in the sand"],
  ["Sơn Hạ Hỏa", "Lửa dưới chân núi", "Foothill Fire", "Fire at the foot of the mountain"],
  ["Bình Địa Mộc", "Gỗ đồng bằng", "Plains Wood", "Wood of the plains"],
  ["Bích Thượng Thổ", "Đất trên vách", "Wall Earth", "Earth on the wall"],
  ["Kim Bạch Kim", "Vàng pha bạch kim", "Gold-leaf Metal", "Gold blended with platinum"],
  ["Phú Đăng Hỏa", "Lửa ngọn đèn", "Lamp Fire", "Fire of the lamp"],
  ["Thiên Hà Thủy", "Nước sông Ngân Hà", "Milky Way Water", "Water of the Milky Way"],
  ["Đại Trạch Thổ", "Đất đầm lớn", "Great Marsh Earth", "Earth of the great marsh"],
  ["Thoa Xuyến Kim", "Vàng trang sức", "Jewellery Metal", "Gold of jewellery"],
  ["Tang Đố Mộc", "Gỗ cây dâu", "Mulberry Wood", "Wood of the mulberry"],
  ["Đại Khê Thủy", "Nước khe lớn", "Great Stream Water", "Water of the great stream"],
  ["Sa Trung Thổ", "Đất trong cát", "Sand Earth", "Earth in the sand"],
  ["Thiên Thượng Hỏa", "Lửa trên trời", "Heavenly Fire", "Fire in the sky"],
  ["Thạch Lựu Mộc", "Gỗ cây lựu", "Pomegranate Wood", "Wood of the pomegranate"],
  ["Đại Hải Thủy", "Nước biển lớn", "Great Sea Water", "Water of the great sea"],
]

const ELEMENT_EN: Record<Element, string> = { Kim: "Metal", Mộc: "Wood", Thủy: "Water", Hỏa: "Fire", Thổ: "Earth" }

/** Màu thẻ: [nhạt, đậm] cho dương (năm chẵn) và âm (năm lẻ) của mỗi hành */
const ELEMENT_COLOURS: Record<Element, { duong: [string, string]; am: [string, string] }> = {
  Kim: { duong: ["#7b8aa0", "#4d5b6e"], am: ["#aab6c6", "#7d8ba0"] },
  Mộc: { duong: ["#2a9a5f", "#0f6b40"], am: ["#62c48a", "#2e9a62"] },
  Thủy: { duong: ["#24509e", "#0f2a5e"], am: ["#4f86d6", "#2556a8"] },
  Hỏa: { duong: ["#d9362b", "#a8171a"], am: ["#f2734e", "#d9412f"] },
  Thổ: { duong: ["#ad7a17", "#7f5208"], am: ["#d9a843", "#b47f1d"] },
}

const mod = (n: number, m: number) => ((n % m) + m) % m

export type PeerYear = {
  year: number
  /** "Ất Sửu" / "Year of the Buffalo" */
  canChi: string
  /** Dòng ngắn trên thẻ: "Ất Sửu" / "Buffalo" (không ghép hành của Can vào con giáp kiểu "Metal Ox":
   *  hành đó khác mệnh nạp âm in ngay dưới) */
  short: string
  /** Con giáp: "Sửu" / "Buffalo" */
  animal: string
  /** `/zodiac/water_buffalo.svg` */
  animalSrc: string
  element: Element
  /** "Kim" / "Metal" */
  elementName: string
  /** "Hải Trung Kim" / "Sea Metal (Hải Trung Kim)" */
  napAm: string
  /** "Vàng trong biển" / "Gold in the sea" */
  meaning: string
  /** Dương: năm chẵn (màu đậm). Âm: năm lẻ (màu nhạt) */
  duong: boolean
  /** Nền thẻ: từ nhạt (trên trái) sang đậm */
  background: string
  /** Màu đậm của thẻ, cho chấm màu nhỏ */
  colour: string
}

export function peerYear(year: number, locale: Locale = "vi"): PeerYear {
  const k = mod(year - 4, 60)
  const [napVi, meaningVi, napEn, meaningEn] = NAP_AM[Math.floor(k / 2)]
  const element = napVi.split(" ").at(-1) as Element
  const duong = mod(year - 4, 2) === 0
  const [light, dark] = ELEMENT_COLOURS[element][duong ? "duong" : "am"]
  const can = mod(year - 4, 10)
  const chi = mod(year - 4, 12)
  const en = locale === "en"
  return {
    year,
    canChi: en ? `Year of the ${CHI_EN[chi]}` : `${CAN[can]} ${CHI[chi]}`,
    short: en ? CHI_EN[chi] : `${CAN[can]} ${CHI[chi]}`,
    animal: en ? CHI_EN[chi] : CHI[chi],
    animalSrc: `/zodiac/${ZODIAC_FILE[chi]}.svg`,
    element,
    elementName: en ? ELEMENT_EN[element] : element,
    napAm: en ? `${napEn} (${napVi})` : napVi,
    meaning: en ? meaningEn : meaningVi,
    duong,
    background: `linear-gradient(160deg, ${light}, ${dark})`,
    colour: dark,
  }
}

/**
 * Đọc mã Peer: "1985 · 042" → { year: 1985, sequence: 42 }. Mã cũ ("#0052") hay mã lạ → year null.
 */
export function parsePeerCode(code: string): { year: number | null; sequence: number | null } {
  const m = code.trim().match(/^(\d{4})\s*·\s*(\d{1,4})$/)
  if (m) {
    const year = Number(m[1])
    if (year >= FIRST_PEER_YEAR && year <= LAST_PEER_YEAR) return { year, sequence: Number(m[2]) }
  }
  const legacy = code.trim().match(/^#?(\d+)$/)
  return { year: null, sequence: legacy ? Number(legacy[1]) : null }
}

/** `NftAsset.serialNumber` → mã hiển thị: 19850042 → "1985 · 042"; số cũ 52 → "#0052" */
export function peerCodeFromSerial(serialNumber: number) {
  const year = Math.floor(serialNumber / 10_000)
  if (year >= FIRST_PEER_YEAR && year <= LAST_PEER_YEAR) return `${year} · ${String(serialNumber % 10_000).padStart(3, "0")}`
  return `#${String(serialNumber).padStart(4, "0")}`
}
