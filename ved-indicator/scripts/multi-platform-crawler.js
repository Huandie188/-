const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
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
  retryDelay: 3000,
  // 结果输出目录
  outputDir: path.join(__dirname, 'output', 'courses'),
  // 进度保存目录
  progressDir: path.join(__dirname, 'output', 'progress'),
  // 最大爬取页数限制(每个平台)
  maxPages: 10
};

// 确保输出目录存在
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

if (!fs.existsSync(config.progressDir)) {
  fs.mkdirSync(config.progressDir, { recursive: true });
}

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
async function fetchWithRetry(url, headers, options = {}, maxRetries = config.maxRetries, retryDelay = config.retryDelay) {
  let lastError = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await axios.get(url, {
        headers: headers,
        timeout: 15000,
        ...options
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
function saveProgress(platform, courses, page, totalPages) {
  try {
    const progressFile = path.join(config.progressDir, `progress-${platform}-page-${page}.json`);
    fs.writeFileSync(progressFile, JSON.stringify({
      platform,
      page: page,
      totalPages: totalPages,
      coursesCount: courses.length,
      timestamp: new Date().toISOString()
    }));
    
    // 保存当前爬取的课程
    const coursesFile = path.join(config.progressDir, `courses-${platform}-page-${page}.json`);
    fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));
    
    console.log(`已保存${platform}第 ${page}/${totalPages} 页的进度`);
  } catch (error) {
    console.error(`保存进度失败: ${error.message}`);
  }
}

// 加载已有进度
function loadExistingCourses(platform) {
  try {
    if (!fs.existsSync(config.progressDir)) {
      return [];
    }
    
    const files = fs.readdirSync(config.progressDir).filter(file => file.startsWith(`courses-${platform}-page-`));
    
    if (files.length === 0) {
      return [];
    }
    
    console.log(`找到 ${files.length} 个${platform}进度文件，正在加载...`);
    
    const allCourses = [];
    for (const file of files) {
      const filePath = path.join(config.progressDir, file);
      const courseData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      allCourses.push(...courseData);
    }
    
    console.log(`已加载 ${allCourses.length} 个已爬取的${platform}课程`);
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

// ====================== 慕课网爬虫 ======================
async function crawlImooc(pages = config.maxPages) {
  console.log('开始爬取慕课网课程...');
  const platform = 'imooc';
  
  // 加载已有的课程数据
  const existingCourses = loadExistingCourses(platform);
  const allCourses = [...existingCourses];
  
  const baseUrl = 'https://www.imooc.com/course/list';
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  };
  
  let totalPages = pages;
  let courseCount = 0;
  
  for (let page = 1; page <= totalPages; page++) {
    try {
      console.log(`正在爬取慕课网第 ${page}/${totalPages} 页课程列表...`);
      
      const url = `${baseUrl}?page=${page}`;
      const response = await fetchWithRetry(url, headers);
      
      if (response.status !== 200) {
        console.error(`获取列表页 ${page} 失败: HTTP状态码 ${response.status}`);
        continue;
      }
      
      const $ = cheerio.load(response.data);
      
      // 解析总页数
      if (page === 1) {
        const paginationText = $('.page').text();
        const match = paginationText.match(/共(\d+)页/);
        if (match && match[1]) {
          const parsedTotalPages = parseInt(match[1], 10);
          totalPages = Math.min(parsedTotalPages, pages);
          console.log(`慕课网总页数: ${totalPages}`);
        }
      }
      
      // 解析课程列表
      const courseItems = $('.course-card-container');
      console.log(`第 ${page} 页找到 ${courseItems.length} 个课程`);
      
      const pageCoursesPromises = [];
      
      courseItems.each((index, element) => {
        try {
          const courseUrl = $(element).find('.course-card').attr('href');
          const fullCourseUrl = courseUrl ? `https://www.imooc.com${courseUrl}` : null;
          
          if (!fullCourseUrl) {
            console.warn(`第 ${page} 页第 ${index + 1} 个课程没有URL，跳过`);
            return;
          }
          
          const title = $(element).find('.course-card-name').text().trim();
          const imageSrc = $(element).find('.course-card-img').attr('src') || '';
          
          const courseId = `imooc-${courseUrl.split('/').pop()}`;
          
          // 初始课程信息
          const course = {
            id: courseId,
            title: title,
            provider: '慕课网',
            instructor: `讲师${Math.floor(Math.random() * 100) + 1}号`, // 随机讲师
            level: mapLevel($(element).find('.course-card-info').text()),
            updatedAt: `${Math.floor(Math.random() * 30) + 1}天前`,
            responseRate: `${Math.floor(Math.random() * 15) + 85}%`,
            trend: generateRandomTrend(),
            heat: generateRandomHeat(),
            tags: [], // 在详情页填充
            description: '', // 在详情页填充
            duration: `${Math.floor(Math.random() * 8) + 1}周`,
            status: '即将开始',
            statusColor: 'blue',
            imageSrc: imageSrc,
            rarityLevel: generateRarityLevel()
          };
          
          // 检查是否已存在此课程
          const isDuplicate = allCourses.some(existingCourse => 
            existingCourse.id === course.id || 
            existingCourse.title.toLowerCase() === course.title.toLowerCase()
          );
          
          if (isDuplicate) {
            console.log(`跳过重复课程: ${course.title}`);
            return;
          }
          
          // 获取课程详情
          if (config.fetchCourseDetail) {
            pageCoursesPromises.push(
              (async () => {
                try {
                  const details = await fetchCourseDetail(fullCourseUrl, headers, 'imooc');
                  const enrichedCourse = { ...course, ...details };
                  // 更新状态和颜色
                  const { status, color } = generateStatus();
                  enrichedCourse.status = status;
                  enrichedCourse.statusColor = color;
                  
                  return enrichedCourse;
                } catch (error) {
                  console.error(`获取课程 ${courseId} 详情失败: ${error.message}`);
                  return course; // 返回基本信息
                }
              })()
            );
          } else {
            // 如果不获取详情，直接使用基本信息
            allCourses.push(course);
          }
        } catch (error) {
          console.error(`解析课程项目失败: ${error.message}`);
        }
      });
      
      // 处理详情页请求
      if (config.fetchCourseDetail && pageCoursesPromises.length > 0) {
        // 批量处理详情页请求
        for (let i = 0; i < pageCoursesPromises.length; i += config.detailBatchSize) {
          const batch = pageCoursesPromises.slice(i, i + config.detailBatchSize);
          console.log(`处理详情页批次 ${Math.floor(i / config.detailBatchSize) + 1}/${Math.ceil(pageCoursesPromises.length / config.detailBatchSize)}`);
          
          const batchResults = await Promise.all(batch);
          allCourses.push(...batchResults);
          courseCount += batchResults.length;
          
          if (i + config.detailBatchSize < pageCoursesPromises.length) {
            console.log(`批次处理完成，休息 ${config.batchDelay}ms`);
            await delay(config.batchDelay);
          }
        }
      }
      
      // 保存进度
      saveProgress(platform, allCourses, page, totalPages);
      
    } catch (error) {
      console.error(`爬取第 ${page} 页失败: ${error.message}`);
    }
  }
  
  console.log(`慕课网爬取完成，总共爬取 ${courseCount} 个课程`);
  return allCourses;
}

// ====================== 中国大学MOOC爬虫 ======================
async function crawlIcourse(pages = config.maxPages) {
  console.log('开始爬取中国大学MOOC课程...');
  const platform = 'icourse';
  
  // 加载已有的课程数据
  const existingCourses = loadExistingCourses(platform);
  const allCourses = [...existingCourses];
  
  const baseUrl = 'https://www.icourse163.org/category/all';
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  };
  
  // 使用Puppeteer爬取动态加载内容
  try {
    console.log('启动浏览器...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent(headers['User-Agent']);
    
    let totalCourseCount = 0;
    
    for (let currentPage = 1; currentPage <= pages; currentPage++) {
      console.log(`正在爬取中国大学MOOC第 ${currentPage}/${pages} 页课程列表...`);
      
      // 访问页面
      await page.goto(`${baseUrl}#/?p=${currentPage}`, { 
        waitUntil: 'networkidle2',
        timeout: 60000
      });
      
      // 等待课程加载
      await page.waitForSelector('.course-card-wrap', { timeout: 10000 })
        .catch(e => console.error('等待课程卡片超时:', e.message));
      
      // 等待一会，确保内容完全加载
      await delay(2000);
      
      // 获取课程数据
      const coursesData = await page.evaluate(() => {
        const courses = [];
        const courseElements = document.querySelectorAll('.course-card-wrap');
        
        courseElements.forEach((element) => {
          try {
            const titleElement = element.querySelector('.course-card-name');
            const title = titleElement ? titleElement.textContent.trim() : '未知课程';
            
            const courseLink = element.querySelector('a');
            const courseUrl = courseLink ? courseLink.href : '';
            
            const imgElement = element.querySelector('.course-card-img img');
            const imageSrc = imgElement ? imgElement.src : '';
            
            const schoolElement = element.querySelector('.school');
            const provider = schoolElement ? schoolElement.textContent.trim() : '未知学校';
            
            // 从URL中提取课程ID
            let courseId = 'unknown';
            const idMatch = courseUrl.match(/course\/(\w+)/);
            if (idMatch && idMatch[1]) {
              courseId = `icourse-${idMatch[1]}`;
            }
            
            courses.push({
              id: courseId,
              title,
              courseUrl,
              imageSrc,
              provider
            });
          } catch (e) {
            console.error('解析课程元素出错:', e);
          }
        });
        
        return courses;
      });
      
      console.log(`第 ${currentPage} 页找到 ${coursesData.length} 个课程`);
      
      // 处理每个课程
      let processedCount = 0;
      for (const courseData of coursesData) {
        try {
          // 检查是否已存在此课程
          const isDuplicate = allCourses.some(existingCourse => 
            existingCourse.id === courseData.id || 
            existingCourse.title.toLowerCase() === courseData.title.toLowerCase()
          );
          
          if (isDuplicate) {
            console.log(`跳过重复课程: ${courseData.title}`);
            continue;
          }
          
          // 生成课程基本信息
          const { status, color } = generateStatus();
          const course = {
            id: courseData.id,
            title: courseData.title,
            provider: courseData.provider || '中国大学MOOC',
            instructor: `教师${Math.floor(Math.random() * 100) + 1}号`, // 随机教师
            level: Math.floor(Math.random() * 3) + 1, // 随机难度1-3
            updatedAt: `${Math.floor(Math.random() * 30) + 1}天前`,
            responseRate: `${Math.floor(Math.random() * 10) + 90}%`,
            trend: generateRandomTrend(),
            heat: generateRandomHeat(),
            tags: ['大学课程', '在线教育'],
            description: '课程简介暂无',
            duration: `${Math.floor(Math.random() * 16) + 4}周`,
            status: status,
            statusColor: color,
            imageSrc: courseData.imageSrc || 'https://edu-image.nosdn.127.net/32a8dd2a-b9aa-4ec9-abd5-66cd8e35ce5b.png',
            rarityLevel: generateRarityLevel()
          };
          
          // 如果需要爬取详情页
          if (config.fetchCourseDetail && courseData.courseUrl) {
            try {
              // 访问详情页
              await page.goto(courseData.courseUrl, { 
                waitUntil: 'networkidle2',
                timeout: 30000
              });
              
              // 等待页面加载
              await delay(2000);
              
              // 提取详情信息
              const details = await page.evaluate(() => {
                try {
                  // 课程描述
                  const descElement = document.querySelector('.category-info');
                  const description = descElement ? descElement.textContent.trim() : '';
                  
                  // 标签
                  const tagElements = document.querySelectorAll('.tag_meta a');
                  const tags = Array.from(tagElements).map(el => el.textContent.trim());
                  
                  // 讲师
                  const instructorElement = document.querySelector('.tit_teacher');
                  const instructor = instructorElement ? instructorElement.textContent.trim() : '';
                  
                  return { 
                    description: description || '暂无课程简介',
                    tags: tags.length > 0 ? tags : ['大学课程', '在线教育'],
                    instructor: instructor || `教师${Math.floor(Math.random() * 100) + 1}号`
                  };
                } catch (e) {
                  console.error('解析详情页出错:', e);
                  return { description: '暂无课程简介', tags: ['大学课程', '在线教育'] };
                }
              });
              
              // 合并详情
              Object.assign(course, {
                description: details.description,
                tags: details.tags,
                instructor: details.instructor
              });
              
              // 每爬取几个课程详情后休息一下
              processedCount++;
              if (processedCount % config.detailBatchSize === 0) {
                console.log(`已处理 ${processedCount} 个课程详情，休息 ${config.batchDelay}ms`);
                await delay(config.batchDelay);
              } else {
                await delay(config.detailDelay);
              }
            } catch (error) {
              console.error(`获取详情页失败: ${error.message}`);
            }
          }
          
          allCourses.push(course);
          totalCourseCount++;
          
        } catch (error) {
          console.error(`处理课程数据失败: ${error.message}`);
        }
      }
      
      // 保存进度
      saveProgress(platform, allCourses, currentPage, pages);
      
      // 页面之间的延迟
      if (currentPage < pages) {
        console.log(`页面处理完成，休息 ${config.batchDelay}ms 后处理下一页`);
        await delay(config.batchDelay);
      }
    }
    
    await browser.close();
    console.log(`中国大学MOOC爬取完成，总共爬取 ${totalCourseCount} 个课程`);
    
  } catch (error) {
    console.error(`爬取中国大学MOOC出错: ${error.message}`);
  }
  
  return allCourses;
}

// ====================== 学堂在线爬虫 ======================
async function crawlXuetangx(pages = config.maxPages) {
  console.log('开始爬取学堂在线课程...');
  const platform = 'xuetangx';
  
  // 加载已有的课程数据
  const existingCourses = loadExistingCourses(platform);
  const allCourses = [...existingCourses];
  
  const baseUrl = 'https://www.xuetangx.com/api/v1/lms/get_course_list';
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': 'https://www.xuetangx.com',
    'Referer': 'https://www.xuetangx.com/search'
  };
  
  let totalCourseCount = 0;
  
  for (let page = 1; page <= pages; page++) {
    try {
      console.log(`正在爬取学堂在线第 ${page}/${pages} 页课程列表...`);
      
      // API请求参数
      const params = {
        query: '',
        chief_org: [],
        classify: [],
        selling_type: [],
        status: [],
        appid: 10000,
        page_size: 20,
        page: page
      };
      
      const response = await axios.post(baseUrl, params, { headers });
      
      if (response.status !== 200 || !response.data || !response.data.data || !response.data.data.items) {
        console.error(`获取列表页 ${page} 失败`);
        continue;
      }
      
      const courseItems = response.data.data.items;
      console.log(`第 ${page} 页找到 ${courseItems.length} 个课程`);
      
      for (let i = 0; i < courseItems.length; i++) {
        try {
          const item = courseItems[i];
          
          const courseId = `xuetangx-${item.course_id || item.id || i}`;
          
          // 检查是否已存在此课程
          const isDuplicate = allCourses.some(existingCourse => 
            existingCourse.id === courseId || 
            (item.name && existingCourse.title.toLowerCase() === item.name.toLowerCase())
          );
          
          if (isDuplicate) {
            console.log(`跳过重复课程: ${item.name || courseId}`);
            continue;
          }
          
          // 获取课程标签
          const tags = [];
          if (item.category) tags.push(item.category);
          if (item.org) tags.push(item.org);
          if (tags.length === 0) tags.push('在线教育');
          
          // 生成课程状态
          const { status, color } = generateStatus();
          
          // 构建课程对象
          const course = {
            id: courseId,
            title: item.name || `学堂在线课程${courseId}`,
            provider: item.org || '学堂在线',
            instructor: item.teacher || `讲师${Math.floor(Math.random() * 100) + 1}号`,
            level: Math.floor(Math.random() * 3) + 1, // 随机难度1-3
            updatedAt: `${Math.floor(Math.random() * 30) + 1}天前`,
            responseRate: `${Math.floor(Math.random() * 10) + 90}%`,
            trend: generateRandomTrend(),
            heat: generateRandomHeat(),
            tags: tags,
            description: item.description || '暂无课程简介',
            duration: `${Math.floor(Math.random() * 12) + 4}周`,
            status: status,
            statusColor: color,
            imageSrc: item.cover || 'https://edu-image.nosdn.127.net/32a8dd2a-b9aa-4ec9-abd5-66cd8e35ce5b.png',
            rarityLevel: generateRarityLevel()
          };
          
          allCourses.push(course);
          totalCourseCount++;
          
          // 每处理一定数量的课程休息一下
          if (i % config.detailBatchSize === 0 && i > 0) {
            await delay(config.detailDelay);
          }
        } catch (error) {
          console.error(`处理课程项目失败: ${error.message}`);
        }
      }
      
      // 保存进度
      saveProgress(platform, allCourses, page, pages);
      
      // 页面之间的延迟
      if (page < pages) {
        console.log(`页面处理完成，休息 ${config.batchDelay}ms 后处理下一页`);
        await delay(config.batchDelay);
      }
    } catch (error) {
      console.error(`爬取第 ${page} 页失败: ${error.message}`);
    }
  }
  
  console.log(`学堂在线爬取完成，总共爬取 ${totalCourseCount} 个课程`);
  return allCourses;
}

// 抓取课程详情页
async function fetchCourseDetail(url, headers, platform) {
  try {
    const response = await fetchWithRetry(url, headers);
    
    if (response.status !== 200) {
      throw new Error(`HTTP状态码: ${response.status}`);
    }
    
    const $ = cheerio.load(response.data);
    
    // 根据不同平台解析详情
    if (platform === 'imooc') {
      // 课程描述
      const description = $('.course-description .course-wrap').text().trim() ||
                        $('.course-description').text().trim() ||
                        '暂无课程简介';
      
      // 课程标签
      const tags = [];
      $('.course-label label').each((_, el) => {
        const tag = $(el).text().trim();
        if (tag) tags.push(tag);
      });
      
      // 如果没有找到标签，使用默认标签
      if (tags.length === 0) {
        tags.push('IT技能', '实用技术');
      }
      
      // 返回详情信息
      return {
        description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
        tags: tags
      };
    }
    
    // 对于其他平台，返回默认信息
    return {
      description: '暂无课程简介',
      tags: ['在线教育', '技能提升']
    };
  } catch (error) {
    console.error(`获取课程详情失败: ${error.message}`);
    throw error;
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

// 主函数：爬取所有平台的课程
async function crawlAllPlatforms() {
  try {
    console.log('=== 开始多平台课程爬取 ===');
    
    // 爬取慕课网
    const imoocCourses = await crawlImooc();
    
    // 爬取中国大学MOOC
    const icourseCourses = await crawlIcourse();
    
    // 爬取学堂在线
    const xuetangxCourses = await crawlXuetangx();
    
    // 合并所有课程
    const allCourses = [
      ...imoocCourses,
      ...icourseCourses,
      ...xuetangxCourses
    ];
    
    console.log(`共爬取 ${allCourses.length} 个课程`);
    
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
  crawlImooc,
  crawlIcourse,
  crawlXuetangx,
  crawlAllPlatforms,
  saveToMongoDB
}; 