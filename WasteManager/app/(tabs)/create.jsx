import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from "@/context/GlobalProvider";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const API_BASE_URL = "http://192.168.133.211:8000";

const serviceTypes = [
  { label: "All Types", value: "" },
  { label: "Regular Waste Pickup", value: "regular_pickup" },
  { label: "Bulk Item Collection", value: "bulk_collection" },
  { label: "Hazardous Waste Disposal", value: "hazardous_disposal" },
  { label: "Recycling Services", value: "recycling" },
];

const Bookings = () => {
  const { user, isLoading } = useGlobalContext();
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [type, setType] = useState('');
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const token = await AsyncStorage.getItem("access_token");
          const response = await axios.get(`${API_BASE_URL}/bookings/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBookings(response.data);
          setFilteredBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    fetchBookings();
  }, [user]);

  const handleFilter = () => {
    const filtered = bookings.filter(booking => {
      const bookingDate = new Date(booking.pickupDate);
      const matchesDate = date ? bookingDate.toDateString() === date.toDateString() : true;
      const matchesType = type ? booking.service_type === type : true;
      return matchesDate && matchesType;
    });
    setFilteredBookings(filtered);
  };

  const handleResetFilters = () => {
    setDate(new Date());
    setType('');
    setFilteredBookings(bookings);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  if (isLoading || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
      <StyledView style={{ flex: 1 }}>
        <StyledText className="text-2xl font-semibold text-secondary mb-4">
          Your Bookings
        </StyledText>
        
        <Button 
          title={showFilters ? "Hide Filters" : "Show Filters"} 
          onPress={() => setShowFilters(!showFilters)} 
        />
        
        {showFilters && (
          <StyledView style={styles.filterContainer}>
            <StyledText>Date:</StyledText>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            
            <StyledText style={styles.label}>Service Type:</StyledText>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
              style={styles.picker}
            >
              {serviceTypes.map((option) => (
                <Picker.Item label={option.label} value={option.value} key={option.value} />
              ))}
            </Picker>
            
            <StyledView style={styles.filterButtons}>
              <Button title="Apply Filters" onPress={handleFilter} />
              <Button title="Reset Filters" onPress={handleResetFilters} />
            </StyledView>
          </StyledView>
        )}

        <ScrollView style={styles.bookingsList}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <StyledTouchableOpacity
                key={booking.id}
                style={styles.bookingItem}
                onPress={() => router.push(`/views/bookingDetails?id=${booking.id}`)}
              >
                <StyledText style={styles.bookingText}>Service Type: {booking.service_type}</StyledText>
                <StyledText style={styles.bookingText}>Date: {new Date(booking.pickupDate).toLocaleDateString()}</StyledText>
                <StyledText style={styles.bookingText}>Time: {new Date(booking.pickupTime).toLocaleTimeString()}</StyledText>
              </StyledTouchableOpacity>
            ))
          ) : (
            <StyledText style={styles.noBookingsText}>No bookings found</StyledText>
          )}
        </ScrollView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bookingsList: {
    marginTop: 20,
  },
  bookingItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
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
  bookingText: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  noBookingsText: {
    fontSize: 16,
    color: "black",
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Bookings;