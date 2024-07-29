import { Text, View, StatusBar } from "react-native";
import { Link } from 'expo-router';
import React from "react";

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24 }}>Waste Management App</Text>
      <StatusBar />
      <Link href="/profile" style={{ color: 'blue' }}>User Profile</Link>
    </View>
  );
}