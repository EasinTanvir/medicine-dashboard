// customersData.js
export const companies = [
  { id: 1, name: "Square Pharmaceuticals Ltd.", slug: "square" },
  { id: 2, name: "Incepta Pharmaceuticals Ltd.", slug: "incepta" },
  { id: 3, name: "Beximco Pharmaceuticals Ltd.", slug: "beximco" },
  { id: 4, name: "Renata Limited", slug: "renata" },
  { id: 5, name: "Eskayef Pharmaceuticals Ltd.", slug: "eskayef" },
  { id: 6, name: "ACI Limited", slug: "aci" },
  { id: 7, name: "Opsonin Pharma Limited", slug: "opsonin" },
  { id: 8, name: "Healthcare Pharmaceuticals Ltd.", slug: "healthcare" },
  { id: 9, name: "Aristopharma Ltd.", slug: "aristopharma" },
  { id: 10, name: "General Pharmaceuticals Ltd.", slug: "general" },
];

// helper to get brandName from slug
const getBrandName = (slug) => {
  const c = companies.find((x) => x.slug === slug);
  return c ? c.name : slug;
};

export const customers = [
  {
    id: "c001",
    customerName: "Rahim Uddin",
    customerPhone: "01710000001",
    customerAddress: "Dhaka, Uttara",
    medicines: [
      {
        medicineName: "Paracetamol 500mg",
        quantity: 2,
        brand: "square",
        brandName: getBrandName("square"),
      },
      {
        medicineName: "Cough Syrup",
        quantity: 1,
        brand: "incepta",
        brandName: getBrandName("incepta"),
      },
    ],
    createdAt: "2025-11-01",
  },
  {
    id: "c002",
    customerName: "Karim Ahmed",
    customerPhone: "01710000002",
    customerAddress: "Chattogram, Agrabad",
    medicines: [
      {
        medicineName: "Ibuprofen 200mg",
        quantity: 1,
        brand: "beximco",
        brandName: getBrandName("beximco"),
      },
    ],
    createdAt: "2025-11-02",
  },
  {
    id: "c003",
    customerName: "Sultana Begum",
    customerPhone: "01710000003",
    customerAddress: "Dhaka, Mirpur",
    medicines: [
      {
        medicineName: "Amoxicillin 500mg",
        quantity: 3,
        brand: "renata",
        brandName: getBrandName("renata"),
      },
      {
        medicineName: "Vitamin C",
        quantity: 1,
        brand: "eskayef",
        brandName: getBrandName("eskayef"),
      },
    ],
    createdAt: "2025-11-03",
  },
  {
    id: "c004",
    customerName: "Mizan Hossain",
    customerPhone: "01710000004",
    customerAddress: "Sylhet, Zindabazar",
    medicines: [
      {
        medicineName: "Antacid",
        quantity: 1,
        brand: "aci",
        brandName: getBrandName("aci"),
      },
    ],
    createdAt: "2025-11-03",
  },
  {
    id: "c005",
    customerName: "Farhana Islam",
    customerPhone: "01710000005",
    customerAddress: "Khulna, Sonadanga",
    medicines: [
      {
        medicineName: "Paracetamol 500mg",
        quantity: 1,
        brand: "beximco",
        brandName: getBrandName("beximco"),
      },
    ],
    createdAt: "2025-10-30",
  },
  {
    id: "c006",
    customerName: "Arafat Khan",
    customerPhone: "01710000006",
    customerAddress: "Rajshahi, Shah Makhdum",
    medicines: [
      {
        medicineName: "Pain Balm",
        quantity: 2,
        brand: "opsonin",
        brandName: getBrandName("opsonin"),
      },
    ],
    createdAt: "2025-10-29",
  },
  {
    id: "c007",
    customerName: "Nusrat Jahan",
    customerPhone: "01710000007",
    customerAddress: "Barishal, Bandar",
    medicines: [
      {
        medicineName: "Eye Drop",
        quantity: 1,
        brand: "healthcare",
        brandName: getBrandName("healthcare"),
      },
    ],
    createdAt: "2025-10-28",
  },
  {
    id: "c008",
    customerName: "Imran Mir",
    customerPhone: "01710000008",
    customerAddress: "Comilla, Motijheel",
    medicines: [
      {
        medicineName: "Antibiotic",
        quantity: 2,
        brand: "aristopharma",
        brandName: getBrandName("aristopharma"),
      },
    ],
    createdAt: "2025-10-27",
  },
  {
    id: "c009",
    customerName: "Taslima Akter",
    customerPhone: "01710000009",
    customerAddress: "Mymensingh, Trishal",
    medicines: [
      {
        medicineName: "Cough Syrup",
        quantity: 2,
        brand: "incepta",
        brandName: getBrandName("incepta"),
      },
    ],
    createdAt: "2025-10-26",
  },
  {
    id: "c010",
    customerName: "Rubel Rana",
    customerPhone: "01710000010",
    customerAddress: "Rangpur, Cantonment",
    medicines: [
      {
        medicineName: "Paracetamol",
        quantity: 1,
        brand: "square",
        brandName: getBrandName("square"),
      },
    ],
    createdAt: "2025-10-25",
  },
  {
    id: "c011",
    customerName: "Shamima Noor",
    customerPhone: "01710000011",
    customerAddress: "Cox's Bazar, Laboni",
    medicines: [
      {
        medicineName: "Antacid",
        quantity: 1,
        brand: "general",
        brandName: getBrandName("general"),
      },
    ],
    createdAt: "2025-10-24",
  },
  {
    id: "c012",
    customerName: "Kamal Hossain",
    customerPhone: "01710000012",
    customerAddress: "Jessore, Court Bazar",
    medicines: [
      {
        medicineName: "Multivitamin",
        quantity: 2,
        brand: "renata",
        brandName: getBrandName("renata"),
      },
    ],
    createdAt: "2025-10-23",
  },
  {
    id: "c013",
    customerName: "Rina Sultana",
    customerPhone: "01710000013",
    customerAddress: "Bogra, Shibpur",
    medicines: [
      {
        medicineName: "Cough Syrup",
        quantity: 1,
        brand: "eskayef",
        brandName: getBrandName("eskayef"),
      },
    ],
    createdAt: "2025-10-22",
  },
  {
    id: "c014",
    customerName: "Javed Khan",
    customerPhone: "01710000014",
    customerAddress: "Natore, Natore Sadar",
    medicines: [
      {
        medicineName: "Pain Relief",
        quantity: 3,
        brand: "aci",
        brandName: getBrandName("aci"),
      },
    ],
    createdAt: "2025-10-21",
  },
  {
    id: "c015",
    customerName: "Mita Roy",
    customerPhone: "01710000015",
    customerAddress: "Tangail, Bhuapur",
    medicines: [
      {
        medicineName: "Antibiotic",
        quantity: 1,
        brand: "aristopharma",
        brandName: getBrandName("aristopharma"),
      },
      {
        medicineName: "Vitamin D",
        quantity: 1,
        brand: "healthcare",
        brandName: getBrandName("healthcare"),
      },
    ],
    createdAt: "2025-10-20",
  },
];
