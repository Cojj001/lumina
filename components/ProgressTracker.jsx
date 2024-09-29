"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { LEVELS, ACHIEVEMENTS } from "@/lib/gamification";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProgressTracker() {
  const [progressData, setProgressData] = useState({
    moodAverage: [],
    thoughtChallenges: [],
    activities: [],
  });
  const [userStats, setUserStats] = useState({
    points: 0,
    level: 0,
    achievements: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        // Fetch mood data
        const moodQuery = query(
          collection(db, "users", user.uid, "moods"),
          where("timestamp", ">=", last7Days),
          orderBy("timestamp", "asc")
        );
        const moodSnapshot = await getDocs(moodQuery);
        const moodData = moodSnapshot.docs.map((doc) => ({
          date: doc.data().timestamp.toDate(),
          value:
            ["Sad", "Angry", "Neutral", "Happy", "Excited"].indexOf(
              doc.data().mood
            ) + 1,
        }));

        // Fetch thought challenge data
        const thoughtQuery = query(
          collection(db, "users", user.uid, "thoughtChallenges"),
          where("timestamp", ">=", last7Days),
          orderBy("timestamp", "asc")
        );
        const thoughtSnapshot = await getDocs(thoughtQuery);
        const thoughtData = thoughtSnapshot.docs.map((doc) => ({
          date: doc.data().timestamp.toDate(),
          value: 1, // Count of thought challenges
        }));

        // Fetch activity data
        const activityQuery = query(
          collection(db, "users", user.uid, "activities"),
          where("timestamp", ">=", last7Days),
          orderBy("timestamp", "asc")
        );
        const activitySnapshot = await getDocs(activityQuery);
        const activityData = activitySnapshot.docs.map((doc) => ({
          date: doc.data().timestamp.toDate(),
          value: (doc.data().enjoyment + doc.data().accomplishment) / 2, // Average of enjoyment and accomplishment
        }));

        setProgressData({
          moodAverage: moodData,
          thoughtChallenges: thoughtData,
          activities: activityData,
        });

        // Fetch user stats
        const userDoc = await getDocs(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setUserStats({
          points: userData.points || 0,
          level: userData.level || 0,
          achievements: userData.achievements || [],
        });
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: progressData.moodAverage.map((entry) =>
      entry.date.toLocaleDateString()
    ),
    datasets: [
      {
        label: "Mood Average",
        data: progressData.moodAverage.map((entry) => entry.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Thought Challenges",
        data: progressData.thoughtChallenges.map((entry) => entry.value),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Activity Enjoyment/Accomplishment",
        data: progressData.activities.map((entry) => entry.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Your Progress Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Your Progress
      </h2>
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Level: {LEVELS[userStats.level].name}
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Points: {userStats.points}
        </p>
        <div className="mt-2">
          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">
            Achievements:
          </h3>
          <ul className="list-disc list-inside">
            {userStats.achievements.map((achievementId) => {
              const achievement = ACHIEVEMENTS.find(
                (a) => a.id === achievementId
              );
              return (
                <li
                  key={achievementId}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  {achievement.name} - {achievement.description}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Line data={chartData} options={chartOptions} />
    </motion.div>
  );
}
