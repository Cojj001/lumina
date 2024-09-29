// cbtGamesConstants.js

export const PROBLEM_SOLVING_GAME = {
  title: "Problem-Solving Game",
  description: "Guide users through real-life scenarios to practice effective problem-solving skills by choosing the best approach and learning from the outcomes.",
  introText: "In this game, you'll face everyday challenges and decide how to handle them. Each decision will help you develop better problem-solving skills.",

  // Array of scenarios for the game
  scenarios: [
    {
      id: 1,
      situation: "You have a deadline approaching, but your friend asks you to help them move this weekend.",
      options: [
        {
          id: 1,
          response: "Tell your friend you can't help because you need to focus on your work.",
          outcome: "Your friend understands, and you get your work done on time, though you feel a bit guilty.",
          effectiveness: 3, // Scale of 1 to 5
        },
        {
          id: 2,
          response: "Agree to help your friend and try to squeeze in work during breaks.",
          outcome: "You help your friend, but your work suffers, and you feel stressed and exhausted.",
          effectiveness: 2,
        },
        {
          id: 3,
          response: "Discuss your situation with your friend and see if there's a way to help after your deadline.",
          outcome: "You and your friend find a compromise that allows you to finish your work and still help them later.",
          effectiveness: 5,
        },
      ],
      feedback: {
        bestChoice: 3, // ID of the most effective choice
        message: "Great job! Communicating openly and finding a compromise is often the best way to handle conflicting priorities.",
      },
    },
    {
      id: 2,
      situation: "You receive criticism from a coworker about a project you’ve been working on.",
      options: [
        {
          id: 1,
          response: "Ignore the criticism and continue with your work as planned.",
          outcome: "You avoid the conflict, but the issue might resurface later, and your work could suffer.",
          effectiveness: 2,
        },
        {
          id: 2,
          response: "Ask your coworker to explain their concerns so you can address them.",
          outcome: "You gain valuable feedback and improve your project, strengthening your working relationship.",
          effectiveness: 5,
        },
        {
          id: 3,
          response: "Defend your work and argue that your approach is the best.",
          outcome: "This leads to tension and a strained working relationship, even though you feel justified.",
          effectiveness: 1,
        },
      ],
      feedback: {
        bestChoice: 2,
        message: "Excellent! Seeking feedback and being open to improvement helps you grow and fosters better teamwork.",
      },
    },
    // Add more scenarios as needed
  ],

  // Progress tracking and levels
  levels: [
    { level: 1, name: "Problem-Solving Novice", requiredScenarios: 1 },
    { level: 2, name: "Critical Thinker", requiredScenarios: 3 },
    { level: 3, name: "Solution Master", requiredScenarios: 5 },
    // Add more levels as needed
  ],

  rewards: {
    badges: [
      { name: "First Solution", criteria: "Completed first scenario" },
      { name: "Effective Solver", criteria: "Consistently chose the most effective options" },
      { name: "Problem-Solving Expert", criteria: "Completed all scenarios with the best outcomes" },
      // Add more rewards as needed
    ],
    quotes: [
      "A problem well stated is a problem half solved.",
      "In the middle of difficulty lies opportunity.",
      // Add more motivational
