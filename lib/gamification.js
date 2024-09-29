import { db } from "./firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

export const POINTS = {
  MOOD_LOG: 10,
  THOUGHT_CHALLENGE: 20,
  BEHAVIORAL_ACTIVATION: 15,
  WORRY_TIME: 25,
};

export const LEVELS = [
  { name: "Novice", minPoints: 0 },
  { name: "Apprentice", minPoints: 100 },
  { name: "Practitioner", minPoints: 250 },
  { name: "Expert", minPoints: 500 },
  { name: "Master", minPoints: 1000 },
  { name: "Grandmaster", minPoints: 2000 },
  { name: "Enlightened", minPoints: 3500 },
];

export const ACHIEVEMENTS = [
  {
    id: "FIRST_MOOD",
    name: "First Mood",
    description: "Log your first mood",
    points: 50,
  },
  {
    id: "MOOD_STREAK_7",
    name: "Mood Maestro",
    description: "Log your mood for 7 consecutive days",
    points: 100,
  },
  {
    id: "THOUGHT_MASTER",
    name: "Thought Master",
    description: "Complete 10 thought challenges",
    points: 100,
  },
  {
    id: "ACTIVITY_ENTHUSIAST",
    name: "Activity Enthusiast",
    description: "Complete 15 behavioral activations",
    points: 150,
  },
  {
    id: "WORRY_CONQUEROR",
    name: "Worry Conqueror",
    description: "Complete 5 worry time exercises",
    points: 125,
  },
  {
    id: "MOOD_VARIETY",
    name: "Emotional Range",
    description: "Log all 5 different moods",
    points: 75,
  },
  {
    id: "CBT_CHAMPION",
    name: "CBT Champion",
    description: "Reach level 5",
    points: 200,
  },
  {
    id: "CONSISTENT_USER",
    name: "Consistent User",
    description: "Use the app for 30 consecutive days",
    points: 300,
  },
];

export async function awardPoints(userId, activity) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    points: increment(POINTS[activity]),
    [`activityCounts.${activity}`]: increment(1),
  });
}

export async function checkLevelUp(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  const currentLevel = LEVELS.findIndex(
    (level) => userData.points >= level.minPoints
  );

  if (currentLevel > userData.level) {
    await updateDoc(userRef, { level: currentLevel });
    return LEVELS[currentLevel].name;
  }
  return null;
}

export async function checkAchievements(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  const newAchievements = [];

  for (const achievement of ACHIEVEMENTS) {
    if (!userData.achievements.includes(achievement.id)) {
      let unlocked = false;

      switch (achievement.id) {
        case "FIRST_MOOD":
          unlocked = userData.activityCounts?.MOOD_LOG > 0;
          break;
        case "MOOD_STREAK_7":
          // This requires additional logic to track consecutive days
          unlocked = userData.moodStreak >= 7;
          break;
        case "THOUGHT_MASTER":
          unlocked = userData.activityCounts?.THOUGHT_CHALLENGE >= 10;
          break;
        case "ACTIVITY_ENTHUSIAST":
          unlocked = userData.activityCounts?.BEHAVIORAL_ACTIVATION >= 15;
          break;
        case "WORRY_CONQUEROR":
          unlocked = userData.activityCounts?.WORRY_TIME >= 5;
          break;
        case "MOOD_VARIETY":
          unlocked = userData.moodVariety?.size >= 5;
          break;
        case "CBT_CHAMPION":
          unlocked = userData.level >= 5;
          break;
        case "CONSISTENT_USER":
          // This requires additional logic to track consecutive days
          unlocked = userData.loginStreak >= 30;
          break;
      }

      if (unlocked) {
        newAchievements.push(achievement);
        await updateDoc(userRef, {
          achievements: arrayUnion(achievement.id),
          points: increment(achievement.points),
        });
      }
    }
  }

  return newAchievements;
}

// export { ACHIEVEMENTS };
