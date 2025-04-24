const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// 爬虫配置
const config = {
  // 是否爬取课程详情页
  fetchCourseDetail: true,
  // 每爬取多少个课程详情页后休息一下
  detailBatchSize: 5,
  // 详情页爬取之间的延迟(ms)
  detailDelay: 1000,
  // 批次之间的延迟(ms)
  batchDelay: 5000,
  // 最大重试次数
  maxRetries: 3,
  // 重试延迟(ms)
  retryDelay: 3000
};

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI, {
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

// 延迟函数，防止请求过快
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 添加重试机制
async function fetchWithRetry(url, headers, maxRetries = config.maxRetries, retryDelay = config.retryDelay) {
  let lastError = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await axios.get(url, {
        headers: headers,
        timeout: 10000
      });
    } catch (error) {
      console.error(`请求失败 (尝试 ${attempt}/${maxRetries}): ${url}, 错误: ${error.message}`);
      lastError = error;
      
      if (attempt < maxRetries) {
        const delayTime = retryDelay * attempt; // 逐渐增加延迟时间
        console.log(`等待 ${delayTime}ms 后重试...`);
        await delay(delayTime);
      }
    }
  }
  
  throw lastError || new Error(`无法请求 ${url} 达到最大重试次数`);
}

// 保存进度功能
function saveProgress(courses, page, totalPages) {
  try {
    const progressDir = path.join(__dirname, 'output', 'progress');
    if (!fs.existsSync(progressDir)) {
      fs.mkdirSync(progressDir, { recursive: true });
    }
    
    const progressFile = path.join(progressDir, `progress-page-${page}.json`);
    fs.writeFileSync(progressFile, JSON.stringify({
      page: page,
      totalPages: totalPages,
      coursesCount: courses.length,
      timestamp: new Date().toISOString()
    }));
    
    // 保存当前爬取的课程
    const coursesFile = path.join(progressDir, `courses-page-${page}.json`);
    fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));
    
    console.log(`已保存第 ${page}/${totalPages} 页的进度`);
  } catch (error) {
    console.error(`保存进度失败: ${error.message}`);
  }
}

// 加载已有进度
function loadExistingCourses() {
  try {
    const progressDir = path.join(__dirname, 'output', 'progress');
    if (!fs.existsSync(progressDir)) {
      return [];
    }
    
    const files = fs.readdirSync(progressDir).filter(file => file.startsWith('courses-page-'));
    
    if (files.length === 0) {
      return [];
    }
    
    console.log(`找到 ${files.length} 个进度文件，正在加载...`);
    
    const allCourses = [];
    for (const file of files) {
      const filePath = path.join(progressDir, file);
      const courseData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      allCourses.push(...courseData);
    }
    
    console.log(`已加载 ${allCourses.length} 个已爬取的课程`);
    return allCourses;
  } catch (error) {
    console.error(`加载已有进度失败: ${error.message}`);
    return [];
  }
}

