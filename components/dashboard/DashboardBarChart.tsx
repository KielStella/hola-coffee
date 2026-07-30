"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export type ChartDatum = { label: string; value: number };

export default function DashboardBarChart({ data, color = "#5AA9E6" }: { data: ChartDatum[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#FFF8EC" />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#7A5B45" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#7A5B45" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #FFF8EC", fontSize: 13 }}
          cursor={{ fill: "#FFF8EC" }}
        />
        <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
