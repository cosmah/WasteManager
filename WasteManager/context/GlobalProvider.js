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
          const response = await axios.get('http://192.168.54.177:8000/api/user/current/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data) {
            setIsLoggedIn(true);
            setUser(response.data); // Set user data received from Django
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;