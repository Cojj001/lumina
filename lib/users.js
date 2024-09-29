import { db } from "./firebase"; // Import your Firestore instance
import { doc, setDoc } from "firebase/firestore";

// Example function to create a user profile
async function createUserProfile(userId, name, email) {
  try {
    await setDoc(doc(db, "users", userId), {
      name: name,
      email: email,
      totalPoints: 0, // Start with 0 points
    });
    console.log("User profile created");
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
}

// Example usage
createUserProfile("user123", "John Doe", "johndoe@example.com");
