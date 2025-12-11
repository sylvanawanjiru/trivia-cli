// index.js
// Trivia CLI game

const readline = require ( 'readline');

const TOTAL_GAME_TIME = 60; // Total time for the game in seconds 
const TIME_PER_QUESTION = 12; // Time allowed per question

const questions = [
    {
        question: "Which language runs in a web browser?",
        choices: ["A) HTML", "B) CSS", "C) JavaScript", "D) Python"],
        answer: "C"
    },
    {
        question: "What does HTML stand for?",
        choices: ["A) HyperText Markup Language", "B) HighText Machine Language", "C) Hyperlinks and Text Markup Language", "D) None"],
        answer: "A"
    },
{
        question: "Which language is primarily used to style web pages?",
        choices: ["A) HTML", "B) CSS", "C) JavaScript", "D) Python"],
        answer: "B"
},
{
        question: "Which symbol is used for comments in JavaScript?",
        choices: ["A) //", "B) ##", "C) <!-- -->", "D) **"],
        answer: "A"
},
{ 
        question: "What does CSS stand for?",
        choices: ["A) Creative Style Sheets", "B) Colorful Style Sheets", "C) Computer Style Sheets", "D) Cascading Style Sheets"],
        answer: "D"
},
];

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask question 
function askQuestion(questionObj) {
    return new Promise((resolve) => {
        console.log("\n" + questionOBJ.question);
        questionOBJ.choices.forEach(choice => console.log(choice));
        let timeOut = false;


// Timer for the question
const timeout = setTimeout(() => {
    timeOut = true;
    console.log("\Time is up for this question!");
    resolve(null); 
}, TIME_PER_QUESTION * 1000);

// Get users answer
rl.question("\nType A, B, C, or D: ", (input) => {
    if (!timeOut) {
        clearTimeout(timeout);
        resolve(input.trim().toUpperCase());
    }
 });
});
}

// Function to start the game
async function startGame() {
    console.log("Welcome to the Trivia CLI Game!");
    console.log('You have ${TOTAL_GAME_TIME} seconds to answer all questions.');
    console.log("Press Enter to start...");

await new Promise((resolve) => rl.question('', resolve));
    let score = 0;
    let incorrectQuestions = [];

    
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    
    let gameOver = false;

  // Global game timer
  const gameTimer = setTimeout(() => {
    gameOver = true;
    console.log("\n*** Time is up! The game is over! ***");
  }, TOTAL_GAME_TIME * 1000);

  // Ask each question one by one
  for (let i = 0; i < shuffledQuestions.length; i++) {
    if (gameOver) break;

    const q = shuffledQuestions[i];
    console.log(`\nQuestion ${i + 1} of ${questions.length}`);

    const answer = await askQuestion(q);

    if (answer === null) {
      console.log(`Correct answer: ${q.answer}`);
      incorrectQuestions.push({ 
        question: q.question,
         yourAnswer: "No answer (timeout)", 
         correctAnswer: q.answer 
        });
      continue;
    }
// Validate user input
    if (!["A", "B", "C", "D"].includes(answer)) {
      console.log("Invalid input. This counts as incorrect.");
      incorrectQuestions.push({ 
        question: q.question,
         yourAnswer: answer,
          correctAnswer: q.answer 
        });
      continue;
    }

    // Check if answer is correct
    if (answer === q.answer) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log("❌ Incorrect.");
      console.log(`The correct answer was: ${q.answer}`);
      incorrectQuestions.push({ 
        question: q.question,
         yourAnswer: answer,
          correctAnswer: q.answer
         });
    }
  }

  clearTimeout(gameTimer); // Stop global timer

  // Game over summary
  console.log("\n*** Game Over! ***");
console.log(`Your Final Score: ${score} out of ${questions.length}`);

const percentage = ((score / questions.length) * 100).toFixed(1);

console.log(`Percentage: ${percentage}%`);

  if (incorrectQuestions.length > 0) {
    console.log("\nReviews of incorrect questions;");
    incorrectQuestions.forEach((item, idx) => {
        console.log('\n${idx + 1}) Question: ${item.question}');
        console.log(' Your Answer: ${item.yourAnswer}, Correct Answer: ${item.correctAnswer}');

    });

  }else {
    console.log("Amazing! You got all questions correct!");
}

rl.close();
}

startGame();

