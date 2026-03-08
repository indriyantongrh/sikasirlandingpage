import { IPricing } from "@/types";

const playStoreLink = "https://play.google.com/store/apps/details?id=com.sikasir.laundry.sikasirlaundry";

export const tiers: IPricing[] = [
  {
    id: "gratis",
    name: "Gratis",
    price: "Rp 0",
    period: " /selamanya",
    description: "Cocok untuk coba-coba atau usaha baru mulai",
    features: [
      "1 Outlet",
      "Pencatatan transaksi",
      "Manajemen pelanggan",
      "Laporan dasar",
      "Struk digital",
    ],
    buttonText: "Mulai Gratis",
    buttonLink: playStoreLink,
  },
  {
    id: "bulanan",
    name: "Bulanan",
    badge: "Populer",
    price: "Rp 25.000",
    period: " /bulan",
    description: "Fitur lengkap untuk usaha laundry yang berkembang",
    highlight: true,
    features: [
      "Semua fitur Gratis",
      "Multi karyawan",
      "Laporan keuangan lengkap",
      "Manajemen stok & inventaris",
      "Struk custom & logo",
      "Export laporan (PDF/Excel)",
      "Multi outlet (max 3)",
      "Support via WhatsApp",
    ],
    buttonText: "Langganan Sekarang",
    buttonLink: playStoreLink,
  },
  {
    id: "tahunan",
    name: "Tahunan",
    price: "Rp 17.000",
    period: " /bulan",
    badge: "Hemat 32%",
    description: "Rp 199.000/tahun — semua fitur tanpa batas",
    features: [
      "Semua fitur Bulanan",
      "Multi outlet unlimited",
      "Prioritas support 24/7",
      "Laporan analitik lanjutan",
      "Backup data otomatis",
      "Konsultasi setup gratis",
      "Export laporan (PDF/Excel)",
      "Struk custom & logo",
    ],
    buttonText: "Hemat 32%",
    buttonLink: playStoreLink,
  },
];
