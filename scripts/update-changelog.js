const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 创建命令行交互界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// README文件路径
const readmePath = path.join(__dirname, '..', 'README.md');

// 获取当前日期，格式为：YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// 更新README中的变更日志
const updateChangelog = (changes) => {
  try {
    // 读取README内容
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    // 查找变更日志部分
    const changelogSection = '## 🔄 变更日志';
    const changelogIndex = readmeContent.indexOf(changelogSection);

    if (changelogIndex === -1) {
      console.error('❌ 无法找到变更日志部分。请确保README中包含"## 🔄 变更日志"标题。');
      return;
    }

    // 格式化变更内容
    const today = getCurrentDate();
    const newEntry = `
### ${today} - 更新

${changes.map(change => `- ${change}`).join('\n')}
`;

    // 插入新的变更日志
    const insertIndex = changelogIndex + changelogSection.length;
    readmeContent =
      readmeContent.slice(0, insertIndex) +
      newEntry +
      readmeContent.slice(insertIndex);

    // 写入更新后的内容
    fs.writeFileSync(readmePath, readmeContent, 'utf8');

    console.log('✅ 变更日志已成功更新！');
  } catch (error) {
    console.error('❌ 更新变更日志时出错:', error);
  }
};

// 主函数
const main = () => {
  console.log('📝 请输入本次更新的内容（每行一个，输入空行结束）：');

  const changes = [];

  rl.on('line', (line) => {
    if (line.trim() === '') {
      if (changes.length === 0) {
        console.log('❗ 请至少输入一条更新内容');
        return;
      }

      updateChangelog(changes);
      rl.close();
    } else {
      changes.push(line);
      console.log(`已添加: "${line}"`);
    }
  });
};

// 运行主函数
main();
