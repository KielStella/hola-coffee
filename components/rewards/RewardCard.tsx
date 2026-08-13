import { Sparkles } from "lucide-react";
import RewardArt from "./RewardArt";
import type { Reward } from "@/lib/rewards-data";

export default function RewardCard({
  reward,
  currentPoints,
  onRedeem,
}: {
  reward: Reward;
  currentPoints: number;
  onRedeem: (reward: Reward) => void;
}) {
  const available = currentPoints >= reward.points;
  const pointsNeeded = reward.points - currentPoints;

  return (
    <div
      className={`group h-full overflow-hidden rounded-hola-lg bg-white shadow-md ring-1 ring-hola-brown/5 transition duration-300 ${
        available ? "hover:-translate-y-2 hover:shadow-2xl" : "opacity-60"
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <div className={`h-full w-full transition duration-500 ${available ? "group-hover:scale-110" : ""}`}>
          <RewardArt category={reward.category} name={reward.name} image={reward.image} className="h-full w-full" />
        </div>
        {reward.badge && (
          <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-hola-yellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-hola-brown shadow">
            <Sparkles className="h-3 w-3" /> {reward.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg text-hola-brown">{reward.name}</h3>
          <span className="whitespace-nowrap font-display text-hola-blue-dark">{reward.points} pts</span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-hola-brown-soft">{reward.description}</p>
        <button
          type="button"
          disabled={!available}
          onClick={() => onRedeem(reward)}
          className={`mt-4 w-full rounded-full px-5 py-2.5 text-sm font-display transition ${
            available
              ? "bg-hola-brown text-white shadow-[0_0_0_0_rgba(90,169,230,0)] hover:bg-hola-blue-dark hover:shadow-[0_0_20px_2px_rgba(90,169,230,0.45)]"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }`}
        >
          {available ? "Redeem Reward" : `Need ${pointsNeeded} More Points`}
        </button>
      </div>
    </div>
  );
}
