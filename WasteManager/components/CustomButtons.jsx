import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { styled } from "nativewind";

const TouchableOpacityComponent = styled(TouchableOpacity);
const SText = styled(Text);

const CustomButtons = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacityComponent
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <SText className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </SText>
    </TouchableOpacityComponent>
  );
};

export default CustomButtons;