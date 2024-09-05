import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Notifications = () => {
  

  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <StyledView className="p-5">
        <StyledText className="text-2xl font-semibold text-secondary mb-4">
          Your Bookings
        </StyledText>
        
       
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  // You can add any additional styles here if needed
});