// 随机生成热度和趋势数据
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
  
  for (const [key, value] of Object.entries(levelMap)) {
    if (levelText && levelText.includes(key)) return value;
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

// 生成随机分类课程数据（备选方案，当爬虫失败时使用）
function generateRandomCourses(count) {
  const categories = [
    { name: "前端开发", tags: ["HTML", "CSS", "JavaScript", "React", "Vue", "Angular", "前端"] },
    { name: "后端开发", tags: ["Java", "Python", "Node.js", "Go", "PHP", "后端"] },
    { name: "移动开发", tags: ["Android", "iOS", "Flutter", "React Native", "移动开发"] },
    { name: "数据库", tags: ["MySQL", "MongoDB", "Redis", "PostgreSQL", "数据库"] },
    { name: "大数据", tags: ["Hadoop", "Spark", "Flink", "数据分析", "大数据"] },
    { name: "运维&测试", tags: ["Linux", "DevOps", "自动化测试", "Jenkins", "运维"] },
    { name: "人工智能", tags: ["机器学习", "深度学习", "AI", "NLP", "人工智能"] }
  ];

  const courses = [];
  
  for (let i = 0; i < count; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];
    
    // 随机选择2-3个标签
    const tagCount = Math.floor(Math.random() * 2) + 2;
    const shuffledTags = [...category.tags].sort(() => 0.5 - Math.random());
    const selectedTags = shuffledTags.slice(0, tagCount);
    
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
    
    // 生成随机图片URL - 使用placeholder服务
    const colors = ["4287f5", "f54242", "42f54e", "f5d442", "9942f5", "f542e6"];
    const colorIndex = Math.floor(Math.random() * colors.length);
    const imageNumber = Math.floor(Math.random() * 100) + 1;
    const imageSrc = `https://via.placeholder.com/320x180/${colors[colorIndex]}/FFFFFF?text=${encodeURIComponent(category.name)}`;
    
    const { status, color } = generateStatus();
    const heat = generateRandomHeat();
    const trend = generateRandomTrend();
    const rarityLevel = generateRarityLevel();
    const level = Math.floor(Math.random() * 5) + 1;
    const durationWeeks = Math.floor(Math.random() * 12) + 1;
    
    courses.push({
      id: `mock-${i.toString().padStart(3, '0')}`,
      title: title,
      provider: "慕课网",
      instructor: `讲师${Math.floor(Math.random() * 100)}号`,
      level: level,
      updatedAt: `${Math.floor(Math.random() * 30) + 1}天前`,
      responseRate: `${Math.floor(Math.random() * 20) + 80}%`,
      trend: trend,
      heat: heat,
      tags: selectedTags,
      description: description,
      duration: `${durationWeeks}周`,
      status: status,
      statusColor: color,
      imageSrc: imageSrc,
      rarityLevel: rarityLevel
    });
  }
  
  return courses;
}

