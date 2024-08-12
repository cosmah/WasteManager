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

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a new booking
export const createBooking = async (bookingData) => {
  try {
    const newBooking = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookingId,
      ID.unique(),
      bookingData
    );

    return newBooking;
  } catch (error) {
    console.error("Error creating booking:", error);
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
