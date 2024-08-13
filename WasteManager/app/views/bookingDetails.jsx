import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, fetchBookings } from '@/lib/appwrite';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const BookingDetails = () => {
  const route = useRoute();
  const { id } = route.params;

  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getBookings = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setEmail(currentUser.email);
          const fetchedBookings = await fetchBookings(currentUser.email);
          setBookings(fetchedBookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    getBookings();
  }, []);

  return (
    <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
      <StyledView style={styles.header}>
        <Text style={styles.title}>Booking Details</Text>
      </StyledView>
      <StyledView style={styles.content} className="rounded-xl p-4">
      <ScrollView>
        {bookings.map((booking, index) => (
          <React.Fragment key={index}>
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
              <Text style={styles.label}>Service Frequency:</Text> {booking.serviceFrequency}
            </StyledText>
            <StyledText style={styles.bookingText}>
              <Text style={styles.label}>Waste Type:</Text> {booking.wasteType}
            </StyledText>
            <StyledText style={styles.bookingText}>
              <Text style={styles.label}>Waste Volume:</Text> {booking.wasteVolume}
            </StyledText>
            <StyledText style={styles.bookingText}>
              <Text style={styles.label}>Special Handling:</Text> {booking.specialHandling}
            </StyledText>
            <StyledText style={styles.bookingText}>
              <Text style={styles.label}>Access Info:</Text> {booking.accessInfo}
            </StyledText>
            <StyledText style={styles.bookingText}>
              <Text style={styles.label}>Emergency Contact:</Text> {booking.emergencyContact}
            </StyledText>
            <StyledText style={styles.bookingText}>
              <Text style={styles.label}>Date:</Text> {new Date(booking.date).toLocaleDateString()}
            </StyledText>
            <StyledText style={styles.bookingText}>
              <Text style={styles.label}>Time:</Text> {new Date(booking.time).toLocaleTimeString()}
            </StyledText>
          </React.Fragment>
        ))}
      </ScrollView>
        
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 0.9,
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
  label: {
    fontWeight: 'bold',
  },
});

export default BookingDetails;