function main() {
  let Class = require('./class');
  let klass = new Class();

  while (true) {
    showMenu(klass);
  }
}

function showMenu(klass) {
  let readlineSync = require('readline-sync');
  let menu = `1. 添加学生
2. 生成成绩单
3. 退出`;
  console.log(menu);

  let menuId = readlineSync.keyIn('请输入你的选择（1～3）：', { limit: '$<1-3>' });
  switch (menuId) {
    case '1':
      let student = addStudent();
      klass.addStudent(student);
      break;
    case '2':
      showReport(klass);
      break;
    case '3':
      exit();
      break;
    default:
      break;
  }
}

function addStudent() {
  let student = gatherStudentInfo();
  console.log(`学生${student.name}的成绩被添加`);
  return student;
}


function gatherStudentInfo() {
  let readlineSync = require('readline-sync');
  console.log('请输入学生信息（格式：姓名, 学号, 学科: 成绩, ...），按回车提交：');
  let studentInfo = readlineSync.prompt().split(',').map(e => e.trim());
  let student = generateStudent(studentInfo);

  while (!isStudentCorrect(student)) {
    console.log('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
    studentInfo = readlineSync.prompt().split(',').map(e => e.trim());
    student = generateStudent(studentInfo);
  }

  return student;
}

function generateStudent(studentInfo) {
  let Student = require('./student');
  let scores = {};
  studentInfo.slice(2).forEach(e => scores[e.split(':')[0].trim()] = parseFloat(e.split(':')[1].trim()));

  let student = new Student(studentInfo[0], studentInfo[1]);
  student.scores = scores;

  return student;
}

function isStudentCorrect(student) {
  let subjectArray = ['math', 'chinese', 'english', 'programing'];
  if (student.name && student.id && Object.keys(student.scores).every(e => subjectArray.includes(e))) {
    return true;
  }
  return false;
}

function showReport(klass) {
  let inquireIdArr = gatherInquireId();
  let report = generateReport(inquireIdArr, klass);
  console.log(report);
}

function gatherInquireId() {
  let readlineSync = require('readline-sync');
  console.log('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
  let inquireIdArr = readlineSync.prompt().split(',').map(e => e.trim());

  while (!isInquireIdCorrect(inquireIdArr)) {
    console.log('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    inquireIdArr = readlineSync.prompt().split(',').map(e => e.trim());
  }

  return inquireIdArr;
}

function isInquireIdCorrect(inquireIdArr) {
  return inquireIdArr.every(e => e.length > 0);
}

function generateReport(inquireIdArr, klass) {
  let studentScoresReport = generateStudentScoresReport(inquireIdArr, klass);
  let classReport = generateClassReport(klass);

  let report = `成绩单
${studentScoresReport}
========================
${classReport}`;

  return report;
}

function generateStudentScoresReport(inquireIdArr, klass) {
  let inquireStudents = inquireIdArr.map(e => klass.getStudentById(e)).filter(e => e);
  let studentScoresReport = inquireStudents.reduce((acc, cur) => acc + `${cur.name}|${cur.scores.math}|${cur.scores.chinese}|${cur.scores.english}|${cur.scores.programing}|${cur.average}|${cur.sum}
`, '').trim();

  return `姓名|数学|语文|英语|编程|平均分|总分
========================
${studentScoresReport}`;
}

function generateClassReport(klass) {
  return `全班总分平均数：${klass.classAverage}
全班总分中位数：${klass.classMedian}`;
}

