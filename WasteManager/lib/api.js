import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to login user and store token
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://192.168.78.177:8000/api/token/', credentials);
    const { access } = response.data;
    await AsyncStorage.setItem('token', access);
    console.log('Token stored:', access); // Debugging line
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response.data);
    return null;
  }
};

// Function to get current user using stored token
export const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Retrieved token:', token); // Debugging line
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://192.168.78.177:8000/api/user/current/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://192.168.78.177:8000/api/user/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response.data);
    return null;
  }
};