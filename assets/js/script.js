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









var i = 0;	
var beginGame = function() {
	//logic to start the timer
	nextQuestion();
	return
}

var postQuestionHandler = function () {
	console.log('now what??')
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
			questionScreen.removeEventListener('click',responseSelected);
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
			var postQuestionButton = document.createElement('button')
			feedbackDiv.appendChild(postQuestionButton)
			if (i === questionsArray - 1) {
				postQuestionButton.className = 'results-button'
				postQuestionButton.texContent = 'View Results'
			}
			else {
				postQuestionButton.className = 'next-question-button'
				postQuestionButton.texContent = 'Next Question'
			}
			postQuestionButton.addEventListener('click',postQuestionHandler)
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


