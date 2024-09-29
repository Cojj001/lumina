"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ArrowLeft, Clock, Check } from "lucide-react";
import Link from "next/link";

export default function WorryTime() {
  const [isWorryTime, setIsWorryTime] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const [worry, setWorry] = useState("");
  const [solution, setSolution] = useState("");
  const [completedToday, setCompletedToday] = useState(false);

  useEffect(() => {
    checkCompletedToday();
  }, []);

  useEffect(() => {
    let timer;
    if (isWorryTime && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsWorryTime(false);
    }
    return () => clearInterval(timer);
  }, [isWorryTime, timeRemaining]);

  const checkCompletedToday = async () => {
    const user = auth.currentUser;
    if (user) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const worriesRef = collection(db, "users", user.uid, "worries");
      const q = query(worriesRef, where("timestamp", ">=", today));
      const querySnapshot = await getDocs(q);
      setCompletedToday(querySnapshot.size > 0);
    }
  };

  const handleStartWorryTime = () => {
    setIsWorryTime(true);
    setTimeRemaining(900);
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "users", user.uid, "worries"), {
        worry,
        solution,
        timestamp: serverTimestamp(),
      });
      setWorry("");
      setSolution("");
      setCompletedToday(true);
      setIsWorryTime(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
        Worry Time
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {!isWorryTime && !completedToday && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Ready for your daily worry time?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Take 15 minutes to focus on your worries and find potential
              solutions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleStartWorryTime}
            >
              Start Worry Time
            </motion.button>
          </div>
        )}
        {isWorryTime && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Worry Time in Progress
              </h2>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="mr-2" />
                <span className="text-xl font-semibold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                What's worrying you?
              </label>
              <textarea
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                rows="4"
                value={worry}
                onChange={(e) => setWorry(e.target.value)}
                placeholder="Describe your worry here..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                What could be a potential solution?
              </label>
              <textarea
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                rows="4"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Brainstorm potential solutions..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Complete Worry Time
            </motion.button>
          </div>
        )}
        {completedToday && (
          <div className="text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Worry Time Completed
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Great job! You've completed your worry time for today. Remember to
              focus on the present and the things you can control.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
