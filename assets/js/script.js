// establish variables
var startButtonEL = document.querySelector('#startButton');
var timerEl = document.querySelector('#timer');
var mainPageEl = document.querySelector('.main-page');
var highScoreEl = document.querySelector('#high-score');
var score = 0;
var timer = 75;
var quizLength = 0;

function questionCreation(){
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

    var quizKeys = Object.keys(quizObj);
    // set global variable for length
    quizLength = quizKeys.length;

    // create object for return 
    return {
        quizObj,
        quizKeys
    }
}

// countdown functionality
function countDown() {
    var updateTimer = setInterval(function() {
        // decrease timer by 1 second
        timer -= 1;
        timerEl.innerHTML = `Time: ${timer}`;
        // if timer < 1, stop the quiz
        if (timer <= 0){
            timerEl.innerHTML = 'Time: 0'
            clearInterval(updateTimer);

            // save score
            quizComplete();
        }
    }, 1000)
}

// quiz complete page
function quizComplete(){
    // TODO: add css class to make the score larger
    mainPageEl.innerHTML = `<h1>All done!</h1> <p class='score'>Your final score is ${score/quizLength * 100}%<p>`;
    
    // create initials div element
    var initialDiv = document.createElement('div');
    var description = document.createElement('p');
    var input = document.createElement('input');
    var submitButton = document.createElement('button');

    // update classes 
    initialDiv.className = 'initials-div';
    description.innerHTML = 'Enter initials: ';
    description.id = 'submit-p';
    submitButton.className = 'submit-button';
    submitButton.innerHTML = 'Submit';
    
    // update input and button element
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter initials here');
    input.id = 'initials-input';

    // append elements to div and mainpage
    initialDiv.appendChild(description);
    initialDiv.appendChild(input);
    initialDiv.appendChild(submitButton);
    mainPageEl.appendChild(initialDiv);

    // listener element for submission
    submitButton.addEventListener('click', saveScore)
}

// save score to localStorage
function saveScore(){
    // extract initials from input
    var initials = document.getElementById('initials-input');

    // check for presence of initials in input
    if (!initials.value){
        alert('Please enter initials before submitting your score');
    } else {
        var initialVal = initials.value;

        // create initials object
        var scoreObj = {
            'initials': initialVal,
            'score': score
        }

        // import existing leader board ;create a copy first, then replace (immutable data)
        var leaderBoard = JSON.parse(localStorage.getItem('leaderboard'));
        if (!leaderBoard){
            var leaderBoard = [];
            leaderBoard.push(scoreObj);
            localStorage.setItem('leaderboard', JSON.stringify(leaderBoard));
            // take user to high score page
            highScores(leaderBoard);

        } else {
            leaderBoard.push(scoreObj);
            localStorage.setItem('leaderboard', JSON.stringify(leaderBoard));
            // take user to high score page
            highScores(leaderBoard);
        }
    }
}

// quiz page change 
function createQuestion(quizObj, quizKeys){
    var answerDivEl = document.createElement('div');
    var questionButton1 = document.createElement('button');
    var questionButton2 = document.createElement('button');
    var questionButton3 = document.createElement('button');
    var questionButton4 = document.createElement('button');
    var resultEl = document.createElement('h5')
    resultEl.setAttribute('id', 'result');

    var buttons = [questionButton1, questionButton2, questionButton3, questionButton4];

    // extract question (dynamic pull)
    var questionIndex = Math.floor(Math.random() * quizKeys.length);
    var quizObs = quizObj[quizKeys[questionIndex]];
    mainPageEl.innerHTML = `<h1> ${quizObs[0]}<h3>`;

    // extract answers into buttons 
    questionButton1.textContent = `1. ${quizObs[1]}`;
    questionButton2.textContent = `2. ${quizObs[2]}`;
    questionButton3.textContent = `3. ${quizObs[3]}`;
    questionButton4.textContent = `4. ${quizObs[4]}`;

    // remove question from keys
    quizKeys.splice(questionIndex, 1);

    // add class to the buttons
    // update for css left align
    for (i in buttons){
        buttons[i].className = 'answer-button';
    }

    // append buttons to div and then div to main-page
    answerDivEl.className = 'answer';
    answerDivEl.append(questionButton1, questionButton2, questionButton3, questionButton4);
    mainPageEl.append(answerDivEl, resultEl);

    // when clicked
    answerDivEl.onclick = function(event){

        // variables for answer check
        var answer = event.target.innerHTML;
        var result = document.getElementById('result');

        // logic for answer check
        if (answer.substring(2).trim() === quizObs.answer.trim()){
            // add 1 to score and disoplay success result
            score += 1
            result.innerHTML = 'Correct!';
        } else {
            // reduce timer by net 10 (9 plus 1 second delay in answer)
            result.innerHTML = 'Wrong!';
            timer -= 9;
        }

        // check for more questions, end if complete
        if (quizKeys.length > 0){
            // pause so user can see answer
            setTimeout(function(){
                createQuestion(quizObj, quizKeys)
            }, 1000);
        } else {
            // set timer 0 when quiz is done
            timer = 0;
        }
    }
}

