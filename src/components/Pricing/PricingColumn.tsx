import { IPricing } from "@/types";

interface Props {
  tier: IPricing;
}

const PricingColumn: React.FC<Props> = ({ tier }) => {
  const { name, price, period, badge, description, features, buttonText, buttonLink, highlight } = tier;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 ${
        highlight
          ? "border-blue-600 bg-blue-600 text-white shadow-xl scale-[1.02]"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
      }`}
    >
      {badge && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full ${
          highlight ? "bg-yellow-400 text-gray-900" : "bg-blue-100 text-blue-700"
        }`}>
          {badge}
        </span>
      )}

      <h3 className={`text-xl font-bold ${highlight ? "text-white" : "text-gray-900"}`}>
        {name}
      </h3>
      <p className={`mt-2 text-sm ${highlight ? "text-blue-100" : "text-gray-500"}`}>
        {description}
      </p>

      <div className="mt-5 mb-6">
        <span className={`text-4xl font-extrabold ${highlight ? "text-white" : "text-gray-900"}`}>
          {price}
        </span>
        {period && (
          <span className={`text-base font-medium ${highlight ? "text-blue-200" : "text-gray-500"}`}>
            {period}
          </span>
        )}
      </div>

      <hr className={`mb-6 ${highlight ? "border-blue-400" : "border-gray-200"}`} />

      <ul className="flex-1 space-y-3 mb-8" role="list">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className={`mt-0.5 h-5 w-5 flex-shrink-0 ${highlight ? "text-green-300" : "text-green-500"}`}
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
            <span className={`text-sm ${highlight ? "text-white" : "text-gray-700"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full text-center py-3 px-6 rounded-full font-semibold transition-colors ${
          highlight
            ? "bg-white text-blue-600 hover:bg-blue-50"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {buttonText}
      </a>
    </div>
  );
};

export default PricingColumn;