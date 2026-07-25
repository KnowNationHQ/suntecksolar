import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-surface-700 mb-4">404</h1>
        <p className="text-surface-400 mb-6">Page not found</p>
        <Link href="/" className="text-gold-500 hover:text-gold-400 underline text-sm">Return to Home</Link>
      </div>
    </div>
  );
}
