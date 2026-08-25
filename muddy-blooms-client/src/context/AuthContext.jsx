import { createContext, useContext, useState } from 'react';
import { BASE_URL } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(
    !!sessionStorage.getItem('muddy_admin_token')
  );

  const login = async (password) => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      sessionStorage.setItem('muddy_admin_token', data.token);
      setIsAdmin(true);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('muddy_admin_token');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}