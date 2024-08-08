import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StyledText className="text-3xl">{item.id}</StyledText>
        )}
        ListHeaderComponent={() => (
          <StyledView className="my-6 px-4 space-y-6">
            <StyledView className="justify-between items-start flex-row mb-6">
              <StyledView>
                <StyledText>Welcome back to</StyledText>
                <StyledText>YoWaste Manager</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        )}
      />
    </SafeAreaView>
  );
};

export default home;
