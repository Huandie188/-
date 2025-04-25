# VED Indicator 课程爬虫

本目录包含多个MOOC平台的爬虫脚本，用于爬取在线课程数据并存储到MongoDB数据库中。

## 爬虫脚本说明

本项目包含以下爬虫脚本：

1. **`crawler-imooc.js`** - 原始的慕课网爬虫脚本
2. **`multi-platform-crawler.js`** - 多平台爬虫脚本，支持多个MOOC平台
3. **`simple-mooc-crawler.js`** - 简化版多平台爬虫脚本（推荐使用）

多平台爬虫支持以下MOOC平台：

- 慕课网 (imooc.com)
- 中国大学MOOC (icourse163.org)
- 学堂在线 (xuetangx.com)

简化版爬虫支持以下MOOC平台：

- Coursera API
- edX API
- Udemy API
- 随机生成课程数据（作为备用方案）

## 运行爬虫

### 安装依赖

在运行爬虫前，确保已经安装所有依赖：

```bash
pnpm install
```

### 运行简化版多平台爬虫（推荐）

```bash
pnpm run crawl:simple
```

这将尝试从Coursera、edX和Udemy API获取课程数据，如果API获取失败，会自动生成随机课程数据作为补充。

### 运行多平台爬虫

```bash
pnpm run crawl
```

### 只爬取慕课网

```bash
pnpm run crawl:imooc
```

### 查看数据库中的课程

```bash
pnpm run list-courses
```

## 配置说明

简化版爬虫脚本中的配置参数：

```javascript
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
```

可以根据需要调整这些参数。

## 数据存储

爬取的课程数据会保存在以下位置：

1. **MongoDB数据库** - 通过`.env.local`中的`MONGODB_URI`连接
2. **JSON文件** - 保存在`scripts/output/courses`目录下
3. **进度文件** - 保存在`scripts/output/progress`目录下

## 随机课程生成

简化版爬虫脚本包含一个强大的随机课程生成器，当API获取失败时会自动生成随机课程数据。生成的课程具有以下特点：

1. 随机选择平台（慕课网、中国大学MOOC、学堂在线、网易云课堂等）
2. 随机选择技术类别（前端开发、后端开发、移动开发、数据库等）
3. 随机生成课程标题、描述、难度、标签等信息
4. 随机生成热度、趋势、稀有度等显示属性

## 注意事项

1. 爬虫设计了延迟和重试机制，以减轻对目标网站的压力
2. 对于需要JavaScript渲染的页面，推荐使用简化版爬虫，不依赖Puppeteer
3. 爬取过程中会自动跳过重复的课程
4. 如遇到网络问题或API变更，简化版爬虫会自动生成随机课程数据作为备用方案 