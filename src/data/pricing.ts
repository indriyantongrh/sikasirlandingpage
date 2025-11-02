import { IPricing } from "@/types";

export const tiers: IPricing[] = [
   {
    id: "promo_3_bulan", // <-- TAMBAHKAN ID
    name: "3 Bulan",
    price: 42000,
    originalPrice: 49000,
    totalPrice: 126000, // <-- TAMBAHKAN TOTAL HARGA (42000 * 3)
    discount: "Hemat 10%"
  },
  {
    id: "bulanan", // <-- TAMBAHKAN ID
    name: "1 Bulan",
    price: 42000,
    originalPrice: 49000,
    totalPrice: 49000, // <-- TAMBAHKAN TOTAL HARGA
  },
]