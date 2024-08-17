import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from './auth';

const BASE_URL = 'http://192.168.78.177:8000/api/user/';

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}register/`, data);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}token/`, data); // Ensure this matches your Django login endpoint
    await AsyncStorage.setItem('accessToken', response.data.access);
    await AsyncStorage.setItem('refreshToken', response.data.refresh); // Store refresh token
    console.log('Login Successful:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    let token = await AsyncStorage.getItem('accessToken');
    console.log('Access Token:', token); // Debugging

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    let response = await axios.get(`${BASE_URL}profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If the response is successful, return the profile data
    console.log('Profile Data:', response.data); // Debugging
    return response.data;

  } catch (error) {
    // If the error is a 401, try refreshing the token
    if (error.response && error.response.status === 401) {
      console.log('Access token expired, refreshing token...');
      try {
        token = await refreshToken(); // Ensure refreshToken is working as expected
        const response = await axios.get(`${BASE_URL}profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile Data after refresh:', response.data); // Debugging
        return response.data;
      } catch (refreshError) {
        console.error('Error during token refresh:', refreshError.response ? refreshError.response.data : refreshError.message);
        throw refreshError; // Rethrow the error after logging it
      }
    } else {
      console.error("Profile Fetch Error:", error.response ? error.response.data : error.message); // Debugging
      throw error;
    }
  }
};
