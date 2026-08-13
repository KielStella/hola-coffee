import Link from "next/link";

export default function PeriodTabs<T extends string>({
  options,
  active,
  paramName,
  basePath,
  otherParams = {},
}: {
  options: { value: T; label: string }[];
  active: T;
  paramName: string;
  basePath: string;
  otherParams?: Record<string, string>;
}) {
  return (
    <div className="inline-flex rounded-full bg-hola-beige p-1">
      {options.map((option) => {
        const params = new URLSearchParams({ ...otherParams, [paramName]: option.value });
        const isActive = option.value === active;
        return (
          <Link
            key={option.value}
            href={`${basePath}?${params.toString()}`}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:text-sm ${
              isActive ? "bg-white text-hola-brown shadow-sm" : "text-hola-brown-soft hover:text-hola-brown"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
