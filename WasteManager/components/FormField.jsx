import { Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import { useState } from "react";

const StyledView = styled(View);
const StyledText = styled(Text);
const STextInput = styled(TextInput);

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {

    const [ShowPassword, setShowPassword] = useState(false);

  return (
    <StyledView className={`space-y-2 ${otherStyles}`}>
      <StyledText className="text-base text-gray-100 font-pmedium">
        {title}
      </StyledText>

      <StyledView className="border-2 border-black-500 w-full h-16 px-4 
      bg-black-100 rounded-2xl focus:border-secondary items-center">

        <STextInput 
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChange={handleChangeText}
            secureTextEntry={title === "Password" && !ShowPassword}
        />
      </StyledView>
    </StyledView>
  );
};

export default FormField;
