"use client";

import { Play } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

function getTikTokVideoId(url: string) {
  return url.match(/\/video\/(\d+)/)?.[1] ?? null;
}

export default function HomepageVideoSection({
  url,
  type,
}: {
  url: string | null;
  type: string | null;
}) {
  if (!url) return null;

  const tiktokId = type === "tiktok" ? getTikTokVideoId(url) : null;

  return (
    <section className="bg-hola-beige px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-hola-brown sm:text-4xl">See What&apos;s Brewing</h2>
          <p className="mt-3 text-hola-brown-soft">A little taste of the HOLA Coffee experience.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-12">
          <div className="mx-auto overflow-hidden rounded-hola-lg bg-black shadow-xl">
            {type === "tiktok" && tiktokId ? (
              <div className="mx-auto aspect-[9/16] max-h-[720px] max-w-[405px]">
                <iframe
                  src={`https://www.tiktok.com/player/v1/${tiktokId}?autoplay=1&loop=1&muted=1&controls=1`}
                  title="HOLA Coffee TikTok video"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : type === "tiktok" ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-72 flex-col items-center justify-center gap-3 bg-hola-blue-dark px-6 text-center text-white"
              >
                <Play className="h-12 w-12" />
                <span className="font-display text-xl">Watch this video on TikTok</span>
              </a>
            ) : (
              <video
                src={url}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                className="max-h-[720px] w-full bg-black object-contain"
              >
                Your browser does not support embedded video.
              </video>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
