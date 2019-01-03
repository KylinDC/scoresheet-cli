class Student {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.stuScores = {};
  }

  set scores(scores) {
    for (let score in scores) {
      this.stuScores[score] = scores[score];
    }
  }

  get scores() {
    return this.stuScores;
  }

  get sum() {
    return Object.values(this.stuScores).reduce((acc, cur) => acc + cur);
  }

  get average() {
    return parseFloat((this.sum / (Object.keys(this.stuScores).length)).toFixed(2));
  }
}

module.exports = Student;
