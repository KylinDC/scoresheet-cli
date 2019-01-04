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
