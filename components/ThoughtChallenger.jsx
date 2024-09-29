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

export default function ThoughtChallenger() {
  const [situation, setSituation] = useState("");
  const [automaticThought, setAutomaticThought] = useState("");
  const [challenge, setChallenge] = useState("");
  const [alternativeThought, setAlternativeThought] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "users", user.uid, "thoughtChallenges"), {
          situation,
          automaticThought,
          challenge,
          alternativeThought,
          timestamp: serverTimestamp(),
        });

        // Award points for completing a thought challenge
        await awardPoints(user.uid, "THOUGHT_CHALLENGE");

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

        alert("Thought challenge saved successfully!");
        setSituation("");
        setAutomaticThought("");
        setChallenge("");
        setAlternativeThought("");
      }
    } catch (error) {
      console.error("Error saving thought challenge:", error);
      alert("Failed to save thought challenge. Please try again.");
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
        Thought Challenger
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="situation"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Situation
          </label>
          <textarea
            id="situation"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="automaticThought"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Automatic Thought
          </label>
          <textarea
            id="automaticThought"
            value={automaticThought}
            onChange={(e) => setAutomaticThought(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="challenge"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Challenge the Thought
          </label>
          <textarea
            id="challenge"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="alternativeThought"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Alternative Thought
          </label>
          <textarea
            id="alternativeThought"
            value={alternativeThought}
            onChange={(e) => setAlternativeThought(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="2"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Thought Challenge
        </motion.button>
      </form>
    </motion.div>
  );
}
