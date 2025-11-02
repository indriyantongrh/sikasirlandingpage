import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

// Pastikan Anda memiliki tipe data ini di file @/types atau sesuaikan path-nya
export interface IPricing {
  id: string;
  name: string; // e.g., "3 Bulan"
  price: number; // Harga bulanan (e.g., 42000)
  originalPrice?: number; // Harga bulanan asli (e.g., 49000)
  totalPrice: number; // Total harga (e.g., 126000)
  discount?: string; // e.g., "Hemat 10%"
  colorHex?: string; // e.g., "#FF5733"
}

/**
 * Helper untuk memformat angka menjadi mata uang Rupiah (Rp).
 * Didefinisikan di luar komponen agar tidak dibuat ulang pada setiap render.
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface Props {
  tier: IPricing;
  highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
  const { name, price, originalPrice, totalPrice, colorHex ,discount } = tier;

  return (
    <div className={clsx(
      "w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 lg:max-w-full relative overflow-hidden transition-all duration-300",
      { "shadow-lg border-2": highlight }
    )}
  
      style={highlight ? { borderColor: colorHex } : {}}
    >

      {/* Badge Diskon di Pojok */}
      {discount && (
        <div className={clsx(
          "absolute top-0 right-0 py-1.5 px-4 rounded-bl-lg text-white text-xl font-bold z-10",
        // Terapkan bg-primary jika TIDAK highlight
            { "bg-primary": !highlight }
        )}
        // Gunakan 'style' untuk menerapkan colorHex dinamis ke background
          style={highlight ? { backgroundColor: colorHex } : {}}
        >
          {discount}
        </div>
      )}

      <div className="p-6 border-b border-gray-200 rounded-t-xl">
        <h3 className={clsx(
          "text-2xl font-semibold mb-4",
          { "text-primary": !highlight }
        )}
        style={highlight ? { color: colorHex } : {}}
        >
          {name}
        </h3>

       {/* Bagian Harga */}
        <div className="mb-6">
          {/* Harga Coret (Strikethrough) */}
          {originalPrice && originalPrice > price && (
            <p className="text-lg font-normal text-gray-500 line-through">
              {formatCurrency(originalPrice)} /bulan
            </p>
          )}

          {/* Harga Bulanan Utama */}
          <p className="text-3xl md:text-5xl font-bold">
            <span 
              // Gunakan 'style' untuk menerapkan colorHex dinamis ke text
              style={highlight ? { color: colorHex } : {}}
            >
              {formatCurrency(price)}
            </span>
            <span className="text-lg font-normal text-gray-600">/bulan</span>
          </p>

          {/* Total Pembayaran */}
          <p className="text-sm font-medium text-gray-600 mt-2">
            *Total Pembayaran: {formatCurrency(totalPrice)}*
          </p>
        </div>

          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.sikasir.laundry.sikasirlaundry">
       <button className={clsx(
          "w-full  text-white  py-3 px-4 rounded-full transition-colors font-semibold",
          {
            "bg-primary": !highlight ,
        
          
          }
        )}
        style={highlight ? { backgroundColor: colorHex } : {}}
        >
          Pilih Paket
        </button> 
        </a>
      </div>
      
    </div>
  )
}

export default PricingColumn;