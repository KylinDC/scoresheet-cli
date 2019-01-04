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

