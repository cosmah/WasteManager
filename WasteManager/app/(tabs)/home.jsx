import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { useGlobalContext } from '@/context/GlobalProvider';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Home = () => {
  const { user, isLoading, wasteData } = useGlobalContext();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placeName, setPlaceName] = useState("Loading...");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Reverse geocoding to get place name
      const { latitude, longitude } = location.coords;
      try {
        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        setPlaceName(response.data.city || response.data.locality || "Unknown location");
      } catch (error) {
        setErrorMsg('Failed to get place name');
      }
    })();
  }, []);

  let locationText = "Loading...";
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = (
      <>
        <Ionicons name="location-sharp" marginTop={10} size={20} color="green" /> 
        <Text style={{ fontSize: 18 }}>{placeName}</Text>
      </>
    );
  }

  if (isLoading) {
    return (
      <StyledSafeAreaView className="bg-primary h-full">
        <StyledText className="text-2xl font-psemibold text-secondary">
          Loading...
        </StyledText>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <StyledView style={{ flex: 1 }}>
        <StyledView className="flex-row justify-between items-center mb-6 p-5">
          <StyledView>
            <StyledText className="text-2xl font-psemibold text-secondary mb-6">
              Hi, {user ? user.username : "Guest"}
            </StyledText>
            <StyledText className="text-sm text-gray-100 pt-5">
              {locationText}
            </StyledText>
          </StyledView>
        </StyledView>

        <StyledView
          style={{ backgroundColor: "#7A7777", flex: 1 }}
          className="rounded-xl"
        >
          <StyledText className="p-5 text-2xl font-psemibold">
            Your statistics
          </StyledText>
          <StyledView className="flex-row justify-around mt-5">
            <StyledView className="items-center">
              <StyledView style={styles.iconBackground}>
                <StyledText className="text-4xl text-lime-500">{wasteData.totalCollected} kg</StyledText>
              </StyledView>
              <StyledText className="text-black font-psemibold mt-2">
                Total Waste Collected
              </StyledText>
            </StyledView>
            <StyledView className="items-center">
              <StyledView style={styles.iconBackground}>
                <StyledText className="text-4xl text-lime-500">{wasteData.totalRecycled} kg</StyledText>
              </StyledView>
              <StyledText className="text-black font-psemibold mt-2">
                Total Waste Recycled
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="flex-row justify-around mt-5">
            <StyledView className="items-center">
              <StyledView style={styles.iconBackground}>
                <StyledText className="text-4xl text-lime-500">{wasteData.organicWaste} kg</StyledText>
              </StyledView>
              <StyledText className="text-black font-psemibold mt-2">Organic Waste</StyledText>
            </StyledView>
            <StyledView className="items-center">
              <StyledView style={styles.iconBackground}>
                <StyledText className="text-4xl text-lime-500">{wasteData.syntheticWaste} kg</StyledText>
              </StyledView>
              <StyledText className="text-black font-psemibold mt-2">
                Synthetic Waste
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconBackground: {
    backgroundColor: '#000',
    borderRadius: 150,
    padding: 20,
    marginTop:50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;