"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { LEVELS, ACHIEVEMENTS } from "@/lib/gamification";

export default function Rewards() {
  const [userStats, setUserStats] = useState({
    points: 0,
    level: 0,
    achievements: [],
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setUserStats({
          points: userData.points || 0,
          level: userData.level || 0,
          achievements: userData.achievements || [],
        });
      }
    };

    fetchUserStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Your Rewards
      </h2>
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Level: {LEVELS[userStats.level].name}
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Points: {userStats.points}
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Achievements:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((achievement) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg ${
                  userStats.achievements.includes(achievement.id)
                    ? "bg-green-100 dark:bg-green-800"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {achievement.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-2">
                  Points: {achievement.points}
                </p>
                {userStats.achievements.includes(achievement.id) && (
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">
                    Unlocked!
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
