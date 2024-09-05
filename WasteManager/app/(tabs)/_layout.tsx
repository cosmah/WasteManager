import { Tabs } from "expo-router";
import { Image, Text, View, ImageSourcePropType } from "react-native";
import icons from "../../constants/icons.js";
import { styled } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const TabIcons = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: string;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Ionicons name={icon} size={30} color={focused ? color : "#cdcde8"} />
      <Text style={{ color: focused ? color : "#cdcde8" }}>{name}</Text>
    </View>
  );
};
const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <StyledView className="items-center justify-center gap-2">
      <StyledImage
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <StyledText
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </StyledText>
    </StyledView>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#00ab41",
          tabBarInactiveTintColor: "#cdcde8",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
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

        {/* Create */}
        <Tabs.Screen
          name="create"
          options={{
            title: "Bookings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                icon="notifications" // Ionicons name for bell icon
                color={color}
                name="Bookings"
                focused={focused}
              />
            ),
          }}
        />
        {/* Bookmarks */}
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Schedules",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Schedules"
                focused={focused}
              />
            ),
          }}
        />

        {/* Profile */}
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
      </Tabs>
    </>
  );
};

export default TabsLayout;
