// establish variables
var startButtonEL = document.getElementById('startButton');
var timerEl = document.getElementById('timer');

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

// event listeners
startButtonEL.addEventListener('click', countDown);