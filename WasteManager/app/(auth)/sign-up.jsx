import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { images } from "../../assets/images";
import { Image } from "react-native";
import FormField from "@/components/FormField";
import CustomButtons from "@/components/CustomButtons";
import { Link, router } from "expo-router";
import { createUser, logout } from "@/lib/appwrite";

const StyledText = styled(Text);
const SafeAreaViewContainer = styled(SafeAreaView);
const SImage = styled(Image);
const StyledView = styled(View);
const SLink = styled(Link);

const SignUp = () => {
  // Create user state field
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOGIN FUNCTION
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Trim email to remove any leading or trailing whitespace
      const trimmedEmail = form.email.trim();

      // Log only the relevant fields
      console.log("Form data before submission:", {
        username: form.username,
        email: trimmedEmail,
        password: form.password,
      });

      // Logout any existing session
      await logout();

      const result = await createUser(trimmedEmail, form.password, form.username);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
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
            Sign Up to YoWaste Manager
          </StyledText>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles="mt-7"
            keyboardType="default"
          />

          <FormField
            title="Email Address"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles="mt-7"
            keyboardType="default"
            secureTextEntry={true}
          />
          <CustomButtons
            title="Sign Up"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <StyledView className="justify-center pt-5 flex-row gap-2">
            <StyledText className="text-lg text-gray-100 font-pregular">
              Have an account already ?
            </StyledText>
            <SLink href="/sign-in" className="text-lg font-psemibold text-secondary">
              Sign In
            </SLink>
          </StyledView>
        </StyledView>
      </ScrollView>
    </SafeAreaViewContainer>
  );
};

export default SignUp;
