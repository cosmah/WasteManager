import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { getCurrentUser } from "@/lib/appwrite";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);

const home = () => {
  const [username, setusername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setusername(user.username);
      }
    };

    fetchUser();
  }, []);

  return (
    <StyledSafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StyledText className="text-3xl text-white">{item.id}</StyledText>
        )}
        ListHeaderComponent={() => (
          <StyledView className="my-6 px-4 space-y-6">
            <StyledView className="flex-row justify-between items-start mb-6">
              <StyledView>
                <StyledText className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </StyledText>
                <StyledText className="text-2xl font-psemibold text-white">
                  {username ? `${username}` : "Loading..."}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        )}
      />
    </StyledSafeAreaView>
  );
};

export default home;
