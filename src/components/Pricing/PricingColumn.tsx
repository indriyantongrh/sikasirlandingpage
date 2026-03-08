import { IPricing } from "@/types";
import { pricingFeatures, playStoreLink } from "@/data/pricing";

interface Props {
  tier: IPricing;
  popular?: boolean;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const PricingColumn: React.FC<Props> = ({ tier, popular }) => {
  const { name, price, originalPrice, totalPrice, discount, colorHex } = tier;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 ${
        popular
          ? "shadow-xl scale-[1.02]"
          : "border-gray-200 bg-white hover:shadow-lg"
      }`}
      style={{
        borderColor: popular ? colorHex : undefined,
        backgroundColor: popular ? `${colorHex}08` : undefined,
      }}
    >
      {/* Badge */}
      {discount && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: colorHex }}
        >
          {discount}
        </span>
      )}

      {/* Nama paket */}
      <h3 className="text-xl font-bold text-gray-900 mt-2">{name}</h3>

      {/* Harga */}
      <div className="mt-4 mb-2">
        {originalPrice && originalPrice > price && (
          <p className="text-sm text-gray-400 line-through">
            {formatCurrency(originalPrice)}/bulan
          </p>
        )}
        <div className="flex items-baseline gap-1">
          <span
            className="text-4xl font-extrabold"
            style={{ color: colorHex }}
          >
            {formatCurrency(price)}
          </span>
          <span className="text-base text-gray-500">/bulan</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Total: {formatCurrency(totalPrice)}
        </p>
      </div>

      {/* Feature list */}
      <ul className="flex-1 space-y-3 my-6" role="list">
        {pricingFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0"
              style={{ color: colorHex }}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href={playStoreLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-3 px-6 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: colorHex }}
      >
        Pilih Paket
      </a>
    </div>
  );
};

export default PricingColumn;
