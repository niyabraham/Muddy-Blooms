import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const ADMIN_PASSWORD = "muddyblooms"; // change this to your own password

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem('muddy_admin') === 'true'
  );

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('muddy_admin', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('muddy_admin');
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