"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
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
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const moodValues = {
  Sad: 1,
  Angry: 2,
  Neutral: 3,
  Happy: 4,
  Excited: 5,
};

export default function MoodChart() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
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

    fetchMoodData();
  }, []);

  const chartData = {
    labels: moodData.map((entry) => format(entry.timestamp, "MMM d")),
    datasets: [
      {
        label: "Mood",
        data: moodData.map((entry) => moodValues[entry.mood]),
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
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return (
              Object.keys(moodValues).find(
                (key) => moodValues[key] === value
              ) || ""
            );
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Your Mood History
      </h2>
      <Line data={chartData} options={chartOptions} />
    </motion.div>
  );
}
