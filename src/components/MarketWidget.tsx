"use client";
import { useState, useMemo, useEffect } from "react";
import { usePriceFeed } from "@/hooks/usePriceFeed";
import { PriceChart } from "./PriceChart";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, Radio, Pause } from "lucide-react";
export default function MarketWidget() {
  const [paused, setPaused] = useState(false);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>(
    threshold != null ? String(threshold) : ""
  );
  const [inputError, setInputError] = useState<string | null>(null);

  const priceData = usePriceFeed(paused);

  const prices = useMemo(() => priceData.map((p) => p.price), [priceData]);

  const latest = prices.at(-1);
  const previous = prices.at(-2);

  const trend = useMemo(() => { 
    if (!latest || !previous) return "";
    return latest > previous ? <TrendingUp /> : <TrendingDown />;
  }, [latest, previous]);

  const alert = threshold !== null && latest && latest > threshold;

  return (
    <div className={`p-4 rounded-xl shadow-md  ${threshold && threshold > 0 && alert ? "border-3 border-red-500" : "border-gray-300"}`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          {paused ? (
            <>
              <Pause className="inline-block h-4 w-4 mr-1" /> Paused
            </>
          ) : (
            <>
              <div className="flex gap-2">
              <span className="inline-flex items-center mr-1">
                <span className="relative inline-flex h-4 w-4">
                  <span className="absolute inset-0 m-auto h-full w-full rounded-full bg-red-500 opacity-30 animate-ping" />
                  <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-red-600" />
                  {/* <Radio className="relative h-4 w-4 text-red-600" /> */}
                </span>
              </span>
              Live
              </div>
            </>
          )}
        </div>
        <Button
          onClick={() => setPaused((p) => !p)}
          className="px-3 py-1 cursor-pointer"
        >
          {paused ? "Resume" : "Pause"}
        </Button>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-3xl font-bold flex gap-1 flex-1 items-center">
          {latest?.toFixed(2) ?? "--"}
          <span> {trend} </span>
        </div>

        <div className="flex flex-col w-[40%]">
          <Input
            type="text"
            placeholder="Set alert threshold"
            className={`border p-2 ${inputError ? "border-red-500" : ""}`}
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);

              if (val === "") {
                setThreshold(null);
                setInputError(null);
                return;
              }

              const parsed = Number(val);
              if (!isNaN(parsed) && isFinite(parsed)) {
                setThreshold(parsed);
                setInputError(null);
              } else {
                setThreshold(null);
                setInputError("must be a valid number");
              }
            }}
          />
          {inputError ? (
            <div className="text-sm text-red-500 mt-1">{inputError}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-4">
      <PriceChart priceData={priceData} />
      </div>
    </div>
  );
}
