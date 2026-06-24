import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="bg-cream min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-8xl mb-6">🌿</p>
      <h1 className="font-display text-5xl text-forest font-bold mb-3">404</h1>
      <p className="text-fern text-xl mb-2">Page not found</p>
      <p className="text-gray-400 mb-8">Looks like this page got lost in the garden.</p>
      <Link to="/"
        className="bg-forest text-white px-8 py-3 rounded-full hover:bg-fern transition font-bold text-sm">
        Back to Home
      </Link>
    </div>
  );
}