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
  const { notifications, fetchNotifications, markNotificationAsRead } = useGlobalContext();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNotifications().then(() => setRefreshing(false));
  }, []);

  const renderNotification = ({ item }) => (
    <StyledTouchableOpacity 
      className={`p-4 mb-2 rounded-lg ${item.is_read ? 'bg-gray-100' : 'bg-blue-100'}`}
      onPress={() => markNotificationAsRead(item.id)}
    >
      <StyledText className="text-lg font-semibold">{item.message}</StyledText>
      <StyledText className="text-sm text-gray-500 mt-1">
        {new Date(item.created_at).toLocaleString()}
      </StyledText>
    </StyledTouchableOpacity>
  );

  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <StyledView className="p-5">
        <StyledText className="text-2xl font-semibold text-secondary mb-4">
          Notifications
        </StyledText>
        {notifications.length === 0 ? (
          <StyledText className="text-lg text-gray-500">
            No notifications yet.
          </StyledText>
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  // You can add any additional styles here if needed
});
