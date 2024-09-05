import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useGlobalContext } from '@/context/GlobalProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const API_BASE_URL = 'http://192.168.42.211:8000';

const Profile = () => {
  const { user, isLoading } = useGlobalContext();
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const token = await AsyncStorage.getItem('access_token');
          const response = await axios.get(`${API_BASE_URL}/bookings/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Bookings:", response.data);
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          if (error.response) {
            console.error("Error data:", error.response.data);
            console.error("Error status:", error.response.status);
          }
        }
      }
    };

    fetchBookings();
  }, [user]);

  if (isLoading || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
      <StyledView style={{ flex: 1 }}>
        <StyledView className="flex-row items-center mb-6 p-5" style={styles.profileContainer}>
          {user.avatar && (
            <StyledImage className="" source={{ uri: user.avatar }} style={styles.avatar} />
          )}
          <StyledView style={styles.infoContainer}>
            <StyledText
              className="text-2xl font-psemibold text-secondary"
              style={styles.name}
            >
              {user.username}
            </StyledText>
            <StyledText
              className="text-2xl font-psemibold text-secondary-100"
              style={styles.email}
            >
              {user.email}
            </StyledText>
          </StyledView>
        </StyledView>

        <StyledView
          style={{ backgroundColor: "#7A7777", flex: 1 }}
          className="rounded-xl"
        >
          <StyledView className="flex-row justify-around mt-5">
            <ScrollView>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TouchableOpacity
                    key={booking.id}
                    style={styles.bookingItem}
                    onPress={() => router.push(`/views/bookingDetails?id=${booking.id}`)}
                  >
                    <StyledText style={styles.bookingText}>Service Type: {booking.serviceType}</StyledText>
                    <StyledText style={styles.bookingText}>Date: {new Date(booking.pickupDate).toLocaleDateString()}</StyledText>
                    <StyledText style={styles.bookingText}>Time: {new Date(booking.pickupTime).toLocaleTimeString()}</StyledText>
                  </TouchableOpacity>
                ))
              ) : (
                <StyledText style={styles.noBookingsText}>No bookings found.</StyledText>
              )}
            </ScrollView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 15,
  },
  bookingItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  bookingText: {
    fontSize: 16,
    color: "#000",
  },
  noBookingsText: {
    fontSize: 16,
    color: "#fff",
    textAlign: 'center',
    marginTop: 20,
  },
});