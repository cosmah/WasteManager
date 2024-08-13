import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser, fetchBookings } from "@/lib/appwrite";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const BookingDetails = () => {
  const route = useRoute();
  const { id } = route.params;

  // Assuming `booking` is fetched or passed as a prop
  const booking = {}; // Replace with actual booking data

  return (
    <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
  {/* Header View */}
  <StyledView style={styles.header}>
    <Text style={styles.title}>Booking Details</Text>
  </StyledView>
  
  {/* Content View */}
  <StyledView style={styles.content} className="rounded-xl">
    <StyledText style={styles.bookingText}>
      Service Type: {booking.serviceType}
    </StyledText>
    <StyledText style={styles.bookingText}>
      Date: {new Date(booking.pickupDate).toLocaleDateString()}
    </StyledText>
    <StyledText style={styles.bookingText}>
      Time: {new Date(booking.pickupTime).toLocaleTimeString()}
    </StyledText>
  </StyledView>
</StyledSafeAreaView>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1, // Adjust this value as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 0.9, // Adjust this value as needed
    backgroundColor: "#7A7777",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookingText: {
    fontSize: 18,
    marginVertical: 5,
  },
});