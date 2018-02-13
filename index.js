var Word = require('./word.js');
var inquirer = require('inquirer');
var possiblewords = ["Gandalf", "Valinor", "Sauron", "Galadriel", "Balrog", "Gondor", "Rohan", "Moria", "Shire", "Baggins", "Gollum", "Frodo", "Orc", "Troll", "Dwarf", "Fellowship", "Aragorn", "Boromir", "Legolas",
"Merry", "Pippin", "Sam"];
var chosenword;

console.log(possiblewords);
function chooseword () {
  chosenword = secretwords[Math.floor(Math.random() * possiblewords.length)].toLowerCase();
}

chooseword();
console.log(chosenword);
