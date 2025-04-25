require('dotenv').config({ path: '.env.local' });
console.log('环境测试脚本');
console.log('当前工作目录:', process.cwd());
console.log('MongoDB URI:', process.env.MONGODB_URI ? '已设置' : '未设置');
console.log('NODE_ENV:', process.env.NODE_ENV);

// 测试文件系统访问
const fs = require('fs');
const path = require('path');

try {
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('已创建输出目录:', outputDir);
  } else {
    console.log('输出目录已存在:', outputDir);
  }
  
  // 写入测试文件
  const testFile = path.join(outputDir, 'test.txt');
  fs.writeFileSync(testFile, `测试文件写入 ${new Date().toISOString()}`);
  console.log('成功写入测试文件:', testFile);
} catch (error) {
  console.error('文件操作失败:', error.message);
}

// 尝试连接MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log('成功连接到MongoDB');
    console.log('数据库连接测试完成');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('连接MongoDB失败:', err);
  }); 