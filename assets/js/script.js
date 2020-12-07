var questionsArray =[
	{
		order: 0,
		title: 'What is the HTML tag under which one can write the JavaScript code?',
		responses: ['A) <javascript>','B) <scripted>','C) <script>','D) <js>'],
		correct: 'C) <script>'
	},
	{
		order: 0,
		title: 'How do you create a function in JavaScript?',
		responses: ['A) function:myFunction()','B) function myFunction()','C) function = myFunction()'],
		correct: 'B) function myFunction()'
	},
	{
		order: 0,
		title: 'What is the correct syntax for referring to an external script called "xxx.js"?',
		responses: ['A) <script href="xxx.js">','B) <script name="xxx.js">','C) <script src="xxx.js">'],
		correct: 'C) <script src="xxx.js">'
	},
	{
		order: 0,
		title: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
		responses: ['A) if i <> 5','B) if (i != 5)', 'C) if i=!5 then','D) if(i<>5)'],
		correct: 'B) if (i != 5)'
	},
	{
		order: 0,
		title: 'How do you write "Hello World" in an alert box?',
		responses: ['A) msgBox("Hello World");','B) alert("Hello World");','C) alertBox("Hello World");','D) msg("Hello World");'],
		correct: 'B) alert("Hello World");'
	}
]

var highScoreArray = []

var scoreAndTimer = 60

var challengeRulesContent = 'Here are the rules of the challenge enter as many as you want Lucas ipsum dolor sit amet qui-gonn leia darth luke vader fett cade jinn hutt naboo. Lucas ipsum dolor sit amet qui-gonn leia darth luke vader fett cade jinn hutt naboo.'
var mainFieldEl = document.querySelector('#main');
var feedbackDiv = document.querySelector('#feedback')
var display = document.querySelector('#time');
var prevScreen = document.querySelector('section')

var restartGame = function() {
	var prevScreen = document.querySelector('section')
	if(prevScreen) {
		prevScreen.remove()
	}
	for(i=0;i<highScoreArray.length;i++) {
		highScoreArray[i].current=false
	}
	landingPage()
	return;
}

let timerID;

var reduceScore = function() {
	scoreAndTimer --;
	document.getElementById('time').innerHTML=scoreAndTimer;
	if(scoreAndTimer===0){
		timeUp();
	}
}

var stopTimer = function() {
	clearInterval(timerID);
	document.getElementById('time').innerHTML=scoreAndTimer;
}


var resetHighScores = function() {
	highScoreArray = []
	localStorage.setItem('highScores',JSON.stringify(highScoreArray));
	restartGame();
	return;
}

var timeUp = function() {
	alert('Your time has expired')
	viewresultsPage();	
}

var viewHighScores = function() {
	var prevScreen = document.querySelector('section')
	prevScreen.remove()
	var prevFeedback = document.querySelector('.feedback-container')
	prevFeedback.remove();
	var questionScreen = document.createElement('section');
	mainFieldEl.appendChild(questionScreen)
	questionScreen.innerHTML='<h2>High Scores</h2>'

	for(i=0;i<highScoreArray.length;i++) {
		var highScoreDiv = document.createElement('div');
		if(highScoreArray[i].current) {
			highScoreDiv.className = 'high-score-container-current'
		}
		else {highScoreDiv.className = 'high-score-container';
		}
		highScoreDiv.innerHTML = '<h4>'+(i+1)+'. '+highScoreArray[i].initials+' - '+highScoreArray[i].score +'</h4>'
		questionScreen.appendChild(highScoreDiv)
	}
	var buttonBar = document.createElement('div')
	questionScreen.appendChild(buttonBar)
	buttonBar.className = 'button-bar'
	buttonBar.innerHTML = '<button class="go-back" id="go-back">Go Back</button><button class="clear-high-scores" id="clear-high-scores">Clear High Scores</button'
	var goBack = document.querySelector('.go-back')
	var clearHighScores = document.querySelector('.clear-high-scores')
	localStorage.setItem('highScores',JSON.stringify(highScoreArray));
	goBack.addEventListener('click',restartGame)
	clearHighScores.addEventListener('click',resetHighScores)
	return
}

