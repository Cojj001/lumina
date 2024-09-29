'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { auth, db } from '@/lib/firebase'
import { addDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { ArrowLeft, Plus, Check, X } from 'lucide-react'
import Link from 'next/link'

export default function BehavioralActivation() {
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState('')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [enjoyment, setEnjoyment] = useState(5)
  const [accomplishment, setAccomplishment] = useState(5)
  const [completedActivities, setCompletedActivities] = useState([])

  useEffect(() => {
    fetchActivities()
    fetchCompletedActivities()
  }, [])

  const fetchActivities = async () => {
    const user = auth.currentUser
    if (user) {
      const activitiesRef = collection(db, 'users', user.uid, 'activities')
      const querySnapshot = await getDocs(activitiesRef)
      setActivities(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
  }

  const fetchCompletedActivities = async () => {
    const user = auth.currentUser
    if (user) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const completedActivitiesRef = collection(db, 'users', user.uid, 'completedActivities')
      const q = query(completedActivitiesRef, where('timestamp', '>=', today))
      const querySnapshot = await getDocs(q)
      setCompletedActivities(querySnapshot.docs.map(doc => doc.data().activityId))
    }
  }

  const handleAddActivity = async () => {
    if (newActivity.trim() !== '') {
      const user = auth.currentUser
      if (user) {
        await addDoc(collection(db, 'users', user.uid, 'activities'), {
          name: newActivity,
          timestamp: serverTimestamp(),
        })
        setNewActivity('')
        fetchActivities()
      }
    }
  }

  const handleActivityComplete = async () => {
    if (selectedActivity) {
      const user = auth.currentUser
      if (user) {
        await addDoc(collection(db, 'users', user.uid, 'completedActivities'), {
          activityId: selectedActivity.id,
          enjoyment,
          accomplishment,
          timestamp: serverTimestamp(),
        })
        setSelectedActivity(null)
        setEnjoyment(5)
        setAccomplishment(5)
        fetchCompletedActivities()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Link href="/dashboard" className="flex items-center text-blue-500 hover:text-blue-600 mb-4">
        <ArrowLeft className="mr-2" /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Behavioral Activation</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Add New Activity</h2>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-md dark:bg-gray-700 dark:text-white"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            placeholder="Enter a new activity..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
            onClick={handleAddActivity}
          >
            <Plus className="inline" />
          </motion.button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Your Activities</h2>
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            className="flex items-center justify-between p-2 mb-2 bg-gray-100 dark:bg-gray-700 rounded-md"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-gray-800 dark:text-white">{activity.name}</span>
            {completedActivities.includes(activity.id) ? (
              <Check className="text-green-500" />
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                onClick={() => setSelectedActivity(activity)}
              >
                Complete
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
      {selectedActivity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Rate Your Activity</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Activity: {selectedActivity.name}</p>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Enjoyment (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={enjoyment}
                onChange={(e) => setEnjoyment(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-gray-600 dark:text-gray-400">{enjoyment}</span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Sense of Accomplishment (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={accomplishment}
                onChange={(e) => setAccomplishment(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-gray-600 dark:text-gray-400">{accomplishment}</span>
            </div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setSelectedActivity(null)}
              >
                <X className="inline mr-1" /> Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleActivityComplete}
              >
                <Check className="inline mr-1" /> Complete
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}