import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Button, Picker } from "react-native";
import React, { useEffect, useState } from "react";
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

const API_BASE_URL = "http://192.168.218.211:8000";

const renderPicker = (label, key, options, setValue) => {
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
          setValue(itemValue);
        }}
      >
        {options.map((option) => (
          <Picker.Item label={option.label} value={option.value} key={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const Bookings = () => {
  const { user, isLoading } = useGlobalContext();
  const router = useRouter();
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleFilter = () => {
    const filtered = bookings.filter(booking => {
      const matchesDate = date ? booking.date === date : true;
      const matchesType = type ? booking.type === type : true;
      return matchesDate && matchesType;
    });
    setFilteredBookings(filtered);
  };

  const handleResetFilters = () => {
    setDate('');
    setType('');
    setFilteredBookings([]);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const token = await AsyncStorage.getItem("access_token");
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
          <StyledView style={styles.infoContainer}>
            <StyledText className="text-2xl font-psemibold text-secondary" style={styles.name}>
              Your Bookings
            </StyledText>
            <StyledView className="mt-4">
              <Button title={showFilters ? "Hide Filters" : "Show Filters"} onPress={() => setShowFilters(!showFilters)} />
              {showFilters && (
                <View style={styles.filterContainer}>
                  <Text>Date:</Text>
                  <TextInput
                    value={date}
                    onChangeText={setDate}
                    placeholder="YYYY-MM-DD"
                    style={styles.inputField}
                  />
                  {renderPicker("Select Service Type", "service_type", [
                    { label: "Regular Waste Pickup", value: "regular_pickup" },
                    { label: "Bulk Item Collection", value: "bulk_collection" },
                    { label: "Hazardous Waste Disposal", value: "hazardous_disposal" },
                    { label: "Recycling Services", value: "recycling" },
                  ], setType)}
                  <View style={styles.filterButtons}>
                    <Button title="Filter" onPress={handleFilter} style={styles.filterButton} />
                    <Button title="Reset Filters" onPress={handleResetFilters} style={styles.filterButton} />
                  </View>
                </View>
              )}
            </StyledView>
          </StyledView>
        </StyledView>

        <StyledView style={{ backgroundColor: "#7A7777", flex: 1 }} className="rounded-xl">
          <StyledView className="flex-row justify-around mt-5">
            <ScrollView>
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
                bookings.map((booking) => (
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
              )}
            </ScrollView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    width: '45%',
    margin: 5,
  },
  bookingsList: {
    marginTop: 20,
  },
  bookingItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  bookingText: {
    fontSize: 16,
    color: "black",
  },
  noBookingsText: {
    fontSize: 16,
    color: "black",
    textAlign: 'center',
    marginTop: 20,
  },
});