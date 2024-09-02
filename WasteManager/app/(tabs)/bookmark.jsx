import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useGlobalContext } from '@/context/GlobalProvider';
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButtons from "@/components/CustomButtons";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const STextInput = styled(TextInput);
const StyledPicker = styled(Picker);
const StyledScrollView = styled(ScrollView);

const Bookmark = () => {
  const { user, createBooking } = useGlobalContext();
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    service_type: "",
    service_frequency: "",
    pickup_date: new Date(),
    pickup_time: new Date(),
    waste_type: "",
    waste_volume: "",
    emergency_contact: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const onChangeDate = useCallback((event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('date', selectedDate);
    }
  }, [handleInputChange]);

  const onChangeTime = useCallback((event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      handleInputChange('time', selectedTime);
    }
  }, [handleInputChange]);

  const resetFields = useCallback(() => {
    setFormData({
      phone: "",
      address: "",
      serviceType: "",
      serviceFrequency: "",
      date: new Date(),
      time: new Date(),
      wasteType: "",
      wasteVolume: "",
      emergencyContact: "",
    });
  }, []);

  const validateForm = useCallback(() => {
    const requiredFields = ['phone', 'address', 'service_type', 'service_frequency', 'waste_type', 'waste_volume', 'emergency_contact'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      Alert.alert("Error", `Please fill in the following fields: ${emptyFields.join(', ')}`);
      return false;
    }
    return true;
  }, [formData]);

  const submit = useCallback(async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      if (!user) {
        throw new Error("User not logged in");
      }
      const bookingData = {
        ...formData,
        pickup_date: formData.pickup_date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        pickup_time: formData.pickup_time.toTimeString().split(' ')[0], // Format as HH:MM:SS
        waste_volume: parseFloat(formData.waste_volume),
      };
      await createBooking(bookingData);
      Alert.alert("Success", "Service booked successfully!");
      resetFields();
    } catch (error) {
      Alert.alert("Error", error.response?.data ? JSON.stringify(error.response.data) : error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, user, createBooking, validateForm, resetFields]);

  const renderInputField = useCallback((placeholder, name, keyboardType = 'default') => (
    <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
      <STextInput
        className="flex-1"
        placeholder={placeholder}
        value={formData[name]}
        onChangeText={(text) => handleInputChange(name, text)}
        style={styles.input}
        keyboardType={keyboardType}
      />
    </StyledView>
  ), [formData, handleInputChange]);

  const renderPicker = useCallback((placeholder, name, items) => (
    <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
      <StyledPicker
        selectedValue={formData[name]}
        onValueChange={(itemValue) => handleInputChange(name, itemValue)}
        style={styles.picker}
      >
        <Picker.Item label={placeholder} value="" />
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </StyledPicker>
    </StyledView>
  ), [formData, handleInputChange]);

  if (!user) {
    return (
      <StyledSafeAreaView className="bg-primary h-full">
        <StyledView className="p-5">
          <StyledText className="text-2xl font-psemibold text-secondary">
            Please log in to book a service
          </StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StyledScrollView contentContainerStyle={styles.scrollViewContent}>
          <StyledView className="p-5">
            <StyledText className="p-5 text-2xl font-psemibold text-secondary">
              Book your service
            </StyledText>
            <StyledView>
              {renderInputField("Phone", "phone", "phone-pad")}
              {renderInputField("Address", "address")}
              {renderPicker("Select Service Type", "service_type", [
                { label: "Regular Waste Pickup", value: "regular_pickup" },
                { label: "Bulk Item Collection", value: "bulk_collection" },
                { label: "Hazardous Waste Disposal", value: "hazardous_disposal" },
                { label: "Recycling Services", value: "recycling" },
              ])}
              {renderPicker("Select Service Frequency", "service_frequency", [
                { label: "One-time", value: "one_time" },
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
              ])}
              <StyledView className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row mb-4">
                <StyledText
                  className="text-gray-500"
                  onPress={() => setShowDatePicker(true)}
                >
                  Select Date: {formData.pickup_date.toDateString()}
                </StyledText>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={formData.pickup_date}
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
                  Select Time: {formData.pickup_time.toLocaleTimeString()}
                </StyledText>
                {showTimePicker && (
                  <DateTimePicker
                    testID="timePicker"
                    value={formData.pickup_time}
                    mode={"time"}
                    display="default"
                    onChange={onChangeTime}
                  />
                )}
              </StyledView>
              {renderPicker("Select the waste type", "waste_type", [
                { label: "Organic Waste", value: "organic" },
                { label: "Synthetic Waste", value: "synthetic" },
              ])}
              {renderInputField("Waste Volume", "waste_volume", "numeric")}
              {renderInputField("Emergency Contact", "emergency_contact", "phone-pad")}
              <CustomButtons
                title="Book a Pick-Up"
                handlePress={submit}
                containerStyle={[styles.buttonContainer, { marginTop: 7 }]}
                isLoading={isSubmitting}
              />
            </StyledView>
          </StyledView>
        </StyledScrollView>
      </KeyboardAvoidingView>
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
    alignSelf: "center",
    marginBottom: 10,
  },
});