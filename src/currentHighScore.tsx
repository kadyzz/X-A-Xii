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


//Extract highest score of each user and match ID with name
function highestScores(scores: Scores[], users: Users[]): UserScores[] {

  //  Create a map: id:score
  let bestScoresMap: { [key: number]: number } = {};

  // Sort the scores array in descending order
  scores.sort((a, b) => b.score - a.score);

  // Iterate over user scores array to find the best score of each user
  scores.forEach(score => {
    if (!(score.userId in bestScoresMap)) {  //instead of sort, we could also have additional/different checks here 
      bestScoresMap[score.userId] = score.score;
    }
  });

  // Create an array of UserScores objects with names and best scores
  let userScores: UserScores[] = [];
  users.forEach(user => {
    let bestScore = bestScoresMap[user._id];
    if (bestScore !== undefined) {
      userScores.push({ name: user.name, score: bestScore });
    }
  });

  // Sort again
  userScores.sort((a, b) => b.score - a.score);

  return userScores;
}

//Extract highest score of each user 
function highestScores2(scores: UserScores[]): UserScores[] {

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
  return highestScores2(scores);
}


export function defaultScore(): UserScores[] {
  return highestScores(scores, users);
}