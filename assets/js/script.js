var questionsArray =[
	{
		order: 0,
		title: 'Who is your daddy?',
		responses: ['Scott','Larry','Jared','Kyle'],
		correct: 'Scott'
	},
	{
		order: 1,
		title: 'Who is your mom?',
		responses: ['Carrie','Mary','Joseph','Jesus'],
		correct: 'Carrie'
	},
	{
		order: 2,
		title: 'What is the HTML tag under which one can write the JavaScript code?',
		responses: ['A) <javascript>','B) <scripted>','C) <script>','D) <js>'],
		correct: 'C) <script>'
	},
]

var challengeRulesContent = 'Here are the rules of the challenge enter as many as you want Lucas ipsum dolor sit amet qui-gonn leia darth luke vader fett cade jinn hutt naboo. Lucas ipsum dolor sit amet qui-gonn leia darth luke vader fett cade jinn hutt naboo.'
var mainFieldEl = document.querySelector('#main');
var feedbackDiv = document.querySelector('#feedback')
var display = document.querySelector('#time');

var viewresultsPage = function() {
	var prevScreen = document.querySelector('section')
	prevScreen.remove()
	var questionScreen = document.createElement('section');
	questionScreen.innerHTML='<h2>All done</h2><h3>Your final score is:';
	mainFieldEl.appendChild(questionScreen)
}


var i = 0;	
var beginGame = function() {
	//logic to start the timer
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
	questionScreen.addEventListener('click',responseSelected)
	return
}


var responseSelected = function(event) {
	var prevFeedback = document.querySelector('.feedback-container')
	if(prevFeedback) {
		prevFeedback.remove();
	}
	var feedBackTextBox = document.createElement('div');
	feedBackTextBox.className = 'feedback-container';
	feedbackDiv.appendChild(feedBackTextBox);

	var clickedItem = event.target.closest('.response-button')
	if(!clickedItem) {
		return false;
	}
	if(clickedItem.textContent===questionsArray[i].correct) {
		feedBackTextBox.innerHTML='<h3>Correct!</h3>'
	}
	else {
		feedBackTextBox.innerHTML='<h3>Wrong!</h3>'
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



// var startTimer = function (duration,display) {
// 	var timer = duration, seconds;
// 	setInterval(function(){
// 		seconds = parseInt(timer % 60,10);
// 		display.textContent = seconds;
// 		if (--timer < 0) {
// 			endGame();
// 		}
// 	}, 1000);
// }
// window.onload=function() {
// 	var sixty = 60,
// 	display = document.querySelector('#time');
// 	startTimer(sixty,display)
// }



// var startTimer = function (duration,display) {
// 	var timer = duration, seconds;
// 	setInterval(function(){
// 		seconds = parseInt(timer % 60,10);
// 		display.textContent = seconds;
// 		if (--timer < 0) {
// 			endGame();
// 		}
// 		if(pauseTimer) {
// 			return
// 		}
// 	}, 1000);
// }


