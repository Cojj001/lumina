// cbtGamesConstants.js

export const MINDFULNESS_BASED_PUZZLES = {
  title: "Mindfulness-Based Puzzles",
  description:
    "Engage users with simple puzzles while teaching mindfulness techniques to promote relaxation and present-moment awareness.",
  introText:
    "In this game, you'll focus your mind by solving puzzles, while practicing mindfulness techniques that help you stay calm and centered.",

  // Array of puzzle levels
  puzzles: [
    {
      id: 1,
      puzzleType: "Jigsaw Puzzle",
      image: "forest-path.jpg", // Image used in the puzzle
      pieces: 16, // Number of pieces in the jigsaw puzzle
      mindfulnessExercise:
        "As you work on this puzzle, take deep breaths in through your nose and out through your mouth. Focus on the sensation of the breath moving in and out of your body.",
      successMessage:
        "Great job! Notice how focused and calm you feel after completing this puzzle.",
    },
    {
      id: 2,
      puzzleType: "Pattern Matching",
      pattern: ["circle", "square", "triangle", "circle"], // Example pattern to match
      mindfulnessExercise:
        "As you match the patterns, gently bring your attention back to the task each time your mind wanders. Just like these patterns, your thoughts can come and go without judgment.",
      successMessage:
        "Well done! You've practiced staying present and letting go of distractions.",
    },
    {
      id: 3,
      puzzleType: "Maze Puzzle",
      mazeLayout: "easy-maze.png", // Image of the maze
      mindfulnessExercise:
        "As you navigate the maze, focus on the journey rather than the destination. Notice any tension in your body and release it with each breath.",
      successMessage:
        "Excellent! You've learned how to enjoy the process and stay calm even when facing challenges.",
    },
    // Add more puzzles as needed
  ],

  // Progress tracking and levels
  levels: [
    { level: 1, name: "Mindfulness Novice", requiredPuzzles: 1 },
    { level: 2, name: "Focused Thinker", requiredPuzzles: 3 },
    { level: 3, name: "Calm Explorer", requiredPuzzles: 5 },
    // Add more levels as needed
  ],

  rewards: {
    badges: [
      { name: "Puzzle Beginner", criteria: "Completed first puzzle" },
      { name: "Mindful Solver", criteria: "Completed 3 puzzles" },
      { name: "Zen Master", criteria: "Completed all puzzles in the module" },
      // Add more rewards as needed
    ],
    quotes: [
      "Mindfulness is the gateway to inner peace.",
      "In the stillness of the mind, you find true clarity.",
      // Add more motivational quotes
    ],
  },

  design: {
    visuals: {
      backgroundColor: "#EAF7F8",
      textColor: "#333",
      puzzlePieceColor: "#B2D2A4",
      feedbackColor: "#28A745",
      errorColor: "#DC3545",
      mazeLineColor: "#6B8E23",
    },
    audio: {
      backgroundMusic: "tranquil-music.mp3",
      puzzleCompletionSound: "puzzle-complete.mp3",
      voiceoverFeedback: "mindfulness-voiceover.mp3",
    },
  },
};

export default MINDFULNESS_BASED_PUZZLES;
