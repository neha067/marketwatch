export type PriceListener = (price: { price: number; time: string }) => void;

export class PriceFeed {
  private intervalId: NodeJS.Timeout | null = null;
  private listeners = new Set<PriceListener>();

  private generatePrice(): number {
    return +(100 + Math.random() * 100).toFixed(2);
  }

  private start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      const price = this.generatePrice();
      const time = new Date().toISOString();

      this.listeners.forEach((cb) => cb({price, time}));
    }, 2000);
  }

  private stop() {
    if (!this.intervalId) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  subscribe(cb: PriceListener) {
    this.listeners.add(cb);
    this.start();

    return () => this.unsubscribe(cb);
  }

  unsubscribe(cb: PriceListener) {
    this.listeners.delete(cb);
    if (this.listeners.size === 0) {
      this.stop();
    }
  }
}
