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
  images: { src: string; alt: Localized<string> }[];
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

const PLACEHOLDER = "/images/placeholders"; // TODO: replace placeholder images with real photos

/* ============================================================================
 * 2. BRAND AND CONTACT
 * ========================================================================== */

export const siteConfig = {
  brandName: { en: "Brand Name", hi: "ब्रांड नाम", gu: "બ્રાન્ડ નામ" } as Localized<string>, // TODO: replace
  tagline: {
    en: "Your Tagline Here",
    hi: "आपकी टैगलाइन यहाँ",
    gu: "તમારી ટેગલાઇન અહીં",
  } as Localized<string>, // TODO: replace
  description: {
    en: "Short brand description for SEO and footer.",
    hi: "एसईओ और फ़ुटर के लिए ब्रांड का संक्षिप्त परिचय।",
    gu: "SEO અને ફૂટર માટે બ્રાન્ડનું ટૂંકું વર્ણન.",
  } as Localized<string>, // TODO: replace
  establishedYear: 2000, // TODO: replace
  location: {
    city: { en: "City", hi: "शहर", gu: "શહેર" } as Localized<string>, // TODO: replace
    state: { en: "State", hi: "राज्य", gu: "રાજ્ય" } as Localized<string>, // TODO: replace
    country: { en: "India", hi: "भारत", gu: "ભારત" } as Localized<string>,
  },
  address: {
    line1: {
      en: "Factory Address Line 1",
      hi: "फ़ैक्टरी का पता, पंक्ति 1",
      gu: "ફેક્ટરીનું સરનામું, લાઇન 1",
    } as Localized<string>, // TODO: replace
    line2: {
      en: "Industrial Area",
      hi: "औद्योगिक क्षेत्र",
      gu: "ઔદ્યોગિક વિસ્તાર",
    } as Localized<string>, // TODO: replace
    city: { en: "City", hi: "शहर", gu: "શહેર" } as Localized<string>, // TODO: replace
    state: { en: "State", hi: "राज्य", gu: "રાજ્ય" } as Localized<string>, // TODO: replace
    pincode: "000000", // TODO: replace
  },
  /** Google Maps "Embed a map" src URL. Leave empty to show a placeholder box. */
  mapEmbedUrl: "", // TODO: replace
  phone: "+91 00000 00000", // TODO: replace
  /** Digits only, with country code, for wa.me links. */
  whatsapp: "910000000000", // TODO: replace
  whatsappMessage: {
    en: "Hi, I'd like to enquire about your groundnut oil.",
    hi: "नमस्ते, मुझे आपके मूंगफली तेल के बारे में जानकारी चाहिए।",
    gu: "નમસ્તે, મારે તમારા સીંગતેલ વિશે પૂછપરછ કરવી છે.",
  } as Localized<string>, // TODO: replace
  emails: {
    info: "info@example.com", // TODO: replace
    sales: "sales@example.com", // TODO: replace
  },
  businessHours: {
    en: "Mon–Sat, 9:00 AM – 7:00 PM",
    hi: "सोम–शनि, सुबह 9:00 – शाम 7:00",
    gu: "સોમ–શનિ, સવારે 9:00 – સાંજે 7:00",
  } as Localized<string>, // TODO: replace
  certifications: {
    fssai: "00000000000000", // TODO: replace
    gst: "00XXXXX0000X0X0", // TODO: replace
    others: ["ISO 22000", "AGMARK"], // TODO: replace
  },
  stats: [
    { label: { en: "Years Experience", hi: "वर्षों का अनुभव", gu: "વર્ષનો અનુભવ" }, value: "00+" }, // TODO: replace
    {
      label: { en: "Tonnes/Day Capacity", hi: "टन/दिन क्षमता", gu: "ટન/દિવસ ક્ષમતા" },
      value: "00", // TODO: replace
    },
    { label: { en: "Dealers", hi: "डीलर", gu: "ડીલર" }, value: "000+" }, // TODO: replace
    { label: { en: "Happy Families", hi: "संतुष्ट परिवार", gu: "સંતુષ્ટ પરિવારો" }, value: "0000+" }, // TODO: replace
  ] as Stat[],
  social: {
    instagram: "#", // TODO: replace
    facebook: "#", // TODO: replace
    youtube: "#", // TODO: replace
    linkedin: "#", // TODO: replace
  },
  b2b: {
    moq: {
      en: "Minimum order quantity placeholder",
      hi: "न्यूनतम ऑर्डर मात्रा (प्लेसहोल्डर)",
      gu: "લઘુત્તમ ઓર્ડર જથ્થો (પ્લેસહોલ્ડર)",
    } as Localized<string>, // TODO: replace
    delivery: {
      en: "Pan-India delivery",
      hi: "पूरे भारत में डिलीवरी",
      gu: "સમગ્ર ભારતમાં ડિલિવરી",
    } as Localized<string>, // TODO: replace
  },
  /** Overridden by NEXT_PUBLIC_SITE_URL when that env var is set. */
  siteUrl: "https://example.com", // TODO: replace
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
  "1l": { en: "1 L", hi: "1 लीटर", gu: "1 લિટર" },
  "5l": { en: "5 L", hi: "5 लीटर", gu: "5 લિટર" },
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

/** Typical values for groundnut oil per 100 g. TODO: replace with your lab report values. */
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
    slug: "cold-pressed-groundnut-oil",
    name: {
      en: "Cold-Pressed (Wood-Pressed / Kachi Ghani) Groundnut Oil",
      hi: "कोल्ड-प्रेस्ड (लकड़ी घानी / कच्ची घानी) मूंगफली तेल",
      gu: "કોલ્ડ-પ્રેસ્ડ (લાકડાની ઘાણી / કાચી ઘાણી) સીંગતેલ",
    }, // TODO: replace
    shortDescription: {
      en: "Slow-pressed at low temperature to keep the natural aroma, colour and nutrients of the groundnut.",
      hi: "कम तापमान पर धीरे-धीरे निकाला गया तेल, जिसमें मूंगफली की प्राकृतिक सुगंध, रंग और पोषक तत्व बने रहते हैं।",
      gu: "ઓછા તાપમાને ધીમે ધીમે પીલેલું તેલ, જેમાં સીંગની કુદરતી સુગંધ, રંગ અને પોષક તત્ત્વો જળવાઈ રહે છે.",
    }, // TODO: replace
    longDescription: {
      en: "Our cold-pressed groundnut oil is extracted in a traditional wooden ghani without external heat or chemicals. The result is a golden, nutty oil with nothing added and nothing taken away, the way it has been made for generations.",
      hi: "हमारा कोल्ड-प्रेस्ड मूंगफली तेल पारंपरिक लकड़ी की घानी में, बिना बाहरी गर्मी या रसायनों के निकाला जाता है। नतीजा है सुनहरा, सोंधी महक वाला तेल, जिसमें न कुछ मिलाया गया है और न कुछ निकाला गया है, ठीक वैसा जैसा पीढ़ियों से बनता आया है।",
      gu: "અમારું કોલ્ડ-પ્રેસ્ડ સીંગતેલ પરંપરાગત લાકડાની ઘાણીમાં, બહારની ગરમી કે રસાયણો વગર કાઢવામાં આવે છે. પરિણામે મળે છે સોનેરી, સીંગની મીઠી સુગંધવાળું તેલ, જેમાં કશું ઉમેર્યું નથી અને કશું કાઢ્યું નથી, પેઢીઓથી બનતું આવ્યું છે એવું જ.",
    }, // TODO: replace
    type: "cold-pressed",
    packSizes: ["500ml", "1l", "5l", "15l-tin", "15kg-tin"],
    nutrition: oilNutrition("17 g", "46 g", "32 g", "15.7 mg"), // TODO: replace
    uses: {
      en: [
        "Everyday cooking and tadka",
        "Traditional sweets and farsan",
        "Pickles",
        "Salad dressing",
      ],
      hi: ["रोज़ का खाना और तड़का", "पारंपरिक मिठाइयाँ और नमकीन", "अचार", "सलाद ड्रेसिंग"],
      gu: ["રોજની રસોઈ અને વઘાર", "પરંપરાગત મીઠાઈ અને ફરસાણ", "અથાણાં", "સલાડ ડ્રેસિંગ"],
    }, // TODO: replace
    shelfLife: {
      en: "9 months from the date of packing",
      hi: "पैकिंग की तारीख से 9 महीने",
      gu: "પેકિંગની તારીખથી 9 મહિના",
    }, // TODO: replace
    storage: OIL_STORAGE,
    images: [
      {
        src: `${PLACEHOLDER}/product-cold-pressed.svg`, // TODO: replace
        alt: {
          en: "Bottle of cold-pressed groundnut oil",
          hi: "कोल्ड-प्रेस्ड मूंगफली तेल की बोतल",
          gu: "કોલ્ડ-પ્રેસ્ડ સીંગતેલની બોટલ",
        },
      },
      {
        src: `${PLACEHOLDER}/product-cold-pressed-2.svg`, // TODO: replace
        alt: {
          en: "Cold-pressed groundnut oil being poured",
          hi: "कोल्ड-प्रेस्ड मूंगफली तेल डालते हुए",
          gu: "કોલ્ડ-પ્રેસ્ડ સીંગતેલ રેડાતું દૃશ્ય",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "filtered-groundnut-oil",
    name: { en: "Filtered Groundnut Oil", hi: "फ़िल्टर्ड मूंगफली तेल", gu: "ફિલ્ટર્ડ સીંગતેલ" }, // TODO: replace
    shortDescription: {
      en: "Expeller-pressed and double filtered for a clear oil with a rich groundnut taste.",
      hi: "एक्सपेलर से निकाला और दो बार छाना गया साफ़ तेल, मूंगफली के भरपूर स्वाद के साथ।",
      gu: "એક્સપેલરથી પીલેલું અને બે વાર ગાળેલું ચોખ્ખું તેલ, સીંગના ભરપૂર સ્વાદ સાથે.",
    }, // TODO: replace
    longDescription: {
      en: "Filtered groundnut oil is pressed from graded seeds and passed through cloth filters to remove sediment, without chemical refining. It keeps its natural flavour and suits daily cooking and deep frying.",
      hi: "फ़िल्टर्ड मूंगफली तेल छँटे हुए दानों से निकाला जाता है और कपड़े के फ़िल्टर से छानकर तलछट हटाई जाती है, बिना किसी रासायनिक रिफ़ाइनिंग के। इसका प्राकृतिक स्वाद बना रहता है और यह रोज़ के खाने और तलने के लिए उपयुक्त है।",
      gu: "ફિલ્ટર્ડ સીંગતેલ ગ્રેડ કરેલા દાણામાંથી પીલવામાં આવે છે અને કાપડના ફિલ્ટરથી ગાળીને કચરો દૂર કરાય છે, કોઈ રાસાયણિક રિફાઇનિંગ વગર. તેનો કુદરતી સ્વાદ જળવાઈ રહે છે અને તે રોજની રસોઈ તથા તળવા માટે યોગ્ય છે.",
    }, // TODO: replace
    type: "filtered",
    packSizes: ["1l", "5l", "15l-tin", "15kg-tin", "bulk"],
    nutrition: oilNutrition("17 g", "46 g", "32 g", "14 mg"), // TODO: replace
    uses: {
      en: ["Daily cooking", "Deep frying", "Farsan and snacks", "Restaurant and catering kitchens"],
      hi: ["रोज़ का खाना", "डीप फ्राई", "नमकीन और स्नैक्स", "रेस्टोरेंट और कैटरिंग रसोई"],
      gu: ["રોજની રસોઈ", "તળવા માટે", "ફરસાણ અને નાસ્તા", "રેસ્ટોરન્ટ અને કેટરિંગ રસોડાં"],
    }, // TODO: replace
    shelfLife: {
      en: "9 months from the date of packing",
      hi: "पैकिंग की तारीख से 9 महीने",
      gu: "પેકિંગની તારીખથી 9 મહિના",
    }, // TODO: replace
    storage: OIL_STORAGE,
    images: [
      {
        src: `${PLACEHOLDER}/product-filtered.svg`, // TODO: replace
        alt: {
          en: "Tin of filtered groundnut oil",
          hi: "फ़िल्टर्ड मूंगफली तेल का टिन",
          gu: "ફિલ્ટર્ડ સીંગતેલનો ડબ્બો",
        },
      },
      {
        src: `${PLACEHOLDER}/product-filtered-2.svg`, // TODO: replace
        alt: {
          en: "Filtered groundnut oil pack sizes",
          hi: "फ़िल्टर्ड मूंगफली तेल के पैक साइज़",
          gu: "ફિલ્ટર્ડ સીંગતેલના પેક સાઇઝ",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "refined-groundnut-oil",
    name: { en: "Refined Groundnut Oil", hi: "रिफ़ाइंड मूंगफली तेल", gu: "રિફાઇન્ડ સીંગતેલ" }, // TODO: replace
    shortDescription: {
      en: "Light, neutral-tasting oil with a high smoke point, suited to high-heat cooking.",
      hi: "हल्का, सादे स्वाद वाला तेल जिसका स्मोक पॉइंट ऊँचा है, तेज़ आँच पर पकाने के लिए उपयुक्त।",
      gu: "હળવું, સાદા સ્વાદવાળું તેલ જેનો સ્મોક પોઇન્ટ ઊંચો છે, વધુ તાપે રાંધવા માટે યોગ્ય.",
    }, // TODO: replace
    longDescription: {
      en: "Refined groundnut oil goes through a controlled refining process for a clear, light oil with a long shelf life. Its high smoke point makes it a dependable choice for frying in homes and commercial kitchens.",
      hi: "रिफ़ाइंड मूंगफली तेल नियंत्रित रिफ़ाइनिंग प्रक्रिया से गुज़रता है, जिससे साफ़, हल्का और लंबे समय तक चलने वाला तेल मिलता है। ऊँचे स्मोक पॉइंट के कारण यह घरों और व्यावसायिक रसोई में तलने के लिए भरोसेमंद विकल्प है।",
      gu: "રિફાઇન્ડ સીંગતેલ નિયંત્રિત રિફાઇનિંગ પ્રક્રિયામાંથી પસાર થાય છે, જેથી ચોખ્ખું, હળવું અને લાંબો સમય ટકે એવું તેલ મળે છે. ઊંચા સ્મોક પોઇન્ટને કારણે તે ઘર અને વ્યાવસાયિક રસોડામાં તળવા માટે ભરોસાપાત્ર પસંદગી છે.",
    }, // TODO: replace
    type: "refined",
    packSizes: ["500ml", "1l", "5l", "15l-tin", "15kg-tin", "bulk"],
    nutrition: oilNutrition("18 g", "48 g", "30 g", "11 mg"), // TODO: replace
    uses: {
      en: ["Deep frying", "Stir-frying and sautéing", "Baking", "Commercial food production"],
      hi: ["डीप फ्राई", "भूनना और हल्का तलना", "बेकिंग", "व्यावसायिक खाद्य उत्पादन"],
      gu: ["તળવા માટે", "સાંતળવા અને શેકવા", "બેકિંગ", "વ્યાવસાયિક ખાદ્ય ઉત્પાદન"],
    }, // TODO: replace
    shelfLife: {
      en: "12 months from the date of packing",
      hi: "पैकिंग की तारीख से 12 महीने",
      gu: "પેકિંગની તારીખથી 12 મહિના",
    }, // TODO: replace
    storage: OIL_STORAGE,
    images: [
      {
        src: `${PLACEHOLDER}/product-refined.svg`, // TODO: replace
        alt: {
          en: "Bottle of refined groundnut oil",
          hi: "रिफ़ाइंड मूंगफली तेल की बोतल",
          gu: "રિફાઇન્ડ સીંગતેલની બોટલ",
        },
      },
      {
        src: `${PLACEHOLDER}/product-refined-2.svg`, // TODO: replace
        alt: {
          en: "Refined groundnut oil pack sizes",
          hi: "रिफ़ाइंड मूंगफली तेल के पैक साइज़",
          gu: "રિફાઇન્ડ સીંગતેલના પેક સાઇઝ",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "groundnut-oil-cake",
    name: { en: "Groundnut Oil Cake", hi: "मूंगफली खली", gu: "સીંગખોળ" }, // TODO: replace
    shortDescription: {
      en: "Protein-rich cake left after pressing, used as cattle feed and organic manure.",
      hi: "तेल निकालने के बाद बची प्रोटीन से भरपूर खली, पशु आहार और जैविक खाद के रूप में उपयोगी।",
      gu: "તેલ કાઢ્યા પછી બચેલો પ્રોટીનથી ભરપૂર ખોળ, પશુઆહાર અને સેન્દ્રિય ખાતર તરીકે ઉપયોગી.",
    }, // TODO: replace
    longDescription: {
      en: "Groundnut oil cake is the solid that remains once oil is pressed from the seed. It is high in protein and is supplied in bulk to dairies, feed manufacturers and farmers.",
      hi: "मूंगफली खली वह ठोस भाग है जो दानों से तेल निकालने के बाद बचता है। इसमें प्रोटीन भरपूर होता है और इसे डेयरियों, पशु आहार निर्माताओं और किसानों को थोक में दिया जाता है।",
      gu: "સીંગખોળ એ દાણામાંથી તેલ કાઢ્યા પછી બચતો ઘન ભાગ છે. તેમાં પ્રોટીન ભરપૂર હોય છે અને તે ડેરીઓ, પશુઆહાર ઉત્પાદકો અને ખેડૂતોને જથ્થાબંધ આપવામાં આવે છે.",
    }, // TODO: replace
    type: "by-product",
    packSizes: ["bulk"],
    nutrition: [
      { label: N.energy, value: "370 kcal" },
      { label: N.protein, value: "45 g" },
      { label: N.fat, value: "7 g" },
      { label: N.carbs, value: "25 g" },
      { label: N.fibre, value: "8 g" },
    ], // TODO: replace
    uses: {
      en: ["Cattle and poultry feed", "Organic manure", "Feed manufacturing"],
      hi: ["पशु और मुर्गी आहार", "जैविक खाद", "पशु आहार निर्माण"],
      gu: ["પશુ અને મરઘાં આહાર", "સેન્દ્રિય ખાતર", "પશુઆહાર ઉત્પાદન"],
    }, // TODO: replace
    shelfLife: {
      en: "6 months from the date of packing",
      hi: "पैकिंग की तारीख से 6 महीने",
      gu: "પેકિંગની તારીખથી 6 મહિના",
    }, // TODO: replace
    storage: {
      en: "Store in a dry, well-ventilated place, off the floor and away from moisture.",
      hi: "सूखी और हवादार जगह पर, फ़र्श से ऊपर और नमी से दूर रखें।",
      gu: "સૂકી અને હવાઉજાસવાળી જગ્યાએ, જમીનથી ઊંચે અને ભેજથી દૂર રાખો.",
    }, // TODO: replace
    images: [
      {
        src: `${PLACEHOLDER}/product-oil-cake.svg`, // TODO: replace
        alt: { en: "Groundnut oil cake", hi: "मूंगफली खली", gu: "સીંગખોળ" },
      },
      {
        src: `${PLACEHOLDER}/product-oil-cake-2.svg`, // TODO: replace
        alt: {
          en: "Bags of groundnut oil cake",
          hi: "मूंगफली खली की बोरियाँ",
          gu: "સીંગખોળની ગૂણીઓ",
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
  src: `${PLACEHOLDER}/hero-product.svg`, // TODO: replace
  alt: {
    en: "Groundnut oil bottle with groundnuts",
    hi: "मूंगफली के साथ मूंगफली तेल की बोतल",
    gu: "સીંગદાણા સાથે સીંગતેલની બોટલ",
  } as Localized<string>,
};

export const whyChooseUs: Feature[] = [
  {
    icon: "droplet",
    title: { en: "100% Pure", hi: "100% शुद्ध", gu: "100% શુદ્ધ" },
    description: {
      en: "Only groundnut oil in every pack. No blending, no additives, no argemone or palm oil.",
      hi: "हर पैक में सिर्फ़ मूंगफली का तेल। न मिलावट, न एडिटिव, न पाम या कोई दूसरा तेल।",
      gu: "દરેક પેકમાં ફક્ત સીંગતેલ. કોઈ ભેળસેળ નહીં, કોઈ એડિટિવ નહીં, પામ કે બીજું કોઈ તેલ નહીં.",
    }, // TODO: replace
  },
  {
    icon: "leaf",
    title: { en: "Traditional Process", hi: "पारंपरिक प्रक्रिया", gu: "પરંપરાગત પ્રક્રિયા" },
    description: {
      en: "Pressed the way our elders did it, with modern hygiene at every step.",
      hi: "तेल वैसे ही निकाला जाता है जैसे हमारे बुज़ुर्ग निकालते थे, हर चरण में आधुनिक स्वच्छता के साथ।",
      gu: "તેલ એ જ રીતે પીલાય છે જે રીતે આપણા વડીલો પીલતા હતા, દરેક પગલે આધુનિક સ્વચ્છતા સાથે.",
    }, // TODO: replace
  },
  {
    icon: "clock",
    title: { en: "Always Fresh", hi: "हमेशा ताज़ा", gu: "હંમેશાં તાજું" },
    description: {
      en: "Pressed in small batches and packed soon after, so the oil reaches you fresh.",
      hi: "छोटे बैच में निकाला और तुरंत पैक किया जाता है, ताकि तेल आप तक ताज़ा पहुँचे।",
      gu: "નાના બેચમાં પીલીને તરત પેક કરવામાં આવે છે, જેથી તેલ તમારા સુધી તાજું પહોંચે.",
    }, // TODO: replace
  },
  {
    icon: "shield",
    title: { en: "Certified Quality", hi: "प्रमाणित गुणवत्ता", gu: "પ્રમાણિત ગુણવત્તા" },
    description: {
      en: "FSSAI licensed, with every batch tested before it leaves the factory.",
      hi: "FSSAI लाइसेंस प्राप्त, और हर बैच फ़ैक्टरी से निकलने से पहले जाँचा जाता है।",
      gu: "FSSAI લાઇસન્સ ધરાવતું, અને દરેક બેચ ફેક્ટરીમાંથી નીકળતા પહેલાં ચકાસવામાં આવે છે.",
    }, // TODO: replace
  },
];

/* ============================================================================
 * 5. PROCESS STEPS
 * ========================================================================== */

export const processSteps: ProcessStep[] = [
  {
    icon: "sprout",
    title: { en: "Seed Sourcing", hi: "बीज की ख़रीद", gu: "દાણાની ખરીદી" },
    description: {
      en: "We buy bold, mature groundnuts directly from trusted farmers and market yards in the growing region.",
      hi: "हम मोटे, पके हुए मूंगफली के दाने सीधे भरोसेमंद किसानों और मंडियों से ख़रीदते हैं।",
      gu: "અમે જાડા, પાકા સીંગદાણા સીધા ભરોસાપાત્ર ખેડૂતો અને માર્કેટ યાર્ડમાંથી ખરીદીએ છીએ.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/process-1.svg`, // TODO: replace
  },
  {
    icon: "filter",
    title: { en: "Cleaning & Grading", hi: "सफ़ाई और छँटाई", gu: "સફાઈ અને ગ્રેડિંગ" },
    description: {
      en: "Seeds are cleaned of dust, stones and damaged kernels, then graded by size and quality.",
      hi: "दानों से धूल, कंकड़ और ख़राब दाने हटाए जाते हैं, फिर आकार और गुणवत्ता के अनुसार छँटाई होती है।",
      gu: "દાણામાંથી ધૂળ, કાંકરા અને બગડેલા દાણા દૂર કરાય છે, પછી કદ અને ગુણવત્તા પ્રમાણે ગ્રેડિંગ થાય છે.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/process-2.svg`, // TODO: replace
  },
  {
    icon: "cog",
    title: { en: "Pressing", hi: "पेराई", gu: "પીલાણ" },
    description: {
      en: "Graded seeds are pressed slowly so the oil keeps its natural aroma and nutrients.",
      hi: "छँटे हुए दानों की धीरे-धीरे पेराई होती है, ताकि तेल की प्राकृतिक सुगंध और पोषक तत्व बने रहें।",
      gu: "ગ્રેડ કરેલા દાણા ધીમે ધીમે પીલવામાં આવે છે, જેથી તેલની કુદરતી સુગંધ અને પોષક તત્ત્વો જળવાઈ રહે.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/process-3.svg`, // TODO: replace
  },
  {
    icon: "droplet",
    title: { en: "Filtration", hi: "छनाई", gu: "ગાળણ" },
    description: {
      en: "The oil settles naturally and passes through cloth filters to remove fine sediment.",
      hi: "तेल को प्राकृतिक रूप से थिरने दिया जाता है और कपड़े के फ़िल्टर से छानकर बारीक तलछट हटाई जाती है।",
      gu: "તેલને કુદરતી રીતે ઠરવા દેવાય છે અને કાપડના ફિલ્ટરથી ગાળીને ઝીણો કચરો દૂર કરાય છે.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/process-4.svg`, // TODO: replace
  },
  {
    icon: "package",
    title: { en: "Packing", hi: "पैकिंग", gu: "પેકિંગ" },
    description: {
      en: "Oil is filled into food-grade bottles, jars and tins on a hygienic line and sealed against tampering.",
      hi: "तेल को स्वच्छ लाइन पर फ़ूड-ग्रेड बोतलों, जार और टिन में भरकर सील किया जाता है।",
      gu: "તેલને સ્વચ્છ લાઇન પર ફૂડ-ગ્રેડ બોટલ, જાર અને ડબ્બામાં ભરીને સીલ કરવામાં આવે છે.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/process-5.svg`, // TODO: replace
  },
  {
    icon: "flask",
    title: { en: "Quality Check", hi: "गुणवत्ता जाँच", gu: "ગુણવત્તા ચકાસણી" },
    description: {
      en: "Every batch is tested for purity, moisture and acidity before dispatch, and samples are retained.",
      hi: "हर बैच की शुद्धता, नमी और अम्लता की जाँच डिस्पैच से पहले होती है, और नमूने सुरक्षित रखे जाते हैं।",
      gu: "દરેક બેચની શુદ્ધતા, ભેજ અને એસિડિટીની ચકાસણી ડિસ્પેચ પહેલાં થાય છે, અને નમૂના સાચવી રાખવામાં આવે છે.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/process-6.svg`, // TODO: replace
  },
];

/* ============================================================================
 * 6. ABOUT PAGE
 * ========================================================================== */

export const about = {
  story: {
    en: [
      "Placeholder story, paragraph one. Describe how the business started, who started it and why groundnut oil.",
      "Placeholder story, paragraph two. Describe how the business has grown and what has stayed the same.",
    ],
    hi: [
      "प्लेसहोल्डर कहानी, पहला अनुच्छेद। बताइए कि व्यवसाय कैसे शुरू हुआ, किसने शुरू किया और मूंगफली तेल ही क्यों।",
      "प्लेसहोल्डर कहानी, दूसरा अनुच्छेद। बताइए कि व्यवसाय कैसे बढ़ा और क्या आज भी वैसा ही है।",
    ],
    gu: [
      "પ્લેસહોલ્ડર વાર્તા, પહેલો ફકરો. જણાવો કે વ્યવસાય કેવી રીતે શરૂ થયો, કોણે શરૂ કર્યો અને સીંગતેલ જ કેમ.",
      "પ્લેસહોલ્ડર વાર્તા, બીજો ફકરો. જણાવો કે વ્યવસાય કેવી રીતે વધ્યો અને આજે પણ શું એવું ને એવું છે.",
    ],
  } as Localized<string[]>, // TODO: replace
  storyImage: `${PLACEHOLDER}/about-story.svg`, // TODO: replace
  mission: {
    en: "Placeholder mission: to bring pure, honestly made groundnut oil to every kitchen.",
    hi: "प्लेसहोल्डर मिशन: हर रसोई तक शुद्ध और ईमानदारी से बना मूंगफली तेल पहुँचाना।",
    gu: "પ્લેસહોલ્ડર મિશન: દરેક રસોડા સુધી શુદ્ધ અને પ્રામાણિકતાથી બનેલું સીંગતેલ પહોંચાડવું.",
  } as Localized<string>, // TODO: replace
  vision: {
    en: "Placeholder vision: to be the most trusted groundnut oil brand in our region.",
    hi: "प्लेसहोल्डर विज़न: अपने क्षेत्र का सबसे भरोसेमंद मूंगफली तेल ब्रांड बनना।",
    gu: "પ્લેસહોલ્ડર વિઝન: અમારા પ્રદેશની સૌથી ભરોસાપાત્ર સીંગતેલ બ્રાન્ડ બનવું.",
  } as Localized<string>, // TODO: replace
  factory: {
    description: {
      en: "Placeholder factory description. Describe the plant, its capacity, hygiene practices and location.",
      hi: "प्लेसहोल्डर फ़ैक्टरी विवरण। प्लांट, उसकी क्षमता, स्वच्छता और स्थान के बारे में बताइए।",
      gu: "પ્લેસહોલ્ડર ફેક્ટરી વર્ણન. પ્લાન્ટ, તેની ક્ષમતા, સ્વચ્છતા અને સ્થળ વિશે જણાવો.",
    } as Localized<string>, // TODO: replace
    highlights: {
      en: ["In-house pressing and packing", "Food-grade storage tanks", "On-site testing lab"],
      hi: ["अपनी पेराई और पैकिंग", "फ़ूड-ग्रेड भंडारण टैंक", "फ़ैक्टरी में ही जाँच प्रयोगशाला"],
      gu: ["પોતાનું પીલાણ અને પેકિંગ", "ફૂડ-ગ્રેડ સંગ્રહ ટાંકીઓ", "ફેક્ટરીમાં જ ચકાસણી લેબ"],
    } as Localized<string[]>, // TODO: replace
    image: `${PLACEHOLDER}/factory.svg`, // TODO: replace
  },
};

export const team: TeamMember[] = [
  {
    name: { en: "Founder Name One", hi: "संस्थापक नाम एक", gu: "સ્થાપક નામ એક" }, // TODO: replace
    role: { en: "Founder", hi: "संस्थापक", gu: "સ્થાપક" }, // TODO: replace
    bio: {
      en: "Placeholder bio. A line or two about experience and role in the business.",
      hi: "प्लेसहोल्डर परिचय। अनुभव और व्यवसाय में भूमिका के बारे में एक-दो पंक्तियाँ।",
      gu: "પ્લેસહોલ્ડર પરિચય. અનુભવ અને વ્યવસાયમાં ભૂમિકા વિશે એક-બે લીટી.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/team-1.svg`, // TODO: replace
  },
  {
    name: { en: "Founder Name Two", hi: "संस्थापक नाम दो", gu: "સ્થાપક નામ બે" }, // TODO: replace
    role: { en: "Director, Operations", hi: "निदेशक, संचालन", gu: "ડિરેક્ટર, સંચાલન" }, // TODO: replace
    bio: {
      en: "Placeholder bio. A line or two about experience and role in the business.",
      hi: "प्लेसहोल्डर परिचय। अनुभव और व्यवसाय में भूमिका के बारे में एक-दो पंक्तियाँ।",
      gu: "પ્લેસહોલ્ડર પરિચય. અનુભવ અને વ્યવસાયમાં ભૂમિકા વિશે એક-બે લીટી.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/team-2.svg`, // TODO: replace
  },
  {
    name: { en: "Founder Name Three", hi: "संस्थापक नाम तीन", gu: "સ્થાપક નામ ત્રણ" }, // TODO: replace
    role: { en: "Director, Sales", hi: "निदेशक, बिक्री", gu: "ડિરેક્ટર, વેચાણ" }, // TODO: replace
    bio: {
      en: "Placeholder bio. A line or two about experience and role in the business.",
      hi: "प्लेसहोल्डर परिचय। अनुभव और व्यवसाय में भूमिका के बारे में एक-दो पंक्तियाँ।",
      gu: "પ્લેસહોલ્ડર પરિચય. અનુભવ અને વ્યવસાયમાં ભૂમિકા વિશે એક-બે લીટી.",
    }, // TODO: replace
    image: `${PLACEHOLDER}/team-3.svg`, // TODO: replace
  },
];

export const timeline: Milestone[] = [
  {
    year: "2000", // TODO: replace
    title: { en: "The first ghani", hi: "पहली घानी", gu: "પહેલી ઘાણી" },
    description: {
      en: "Placeholder milestone: the business starts with a single oil press.",
      hi: "प्लेसहोल्डर पड़ाव: व्यवसाय एक घानी से शुरू हुआ।",
      gu: "પ્લેસહોલ્ડર સીમાચિહ્ન: વ્યવસાય એક ઘાણીથી શરૂ થયો.",
    },
  },
  {
    year: "2005", // TODO: replace
    title: { en: "Our own brand", hi: "अपना ब्रांड", gu: "પોતાની બ્રાન્ડ" },
    description: {
      en: "Placeholder milestone: packaged oil launched under our own brand name.",
      hi: "प्लेसहोल्डर पड़ाव: अपने ब्रांड नाम से पैक्ड तेल की शुरुआत।",
      gu: "પ્લેસહોલ્ડર સીમાચિહ્ન: પોતાના બ્રાન્ડ નામથી પેક્ડ તેલની શરૂઆત.",
    },
  },
  {
    year: "2012", // TODO: replace
    title: { en: "New factory", hi: "नई फ़ैक्टरी", gu: "નવી ફેક્ટરી" },
    description: {
      en: "Placeholder milestone: moved to a larger plant with a modern packing line.",
      hi: "प्लेसहोल्डर पड़ाव: आधुनिक पैकिंग लाइन वाले बड़े प्लांट में स्थानांतरण।",
      gu: "પ્લેસહોલ્ડર સીમાચિહ્ન: આધુનિક પેકિંગ લાઇનવાળા મોટા પ્લાન્ટમાં સ્થળાંતર.",
    },
  },
  {
    year: "2018", // TODO: replace
    title: { en: "Certifications", hi: "प्रमाणपत्र", gu: "પ્રમાણપત્રો" },
    description: {
      en: "Placeholder milestone: quality certifications received and in-house lab set up.",
      hi: "प्लेसहोल्डर पड़ाव: गुणवत्ता प्रमाणपत्र मिले और अपनी प्रयोगशाला स्थापित हुई।",
      gu: "પ્લેસહોલ્ડર સીમાચિહ્ન: ગુણવત્તા પ્રમાણપત્રો મળ્યાં અને પોતાની લેબ સ્થપાઈ.",
    },
  },
  {
    year: "2024", // TODO: replace
    title: { en: "Growing network", hi: "बढ़ता नेटवर्क", gu: "વધતું નેટવર્ક" },
    description: {
      en: "Placeholder milestone: dealer network expanded across several states.",
      hi: "प्लेसहोल्डर पड़ाव: डीलर नेटवर्क कई राज्यों तक फैला।",
      gu: "પ્લેસહોલ્ડર સીમાચિહ્ન: ડીલર નેટવર્ક અનેક રાજ્યો સુધી વિસ્તર્યું.",
    },
  },
];

/* ============================================================================
 * 7. QUALITY PAGE
 * ========================================================================== */

export const quality = {
  intro: {
    en: "Quality is checked at three points: when seed arrives, while oil is pressed, and before every batch is dispatched.",
    hi: "गुणवत्ता की जाँच तीन जगह होती है: जब बीज आता है, जब तेल निकलता है, और हर बैच के डिस्पैच से पहले।",
    gu: "ગુણવત્તાની ચકાસણી ત્રણ તબક્કે થાય છે: દાણા આવે ત્યારે, તેલ પીલાય ત્યારે, અને દરેક બેચના ડિસ્પેચ પહેલાં.",
  } as Localized<string>, // TODO: replace
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
      title: { en: "Aflatoxin screening", hi: "एफ़्लाटॉक्सिन जाँच", gu: "અફલાટોક્સિન ચકાસણી" },
      description: {
        en: "Seed lots are screened so that only safe groundnuts are pressed.",
        hi: "बीज के लॉट की जाँच होती है ताकि केवल सुरक्षित मूंगफली की ही पेराई हो।",
        gu: "દાણાના લોટની ચકાસણી થાય છે જેથી ફક્ત સલામત સીંગ જ પીલાય.",
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
    title: { en: "Factory-direct pricing", hi: "सीधे फ़ैक्टरी के दाम", gu: "સીધા ફેક્ટરીના ભાવ" },
    description: {
      en: "Buy straight from the manufacturer with volume-based rates.",
      hi: "सीधे निर्माता से ख़रीदें, मात्रा के अनुसार दरों पर।",
      gu: "સીધા ઉત્પાદક પાસેથી ખરીદો, જથ્થા પ્રમાણેના ભાવે.",
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
      en: "Regular dispatch from our own factory, all year round.",
      hi: "हमारी अपनी फ़ैक्टरी से साल भर नियमित डिस्पैच।",
      gu: "અમારી પોતાની ફેક્ટરીમાંથી આખું વર્ષ નિયમિત ડિસ્પેચ.",
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
      en: "What is the difference between cold-pressed, filtered and refined groundnut oil?",
      hi: "कोल्ड-प्रेस्ड, फ़िल्टर्ड और रिफ़ाइंड मूंगफली तेल में क्या अंतर है?",
      gu: "કોલ્ડ-પ્રેસ્ડ, ફિલ્ટર્ડ અને રિફાઇન્ડ સીંગતેલમાં શું ફરક છે?",
    },
    answer: {
      en: "Cold-pressed oil is extracted slowly at low temperature and only filtered, so it keeps the most aroma and nutrients. Filtered oil is expeller-pressed and filtered without chemical refining. Refined oil is processed further for a neutral taste, lighter colour and longer shelf life.",
      hi: "कोल्ड-प्रेस्ड तेल कम तापमान पर धीरे-धीरे निकाला जाता है और सिर्फ़ छाना जाता है, इसलिए इसमें सुगंध और पोषक तत्व सबसे ज़्यादा रहते हैं। फ़िल्टर्ड तेल एक्सपेलर से निकालकर बिना रासायनिक रिफ़ाइनिंग के छाना जाता है। रिफ़ाइंड तेल को आगे प्रोसेस किया जाता है, जिससे स्वाद सादा, रंग हल्का और शेल्फ़ लाइफ़ लंबी होती है।",
      gu: "કોલ્ડ-પ્રેસ્ડ તેલ ઓછા તાપમાને ધીમે ધીમે કાઢવામાં આવે છે અને ફક્ત ગાળવામાં આવે છે, તેથી તેમાં સુગંધ અને પોષક તત્ત્વો સૌથી વધુ રહે છે. ફિલ્ટર્ડ તેલ એક્સપેલરથી પીલીને રાસાયણિક રિફાઇનિંગ વગર ગાળવામાં આવે છે. રિફાઇન્ડ તેલને આગળ પ્રોસેસ કરવામાં આવે છે, જેથી સ્વાદ સાદો, રંગ આછો અને શેલ્ફ લાઇફ લાંબી થાય છે.",
    },
  },
  {
    category: "products",
    question: {
      en: "Is your groundnut oil 100% pure?",
      hi: "क्या आपका मूंगफली तेल 100% शुद्ध है?",
      gu: "શું તમારું સીંગતેલ 100% શુદ્ધ છે?",
    },
    answer: {
      en: "Yes. Every pack contains only groundnut oil. We do not blend it with any other oil, and each batch is tested for adulteration.",
      hi: "हाँ। हर पैक में सिर्फ़ मूंगफली का तेल होता है। हम इसमें कोई दूसरा तेल नहीं मिलाते, और हर बैच की मिलावट के लिए जाँच होती है।",
      gu: "હા. દરેક પેકમાં ફક્ત સીંગતેલ હોય છે. અમે તેમાં બીજું કોઈ તેલ ભેળવતા નથી, અને દરેક બેચની ભેળસેળ માટે ચકાસણી થાય છે.",
    },
  },
  {
    category: "products",
    question: {
      en: "Why does cold-pressed oil look cloudy or have sediment at the bottom?",
      hi: "कोल्ड-प्रेस्ड तेल धुंधला क्यों दिखता है या नीचे तलछट क्यों होती है?",
      gu: "કોલ્ડ-પ્રેસ્ડ તેલ ધૂંધળું કેમ દેખાય છે અથવા નીચે કચરો કેમ બેસે છે?",
    },
    answer: {
      en: "Cold-pressed oil is not chemically refined, so fine groundnut particles can settle over time. This is natural and safe. In cold weather the oil may also thicken and will clear again at room temperature.",
      hi: "कोल्ड-प्रेस्ड तेल रासायनिक रूप से रिफ़ाइन नहीं होता, इसलिए मूंगफली के बारीक कण समय के साथ नीचे बैठ सकते हैं। यह प्राकृतिक और सुरक्षित है। ठंड में तेल गाढ़ा भी हो सकता है और सामान्य तापमान पर फिर साफ़ हो जाता है।",
      gu: "કોલ્ડ-પ્રેસ્ડ તેલ રાસાયણિક રીતે રિફાઇન થતું નથી, તેથી સીંગના ઝીણા કણ સમય જતાં નીચે બેસી શકે છે. આ કુદરતી અને સલામત છે. ઠંડીમાં તેલ ઘટ્ટ પણ થઈ શકે છે અને સામાન્ય તાપમાને ફરી ચોખ્ખું થઈ જાય છે.",
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
      en: "Our oils come in 500 ml and 1 L bottles, 5 L jars, 15 L and 15 kg tins, and bulk supply. Availability varies by product, so please check the product page.",
      hi: "हमारे तेल 500 मि.ली. और 1 लीटर की बोतल, 5 लीटर के जार, 15 लीटर और 15 किलो के टिन, तथा थोक में उपलब्ध हैं। उपलब्धता उत्पाद के अनुसार अलग हो सकती है, कृपया उत्पाद का पेज देखें।",
      gu: "અમારાં તેલ 500 મિ.લિ. અને 1 લિટરની બોટલ, 5 લિટરના જાર, 15 લિટર અને 15 કિલોના ડબ્બા, તથા જથ્થાબંધ ઉપલબ્ધ છે. ઉપલબ્ધતા ઉત્પાદન પ્રમાણે જુદી હોઈ શકે છે, કૃપા કરીને ઉત્પાદનનું પેજ જુઓ.",
    },
  },
  {
    category: "health",
    question: {
      en: "Is groundnut oil good for everyday cooking?",
      hi: "क्या मूंगफली तेल रोज़ के खाने के लिए अच्छा है?",
      gu: "શું સીંગતેલ રોજની રસોઈ માટે સારું છે?",
    },
    answer: {
      en: "Groundnut oil is rich in monounsaturated fat and vitamin E, and is naturally free of cholesterol and trans fat. Like any oil, it is best used in moderation as part of a balanced diet.",
      hi: "मूंगफली तेल में मोनोअनसैचुरेटेड वसा और विटामिन ई भरपूर होता है, और इसमें प्राकृतिक रूप से कोलेस्ट्रॉल और ट्रांस वसा नहीं होती। किसी भी तेल की तरह, इसे संतुलित आहार के हिस्से के रूप में सीमित मात्रा में इस्तेमाल करना बेहतर है।",
      gu: "સીંગતેલમાં મોનોઅનસેચ્યુરેટેડ ચરબી અને વિટામિન ઈ ભરપૂર હોય છે, અને તેમાં કુદરતી રીતે કોલેસ્ટ્રોલ અને ટ્રાન્સ ચરબી હોતી નથી. કોઈ પણ તેલની જેમ, તેને સંતુલિત આહારના ભાગ રૂપે માપસર વાપરવું સારું છે.",
    },
  },
  {
    category: "health",
    question: {
      en: "Can I use groundnut oil for deep frying?",
      hi: "क्या मूंगफली तेल डीप फ्राई के लिए इस्तेमाल कर सकते हैं?",
      gu: "શું સીંગતેલ તળવા માટે વાપરી શકાય?",
    },
    answer: {
      en: "Yes. Groundnut oil has a high smoke point, which makes it well suited to frying. Refined and filtered oils are the usual choice for deep frying, and cold-pressed oil for everyday cooking and tadka.",
      hi: "हाँ। मूंगफली तेल का स्मोक पॉइंट ऊँचा होता है, इसलिए यह तलने के लिए उपयुक्त है। डीप फ्राई के लिए आम तौर पर रिफ़ाइंड और फ़िल्टर्ड तेल, और रोज़ के खाने व तड़के के लिए कोल्ड-प्रेस्ड तेल चुना जाता है।",
      gu: "હા. સીંગતેલનો સ્મોક પોઇન્ટ ઊંચો હોય છે, તેથી તે તળવા માટે યોગ્ય છે. તળવા માટે સામાન્ય રીતે રિફાઇન્ડ અને ફિલ્ટર્ડ તેલ, અને રોજની રસોઈ તથા વઘાર માટે કોલ્ડ-પ્રેસ્ડ તેલ પસંદ કરાય છે.",
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
      en: "The minimum depends on the product and pack size. Send us an enquiry from the Bulk Orders page and our sales team will share the current quantities and rates.",
      hi: "न्यूनतम मात्रा उत्पाद और पैक साइज़ पर निर्भर करती है। थोक ऑर्डर पेज से हमें पूछताछ भेजें, हमारी सेल्स टीम मौजूदा मात्रा और दरें बताएगी।",
      gu: "લઘુત્તમ જથ્થો ઉત્પાદન અને પેક સાઇઝ પર આધાર રાખે છે. જથ્થાબંધ ઓર્ડર પેજ પરથી અમને પૂછપરછ મોકલો, અમારી સેલ્સ ટીમ હાલનો જથ્થો અને ભાવ જણાવશે.",
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
      en: "Yes, we dispatch bulk orders across India through transport partners. Delivery time and freight depend on your location and order size.",
      hi: "हाँ, हम ट्रांसपोर्ट पार्टनर के ज़रिए पूरे भारत में थोक ऑर्डर भेजते हैं। डिलीवरी का समय और भाड़ा आपके स्थान और ऑर्डर की मात्रा पर निर्भर करता है।",
      gu: "હા, અમે ટ્રાન્સપોર્ટ પાર્ટનર દ્વારા સમગ્ર ભારતમાં જથ્થાબંધ ઓર્ડર મોકલીએ છીએ. ડિલિવરીનો સમય અને ભાડું તમારા સ્થળ અને ઓર્ડરના જથ્થા પર આધાર રાખે છે.",
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
      en: "Fill in the form on the Become a Distributor page with your firm and area details. Our team will contact you to discuss terms and availability in your territory.",
      hi: "डिस्ट्रीब्यूटर बनें पेज पर अपनी फ़र्म और क्षेत्र की जानकारी के साथ फ़ॉर्म भरें। हमारी टीम शर्तों और आपके क्षेत्र में उपलब्धता पर बात करने के लिए आपसे संपर्क करेगी।",
      gu: "ડિસ્ટ્રિબ્યુટર બનો પેજ પર તમારી પેઢી અને વિસ્તારની વિગતો સાથે ફોર્મ ભરો. અમારી ટીમ શરતો અને તમારા વિસ્તારમાં ઉપલબ્ધતા વિશે વાત કરવા તમારો સંપર્ક કરશે.",
    },
  },
]; // TODO: replace (review answers against your actual products and policies)

/* ============================================================================
 * 10. TESTIMONIALS
 * ========================================================================== */

export const testimonials: Testimonial[] = [
  {
    name: { en: "Customer Name One", hi: "ग्राहक नाम एक", gu: "ગ્રાહક નામ એક" },
    role: { en: "Home cook, City", hi: "गृहिणी, शहर", gu: "ગૃહિણી, શહેર" },
    quote: {
      en: "Placeholder testimonial. The aroma reminds me of the oil we used at my grandmother's home.",
      hi: "प्लेसहोल्डर प्रशंसापत्र। इसकी ख़ुशबू मुझे नानी के घर के तेल की याद दिलाती है।",
      gu: "પ્લેસહોલ્ડર પ્રતિભાવ. આની સુગંધ મને નાનીના ઘરના તેલની યાદ અપાવે છે.",
    },
    rating: 5,
  },
  {
    name: { en: "Customer Name Two", hi: "ग्राहक नाम दो", gu: "ગ્રાહક નામ બે" },
    role: { en: "Restaurant owner, City", hi: "रेस्टोरेंट मालिक, शहर", gu: "રેસ્ટોરન્ટ માલિક, શહેર" },
    quote: {
      en: "Placeholder testimonial. Consistent quality in every tin, and dispatch is always on time.",
      hi: "प्लेसहोल्डर प्रशंसापत्र। हर टिन में एक जैसी गुणवत्ता, और डिस्पैच हमेशा समय पर।",
      gu: "પ્લેસહોલ્ડર પ્રતિભાવ. દરેક ડબ્બામાં એકસરખી ગુણવત્તા, અને ડિસ્પેચ હંમેશાં સમયસર.",
    },
    rating: 5,
  },
  {
    name: { en: "Customer Name Three", hi: "ग्राहक नाम तीन", gu: "ગ્રાહક નામ ત્રણ" },
    role: { en: "Distributor, City", hi: "डिस्ट्रीब्यूटर, शहर", gu: "ડિસ્ટ્રિબ્યુટર, શહેર" },
    quote: {
      en: "Placeholder testimonial. Customers come back for it, which makes it easy to sell.",
      hi: "प्लेसहोल्डर प्रशंसापत्र। ग्राहक इसे दोबारा माँगते हैं, इसलिए बेचना आसान है।",
      gu: "પ્લેસહોલ્ડર પ્રતિભાવ. ગ્રાહકો ફરી ફરીને માગે છે, તેથી વેચવું સહેલું છે.",
    },
    rating: 5,
  },
  {
    name: { en: "Customer Name Four", hi: "ग्राहक नाम चार", gu: "ગ્રાહક નામ ચાર" },
    role: {
      en: "Sweet shop owner, City",
      hi: "मिठाई दुकान मालिक, शहर",
      gu: "મીઠાઈની દુકાનના માલિક, શહેર",
    },
    quote: {
      en: "Placeholder testimonial. Our farsan tastes better and stays fresh longer with this oil.",
      hi: "प्लेसहोल्डर प्रशंसापत्र। इस तेल से हमारा नमकीन ज़्यादा स्वादिष्ट बनता है और देर तक ताज़ा रहता है।",
      gu: "પ્લેસહોલ્ડર પ્રતિભાવ. આ તેલથી અમારું ફરસાણ વધુ સ્વાદિષ્ટ બને છે અને લાંબો સમય તાજું રહે છે.",
    },
    rating: 4,
  },
  {
    name: { en: "Customer Name Five", hi: "ग्राहक नाम पाँच", gu: "ગ્રાહક નામ પાંચ" },
    role: { en: "Caterer, City", hi: "कैटरर, शहर", gu: "કેટરર, શહેર" },
    quote: {
      en: "Placeholder testimonial. We have bought in bulk for years and the rates have always been fair.",
      hi: "प्लेसहोल्डर प्रशंसापत्र। हम बरसों से थोक में ख़रीद रहे हैं और दाम हमेशा वाजिब रहे हैं।",
      gu: "પ્લેસહોલ્ડર પ્રતિભાવ. અમે વર્ષોથી જથ્થાબંધ ખરીદીએ છીએ અને ભાવ હંમેશાં વાજબી રહ્યા છે.",
    },
    rating: 5,
  },
  {
    name: { en: "Customer Name Six", hi: "ग्राहक नाम छह", gu: "ગ્રાહક નામ છ" },
    role: { en: "Home cook, City", hi: "गृहिणी, शहर", gu: "ગૃહિણી, શહેર" },
    quote: {
      en: "Placeholder testimonial. My family noticed the difference in taste from the first week.",
      hi: "प्लेसहोल्डर प्रशंसापत्र। मेरे परिवार को पहले ही हफ़्ते में स्वाद का फ़र्क़ महसूस हुआ।",
      gu: "પ્લેસહોલ્ડર પ્રતિભાવ. મારા પરિવારને પહેલા જ અઠવાડિયે સ્વાદમાં ફરક લાગ્યો.",
    },
    rating: 5,
  },
]; // TODO: replace (use real customer testimonials only)

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
  lastUpdated: "2026-01-01", // TODO: replace
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

/** Site URL without a trailing slash; NEXT_PUBLIC_SITE_URL wins over siteConfig.siteUrl. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl).replace(/\/+$/, "");
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
