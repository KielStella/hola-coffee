"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Award, Check, ChevronDown, Gift, History, LockKeyhole, Repeat, Search, ShoppingBag, Sparkles, Star, Trophy, X } from "lucide-react";
import CircularProgress from "@/components/rewards/CircularProgress";
import RewardCard from "@/components/rewards/RewardCard";
import RedeemModal from "@/components/rewards/RedeemModal";
import { useLoyalty } from "@/lib/loyalty-context";
import { rewardCategories, type Reward, type RewardCategory } from "@/lib/rewards-data";

type Filter = "All" | "Available" | RewardCategory;
type Sort = "recommended" | "points-low" | "points-high";

export default function RewardsBrowser({ rewards }: { rewards: Reward[] }) {
  const { points, tier, ordersCompleted, redeemedHistory, nextRewardTarget, nextRewardName, isLoadingAccount } = useLoyalty();
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("recommended");
  const [query, setQuery] = useState("");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const pointsToNext = Math.max(0, nextRewardTarget - points);
  const progress = Math.min(100, (points / nextRewardTarget) * 100);

  const visibleRewards = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rewards.filter(reward => filter === "All" || filter === "Available" ? filter !== "Available" || reward.points <= points : reward.category === filter)
      .filter(reward => !normalized || `${reward.name} ${reward.description} ${reward.category}`.toLowerCase().includes(normalized))
      .sort((a, b) => sort === "points-low" ? a.points - b.points : sort === "points-high" ? b.points - a.points : (Number(b.points <= points) - Number(a.points <= points)) || a.points - b.points);
  }, [rewards, filter, query, sort, points]);

  const filters: Filter[] = ["All", "Available", ...rewardCategories];
  const stats = [{ label: "Current tier", value: tier, Icon: Award }, { label: "Completed orders", value: ordersCompleted, Icon: ShoppingBag }, { label: "Rewards claimed", value: redeemedHistory.length, Icon: Repeat }];

  return <>
    <section className="relative isolate overflow-hidden bg-hola-blue-dark px-4 py-16 text-white sm:py-24">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_15%,rgba(248,220,107,.28),transparent_26%),radial-gradient(circle_at_88%_78%,rgba(255,255,255,.16),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 opacity-15 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_.92fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.22,1,.36,1] }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-hola-yellow"><Sparkles className="h-4 w-4" /> Every sip gets you closer</span>
          <h1 className="mt-6 text-5xl leading-[.94] tracking-[-.04em] sm:text-7xl">Your coffee habit<br /><span className="text-hola-yellow">has perks.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">Collect points on every completed order, unlock treats you love, and turn an ordinary coffee run into something rewarding.</p>
          <a href="#rewards-catalog" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-hola-yellow px-7 py-4 font-display text-hola-brown shadow-xl transition hover:-translate-y-1 hover:bg-white">Explore rewards <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></a>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 35, scale: .95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .85, delay: .12, ease: [0.22,1,.36,1] }} className="rounded-[2.75rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
          <div className="flex flex-col items-center gap-8 sm:flex-row"><CircularProgress value={points} max={nextRewardTarget} size={176} label={isLoadingAccount ? "…" : `${points}`} sublabel="points balance" /><div className="flex-1 text-center sm:text-left"><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs uppercase tracking-wider text-white/70"><Trophy className="h-4 w-4 text-hola-yellow" /> {tier} member</span><p className="mt-4 font-display text-2xl">{pointsToNext > 0 ? `${pointsToNext} points to go` : "Reward unlocked!"}</p><p className="mt-2 text-sm leading-6 text-white/60">Your next milestone is a <strong className="text-white">{nextRewardName}</strong>.</p></div></div>
          <div className="mt-7 h-2.5 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, delay: .4 }} className="h-full rounded-full bg-gradient-to-r from-hola-yellow to-white" /></div>
          <div className="mt-7 grid grid-cols-3 divide-x divide-white/10">{stats.map(({label,value,Icon}) => <div key={label} className="px-2 text-center"><Icon className="mx-auto h-5 w-5 text-hola-yellow" /><p className="mt-2 font-display text-xl">{isLoadingAccount ? "—" : value}</p><p className="mt-1 text-[10px] uppercase leading-4 tracking-wider text-white/50">{label}</p></div>)}</div>
        </motion.div>
      </div>
    </section>

    <section className="bg-hola-yellow-soft px-4 py-6"><div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-3">{[{n:"01",title:"Order",copy:"Choose your HOLA favorites."},{n:"02",title:"Earn",copy:"Points arrive after completion."},{n:"03",title:"Redeem",copy:"Show your QR at the counter."}].map((step,index) => <div key={step.n} className={`flex items-center gap-4 px-4 py-3 ${index ? "sm:border-l sm:border-hola-brown/10" : ""}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-hola-blue-dark shadow-sm">{step.n}</span><div><p className="font-display text-lg text-hola-brown">{step.title}</p><p className="text-xs text-hola-brown-soft">{step.copy}</p></div></div>)}</div></section>

    <section id="rewards-catalog" className="min-h-[700px] bg-[#fffdf9] px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><span className="text-xs font-bold uppercase tracking-[.18em] text-hola-blue-dark">The reward shelf</span><h2 className="mt-4 text-4xl text-hola-brown sm:text-6xl">Pick your next treat.</h2><p className="mt-3 text-hola-brown-soft">{visibleRewards.length} rewards to explore</p></div><div className="flex flex-col gap-3 sm:flex-row"><label className="relative"><span className="sr-only">Search rewards</span><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-hola-brown-soft" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search rewards..." className="w-full rounded-full border border-hola-brown/10 bg-white py-3 pl-11 pr-10 text-sm outline-none focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/20 sm:w-64" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1"><X className="h-4 w-4" /></button>}</label><label className="relative"><span className="sr-only">Sort rewards</span><select value={sort} onChange={e => setSort(e.target.value as Sort)} className="w-full appearance-none rounded-full border border-hola-brown/10 bg-white py-3 pl-5 pr-11 text-sm outline-none focus:border-hola-blue"><option value="recommended">Recommended</option><option value="points-low">Points: low to high</option><option value="points-high">Points: high to low</option></select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-hola-blue-dark" /></label></div></div>
        <div className="mt-9 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Reward filters">{filters.map(item => <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={`shrink-0 rounded-full px-5 py-2.5 font-display text-sm transition ${filter === item ? "bg-hola-brown text-white shadow-lg" : "bg-hola-beige text-hola-brown hover:bg-hola-yellow-soft"}`}>{item === "Available" && <Check className="mr-1.5 inline h-4 w-4" />}{item}</button>)}</div>
        <AnimatePresence mode="wait">{visibleRewards.length ? <motion.div key={`${filter}-${sort}-${query}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visibleRewards.map((reward,index) => <motion.div key={reward.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index*.045,.3) }}><RewardCard reward={reward} currentPoints={points} onRedeem={setSelectedReward} /></motion.div>)}</motion.div> : <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 flex flex-col items-center rounded-[2.5rem] border-2 border-dashed border-hola-blue/20 bg-hola-beige/60 px-6 py-20 text-center"><Gift className="h-12 w-12 text-hola-blue/40" /><h3 className="mt-4 text-2xl text-hola-brown">No rewards match yet.</h3><p className="mt-2 text-sm text-hola-brown-soft">Try another filter or browse the full reward shelf.</p><button type="button" onClick={() => {setFilter("All");setQuery("");}} className="mt-6 rounded-full bg-hola-brown px-6 py-3 font-display text-white">Show all rewards</button></motion.div>}</AnimatePresence>
        <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-hola-beige p-6 sm:flex-row"><div className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-white"><LockKeyhole className="h-5 w-5 text-hola-blue-dark" /></span><div><p className="font-display text-lg text-hola-brown">Your activity, always within reach</p><p className="text-sm text-hola-brown-soft">Review earned points and previous redemptions anytime.</p></div></div><div className="flex flex-wrap gap-3"><Link href="/rewards/history" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-display text-hola-brown shadow-sm transition hover:-translate-y-1"><History className="h-4 w-4" /> Rewards</Link><Link href="/rewards/points" className="inline-flex items-center gap-2 rounded-full bg-hola-brown px-5 py-3 font-display text-white transition hover:-translate-y-1 hover:bg-hola-blue-dark"><Star className="h-4 w-4" /> Points</Link></div></div>
      </div>
    </section>
    <RedeemModal reward={selectedReward} onClose={() => setSelectedReward(null)} />
  </>;
}
