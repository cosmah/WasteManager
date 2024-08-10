import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/appwrite"; // Assuming appwrite.js is in the same directory
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <StyledSafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full" style={styles.container}>
      <StyledView style={{ flex: 1 }}>
        <StyledView className="flex-row items-center mb-6 p-5" style={styles.profileContainer}>
          <StyledImage className="" source={{ uri: user.avatar }} style={styles.avatar} />
          <StyledView style={styles.infoContainer}>
            <StyledText
              className="text-2xl font-psemibold text-secondary"
              style={styles.name}
            >
              {user.username}
            </StyledText>
            <StyledText
              className="text-2xl font-psemibold text-secondary-100"
              style={styles.email}
            >
              {user.email}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 15,
  },
});