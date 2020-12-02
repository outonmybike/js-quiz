var questionsArray =[
	{
		order: 0,
		title: 'What is the HTML tag under which one can write the JavaScript code?',
		responses: ['A) <javascript>','B) <scripted>','C) <script>','D) <js>'],
		correct: 'C) <script>'
	},
	{
		order: 0,
		title: 'Who is your daddy?',
		responses: ['Scott','Larry','Jared','Kyle'],
		correct: 'Scott'
	},
	// {
	// 	order: 0,
	// 	title: 'Who is your daddy?',
	// 	responses: ['Scott','Larry','Jared','Kyle'],
	// 	correct: 'Scott'
	// },
	// {
	// 	order: 0,
	// 	title: 'Who is your daddy?',
	// 	responses: ['Scott','Larry','Jared','Kyle'],
	// 	correct: 'Scott'
	// },
	// {
	// 	order: 0,
	// 	title: 'Who is your daddy?',
	// 	responses: ['Scott','Larry','Jared','Kyle'],
	// 	correct: 'Scott'
	// },
	// {
	// 	order: 0,
	// 	title: 'Who is your daddy?',
	// 	responses: ['Scott','Larry','Jared','Kyle'],
	// 	correct: 'Scott'
	// },
]

var highScoreArray = [
	{
	initials: 'DN',
	score: 11,
	},
	{
	initials: 'MB',
	score: 19,
	},
	{
	initials: 'YM',
	score: 1,
	},
]



var scoreValue = 18
var challengeRulesContent = 'Here are the rules of the challenge enter as many as you want Lucas ipsum dolor sit amet qui-gonn leia darth luke vader fett cade jinn hutt naboo. Lucas ipsum dolor sit amet qui-gonn leia darth luke vader fett cade jinn hutt naboo.'
var mainFieldEl = document.querySelector('#main');
var feedbackDiv = document.querySelector('#feedback')
var display = document.querySelector('#time');
var prevScreen = document.querySelector('section')


var viewHighScores = function() {
	var prevScreen = document.querySelector('section')
	prevScreen.remove()
	var prevFeedback = document.querySelector('.feedback-container')
	console.log('high scores')
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
	var goBack = document.createElement('button')
	// goBack.innerHTML = 'button class'
}




var submitHighScore = function() {
	var scoreName = document.querySelector('input[name="initial-box"]').value
	var scoreEntry = {
		initials: scoreName,
		score: scoreValue,
		current: true
		}
	highScoreArray.push(scoreEntry)


	highScoreArray.sort((a,b) => (a.score < b.score) ? 1 : -1)
	console.log(highScoreArray)

	viewHighScores();
	return;
}


var viewresultsPage = function() {
	var prevScreen = document.querySelector('section')
	prevScreen.remove()

	var questionScreen = document.createElement('section');
	questionScreen.innerHTML='<h2>Quiz Complete</h2><h4>Your final score is: '+scoreValue+'</h4>'

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


