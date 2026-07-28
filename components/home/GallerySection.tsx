"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, X, Images } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Skeleton from "@/components/Skeleton";
import { galleryImages } from "@/lib/rewards-data";

const tileGradients = [
  "from-hola-blue to-hola-blue-dark",
  "from-hola-yellow-soft to-hola-yellow",
  "from-hola-brown-soft to-hola-brown",
  "from-emerald-400 to-hola-blue-dark",
  "from-hola-blue to-hola-brown-soft",
  "from-hola-brown to-hola-yellow",
];

export default function GallerySection() {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-hola-brown sm:text-4xl">Moments at HOLA Coffee</h2>
          <p className="mt-3 text-hola-brown-soft">Coffee, conversations, and cozy memories.</p>
        </AnimatedSection>

        {loading ? (
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-hola-lg" />
            ))}
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="mt-14 flex flex-col items-center py-10 text-center">
            <Images className="h-10 w-10 text-hola-brown-soft/40" />
            <p className="mt-3 font-display text-lg text-hola-brown">No photos available.</p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {galleryImages.map((img, i) => (
              <AnimatedSection key={img.id} delay={(i % 3) * 0.08}>
                <button
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View: ${img.caption}`}
                  className={`group relative aspect-square w-full overflow-hidden rounded-hola-lg bg-gradient-to-br ${tileGradients[i % tileGradients.length]} shadow-md`}
                >
                  <Camera
                    className="absolute inset-0 m-auto h-10 w-10 text-white/70 transition duration-500 group-hover:scale-125"
                    strokeWidth={1.5}
                  />
                  <div className="absolute inset-0 flex items-end bg-black/0 p-3 opacity-0 transition duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                    <p className="text-left text-xs font-medium text-white">{img.caption}</p>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-hola-brown/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
          >
            <motion.div
              className={`relative w-full max-w-lg overflow-hidden rounded-hola-lg bg-gradient-to-br ${tileGradients[activeIndex % tileGradients.length]} p-16 shadow-2xl`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Camera className="mx-auto h-16 w-16 text-white/80" strokeWidth={1.5} />
              <p className="mt-6 text-center font-display text-lg text-white">
                {galleryImages[activeIndex].caption}
              </p>
              <button
                onClick={() => setActiveIndex(null)}
                aria-label="Close preview"
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-hola-brown shadow transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
