import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { getCurrentUser } from "@/lib/appwrite";
import profileIcon from "../../assets/icons/profile.png";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <StyledView className="items-center justify-center gap-2">
      <StyledImage
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <StyledText className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </StyledText>
    </StyledView>
  );
};

const Home = () => {
  const [username, setUsername] = useState("");
  const [focused, setFocused] = useState(true); // Assuming it's focused for now

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUsername(user.username);
      }
    };

    fetchUser();
  }, []);

  const activeColor = '#00c04b';
  const inactiveColor = '#cdcde8';

  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <StyledView className="flex-row justify-between items-center mb-6">
        <StyledView>
          <StyledText className="font-pmedium text-sm text-gray-100">
            Welcome back
          </StyledText>
          <StyledText className="text-2xl font-psemibold text-secondary">
            {username ? `${username}` : "Loading..."}
          </StyledText>
        </StyledView>
        <StyledTouchableOpacity className="p-2 rounded-full bg-white shadow-md">
          <TabIcon
            icon={profileIcon}
            color={focused ? activeColor : inactiveColor}
            name="Profile"
            focused={focused}
          />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Home;