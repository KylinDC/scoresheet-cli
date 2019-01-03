let Student = require('../lib/student');

describe('Student Class test', () => {
  let student = new Student('kai', '110');
  let scores = {
    math: 80,
    english: 90,
    chinese: 70,
    programing: 85
  };

  it('student should have name and id', () => {
    expect(student.name).toEqual('kai');
    expect(student.id).toEqual('110');
  });

  it('student should can set scores and get scores', () => {
    student.scores = scores;
    expect(student.scores).toEqual(scores);
  });

  it('student should can get sum of scores', () => {
    expect(student.sum).toEqual(325);
  });

  it('student should can get average of scores', () => {
    expect(student.average).toEqual(81.25);
  });
});
