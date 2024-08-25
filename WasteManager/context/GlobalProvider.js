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
          const response = await axios.get('http://192.168.166.26:8000/api/user/current/', {
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
      const token = await AsyncStorage.getItem('access_token');// Assuming you store the token in AsyncStorage
      const response = await axios.get("http://192.168.166.26:8000/api/user/current/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        console.log("Current user data:", response.data);
        return response.data;
      } else {
        console.error("Unexpected response status:", response.status);
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://192.168.166.26:8000/api/user/login/', {
        email,
        password
      });
      const { access, refresh } = response.data;
      await AsyncStorage.setItem('access_token', access);
      await AsyncStorage.setItem('refresh_token', refresh);
      setUser(response.data.user);
      setIsLoggedIn(true);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <GlobalContext.Provider value={{ isLoggedIn, user, isLoading, getCurrentUser, loginUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;