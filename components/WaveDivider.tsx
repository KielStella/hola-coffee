type WaveDividerProps = {
  color?: string;
  flip?: boolean;
  className?: string;
};

export default function WaveDivider({ color = "var(--hola-beige)", flip = false, className = "" }: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-16 w-full sm:h-24"
      >
        <path
          d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,64 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
