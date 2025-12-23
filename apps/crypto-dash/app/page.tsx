import CryptoDashboard from "./components/CryptoDashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="max-w-7xl mx-auto mb-10 pt-10 border-b border-zinc-800 pb-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
          High-Frequency Dashboard
        </h1>
        <p className="text-zinc-400 text-lg">
          Real-time institutional grade market data.
        </p>
      </header>

      <main>
        <CryptoDashboard />
      </main>
    </div>
  );
}
