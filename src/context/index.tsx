'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthProviderContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  telephone: string;
  setTelephone: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  saldo: string;
  setSaldo: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void; // Função de logout
}

const Context = createContext<AuthProviderContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [saldo, setSaldo] = useState<string>('');

  const logout = () => {
    setUser('');
    setTelephone('');
    setEmail('');
    setSaldo('');
    localStorage.removeItem('user'); // Limpa o armazenamento local
  };

  return (
    <Context.Provider value={{ user, setUser, telephone, setTelephone, email, setEmail, saldo, setSaldo, logout }}>
      {children}
    </Context.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { Context };
