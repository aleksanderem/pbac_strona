import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-montserrat text-6xl font-bold mb-4">404</h1>
        <p className="text-white/70 text-lg mb-8">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>
        <Link
          href="/"
          className="inline-block gradient-button text-white rounded-full uppercase text-xs tracking-wider px-8 py-3 font-bold transition-opacity hover:opacity-90"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
