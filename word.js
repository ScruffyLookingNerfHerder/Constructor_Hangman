var letter = require("./letter.js");


// var test = process.argv[2];

function word(newWord) {
  this.targetword = newWord
  this.letters = []
  this.newletters = []
  for (var i = 0; i < this.targetword.length; i++) {
    this.letters.push(new letter(this.targetword[i]))

  }
  this.appear = function(){
    this.newletters = []
  for (var j = 0; j < this.letters.length; j++) {

    this.newletters.push(this.letters[j].render(this.letters[j]));
    }

  console.log(this.newletters.join(' '));
  }
}

// var tester = new word(test);
// tester.appear();
//
// tester.letters[1].show = true;
// console.log(tester);
// tester.appear();



module.exports = word;