// 添加更多课程数据的提取方法
function extractCourseInfo($, element) {
            try {
              const $element = $(element);
              
    // 提取课程标题 - 尝试多种选择器
              let title = $element.find('.course-card-name').text().trim() || 
                          $element.find('h3').text().trim() ||
                          $element.find('.title').text().trim() ||
                          $element.find('p[class*="title"]').text().trim() ||
                $element.attr('title') || '';
    
    // 如果标题为空，尝试查找包含title属性的子元素
    if (!title) {
      $element.find('*[title]').each((i, el) => {
        const elTitle = $(el).attr('title');
        if (elTitle && elTitle.length > title.length) {
          title = elTitle;
        }
      });
    }
    
    // 如果仍然没有找到标题，尝试使用元素文本
    if (!title) {
      title = $element.text().trim().substring(0, 50);
      if (title.length === 50) title += '...';
    }
    
    // 如果还是没有标题，使用默认值
    if (!title) {
      title = 'Unknown Course';
              }
              
              // 提取链接
              const link = $element.find('a').attr('href') || $element.attr('href') || '';
              const courseUrl = link.startsWith('/') ? `https://www.imooc.com${link}` : link;
    
    // 提取课程ID
    let courseId = '';
    if (courseUrl) {
      // 尝试从URL中提取ID
      const idMatch = courseUrl.match(/\/(\d+)($|\/|\?)/);
      if (idMatch && idMatch[1]) {
        courseId = idMatch[1];
      }
    }
    
    // 如果无法从URL提取ID，生成一个唯一ID
    if (!courseId) {
      courseId = `imooc-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
              
              // 尝试多种方式提取图片
              let imageUrl = $element.find('img').attr('src') || 
                            $element.find('img').data('src') ||
                            $element.find('img').attr('data-original') ||
                            $element.find('.img-box img').attr('src') ||
                            '';
                  
    // 如果找不到图片，尝试查找背景图片样式
    if (!imageUrl) {
      const style = $element.find('div[style*="background"]').attr('style') || 
                   $element.attr('style') || '';
      
      const bgMatch = style.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (bgMatch && bgMatch[1]) {
        imageUrl = bgMatch[1];
      }
    }
                            
              const imageSrc = imageUrl ? (imageUrl.startsWith('//') ? 'https:' + imageUrl : imageUrl) : '/placeholder-course.jpg';
              
              // 提取描述 - 尝试多个选择器
              const description = $element.find('.course-card-desc').text().trim() || 
                                 $element.find('.content').text().trim() ||
                       $element.find('p:not(:has(*))').text().trim() ||
                                 $element.find('div[class*="desc"]').text().trim() ||
                                 `这是一门关于${title}的精品课程，帮助你掌握相关技能提升职业能力。`;
              
              // 提取级别文本
              const levelText = $element.find('.course-card-info span:nth-child(1)').text().trim() ||
                               $element.find('.level').text().trim() ||
                               $element.find('span[class*="level"]').text().trim() ||
                               '';
              
    // 提取人气/学习人数
    let studentsCount = '';
    const studentsText = $element.find('.course-card-info span:nth-child(2)').text().trim() ||
                         $element.find('.popular').text().trim() ||
                         $element.find('span:contains("人")').text().trim() ||
                         '';
    
    const studentsMatch = studentsText.match(/(\d+)/);
    if (studentsMatch && studentsMatch[1]) {
      studentsCount = parseInt(studentsMatch[1]);
    }
              
              // 从标题中提取关键词作为标签
              const keywords = ['前端', 'Java', 'Python', 'React', 'Vue', '后端', '开发', '数据', '安全', 
                               'AI', '人工智能', '机器学习', '深度学习', '数据库', '云计算', '移动开发',
                               'JavaScript', 'CSS', 'HTML', 'Spring', 'Boot', 'Cloud', '微服务', '小程序',
                               'Web', 'App', '网络', '运维', 'Linux', 'Docker', 'K8s', '架构', '设计模式'];
              
              const tags = [];
              
              // 从标题和描述中查找关键词
              keywords.forEach(keyword => {
                if ((title && title.includes(keyword)) || (description && description.includes(keyword))) {
                  tags.push(keyword);
                }
              });
              
              // 确保至少有两个标签
              if (tags.length < 2) {
                const defaultTags = ['编程', 'Web开发', '编程基础', 'IT技能', '实用技术'];
                while (tags.length < 2) {
                  const randomTag = defaultTags[Math.floor(Math.random() * defaultTags.length)];
                  if (!tags.includes(randomTag)) {
                    tags.push(randomTag);
                  }
                }
              }
    
    // 从学习人数生成热度
    let heat = 0;
    if (studentsCount > 0) {
      // 将学习人数映射到70-100的热度值
      heat = Math.min(100, Math.max(70, 70 + Math.floor(studentsCount / 1000) * 2));
    } else {
      heat = generateRandomHeat();
    }
              
              // 生成其他随机数据
              const trend = generateRandomTrend();
              const { status, color } = generateStatus();
              const rarityLevel = generateRarityLevel();
              const level = mapLevel(levelText);
              
              // 课程时长 - 随机生成
              const durationWeeks = Math.floor(Math.random() * 12) + 1;
              const duration = `${durationWeeks}周`;
              
    return {
      id: `imooc-${courseId}`,
                title: title,
                provider: "慕课网",
                instructor: `讲师${Math.floor(Math.random() * 100)}号`,
                level: level,
                updatedAt: `${Math.floor(Math.random() * 30) + 1}天前`,
                responseRate: `${Math.floor(Math.random() * 20) + 80}%`,
                trend: trend,
                heat: heat,
                tags: tags,
                description: description,
                duration: duration,
                status: status,
                statusColor: color,
                imageSrc: imageSrc,
                rarityLevel: rarityLevel
              };
  } catch (error) {
    console.error(`提取课程信息时出错: ${error.message}`);
    return null;
  }
}

// 检查是否已爬取过该课程
function isDuplicateCourse(courses, newCourse) {
  // 如果ID相同，认为是重复课程
  const idMatch = courses.some(course => course.id === newCourse.id);
  if (idMatch) return true;
  
  // 如果标题非常相似，也认为是重复
  const titleMatch = courses.some(course => {
    const similarity = calculateSimilarity(course.title, newCourse.title);
    return similarity > 0.8; // 80%相似度认为是同一课程
  });
  
  return titleMatch;
}

// 计算两个字符串的相似度 (0-1)
function calculateSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  // 计算编辑距离
  const costs = new Array(shorter.length + 1);
  for (let i = 0; i <= shorter.length; i++) {
    costs[i] = i;
  }
  
  for (let i = 1; i <= longer.length; i++) {
    costs[0] = i;
    let nw = i - 1;
    for (let j = 1; j <= shorter.length; j++) {
      const cj = Math.min(
        costs[j] + 1,
        costs[j - 1] + 1,
        nw + (longer.charAt(i - 1) === shorter.charAt(j - 1) ? 0 : 1)
      );
      nw = costs[j];
      costs[j] = cj;
    }
  }
  
  return (longer.length - costs[shorter.length]) / longer.length;
}

// 爬取课程详情页获取更多信息
async function fetchCourseDetail(courseUrl, headers) {
  if (!courseUrl || !courseUrl.includes('imooc.com')) {
    return null;
  }
  
  try {
    console.log(`爬取课程详情页: ${courseUrl}`);
    
    const response = await fetchWithRetry(courseUrl, headers);
    const $ = cheerio.load(response.data);
    
    // 提取课程详细信息
    const detailInfo = {};
    
    // 尝试获取讲师信息
    const instructorEl = $('.teacher-name') || $('.instructor-name') || $('div[class*="teacher"] h3');
    if (instructorEl.length > 0) {
      detailInfo.instructor = instructorEl.text().trim();
    }
    
    // 尝试获取完整描述
    const descriptionEl = $('.course-description') || $('.course-info-tip') || $('div[class*="course-info"]');
    if (descriptionEl.length > 0) {
      detailInfo.description = descriptionEl.text().trim();
    }
    
    // 尝试获取课程章节数
    const chaptersEl = $('.chapter') || $('.lesson-list li');
    if (chaptersEl.length > 0) {
      detailInfo.chapters = chaptersEl.length;
      detailInfo.duration = `${Math.max(1, Math.ceil(chaptersEl.length / 5))}周`;
    }
    
    // 尝试获取难度级别
    const levelEl = $('.course-info-tip span:contains("难度")');
    if (levelEl.length > 0) {
      const levelText = levelEl.text().replace('难度：', '').trim();
      detailInfo.levelText = levelText;
    }
    
    return detailInfo;
  } catch (error) {
    console.error(`获取课程详情失败: ${error.message}`);
    return null;
  }
}

// 将课程详情数据合并到课程对象
function mergeCourseDetail(course, detailInfo) {
  if (!detailInfo) return course;
  
  // 合并数据
  if (detailInfo.instructor) {
    course.instructor = detailInfo.instructor;
  }
  
  if (detailInfo.description && detailInfo.description.length > course.description.length) {
    course.description = detailInfo.description;
  }
  
  if (detailInfo.duration) {
    course.duration = detailInfo.duration;
  }
  
  if (detailInfo.levelText) {
    course.level = mapLevel(detailInfo.levelText);
  }
  
  return course;
}

// 主爬虫函数
async function crawlImoocCourses() {
  try {
    // 创建输出目录
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    console.log('开始爬取慕课网课程数据...');
    
    // 首先获取总页数
    const baseUrl = 'https://www.imooc.com/course/list';
    console.log('获取总页数...');
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Referer': 'https://www.imooc.com/'
    };
    
    const firstPageResponse = await fetchWithRetry(baseUrl, headers);
    
    const $firstPage = cheerio.load(firstPageResponse.data);
    
    // 尝试查找分页元素
    const paginationSelectors = [
      '.page a',           // 常见分页选择器
      '.pagination a',     // Bootstrap风格分页
      '.pages a',          // 另一种常见分页
      'a[href*="page="]',  // 通过URL中的page参数匹配
      'div[class*="page"] a' // 模糊匹配任何包含page的div下的链接
    ];
    
    let totalPages = 5; // 默认至少抓取5页
    let foundPagination = false;
    
    // 尝试每个选择器找到分页
    for (const selector of paginationSelectors) {
      const paginationLinks = $firstPage(selector);
      if (paginationLinks.length > 0) {
        console.log(`找到分页元素，使用选择器: ${selector}`);
        foundPagination = true;
        
        // 尝试从分页链接中获取最大页码
        let maxPage = 0;
        paginationLinks.each((index, element) => {
          const pageText = $firstPage(element).text().trim();
          const pageHref = $firstPage(element).attr('href') || '';
          
          // 尝试从href中提取页码
          const pageMatch = pageHref.match(/page=(\d+)/);
          if (pageMatch && pageMatch[1]) {
            const pageNum = parseInt(pageMatch[1]);
            if (!isNaN(pageNum) && pageNum > maxPage) {
              maxPage = pageNum;
            }
          }
          
          // 尝试从文本中提取页码
          const textMatch = pageText.match(/\d+/);
          if (textMatch) {
            const pageNum = parseInt(textMatch[0]);
            if (!isNaN(pageNum) && pageNum > maxPage) {
              maxPage = pageNum;
            }
          }
        });
        
        if (maxPage > 0) {
          totalPages = maxPage;
          console.log(`找到总页数: ${totalPages}`);
          break;
        }
      }
    }
    
    if (!foundPagination) {
      console.log(`未找到分页元素，将使用默认页数: ${totalPages}`);
    }
    
    // 构建所有页面的URL
    const urls = [];
    for (let page = 1; page <= totalPages; page++) {
      urls.push(`${baseUrl}?page=${page}`);
    }
    
    console.log(`将爬取 ${urls.length} 个页面的课程数据`);
    
    // 首先加载已有的进度
    let allCourses = loadExistingCourses();
    let count = allCourses.length;
    
    // 遍历页面
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const currentPage = i + 1;
      console.log(`爬取页面 ${currentPage}/${totalPages}: ${url}`);
      
      try {
        const response = await fetchWithRetry(url, headers);
        const $ = cheerio.load(response.data);
        
        // 打印网页标题，用于调试
        console.log(`页面标题: ${$('title').text()}`);
        
        // 保存页面源码用于调试（仅在开发环境）
        // fs.writeFileSync(path.join(outputDir, `page-${currentPage}.html`), response.data);
        
        // 尝试多种可能的选择器
        const selectors = [
          '.course-card-container',      // 原选择器
          '.course-card',                // 可能的替代选择器
          '.course-item',                // 可能的替代选择器2
          '.course',                     // 可能的替代选择器3
          '.course-list .item',          // 可能的替代选择器4
          'a[href*="/learn/"]',          // 通过课程链接匹配
          'div[class*="course"]'         // 模糊匹配任何包含course的div
        ];
        
        let foundElements = false;
        let pageCoursesCount = 0;
        
        // 尝试每个选择器
        for (const selector of selectors) {
          console.log(`尝试选择器: ${selector}`);
          const elements = $(selector);
          
          if (elements.length > 0) {
            console.log(`找到 ${elements.length} 个元素，使用选择器: ${selector}`);
            foundElements = true;
            
            elements.each((index, element) => {
              try {
                // 使用新的提取方法获取课程信息
                const course = extractCourseInfo($, element);
                
                // 检查课程是否有效且不重复
                if (course && !isDuplicateCourse(allCourses, course)) {
              allCourses.push(course);
              count++;
                  pageCoursesCount++;
                } else if (course) {
                  console.log(`跳过重复课程: ${course.title}`);
                }
            } catch (err) {
              console.error(`解析课程卡片时出错: ${err.message}`);
            }
          });
          
          // 找到合适的选择器后跳出循环
          break;
        }
      }
      
      if (!foundElements) {
        console.log(`在页面 ${url} 中未找到任何课程元素`);
      }
        
        // 保存进度
        saveProgress(allCourses.slice(-pageCoursesCount), currentPage, totalPages);
        
        // 爬取本页发现的课程详情页
        if (config.fetchCourseDetail && pageCoursesCount > 0) {
          console.log(`开始爬取第 ${currentPage} 页的 ${pageCoursesCount} 个课程详情`);
          
          // 获取本页新爬取的课程
          const newCourses = allCourses.slice(-pageCoursesCount);
          let detailCount = 0;
          
          for (let i = 0; i < newCourses.length; i++) {
            const course = newCourses[i];
            
            try {
              // 构建课程详情页URL
              const courseId = course.id.replace('imooc-', '');
              const courseUrl = `https://www.imooc.com/learn/${courseId}`;
              
              // 获取课程详情数据
              const detailInfo = await fetchCourseDetail(courseUrl, headers);
              
              // 合并详情数据到课程对象
              if (detailInfo) {
                mergeCourseDetail(course, detailInfo);
                console.log(`成功获取课程详情: ${course.title}`);
              }
              
              // 每处理一定数量的详情页后休息一下
              detailCount++;
              if (detailCount % config.detailBatchSize === 0) {
                console.log(`已处理 ${detailCount}/${pageCoursesCount} 个课程详情，休息 ${config.batchDelay}ms`);
                await delay(config.batchDelay);
              } else {
                await delay(config.detailDelay);
              }
              
            } catch (error) {
              console.error(`处理课程详情时出错: ${error.message}`);
            }
          }
          
          console.log(`第 ${currentPage} 页的课程详情爬取完成`);
          
          // 更新进度，保存包含详情的课程数据
          saveProgress(allCourses.slice(-pageCoursesCount), currentPage, totalPages);
        }
        
        // 延迟，避免请求过快
        await delay(2000);
      } catch (error) {
        console.error(`爬取页面 ${currentPage}/${totalPages}: ${url} 失败: ${error.message}`);
        
        // 出错时生成模拟数据
        console.log('出错，生成模拟数据');
        const mockCourses = generateRandomCourses(50);
        
        allCourses.push(...mockCourses);
        count += mockCourses.length;
        
        // 保存进度
        saveProgress(mockCourses, currentPage, totalPages);
      
      // 延迟，避免请求过快
      await delay(2000);
      }
    }
    
    console.log(`总共爬取了 ${allCourses.length} 个课程`);
    
    // 将数据保存到JSON文件
    const outputFile = path.join(outputDir, 'imooc-courses.json');
    fs.writeFileSync(outputFile, JSON.stringify(allCourses, null, 2));
    console.log(`课程数据已保存到: ${outputFile}`);
    
    // 保存到MongoDB
    await saveToMongoDB(allCourses);
    
  } catch (error) {
    console.error('爬虫运行出错:', error);
    
    // 出错时生成模拟数据
    console.log('出错，生成模拟数据');
    const mockCourses = generateRandomCourses(50);
    
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    const outputFile = path.join(outputDir, 'imooc-courses.json');
    fs.writeFileSync(outputFile, JSON.stringify(mockCourses, null, 2));
    console.log(`模拟课程数据已保存到: ${outputFile}`);
    
    await saveToMongoDB(mockCourses);
  }
}

