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

export default function BehavioralActivation() {
  const [activity, setActivity] = useState("");
  const [enjoyment, setEnjoyment] = useState(5);
  const [accomplishment, setAccomplishment] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "users", user.uid, "activities"), {
          activity,
          enjoyment,
          accomplishment,
          timestamp: serverTimestamp(),
        });

        // Award points for completing a behavioral activation
        await awardPoints(user.uid, "BEHAVIORAL_ACTIVATION");

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

        alert("Activity logged successfully!");
        setActivity("");
        setEnjoyment(5);
        setAccomplishment(5);
      }
    } catch (error) {
      console.error("Error logging activity:", error);
      alert("Failed to log activity. Please try again.");
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
        Behavioral Activation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="activity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Activity
          </label>
          <input
            type="text"
            id="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="enjoyment"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Enjoyment (1-10)
          </label>
          <input
            type="range"
            id="enjoyment"
            min="1"
            max="10"
            value={enjoyment}
            onChange={(e) => setEnjoyment(Number(e.target.value))}
            className="mt-1 block w-full"
          />
          <span className="text-gray-600 dark:text-gray-400">{enjoyment}</span>
        </div>
        <div>
          <label
            htmlFor="accomplishment"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Sense of Accomplishment (1-10)
          </label>
          <input
            type="range"
            id="accomplishment"
            min="1"
            max="10"
            value={accomplishment}
            onChange={(e) => setAccomplishment(Number(e.target.value))}
            className="mt-1 block w-full"
          />
          <span className="text-gray-600 dark:text-gray-400">
            {accomplishment}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log Activity
        </motion.button>
      </form>
    </motion.div>
  );
}
