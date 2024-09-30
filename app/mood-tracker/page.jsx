"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
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
import { Smile, Frown, Meh, ArrowLeft } from "lucide-react";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const moodEmojis = [
  { mood: "Sad", icon: Frown, color: "bg-blue-500" },
  { mood: "Neutral", icon: Meh, color: "bg-yellow-500" },
  { mood: "Happy", icon: Smile, color: "bg-green-500" },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchMoodData();
    calculateStreak();
  }, []);

  const fetchMoodData = async () => {
    const user = auth.currentUser;
    if (user) {
      const moodsRef = collection(db, "users", user.uid, "moods");
      const q = query(moodsRef, orderBy("timestamp", "desc"), limit(7));
      const querySnapshot = await getDocs(q);
      const moodEntries = querySnapshot.docs.map((doc) => ({
        mood: doc.data().mood,
        timestamp: doc.data().timestamp.toDate(),
      }));
      setMoodData(moodEntries.reverse());
    }
  };

  const calculateStreak = async () => {
    const user = auth.currentUser;
    if (user) {
      const moodsRef = collection(db, "users", user.uid, "moods");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const q = query(
        moodsRef,
        where("timestamp", ">=", today),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      setStreak(querySnapshot.size);
    }
  };

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "users", user.uid, "moods"), {
        mood: mood,
        timestamp: serverTimestamp(),
      });
      fetchMoodData();
      calculateStreak();
    }
  };

  const chartData = {
    labels: moodData.map((entry) => entry.timestamp.toLocaleDateString()),
    datasets: [
      {
        label: "Mood",
        data: moodData.map(
          (entry) => moodEmojis.findIndex((m) => m.mood === entry.mood) + 1
        ),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return moodEmojis[value - 1]?.mood || "";
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Link
        href="/dashboard"
        className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
      >
        <ArrowLeft className="mr-2" /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Mood Tracker
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          How are you feeling today?
        </h2>
        <div className="flex justify-around mb-6">
          {moodEmojis.map((moodEmoji) => (
            <motion.button
              key={moodEmoji.mood}
              className={`${moodEmoji.color} rounded-full p-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-${moodEmoji.color}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelect(moodEmoji.mood)}
            >
              <moodEmoji.icon className="w-12 h-12 text-white" />
            </motion.button>
          ))}
        </div>
        {selectedMood && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-lg font-medium text-gray-800 dark:text-white"
          >
            You&apos;re feeling {selectedMood} today!
          </motion.p>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Your Mood History
        </h2>
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Mood Streak
        </h2>
        <p className="text-4xl font-bold text-center text-blue-500">
          {streak} days
        </p>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Keep logging your mood daily to increase your streak!
        </p>
      </div>
    </div>
  );
}
