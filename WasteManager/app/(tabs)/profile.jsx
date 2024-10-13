import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const API_BASE_URL = "http://192.168.150.177:8000";

const Profile = () => {
  const { user, isLoading, logout } = useGlobalContext();
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const token = await AsyncStorage.getItem("access_token");
          const response = await axios.get(`${API_BASE_URL}/api/bookings/`, {
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

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Invalid Date";
  };

  const formatTime = (timeString) => {
    if (!timeString) return "No time";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      : "Invalid Time";
  };

  if (isLoading || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
      <StyledView style={styles.content}>
        <StyledView style={styles.profileContainer}>
          {user.avatar && (
            <StyledImage
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
          )}
          <StyledView style={styles.infoContainer}>
            <StyledText style={styles.name}>{user.username}</StyledText>
            <StyledText style={styles.email}>{user.email}</StyledText>
          </StyledView>
        </StyledView>

        <StyledView style={styles.bookingsContainer}>
          <StyledText style={styles.bookingsTitle}>Your Bookings</StyledText>
          <StyledScrollView style={styles.bookingsList}>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <StyledTouchableOpacity
                  key={booking.id}
                  style={styles.bookingItem}
                  onPress={() =>
                    router.push(`/views/bookingDetails?id=${booking.id}`)
                  }
                >
                  <StyledText style={styles.bookingServiceType}>
                    {booking.service_type}
                  </StyledText>
                  <StyledText style={styles.bookingText}>
                    Date: {formatDate(booking.pickup_date)}
                  </StyledText>
                  <StyledText style={styles.bookingText}>
                    Time: {formatTime(booking.pickup_time)}
                  </StyledText>
                </StyledTouchableOpacity>
              ))
            ) : (
              <StyledText style={styles.noBookingsText}>
                No bookings found.
              </StyledText>
            )}
          </StyledScrollView>
        </StyledView>

        <StyledTouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await logout();
            router.push("/sign-in"); // Redirect to login page after logout
          }}
        >
          <StyledText style={styles.logoutButtonText}>Logout</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "green",
  },
  bookingsContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    padding: 15,
  },
  bookingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "green",
  },
  bookingsList: {
    flex: 1,
  },
  bookingItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  bookingServiceType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 5,
  },
  bookingText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 3,
  },
  noBookingsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;