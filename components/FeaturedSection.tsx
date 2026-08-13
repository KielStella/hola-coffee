import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import ProductIllustration from "./ProductIllustration";
import { featuredProducts } from "@/lib/data";

export default function FeaturedSection() {
  return (
    <section className="relative bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-hola-brown sm:text-4xl">Customer Favorites</h2>
          <p className="mt-3 text-hola-brown-soft">Discover our best-selling handcrafted drinks.</p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <AnimatedSection key={product.id} delay={(i % 3) * 0.1}>
              <article className="group h-full overflow-hidden rounded-hola-lg bg-white shadow-md ring-1 ring-hola-brown/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <Link href="/menu" className="relative block h-48 overflow-hidden" aria-label={`View ${product.name} on the menu`}>
                  <div className="h-full w-full transition duration-500 group-hover:scale-110">
                    <ProductIllustration icon={product.icon} name={product.name} className="h-full w-full" />
                  </div>
                  {product.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-hola-yellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-hola-brown shadow">
                      {product.badge}
                    </span>
                  )}
                </Link>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg text-hola-brown">{product.name}</h3>
                    <span className="whitespace-nowrap font-display text-hola-blue-dark">{product.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">{product.description}</p>
                  <Link
                    href="/menu"
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-hola-brown px-5 py-2.5 text-sm font-display text-white transition hover:bg-hola-blue-dark hover:shadow-lg hover:shadow-hola-blue/30"
                  >
                    View on Menu
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
