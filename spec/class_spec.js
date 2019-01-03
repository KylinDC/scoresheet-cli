let Class = require('../lib/class');
let Student = require('../lib/student');

describe('Class test', () => {
  let klass = new Class();
  let li = new Student('li', '111');
  let zhang = new Student('zhang', '110');
  li.scores = {
    math: 85,
    chinese: 80,
    english: 70,
    programing: 90
  };
  zhang.scores = {
    math: 75,
    chinese: 95,
    english: 80,
    programing: 80
  };

  it('class can add and get student', () => {
    klass.addStudent(li, zhang);
    expect(klass.students).toEqual([li, zhang]);
  });

  it('class can get student by id', () => {
    expect(klass.getStudentById('110')).toEqual(zhang);
  });

  it('class can get class scores sum average', () => {
    expect(klass.classAverage).toEqual(327.5);
  });

  it('class can get class scores sum median', () => {
    expect(klass.classMedian).toEqual(327.5);
  });
});
