import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from 'expo-router';
import React from "react";
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function App() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledText className="text-3xl font-pblack">Yo Waste Manager</StyledText>
      <StatusBar style="auto" />
      <Link href="/home" style={{ color: 'blue' }}>Home</Link>
    </StyledView>
  );
}