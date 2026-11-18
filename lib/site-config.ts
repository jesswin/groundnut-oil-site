/**
 * ============================================================================
 *  SITE CONFIG: the single source of truth for ALL business info and content.
 * ============================================================================
 *  - Every value marked `// TODO: replace` is a placeholder.
 *  - Text shown to visitors is written as { en: "...", hi: "...", gu: "..." }.
 *  - Phone numbers, emails, numbers and URLs are single values.
 *  - UI strings (buttons, labels, form errors) live in /messages/*.json instead.
 *  - Blog posts live in /content/blog/<locale>/*.mdx.
 *
 *  Sections in this file:
 *    1. Types and helpers
 *    2. Brand and contact
 *    3. Product catalogue
 *    4. Home page content
 *    5. Process steps
 *    6. About page (story, team, timeline)
 *    7. Quality page
 *    8. Bulk orders and distributor pages
 *    9. FAQs
 *   10. Testimonials
 *   11. Form options
 *   12. Legal pages
 */

import { defaultLocale, isLocale, type Locale } from "@/i18n/locales";

/* ============================================================================
 * 1. TYPES AND HELPERS
 * ========================================================================== */

export type Localized<T> = Record<Locale, T>;

/** Pick the value for a locale, falling back to the default locale. */
export function t<T>(field: Localized<T>, locale: string): T {
  return isLocale(locale) ? field[locale] : field[defaultLocale];
}

export type ProductType = "cold-pressed" | "filtered" | "refined" | "by-product";
export type PackSizeId = "500ml" | "1l" | "5l" | "15l-tin" | "15kg-tin" | "bulk";
export type IconKey =
  | "droplet"
  | "leaf"
  | "clock"
  | "shield"
  | "sprout"
  | "filter"
  | "cog"
  | "flask"
  | "package"
  | "badge"
  | "truck"
  | "handshake"
  | "tag"
  | "users"
  | "megaphone"
  | "map";

export interface NutritionRow {
  label: Localized<string>;
  value: string;
}

export interface Product {
  /** English, URL-safe, identical in every locale. */
  slug: string;
  name: Localized<string>;
  shortDescription: Localized<string>;
  longDescription: Localized<string>;
  type: ProductType;
  packSizes: PackSizeId[];
  /** Per 100 g. */
  nutrition: NutritionRow[];
  uses: Localized<string[]>;
  shelfLife: Localized<string>;
  storage: Localized<string>;
  /** The first image is the default. `pack` links a photo to a pack size for the product filter. */
  images: { src: string; alt: Localized<string>; pack?: PackSizeId }[];
  featured: boolean;
}

export interface Feature {
  icon: IconKey;
  title: Localized<string>;
  description: Localized<string>;
}

export interface Stat {
  label: Localized<string>;
  value: string;
}

export interface ProcessStep {
  icon: IconKey;
  title: Localized<string>;
  description: Localized<string>;
  image: string;
}

export interface TeamMember {
  name: Localized<string>;
  role: Localized<string>;
  bio: Localized<string>;
  image: string;
}

export interface Milestone {
  year: string;
  title: Localized<string>;
  description: Localized<string>;
}

export interface Faq {
  category: FaqCategoryId;
  question: Localized<string>;
  answer: Localized<string>;
}

