
export const THOUGHT_TRACKING_CHALLENGE = {
  title: "Thought-Tracking Challenge",
  description:
    "Help users recognize and challenge negative thoughts by identifying cognitive distortions and replacing them with healthier, positive thoughts.",
  introText:
    "In this challenge, you'll learn how to recognize and change negative thoughts that might be holding you back. Let’s get started!",

  // Array of scenarios for the game
  scenarios: [
    {
      id: 1,
      situation:
        "You’re about to give a presentation, and you think, 'I’m going to mess this up. Everyone will think I’m a failure.'",
      negativeThought:
        "I’m going to mess this up. Everyone will think I’m a failure.",
      cognitiveDistortions: [
        { id: 1, name: "All-or-Nothing Thinking", isCorrect: false },
        { id: 2, name: "Catastrophizing", isCorrect: true },
        { id: 3, name: "Overgeneralization", isCorrect: false },
      ],
      positiveReframes: [
        "I’ve prepared well, and I’ll do my best.",
        "Even if I make a mistake, I can recover and still give a good presentation.",
        "I’ve succeeded before, and I can do it again.",
      ],
      correctFeedback:
        "That's right! This is an example of Catastrophizing, where you predict disaster without considering other outcomes.",
      incorrectFeedback:
        "Not quite. This is actually Catastrophizing, where you predict disaster without considering other outcomes.",
      reflectionPrompt:
        "How do you feel after completing this exercise? Reflect on your thoughts and feelings.",
    },
    {
      id: 2,
      situation: "You receive critical feedback from your boss on a project.",
      negativeThought: "I always mess things up. I’m never going to succeed.",
      cognitiveDistortions: [
        { id: 1, name: "Personalization", isCorrect: false },
        { id: 2, name: "Overgeneralization", isCorrect: true },
        { id: 3, name: "Mental Filter", isCorrect: false },
      ],
      positiveReframes: [
        "This is one project, not a reflection of my entire career.",
        "I can use this feedback to improve and do better next time.",
        "Everyone makes mistakes; it’s part of learning.",
      ],
      correctFeedback:
        "Great choice! Focusing on your preparation and abilities helps you stay confident.",
      incorrectFeedback:
        "That’s a start, but let's think of a more balanced perspective.",
      reflectionPrompt:
        "What did you learn from this feedback? How can you apply it positively in the future?",
    },
    // Add more scenarios as needed
  ],

  progressTracking: {
    streakMessage: "Positive Thought Streak",
    milestoneBadges: [
      { days: 7, badge: "Week of Positivity" },
      { days: 30, badge: "Month of Mindfulness" },
      // Add more milestones as needed
    ],
  },

  rewards: {
    badges: [
      { name: "CBT Beginner", criteria: "Completed first scenario" },
      {
        name: "Cognitive Challenger",
        criteria: "Identified 10 distortions correctly",
      },
      { name: "Mind Master", criteria: "30 days streak of challenges" },
      // Add more rewards as needed
    ],
    quotes: [
      "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
      "What you think, you become. What you feel, you attract. What you imagine, you create.",
      // Add more motivational quotes
    ],
  },

  design: {
    visuals: {
      backgroundColor: "#F0F4F8",
      textColor: "#333",
      iconStyle: "minimalistic",
      feedbackColor: "#28A745",
      errorColor: "#DC3545",
    },
    audio: {
      backgroundMusic: "calming-tune.mp3",
      voiceoverFeedback: "feedback-voiceover.mp3",
    },
  },
};



export default THOUGHT_TRACKING_CHALLENGE;


