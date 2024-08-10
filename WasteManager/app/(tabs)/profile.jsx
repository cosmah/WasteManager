import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from "@/lib/appwrite"; // Assuming appwrite.js is in the same directory
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';


const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);

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
    <StyledSafeAreaView className='bg-primary h-full' style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <StyledText className="text-2xl font-psemibold text-secondary" style={styles.name}>{user.username}</StyledText>
      <StyledText className="text-2xl font-psemibold text-secondary-100" style={styles.email}>{user.email}</StyledText>
    </StyledSafeAreaView >
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,

  },
});