import FixDecoder from "./components/FixDecoder";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="max-w-4xl mx-auto mb-12 text-center pt-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
          FIX Protocol Decoder
        </h1>
        <p className="text-zinc-400 text-lg">
          Instant parsing for Financial Information eXchange messages.
        </p>
      </header>

      <main>
        <FixDecoder />
      </main>
    </div>
  );
}
