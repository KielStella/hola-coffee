"use client";

import { menuCategories, type MenuCategory } from "@/lib/menu-data";

export default function CategoryTabs({
  active,
  onChange,
}: {
  active: MenuCategory;
  onChange: (category: MenuCategory) => void;
}) {
  return (
    <div className="sticky top-[64px] z-30 border-b border-hola-brown/10 bg-white/95 py-3 backdrop-blur-sm sm:top-[76px]">
      <div
        role="tablist"
        aria-label="Menu categories"
        className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8"
      >
        {menuCategories.map((category) => {
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
    </div>
  );
}
