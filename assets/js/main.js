// Header elements
var highScoreElement = document.querySelector("#high-score");
var timeElement = document.querySelector("#time");
// Quiz elements
var quizTitleElement = document.querySelector("#title");
var quizContentElement = document.querySelector("#content");
var quizButtonsElement = document.querySelector("#buttons");
var quizStartButtonElement = document.querySelector("#start");

// The questions used for the quiz
var questions = [{
        question: "Question 1",
        choices: ["a1", "a2", "a3", "a4"],
        answer: "a4"
    },
    {
        question: "Question 2",
        choices: ["a1", "a2", "a3", "a4"],
        answer: "a3"
    },
    {
        question: "Question 3",
        choices: ["a1", "a2", "a3", "a4"],
        answer: "a1"
    },
    {
        question: "Question 4",
        choices: ["a1", "a2", "a3", "a4"],
        answer: "a4"
    },
    {
        question: "Question 5",
        choices: ["a1", "a2", "a3", "a4", "a5"],
        answer: "a5"
    },
    {
        question: "Question 6",
        choices: ["a1", "a2", "a3"],
        answer: "a2"
    }
];

// Starting page text
const startPage = {
    title: "HTML/CSS Knowledge Quiz",
    content: "This quiz will test your knowledge on some fundamental concepts about HTML and CSS. When you are ready to begin click the button below.",
    button: "Begin Quiz"
}

// This shuffle function was obtained from Stackoverflow from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Included are my own comments to display knowledge of information
function shuffle(array) {
    // Initialize 'currentIndex' to the length of the array passed into the function, and initialize a variable 'randomIndex'
    let currentIndex = array.length,
        randomIndex;

    // Loop that ends when all elements have been swapped (starting back moving towards front of array)
    while (currentIndex != 0) {

        // Indexing math to get a value from 0-current index
        randomIndex = Math.floor(Math.random() * currentIndex);
        // Decrement both for next loop and for proper indexing below
        currentIndex--;

        // This is an ES6 shorthand equivalent to the following code:
        /*
            var tmp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tmp;
        */
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    // Return the array when finished
    return array;
}

function resetPage() {

}

function loadHighScores() {
    // TODO: Implement
}

function endQuiz() {
    // TODO: Implement
}

function nextQuestion() {
    // TODO: Implement
}

function startQuiz() {
    // TODO: Implement
}

function beginQuiz() {
    // Shuffle the questions so they are random each time
    questions = shuffle(questions);
    // Then shuffle each choice selection
    questions.forEach(element => {
        element.choices = shuffle(element.choices);
    });
    startQuiz();
}

highScoreElement.addEventListener('click', loadHighScores);
quizStartButtonElement.addEventListener('click', beginQuiz);