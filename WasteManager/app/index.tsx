import React from "react";
import { Text, View, Image } from "react-native";
import { styled } from 'nativewind';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from 'react-native';

import landingImage from '../assets/images/landing.jpeg'; // Correct path to the image file

const StyledView = styled(View);
const SImage = styled(Image);
const StyledSafeAreaView = styled(SafeAreaView);

export default function App() {
  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <StyledView className="w-full justify-center items-center h-full px-4">
            <SImage
              source={landingImage}
              className="w-[130px] h-[84px]" 
              resizeMode="contain"
            />
        </StyledView>
      </ScrollView>
    </StyledSafeAreaView>
  );
}