const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// 定义课程模型
const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  provider: { type: String, required: true },
  instructor: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  updatedAt: { type: String, required: true },
  responseRate: { type: String, required: true },
  trend: { type: String, required: true },
  heat: { type: Number, required: true },
  tags: { type: [String], required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  status: { type: String, required: true },
  statusColor: { type: String, required: true },
  imageSrc: { type: String, required: true },
  rarityLevel: { type: String, required: true }
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

async function listCourses() {
  try {
    // 连接到MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('成功连接到MongoDB');
    
    // 获取所有课程
    const courses = await Course.find({}).lean();
    
    // 打印课程ID和标题
    console.log(`共找到 ${courses.length} 个课程:\n`);
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ID: ${course.id}`);
      console.log(`   标题: ${course.title}`);
      console.log(`   提供方: ${course.provider}`);
      console.log(`   难度: ${course.level}`);
      console.log(`   标签: ${course.tags.join(', ')}`);
      console.log('-'.repeat(50));
    });
    
    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('数据库连接已关闭');
  } catch (error) {
    console.error('获取课程失败:', error);
  }
}

// 运行函数
listCourses(); 