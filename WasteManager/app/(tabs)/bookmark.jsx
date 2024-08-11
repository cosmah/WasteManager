import { StyleSheet, Text, View, Image, TextInput, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { getCurrentUser } from "@/lib/appwrite"; // Assuming appwrite.js is in the same directory
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

import CustomButtons from "@/components/CustomButtons";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const STextInput = styled(TextInput);
const StyledPicker = styled(Picker);
const StyledScrollView = styled(ScrollView);

const Bookmark = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceFrequency, setServiceFrequency] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [wasteVolume, setWasteVolume] = useState("");
  const [specialHandling, setSpecialHandling] = useState("");
  const [accessInfo, setAccessInfo] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    Alert.alert("Error", "Please fill all the fields");
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
                <Picker.Item label="Regular Waste Pickup" value="regular_pickup" />
                <Picker.Item label="Bulk Item Collection" value="bulk_collection" />
                <Picker.Item label="Hazardous Waste Disposal" value="hazardous_disposal" />
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
              <STextInput
                className="flex-1"
                placeholder="Preferred Date"
                value={preferredDate}
                onChangeText={setPreferredDate}
                style={styles.input}
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Preferred Time"
                value={preferredTime}
                onChangeText={setPreferredTime}
                style={styles.input}
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Waste Type"
                value={wasteType}
                onChangeText={setWasteType}
                style={styles.input}
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Waste Volume"
                value={wasteVolume}
                onChangeText={setWasteVolume}
                style={styles.input}
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Special Handling"
                value={specialHandling}
                onChangeText={setSpecialHandling}
                style={styles.input}
              />
            </StyledView>
            <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
              <STextInput
                className="flex-1"
                placeholder="Access Information"
                value={accessInfo}
                onChangeText={setAccessInfo}
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
              isLoading={false} // Set this based on your actual loading state
            />
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingLeft: 10,
  },
  picker: {
    flex: 1,
    color: "black",
  },
  scrollViewContent: {
    flexGrow: 1,
  },

  buttonContainer: {
    alignSelf: 'center', // Center the button horizontally
    marginBottom: 10, // Adjust margin as needed
  },
  input: {
    height: 40,
    paddingLeft: 10,
  },
  picker: {
    flex: 1,
    color: "black",
  },
});
