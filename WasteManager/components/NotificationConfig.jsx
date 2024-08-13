import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Button } from 'react-native';
import { fetchBookings, sendNotification } from '@/lib/appwrite';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from "@/components/NotificationConfig";

const BookingScreen = ({ email }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const bookingsData = await fetchBookings(email);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookingsData();

    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
      Alert.alert('Notification Received', notification.request.content.body);
    });

    return () => subscription.remove();
  }, [email]);

  const scheduleLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: 'Your booking is starting soon.',
      },
      trigger: { seconds: 120 }, // 2 minutes from now
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={styles.bookingText}>Name: {item.name}</Text>
            <Text style={styles.bookingText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.bookingText}>Time: {new Date(item.time).toLocaleTimeString()}</Text>
            <Button title="Set Reminder" onPress={scheduleLocalNotification} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookingText: {
    fontSize: 18,
  },
});

export default BookingScreen;