import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const API_BASE_URL = 'http://192.168.133.211:8000';

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const [notifications, setNotifications] = useState([]);

  const [wasteData, setWasteData] = useState({
    totalCollected: 0,
    totalRecycled: 0,
    organicWaste: 0,
    syntheticWaste: 0,
  });

  useEffect(() => {
    checkUserSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      //fetchNotifications();
    }
  }, [isLoggedIn]);


  const fetchWasteData = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        throw new Error("No access token found");
      }
  
      const response = await axios.get(`${API_BASE_URL}/api/waste-data/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setWasteData(response.data);
    } catch (error) {
      console.error("Fetching waste data failed:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWasteData();
    }
  }, [isLoggedIn]);


  const checkUserSession = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        if (isTokenValid(token)) {
          await fetchCurrentUser(token);
        } else {
          await handleTokenRefresh();
        }
      }
    } catch (error) {
      console.error("Session check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  const handleTokenRefresh = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      console.log("Attempting to refresh token with:", `${API_BASE_URL}/api/token/refresh/`);
      
      const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, { refresh: refreshToken });
      console.log("Token refresh response:", response.data);
      
      await AsyncStorage.setItem('access_token', response.data.access);
      await fetchCurrentUser(response.data.access);
    } catch (error) {
      console.error("Token refresh failed:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      logout();
    }
  };

  const fetchCurrentUser = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/current/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Fetching current user failed:", error);
      logout();
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/login/`, { 
        email, 
        password,
        username: email // Include if your backend expects it
      });
      const { access, refresh, user: userData } = response.data;
      await AsyncStorage.setItem('access_token', access);
      await AsyncStorage.setItem('refresh_token', refresh);
      setUser(userData);
      setIsLoggedIn(true);
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    setUser(null);
    setIsLoggedIn(false);
  };

// Add the createBooking function
const createBooking = async (bookingData) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      throw new Error("No access token found");
    }

    // Update the URL to match your Django URL configuration
    const response = await axios.post(`${API_BASE_URL}/bookings/`, bookingData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Creating booking failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Status code:", error.response.status);
    }
    throw error;
  }
};

return (
  <GlobalContext.Provider value={{
    isLoggedIn,
    user,
    isLoading,
    loginUser,
    logout,
    handleTokenRefresh,
    createBooking, // Add createBooking to the context value
    wasteData,
    // notifications,
    //   fetchNotifications,
    //   markNotificationAsRead,
  }}>
    {children}
  </GlobalContext.Provider>
);
};

export default GlobalProvider;