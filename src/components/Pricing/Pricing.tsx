"use client";

import { useState, useEffect } from "react";
import PricingColumn from "./PricingColumn";
import { IPricing } from "@/types";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9sgDL4BXnCqK1CLb53ENCOSD8FjpsTXU",
  authDomain: "kasirlaundryapps.firebaseapp.com",
  projectId: "kasirlaundryapps",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const Pricing: React.FC = () => {
  const [tiers, setTiers] = useState<IPricing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const q = query(
          collection(db, "subscription_plans"),
          orderBy("order", "asc")
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.duration,
            price: d.monthlyPrice,
            originalPrice: d.originalMonthlyPrice,
            totalPrice: d.totalPrice,
            discount: d.discount,
            colorHex: d.colorHex,
            order: d.order,
          } as IPricing;
        });
        setTiers(data);
      } catch (err) {
        console.error("Gagal memuat paket:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTiers();
  }, []);

  return (
    <section id="pricing" className="py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
        Harga &amp; Paket Langganan
      </h2>
      <p className="mt-3 mb-12 text-center text-gray-500 max-w-2xl mx-auto">
        Mulai gratis dengan free trial 14 hari. Upgrade kapan saja sesuai
        kebutuhan usaha laundry kamu.
      </p>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-64 h-96 bg-gray-100 rounded-2xl" />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-start">
          {tiers.map((tier) => (
            <PricingColumn
              key={tier.id}
              tier={tier}
              popular={tier.order === 2 || tier.order === 3}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Pricing;
