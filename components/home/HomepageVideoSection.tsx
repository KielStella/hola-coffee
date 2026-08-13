"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Coffee, Heart, Maximize, Pause, Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

function getTikTokVideoId(url: string) {
  return url.match(/\/video\/(\d+)/)?.[1] ?? null;
}

function StoryCard({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  return (
    <div
      className={`relative hidden aspect-[9/14] overflow-hidden rounded-hola-md border-4 border-white bg-gradient-to-br shadow-xl lg:block ${
        left ? "from-hola-blue to-hola-blue-dark" : "from-hola-yellow-soft to-hola-yellow"
      }`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0_2px,transparent_3px)] [background-size:24px_24px]" />
      <div className="relative flex h-full flex-col items-center justify-center p-7 text-center">
        {left ? (
          <>
            <Coffee className="h-12 w-12 text-white" />
            <p className="mt-5 font-display text-3xl leading-tight text-white">Made fresh.<br />Made happy.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">Your daily cup of sunshine, brewed the HOLA way.</p>
          </>
        ) : (
          <>
            <Heart className="h-12 w-12 fill-hola-brown text-hola-brown" />
            <p className="mt-5 font-display text-3xl leading-tight text-hola-brown">Coffee worth<br />sharing.</p>
            <p className="mt-3 text-sm leading-relaxed text-hola-brown-soft">Good drinks, warm moments, and a community we love.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function HomepageVideoSection({
  url,
  type,
}: {
  url: string | null;
  type: string | null;
}) {
  const tiktokId = type === "tiktok" && url ? getTikTokVideoId(url) : null;
  const tiktokPlayerRef = useRef<HTMLIFrameElement>(null);
  const tiktokFrameRef = useRef<HTMLDivElement>(null);
  const [isTikTokMuted, setIsTikTokMuted] = useState(true);
  const [isTikTokPlaying, setIsTikTokPlaying] = useState(true);

  useEffect(() => {
    function handlePlayerMessage(event: MessageEvent) {
      if (event.origin !== "https://www.tiktok.com") return;
      const message = event.data as { type?: string; value?: unknown; "x-tiktok-player"?: boolean };
      if (message?.["x-tiktok-player"] && message.type === "onMute") {
        setIsTikTokMuted(Boolean(message.value));
      }
      if (message?.["x-tiktok-player"] && message.type === "onStateChange") {
        setIsTikTokPlaying(message.value === 1);
      }
    }

    window.addEventListener("message", handlePlayerMessage);
    return () => window.removeEventListener("message", handlePlayerMessage);
  }, []);

  function toggleTikTokSound() {
    const nextMuted = !isTikTokMuted;
    tiktokPlayerRef.current?.contentWindow?.postMessage(
      { type: nextMuted ? "mute" : "unMute", "x-tiktok-player": true },
      "https://www.tiktok.com",
    );
    setIsTikTokMuted(nextMuted);
  }

  function toggleTikTokPlayback() {
    const nextPlaying = !isTikTokPlaying;
    tiktokPlayerRef.current?.contentWindow?.postMessage(
      { type: nextPlaying ? "play" : "pause", "x-tiktok-player": true },
      "https://www.tiktok.com",
    );
    setIsTikTokPlaying(nextPlaying);
  }

  function openTikTokFullscreen() {
    tiktokFrameRef.current?.requestFullscreen().catch(() => {});
  }

  if (!url) return null;

  return (
    <section className="relative isolate overflow-hidden bg-hola-beige px-4 py-20 sm:py-28">
      <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-hola-blue" />
      <div className="absolute -left-10 -top-24 h-60 w-60 rounded-full bg-hola-yellow" />
      <div className="absolute -bottom-36 -right-24 h-80 w-80 rounded-full bg-hola-blue-dark" />
      <div className="absolute -bottom-28 -right-8 h-64 w-64 rounded-full bg-hola-yellow" />

      <Coffee className="absolute left-[8%] top-36 h-12 w-12 -rotate-12 text-hola-brown/10 sm:h-16 sm:w-16" />
      <Coffee className="absolute right-[8%] top-28 h-10 w-10 rotate-12 text-hola-blue/20 sm:h-14 sm:w-14" />
      <Heart className="absolute bottom-40 right-[7%] hidden h-10 w-10 rotate-12 text-hola-brown/15 sm:block" />
      <Sparkles className="absolute bottom-32 left-[7%] hidden h-12 w-12 text-hola-yellow sm:block" />

      <div className="relative mx-auto max-w-[1280px]">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-hola-blue-dark shadow-sm">
            <Coffee className="h-4 w-4" /> Real stories. Real coffee. Real people.
          </div>
          <h2 className="mt-5 text-4xl leading-tight text-hola-brown sm:text-5xl lg:text-6xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-hola-brown-soft">Real moments from the HOLA community.</p>
          <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-hola-yellow" />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-12">
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-[0.72fr_1.35fr_0.72fr]">
            <StoryCard side="left" />

            <div className="relative mx-auto w-full max-w-2xl">
              <div className="absolute -inset-3 rounded-[2.75rem] bg-gradient-to-br from-hola-yellow via-white to-hola-blue opacity-80 blur-sm" />
              <div className="relative overflow-hidden rounded-hola-lg border-[6px] border-white bg-black shadow-[0_24px_70px_-20px_rgba(74,51,37,0.55)]">
                <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  <Image src="/images/hola-logo-nav.png" alt="" width={42} height={20} className="h-5 w-auto" />
                  HOLA moments
                </div>

                {type === "tiktok" && tiktokId ? (
                  <div ref={tiktokFrameRef} className="relative mx-auto aspect-[9/16] max-h-[720px] max-w-[405px] bg-black">
                    <iframe
                      ref={tiktokPlayerRef}
                      src={`https://www.tiktok.com/player/v1/${tiktokId}?autoplay=1&loop=1&muted=1&controls=0&rel=0`}
                      title="HOLA Coffee TikTok video"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      tabIndex={-1}
                      className="pointer-events-none h-full w-full border-0"
                    />
                    <div className="absolute inset-x-4 bottom-4 z-30 flex items-center justify-center gap-2 rounded-full bg-black/70 p-2 text-white shadow-xl backdrop-blur">
                      <button
                        type="button"
                        onClick={toggleTikTokPlayback}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/20"
                        aria-label={isTikTokPlaying ? "Pause video" : "Play video"}
                        title={isTikTokPlaying ? "Pause" : "Play"}
                      >
                        {isTikTokPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="ml-0.5 h-5 w-5 fill-white" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleTikTokSound}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/20"
                        aria-label={isTikTokMuted ? "Turn video sound on" : "Mute video"}
                        title={isTikTokMuted ? "Turn sound on" : "Mute"}
                      >
                        {isTikTokMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                      <button
                        type="button"
                        onClick={openTikTokFullscreen}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/20"
                        aria-label="View video fullscreen"
                        title="Fullscreen"
                      >
                        <Maximize className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ) : type === "tiktok" ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex aspect-[9/14] flex-col items-center justify-center gap-3 bg-hola-blue-dark px-6 text-center text-white"
                  >
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                      <Play className="ml-1 h-9 w-9 fill-white" />
                    </span>
                    <span className="font-display text-2xl">Watch this video on TikTok</span>
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
                    className="max-h-[720px] min-h-72 w-full bg-black object-contain"
                  >
                    Your browser does not support embedded video.
                  </video>
                )}
              </div>
            </div>

            <StoryCard side="right" />
          </div>

          <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-md">
            <span className="h-2.5 w-2.5 rounded-full bg-hola-blue" />
            <span className="h-3 w-7 rounded-full bg-hola-yellow" />
            <span className="h-2.5 w-2.5 rounded-full bg-hola-blue/30" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
