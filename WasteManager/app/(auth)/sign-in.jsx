import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { images } from "../../assets/images";
import { Image } from "react-native";
import FormField from "@/components/FormField";
import CustomButtons from "@/components/CustomButtons";
import { Link, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const StyledText = styled(Text);
const SafeAreaViewContainer = styled(SafeAreaView);
const SImage = styled(Image);
const StyledView = styled(View);
const SLink = styled(Link);

const SignIn = () => {
  const { loginUser } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const trimmedEmail = form.email.trim();
      await loginUser(trimmedEmail, form.password);
      Alert.alert("Success", "Logged in successfully");
      router.replace("/home");
    } catch (error) {
      console.error("Login error:", error);
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
            title="Username"
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

          <StyledView className="justify-center pt-5 flex-row gap-2">
            <SLink href="/forgot-password" className="text-lg font-psemibold text-secondary">
              Forgot Password?
            </SLink>
          </StyledView>
        </StyledView>
      </ScrollView>
    </SafeAreaViewContainer>
  );
};

export default SignIn;