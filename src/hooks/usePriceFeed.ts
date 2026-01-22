import { useEffect, useRef, useState } from "react";
import { PriceFeed } from "@/services/priceFeed";

export function usePriceFeed(paused: boolean) {
  const feedRef = useRef<PriceFeed | null>(null);
  const [prices, setPrices] = useState<{ price: number; time: string }[]>([]);

  if (!feedRef.current) {
    feedRef.current = new PriceFeed();
  }

  useEffect(() => {
    if (paused) return;

    const unsubscribe = feedRef.current!.subscribe((price) => {
      setPrices((prev) => {
        const next = [...prev, price];
        if (next.length > 30) next.shift(); // last 60s (30 ticks)
        return next;
      });
    });

    return unsubscribe;
  }, [paused]);

  return prices;
}
