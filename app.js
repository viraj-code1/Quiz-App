
console.log(quiz);

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home.box");
const quizBox = document.querySelector(".quiz.box");
const resultBox = document.querySelector(".result.box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let avialableOptions = [];
let correctAnswers = 0;
let attempts = 0;

//copy ques in availableQuestionArray
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i]);
    }
}

// set Quesno , ques, option
function getNewQuestion() {
    //set quesno
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    //set ques and random order
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;


    //get index of current ques
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove that ques
    availableQuestions.splice(index1, 1);

    //set options
    //get no. of options
    const optionLen = currentQuestion.options.length;
    for (let i = 0; i < optionLen; i++) {
        avialableOptions.push(i);
    }
    optionContainer.innerHTML = "";
    let animationDelay = 0.1;
    //creating options in html
    for (let i = 0; i < optionLen; i++) {
        //random option
        const optionIndex = avialableOptions[Math.floor(Math.random() * avialableOptions.length)];
        const index2 = avialableOptions.indexOf(optionIndex);
        avialableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.1;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }


    questionCounter++;

}

//get result of the ques
function getResult(optionElement) {
    const id = parseInt(optionElement.id);
    attempts++;
    if (id === currentQuestion.answer) {
        //go green
        optionElement.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else {
        //go red
        optionElement.classList.add("wrong");
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    unclickableOptions();
}

function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}


function answersIndicator() {
    answersIndicatorContainer.innerHTML = "";
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        indicator.className = ("ans-icon");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);

}
function next() {
    if (questionCounter == quiz.length) {

        console.log("quiz over");
        quizOver();
    }
    else {
        getNewQuestion();
    }
}


function quizOver() {
    // hide quiz box
    quizBox.classList.add("hide");
    //show result
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempts;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempts - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempts = 0;
    currentQuestion;
    availableQuestions = [];
    avialableOptions = [];
}

function tryAgainQuiz() {
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
function goHome() {
    resetQuiz();
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
}
function startQuiz() {
    //hide home box
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    //set ques
    setAvailableQuestions();
    //get ques
    getNewQuestion();
    //create answerIndicator
    answersIndicator();
}


window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML=quiz.length;
}