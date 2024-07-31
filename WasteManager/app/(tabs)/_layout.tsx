import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, ImageSourcePropType } from "react-native";
import icons from "../../constants/icons.js";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const TabIcon = ({ icon, color, name, focused }: {
  icon: ImageSourcePropType,
  color: string,
  name: string,
  focused: boolean,
}) => {
  return (
    <StyledView>
      <StyledImage
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <StyledText className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
        {name}
      </StyledText>
    </StyledView>
  );
};;

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