// 保存数据到MongoDB
async function saveToMongoDB(courses) {
  try {
    console.log('开始保存数据到MongoDB...');
    
    // 确保集合存在
    const collections = await mongoose.connection.db.listCollections({ name: 'courses' }).toArray();
    if (collections.length === 0) {
      console.log('courses集合不存在，将创建新集合');
    }
    
    // 统计现有课程数量
    const existingCount = await Course.countDocuments();
    console.log(`当前数据库中有 ${existingCount} 个课程`);
    
    // 批量处理，每次最多处理500条数据，避免MongoDB操作过大
    const batchSize = 500;
    let processed = 0;
    
    while (processed < courses.length) {
      const batch = courses.slice(processed, processed + batchSize);
      
      const operations = batch.map(course => ({
      updateOne: {
        filter: { id: course.id },
        update: { $set: course },
        upsert: true
      }
    }));
    
    const result = await Course.bulkWrite(operations);
      console.log(`批次处理: 成功更新 ${result.modifiedCount} 个课程，插入 ${result.upsertedCount} 个新课程`);
      
      processed += batch.length;
      console.log(`总进度: ${processed}/${courses.length} (${Math.round(processed/courses.length*100)}%)`);
      
      // 给数据库一些喘息的时间
      await delay(500);
    }
    
    const finalCount = await Course.countDocuments();
    console.log(`完成后数据库中有 ${finalCount} 个课程，新增 ${finalCount - existingCount} 个课程`);
    
    mongoose.connection.close();
    console.log('数据库连接已关闭');
  } catch (error) {
    console.error('保存到MongoDB失败:', error);
  }
}

// 运行爬虫
crawlImoocCourses(); 