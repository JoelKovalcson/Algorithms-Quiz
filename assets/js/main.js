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
        choices: ["c", "a2", "a3", "a4"],
        answer: "c"
    },
    {
        question: "Question 2",
        choices: ["c", "a2", "a3", "a4"],
        answer: "c"
    },
    {
        question: "Question 3",
        choices: ["c", "a2", "a3", "a4"],
        answer: "c"
    },
    {
        question: "Question 4",
        choices: ["c", "a2", "a3", "a4"],
        answer: "c"
    },
    {
        question: "Question 5",
        choices: ["c", "a2", "a3", "a4", "a5"],
        answer: "c"
    },
    {
        question: "Question 6",
        choices: ["c", "a2", "a3"],
        answer: "c"
    }
];

// Starting page text
const startPage = {
    title: "Javascript Quiz",
    content: "This quiz will test your knowledge on some fundamental Javascript features. You start with <span class=\"correct\">60</span> seconds and each incorrect answer will subtract your time by <span class=\"incorrect\">10</span> seconds. When you are ready to begin click the button below."
}

// Quiz end text
const quizEnd = {
    content: "Thank you for taking the quiz! Your final score is: ",
    defaultInput: "Enter initials"
}

// Values to store about answers during quiz
var statistics = {
    time: 0,
    correct: 0,
    incorrect: 0,
    incorrectPenalty: 10,
    currentQuestion: 0
}

// Storage for high scores
var highScores = [];

// Variable to hold interval for updating time
var timerInterval;

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

        // This is an ES6 shorthand equivalent to the following code snippet:
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

function clearHighScores() {
    highScores = [];
    localStorage.setItem("highScores", JSON.stringify(highScores));
    loadHighScores();
}

function resetQuiz() {
    timeElement.parentNode.style.display = "none";
    highScoreElement.hidden = false;

    quizTitleElement.textContent = startPage.title;

    quizContentElement.innerHTML = startPage.content;

    quizButtonsElement.innerHTML = "<li><button id=\"start\" class=\"button\">Begin Quiz</button></li>";
    quizStartButtonElement = document.querySelector("#start");
    quizStartButtonElement.addEventListener('click', beginQuiz, false);
}

function loadHighScores() {
    // TODO: Implement
    timeElement.parentNode.style.display = "none";
    highScoreElement.hidden = true;
    // If navigated here from start page, remove initial listener.
    if (quizStartButtonElement != null) {
        quizStartButtonElement.removeEventListener('click', beginQuiz, false);
        quizStartButtonElement = null;
    }

    // Setup title
    quizTitleElement.innerHTML = "High Scores";
    quizContentElement.innerHTML = "";

    // Setup list of scores
    let ol = document.createElement("ol");
    highScores.forEach(user => {
        let li = document.createElement("li");
        li.textContent = user.score + " - " + user.initials;
        ol.appendChild(li);
    });
    quizContentElement.appendChild(ol);

    // Setup back button
    let ret = document.createElement("button");
    ret.classList.add("button");
    ret.textContent = "Return";
    let clear = document.createElement("button");
    clear.classList.add("button");
    clear.textContent = "Clear High Scores";
    quizButtonsElement.innerHTML = "";
    quizButtonsElement.appendChild(ret);
    quizButtonsElement.appendChild(clear);
    ret.addEventListener('click', resetQuiz, true);
    clear.addEventListener('click', clearHighScores, true);
}

function saveScore(event) {
    event.preventDefault();
    // Data validation
    let input = document.querySelector("#input");
    if (input.value == "") {
        alert("You didn't enter your initials!"); 
        return;
    }
    
    // Save information to the local storage
    highScores.push({initials: input.value, score: statistics.time});
    
    // Sort array of scores so that the highest score is first
    highScores.sort((first, second) => {
        if(first.score > second.score) return -1;
        if(first.score < second.score) return 1;
        return 0;
    });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    quizContentElement.classList.remove("question");

    // Take the player to the high score page upon submitting.
    loadHighScores();
}

function endQuiz() {
    // Clean up a few things
    quizButtonsElement.removeEventListener('click', handleAnswer, true);
    clearInterval(timerInterval);
    timeElement.textContent = statistics.time;
    updateCurrentScores();

    // Create quiz score submit page
    quizContentElement.innerHTML = quizEnd.content + "<span class=\"result\">" + statistics.time + "</span>";
    let form = document.createElement("form");
    let input = document.createElement("input");
    let submit = document.createElement("button");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter initials");
    input.setAttribute("id", "input");
    submit.setAttribute("type", "submit");
    submit.textContent = "Submit";
    submit.classList.add("button");
    form.appendChild(input);
    form.appendChild(submit);
    quizButtonsElement.innerHTML = "";
    quizButtonsElement.appendChild(form);
    submit.addEventListener('click', saveScore, true);
}

function handleAnswer(event) {
    // If it's not a button exit function
    if(event.target.nodeName != "BUTTON") {
        return;
    }
    // Correct answer was chosen
    if(event.target.textContent == questions[statistics.currentQuestion].answer) {
        statistics.correct++;
    }
    // Else it was incorrect
    else {
        statistics.incorrect++;
        statistics.time-=statistics.incorrectPenalty;
    }
    statistics.currentQuestion++;
    nextQuestion();
}

function updateTime() {
    statistics.time--;
    if(statistics.time < 0) {
        statistics.time = 0;
        endQuiz();
    }
    else timeElement.textContent = statistics.time;
}

function updateCurrentScores() {
    quizTitleElement.innerHTML = "<div class=\"flex-spacer\"><div class=\"correct\">Correct: <span>" + statistics.correct + "</span></div><div class=\"incorrect\">Incorrect: <span>" + statistics.incorrect + "</span></div></div>";
}

function setQuestionButtons() {
    quizButtonsElement.innerHTML = "";
    // Setup each list item and button inside of it for each choice
    questions[statistics.currentQuestion].choices.forEach(choice => {
        let li = document.createElement("li");
        let button = document.createElement("button");
        li.appendChild(button);
        button.classList.add("button");
        button.textContent = choice;
        quizButtonsElement.appendChild(li);
    });
}

function nextQuestion() {
    // If the last question is answered, end the quiz
    if(statistics.currentQuestion >= questions.length) {
        endQuiz();
        return;
    }
    // Setup Title to show score
    updateCurrentScores();
    // Setup Content to show question
    quizContentElement.classList.add("question");
    quizContentElement.textContent = questions[statistics.currentQuestion].question;
    // Setup button list to show choices
    setQuestionButtons();
}

function beginQuiz() {
    timeElement.parentNode.style.display = "initial";
    highScoreElement.hidden = true;
    statistics.time = 60;
    statistics.currentQuestion = 0;
    statistics.incorrect = 0;
    statistics.correct = 0;
    timeElement.textContent = statistics.time;
    // Shuffle the questions so they are random each time
    questions = shuffle(questions);
    // Then shuffle each choice selection
    questions.forEach(element => {
        element.choices = shuffle(element.choices);
    });
    quizStartButtonElement.removeEventListener('click', beginQuiz, false);
    quizStartButtonElement = null;

    timerInterval = setInterval(updateTime, 1000);
    // Setup listen event for all buttons for the quiz
    quizButtonsElement.addEventListener('click', handleAnswer, true);
    nextQuestion();
}

function loadStorage() {
    highScores = JSON.parse(localStorage.getItem("highScores"));
    if(highScores == null) highScores = [];
}

// Initial event listeners
highScoreElement.addEventListener('click', loadHighScores, false);
quizStartButtonElement.addEventListener('click', beginQuiz, false);

loadStorage();