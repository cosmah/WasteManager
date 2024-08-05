import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { images } from "../../assets/images";
import { Image } from "react-native";
import FormField from "@/components/FormField";
import CustomButtons from "@/components/CustomButtons";

const StyledText = styled(Text);
const SafeAreaViewContainer = styled(SafeAreaView);
const SImage = styled(Image);
const StyledView = styled(View);

const SignIn = () => {
  //create user state field
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  //LOGIN FUNCTION
  const submit = () => {
    setIsSubmitting(true);
    // Add your login logic here
    setIsSubmitting(false);
  };

  return (
    <SafeAreaViewContainer className="bg-primary h-full">
      <ScrollView>
        <StyledView className="w-full justify-center h-full px-4 my-6">
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
            handlerChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password" 
            value={form.password} 
            handlerChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
            keyboardType="password"
          />
        </StyledView>
        <CustomButtons
          title="Sign In"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={isSubmitting}
        />
      </ScrollView>
    </SafeAreaViewContainer>
  );
};

export default SignIn;