"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  awardPoints,
  checkLevelUp,
  checkAchievements,
} from "@/lib/gamification";

export default function MoodTracker() {
  const [mood, setMood] = useState("");

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "users", user.uid, "moods"), {
          mood,
          timestamp: serverTimestamp(),
        });

        // Award points for logging mood
        await awardPoints(user.uid, "MOOD_LOG");

        // Check for level up
        const newLevel = await checkLevelUp(user.uid);
        if (newLevel) {
          alert(`Congratulations! You've reached level ${newLevel}!`);
        }

        // Check for new achievements
        const newAchievements = await checkAchievements(user.uid);
        if (newAchievements.length > 0) {
          alert(
            `You've unlocked new achievements: ${newAchievements
              .map((a) => a.name)
              .join(", ")}`
          );
        }

        alert("Mood logged successfully!");
        setMood("");
      }
    } catch (error) {
      console.error("Error logging mood:", error);
      alert("Failed to log mood. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Mood Tracker
      </h2>
      <form onSubmit={handleMoodSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="mood"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            How are you feeling right now?
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select a mood</option>
            <option value="Sad">Sad</option>
            <option value="Angry">Angry</option>
            <option value="Neutral">Neutral</option>
            <option value="Happy">Happy</option>
            <option value="Excited">Excited</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log Mood
        </motion.button>
      </form>
    </motion.div>
  );
}
