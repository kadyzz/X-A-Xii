import scores from './scores.js'
import users from './users.js'

export interface Scores {
  userId: number,
  score: number
}

export interface Users {
  _id: number,
  name: string
}

export interface UserScores {
  name: string,
  score: number
}


//Extract highest score of each user 
function highestScores(scores: UserScores[]): UserScores[] {

  // Create a map: name:score
  const bestScoresMap: { [key: string]: number } = {};

  scores.sort((a, b) => b.score - a.score);

  // Iterate over user scores array to find the best score of each user
  scores.forEach(score => {
    if (!(score.name in bestScoresMap)) {
      bestScoresMap[score.name] = score.score;
    }
  });

  //map to array
  const userScores: UserScores[] = Object.keys(bestScoresMap).map(userId => ({
    name: userId,
    score: bestScoresMap[userId]
  }));

  // Sort again
  userScores.sort((a, b) => b.score - a.score);

  return userScores;
}

export function calcScore(scores: UserScores[]): UserScores[] {
  return highestScores(scores);
}


export function defaultScores(): UserScores[] {
  // Create an empty array to store the combined user scores
  const userScores: UserScores[] = [];

  scores.sort((a, b) => b.score - a.score);

  // Iterate over each user
  users.forEach(user => {
    // Find the score for this user
    const userScore = scores.find(score => score.userId === user._id);

    // If the score is found, add it to the combined list
    if (userScore) {
      userScores.push({
        name: user.name,
        score: userScore.score
      });
    }
  });

  return userScores;
}
