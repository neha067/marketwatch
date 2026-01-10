import MarketWidget from "@/components/MarketWidget";

export default function Home() {
  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MarketWatch</h1>
      <MarketWidget />
    </main>
  );
}
