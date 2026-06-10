import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => boolean;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-sm p-8 bg-white border border-tactile-divider shadow-xs rounded-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 rounded-full mb-4">
            <MaterialIcon name="admin_panel_settings" className="text-2xl text-amber-600" />
          </div>
          <h2 className="text-2xl font-serif text-charcoal-ink">Admin Portal</h2>
          <p className="text-sm text-stone-gray mt-2">Enter credentials to manage lookbook.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-gray uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-warm-beige border border-tactile-divider rounded-lg focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-stone-gray uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-warm-beige border border-tactile-divider rounded-lg focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-xs italic">Invalid credentials. Please try again.</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-semibold tracking-wide text-sm flex justify-center items-center gap-2"
          >
            <span>Unlock Workspace</span>
            <MaterialIcon name="arrow_forward" className="text-[18px]" />
          </button>
        </form>
      </div>
    </div>
  );
}
