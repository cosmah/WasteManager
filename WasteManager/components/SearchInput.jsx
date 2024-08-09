// import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import { styled } from "nativewind";
// import { useState } from "react";
// import { Image } from "react-native";

// import icons from "@/constants/icons";

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const STextInput = styled(TextInput);

// const ImageComponent = styled(Image);

// const SearchInput = ({
//   title,
//   value,
//   placeholder,
//   handleChangeText,
//   otherStyles,
//   ...props
// }) => {

//     const [showPassword, setShowPassword] = useState(false);

//   return (
//     <StyledView className={`space-y-2 ${otherStyles}`}>
//       <StyledText className="text-base text-gray-100 font-pmedium">
//         {title}
//       </StyledText>

//       <StyledView className="border-2 border-black-500 w-full h-16 px-4 
//       bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">

//         <STextInput 
//             className="flex-1 text-white font-psemibold text-base"
//             value={value}
//             placeholder={placeholder}
//             placeholderTextColor="#7b7b8b"
//             onChangeText={handleChangeText}
//             secureTextEntry={title === "Password" && !showPassword}
//         />

//         {title === "Password" && (
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <ImageComponent source={!showPassword ? icons.eye : icons.eyeHide} 
//                 className="w-6 h-6" resizeMode="contain"/>
//             </TouchableOpacity>
//         )}

//       </StyledView>
//     </StyledView>
//   );
// };

// export default SearchInput;
