// lib/modules.js
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

// Function to add a new module
export async function addNewModule(module) {
  try {
    const docRef = await addDoc(collection(db, "modules"), module);
    console.log("Module added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding module: ", e);
    throw new Error("Failed to add module");
  }
}
