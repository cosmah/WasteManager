import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token'); // Assuming you store the token in AsyncStorage
        if (token) {
          // Verify the token by making a request to your Django backend
          const response = await axios.get('http://192.168.251.26:8000/api/user/current/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user or bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const getCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        const response = await axios.get('http://192.168.251.26:8000/api/user/current/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  };

  return (
    <GlobalContext.Provider value={{ isLoggedIn, user, isLoading, getCurrentUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;