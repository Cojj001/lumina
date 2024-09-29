"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  Brain,
  Calendar,
  Settings,
  Smile,
  Sun,
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState({ level: 1, points: 0 });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserStats({
            level: userDoc.data().level || 1,
            points: userDoc.data().points || 0,
          });
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const modules = [
    {
      title: "Mood Tracker",
      icon: Smile,
      color: "bg-blue-500",
      link: "/mood-tracker",
    },
    {
      title: "Thought Challenger",
      icon: Brain,
      color: "bg-green-500",
      link: "/thought-challenger",
    },
    {
      title: "Behavioral Activation",
      icon: Sun,
      color: "bg-yellow-500",
      link: "/behavioral-activation",
    },
    {
      title: "Worry Time",
      icon: Calendar,
      color: "bg-purple-500",
      link: "/worry-time",
    },
    {
      title: "Progress Tracker",
      icon: BarChart2,
      color: "bg-red-500",
      link: "/progress",
    },
    {
      title: "Settings",
      icon: Settings,
      color: "bg-gray-500",
      link: "/settings",
    },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Lumina CBT
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300 mr-4">
                Level {userStats.level} | {userStats.points} Points
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Welcome back, {user.email}!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={module.link}>
                  <motion.div
                    className={`${module.color} rounded-lg shadow-md p-6 flex items-center justify-between cursor-pointer`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center">
                      <module.icon className="h-8 w-8 text-white mr-4" />
                      <h3 className="text-xl font-semibold text-white">
                        {module.title}
                      </h3>
                    </div>
                    <ArrowRight className="h-6 w-6 text-white" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
