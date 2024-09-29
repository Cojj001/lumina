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

export default function WorryTime() {
  const [worry, setWorry] = useState("");
  const [solution, setSolution] = useState("");
  const [isWorryTime, setIsWorryTime] = useState(false);

  const handleStartWorryTime = () => {
    setIsWorryTime(true);
    setTimeout(() => {
      setIsWorryTime(false);
    }, 15 * 60 * 1000); // 15 minutes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "users", user.uid, "worries"), {
          worry,
          solution,
          timestamp: serverTimestamp(),
        });

        // Award points for completing a worry time exercise
        await awardPoints(user.uid, "WORRY_TIME");

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

        alert("Worry and solution logged successfully!");
        setWorry("");
        setSolution("");
      }
    } catch (error) {
      console.error("Error logging worry:", error);
      alert("Failed to log worry. Please try again.");
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
        Worry Time
      </h2>
      {!isWorryTime ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartWorryTime}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Start 15-Minute Worry Time
        </motion.button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="worry"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              What's worrying you?
            </label>
            <textarea
              id="worry"
              value={worry}
              onChange={(e) => setWorry(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="3"
              required
            />
          </div>
          <div>
            <label
              htmlFor="solution"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              What could be a potential solution?
            </label>
            <textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="3"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log Worry and Solution
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
