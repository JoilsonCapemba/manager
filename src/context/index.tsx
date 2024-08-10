'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthProviderContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  telephone: string;
  setTelephone: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  saldo: string;
  setSaldo: React.Dispatch<React.SetStateAction<string>>;
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

  // Persistência dos dados no localStorage (opcional)
  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const { user, email, telephone } = JSON.parse(storedData);
      setUser(user);
      setEmail(email);
      setTelephone(telephone);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify({ user, email, telephone }));
    }
  }, [user, email, telephone]);

  return (
    <Context.Provider value={{ user, setUser, telephone, setTelephone, email, setEmail, saldo, setSaldo }}>
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
