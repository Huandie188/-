/**
 * 简化版MOOC平台爬虫
 * 针对目前可访问的MOOC平台进行爬取
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// 爬虫配置
const config = {
  outputDir: path.join(__dirname, 'output', 'courses'),
  progressDir: path.join(__dirname, 'output', 'progress'),
  // 最大爬取课程数
  maxCourses: 100,
  // 请求延迟(ms)
  requestDelay: 1000,
  // 最大重试次数
  maxRetries: 3,
  // 重试延迟(ms)
  retryDelay: 2000
};

// 确保输出目录存在
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

if (!fs.existsSync(config.progressDir)) {
  fs.mkdirSync(config.progressDir, { recursive: true });
}

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
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

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 生成随机热度和趋势数据
const generateRandomHeat = () => Math.floor(Math.random() * 30) + 70; // 70-100之间
const generateRandomTrend = () => `+${Math.floor(Math.random() * 60) + 20}%`; // +20%-+80%之间

// 随机选择稀有度
const generateRarityLevel = () => {
  const levels = ["普通", "稀有", "史诗", "传说"];
  const weights = [0.6, 0.25, 0.1, 0.05]; // 权重总和为1
  
  const rand = Math.random();
  let sum = 0;
  
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (rand < sum) return levels[i];
  }
  
  return levels[0]; // 默认返回普通
};

// 处理级别映射
const mapLevel = (levelText) => {
  const levelMap = {
    "入门": 1,
    "初级": 2,
    "中级": 3,
    "高级": 4,
    "专家": 5
  };
  
  if (!levelText) return 2; // 默认为初级
  
  for (const [key, value] of Object.entries(levelMap)) {
    if (levelText.includes(key)) return value;
  }
  
  return 2; // 默认为初级
};

// 生成状态和对应颜色
const generateStatus = () => {
  const statuses = [
    { status: "进行中", color: "green" },
    { status: "即将开始", color: "blue" },
    { status: "已结束", color: "gray" },
    { status: "热门", color: "red" },
    { status: "最新认证", color: "purple" }
  ];
  
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

// ====================== Coursera API 爬虫 ======================
async function crawlCourseraAPI() {
  console.log('开始从Coursera API获取课程数据...');
  
  // Coursera API的课程搜索接口
  const apiUrl = 'https://www.coursera.org/api/catalogResults.v2';
  const allCourses = [];
  
  try {
    // 获取前3页，每页20条课程数据
    for (let page = 1; page <= 3; page++) {
      console.log(`正在获取第 ${page} 页课程数据...`);
      
      const params = {
        q: 'search',
        query: '',
        limit: 20,
        start: (page - 1) * 20,
        filter: 'languages:zh', // 中文课程过滤器
        sort: 'relevance'
      };
      
      // 构建查询参数
      const queryParams = new URLSearchParams(params).toString();
      
      const response = await axios.get(`${apiUrl}?${queryParams}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
        }
      });
      
      if (!response.data || !response.data.elements) {
        console.log('API返回的数据格式不符合预期');
        continue;
      }
      
      const courses = response.data.elements || [];
      
      for (const courseData of courses) {
        if (!courseData.id || !courseData.name) continue;
        
        // 初始课程数据
        const courseId = `coursera-${courseData.id}`;
        
        // 生成状态
        const { status, color } = generateStatus();
        
        // 构建课程对象
        const course = {
          id: courseId,
          title: courseData.name || 'Coursera课程',
          provider: 'Coursera',
          instructor: courseData.instructors?.[0]?.name || '未知讲师',
          level: mapLevel(courseData.level),
          updatedAt: courseData.lastUpdatedAt || `${Math.floor(Math.random() * 30) + 1}天前`,
          responseRate: `${Math.floor(Math.random() * 10) + 90}%`,
          trend: generateRandomTrend(),
          heat: generateRandomHeat(),
          tags: courseData.subjects || courseData.topics || ['在线教育', 'MOOC'],
          description: courseData.description || '暂无课程简介',
          duration: courseData.weeks ? `${courseData.weeks}周` : `${Math.floor(Math.random() * 10) + 2}周`,
          status: status,
          statusColor: color,
          imageSrc: courseData.photoUrl || 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~COURSE!~ml-foundations/XDP~COURSE!~ml-foundations-1920x1080.jpeg',
          rarityLevel: generateRarityLevel()
        };
        
        allCourses.push(course);
        
        if (allCourses.length >= config.maxCourses) {
          console.log(`已达到最大爬取数量 ${config.maxCourses}`);
          break;
        }
      }
      
      if (allCourses.length >= config.maxCourses) {
        break;
      }
      
      // 每页请求之间添加延迟
      await delay(config.requestDelay);
    }
    
    console.log(`从Coursera获取了 ${allCourses.length} 个课程`);
    return allCourses;
    
  } catch (error) {
    console.error(`获取Coursera课程失败: ${error.message}`);
    return [];
  }
}

// ====================== edX API 爬虫 ======================
async function crawlEdXAPI() {
  console.log('开始从edX API获取课程数据...');
  
  // edX API的课程搜索接口
  const apiUrl = 'https://www.edx.org/api/catalog/v2/search';
  const allCourses = [];
  
  try {
    // 获取前3页，每页20条课程数据
    for (let page = 1; page <= 3; page++) {
      console.log(`正在获取第 ${page} 页课程数据...`);
      
      const payload = {
        page: page,
        page_size: 20,
        facets: {
          language: ["zh-cn", "zh-tw"], // 中文课程
          availability: ["Available Now"]
        },
        query: ""
      };
      
      const response = await axios.post(apiUrl, payload, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.data || !response.data.results) {
        console.log('API返回的数据格式不符合预期');
        continue;
      }
      
      const courses = response.data.results || [];
      
      for (const courseData of courses) {
        if (!courseData.courseID || !courseData.title) continue;
        
        // 初始课程数据
        const courseId = `edx-${courseData.courseID}`;
        
        // 生成状态
        const { status, color } = generateStatus();
        
        // 标签提取
        const tags = [];
        if (courseData.subjects) tags.push(...courseData.subjects);
        if (courseData.skills) tags.push(...courseData.skills);
        if (tags.length === 0) tags.push('在线教育', 'MOOC');
        
        // 构建课程对象
        const course = {
          id: courseId,
          title: courseData.title || 'edX课程',
          provider: courseData.partners?.[0]?.name || 'edX',
          instructor: courseData.instructors?.[0] || '未知讲师',
          level: mapLevel(courseData.level),
          updatedAt: `${Math.floor(Math.random() * 30) + 1}天前`,
          responseRate: `${Math.floor(Math.random() * 10) + 90}%`,
          trend: generateRandomTrend(),
          heat: generateRandomHeat(),
          tags: tags,
          description: courseData.description || '暂无课程简介',
          duration: courseData.length ? `${courseData.length}` : `${Math.floor(Math.random() * 10) + 2}周`,
          status: status,
          statusColor: color,
          imageSrc: courseData.image?.src || 'https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png',
          rarityLevel: generateRarityLevel()
        };
        
        allCourses.push(course);
        
        if (allCourses.length >= config.maxCourses) {
          console.log(`已达到最大爬取数量 ${config.maxCourses}`);
          break;
        }
      }
      
      if (allCourses.length >= config.maxCourses) {
        break;
      }
      
      // 每页请求之间添加延迟
      await delay(config.requestDelay);
    }
    
    console.log(`从edX获取了 ${allCourses.length} 个课程`);
    return allCourses;
    
  } catch (error) {
    console.error(`获取edX课程失败: ${error.message}`);
    return [];
  }
}

// ====================== Udemy API 爬虫 ======================
async function crawlUdemyAPI() {
  console.log('开始从Udemy API获取课程数据...');
  
  // Udemy API的课程搜索接口
  const apiUrl = 'https://www.udemy.com/api-2.0/courses/';
  const allCourses = [];
  
  try {
    // 获取前3页，每页20条课程数据
    for (let page = 1; page <= 3; page++) {
      console.log(`正在获取第 ${page} 页课程数据...`);
      
      const params = {
        page: page,
        page_size: 20,
        language: 'zh',
        ordering: 'relevance',
        'fields[course]': 'title,headline,url,image_480x270,visible_instructors,content_info'
      };
      
      // 构建查询参数
      const queryParams = new URLSearchParams(params).toString();
      
      const response = await axios.get(`${apiUrl}?${queryParams}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
        }
      });
      
      if (!response.data || !response.data.results) {
        console.log('API返回的数据格式不符合预期');
        continue;
      }
      
      const courses = response.data.results || [];
      
      for (const courseData of courses) {
        if (!courseData.id || !courseData.title) continue;
        
        // 初始课程数据
        const courseId = `udemy-${courseData.id}`;
        
        // 生成状态
        const { status, color } = generateStatus();
        
        // 讲师处理
        let instructor = '未知讲师';
        if (courseData.visible_instructors && courseData.visible_instructors.length > 0) {
          instructor = courseData.visible_instructors[0].title || courseData.visible_instructors[0].display_name || '未知讲师';
        }
        
        // 随机生成标签
        const randomTags = [
          '编程开发', '数据科学', 'Web开发', '移动开发', 'IT认证',
          '人工智能', '机器学习', '云计算', '网络安全', '区块链',
          '办公软件', '设计', '摄影', '音乐', '营销', '领导力'
        ];
        
        // 随机选择2-4个标签
        const tagCount = Math.floor(Math.random() * 3) + 2; // 2-4个标签
        const shuffledTags = [...randomTags].sort(() => 0.5 - Math.random());
        const selectedTags = shuffledTags.slice(0, tagCount);
        
        // 构建课程对象
        const course = {
          id: courseId,
          title: courseData.title || 'Udemy课程',
          provider: 'Udemy',
          instructor: instructor,
          level: Math.floor(Math.random() * 3) + 1, // 随机难度1-3
          updatedAt: `${Math.floor(Math.random() * 30) + 1}天前`,
          responseRate: `${Math.floor(Math.random() * 10) + 90}%`,
          trend: generateRandomTrend(),
          heat: generateRandomHeat(),
          tags: selectedTags,
          description: courseData.headline || '暂无课程简介',
          duration: courseData.content_info ? courseData.content_info : `${Math.floor(Math.random() * 10) + 2}周`,
          status: status,
          statusColor: color,
          imageSrc: courseData.image_480x270 || 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
          rarityLevel: generateRarityLevel()
        };
        
        allCourses.push(course);
        
        if (allCourses.length >= config.maxCourses) {
          console.log(`已达到最大爬取数量 ${config.maxCourses}`);
          break;
        }
      }
      
      if (allCourses.length >= config.maxCourses) {
        break;
      }
      
      // 每页请求之间添加延迟
      await delay(config.requestDelay);
    }
    
    console.log(`从Udemy获取了 ${allCourses.length} 个课程`);
    return allCourses;
    
  } catch (error) {
    console.error(`获取Udemy课程失败: ${error.message}`);
    return [];
  }
}

// ====================== MongoDB存储 ======================
async function saveToMongoDB(courses) {
  if (!courses || courses.length === 0) {
    console.log('没有课程需要保存');
    return;
  }
  
  console.log(`正在将 ${courses.length} 个课程保存到MongoDB...`);
  
  try {
    let successCount = 0;
    let errorCount = 0;
    let duplicateCount = 0;
    
    // 批量处理，每批100个
    const batchSize = 100;
    
    for (let i = 0; i < courses.length; i += batchSize) {
      const batch = courses.slice(i, i + batchSize);
      console.log(`处理批次 ${Math.floor(i / batchSize) + 1}/${Math.ceil(courses.length / batchSize)}`);
      
      const operations = batch.map(course => ({
        updateOne: {
          filter: { id: course.id },
          update: { $set: course },
          upsert: true
        }
      }));
      
      try {
        const result = await Course.bulkWrite(operations);
        
        successCount += result.upsertedCount + result.modifiedCount;
        duplicateCount += batch.length - (result.upsertedCount + result.modifiedCount);
        
        console.log(`批次结果: 成功=${result.upsertedCount + result.modifiedCount}, 重复=${batch.length - (result.upsertedCount + result.modifiedCount)}`);
      } catch (error) {
        console.error(`批次处理失败: ${error.message}`);
        errorCount += batch.length;
      }
    }
    
    console.log(`MongoDB保存完成: 成功=${successCount}, 重复=${duplicateCount}, 失败=${errorCount}`);
    return { success: successCount, duplicate: duplicateCount, error: errorCount };
  } catch (error) {
    console.error(`保存到MongoDB失败: ${error.message}`);
    throw error;
  }
}

// ====================== 生成随机MOOC平台课程 ======================
function generateRandomMOOCCourses(count = 50) {
  console.log(`正在生成 ${count} 个随机MOOC课程...`);
  
  const platforms = [
    { name: "慕课网", id_prefix: "imooc" },
    { name: "中国大学MOOC", id_prefix: "icourse" },
    { name: "学堂在线", id_prefix: "xuetangx" },
    { name: "网易云课堂", id_prefix: "study163" },
    { name: "腾讯课堂", id_prefix: "ke" },
    { name: "CSDN学院", id_prefix: "csdn" },
    { name: "极客时间", id_prefix: "geek" }
  ];
  
  const categories = [
    { name: "前端开发", tags: ["HTML", "CSS", "JavaScript", "React", "Vue", "Angular", "前端"] },
    { name: "后端开发", tags: ["Java", "Python", "Node.js", "Go", "PHP", "后端"] },
    { name: "移动开发", tags: ["Android", "iOS", "Flutter", "React Native", "移动开发"] },
    { name: "数据库", tags: ["MySQL", "MongoDB", "Redis", "PostgreSQL", "数据库"] },
    { name: "大数据", tags: ["Hadoop", "Spark", "Flink", "数据分析", "大数据"] },
    { name: "运维&测试", tags: ["Linux", "DevOps", "自动化测试", "Jenkins", "运维"] },
    { name: "人工智能", tags: ["机器学习", "深度学习", "AI", "NLP", "人工智能"] },
    { name: "前沿技术", tags: ["区块链", "IoT", "元宇宙", "Web3", "量子计算"] },
    { name: "云计算", tags: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"] },
    { name: "网络安全", tags: ["安全", "渗透测试", "加密", "防火墙", "安全架构"] }
  ];
  
  const instructors = [
    "张老师", "李教授", "王博士", "刘讲师", "陈老师", 
    "林教授", "黄博士", "赵讲师", "吴老师", "周教授"
  ];
  
  const randomImageUrls = [
    "https://img1.sycdn.imooc.com/5fe442ed000130f405400304.jpg",
    "https://img1.sycdn.imooc.com/5fe442e80001d54805400304.jpg",
    "https://img3.sycdn.imooc.com/5fe442390001b56a05400304.jpg",
    "https://img2.sycdn.imooc.com/5fe4421b0001acb605400304.jpg",
    "https://img3.sycdn.imooc.com/5fe442cf00012e1305400304.jpg",
    "https://edu-image.nosdn.127.net/32a8dd2a-b9aa-4ec9-abd5-66cd8e35ce5b.png",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~COURSE!~ml-foundations/XDP~COURSE!~ml-foundations-1920x1080.jpeg",
    "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
    "https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg"
  ];
  
  const courses = [];
  
  for (let i = 0; i < count; i++) {
    // 随机选择平台
    const platformIndex = Math.floor(Math.random() * platforms.length);
    const platform = platforms[platformIndex];
    
    // 随机选择分类
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];
    
    // 随机选择2-3个标签
    const tagCount = Math.floor(Math.random() * 2) + 2;
    const shuffledTags = [...category.tags].sort(() => 0.5 - Math.random());
    const selectedTags = shuffledTags.slice(0, tagCount);
    
    // 随机选择讲师
    const instructorIndex = Math.floor(Math.random() * instructors.length);
    const instructor = instructors[instructorIndex];
    
    // 随机选择图片
    const imageIndex = Math.floor(Math.random() * randomImageUrls.length);
    const imageSrc = randomImageUrls[imageIndex];
    
    // 生成课程标题
    const titles = [
      `${category.name}实战课程`,
      `${selectedTags[0]}入门到精通`,
      `${selectedTags[0]}与${selectedTags[1]}高级教程`,
      `从零开始学${selectedTags[0]}`,
      `${category.name}必备技能训练营`,
      `${selectedTags[0]}实战项目开发`,
      `企业级${category.name}架构设计`
    ];
    
    const titleIndex = Math.floor(Math.random() * titles.length);
    const title = titles[titleIndex];
    
    // 生成课程描述
    const descriptions = [
      `本课程全面讲解${category.name}领域的核心技术和实践方法，帮助学习者快速掌握${selectedTags.join("、")}等关键技能。`,
      `从基础概念到高级应用，深入浅出地讲解${selectedTags.join("、")}技术，适合想要进阶${category.name}领域的学习者。`,
      `这是一门侧重实战的${category.name}课程，通过真实项目案例，学习${selectedTags.join("、")}等技术的实际应用。`,
      `由资深${category.name}专家讲授，内容涵盖${selectedTags.join("、")}等核心技术，助您成为行业专家。`,
      `专为${category.name}初学者设计的入门课程，循序渐进地介绍${selectedTags.join("、")}基础知识和应用场景。`
    ];
    
    const descIndex = Math.floor(Math.random() * descriptions.length);
    const description = descriptions[descIndex];
    
    // 生成课程状态
    const { status, color } = generateStatus();
    
    // 随机课程ID
    const id = `${platform.id_prefix}-${Math.floor(Math.random() * 10000) + 1}`;
    
    // 构建课程对象
    courses.push({
      id: id,
      title: title,
      provider: platform.name,
      instructor: instructor,
      level: Math.floor(Math.random() * 5) + 1, // 1-5级难度
      updatedAt: `${Math.floor(Math.random() * 30) + 1}天前`,
      responseRate: `${Math.floor(Math.random() * 15) + 85}%`,
      trend: generateRandomTrend(),
      heat: generateRandomHeat(),
      tags: selectedTags,
      description: description,
      duration: `${Math.floor(Math.random() * 12) + 4}周`,
      status: status,
      statusColor: color,
      imageSrc: imageSrc,
      rarityLevel: generateRarityLevel()
    });
  }
  
  console.log(`成功生成 ${courses.length} 个随机MOOC课程`);
  return courses;
}

// 主函数：爬取所有平台的课程
async function crawlAllPlatforms() {
  try {
    console.log('=== 开始多平台课程爬取 ===');
    
    let allCourses = [];
    
    // 尝试爬取Coursera
    try {
      const courseraResults = await crawlCourseraAPI();
      allCourses = [...allCourses, ...courseraResults];
    } catch (err) {
      console.error('爬取Coursera失败:', err.message);
    }
    
    // 尝试爬取edX
    try {
      const edxResults = await crawlEdXAPI();
      allCourses = [...allCourses, ...edxResults];
    } catch (err) {
      console.error('爬取edX失败:', err.message);
    }
    
    // 尝试爬取Udemy
    try {
      const udemyResults = await crawlUdemyAPI();
      allCourses = [...allCourses, ...udemyResults];
    } catch (err) {
      console.error('爬取Udemy失败:', err.message);
    }
    
    // 如果爬取的课程太少，生成一些随机MOOC课程补充
    if (allCourses.length < 50) {
      console.log('从API获取的课程不足，生成随机课程数据补充');
      const randomCourses = generateRandomMOOCCourses(100 - allCourses.length);
      allCourses = [...allCourses, ...randomCourses];
    }
    
    console.log(`共获取 ${allCourses.length} 个课程`);
    
    // 保存最终结果
    const outputFile = path.join(config.outputDir, `all-courses-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(allCourses, null, 2));
    console.log(`课程数据已保存到文件: ${outputFile}`);
    
    // 保存到MongoDB
    await saveToMongoDB(allCourses);
    
    console.log('=== 多平台课程爬取完成 ===');
  } catch (error) {
    console.error(`爬取过程中出错: ${error.message}`);
  } finally {
    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('数据库连接已关闭');
  }
}

// 如果直接运行此脚本，执行爬取
if (require.main === module) {
  crawlAllPlatforms()
    .then(() => {
      console.log('爬虫任务完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('爬虫任务失败:', error);
      process.exit(1);
    });
}

module.exports = {
  crawlCourseraAPI,
  crawlEdXAPI,
  crawlUdemyAPI,
  generateRandomMOOCCourses,
  crawlAllPlatforms,
  saveToMongoDB
}; 