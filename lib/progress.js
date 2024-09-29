
import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Function to update user progress
export async function updateUserProgress(userId, moduleId) {
  const moduleRef = doc(db, "modules", moduleId);
  const userRef = doc(db, "users", userId);
  const progressRef = doc(collection(db, "progress"), `${userId}_${moduleId}`);

  try {
    const moduleSnap = await getDoc(moduleRef);
    if (!moduleSnap.exists()) {
      console.error("Module not found");
      return;
    }
    const moduleData = moduleSnap.data();

    const progressSnap = await getDoc(progressRef);
    if (progressSnap.exists()) {
      console.log("Progress already exists for this module");
      return;
    }

    await setDoc(progressRef, {
      userId,
      moduleId,
      completed: true,
      pointsEarned: moduleData.points,
      completedAt: new Date(),
    });

    await updateDoc(userRef, {
      totalPoints: increment(moduleData.points),
    });

    console.log("Progress updated successfully");
  } catch (e) {
    console.error("Error updating progress: ", e);
    throw new Error("Failed to update progress");
  }
}

// Function to fetch user progress
export async function fetchUserProgress(userId) {
  const q = query(collection(db, "progress"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const progressData = [];

  querySnapshot.forEach((doc) => {
    progressData.push(doc.data());
  });

  return progressData;
}
