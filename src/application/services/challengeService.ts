
import { Challenge, UserChallenge } from "@/domain/models/habit";

// Mock data until backend is integrated
const mockChallenges: Challenge[] = [
  {
    id: "1",
    name: "30-Day Water Challenge",
    description: "Drink 2L of water every day for 30 days",
    duration: 30,
    habits: ["1"],
  },
  {
    id: "2",
    name: "Fitness Starter",
    description: "Exercise for at least 30 minutes daily for 21 days",
    duration: 21,
    habits: ["2"],
  },
  {
    id: "3",
    name: "Mind & Body Balance",
    description: "Combine exercise, reading, and meditation for 14 days",
    duration: 14,
    habits: ["2", "3"],
  },
];

const mockUserChallenges: UserChallenge[] = [];

// Get all available challenges
export const getChallenges = async (): Promise<Challenge[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChallenges);
    }, 500);
  });
};

// Join a challenge
export const joinChallenge = async (
  userId: string,
  challengeId: string
): Promise<UserChallenge> => {
  const mockChallenge = mockChallenges.find(c => c.id === challengeId);
  if (!mockChallenge) {
    throw new Error('Challenge not found');
  }

  // Create the challenge in the database (this also assigns the user as creator)
  const response = await fetch('http://localhost:3000/challenges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      challenge_name: mockChallenge.name,
      challenge_description: mockChallenge.description,
      challenge_days_count: mockChallenge.duration,
      person_user_name: userId
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to join challenge');
  }

  const data = await response.json();

  // Just update local state for frontend consistency
  const userChallenge: UserChallenge = {
    userId,
    challengeId,
    startDate: new Date(),
    completed: false,
  };

  // Only add to mock data if it doesn't already exist
  if (!mockUserChallenges.some(uc =>
    uc.userId === userId && uc.challengeId === challengeId
  )) {
    mockUserChallenges.push(userChallenge);
  }

  return userChallenge;
};

// Get user's active challenges - now fetch from database
export const getUserChallenges = async (
  userId: string
): Promise<{ challenge: Challenge; userChallenge: UserChallenge }[]> => {
  try {
    // Fetch the user's challenges from the database
    const response = await fetch(`http://localhost:3000/challenges/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user challenges');
    }

    const userChallengesData = await response.json();

    // Map database challenges to frontend format
    const result = userChallengesData.map(dbChallenge => {
      // Find matching mock challenge by name for UI consistency
      const mockChallenge = mockChallenges.find(
        mc => mc.name === dbChallenge.challenge_name
      );

      // If we found a matching mock challenge, use its ID and data
      // Otherwise create a challenge object from the database data
      const challenge = mockChallenge || {
        id: dbChallenge.challenge_id.toString(),
        name: dbChallenge.challenge_name,
        description: dbChallenge.challenge_description || "",
        duration: dbChallenge.challenge_days_count,
        habits: [],
      };

      // Create the userChallenge object
      const userChallenge: UserChallenge = {
        userId,
        challengeId: challenge.id,
        startDate: new Date(), // Use current date as a fallback
        completed: false
      };

      return {
        challenge,
        userChallenge
      };
    });

    // Update our mock user challenges array for local state consistency
    mockUserChallenges.length = 0; // Clear existing entries
    result.forEach(item => {
      if (!mockUserChallenges.some(uc =>
        uc.userId === userId && uc.challengeId === item.challenge.id
      )) {
        mockUserChallenges.push(item.userChallenge);
      }
    });

    return result;
  } catch (error) {
    console.error('Error fetching user challenges:', error);

    // Fallback to mock data if API call fails
    return new Promise((resolve) => {
      setTimeout(() => {
        const userChallenges = mockUserChallenges.filter(
          (uc) => uc.userId === userId
        );
        const result = userChallenges.map((uc) => {
          const challenge = mockChallenges.find((c) => c.id === uc.challengeId);
          return {
            challenge: challenge!,
            userChallenge: uc,
          };
        });
        resolve(result);
      }, 500);
    });
  }
};