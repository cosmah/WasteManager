import AsyncStorage from '@react-native-async-storage/async-storage';

export async function refreshToken() {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    console.log('Refresh Token:', refreshToken); // Debugging

    const response = await fetch('http://192.168.78.177:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('accessToken', data.access); // Store the new access token
      console.log('New Access Token:', data.access); // Debugging
      return data.access;
    } else {
      const errorData = await response.json();
      console.error('Refresh Token Error:', errorData); // Debugging
      throw new Error('Unable to refresh token');
    }
  } catch (error) {
    console.error('Error in refreshToken:', error); // Debugging
    throw error;
  }
}