import React from "react";
import { Text, View, Image, StatusBar } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import { images } from "../assets/images"; // Correct path to the image file
import CustomButtons from "@/components/CustomButtons";

const StyledView = styled(View);
const SImage = styled(Image);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

export default function App() {
  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <StyledView className="w-full justify-start items-center h-full px-4">
          <SImage
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <SImage
            source={images.cards}
            className="w-[380px] h-[300px]"
            resizeMode="contain"
          />

          <StyledView className="relative mt-5">
            <StyledText className="text-3xl text-white font-bold text-center">
              Hi, Let's go green with
              <StyledText className="text-secondary-100">
                {"   "}
                Yo Waste Manager
              </StyledText>
            </StyledText>
          </StyledView>
          <StyledText className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Use, Recycle, Go Green: Yo Waste Manager is a platform that helps connect with 
            reliable waster managing companies to help you recycle your waste and keep the environment clean.
          </StyledText>

          <CustomButtons  
            title="Get Started"
            handlePress={() => {}}
            containerStyle="w-full mt-7"
          />
        </StyledView>
      </ScrollView>
      <StatusBar backgroundColor='#161622' barStyle='light' />
    </StyledSafeAreaView>
  );
}
