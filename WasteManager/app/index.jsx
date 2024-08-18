import React, { useEffect, useState } from 'react';
import { Text, View, Image, StatusBar, Alert } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { images } from '../assets/images';
import CustomButtons from '@/components/CustomButtons';
import { useGlobalContext } from '@/context/GlobalProvider';

const StyledView = styled(View);
const SImage = styled(Image);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

export default function App() {
  const { isLoading, isLoggedIn, setIsLogged } = useGlobalContext();
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log('Access Token:', accessToken); // Debugging
        if (accessToken) {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to check access token.");
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkAccessToken();
  }, []);

  if (isCheckingToken || isLoading) {
    return (
      <StyledSafeAreaView className="bg-primary h-full">
        <StyledView className="w-full justify-center items-center min-h-[85vh] px-4">
          <StyledText className="text-2xl text-white">Loading...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <StyledView className="w-full justify-start items-center min-h-[85vh] px-4">
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
            Use, Recycle, Go Green: Yo Waste Manager is a platform that helps
            connect with reliable waster managing companies to help you recycle
            your waste and keep the environment clean.
          </StyledText>

          <CustomButtons
            title="Get Started"
            handlePress={() => router.push('/sign-in')}
            containerStyle="w-full mt-7"
          />
        </StyledView>
      </ScrollView>
      <StatusBar backgroundColor="#161622" barStyle="light" />
    </StyledSafeAreaView>
  );
}