import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { getCurrentUser } from "@/lib/appwrite"; // Assuming appwrite.js is in the same directory
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const STextInput = styled(TextInput);

const Bookmark = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');

  return (
    <StyledSafeAreaView className='bg-primary h-full'>
      <StyledView className='p-5'>
        <StyledText className='p-5 text-2xl font-psemibold text-secondary'>
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
              placeholder="Service"
              value={service}
              onChangeText={setService}
              style={styles.input}
            />
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  input: {
    height: 40,
    
    paddingLeft: 10,
  },
});