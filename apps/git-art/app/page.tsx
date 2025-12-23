import GitGrid from "./components/GitGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="max-w-6xl mx-auto mb-10 pt-10 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
          Git History Artist
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Draw on your GitHub contribution graph. Enter text or click pixels, then run the generated script in a new repo.
        </p>
      </header>

      <main>
        <GitGrid />
      </main>
    </div>
  );
}
