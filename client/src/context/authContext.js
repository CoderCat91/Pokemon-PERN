// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth');
  return isAuth && JSON.parse(isAuth) === true;
};

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(userAuthFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth));
  }, [isAuth]);

  const authenticateUser = () => {
    setIsAuth(true);
  };

  const unauthenticateUser = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, authenticateUser, unauthenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
