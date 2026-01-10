"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface Props {
  prices: number[];
}

export const PriceChart = React.memo(({ prices }: Props) => {
  const data = prices.map((p, i) => ({ index: i, price: p }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="price" dot={false} stroke="#0ea5e9" />
        <XAxis dataKey="index" hide />
        <YAxis domain={["auto", "auto"]} />
      </LineChart>
    </ResponsiveContainer>
  );
});
