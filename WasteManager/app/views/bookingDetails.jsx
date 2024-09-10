import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from '@/context/GlobalProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);

const API_BASE_URL = 'http://192.168.133.211:8000';

const BookingDetails = () => {
  const { id } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (user) {
        try {
          const token = await AsyncStorage.getItem('access_token');
          const response = await axios.get(`${API_BASE_URL}/bookings/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBooking(response.data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBookingDetails();
  }, [id, user]);

  const formatTime = (timeString) => {
    if (!timeString) return 'No time';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date instanceof Date && !isNaN(date) 
      ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : 'Invalid Time';
  };


  if (isLoading) {
    return (
      <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </StyledSafeAreaView>
    );
  }

  if (!booking) {
    return (
      <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
        <StyledText>Booking not found</StyledText>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
      <StyledView style={styles.header}>
        <StyledText
          className="text-2xl font-psemibold text-secondary"
          style={styles.title}
        >
          Booking Details
        </StyledText>
      </StyledView>
      <StyledView style={styles.content} className="rounded-xl p-4">
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Phone:</Text>
          <Text>{booking.phone}</Text>
        </StyledView>
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Address:</Text>
          <Text>{booking.address}</Text>
        </StyledView>
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Service Type:</Text>
          <Text>{booking.service_type}</Text>
        </StyledView>
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Service Frequency:</Text>
          <Text>{booking.service_frequency}</Text>
        </StyledView>
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Waste Type:</Text>
          <Text>{booking.waste_type}</Text>
        </StyledView>
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Waste Volume:</Text>
          <Text>{booking.waste_volume}</Text>
        </StyledView>
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Emergency Contact:</Text>
          <Text>{booking.emergency_contact}</Text>
        </StyledView>
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Date:</Text>
          <Text>{new Date(booking.pickup_date).toLocaleDateString()}</Text>
        </StyledView>
        <StyledView style={styles.bookingText}>
          <Text style={styles.label}>Time:</Text>
          <StyledText style={styles.bookingText}>Time: {formatTime(booking.pickup_time)}</StyledText>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 0.9,
    backgroundColor: "#7A7777",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bookingText: {
    fontSize: 20,
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
  },
});

export default BookingDetails;