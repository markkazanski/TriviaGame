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

var questions = [
    "A panda's daily diet consists almost entirely of what plant?",
    "What is the largest species of terrestrial crab in the world?",
    "What is the name for a male bee that comes from an unfertilized egg?",
    "Cynophobia is the fear of what kind of animal?",
    "What was the name of the gorilla that was shot and killed at the Cincinnati zoo in 2016 after a three-year old boy fell into the enclosure?"
];

Bamboo
The coconut crab
Drone
Dogs 
Harambe


var triviaGame = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,

};