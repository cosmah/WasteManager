import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchBookingById } from "@/lib/appwrite"; // Adjust the import path as needed

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);

const BookingDetails = () => {
  const route = useRoute();
  const { id } = route.params;

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const fetchedBooking = await fetchBookingById(id);
        setBooking(fetchedBooking);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    getBooking();
  }, [id]);

  if (!booking) {
    return (
      <StyledSafeAreaView
        className="bg-primary h-full"
        style={styles.container}
      >
        <Text>Loading...</Text>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
      <StyledView style={styles.header}>
        <StyledText className="text-2xl font-psemibold text-secondary" style={styles.title}>Booking Details</StyledText>
      </StyledView>
      <StyledView style={styles.content} className="rounded-xl p-4">
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Name:</Text> {booking.name}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Email:</Text> {booking.email}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Phone:</Text> {booking.phone}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Address:</Text> {booking.address}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Service Type:</Text> {booking.serviceType}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Service Frequency:</Text>{" "}
          {booking.serviceFrequency}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Waste Type:</Text> {booking.wasteType}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Waste Volume:</Text> {booking.wasteVolume}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Special Handling:</Text>{" "}
          {booking.specialHandling}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Access Info:</Text> {booking.accessInfo}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Emergency Contact:</Text>{" "}
          {booking.emergencyContact}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Date:</Text>{" "}
          {new Date(booking.date).toLocaleDateString()}
        </StyledText>
        <StyledText style={styles.bookingText}>
          <Text style={styles.label}>Time:</Text>{" "}
          {new Date(booking.time).toLocaleTimeString()}
        </StyledText>
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
    fontSize: 18,
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
  },
});

export default BookingDetails;
