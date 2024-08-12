import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { getCurrentUser, createBooking } from "@/lib/appwrite"; // Import necessary functions
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButtons from "@/components/CustomButtons";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const STextInput = styled(TextInput);
const StyledPicker = styled(Picker);
const StyledScrollView = styled(ScrollView);

const Bookmark = () => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceFrequency, setServiceFrequency] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [wasteType, setWasteType] = useState("");
  const [wasteVolume, setWasteVolume] = useState("");
  const [specialHandling, setSpecialHandling] = useState("");
  const [accessInfo, setAccessInfo] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false); // Close the date picker after selection
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false); // Close the time picker after selection
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const resetFields = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setServiceType("");
    setServiceFrequency("");
    setWasteType("");
    setWasteVolume("");
    setSpecialHandling("");
    setAccessInfo("");
    setEmergencyContact("");
    setDate(new Date());
    setTime(new Date());
  };

  const submit = async () => {
    if (!name || !email || !phone || !address || !serviceType || !serviceFrequency || !wasteType || !wasteVolume || !emergencyContact) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await getCurrentUser(); // Fetch the current user

      const bookingData = {
        name,
        email,
        phone,
        address,
        serviceType,
        serviceFrequency,
        pickupDate: date.toISOString(), // Ensure pickupDate is included
        pickupTime: time.toISOString(), // Ensure pickupTime is included
        wasteType,
        wasteVolume: parseFloat(wasteVolume), // Ensure wasteVolume is a double
        emergencyContact,
      };

      const newDocument = await createBooking(bookingData); // Use createBooking function

      Alert.alert("Success", "Service booked successfully!");
      resetFields(); // Reset fields after successful booking
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <StyledScrollView contentContainerStyle={styles.scrollViewContent}>
        <StyledView className="p-5">
          <StyledText className="p-5 text-2xl font-psemibold text-secondary">
            Book your service
          </StyledText>
          <StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <StyledPicker
                selectedValue={serviceType}
                onValueChange={(itemValue) => setServiceType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Service Type" value="" />
                <Picker.Item
                  label="Regular Waste Pickup"
                  value="regular_pickup"
                />
                <Picker.Item
                  label="Bulk Item Collection"
                  value="bulk_collection"
                />
                <Picker.Item
                  label="Hazardous Waste Disposal"
                  value="hazardous_disposal"
                />
                <Picker.Item label="Recycling Services" value="recycling" />
              </StyledPicker>
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <StyledPicker
                selectedValue={serviceFrequency}
                onValueChange={(itemValue) => setServiceFrequency(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Service Frequency" value="" />
                <Picker.Item label="One-time" value="one_time" />
                <Picker.Item label="Daily" value="daily" />
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
              </StyledPicker>
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <StyledText
                className="text-gray-500"
                onPress={() => setShowDatePicker(true)}
              >
                Select Date: {date.toDateString()}
              </StyledText>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <StyledText
                className="text-gray-500"
                onPress={() => setShowTimePicker(true)}
              >
                Select Time: {time.toLocaleTimeString()}
              </StyledText>
              {showTimePicker && (
                <DateTimePicker
                  testID="timePicker"
                  value={time}
                  mode={"time"}
                  display="default"
                  onChange={onChangeTime}
                />
              )}
            </StyledView>
  
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <StyledPicker
                selectedValue={wasteType}
                onValueChange={(itemValue) => setWasteType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select the waste type" value="" />
                <Picker.Item label="Organic Waste" value="organic" />
                <Picker.Item label="Synthetic Waste" value="synthetic" />
              </StyledPicker>
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Waste Volume"
                value={wasteVolume}
                onChangeText={(text) => {
                  // Validate if the input is a float or integer
                  const floatRegex = /^-?\d*\.?\d*$/;
                  if (floatRegex.test(text) || text === "") {
                    setWasteVolume(text);
                  }
                }}
                style={styles.input}
              />
            </StyledView>
  
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Emergency Contact"
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                style={styles.input}
              />
            </StyledView>
            <CustomButtons
              title="Book a Pick-Up"
              handlePress={submit}
              containerStyle={[styles.buttonContainer, { marginTop: 7 }]}
              isLoading={isSubmitting} // Set this based on your actual loading state
            />
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}

export default Bookmark;

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingLeft: 10,
    color: "gray",
  },
  picker: {
    flex: 1,
    color: "gray",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    alignSelf: "center", // Center the button horizontally
    marginBottom: 10, // Adjust margin as needed
  },
});