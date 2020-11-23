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
var mainFieldEl = document.querySelector('#main-field');
var display = document.querySelector('#time');





var correctResponse = function() {
	console.log('right');
	i++;
	pauseTimer=true;
	// startTimer(30,display)
	nextQuestion();
};

var wrongResponse = function() {
	console.log('wrong');
	i++;
	nextQuestion();
	return
}

var endGame = function() {
	console.log('game over')
	mainFieldEl.addEventListener('click',displayStart)
	i=0
};


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
		questionScreen.innerHTML='<h1>'+questionsArray[i].title+'</h1>';
		var answerDiv = document.createElement('div');
		answerDiv.className = 'answer-container';
		questionScreen.appendChild(answerDiv);
		var feedbackDiv = document.createElement('div');
		feedbackDiv.className = 'feedback-container';
		questionScreen.appendChild(feedbackDiv);
		for(x=0; x<questionsArray[i].responses.length; x++) {
			var responseDiv = document.createElement('div')
			responseDiv.className = 'response-container'
			answerDiv.appendChild(responseDiv)
			var responseButton = document.createElement('button');
			responseButton.textContent = questionsArray[i].responses[x];
			responseButton.className='response-button'
			responseDiv.appendChild(responseButton);
		}
		mainFieldEl.appendChild(questionScreen);

		var responseSelected = function(event) {
			var clickedItem = event.target.closest('.response-button')
			if(!clickedItem) {
				return false;
			}
			var feedbackReply = document.createElement('div')
			feedbackDiv.appendChild(feedbackReply);
			if(clickedItem.textContent===questionsArray[i].correct) {
				feedbackReply.textContent='Correct'
			}
			else {
				feedbackReply.textContent='Wrong'
			}
			var viewResultsButton = document.createElement('button')
			feedbackDiv.appendChild(viewResultsButton)
			if (i === questionsArray - 1) {
				viewResultsButton.className = 'results-button'
				viewResultsButton.texContent = 'View Results'
			}
			else {
				viewResultsButton.className = 'next-question-button'
				viewResultsButton.texContent = 'Next Question'
			}
			var nextQuestionButton 	
		}
		questionScreen.addEventListener('click',responseSelected)
};



var landingPage = function() {
	var startScreenEl = document.createElement('section');
	startScreenEl.className = 'landing-page';
	startScreenEl.id = 'start-up';
	startScreenEl.innerHTML = '<h1>Coding Quiz Challenge</h1><p>'+challengeRulesContent+'</p>'
	var startButtonEl = document.createElement('button');
	startButtonEl.className = 'start-button';
	startButtonEl.textContent = 'Start Quiz'
	startScreenEl.appendChild(startButtonEl)
	mainFieldEl.appendChild(startScreenEl);

	startButtonEl.addEventListener('click',beginGame);
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


