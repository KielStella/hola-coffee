"use client";

import { rewardCategories, type RewardCategory } from "@/lib/rewards-data";

export default function RewardFilterTabs({
  active,
  onChange,
}: {
  active: RewardCategory;
  onChange: (category: RewardCategory) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Reward categories"
      className="flex flex-wrap justify-center gap-2"
    >
      {rewardCategories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 font-display text-sm transition sm:text-base ${
              isActive
                ? "bg-hola-blue text-white shadow-md shadow-hola-blue/30"
                : "bg-hola-beige text-hola-brown hover:bg-hola-yellow-soft"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
