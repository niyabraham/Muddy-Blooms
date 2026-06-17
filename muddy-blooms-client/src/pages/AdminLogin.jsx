import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="bg-forest min-h-screen flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-10 shadow-xl max-w-sm w-full">
        <div className="text-center mb-8">
          <p className="text-4xl mb-3">🌿</p>
          <h1 className="font-display text-2xl text-forest font-bold">Admin Access</h1>
          <p className="text-fern text-sm mt-1">Muddy Blooms Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Enter admin password"
            autoFocus
            className={`px-4 py-3 rounded-xl border text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf ${
              error ? 'border-red-300' : 'border-gray-200'
            }`}
          />

          {error && (
            <p className="text-red-500 text-xs text-center">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            className="bg-forest text-white py-3 rounded-full font-bold text-sm hover:bg-fern transition">
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}