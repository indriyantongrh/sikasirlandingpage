import PricingColumn from "./PricingColumn";
import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Harga & Paket Langganan
        </h2>
        <p className="text-foreground-accent max-w-2xl mx-auto">
          Mulai gratis dengan free trial 14 hari. Upgrade kapan saja sesuai kebutuhan usaha laundry kamu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
        {tiers.map((tier) => (
          <PricingColumn key={tier.id} tier={tier} />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