export interface Testimonial {
  name: Localized<string>;
  role: Localized<string>;
  quote: Localized<string>;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface Option {
  id: string;
  label: Localized<string>;
}

export interface LegalSection {
  heading: Localized<string>;
  body: Localized<string>;
}

export type FaqCategoryId = "products" | "health" | "orders";

const PLACEHOLDER = "/images/placeholders"; // TODO: replace remaining placeholder images with real photos
const PRODUCT_IMAGES = "/images/products";

/* ============================================================================
 * 2. BRAND AND CONTACT
 * ========================================================================== */

export const siteConfig = {
  brandName: { en: "TATTVA FRESH", hi: "तत्त्व फ्रेश", gu: "તત્ત્વ ફ્રેશ" } as Localized<string>,
  /** Parent company, shown in the footer and structured data. */
  companyName: {
    en: "Shree Ram Food Corporate",
    hi: "श्री राम फ़ूड कॉर्पोरेट",
    gu: "શ્રી રામ ફૂડ કોર્પોરેટ",
  } as Localized<string>,
  tagline: {
    en: "Real Goodness, Pressed With Purpose",
    hi: "असली अच्छाई, नेक इरादे से",
    gu: "સાચી ગુણવત્તા, નેક ઇરાદાથી",
  } as Localized<string>,
  description: {
    en: "Groundnut oil manufacturer in Rajkot, Gujarat. We press our own filtered groundnut oil and also supply refined cottonseed, sunflower and corn oil to homes, dealers and bulk buyers.",
    hi: "राजकोट, गुजरात में मूंगफली तेल निर्माता। हम अपना फ़िल्टर्ड मूंगफली तेल ख़ुद निकालते हैं और घरों, डीलरों व थोक ख़रीदारों को रिफ़ाइंड बिनौला, सूरजमुखी और मक्का तेल भी सप्लाई करते हैं।",
    gu: "રાજકોટ, ગુજરાતમાં સીંગતેલ ઉત્પાદક. અમે અમારું ફિલ્ટર્ડ સીંગતેલ જાતે પીલીએ છીએ અને ઘર, ડીલરો તથા જથ્થાબંધ ખરીદદારોને રિફાઇન્ડ કપાસિયા, સૂરજમુખી અને મકાઈ તેલ પણ સપ્લાય કરીએ છીએ.",
  } as Localized<string>,
  establishedYear: 2026,
  location: {
    city: { en: "Rajkot", hi: "राजकोट", gu: "રાજકોટ" } as Localized<string>,
    state: { en: "Gujarat", hi: "गुजरात", gu: "ગુજરાત" } as Localized<string>,
    country: { en: "India", hi: "भारत", gu: "ભારત" } as Localized<string>,
  },
  address: {
    line1: {
      en: "Bombay Super Commercial Zone 18, Plot No. 22",
      hi: "बॉम्बे सुपर कमर्शियल ज़ोन 18, प्लॉट नं. 22",
      gu: "બોમ્બે સુપર કોમર્શિયલ ઝોન 18, પ્લોટ નં. 22",
    } as Localized<string>,
    line2: {
      en: "Sokhada R.S. No. 97/3, Near Sokhada Chokdi, Sokhada",
      hi: "सोखडा आर.एस. नं. 97/3, सोखडा चौकड़ी के पास, सोखडा",
      gu: "સોખડા રે.સ. નં. 97/3, સોખડા ચોકડી પાસે, સોખડા",
    } as Localized<string>,
    city: { en: "Rajkot", hi: "राजकोट", gu: "રાજકોટ" } as Localized<string>,
    state: { en: "Gujarat", hi: "गुजरात", gu: "ગુજરાત" } as Localized<string>,
    pincode: "360003",
  },
  /** Google Maps "Embed a map" src URL. Leave empty to show a placeholder box. */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Sokhada%20Chokdi%2C%20Sokhada%2C%20Rajkot%2C%20Gujarat%20360003&output=embed",
  /** Link that opens the location in Google Maps. */
  mapLink: "https://maps.app.goo.gl/uZgB6zA3Av4vcwVD8",
  phone: "+91 76176 36936",
  /** Digits only, with country code, for wa.me links. */
  whatsapp: "917617636936",
  whatsappMessage: {
    en: "Hi, I'd like to enquire about TATTVA FRESH oils.",
    hi: "नमस्ते, मुझे तत्त्व फ्रेश तेल के बारे में जानकारी चाहिए।",
    gu: "નમસ્તે, મારે તત્ત્વ ફ્રેશ તેલ વિશે પૂછપરછ કરવી છે.",
  } as Localized<string>,
  emails: {
    info: "shreeramfoodcorporate@gmail.com",
    sales: "shreeramfoodcorporate@gmail.com",
  },
  businessHours: {
    en: "Mon–Sun, 9:00 AM – 10:00 PM",
    hi: "सोम–रवि, सुबह 9:00 – रात 10:00",
    gu: "સોમ–રવિ, સવારે 9:00 – રાત્રે 10:00",
  } as Localized<string>,
  certifications: {
    fssai: "10012345678901", // TODO: confirm, this looks like a sample number
    gst: "24AGBFS0164J1Z3",
    others: [] as string[],
  },
  stats: [
    {
      label: { en: "Litres packed daily", hi: "लीटर रोज़ाना क्षमता", gu: "લિટર દૈનિક ક્ષમતા" },
      value: "2,000",
    },
    { label: { en: "Edible oils", hi: "खाद्य तेल", gu: "ખાદ્યતેલ" }, value: "4" },
    { label: { en: "Pack sizes", hi: "पैक साइज़", gu: "પેક સાઇઝ" }, value: "4" },
    {
      label: { en: "Currently serving", hi: "वर्तमान में सेवा", gu: "હાલમાં સેવા" },
      value: "Gujarat",
    },
  ] as Stat[],
  social: {
    instagram: "https://www.instagram.com/tattvafreshgroundnutoil/",
    facebook: "",
    youtube: "https://www.youtube.com/@ShreeRamfoodcorporate",
    linkedin: "",
  },
  b2b: {
    moq: {
      en: "50 tins (15 L or 15 kg). Pricing on request.",
      hi: "50 टिन (15 लीटर या 15 किलो)। दाम पूछताछ पर।",
      gu: "50 ડબ્બા (15 લિટર કે 15 કિલો). ભાવ પૂછપરછ પર.",
    } as Localized<string>,
    delivery: {
      en: "Pan-India delivery",
      hi: "पूरे भारत में डिलीवरी",
      gu: "સમગ્ર ભારતમાં ડિલિવરી",
    } as Localized<string>,
  },
  /** Overridden by NEXT_PUBLIC_SITE_URL when that env var is set. */
  siteUrl: "https://example.com", // TODO: replace with your domain
};

/* ============================================================================
 * 3. PRODUCT CATALOGUE
 * ========================================================================== */

export const productTypes: Record<ProductType, Localized<string>> = {
  "cold-pressed": { en: "Cold-Pressed", hi: "कोल्ड-प्रेस्ड", gu: "કોલ્ડ-પ્રેસ્ડ" },
  filtered: { en: "Filtered", hi: "फ़िल्टर्ड", gu: "ફિલ્ટર્ડ" },
  refined: { en: "Refined", hi: "रिफ़ाइंड", gu: "રિફાઇન્ડ" },
  "by-product": { en: "By-product", hi: "उप-उत्पाद", gu: "આડપેદાશ" },
};

export const packSizes: Record<PackSizeId, Localized<string>> = {
  "500ml": { en: "500 ml", hi: "500 मि.ली.", gu: "500 મિ.લિ." },
  "1l": { en: "1 L bottle", hi: "1 लीटर बोतल", gu: "1 લિટર બોટલ" },
  "5l": { en: "5 L can", hi: "5 लीटर कैन", gu: "5 લિટર કેન" },
  "15l-tin": { en: "15 L tin", hi: "15 लीटर टिन", gu: "15 લિટર ડબ્બો" },
  "15kg-tin": { en: "15 kg tin", hi: "15 किलो टिन", gu: "15 કિલો ડબ્બો" },
  bulk: { en: "Bulk", hi: "थोक", gu: "જથ્થાબંધ" },
};

/** Nutrition row labels, reused across products. */
const N = {
  energy: { en: "Energy", hi: "ऊर्जा", gu: "ઊર્જા" },
  fat: { en: "Total fat", hi: "कुल वसा", gu: "કુલ ચરબી" },
  saturated: { en: "Saturated fat", hi: "संतृप्त वसा", gu: "સંતૃપ્ત ચરબી" },
  mufa: {
    en: "Monounsaturated fat (MUFA)",
    hi: "मोनोअनसैचुरेटेड वसा (MUFA)",
    gu: "મોનોઅનસેચ્યુરેટેડ ચરબી (MUFA)",
  },
  pufa: {
    en: "Polyunsaturated fat (PUFA)",
    hi: "पॉलीअनसैचुरेटेड वसा (PUFA)",
    gu: "પોલીઅનસેચ્યુરેટેડ ચરબી (PUFA)",
  },
  trans: { en: "Trans fat", hi: "ट्रांस वसा", gu: "ટ્રાન્સ ચરબી" },
  cholesterol: { en: "Cholesterol", hi: "कोलेस्ट्रॉल", gu: "કોલેસ્ટ્રોલ" },
  carbs: { en: "Carbohydrate", hi: "कार्बोहाइड्रेट", gu: "કાર્બોહાઇડ્રેટ" },
  protein: { en: "Protein", hi: "प्रोटीन", gu: "પ્રોટીન" },
  fibre: { en: "Dietary fibre", hi: "आहार रेशा", gu: "આહાર રેસા" },
  vitaminE: { en: "Vitamin E", hi: "विटामिन ई", gu: "વિટામિન ઈ" },
} satisfies Record<string, Localized<string>>;

/** Typical values per 100 g. TODO: replace with your lab report values. */
function oilNutrition(saturated: string, mufa: string, pufa: string, vitaminE: string) {
  return [
    { label: N.energy, value: "884 kcal" },
    { label: N.fat, value: "100 g" },
    { label: N.saturated, value: saturated },
    { label: N.mufa, value: mufa },
    { label: N.pufa, value: pufa },
    { label: N.trans, value: "0 g" },
    { label: N.cholesterol, value: "0 mg" },
    { label: N.carbs, value: "0 g" },
    { label: N.protein, value: "0 g" },
    { label: N.vitaminE, value: vitaminE },
  ] satisfies NutritionRow[];
}

const OIL_STORAGE: Localized<string> = {
  en: "Store in a cool, dry place away from direct sunlight. Keep the cap tightly closed after use.",
  hi: "ठंडी और सूखी जगह पर, सीधी धूप से दूर रखें। इस्तेमाल के बाद ढक्कन कसकर बंद करें।",
  gu: "ઠંડી અને સૂકી જગ્યાએ, સીધા તડકાથી દૂર રાખો. વાપર્યા પછી ઢાંકણ બરાબર બંધ કરો.",
};

export const products: Product[] = [
  {
    slug: "filtered-groundnut-oil",
    name: { en: "Filtered Groundnut Oil", hi: "फ़िल्टर्ड मूंगफली तेल", gu: "ફિલ્ટર્ડ સીંગતેલ" },
    shortDescription: {
      en: "Made in our own mill: pressed from graded groundnuts and double filtered for a clear oil with a rich, nutty taste.",
      hi: "हमारी अपनी मिल में बना: छँटी हुई मूंगफली से निकाला और दो बार छाना गया साफ़ तेल, भरपूर सोंधे स्वाद के साथ।",
      gu: "અમારી પોતાની મિલમાં બનેલું: ગ્રેડ કરેલા સીંગદાણામાંથી પીલેલું અને બે વાર ગાળેલું ચોખ્ખું તેલ, સીંગના ભરપૂર સ્વાદ સાથે.",
    },
    longDescription: {
      en: "Our filtered groundnut oil is pressed from graded Saurashtra groundnuts and passed through filters to remove sediment, without chemical refining. It keeps the natural aroma Gujarati kitchens know, and suits daily cooking, farsan and deep frying.",
      hi: "हमारा फ़िल्टर्ड मूंगफली तेल सौराष्ट्र की छँटी हुई मूंगफली से निकाला जाता है और फ़िल्टर से छानकर तलछट हटाई जाती है, बिना किसी रासायनिक रिफ़ाइनिंग के। इसमें वही प्राकृतिक सुगंध रहती है जो गुजराती रसोई पहचानती है, और यह रोज़ के खाने, नमकीन और तलने के लिए उपयुक्त है।",
      gu: "અમારું ફિલ્ટર્ડ સીંગતેલ સૌરાષ્ટ્રના ગ્રેડ કરેલા સીંગદાણામાંથી પીલવામાં આવે છે અને ફિલ્ટરથી ગાળીને કચરો દૂર કરાય છે, કોઈ રાસાયણિક રિફાઇનિંગ વગર. તેમાં એ જ કુદરતી સુગંધ રહે છે જે ગુજરાતી રસોડું ઓળખે છે, અને તે રોજની રસોઈ, ફરસાણ અને તળવા માટે યોગ્ય છે.",
    },
    type: "filtered",
    packSizes: ["1l", "5l", "15l-tin", "15kg-tin"],
    nutrition: oilNutrition("17 g", "46 g", "32 g", "14 mg"), // TODO: replace with lab values
    uses: {
      en: ["Daily cooking and vaghar", "Farsan and snacks", "Deep frying", "Pickles"],
      hi: ["रोज़ का खाना और तड़का", "नमकीन और स्नैक्स", "डीप फ्राई", "अचार"],
      gu: ["રોજની રસોઈ અને વઘાર", "ફરસાણ અને નાસ્તા", "તળવા માટે", "અથાણાં"],
    },
    shelfLife: {
      en: "9 months from the date of packing",
      hi: "पैकिंग की तारीख से 9 महीने",
      gu: "પેકિંગની તારીખથી 9 મહિના",
    },
    storage: OIL_STORAGE,
    images: [
      {
        src: `${PRODUCT_IMAGES}/groundnut-1l.jpg`,
        pack: "1l",
        alt: {
          en: "TATTVA FRESH filtered groundnut oil, 1 L bottle",
          hi: "तत्त्व फ्रेश फ़िल्टर्ड मूंगफली तेल, 1 लीटर बोतल",
          gu: "તત્ત્વ ફ્રેશ ફિલ્ટર્ડ સીંગતેલ, 1 લિટર બોટલ",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/groundnut-5l.jpg`,
        pack: "5l",
        alt: {
          en: "TATTVA FRESH filtered groundnut oil, 5 L can",
          hi: "तत्त्व फ्रेश फ़िल्टर्ड मूंगफली तेल, 5 लीटर कैन",
          gu: "તત્ત્વ ફ્રેશ ફિલ્ટર્ડ સીંગતેલ, 5 લિટર કેન",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/groundnut-15kg.jpg`,
        pack: "15kg-tin",
        alt: {
          en: "TATTVA FRESH filtered groundnut oil, 15 kg tin",
          hi: "तत्त्व फ्रेश फ़िल्टर्ड मूंगफली तेल, 15 किलो टिन",
          gu: "તત્ત્વ ફ્રેશ ફિલ્ટર્ડ સીંગતેલ, 15 કિલો ડબ્બો",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "refined-cottonseed-oil",
    name: { en: "Refined Cottonseed Oil", hi: "रिफ़ाइंड बिनौला तेल", gu: "રિફાઇન્ડ કપાસિયા તેલ" },
    shortDescription: {
      en: "A light, neutral oil and a Gujarat favourite for farsan, sweets and everyday frying.",
      hi: "हल्का, सादे स्वाद वाला तेल, गुजरात में नमकीन, मिठाई और रोज़ तलने के लिए पसंदीदा।",
      gu: "હળવું, સાદા સ્વાદવાળું તેલ, ગુજરાતમાં ફરસાણ, મીઠાઈ અને રોજ તળવા માટે મનપસંદ.",
    },
    longDescription: {
      en: "Refined cottonseed oil has a clean taste and light colour that lets the food speak for itself. It holds up well in the kadai, which is why sweet shops, farsan makers and caterers across Gujarat rely on it.",
      hi: "रिफ़ाइंड बिनौला तेल का स्वाद साफ़ और रंग हल्का होता है, जिससे खाने का असली स्वाद आता है। यह कड़ाही में अच्छा टिकता है, इसलिए गुजरात भर की मिठाई की दुकानें, नमकीन बनाने वाले और कैटरर इस पर भरोसा करते हैं।",
      gu: "રિફાઇન્ડ કપાસિયા તેલનો સ્વાદ ચોખ્ખો અને રંગ આછો હોય છે, જેથી વાનગીનો સાચો સ્વાદ આવે છે. તે કડાઈમાં સારું ટકે છે, તેથી આખા ગુજરાતની મીઠાઈની દુકાનો, ફરસાણ બનાવનારા અને કેટરરો તેના પર ભરોસો રાખે છે.",
    },
    type: "refined",
    packSizes: ["1l", "5l", "15l-tin", "15kg-tin"],
    nutrition: oilNutrition("26 g", "18 g", "52 g", "35 mg"), // TODO: replace with lab values
    uses: {
      en: ["Farsan and namkeen", "Sweets", "Deep frying", "Commercial kitchens"],
      hi: ["नमकीन और फरसाण", "मिठाइयाँ", "डीप फ्राई", "व्यावसायिक रसोई"],
      gu: ["ફરસાણ અને નમકીન", "મીઠાઈ", "તળવા માટે", "વ્યાવસાયિક રસોડાં"],
    },
    shelfLife: {
      en: "12 months from the date of packing",
      hi: "पैकिंग की तारीख से 12 महीने",
      gu: "પેકિંગની તારીખથી 12 મહિના",
    },
    storage: OIL_STORAGE,
    images: [
      {
        src: `${PRODUCT_IMAGES}/cottonseed-1l.jpg`,
        pack: "1l",
        alt: {
          en: "TATTVA FRESH refined cottonseed oil, 1 L bottle",
          hi: "तत्त्व फ्रेश रिफ़ाइंड बिनौला तेल, 1 लीटर बोतल",
          gu: "તત્ત્વ ફ્રેશ રિફાઇન્ડ કપાસિયા તેલ, 1 લિટર બોટલ",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/cottonseed-5l.jpg`,
        pack: "5l",
        alt: {
          en: "TATTVA FRESH refined cottonseed oil, 5 L can",
          hi: "तत्त्व फ्रेश रिफ़ाइंड बिनौला तेल, 5 लीटर कैन",
          gu: "તત્ત્વ ફ્રેશ રિફાઇન્ડ કપાસિયા તેલ, 5 લિટર કેન",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/cottonseed-15l.jpg`,
        pack: "15l-tin",
        alt: {
          en: "TATTVA FRESH refined cottonseed oil, 15 L tin",
          hi: "तत्त्व फ्रेश रिफ़ाइंड बिनौला तेल, 15 लीटर टिन",
          gu: "તત્ત્વ ફ્રેશ રિફાઇન્ડ કપાસિયા તેલ, 15 લિટર ડબ્બો",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/cottonseed-15kg.jpg`, // gallery only: tin filters use the 15 L photo
        alt: {
          en: "TATTVA FRESH refined cottonseed oil, 15 kg tin",
          hi: "तत्त्व फ्रेश रिफ़ाइंड बिनौला तेल, 15 किलो टिन",
          gu: "તત્ત્વ ફ્રેશ રિફાઇન્ડ કપાસિયા તેલ, 15 કિલો ડબ્બો",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "refined-sunflower-oil",
    name: { en: "Refined Sunflower Oil", hi: "रिफ़ाइंड सूरजमुखी तेल", gu: "રિફાઇન્ડ સૂરજમુખી તેલ" },
    shortDescription: {
      en: "Light in taste and colour, with natural vitamin E, for everyday home cooking.",
      hi: "स्वाद और रंग में हल्का, प्राकृतिक विटामिन ई के साथ, घर के रोज़ के खाने के लिए।",
      gu: "સ્વાદ અને રંગમાં હળવું, કુદરતી વિટામિન ઈ સાથે, ઘરની રોજની રસોઈ માટે.",
    },
    longDescription: {
      en: "Refined sunflower oil is light, clear and almost flavourless, so it suits everything from rotis and sabzi to baking. It is naturally rich in vitamin E and low in saturated fat.",
      hi: "रिफ़ाइंड सूरजमुखी तेल हल्का, साफ़ और लगभग बिना स्वाद का होता है, इसलिए रोटी-सब्ज़ी से लेकर बेकिंग तक हर चीज़ में अच्छा लगता है। इसमें प्राकृतिक रूप से विटामिन ई भरपूर और संतृप्त वसा कम होती है।",
      gu: "રિફાઇન્ડ સૂરજમુખી તેલ હળવું, ચોખ્ખું અને લગભગ સ્વાદ વગરનું હોય છે, તેથી રોટલી-શાકથી લઈને બેકિંગ સુધી બધામાં ચાલે છે. તેમાં કુદરતી રીતે વિટામિન ઈ ભરપૂર અને સંતૃપ્ત ચરબી ઓછી હોય છે.",
    },
    type: "refined",
    packSizes: ["1l", "5l", "15l-tin", "15kg-tin"],
    nutrition: oilNutrition("10 g", "20 g", "66 g", "41 mg"), // TODO: replace with lab values
    uses: {
      en: ["Everyday cooking", "Shallow frying", "Baking", "Salad dressing"],
      hi: ["रोज़ का खाना", "हल्का तलना", "बेकिंग", "सलाद ड्रेसिंग"],
      gu: ["રોજની રસોઈ", "હળવું તળવું", "બેકિંગ", "સલાડ ડ્રેસિંગ"],
    },
    shelfLife: {
      en: "12 months from the date of packing",
      hi: "पैकिंग की तारीख से 12 महीने",
      gu: "પેકિંગની તારીખથી 12 મહિના",
    },
    storage: OIL_STORAGE,
    images: [
      {
        src: `${PRODUCT_IMAGES}/sunflower-1l.jpg`,
        pack: "1l",
        alt: {
          en: "TATTVA FRESH refined sunflower oil, 1 L bottle",
          hi: "तत्त्व फ्रेश रिफ़ाइंड सूरजमुखी तेल, 1 लीटर बोतल",
          gu: "તત્ત્વ ફ્રેશ રિફાઇન્ડ સૂરજમુખી તેલ, 1 લિટર બોટલ",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/sunflower-5l.jpg`,
        pack: "5l",
        alt: {
          en: "TATTVA FRESH refined sunflower oil, 5 L can",
          hi: "तत्त्व फ्रेश रिफ़ाइंड सूरजमुखी तेल, 5 लीटर कैन",
          gu: "તત્ત્વ ફ્રેશ રિફાઇન્ડ સૂરજમુખી તેલ, 5 લિટર કેન",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/sunflower-15l.jpg`,
        pack: "15l-tin",
        alt: {
          en: "TATTVA FRESH refined sunflower oil, 15 L tin",
          hi: "तत्त्व फ्रेश रिफ़ाइंड सूरजमुखी तेल, 15 लीटर टिन",
          gu: "તત્ત્વ ફ્રેશ રિફાઇન્ડ સૂરજમુખી તેલ, 15 લિટર ડબ્બો",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "corn-oil",
    name: { en: "Corn Oil", hi: "मक्के का तेल", gu: "મકાઈનું તેલ" },
    shortDescription: {
      en: "A mild, golden oil with a high smoke point, for frying, sautéing and baking.",
      hi: "हल्के स्वाद वाला सुनहरा तेल, ऊँचे स्मोक पॉइंट के साथ, तलने, भूनने और बेकिंग के लिए।",
      gu: "હળવા સ્વાદવાળું સોનેરી તેલ, ઊંચા સ્મોક પોઇન્ટ સાથે, તળવા, સાંતળવા અને બેકિંગ માટે.",
    },
    longDescription: {
      en: "Corn oil is refined for a clean, mild flavour and a high smoke point. It fries crisp without heaviness and works well in baking and stir-fries.",
      hi: "मक्के का तेल साफ़, हल्के स्वाद और ऊँचे स्मोक पॉइंट के लिए रिफ़ाइन किया जाता है। यह बिना भारीपन के कुरकुरा तलता है और बेकिंग व स्टर-फ्राई में अच्छा काम करता है।",
      gu: "મકાઈનું તેલ ચોખ્ખા, હળવા સ્વાદ અને ઊંચા સ્મોક પોઇન્ટ માટે રિફાઇન કરવામાં આવે છે. તે ભારેપણા વગર કડક તળે છે અને બેકિંગ તથા સ્ટર-ફ્રાયમાં સારું ચાલે છે.",
    },
    type: "refined",
    packSizes: ["1l", "5l", "15l-tin", "15kg-tin"],
    nutrition: oilNutrition("13 g", "28 g", "55 g", "14 mg"), // TODO: replace with lab values
    uses: {
      en: ["Deep frying", "Stir-frying and sautéing", "Baking", "Snacks"],
      hi: ["डीप फ्राई", "भूनना और हल्का तलना", "बेकिंग", "स्नैक्स"],
      gu: ["તળવા માટે", "સાંતળવા અને શેકવા", "બેકિંગ", "નાસ્તા"],
    },
    shelfLife: {
      en: "12 months from the date of packing",
      hi: "पैकिंग की तारीख से 12 महीने",
      gu: "પેકિંગની તારીખથી 12 મહિના",
    },
    storage: OIL_STORAGE,
    images: [
      {
        src: `${PRODUCT_IMAGES}/corn-1l.jpg`,
        pack: "1l",
        alt: {
          en: "TATTVA FRESH corn oil, 1 L bottle",
          hi: "तत्त्व फ्रेश मक्के का तेल, 1 लीटर बोतल",
          gu: "તત્ત્વ ફ્રેશ મકાઈનું તેલ, 1 લિટર બોટલ",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/corn-5l.jpg`,
        pack: "5l",
        alt: {
          en: "TATTVA FRESH corn oil, 5 L can",
          hi: "तत्त्व फ्रेश मक्के का तेल, 5 लीटर कैन",
          gu: "તત્ત્વ ફ્રેશ મકાઈનું તેલ, 5 લિટર કેન",
        },
      },
      {
        src: `${PRODUCT_IMAGES}/corn-15l.jpg`,
        pack: "15l-tin",
        alt: {
          en: "TATTVA FRESH corn oil, 15 L tin",
          hi: "तत्त्व फ्रेश मक्के का तेल, 15 लीटर टिन",
          gu: "તત્ત્વ ફ્રેશ મકાઈનું તેલ, 15 લિટર ડબ્બો",
        },
      },
    ],
    featured: false,
  },
];

/* ============================================================================
 * 4. HOME PAGE CONTENT
 * ========================================================================== */

export const heroImage = {
  src: `${PRODUCT_IMAGES}/groundnut-1l.jpg`,
  alt: {
    en: "1 L bottles of TATTVA FRESH pure groundnut oil",
    hi: "तत्त्व फ्रेश शुद्ध मूंगफली तेल की 1 लीटर बोतलें",
    gu: "તત્ત્વ ફ્રેશ શુદ્ધ સીંગતેલની 1 લિટર બોટલો",
  } as Localized<string>,
};

export const whyChooseUs: Feature[] = [
  {
    icon: "droplet",
    title: { en: "Pure, Never Blended", hi: "शुद्ध, बिना मिलावट", gu: "શુદ્ધ, ભેળસેળ વગર" },
    description: {
      en: "Each pack holds exactly the oil named on it. No blending, no additives.",
      hi: "हर पैक में वही तेल जिसका नाम उस पर लिखा है। न मिलावट, न एडिटिव।",
      gu: "દરેક પેકમાં એ જ તેલ જેનું નામ તેના પર લખ્યું છે. કોઈ ભેળસેળ નહીં, કોઈ એડિટિવ નહીં.",
    },
  },
  {
    icon: "map",
    title: { en: "Made in Rajkot", hi: "राजकोट में बना", gu: "રાજકોટમાં બનેલું" },
    description: {
      en: "Packed at our own unit in Sokhada, in the heart of Saurashtra's oil country.",
      hi: "सौराष्ट्र के तेल क्षेत्र के बीच, सोखडा में हमारी अपनी यूनिट में पैक।",
      gu: "સૌરાષ્ટ્રના તેલ પ્રદેશની વચ્ચે, સોખડામાં અમારા પોતાના યુનિટમાં પેક.",
    },
  },
  {
    icon: "clock",
    title: { en: "Packed Fresh", hi: "ताज़ा पैक", gu: "તાજું પેક" },
    description: {
      en: "Up to 2,000 litres packed every day, so stock moves fast and reaches you fresh.",
      hi: "रोज़ 2,000 लीटर तक पैकिंग, ताकि माल जल्दी निकले और आप तक ताज़ा पहुँचे।",
      gu: "રોજ 2,000 લિટર સુધી પેકિંગ, જેથી માલ ઝડપથી નીકળે અને તમારા સુધી તાજો પહોંચે.",
    },
  },
  {
    icon: "shield",
    title: { en: "FSSAI Licensed", hi: "FSSAI लाइसेंस प्राप्त", gu: "FSSAI લાઇસન્સ ધરાવતું" },
    description: {
      en: "Licensed by FSSAI, with every batch checked before it leaves the factory.",
      hi: "FSSAI से लाइसेंस प्राप्त, और हर बैच फ़ैक्टरी से निकलने से पहले जाँचा जाता है।",
      gu: "FSSAI લાઇસન્સ ધરાવતું, અને દરેક બેચ ફેક્ટરીમાંથી નીકળતા પહેલાં ચકાસવામાં આવે છે.",
    },
  },
];

/* ============================================================================
 * 5. PROCESS STEPS
 * ========================================================================== */

export const processSteps: ProcessStep[] = [
  {
    icon: "sprout",
    title: { en: "Sourcing", hi: "ख़रीद", gu: "ખરીદી" },
    description: {
      en: "We buy bold groundnuts from Saurashtra's market yards and source our other oils from trusted suppliers.",
      hi: "हम सौराष्ट्र की मंडियों से मोटी मूंगफली ख़रीदते हैं और बाकी तेल भरोसेमंद सप्लायर से लेते हैं।",
      gu: "અમે સૌરાષ્ટ્રના માર્કેટ યાર્ડમાંથી જાડા સીંગદાણા ખરીદીએ છીએ અને બાકીનાં તેલ ભરોસાપાત્ર સપ્લાયર પાસેથી લઈએ છીએ.",
    },
    image: `${PLACEHOLDER}/process-1.svg`, // TODO: replace
  },
  {
    icon: "filter",
    title: { en: "Inspection", hi: "जाँच", gu: "ચકાસણી" },
    description: {
      en: "Seed is cleaned and graded, and every incoming oil lot is checked before it is accepted.",
      hi: "बीज की सफ़ाई और छँटाई होती है, और आने वाले हर तेल लॉट की जाँच के बाद ही उसे लिया जाता है।",
      gu: "દાણાની સફાઈ અને ગ્રેડિંગ થાય છે, અને આવતા દરેક તેલ લોટની ચકાસણી પછી જ તેને સ્વીકારાય છે.",
    },
    image: `${PLACEHOLDER}/process-2.svg`, // TODO: replace
  },
  {
    icon: "cog",
    title: { en: "Pressing", hi: "पेराई", gu: "પીલાણ" },
    description: {
      en: "Groundnuts are expeller-pressed in small batches to keep their natural aroma.",
      hi: "मूंगफली की पेराई छोटे बैच में एक्सपेलर से होती है, ताकि प्राकृतिक सुगंध बनी रहे।",
      gu: "સીંગદાણાનું પીલાણ નાના બેચમાં એક્સપેલરથી થાય છે, જેથી કુદરતી સુગંધ જળવાઈ રહે.",
    },
    image: `${PLACEHOLDER}/process-3.svg`, // TODO: replace
  },
  {
    icon: "droplet",
    title: { en: "Filtration", hi: "छनाई", gu: "ગાળણ" },
    description: {
      en: "Oil is settled and filtered to remove fine sediment, for a clear, clean pour.",
      hi: "तेल को थिरने देकर छाना जाता है ताकि बारीक तलछट हटे और तेल साफ़ रहे।",
      gu: "તેલને ઠરવા દઈને ગાળવામાં આવે છે જેથી ઝીણો કચરો દૂર થાય અને તેલ ચોખ્ખું રહે.",
    },
    image: `${PLACEHOLDER}/process-4.svg`, // TODO: replace
  },
  {
    icon: "package",
    title: { en: "Packing", hi: "पैकिंग", gu: "પેકિંગ" },
    description: {
      en: "Filled into 1 L bottles, 5 L cans and 15 L or 15 kg tins on a hygienic line, then sealed.",
      hi: "स्वच्छ लाइन पर 1 लीटर बोतल, 5 लीटर कैन और 15 लीटर या 15 किलो टिन में भरकर सील किया जाता है।",
      gu: "સ્વચ્છ લાઇન પર 1 લિટર બોટલ, 5 લિટર કેન અને 15 લિટર કે 15 કિલો ડબ્બામાં ભરીને સીલ કરવામાં આવે છે.",
    },
    image: `${PLACEHOLDER}/process-5.svg`, // TODO: replace
  },
  {
    icon: "flask",
    title: { en: "Quality Check", hi: "गुणवत्ता जाँच", gu: "ગુણવત્તા ચકાસણી" },
    description: {
      en: "Every batch is checked for purity, moisture and acidity before dispatch.",
      hi: "हर बैच की शुद्धता, नमी और अम्लता की जाँच डिस्पैच से पहले होती है।",
      gu: "દરેક બેચની શુદ્ધતા, ભેજ અને એસિડિટીની ચકાસણી ડિસ્પેચ પહેલાં થાય છે.",
    },
    image: `${PLACEHOLDER}/process-6.svg`, // TODO: replace
  },
];

/* ============================================================================
 * 6. ABOUT PAGE
 * ========================================================================== */

export const about = {
  story: {
    en: [
      "TATTVA FRESH is the edible oil brand of Shree Ram Food Corporate, started in 2026 in Rajkot, at the centre of Gujarat's groundnut and oil trade.",
      "Tattva means essence. We started with a simple idea: pack honest, pure oil, the way families and kitchens in Saurashtra have always expected it to be, and deliver it reliably to homes, dealers and businesses.",
    ],
    hi: [
      "तत्त्व फ्रेश, श्री राम फ़ूड कॉर्पोरेट का खाद्य तेल ब्रांड है, जिसकी शुरुआत 2026 में राजकोट में हुई, जो गुजरात के मूंगफली और तेल व्यापार का केंद्र है।",
      "तत्त्व का अर्थ है सार। हमारी शुरुआत एक सीधे विचार से हुई: ईमानदार, शुद्ध तेल पैक करना, वैसा ही जैसा सौराष्ट्र के परिवार और रसोई हमेशा से चाहते आए हैं, और उसे घरों, डीलरों और व्यवसायों तक भरोसे से पहुँचाना।",
    ],
    gu: [
      "તત્ત્વ ફ્રેશ એ શ્રી રામ ફૂડ કોર્પોરેટની ખાદ્યતેલ બ્રાન્ડ છે, જેની શરૂઆત 2026 માં રાજકોટમાં થઈ, જે ગુજરાતના સીંગ અને તેલ વેપારનું કેન્દ્ર છે.",
      "તત્ત્વ એટલે સાર. અમારી શરૂઆત એક સીધા વિચારથી થઈ: પ્રામાણિક, શુદ્ધ તેલ પેક કરવું, એવું જ જેવું સૌરાષ્ટ્રના પરિવારો અને રસોડાં હંમેશાં અપેક્ષા રાખતાં આવ્યાં છે, અને તેને ઘર, ડીલરો અને વ્યવસાયો સુધી ભરોસાથી પહોંચાડવું.",
    ],
  } as Localized<string[]>,
  storyImage: "/images/brand/logo.jpg",
  mission: {
    en: "To bring pure, honestly packed edible oil to every kitchen we serve, at a fair price.",
    hi: "हर रसोई तक शुद्ध और ईमानदारी से पैक किया गया खाद्य तेल, उचित दाम पर पहुँचाना।",
    gu: "દરેક રસોડા સુધી શુદ્ધ અને પ્રામાણિકતાથી પેક કરેલું ખાદ્યતેલ, વાજબી ભાવે પહોંચાડવું.",
  } as Localized<string>,
  vision: {
    en: "To grow from Gujarat into a trusted edible oil name across India.",
    hi: "गुजरात से आगे बढ़कर पूरे भारत में एक भरोसेमंद खाद्य तेल नाम बनना।",
    gu: "ગુજરાતથી આગળ વધીને સમગ્ર ભારતમાં ભરોસાપાત્ર ખાદ્યતેલ નામ બનવું.",
  } as Localized<string>,
  factory: {
    description: {
      en: "Our unit is at Sokhada, near Rajkot, with a capacity of 2,000 litres a day. Our groundnut oil is pressed, filtered and packed here, and every batch is checked before it leaves.",
      hi: "हमारी यूनिट राजकोट के पास सोखडा में है, जिसकी क्षमता रोज़ 2,000 लीटर है। हमारा मूंगफली तेल यहीं निकाला, छाना और पैक किया जाता है, और हर बैच निकलने से पहले जाँचा जाता है।",
      gu: "અમારું યુનિટ રાજકોટ પાસે સોખડામાં છે, જેની ક્ષમતા રોજના 2,000 લિટર છે. અમારું સીંગતેલ અહીં જ પીલાય, ગળાય અને પેક થાય છે, અને દરેક બેચ નીકળતા પહેલાં ચકાસવામાં આવે છે.",
    } as Localized<string>,
    highlights: {
      en: ["2,000 litres daily capacity", "1 L bottles to 15 kg tins", "Pan-India dispatch"],
      hi: ["रोज़ 2,000 लीटर की क्षमता", "1 लीटर बोतल से 15 किलो टिन तक", "पूरे भारत में डिस्पैच"],
      gu: ["રોજની 2,000 લિટર ક્ષમતા", "1 લિટર બોટલથી 15 કિલો ડબ્બા સુધી", "સમગ્ર ભારતમાં ડિસ્પેચ"],
    } as Localized<string[]>,
    image: `${PLACEHOLDER}/factory.svg`, // TODO: replace
  },
};

/** Founders shown on the About page. The section is hidden while this is empty. */
export const team: TeamMember[] = []; // TODO: add founders

/** Milestones shown on the About page. The section is hidden while this is empty. */
export const timeline: Milestone[] = [];

/* ============================================================================
 * 7. QUALITY PAGE
 * ========================================================================== */

export const quality = {
  intro: {
    en: "Quality is checked at three points: when raw material arrives, during pressing and filtration, and before every batch is dispatched.",
    hi: "गुणवत्ता की जाँच तीन जगह होती है: जब कच्चा माल आता है, पेराई और छनाई के दौरान, और हर बैच के डिस्पैच से पहले।",
    gu: "ગુણવત્તાની ચકાસણી ત્રણ તબક્કે થાય છે: કાચો માલ આવે ત્યારે, પીલાણ અને ગાળણ દરમિયાન, અને દરેક બેચના ડિસ્પેચ પહેલાં.",
  } as Localized<string>,
  fssaiInfo: {
    en: "We are licensed by the Food Safety and Standards Authority of India (FSSAI). The licence number is printed on every pack and can be verified on the FSSAI FoSCoS portal.",
    hi: "हम भारतीय खाद्य सुरक्षा और मानक प्राधिकरण (FSSAI) से लाइसेंस प्राप्त हैं। लाइसेंस नंबर हर पैक पर छपा होता है और FSSAI के FoSCoS पोर्टल पर जाँचा जा सकता है।",
    gu: "અમે ભારતીય ખાદ્ય સુરક્ષા અને ધોરણ સત્તામંડળ (FSSAI) પાસેથી લાઇસન્સ ધરાવીએ છીએ. લાઇસન્સ નંબર દરેક પેક પર છાપેલો હોય છે અને FSSAI ના FoSCoS પોર્ટલ પર ચકાસી શકાય છે.",
  } as Localized<string>, // TODO: replace
  labTests: [
    {
      icon: "flask",
      title: { en: "Free fatty acid (FFA)", hi: "फ्री फैटी एसिड (FFA)", gu: "ફ્રી ફેટી એસિડ (FFA)" },
      description: {
        en: "Measures freshness. Low FFA means the oil was pressed from sound seed and stored well.",
        hi: "ताज़गी का माप। कम FFA का मतलब है कि तेल अच्छे दानों से निकला और ठीक से रखा गया।",
        gu: "તાજગીનું માપ. ઓછું FFA એટલે તેલ સારા દાણામાંથી પીલાયું છે અને બરાબર સચવાયું છે.",
      },
    },
    {
      icon: "droplet",
      title: { en: "Moisture and impurities", hi: "नमी और अशुद्धियाँ", gu: "ભેજ અને અશુદ્ધિઓ" },
      description: {
        en: "Keeps the oil clear and stable through its shelf life.",
        hi: "तेल को उसकी पूरी शेल्फ़ लाइफ़ तक साफ़ और स्थिर रखता है।",
        gu: "તેલને તેની આખી શેલ્ફ લાઇફ સુધી ચોખ્ખું અને સ્થિર રાખે છે.",
      },
    },
    {
      icon: "shield",
      title: { en: "Adulteration checks", hi: "मिलावट की जाँच", gu: "ભેળસેળની ચકાસણી" },
      description: {
        en: "Tests confirm no other oil has been mixed in.",
        hi: "जाँच से पुष्टि होती है कि कोई दूसरा तेल नहीं मिलाया गया है।",
        gu: "ચકાસણીથી ખાતરી થાય છે કે બીજું કોઈ તેલ ભેળવાયું નથી.",
      },
    },
    {
      icon: "badge",
      title: { en: "Peroxide value", hi: "पेरॉक्साइड मान", gu: "પેરોક્સાઇડ મૂલ્ય" },
      description: {
        en: "Confirms the oil has not oxidised, so it tastes and smells fresh.",
        hi: "पुष्टि करता है कि तेल ऑक्सीकृत नहीं हुआ है, ताकि स्वाद और ख़ुशबू ताज़ा रहे।",
        gu: "ખાતરી કરે છે કે તેલ ઓક્સિડાઇઝ થયું નથી, જેથી સ્વાદ અને સુગંધ તાજાં રહે.",
      },
    },
  ] as Feature[], // TODO: replace
  labImage: `${PLACEHOLDER}/lab.svg`, // TODO: replace
};

/* ============================================================================
 * 8. BULK ORDERS AND DISTRIBUTOR PAGES
 * ========================================================================== */

export const bulkBenefits: Feature[] = [
  {
    icon: "tag",
    title: { en: "Direct pricing", hi: "सीधे दाम", gu: "સીધા ભાવ" },
    description: {
      en: "Groundnut oil straight from the manufacturer, and volume-based rates on every oil.",
      hi: "मूंगफली तेल सीधे निर्माता से, और हर तेल पर मात्रा के अनुसार दरें।",
      gu: "સીંગતેલ સીધું ઉત્પાદક પાસેથી, અને દરેક તેલ પર જથ્થા પ્રમાણેના ભાવ.",
    },
  },
  {
    icon: "shield",
    title: { en: "Consistent quality", hi: "एक जैसी गुणवत्ता", gu: "એકસરખી ગુણવત્તા" },
    description: {
      en: "Batch test reports available with every consignment.",
      hi: "हर खेप के साथ बैच टेस्ट रिपोर्ट उपलब्ध।",
      gu: "દરેક માલ સાથે બેચ ટેસ્ટ રિપોર્ટ ઉપલબ્ધ.",
    },
  },
  {
    icon: "package",
    title: { en: "Flexible packing", hi: "लचीली पैकिंग", gu: "અનુકૂળ પેકિંગ" },
    description: {
      en: "Tins, jars or tanker loads, packed to suit your operation.",
      hi: "टिन, जार या टैंकर, आपकी ज़रूरत के अनुसार पैकिंग।",
      gu: "ડબ્બા, જાર કે ટેન્કર, તમારી જરૂરિયાત પ્રમાણે પેકિંગ.",
    },
  },
  {
    icon: "truck",
    title: { en: "Reliable dispatch", hi: "भरोसेमंद डिस्पैच", gu: "ભરોસાપાત્ર ડિસ્પેચ" },
    description: {
      en: "Scheduled supply for hotels, caterers, food makers and retailers.",
      hi: "होटल, कैटरर, खाद्य निर्माता और रिटेलर के लिए तय समय पर सप्लाई।",
      gu: "હોટલ, કેટરર, ખાદ્ય ઉત્પાદકો અને રિટેલરો માટે નિયત સમયે સપ્લાય.",
    },
  },
]; // TODO: replace

export const distributorBenefits: Feature[] = [
  {
    icon: "handshake",
    title: { en: "Healthy margins", hi: "अच्छा मार्जिन", gu: "સારું માર્જિન" },
    description: {
      en: "A transparent margin structure with scheme support.",
      hi: "पारदर्शी मार्जिन ढाँचा और स्कीम का सहयोग।",
      gu: "પારદર્શક માર્જિન માળખું અને સ્કીમનો સહયોગ.",
    },
  },
  {
    icon: "map",
    title: { en: "Protected territory", hi: "सुरक्षित क्षेत्र", gu: "સુરક્ષિત વિસ્તાર" },
    description: {
      en: "A defined area so your effort builds your own business.",
      hi: "तय क्षेत्र, ताकि आपकी मेहनत से आपका ही कारोबार बढ़े।",
      gu: "નક્કી વિસ્તાર, જેથી તમારી મહેનતથી તમારો જ વેપાર વધે.",
    },
  },
  {
    icon: "megaphone",
    title: { en: "Marketing support", hi: "मार्केटिंग सहयोग", gu: "માર્કેટિંગ સહયોગ" },
    description: {
      en: "Shop branding, samples and local promotion material.",
      hi: "दुकान की ब्रांडिंग, सैंपल और स्थानीय प्रचार सामग्री।",
      gu: "દુકાનનું બ્રાન્ડિંગ, સેમ્પલ અને સ્થાનિક પ્રચાર સામગ્રી.",
    },
  },
  {
    icon: "truck",
    title: { en: "Steady supply", hi: "नियमित सप्लाई", gu: "નિયમિત સપ્લાય" },
    description: {
      en: "Regular dispatch from Rajkot, all year round.",
      hi: "राजकोट से साल भर नियमित डिस्पैच।",
      gu: "રાજકોટથી આખું વર્ષ નિયમિત ડિસ્પેચ.",
    },
  },
]; // TODO: replace

/* ============================================================================
 * 9. FAQS
 * ========================================================================== */

export const faqCategories: Record<FaqCategoryId, Localized<string>> = {
  products: { en: "Products", hi: "उत्पाद", gu: "ઉત્પાદનો" },
  health: { en: "Health & Usage", hi: "सेहत और उपयोग", gu: "આરોગ્ય અને ઉપયોગ" },
  orders: { en: "Orders & Delivery", hi: "ऑर्डर और डिलीवरी", gu: "ઓર્ડર અને ડિલિવરી" },
};

export const faqs: Faq[] = [
  {
    category: "products",
    question: {
      en: "Which oils do you make?",
      hi: "आप कौन-कौन से तेल बनाते हैं?",
      gu: "તમે કયાં કયાં તેલ બનાવો છો?",
    },
    answer: {
      en: "We offer four edible oils: filtered groundnut oil, refined cottonseed oil, refined sunflower oil and corn oil.",
      hi: "हम चार खाद्य तेल देते हैं: फ़िल्टर्ड मूंगफली तेल, रिफ़ाइंड बिनौला तेल, रिफ़ाइंड सूरजमुखी तेल और मक्के का तेल।",
      gu: "અમે ચાર ખાદ્યતેલ આપીએ છીએ: ફિલ્ટર્ડ સીંગતેલ, રિફાઇન્ડ કપાસિયા તેલ, રિફાઇન્ડ સૂરજમુખી તેલ અને મકાઈનું તેલ.",
    },
  },
  {
    category: "products",
    question: {
      en: "What is the difference between filtered and refined oil?",
      hi: "फ़िल्टर्ड और रिफ़ाइंड तेल में क्या अंतर है?",
      gu: "ફિલ્ટર્ડ અને રિફાઇન્ડ તેલમાં શું ફરક છે?",
    },
    answer: {
      en: "Filtered oil is pressed and filtered without chemical refining, so it keeps its natural aroma and colour. Refined oil is processed further for a neutral taste, lighter colour and longer shelf life.",
      hi: "फ़िल्टर्ड तेल को निकालकर बिना रासायनिक रिफ़ाइनिंग के छाना जाता है, इसलिए उसकी प्राकृतिक सुगंध और रंग बने रहते हैं। रिफ़ाइंड तेल को आगे प्रोसेस किया जाता है, जिससे स्वाद सादा, रंग हल्का और शेल्फ़ लाइफ़ लंबी होती है।",
      gu: "ફિલ્ટર્ડ તેલને પીલીને રાસાયણિક રિફાઇનિંગ વગર ગાળવામાં આવે છે, તેથી તેની કુદરતી સુગંધ અને રંગ જળવાઈ રહે છે. રિફાઇન્ડ તેલને આગળ પ્રોસેસ કરવામાં આવે છે, જેથી સ્વાદ સાદો, રંગ આછો અને શેલ્ફ લાઇફ લાંબી થાય છે.",
    },
  },
  {
    category: "products",
    question: {
      en: "Are your oils pure?",
      hi: "क्या आपके तेल शुद्ध हैं?",
      gu: "શું તમારાં તેલ શુદ્ધ છે?",
    },
    answer: {
      en: "Yes. Each pack contains only the oil named on it. We do not blend oils, and every batch is checked before dispatch.",
      hi: "हाँ। हर पैक में सिर्फ़ वही तेल होता है जिसका नाम उस पर लिखा है। हम तेलों को मिलाते नहीं, और हर बैच की डिस्पैच से पहले जाँच होती है।",
      gu: "હા. દરેક પેકમાં ફક્ત એ જ તેલ હોય છે જેનું નામ તેના પર લખ્યું છે. અમે તેલ ભેળવતા નથી, અને દરેક બેચની ડિસ્પેચ પહેલાં ચકાસણી થાય છે.",
    },
  },
  {
    category: "products",
    question: {
      en: "What pack sizes are available?",
      hi: "कौन-कौन से पैक साइज़ उपलब्ध हैं?",
      gu: "કયા કયા પેક સાઇઝ ઉપલબ્ધ છે?",
    },
    answer: {
      en: "Every oil comes in 1 L bottles, 5 L cans, 15 L tins and 15 kg tins.",
      hi: "हर तेल 1 लीटर बोतल, 5 लीटर कैन, 15 लीटर टिन और 15 किलो टिन में उपलब्ध है।",
      gu: "દરેક તેલ 1 લિટર બોટલ, 5 લિટર કેન, 15 લિટર ડબ્બા અને 15 કિલો ડબ્બામાં ઉપલબ્ધ છે.",
    },
  },
  {
    category: "health",
    question: {
      en: "Which oil should I choose?",
      hi: "मुझे कौन-सा तेल चुनना चाहिए?",
      gu: "મારે કયું તેલ પસંદ કરવું?",
    },
    answer: {
      en: "Groundnut oil suits traditional Gujarati cooking and farsan. Sunflower and corn oil are light choices for everyday meals. Cottonseed oil is popular for sweets, namkeen and commercial frying.",
      hi: "मूंगफली तेल पारंपरिक गुजराती खाने और नमकीन के लिए अच्छा है। सूरजमुखी और मक्के का तेल रोज़ के खाने के लिए हल्के विकल्प हैं। बिनौला तेल मिठाई, नमकीन और व्यावसायिक तलने के लिए लोकप्रिय है।",
      gu: "સીંગતેલ પરંપરાગત ગુજરાતી રસોઈ અને ફરસાણ માટે સારું છે. સૂરજમુખી અને મકાઈનું તેલ રોજના ભોજન માટે હળવા વિકલ્પ છે. કપાસિયા તેલ મીઠાઈ, નમકીન અને વ્યાવસાયિક તળણ માટે લોકપ્રિય છે.",
    },
  },
  {
    category: "health",
    question: {
      en: "Can I use these oils for deep frying?",
      hi: "क्या ये तेल डीप फ्राई के लिए इस्तेमाल कर सकते हैं?",
      gu: "શું આ તેલ તળવા માટે વાપરી શકાય?",
    },
    answer: {
      en: "Yes. All four oils have a high smoke point and are suited to frying. For long, high-heat frying in commercial kitchens, cottonseed oil is the usual choice.",
      hi: "हाँ। चारों तेलों का स्मोक पॉइंट ऊँचा है और ये तलने के लिए उपयुक्त हैं। व्यावसायिक रसोई में लंबे समय तक तेज़ आँच पर तलने के लिए आम तौर पर बिनौला तेल चुना जाता है।",
      gu: "હા. ચારેય તેલનો સ્મોક પોઇન્ટ ઊંચો છે અને તે તળવા માટે યોગ્ય છે. વ્યાવસાયિક રસોડામાં લાંબો સમય ઊંચા તાપે તળવા માટે સામાન્ય રીતે કપાસિયા તેલ પસંદ કરાય છે.",
    },
  },
  {
    category: "health",
    question: {
      en: "How should I store the oil, and how long does it last?",
      hi: "तेल को कैसे रखें और यह कितने समय तक चलता है?",
      gu: "તેલ કેવી રીતે સાચવવું અને તે કેટલો સમય ટકે છે?",
    },
    answer: {
      en: "Keep it in a cool, dry place away from sunlight with the cap closed. Shelf life is printed on each pack and is typically 9 to 12 months from packing.",
      hi: "इसे ठंडी, सूखी जगह पर, धूप से दूर और ढक्कन बंद करके रखें। शेल्फ़ लाइफ़ हर पैक पर छपी होती है और आम तौर पर पैकिंग से 9 से 12 महीने होती है।",
      gu: "તેને ઠંડી, સૂકી જગ્યાએ, તડકાથી દૂર અને ઢાંકણ બંધ રાખીને સાચવો. શેલ્ફ લાઇફ દરેક પેક પર છાપેલી હોય છે અને સામાન્ય રીતે પેકિંગથી 9 થી 12 મહિના હોય છે.",
    },
  },
  {
    category: "orders",
    question: {
      en: "What is the minimum order quantity for bulk orders?",
      hi: "थोक ऑर्डर के लिए न्यूनतम मात्रा कितनी है?",
      gu: "જથ્થાબંધ ઓર્ડર માટે લઘુત્તમ જથ્થો કેટલો છે?",
    },
    answer: {
      en: "The minimum bulk order is 50 tins of 15 L or 15 kg. Pricing is shared on request: send an enquiry from the Bulk Orders page or message us on WhatsApp.",
      hi: "थोक ऑर्डर की न्यूनतम मात्रा 15 लीटर या 15 किलो के 50 टिन है। दाम पूछताछ पर बताए जाते हैं: थोक ऑर्डर पेज से पूछताछ भेजें या व्हाट्सऐप पर संदेश करें।",
      gu: "જથ્થાબંધ ઓર્ડરનો લઘુત્તમ જથ્થો 15 લિટર કે 15 કિલોના 50 ડબ્બા છે. ભાવ પૂછપરછ પર જણાવાય છે: જથ્થાબંધ ઓર્ડર પેજ પરથી પૂછપરછ મોકલો અથવા વોટ્સએપ પર સંદેશ કરો.",
    },
  },
  {
    category: "orders",
    question: {
      en: "Do you deliver across India?",
      hi: "क्या आप पूरे भारत में डिलीवरी करते हैं?",
      gu: "શું તમે સમગ્ર ભારતમાં ડિલિવરી કરો છો?",
    },
    answer: {
      en: "Yes, we deliver bulk orders across India. Delivery time and freight depend on your location and order size.",
      hi: "हाँ, हम पूरे भारत में थोक ऑर्डर पहुँचाते हैं। डिलीवरी का समय और भाड़ा आपके स्थान और ऑर्डर की मात्रा पर निर्भर करता है।",
      gu: "હા, અમે સમગ્ર ભારતમાં જથ્થાબંધ ઓર્ડર પહોંચાડીએ છીએ. ડિલિવરીનો સમય અને ભાડું તમારા સ્થળ અને ઓર્ડરના જથ્થા પર આધાર રાખે છે.",
    },
  },
  {
    category: "orders",
    question: {
      en: "How can I become a distributor or dealer?",
      hi: "मैं डिस्ट्रीब्यूटर या डीलर कैसे बन सकता हूँ?",
      gu: "હું ડિસ્ટ્રિબ્યુટર કે ડીલર કેવી રીતે બની શકું?",
    },
    answer: {
      en: "Fill in the form on the Become a Distributor page with your firm and area details. Our team will contact you to discuss terms for your territory.",
      hi: "डिस्ट्रीब्यूटर बनें पेज पर अपनी फ़र्म और क्षेत्र की जानकारी के साथ फ़ॉर्म भरें। हमारी टीम आपके क्षेत्र की शर्तों पर बात करने के लिए आपसे संपर्क करेगी।",
      gu: "ડિસ્ટ્રિબ્યુટર બનો પેજ પર તમારી પેઢી અને વિસ્તારની વિગતો સાથે ફોર્મ ભરો. અમારી ટીમ તમારા વિસ્તારની શરતો વિશે વાત કરવા તમારો સંપર્ક કરશે.",
    },
  },
];

/* ============================================================================
 * 10. TESTIMONIALS
 * ========================================================================== */

/** Customer reviews on the home page. The section is hidden while this is empty. */
export const testimonials: Testimonial[] = []; // TODO: add real customer reviews only

/* ============================================================================
 * 11. FORM OPTIONS
 * ========================================================================== */

export const orderFrequencies: Option[] = [
  { id: "one-time", label: { en: "One-time", hi: "एक बार", gu: "એક વાર" } },
  { id: "weekly", label: { en: "Weekly", hi: "साप्ताहिक", gu: "સાપ્તાહિક" } },
  { id: "monthly", label: { en: "Monthly", hi: "मासिक", gu: "માસિક" } },
  { id: "quarterly", label: { en: "Quarterly", hi: "त्रैमासिक", gu: "ત્રિમાસિક" } },
]; // TODO: replace

export const investmentRanges: Option[] = [
  { id: "under-5-lakh", label: { en: "Under ₹5 lakh", hi: "₹5 लाख से कम", gu: "₹5 લાખથી ઓછું" } },
  { id: "5-10-lakh", label: { en: "₹5–10 lakh", hi: "₹5–10 लाख", gu: "₹5–10 લાખ" } },
  { id: "10-25-lakh", label: { en: "₹10–25 lakh", hi: "₹10–25 लाख", gu: "₹10–25 લાખ" } },
  {
    id: "above-25-lakh",
    label: { en: "Above ₹25 lakh", hi: "₹25 लाख से अधिक", gu: "₹25 લાખથી વધુ" },
  },
]; // TODO: replace

/* ============================================================================
 * 12. LEGAL PAGES
 * ========================================================================== */

export const legal = {
  lastUpdated: "2026-11-17",
  privacy: [
    {
      heading: {
        en: "Information we collect",
        hi: "हम कौन-सी जानकारी लेते हैं",
        gu: "અમે કઈ માહિતી લઈએ છીએ",
      },
      body: {
        en: "When you submit a form on this website we collect the details you enter, such as your name, phone number, email address, company and message.",
        hi: "जब आप इस वेबसाइट पर कोई फ़ॉर्म भेजते हैं, तो हम आपकी भरी हुई जानकारी लेते हैं, जैसे नाम, फ़ोन नंबर, ईमेल, कंपनी और संदेश।",
        gu: "જ્યારે તમે આ વેબસાઇટ પર કોઈ ફોર્મ મોકલો છો, ત્યારે અમે તમે ભરેલી વિગતો લઈએ છીએ, જેમ કે નામ, ફોન નંબર, ઇમેઇલ, કંપની અને સંદેશ.",
      },
    },
    {
      heading: {
        en: "How we use it",
        hi: "हम इसका उपयोग कैसे करते हैं",
        gu: "અમે તેનો ઉપયોગ કેવી રીતે કરીએ છીએ",
      },
      body: {
        en: "We use your details only to respond to your enquiry, prepare quotations and process orders. We do not sell your information.",
        hi: "हम आपकी जानकारी का उपयोग केवल आपकी पूछताछ का जवाब देने, कोटेशन बनाने और ऑर्डर पूरा करने के लिए करते हैं। हम आपकी जानकारी बेचते नहीं हैं।",
        gu: "અમે તમારી વિગતોનો ઉપયોગ ફક્ત તમારી પૂછપરછનો જવાબ આપવા, કોટેશન બનાવવા અને ઓર્ડર પૂરો કરવા માટે કરીએ છીએ. અમે તમારી માહિતી વેચતા નથી.",
      },
    },
    {
      heading: { en: "Cookies", hi: "कुकीज़", gu: "કૂકીઝ" },
      body: {
        en: "This website stores one cookie to remember your language choice.",
        hi: "यह वेबसाइट आपकी भाषा की पसंद याद रखने के लिए एक कुकी रखती है।",
        gu: "આ વેબસાઇટ તમારી ભાષાની પસંદગી યાદ રાખવા માટે એક કૂકી રાખે છે.",
      },
    },
    {
      heading: { en: "Contact", hi: "संपर्क", gu: "સંપર્ક" },
      body: {
        en: "To ask about, correct or delete your information, write to us at the email address on the Contact page.",
        hi: "अपनी जानकारी के बारे में पूछने, उसे सुधारने या हटवाने के लिए, संपर्क पेज पर दिए ईमेल पर हमें लिखें।",
        gu: "તમારી માહિતી વિશે પૂછવા, તેને સુધારવા કે કઢાવવા માટે, સંપર્ક પેજ પર આપેલા ઇમેઇલ પર અમને લખો.",
      },
    },
  ] as LegalSection[], // TODO: replace (have this reviewed by a legal professional)
  terms: [
    {
      heading: { en: "Use of this website", hi: "इस वेबसाइट का उपयोग", gu: "આ વેબસાઇટનો ઉપયોગ" },
      body: {
        en: "This website provides information about our products and lets you send enquiries. By using it you agree to these terms.",
        hi: "यह वेबसाइट हमारे उत्पादों की जानकारी देती है और आपको पूछताछ भेजने की सुविधा देती है। इसका उपयोग करके आप इन शर्तों से सहमत होते हैं।",
        gu: "આ વેબસાઇટ અમારાં ઉત્પાદનોની માહિતી આપે છે અને તમને પૂછપરછ મોકલવાની સગવડ આપે છે. તેનો ઉપયોગ કરીને તમે આ શરતો સાથે સંમત થાઓ છો.",
      },
    },
    {
      heading: { en: "Product information", hi: "उत्पाद की जानकारी", gu: "ઉત્પાદનની માહિતી" },
      body: {
        en: "Product details, images and nutrition values are indicative. Please refer to the pack label for exact information.",
        hi: "उत्पाद का विवरण, चित्र और पोषण मान सांकेतिक हैं। सटीक जानकारी के लिए कृपया पैक का लेबल देखें।",
        gu: "ઉત્પાદનની વિગતો, ચિત્રો અને પોષણ મૂલ્યો સૂચક છે. ચોક્કસ માહિતી માટે કૃપા કરીને પેકનું લેબલ જુઓ.",
      },
    },
    {
      heading: { en: "Enquiries and quotations", hi: "पूछताछ और कोटेशन", gu: "પૂછપરછ અને કોટેશન" },
      body: {
        en: "Submitting an enquiry does not create an order. Prices, quantities and delivery terms are confirmed only in a written quotation from us.",
        hi: "पूछताछ भेजने से ऑर्डर नहीं बनता। दाम, मात्रा और डिलीवरी की शर्तें केवल हमारे लिखित कोटेशन में ही तय होती हैं।",
        gu: "પૂછપરછ મોકલવાથી ઓર્ડર બનતો નથી. ભાવ, જથ્થો અને ડિલિવરીની શરતો ફક્ત અમારા લેખિત કોટેશનમાં જ નક્કી થાય છે.",
      },
    },
    {
      heading: { en: "Governing law", hi: "लागू क़ानून", gu: "લાગુ કાયદો" },
      body: {
        en: "These terms are governed by the laws of India.",
        hi: "ये शर्तें भारत के क़ानूनों के अधीन हैं।",
        gu: "આ શરતો ભારતના કાયદાઓને આધીન છે.",
      },
    },
  ] as LegalSection[], // TODO: replace (have this reviewed by a legal professional)
};

/* ============================================================================
 * DERIVED HELPERS (no content below this line)
 * ========================================================================== */

/**
 * Site URL without a trailing slash. Order: NEXT_PUBLIC_SITE_URL, then the production
 * domain Vercel provides (your custom domain once it is added there), then siteConfig.siteUrl.
 * Share previews and canonical links depend on this pointing at the live site.
 */
export function getSiteUrl(): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url =
    process.env.NEXT_PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : "") || siteConfig.siteUrl;
  return url.replace(/\/+$/, "");
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function whatsappUrl(locale: string, message?: string): string {
  const text = message ?? t(siteConfig.whatsappMessage, locale);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telUrl(): string {
  return `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
}

export function formatAddress(locale: string): string[] {
  const a = siteConfig.address;
  return [
    t(a.line1, locale),
    t(a.line2, locale),
    `${t(a.city, locale)}, ${t(a.state, locale)} ${a.pincode}`,
    t(siteConfig.location.country, locale),
  ];
}
