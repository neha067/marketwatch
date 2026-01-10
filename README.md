# 📈 MarketWatch — Real-Time Trading Widget

A real-time market price widget built using **Next.js, React, and TypeScript**.  
This project simulates a live trading feed, visualizes price trends, and allows users to set safety alerts.

## 🔗 Live Demo  
**https://marketwatch-lake.vercel.app/**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

run the development server:

```bash
npm install &
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Real-time price stream (pseudo WebSocket)
- Line chart showing last 60 seconds of data
- Pause / Resume live feed
- Threshold-based visual alerts
- Price trend indicator
- Memory-safe subscriptions
- Optimized re-rendering for high-frequency updates


## Asynchronous Data Stream

A client-side **PriceFeed** service simulates a WebSocket connection.

It:
- Emits a random price between **100.00 and 200.00**
- Publishes one update every **2 seconds**
- Supports multiple subscribers
- Automatically starts and stops based on active listeners

The React hook `usePriceFeed` manages this stream by subscribing on mount and unsubscribing on pause or unmount, ensuring no memory leaks or background activity.


## Pause / Resume Strategy

When the feed is paused, the widget **fully unsubscribes** from the data stream and stops generating prices.  
When resumed, a **new live stream** is started instead of replaying missed values.

### Why this approach?

In real trading systems, users care about the **current market price**, not historical values that occurred while they were away. Replaying buffered data could:

- Trigger incorrect alerts
- Distort the trend visualization
- Consume unnecessary memory

Starting fresh ensures accuracy, performance, and correct real-time behavior.





## Chart Performance Trade-offs

The chart displays only the **last 60 seconds** of price data (30 ticks maximum).

To ensure high performance:
- A sliding window is used to limit memory growth
- The chart component is memoized (`React.memo`)
- Only the chart re-renders when new prices arrive

### Trade-off

Older historical data is discarded in favor of performance and responsiveness.  
This matches real-time trading dashboards where **live trends matter more than long-term history**.

