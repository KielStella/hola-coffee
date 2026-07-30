import { Sparkles, DoorOpen, Users, Rocket } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { storyTimeline } from "@/lib/data";

const iconMap = {
  dream: Sparkles,
  "opening-day": DoorOpen,
  "growing-community": Users,
  "future-goals": Rocket,
};

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="absolute left-6 top-2 h-[calc(100%-1rem)] w-0.5 bg-hola-blue/25 sm:left-1/2 sm:-translate-x-1/2"
        aria-hidden="true"
      />
      <ol className="space-y-12">
        {storyTimeline.map((event, i) => {
          const Icon = iconMap[event.id as keyof typeof iconMap];
          const alignRight = i % 2 === 1;
          return (
            <li key={event.id} className="relative">
              <AnimatedSection
                direction={alignRight ? "right" : "left"}
                className={`flex items-start gap-5 sm:w-1/2 ${
                  alignRight ? "sm:ml-auto sm:flex-row-reverse sm:text-right" : ""
                }`}
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hola-blue text-white shadow-md sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div
                  className={`rounded-hola-lg bg-white p-6 shadow-md sm:mt-0 ${
                    alignRight ? "sm:mr-8" : "sm:ml-8"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-hola-blue-dark">{event.year}</p>
                  <h3 className="mt-1 text-xl text-hola-brown">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">{event.description}</p>
                </div>
              </AnimatedSection>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
