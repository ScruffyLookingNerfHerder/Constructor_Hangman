var letter = require("./letter.js");


var Word = process.argv[2];
function word (newWord){
  this.targetword = newWord;
  this.letters = [];
  this.newletters = [];
  for(var i=0; i < this.targetword.length; i++){
     this.letters.push(new letter(this.targetword[i]))
  }
  for(var j=0; j <this.letters.length; j++){
     this.newletters.push(this.letters[j].render(this.letters[j]));

    }
    console.log(newletters.join(' '));
  }


module.exports = word;