// high score function
function highScores(scoreObj){
    // create list element
    var scoreList = document.createElement('ol');
    scoreList.className = 'score-list';
    scoreList.id = 'score-list';
    scoreList.type = '1';

    // show top 10 or all if less
    if (scoreObj.length > 10) {
        for (var i = 0; i < 10; i++){
            liEl = document.createElement('li');
            liEl.innerHTML = `${scoreObj[i].initials} - ${scoreObj[i].score/quizLength * 100}%`;
            liEl.className = 'score-entry';
            scoreList.appendChild(liEl);
        }
    } else {
        for (i in scoreObj){
            liEl = document.createElement('li');
            liEl.innerHTML = `${scoreObj[i].initials} - ${scoreObj[i].score/quizLength * 100}%`;
            liEl.className = 'score-entry';
            scoreList.appendChild(liEl);
        }
    }

    // create button div
    var buttonDiv = document.createElement('div');
    buttonDiv.className = 'score-buttons';
    buttonDiv.innerHTML = "<button id='goBack'>Go Back</button> <button id='clearScores'>Clear scores</button>"

    // finalize appending scores to list
    mainPageEl.innerHTML = '<h1>Recent Scores</h1>';
    mainPageEl.appendChild(scoreList);
    mainPageEl.appendChild(buttonDiv);

    // add listeners for buttons
    var goBack = document.getElementById('goBack');
    var clearScores = document.getElementById('clearScores');

    // functions once clicked
    goBack.addEventListener('click', mainPage);
    clearScores.addEventListener('click', clearHighScores);

}

function highScoresLink(){
    // check whether a leaderboard is preset. If so, take the user there
    var leaderBoard = JSON.parse(localStorage.getItem('leaderboard')); 
    if (!leaderBoard){
        alert('There are no scores to view');
    } else {
        highScores(leaderBoard);
    }
}

// clear high scores at the high scores page
function clearHighScores(){
    // clear html element that the user sees
    var scoreList = document.getElementById('score-list');
    scoreList.remove();

    // clear local storage
    localStorage.clear();
}

// sleep processing
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

// generate main page
function mainPage(){
    mainPageEl.innerHTML = '<h1>Coding Quiz Challenge</h1> <p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds.</p>'
    
    // create startButton and append to mainpage
    var startButton = document.createElement('button');
    startButton.className='button';
    startButton.id = 'startButton';
    startButton.textContent = 'Start Quiz';
    mainPageEl.appendChild(startButton);

    // reset variables
    var startButtonEL = document.querySelector('#startButton');
    timer = 75;
    startButtonEL.addEventListener('click', startQuiz);
}

// start of quiz function, trigger timer & questions
function startQuiz(){
    // reset score, start countdown, and quiz
    score = 0;
    var quiz = questionCreation();
    countDown();
    createQuestion(quiz.quizObj, quiz.quizKeys);
}

// event listeners 
startButtonEL.addEventListener('click', startQuiz);

