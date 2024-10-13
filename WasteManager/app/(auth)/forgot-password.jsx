import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import FormField from "@/components/FormField";
import CustomButtons from "@/components/CustomButtons";
import { useGlobalContext } from "@/context/GlobalProvider";
import axios from 'axios';



const StyledText = styled(Text);
const SafeAreaViewContainer = styled(SafeAreaView);
const StyledView = styled(View);

const ForgotPassword = () => {
  const { requestPasswordReset } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (email === "") {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    setIsSubmitting(true);

    try {
      const trimmedEmail = email.trim();
      const response = await axios.post('http://192.168.150.177:8000/api/request-password-reset/', {
        email: trimmedEmail,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", response.data.error);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      Alert.alert("Error", "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaViewContainer className="bg-primary h-full">
      <ScrollView>
        <StyledView className="w-full justify-center min-h-[80vh] px-4 my-6">
          <StyledText className="text-2xl text-white text-semibold mt-10 fon-psemibold">
            Forgot Password
          </StyledText>

          <FormField
            title="Email"
            value={email}
            handleChangeText={(e) => setEmail(e)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <CustomButtons
            title="Submit"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />
        </StyledView>
      </ScrollView>
    </SafeAreaViewContainer>
  );
};

export default ForgotPassword;