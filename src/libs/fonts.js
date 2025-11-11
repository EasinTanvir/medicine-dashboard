import {
  Baloo_Chettan_2,
  Tinos,
  Gidugu,
  Lato,
  Red_Hat_Display,
  Inter,
  Judson,
  Jacques_Francois,
  David_Libre,
  Amiri,
  Manuale,
  Instrument_Serif,
  Petrona,
  Phetsarath,
  Lora,
  Abhaya_Libre,
  Newsreader,
  Balthazar,
  Barlow,
  Junge,
  Ibarra_Real_Nova,
  Poppins,
  Inria_Serif,
  Arapey,
  Average,
  Gajraj_One,
  Istok_Web,
  Mulish,
  Abyssinica_SIL,
  Playfair_Display,
  PT_Serif,
  Instrument_Sans,
  MedievalSharp,
  Monda,
  STIX_Two_Text,
  Stoke,
  Tajawal,
  Kameron,
  Noto_Sans_SC,
  Inria_Sans,
  Zilla_Slab,
} from "next/font/google";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin", "latin-ext"],
  weight: ["100", "300", "400", "700", "900"],
});
const zilla_slab = Zilla_Slab({
  variable: "--font-zilla_slab",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});
const inria_sans = Inria_Sans({
  variable: "--font-inria_sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
});

const noto_sans_sc = Noto_Sans_SC({
  variable: "--font-noto_sans_sc",
  subsets: ["cyrillic", "latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
});
const kameron = Kameron({
  variable: "--font-kameron",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});
// const shipporiMinchoB1 = Shippori_Mincho_B1({
//   variable: "--font-shippori-mincho",
//   subsets: ["latin", "latin-ext"],
//   weight: ["400", "500", "600", "700"],
// });

// const shippori_mincho = Shippori_Mincho({
//   variable: "--font-shippori_mincho",
//   subsets: ["latin", "latin-ext"],
//   weight: ["400", "500", "600", "700", "800"],
// });

const tinos = Tinos({
  variable: "--font-tinos",
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "hebrew",
    "latin",
    "latin-ext",
    "vietnamese",
  ],
  weight: ["400", "700"],
});
const baloo_chettan_2 = Baloo_Chettan_2({
  variable: "--font-baloo_chettan_2",
  subsets: ["latin", "latin-ext", "malayalam", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});
const stix_two_text = STIX_Two_Text({
  variable: "--font-stix-two-text",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek"],
  weight: ["400", "500", "600", "700"],
});
const gidugu = Gidugu({
  variable: "--font-gidugu",
  subsets: ["latin", "latin-ext", "telugu"],
  weight: ["400"],
});
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
const stoke = Stoke({
  variable: "--font-stoke",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
});

const medievalSharp = MedievalSharp({
  variable: "--font-medievalSharp",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});
const monda = Monda({
  variable: "--font-monda",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const instrument_sans = Instrument_Sans({
  variable: "--font-instrument_sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["devanagari", "latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const pt_Serif = PT_Serif({
  variable: "--font-pt_Serif",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  weight: ["400", "700"],
});
const playfair_display = Playfair_Display({
  variable: "--font-playfair_display",
  subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const abyssinica_sIL = Abyssinica_SIL({
  variable: "--font-abyssinica_sIL",
  subsets: ["ethiopic", "latin", "latin-ext"],
  weight: ["400"],
});
const mulish = Mulish({
  variable: "--font-poppins",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["1000", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const istok_Web = Istok_Web({
  variable: "--font-istok_web",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  weight: ["400", "700"],
});
const arapey = Arapey({
  variable: "--font-arapey",
  subsets: ["latin"],
  weight: ["400"],
});
const average = Average({
  variable: "--font-average",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});
const gajraj_One = Gajraj_One({
  variable: "--font-gajraj_One",
  subsets: ["devanagari", "latin", "latin-ext"],
  weight: ["400"],
});
const inria_serif = Inria_Serif({
  variable: "--font-inria_serif",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
});

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red--hat-display",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
    "vietnamese",
  ],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const judson = Judson({
  variable: "--font-judson",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"], // choose weights you need
});

const jacquesFrancois = Jacques_Francois({
  variable: "--font-jacques-francois",
  subsets: ["latin"],
  weight: ["400"], // choose weights you need
});
const davidLibre = David_Libre({
  variable: "--font-david-libre",
  subsets: ["latin", "hebrew", "latin-ext", "math"],
  weight: ["400", "500", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const manuale = Manuale({
  variable: "--font-manuale",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});
const petrona = Petrona({
  variable: "--font-petrona",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const phetsarath = Phetsarath({
  variable: "--font-phetsarath",
  subsets: ["lao"],
  weight: ["400", "700"],
  fallback: ["Arial", "sans-serif"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const abhaya_Libre = Abhaya_Libre({
  variable: "--font-abhaya_libre",
  subsets: ["latin", "latin-ext", "sinhala"],
  weight: ["400", "500", "600", "700", "800"],
});
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const balthazar = Balthazar({
  variable: "--font-balthazar",
  subsets: ["latin"],
  weight: ["400"],
});
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const junge = Junge({
  variable: "--font-junge",
  subsets: ["latin"],
  weight: ["400"],
});
const ibarra_real_nova = Ibarra_Real_Nova({
  variable: "--font-ibarra_real_nova",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});
export {
  stix_two_text,
  stoke,
  amiri,
  lato,
  redHatDisplay,
  inter,
  judson,
  jacquesFrancois,
  davidLibre,
  manuale,
  petrona,
  phetsarath,
  lora,
  abhaya_Libre,
  newsreader,
  balthazar,
  barlow,
  junge,
  ibarra_real_nova,
  poppins,
  inria_serif,
  arapey,
  average,
  gajraj_One,
  istok_Web,
  mulish,
  abyssinica_sIL,
  playfair_display,
  pt_Serif,
  instrument_sans,
  medievalSharp,
  monda,
  tajawal,
  tinos,
  gidugu,
  baloo_chettan_2,
  kameron,
  noto_sans_sc,
  inria_sans,
  zilla_slab,
};
