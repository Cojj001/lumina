'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { auth, db } from '@/lib/firebase'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { ArrowLeft, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function ProgressTracker() {
  const [moodData, setMoodData] = useState([])
  const [activityData, setActivityData] = useState([])
  const [challengeData, setChallengeData] = useState([])
  const [streak, setStreak] = useState(0)
  const [level, setLevel] = useState(1)
  const [experience, setExperience] = useState(0)

  useEffect(() => {
    fetchMoodData()
    fetchActivityData()
    fetchChallengeData()
    fetchUserStats()
  }, [])

  const fetchMoodData = async () => {
    const user = auth.currentUser
    if (user) {
      const moodsRef = collection(db, 'users', user.uid, 'moods')
      const q = query(moodsRef, orderBy('timestamp', 'desc'), limit(7))
      const querySnapshot = await getDocs(q)
      const moodEntries = querySnapshot.docs.map(doc => ({
        mood: doc.data().mood,
        timestamp: doc.data().timestamp.toDate(),
      }))
      setMoodData(moodEntries.reverse())
    }
  }

  const fetchActivityData = async () => {
    const user = auth.currentUser
    if (user) {
      const activitiesRef = collection(db, 'users', user.uid, 'completedActivities')
      const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(7))
      const querySnapshot = await getDocs(q)
      const activityEntries = querySnapshot.docs.map(doc => ({
        enjoyment: doc.data().enjoyment,
        accomplishment: doc.data().accomplishment,
        timestamp: doc.data().timestamp.toDate(),
      }))
      setActivityData(activityEntries.reverse())
    }
  }

  const fetchChallengeData = async () => {
    const user = auth.currentUser
    if (user) {
      const challengesRef = collection(db, 'users', user.uid, 'thoughtChallenges')
      const q = query(challengesRef, orderBy('timestamp', 'desc'), limit(7))
      const querySnapshot = await getDocs(q)
      const challengeEntries = querySnapshot.docs.map(doc => ({
        timestamp: doc.data().timestamp.toDate(),
      }))
      setChallengeData(challengeEntries.reverse())
    }
  }

  const fetchUserStats = async () => {
    const user = auth.currentUser
    if (user) {
      const userRef = collection(db, 'users')
      const q = query(userRef, where('uid', '==', user.uid))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data()
        setLevel(userData.level || 1)
        setExperience(userData.experience || 0)
        setStreak(userData.streak || 0)
      }
    }
  }

  const moodChartData = {
    labels: moodData.map(entry => entry.timestamp.toLocaleDateString()),
    datasets: [
      {
        label: 'Mood',
        data: moodData.map(entry => {
          switch (entry.mood) {
            case 'Happy': return 3
            case 'Neutral': return 2
            case 'Sad': return 1
            default: return 0
          }
        }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const activityChartData = {
    labels: activityData.map(entry => entry.timestamp.toLocaleDateString()),
    datasets: [
      {
        label: 'Enjoyment',
        data: activityData.map(entry => entry.enjoyment),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Accomplishment',
        data: activityData.map(entry => entry.accomplishment),
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  }

  const challengeChartData = {
    labels: challengeData.map(entry => entry.timestamp.toLocaleDateString()),
    datasets: [
      {
        label: 'Challenges Completed',
        data: challengeData.map(() => 1),
        fill: false,
        borderColor: 'rgb(255, 206, 86)',
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Link href="/dashboard" className="flex items-center text-blue-500 hover:text-blue-600 mb-4">
        <ArrowLeft className="mr-2" /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Progress Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Your Stats</h2>
          <div className="flex items-center mb-4">
            <Award className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Level: {level}</span>
          </div>
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-green-500 mr-2" />
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Experience: {experience}</span>
          </div>
          <div className="flex items-center">
            <Award className="w-8 h-8 text-blue-500 mr-2" />
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Streak: {streak} days</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Mood Tracker</h2>
          <div className="h-64">
            <Line data={moodChartData} options={chartOptions} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Activity Tracker</h2>
          <div className="h-64">
            <Line data={activityChartData} options={chartOptions} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Challenge Tracker</h2>
          <div className="h-64">
            <Line data={challengeChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}