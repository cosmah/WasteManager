import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { images } from "../../assets/images";
import { Image } from "react-native";
import FormField from "@/components/FormField";
import CustomButtons from "@/components/CustomButtons";
import { Link, router } from "expo-router";
import axios from "axios"; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage';// For storing tokens
import { useGlobalContext } from "@/context/GlobalProvider";

const StyledText = styled(Text);
const SafeAreaViewContainer = styled(SafeAreaView);
const SImage = styled(Image);
const StyledView = styled(View);
const SLink = styled(Link);

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all the fields");
      return; // Ensure to return to prevent further execution
    }

    setIsSubmitting(true);

    try {
      const trimmedEmail = form.email.trim();
      
      // Make API call to Django backend for login
      const response = await axios.post('http://192.168.251.26:8000/api/user/login/', {
        email: trimmedEmail,
        password: form.password,
      });

      // Assuming the response contains access and refresh tokens
      const { access, refresh } = response.data;

      // Store tokens in AsyncStorage
      await AsyncStorage.setItem('access_token', access);
      await AsyncStorage.setItem('refresh_token', refresh);

      // Optionally, you can fetch user details here if needed
      const userResponse = await axios.get('http://192.168.54.177:8000/api/users/current/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setUser(userResponse.data); // Set user data received from Django
      setIsLoggedIn(true); // Update logged-in state

      Alert.alert("Success", "Logged in successfully");
      router.replace("/home"); // Navigate to home on success
    } catch (error) {
      Alert.alert("Error", error.response?.data?.detail || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaViewContainer className="bg-primary h-full">
      <ScrollView>
        <StyledView className="w-full justify-center min-h-[80vh] px-4 my-6">
          <SImage
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[100px]"
          />

          <StyledText className="text-2xl text-white text-semibold mt-10 fon-psemibold">
            Log in to YoWaste Manager
          </StyledText>

          <FormField
            title="Email Address"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="default"
            secureTextEntry={true} // Ensure password is hidden
          />
          <CustomButtons
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <StyledView className="justify-center pt-5 flex-row gap-2">
            <StyledText className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </StyledText>
            <SLink href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </SLink>
          </StyledView>
        </StyledView>
      </ScrollView>
    </SafeAreaViewContainer>
  );
};

export default SignIn;
