# AI对话推荐功能

本文档介绍如何使用和配置课程推荐系统的AI对话推荐功能。该功能使用Ollama 3.1模型提供智能课程推荐。

## 功能介绍

AI对话推荐功能允许用户通过自然语言描述他们的学习需求和目标，系统会调用Ollama 3.1模型分析用户输入，并根据分析结果推荐最适合的课程。

## 技术实现

- 前端：Next.js + React + TailwindCSS
- 后端：Next.js API路由
- AI模型：Ollama 3.1 (llama3)

## 安装和配置

### 1. 安装Ollama

按照[Ollama官方文档](https://ollama.ai/)安装Ollama。

### 2. 拉取Llama 3.1模型

```bash
ollama pull llama3
```

### 3. 运行Ollama服务

确保Ollama服务在后台运行，默认端口是11434。

### 4. 配置环境变量

在`.env.local`文件中配置以下变量：

```
NEXT_PUBLIC_OLLAMA_API_URL=http://localhost:11434/api/generate
NEXT_PUBLIC_OLLAMA_MODEL=llama3:latest
```

如果Ollama运行在不同的地址或端口，或者想使用不同的模型，请相应地调整这些值。

## 使用说明

1. 访问课程推荐首页
2. 点击"AI对话推荐"卡片
3. 在文本框中描述您的学习需求，例如：
   - "我想学习前端开发，请推荐适合初学者的课程"
   - "我已经有Python基础，想转向数据科学领域，需要学习什么？"
   - "我有3个月时间，如何从零基础开始学习AI？"
4. 点击"获取推荐"按钮
5. 系统将分析您的需求并推荐最适合的课程

## 自定义课程数据

课程数据目前定义在`lib/ollama.ts`文件中。实际生产环境中，应该将课程数据存储在数据库中。

要添加更多课程，可以编辑该文件中的`courseData`数组。每个课程条目应包含以下字段：

```typescript
{
  id: string;            // 课程唯一标识
  title: string;         // 课程标题
  description: string;   // 课程描述
  level: string;         // 课程级别（beginner/intermediate/advanced或组合）
  category: string;      // 课程类别，用逗号分隔（web,data,ai等）
  image: string;         // 课程图片路径
  keywords: string[];    // 用于匹配的关键词
}
```

## 故障排除

### AI服务无响应

1. 确认Ollama服务正在运行
2. 检查环境变量是否正确配置
3. 检查浏览器控制台是否有错误
4. 检查服务器日志是否有错误

### 推荐不准确

尝试以下方法改善推荐质量：

1. 在`lib/ollama.ts`文件中调整系统提示
2. 增加更多课程和更详细的关键词
3. 调整模型参数，如temperature值 