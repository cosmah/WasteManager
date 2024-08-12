import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";


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
      <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>
      <Text style={styles.detailText}>Service Type: {booking.serviceType}</Text>
      <Text style={styles.detailText}>Date: {new Date(booking.pickupDate).toLocaleDateString()}</Text>
      <Text style={styles.detailText}>Time: {new Date(booking.pickupTime).toLocaleTimeString()}</Text>
      <Text style={styles.detailText}>Waste Volume: {booking.wasteVolume}</Text>
      {/* Add more details as necessary */}
    </View>
    </StyledSafeAreaView>
    
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});