import { fifaData } from "./fifa.js";
console.log(fifaData);

console.log("its working");
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

console.log("========== Task 1 ==========");

const worldCupFinal2014 = fifaData.filter((data) => data.Year === 2014 && data.Stage === "Final");

console.log("World Cup 2014 Final Info:", worldCupFinal2014);
console.log("Home Team name for 2014 world cup final is:", worldCupFinal2014[0]["Home Team Name"]);
console.log("Away Team name for 2014 world cup final is:", worldCupFinal2014[0]["Away Team Name"]);
console.log("Home Team goals for 2014 world cup final:", worldCupFinal2014[0]["Home Team Goals"]);
console.log("Away Team goals for 2014 world cup final:", worldCupFinal2014[0]["Away Team Goals"]);
console.log("Winner of 2014 world cup final:", worldCupFinal2014[0]["Win conditions"]);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

console.log("========== Task 2 ==========");

function getFinals(data) {
  // Declare and assign the variable for the array to return
  const allFinalsData = data.filter((item) => item.Stage === "Final");

  // Return the new array
  return allFinalsData;
}

console.log("All finals data:", getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

console.log("========== Task 3 ==========");

function getYears(callback) {
  // Add the value of the callback in a variable
  const dataArray = callback(fifaData);

  // Declare the variable to return
  const years = dataArray.map((item) => item.Year);

  // Return the new array
  return years;
}

console.log(getYears(getFinals));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

console.log("========== Task 4 ==========");

function getWinners(callback) {
  // Add the value of the callback in a variable
  const dataArray = callback(fifaData);

  // Declare the variable to return
  const winners = dataArray.map((item) => {
    if (item["Home Team Goals"] === item["Away Team Goals"]) {
      return item["Win conditions"].includes(item["Home Team Name"])
        ? item["Home Team Name"]
        : item["Away Team Name"];
    } else {
      return item["Home Team Goals"] > item["Away Team Goals"]
        ? item["Home Team Name"]
        : item["Away Team Name"];
    }
  });

  // Return the new array
  return winners;
}

console.log(getWinners(getFinals));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

console.log("========== Task 5 ==========");

function getWinnersByYear(callbackWinners, callbackYears) {
  // Add the values of the callbacks in a variable
  const winners = callbackWinners(getFinals);
  const years = callbackYears(getFinals);

  // Declare what to return
  const returnWinners = winners.forEach((item, index) => {
    console.log(`In ${years[index]}, ${item} won the world cup!`);
  });

  return returnWinners;
}

getWinnersByYear(getWinners, getYears);

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

console.log("========== Task 6 ==========");

function getAverageGoals(data) {
  // Declare the variables and values for the sum of all goals
  let averageHomeGoals = data.reduce((accumulator, index) => accumulator + index["Home Team Goals"], 0);
  let averageAwayGoals = data.reduce((accumulator, index) => accumulator + index["Away Team Goals"], 0);

  // Get the average
  averageHomeGoals = averageHomeGoals / data.length;
  averageAwayGoals = averageAwayGoals / data.length;

  // Declare and assign a value to the string to return
  const stringToReturn = `Average Home Goals: ${averageHomeGoals} - Average Away Goals: ${averageAwayGoals}`;

  // Return the string
  return stringToReturn;
}

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

console.log("========== Stretch Task 1 ==========");

function getCountryWins(data, teamInitials) {
  // Get the info where the team with said initials is present
  const teamInfo = data.filter(
    (item) => item["Away Team Initials"] === teamInitials || item["Home Team Initials"] === teamInitials
  );

  if (teamInfo.length === 0) {
    return `No team with "${teamInitials}" initals found!`;
  }

  // Get the team name
  const teamName = teamInfo.map((item) => {
    return item["Away Team Initials"] === teamInitials ? item["Away Team Name"] : item["Home Team Name"];
  });

  // Get the winners
  const winners = teamInfo.map((item) => {
    if (item["Home Team Goals"] === item["Away Team Goals"]) {
      return item["Win conditions"].includes(item["Home Team Name"])
        ? item["Home Team Name"]
        : item["Away Team Name"];
    } else {
      return item["Home Team Goals"] > item["Away Team Goals"]
        ? item["Home Team Name"]
        : item["Away Team Name"];
    }
  });

  // Get the count of how many times the specified team won
  let teamWins = winners.filter((item) => item.includes(teamName[0]));
  teamWins = teamWins.length;

  // Variable to return
  const winnerString = `The team ${teamName[0]} got ${teamWins} Victories`;

  // Return the totla number of wins
  return winnerString;
}

console.log(getCountryWins(fifaData, "SWE"));

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
  /* code here */
}

getGoals();

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
  /* code here */
}

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