var submitHighScore = function() {
	var scoreName = document.querySelector('input[name="initial-box"]').value
	var savedScores = localStorage.getItem('highScores');
	if(savedScores){
		highScoreArray=JSON.parse(savedScores)
	}
	for(i=0;i<highScoreArray.length;i++) {
		highScoreArray[i].current=false
	}

	var scoreEntry = {
		initials: scoreName,
		score: scoreAndTimer,
		current: true
		}
	highScoreArray.push(scoreEntry)
	highScoreArray.sort((a,b) => (a.score < b.score) ? 1 : -1)
	viewHighScores();
	return;
}


var viewresultsPage = function() {
	stopTimer();
	var prevScreen = document.querySelector('section')
	prevScreen.remove()

	var questionScreen = document.createElement('section');
	questionScreen.innerHTML='<h2>Quiz Complete</h2><h4>Your final score is: '+scoreAndTimer+'</h4>'

	var highScoreInput = document.createElement('div')
	highScoreInput.className='enter-initials'
	questionScreen.appendChild(highScoreInput)
	highScoreInput.innerHTML='<h4>Enter initials:</h4>'+
	'<input type="text" name="initial-box" class="initial-input-box"/>'+
	'<button class="submit-score" id="submit-score">Submit</button'
	mainFieldEl.appendChild(questionScreen)

	var submitButton = document.querySelector('#submit-score');
	submitButton.addEventListener('click', submitHighScore)
}


var i = 0;	
var beginGame = function() {
	i=0
	scoreAndTimer = 60;
	timerID = setInterval(reduceScore,1000);
	nextQuestion();
	return
}

var nextQuestion = function() {
	var prevScreen = document.querySelector('section')
	prevScreen.remove()
	
	var questionScreen = document.createElement('section');
	questionScreen.innerHTML='<h2>'+questionsArray[i].title+'</h2>';
	var answerDiv = document.createElement('div');
	answerDiv.className = 'answer-container';
	questionScreen.appendChild(answerDiv);
	mainFieldEl.appendChild(questionScreen);

	for(x=0; x<questionsArray[i].responses.length; x++) {
		var responseDiv = document.createElement('div')
		responseDiv.className = 'response-container'
		answerDiv.appendChild(responseDiv)
		var responseButton = document.createElement('button');
		responseButton.textContent = questionsArray[i].responses[x];
		responseButton.className='response-button'
		responseDiv.appendChild(responseButton);
	}
	answerDiv.addEventListener('click',responseSelected)
	return
}

var responseSelected = function(event) {
	var clickedItem = event.target.closest('.response-button')
	if(!clickedItem) {
		return false;
	}
	var prevFeedback = document.querySelector('.feedback-container')
	if(prevFeedback) {
		prevFeedback.remove();
	}
	var feedBackTextBox = document.createElement('div');
	feedBackTextBox.className = 'feedback-container';
	feedbackDiv.appendChild(feedBackTextBox);

	if(clickedItem.textContent===questionsArray[i].correct) {
		feedBackTextBox.innerHTML='<h3>Correct!</h3>'
	}
	else {
		feedBackTextBox.innerHTML='<h3>Wrong!</h3>'
		scoreAndTimer -= 5
	}
	i++;
	if(i===questionsArray.length) {
		viewresultsPage();
		return
	}
	else {
		nextQuestion()
		return
	}
	return
	}

var landingPage = function() {
	scoreAndTimer = 60
	document.getElementById('time').innerHTML=scoreAndTimer;
	var startScreenEl = document.createElement('section');
	startScreenEl.className = 'landing-page';
	startScreenEl.innerHTML = '<h1>Coding Quiz Challenge</h1><p>'+challengeRulesContent+'</p>'
	var startButtonEl = document.createElement('button');
	startButtonEl.className = 'start-button';
	startButtonEl.textContent = 'Start Quiz';
	startScreenEl.appendChild(startButtonEl);
	mainFieldEl.appendChild(startScreenEl);

	startButtonEl.addEventListener('click',beginGame);
	return
};

landingPage();


