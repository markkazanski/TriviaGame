/*
    1. Create array of questions
            Create array of right and wrong answers.
            array of arrays [0]-answer [1]-right/wrong
    2. Display questions in order
    3. Create question timer (30s)
    4. Get user input - radio buttons
        Check that user input is right/wrong
        Display result
        Advance to next question
    5. Show score
    6. Reset game button 
*/

//ADD Questin Timer

var questions = [
    "A panda's daily diet consists almost entirely of what plant?",
    "What is the largest species of terrestrial crab in the world?",
    "What is the name for a male bee that comes from an unfertilized egg?",
    "Cynophobia is the fear of what kind of animal?",
    "What was the name of the gorilla that was shot and killed at the Cincinnati zoo in 2016 after a three-year old boy fell into the enclosure?"
];

var answer = [
    [["Bamboo", 1], ["Beef",0], ["Hemp", 0], ["Monkeys", 0]],
    [["The coconut crab", 1], ["The red king crab",0], ["The Maine crab", 0], ["The Brown Pacific Weed crab", 0]],
    [["Drone", 1], ["Worker",0], ["Queen", 0], ["Proletarian", 0]],
    [["Dogs", 1], ["Cats",0], ["Rats", 0], ["Monkeys", 0]],
    [["Harambe", 1], ["Sankara",0], ["Kollontai", 0], ["Zizek", 0]]
];


var triviaGame = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentQuestion: 0, //the index of the current question
    userGuess: undefined,
    questionTimer: undefined,
    intervalId: undefined,
    secondsLeft: 15,

    displayQuestion: function(){
        $("#question").text(questions[this.currentQuestion]); //Shows the current question
        console.log("Current Question: " + triviaGame.currentQuestion);
    },

    displayAnswers: function(){
        $("#answer").text("");
        for(var i=0; i<answer[this.currentQuestion].length; i++){ //Goes through all answers to current question
            $("#answer").append(`<button class="answer-button" id="answer${i}" value="${i}">${answer[this.currentQuestion][i][0]}</button>`);
            console.log( answer[this.currentQuestion][i][0], " ", answer[this.currentQuestion][i][1] );
        }
        triviaGame.startTimer();
        ///timer
        this.questionTimer = setTimeout(function() {
            triviaGame.unanswered++;
            triviaGame.displayQuestionResult(2);
            setTimeout(triviaGame.nextQuestion, 3000);//wait
        }, 15000); //30000 Wait 15 seconds to next questions
    },

    checkAnswer: function(guess){
        if( answer[this.currentQuestion][guess][1] === 1 ){
                //correct answer
                this.correct++;
                triviaGame.displayQuestionResult(1);
                setTimeout(triviaGame.nextQuestion, 3000);//wait
                console.log("CORRECT");
        }else{
            //wrong answer
            this.incorrect++;
            triviaGame.displayQuestionResult(0);
            setTimeout(triviaGame.nextQuestion, 3000);//wait
            console.log("WRONG");
        }
    },

    displayQuestionResult: function(result){
        console.log("RESULT: " + result);
        clearInterval( triviaGame.intervalId );
        //console.log( answer[this.currentQuestion][userGuess][0] );

        if(result === 1){ //correct
            $("#question").text("CORRECT");
            $("#answer").text(answer[this.currentQuestion][userGuess][0]);
        }else if(result === 0){
            $("#question").text("WRONG");
            $("#answer").text("The correct answer was: " + answer[this.currentQuestion][0][0]); //Awful hack because the right answer is always the first one in the array
        }else if(result === 2){ //timeout
            $("#question").text("Ran Out of Time");
            $("#answer").text("The correct answer was: " + answer[this.currentQuestion][0][0]);
        }
    },

    getUserClicks: function(){
        $("button.answer-button").on("click", function(){ //Gets array of buttons
            clearTimeout(triviaGame.questionTimer);
            userGuess = this.value; //gets value of clicked button
            triviaGame.checkAnswer(userGuess); //calls to check answer with value of clicked button
            console.log("Clicked value: " + this.value);
            console.log("user Guess: " + userGuess);
        });
    },
    
    checkGameOver: function(){
        if( this.currentQuestion < questions.length-1 ){
            return false;
        }else{
            return true;
        }
    },

    nextQuestion: function(){
        if( !triviaGame.checkGameOver() ){
             triviaGame.currentQuestion++;
             console.log(triviaGame.currentQuestion + "Incremented current question");
             triviaGame.displayQuestion();
             triviaGame.displayAnswers();
             triviaGame.getUserClicks(); //capture clicks for new buttons
        }else{
            //gameover screen
            $("#answer").text("");
            $("#question").html(`Game Over<br /> Your Score<br />  correct: ${triviaGame.correct} <br /> incorrect: ${triviaGame.incorrect} <br /> unanswered: ${triviaGame.unanswered}`);
            console.log(`Score: correct: ${triviaGame.correct} incorrect: ${triviaGame.incorrect}`);
            $("#seconds-left").addClass("hidden");
            clearInterval(triviaGame.intervalId);
        }
    },

    startTimer: function(){
        triviaGame.secondsLeft = 15;
        $("#seconds-left").text(triviaGame.secondsLeft);
        triviaGame.intervalId = setInterval(triviaGame.count, 1000);
    },

    count:function(){
            triviaGame.secondsLeft--;
            $("#seconds-left").text(triviaGame.secondsLeft);
            console.log("count");
    },

};

$( document ).ready(function() {
    triviaGame.displayQuestion();
    triviaGame.displayAnswers();
    triviaGame.getUserClicks();
    triviaGame.startTimer();
});