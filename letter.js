
function letter (lttr) {
  this.letter = lttr
    this.show = false
    this.render = function(lttr) {

      this.letters = lttr
      if (this.letters === ' ') {
        this.show = true;
        return ' '
      }

      if (this.letters.show === false) {
        return ' _ '

      } else if (this.letters.show == true) {
        return this.letter
      }
    }
}


module.exports = letter;
