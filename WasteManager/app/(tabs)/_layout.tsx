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
    <StyledView className="items-center justify-center gap-2">
      <StyledImage
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <StyledText className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </StyledText>
    </StyledView>
  );
};;

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffa001',
          tabBarInactiveTintColor: '#cdcde8',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth:1,
            borderTopColor:'#232533',
            height: 84,
          }
        }}>
          {/* Home */}
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

          {/* create */}
          <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />

        {/* profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />

        {/* bookmarks */}
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
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
