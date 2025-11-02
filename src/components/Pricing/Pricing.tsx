// import PricingColumn from "./PricingColumn";

// import { tiers } from "@/data/pricing";

// const Pricing: React.FC = () => {
//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {tiers.map((tier, index) => (
//                 <PricingColumn key={tier.name} tier={tier} highlight/>
//             ))}
//         </div>
//     )
// }

// export default Pricing

"use client"; // <-- TAMBAHKAN BARIS INI TEPAT DI ATAS

import { useState, useEffect } from 'react';
import PricingColumn from "./PricingColumn";
import { IPricing } from './PricingColumn'; // Impor interface IPricing

// --- KONFIGURASI FIREBASE DIMASUKKAN DI SINI ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

// TODO: Ganti dengan konfigurasi Firebase Anda
// PERINGATAN: JANGAN GUNAKAN INI DI PRODUCTION. Gunakan Environment Variables.
const firebaseConfig = {
  apiKey: "AIzaSyD9sgDL4BXnCqK1CLb53ENCOSD8FjpsTXU",
  authDomain: "kasirlaundryapps.firebaseapp.com",
  projectId: "kasirlaundryapps",
};


// Inisialisasi Firebase dan Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// --- AKHIR DARI KONFIGURASI FIREBASE ---


const Pricing: React.FC = () => {
    const [tiers, setTiers] = useState<IPricing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Di dalam file Pricing.tsx

    useEffect(() => {
        const fetchTiers = async () => {
            try {
                // 1. UBAH QUERY: Gunakan "order" untuk mengurutkan
                const tiersCollectionRef = collection(db, "subscription_plans");
                const q = query(tiersCollectionRef, orderBy("order", "asc")); // Diubah dari "price"
                
                const querySnapshot = await getDocs(q);
                
                // 2. UBAH MAPPING: Sesuaikan field Firestore dengan field IPricing
                const tiersData = querySnapshot.docs.map(doc => {
                    const data = doc.data(); // Ambil data dari dokumen
                    
                    // Lakukan pemetaan manual
                    return {
                        id: doc.id,
                        name: data.duration,             // Firestore 'duration' -> IPricing 'name'
                        price: data.monthlyPrice,      // Firestore 'monthlyPrice' -> IPricing 'price'
                        originalPrice: data.originalMonthlyPrice, // Firestore 'originalMonthlyPrice' -> IPricing 'originalPrice'
                        totalPrice: data.totalPrice,   // Nama field sudah sama
                        discount: data.discount,       // Nama field sudah sama
                        colorHex: data.colorHex,     // Nama field sudah sama
                    } as IPricing; 
                });

                setTiers(tiersData);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data paket.");
            } finally {
                setLoading(false);
            }
        };

        fetchTiers();
    }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali

    if (loading) {
        return <div className="text-center p-10">Memuat paket harga...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    return (
        <div  id="pricing" className="py-12 md:py-20"> 
            
            {/* --- 1. TARUH JUDUL ANDA DI SINI --- */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Pilihan Paket Sesuai Kebutuhan Anda
            </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-6xl lg:mx-auto">
            {tiers.map((tier) => (
                <PricingColumn 
                    key={tier.id} 
                    tier={tier} 
                
                />
            ))}
        </div>
        </div>
    );
}

export default Pricing;