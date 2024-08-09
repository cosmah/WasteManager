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
import { getCurrentUser } from "@/lib/appwrite";
import * as Location from 'expo-location';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Home = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUsername(user.username);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let locationText = 'Loading...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Location: ${location.coords.latitude}, ${location.coords.longitude}`;
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full ">
      <StyledView className="flex-row justify-between items-center mb-6 p-5">
        <StyledView>
          <StyledText className="text-2xl font-psemibold text-secondary">
            Hi, {username ? `${username}` : "Loading..."}
          </StyledText>
          <StyledText className="text-sm text-gray-100">
            {locationText}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Home;