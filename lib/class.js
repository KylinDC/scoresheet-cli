class Class {
  constructor() {
    this.studentArr = [];
  }

  addStudent() {
    this.studentArr.push(...arguments);
  }

  get students() {
    return this.studentArr;
  }

  getStudentById(id) {
    return this.studentArr.find(e => e.id === id);
  }

  get classSum() {
    return this.studentArr.reduce((acc, cur) => acc += cur.sum, 0);
  }

  get classAverage() {
    return parseFloat((this.classSum / this.studentArr.length).toFixed(2));
  }

  get classMedian() {
    let stuSumArr = this.studentArr.map(e => e.sum);

    stuSumArr.sort((a, b) => a >= b ? a : b);
    let lowMiddle = Math.floor((stuSumArr.length - 1) / 2);
    let highMiddle = Math.ceil((stuSumArr.length - 1) / 2);
    let median = (stuSumArr[lowMiddle] + stuSumArr[highMiddle]) / 2;

    return median;
  }
}

module.exports = Class;
