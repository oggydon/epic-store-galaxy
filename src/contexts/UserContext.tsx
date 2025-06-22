
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isModerator: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock users - in a real app, this would come from a backend
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' as const },
  { id: 2, username: 'moderator', email: 'mod@example.com', password: 'mod123', role: 'moderator' as const },
  { id: 3, username: 'user', email: 'user@example.com', password: 'user123', role: 'user' as const },
];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser({
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role
      });
      console.log('Login successful:', foundUser.role);
      return true;
    }
    console.log('Login failed');
    return false;
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out');
  };

  const isLoggedIn = user !== null;
  const isAdmin = user?.role === 'admin';
  const isModerator = user?.role === 'moderator' || user?.role === 'admin';

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn,
      isAdmin,
      isModerator
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
