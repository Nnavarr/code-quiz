// establish variables
var startButtonEL = document.querySelector('#startButton');
var timerEl = document.querySelector('#timer');
var mainPageEl = document.querySelector('.main-page');
var score = 0;

// countdown functionality
function countDown() {
    var timer = 10
    var updateTimer = setInterval(function() {
        // decrease timer by 1 second
        timer -= 1;
        timerEl.innerHTML = `Time: ${timer}`;
        // if timer = 0, stop the quiz
        if (timer === 0){
            alert('Time is up!');
            clearInterval(updateTimer);
        }
    }, 1000)
}

// quiz page questions
var questionOne = {
    0: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    1: 'JavaScript',
    2: 'terminal/bash',
    3: 'for loops',
    4: 'console.log',
    'answer': 'console.log'
};

var questionTwo = {
    0: 'Commonly used data types DO Not Include:',
    1: 'strings',
    2: 'booleans',
    3: 'alerts',
    4: 'numbers',
    'answer': 'alerts'
};

var questionThree = {
    0: 'The condition in an if / else statement is enclosed with _______.',
    1: 'quotes',
    2: 'curly brackets',
    3: 'parenthesis',
    4: 'square brackets',
    'answer': 'parenthesis'
};

var questionFour = {
    0: 'Arrays in JavaScript can be used to store _______.',
    1: 'numbers and strings',
    2: 'other arrays',
    3: 'booleans',
    4: 'all of the above',
    'answer': 'all of the above'
};

// append question objects to single quiz container 
var quizObj = {
    0: questionOne,
    1: questionTwo,
    2: questionThree,
    3: questionFour
};


function answerHandler(event){
    // check the answer submission
    var answer = event.target.innerHTML
    var result = document.getElementById('result');
    console.log(result);
    if (answer.substring(2).trim() === quizObj[0].answer.trim()){
        // do something when right
        score += 1
        result.innerHTML = 'Correct!';
    } else {
        // do something when wrong
        result.innerHTML = 'Incorrect!';
    }
}

// quiz page change 
function createQuestion(questionIndex){
    var answerDivEl = document.createElement('div');
    var questionButton1 = document.createElement('button');
    var questionButton2 = document.createElement('button');
    var questionButton3 = document.createElement('button');
    var questionButton4 = document.createElement('button');
    var resultEl = document.createElement('h5')
    resultEl.setAttribute('id', 'result');

    var buttons = [questionButton1, questionButton2, questionButton3, questionButton4];

    // extract question 
    var questionIndex = 0;
    mainPageEl.innerHTML = `<h1> ${quizObj[questionIndex][0]}<h3>`;

    // extract answers into buttons 
    questionButton1.textContent = `1. ${quizObj[questionIndex][1]}`;
    questionButton2.textContent = `2. ${quizObj[questionIndex][2]}`;
    questionButton3.textContent = `3. ${quizObj[questionIndex][3]}`;
    questionButton4.textContent = `4. ${quizObj[questionIndex][4]}`;

    // add class to the buttons
    for (i in buttons){
        buttons[i].className = 'answer-button';
    }

    // append buttons to div and then div to main-page
    answerDivEl.append(questionButton1, questionButton2, questionButton3, questionButton4);
    mainPageEl.append(answerDivEl, resultEl);

    // add event listener for buttons
    answerDivEl.addEventListener('click', answerHandler);
}

createQuestion();

// event listeners
startButtonEL.addEventListener('click', countDown);