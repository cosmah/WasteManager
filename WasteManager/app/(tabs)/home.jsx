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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

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
    <StyledSafeAreaView className="bg-primary h-full ">
      <StyledView className="flex-row justify-between items-center mb-6 p-5">
        <StyledView>
          <StyledText className="text-2xl font-psemibold text-secondary">
            Hi, {username ? `${username}` : "Loading..."}
          </StyledText>

          
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Home;
