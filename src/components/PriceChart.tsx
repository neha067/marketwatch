"use client";
import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import moment from 'moment'
interface Props {
  priceData: { price: number; time: string }[];
}

export const PriceChart = React.memo(({ priceData }: Props) => {
  const data = priceData.map((p) => ({
    price: p.price,
    time: (new Date(p.time)).getTime(),  
  }));

  useEffect(() => {
    console.log('priceData',priceData);  
    
  }, [priceData]);
  const timeFormatter = (unixTime : number) => {
    const date = new Date(unixTime);
    return date.toLocaleTimeString();
    //
    // return moment(unixTime).format('MMM Do YYYY');
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="price" dot={false} stroke="#0ea5e9" />
        <XAxis dataKey="time" 
          // scale="time"
          // type="number"
          tickFormatter={timeFormatter}/>
        <YAxis domain={["auto", "auto"]} />
        <Tooltip labelFormatter={timeFormatter} />
      </LineChart>
    </ResponsiveContainer>
  );
});
