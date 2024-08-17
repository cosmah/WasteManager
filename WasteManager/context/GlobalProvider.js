import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, getProfile } from '@/lib/api';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const profile = await getProfile();
        setUserProfile(profile);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <GlobalContext.Provider value={{ isLoading, isLoggedIn, userProfile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
