import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { getCurrentUser } from "@/lib/appwrite";
import profileIcon from "../../assets/icons/profile.png";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUsername(user.username);
      }
    };

    fetchUser();
  }, []);

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
        <StyledImage source={profileIcon} className="w-10 h-10" />
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Home;