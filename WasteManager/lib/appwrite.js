import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.yowastemanager.cosmah",
  projectId: "66b126a00011744483fe",
  databaseId: "66b1290e002ff279b62e",
  userCollectionId: "66b12955002787ac4869",
  locationCollectionId: "66b12beb0034ab5de856",
  storageId: "66b12ec900382dffbc76",
  bookingId: "66b9db28002948df6205",  // Assuming this is the correct collection for storing bookings
};
import * as Notifications from 'expo-notifications';

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export { account, avatars, databases, Query };



// Function to create a new booking
export const createBooking = async (bookingData) => {
  try {
    const newBooking = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookingId,
      ID.unique(),
      bookingData
    );

    // Schedule notifications
    scheduleBookingNotifications(newBooking);

    return newBooking;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error(error.message);
  }
};

// Function to schedule notifications
const scheduleBookingNotifications = async (booking) => {
  const bookingTime = new Date(booking.time); // Assuming booking.time is a timestamp

  // Schedule a notification for confirmation
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Booking Confirmed',
      body: `Your booking for ${booking.name} has been confirmed.`,
    },
    trigger: { seconds: 0 }, // Immediately
  });

  // Schedule a reminder notification 5 hours before
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Upcoming Booking Reminder',
      body: `Your booking for ${booking.name} is in 5 hours.`,
    },
    trigger: { date: new Date(bookingTime.getTime() - 5 * 60 * 60 * 1000) }, // 5 hours before
  });

  // Schedule a notification 20 minutes before
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Booking Starting Soon',
      body: `Your booking for ${booking.name} is starting in 20 minutes.`,
    },
    trigger: { date: new Date(bookingTime.getTime() - 20 * 60 * 1000) }, // 20 minutes before
  });

  // Schedule a notification for after the booking time
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Booking Ended',
      body: `Your booking for ${booking.name} has ended.`,
    },
    trigger: { date: new Date(bookingTime.getTime() + 30 * 60 * 1000) }, // 30 minutes after
  });
};


// Function to fetch a booking by ID
export const fetchBookingById = async (id) => {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookingId,
      id
    );
    return response;
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw new Error(error.message);
  }
};

// Existing createUser function...
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl.href,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Existing signIn function...
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Existing logout function...
export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.log('No active session to delete');
  }
};

// Existing getCurrentUser function...
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("Failed to fetch account");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) throw new Error("User not found");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Function to fetch bookings// appwrite.js
export const fetchBookings = async (email) => {
  if (!email) {
    throw new Error("Invalid email parameter");
  }

  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookingId,
      [Query.equal("email", email)] // Use the email attribute
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error(error.message);
  }
};

// Function to send a notification
export const sendNotification = async (title, body, targetType, targetId) => {
  try {
    const response = await notifications.create({
      title,
      body,
      targetType,
      targetTypeId: targetId,
    });
    console.log('Notification sent successfully', response);
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error(error.message);
  }
};