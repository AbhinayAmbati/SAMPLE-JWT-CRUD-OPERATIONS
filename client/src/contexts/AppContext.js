import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return Boolean(localStorage.getItem("token")); 
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || '';
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(false);
    setUsername('');
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (user && storedUsername) {
      setUsername(storedUsername);
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, username, setUsername, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
