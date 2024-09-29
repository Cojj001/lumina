"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { db, auth } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateUserProgress } from "../lib/progress";
import { Button } from "@/components/Button";
import { Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ModulePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [module, setModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (pathname) {
      const fetchModule = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const id = pathname.split("/").pop(); // Extract id from pathname
          const docRef = doc(db, "modules", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setModule(docSnap.data());
          } else {
            setError("Module not found");
          }
        } catch (err) {
          setError("Failed to load module");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchModule();
    }
  }, [pathname]);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await updateUserProgress(auth.currentUser.uid, pathname);
      router.push("/profile"); // Redirect to profile after completion
    } catch (err) {
      setError("Failed to update progress");
      console.error(err);
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error
          </h1>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        {module && (
          <>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                {module.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {module.description}
              </p>
              {module.content && (
                <div className="prose dark:prose-invert max-w-none">
                  {module.content}
                </div>
              )}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 flex justify-end">
              <Button
                onClick={handleComplete}
                disabled={isCompleting}
                className="flex items-center"
              >
                {isCompleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Module
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
