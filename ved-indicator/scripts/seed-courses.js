const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
  .then(() => console.log('成功连接到MongoDB'))
  .catch(err => {
    console.error('连接MongoDB失败:', err);
    process.exit(1);
  });

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

// 示例课程数据
const coursesData = [
  {
    id: "course-001",
    title: "Web开发基础",
    provider: "前端学院",
    instructor: "张老师",
    level: 1,
    updatedAt: "2023-04-15",
    responseRate: "98%",
    trend: "上升",
    heat: 95,
    tags: ["HTML", "CSS", "JavaScript"],
    description: "这门课程将教授Web开发的基础知识，包括HTML、CSS和JavaScript的基本概念和应用。",
    duration: "8周",
    status: "进行中",
    statusColor: "green",
    imageSrc: "/course-images/web-dev.jpg",
    rarityLevel: "普通"
  },
  {
    id: "course-002",
    title: "人工智能入门",
    provider: "AI学习中心",
    instructor: "李教授",
    level: 2,
    updatedAt: "2023-03-20",
    responseRate: "95%",
    trend: "稳定",
    heat: 88,
    tags: ["AI", "机器学习", "Python"],
    description: "本课程介绍人工智能的基本概念、历史发展和当前应用，以及机器学习的基础算法和Python实现。",
    duration: "12周",
    status: "即将开始",
    statusColor: "blue",
    imageSrc: "/course-images/ai-intro.jpg",
    rarityLevel: "稀有"
  },
  {
    id: "course-003",
    title: "数据可视化技术",
    provider: "数据科学学院",
    instructor: "王博士",
    level: 3,
    updatedAt: "2023-05-10",
    responseRate: "92%",
    trend: "上升",
    heat: 85,
    tags: ["数据分析", "D3.js", "可视化"],
    description: "学习如何使用现代工具和库（如D3.js）创建交互式数据可视化，展示和分析复杂数据集。",
    duration: "10周",
    status: "已结束",
    statusColor: "gray",
    imageSrc: "/course-images/data-viz.jpg",
    rarityLevel: "史诗"
  }
];

async function seedDatabase() {
  try {
    // 清空现有数据
    await Course.deleteMany({});
    console.log('已清空现有课程数据');
    
    // 插入新数据
    const result = await Course.insertMany(coursesData);
    console.log(`成功插入 ${result.length} 个课程`);
    
    mongoose.connection.close();
    console.log('数据库连接已关闭');
  } catch (error) {
    console.error('数据导入失败:', error);
  }
}

seedDatabase();