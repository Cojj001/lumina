'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { auth, db } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

const steps = [
  { title: 'Identify the Thought', description: 'What negative thought are you having?' },
  { title: 'Identify the Emotion', description: 'How does this thought make you feel?' },
  { title: 'Identify the Evidence', description: 'What evidence supports this thought?' },
  { title: 'Challenge the Thought', description: 'Is there an alternative way to view this situation?' },
  { title: 'Create a Balanced Thought', description: "What's a more balanced or realistic thought?" },
]

export default function ThoughtChallenger() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState(Array(steps.length).fill(''))
  const [isComplete, setIsComplete] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const user = auth.currentUser
    if (user) {
      await addDoc(collection(db, 'users', user.uid, 'thoughtChallenges'), {
        responses,
        timestamp: serverTimestamp(),
      })
      setIsComplete(true)
    }
  }

  const handleInputChange = (e) => {
    const newResponses = [...responses]
    newResponses[currentStep] = e.target.value
    setResponses(newResponses)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Link href="/dashboard" className="flex items-center text-blue-500 hover:text-blue-600 mb-4">
        <ArrowLeft className="mr-2" /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Thought Challenger</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {!isComplete ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{steps[currentStep].title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{steps[currentStep].description}</p>
            </div>
            <textarea
              className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
              rows="4"
              value={responses[currentStep]}
              onChange={handleInputChange}
              placeholder="Type your response here..."
            />
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="inline mr-2" /> Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'} <ArrowRight className="inline ml-2" />
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Challenge Complete!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Great job challenging your negative thought!</p>
            <Link href="/dashboard">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Return to Dashboard
              </motion.a>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}