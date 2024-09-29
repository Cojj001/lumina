"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Book, Clock, Award, ArrowRight } from "lucide-react";

export default function ModuleCard({ module }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
            {module.title}
          </h3>
          <Award className="h-6 w-6 text-yellow-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {module.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <span>{module.duration} mins</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Book className="h-4 w-4 mr-2" />
            <span>{module.lessons} lessons</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            Points: {module.points}
          </p>
          <Link href={`/modules/${module.id}`} passHref legacyBehavior>
            <Button as="a" className="flex items-center">
              {isHovered ? "Start Module" : "Learn More"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
