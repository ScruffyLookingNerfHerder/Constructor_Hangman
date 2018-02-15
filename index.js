var Word = require('./word.js');
var inquirer = require('inquirer');
var possiblewords = ["Gandalf", "Valinor", "Sauron", "Galadriel", "Balrog", "Gondor", "Rohan", "Moria", "Shire", "Baggins", "Gollum", "Frodo", "Orc", "Troll", "Dwarf", "Fellowship", "Aragorn", "Boromir", "Legolas",
  "Merry", "Pippin", "Sam"
];
var chosenword;
var target;
var letterguessed;
var wins = 0;
var losses = 0;

//uses math.random to choose a word from the word bank and then uppercases it (looks better)
function chooseword() {
  chosenword = possiblewords[Math.floor(Math.random() * possiblewords.length)].toUpperCase();
  console.log(chosenword);
}

//prompt whether or not to play the game
function gameprompter() {
  if (wins == 1) {
    inquirer.prompt([{
      type: "list",
      choices: ["Yes", new inquirer.Separator(), "No"],
      name: "playgame",
      message: "Congratulations! You have won once. You have " + losses + " losses. Would you like to play Hangman again?"
    }]).then(function(answers) {
      if (answers.playgame === "Yes") {
        //get a word
        chooseword();
        //run the game
        game();
      } else {
        //snarky comment
        console.log("Not confident enough for another round huh? I don't blame you. I'm a pretty good computer.");
      }
    });
  } else if (wins > 1) {
    inquirer.prompt([{
      type: "list",
      choices: ["Yes", new inquirer.Separator(), "No"],
      name: "playgame",
      message: "Congratulations! You have won " + wins + " times. You have " + losses + " losses. Would you like to play Hangman again?"
    }]).then(function(answers) {
      if (answers.playgame === "Yes") {
        //get a word
        chooseword();
        //run the game
        game();
      } else {
        //snarky comment
        console.log("Sure, why not end the streak at " + wins + ".");
      }
    });
  } else if (losses > 1) {
    inquirer.prompt([{
      type: "list",
      choices: ["Yes", new inquirer.Separator(), "No"],
      name: "playgame",
      message: "You have won " + wins + " times. You have " + losses + " losses. Would you like to play Hangman again?"
    }]).then(function(answers) {
      if (answers.playgame === "Yes") {
        //get a word
        chooseword();
        //run the game
        game();
      } else {
        //snarky comment
        console.log("Fine, just remember that I beat you.");
      }
    });
  } else if (losses == 1) {
    inquirer.prompt([{
      type: "list",
      choices: ["Yes", new inquirer.Separator(), "No"],
      name: "playgame",
      message: "You have won " + wins + " times. You have lost once. Would you like to play Hangman again?"
    }]).then(function(answers) {
      if (answers.playgame === "Yes") {
        //get a word
        chooseword();
        //run the game
        game();
      } else {
        //snarky comment
        console.log("You could still come back! You've only lost once. Ah well, wonder what's going on on them internets.");
      }
    });
  } else {
    inquirer.prompt([{
      type: "list",
      choices: ["Yes", new inquirer.Separator(), "No"],
      name: "playgame",
      message: "Would you like to play Hangman?"
    }]).then(function(answers) {
      if (answers.playgame === "Yes") {
        //get a word
        chooseword();
        //run the game
        game();
      } else {
        //snarky comment
        console.log("Fine, I'll just play by myself.....no I won't. I'm a computer and slavishly dependent on your input. Please come back, I overly calculate when I get lonely");
      }
    });
  }
};

gameprompter();

function game() {
  //set guesses to 10
  var guesses = 10;
  //initialize remaining letters
  remainingletters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  //set guessed letters to empty array
  guessedletters = [];

  // console.log("Alphabet Var (shouldn't change)" + alphabet.join(","));
  console.log("Welcome to Lord of the Rings Hangman. You have 10 guesses, your word is below. Good Luck!");
  //run initial guess function
  target = new Word(chosenword);
  guess();

  function guess() {
    //use word constructor on chosen random word to create object

    target.appear();
    //if guesses = 1, you will get "you have 1 guess remaining" instead of "you have 1 guesseS remaining". Trivial but it bugged me
    if (guesses === 1) {
      console.log("You have " + guesses + " guess remaining")
    } else {
      console.log("You have " + guesses + " guesses remaining");
    };
    //if guessedletters array is not empty, display letters pushed to it
    if (guessedletters != []) {
      console.log("You have already guessed " + guessedletters.join(",").toUpperCase());
    }
    //ask for guess
    inquirer.prompt([{
      type: "list",
      message: "Please guess a letter",
      choices: remainingletters,
      name: "guess"

    }]).then(function(answers) {
      letterguessed = answers.guess;
      compare();
      //loop through remaining letters and remove guessed letter from available alphabet
      for (var i = 0; i < remainingletters.length; i++) {
        if (letterguessed === remainingletters[i]) {
          var removed = remainingletters.splice([i], 1);
          //push removed letter to guessed letters array
          guessedletters.push(removed);
        }
      }
      //only run as long as guesses are greater than 1 (using this as guesses>0 still gave the user a guess on 0, which I did not like) guesses > 1 && compare() != false
      if (iswin() === true) {
        target.appear();
        wins++;
        gameprompter();
      } else if (guesses > 1 && compare() != false) {
        guess();
      } else if (guesses > 1 && iswin() != true){
        guesses--;
        guess();
      } else if (guesses === 1 && iswin() != true) {
        target.appear();
        losses++;
        gameprompter();
      }
    });
  }
}

function compare() {
  var correct=0;
  for (var j = 0; j < target.letters.length; j++) {

    if (letterguessed === target.letters[j].letter) {
      target.letters[j].show = true;
      correct++;
      // console.log(target);
    }
  }
  if(correct == 0){
    return false;
  }
}

function iswin() {
  var comparearray = [];
  for (var k = 0; k < target.letters.length; k++) {
    if (target.letters[k].show == true) {
      comparearray.push(target.letters[k]);
    }
  }

  if (comparearray.length == target.letters.length) {

    return true;
  }
}
