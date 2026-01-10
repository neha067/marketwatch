"use client";
import { useState, useMemo } from "react";
import { usePriceFeed } from "@/hooks/usePriceFeed";
import { PriceChart } from "./PriceChart";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
export default function MarketWidget() {
  const [paused, setPaused] = useState(false);
  const [threshold, setThreshold] = useState<number | null>(null);

  const prices = usePriceFeed(paused);

  const latest = prices.at(-1);
  const previous = prices.at(-2);

  const trend = useMemo(() => {
    if (!latest || !previous) return "";
    return latest > previous ? "⬆" : "⬇";
  }, [latest, previous]);

  const alert = threshold !== null && latest && latest > threshold;

  return (
    <div className={`p-4 rounded-xl shadow-md border ${alert ? "border-red-500" : "border-gray-300"}`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          Status: {paused ? "⏸ Paused" : "🟢 Live"}
        </div>
        <Button
          onClick={() => setPaused((p) => !p)}
          className="px-3 py-1"
        >
          {paused ? "Resume" : "Pause"}
        </Button>
      </div>

      <div className="text-3xl font-bold">
        {latest?.toFixed(2) ?? "--"} {trend}
      </div>

      <Input
        type="number"
        placeholder="Set alert threshold"
        className="border p-2 mt-2 w-full"
        onChange={(e) => {
          const v = Number(e.target.value);
          setThreshold(isNaN(v) ? null : v);
        }}
      />

      <PriceChart prices={prices} />
    </div>
  );
}
