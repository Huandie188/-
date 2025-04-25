import { Course } from '@/types/course';

// 定义Ollama API请求类型
export type OllamaRequest = {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
    num_predict?: number;
    stop?: string[];
  };
};

// 定义Ollama API响应类型
export type OllamaResponse = {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
};

// 课程数据，实际项目应该从数据库获取
const courseData: Course[] = [
  {
    id: "1",
    title: "Python编程基础",
    description: "适合零基础学习者的Python入门课程，通过简单易懂的实例学习编程基础知识。",
    level: "beginner",
    category: "web,data,ai",
    image: "/ai-chat-course-1.jpg",
    keywords: ["python", "编程", "入门", "零基础", "初学者"]
  },
  {
    id: "2",
    title: "JavaScript全栈开发",
    description: "从前端到后端，全面掌握JavaScript开发技能，构建完整Web应用。",
    level: "intermediate",
    category: "web",
    image: "/ai-chat-course-2.jpg",
    keywords: ["javascript", "全栈", "前端", "后端", "web开发"]
  },
  {
    id: "3",
    title: "数据科学与机器学习",
    description: "学习数据分析、可视化和机器学习算法，解决实际问题。",
    level: "intermediate-advanced",
    category: "data,ai",
    image: "/ai-chat-course-3.jpg",
    keywords: ["数据科学", "机器学习", "数据分析", "可视化", "算法"]
  },
  {
    id: "4",
    title: "Web前端开发实战",
    description: "学习HTML、CSS和JavaScript，构建现代化响应式网站，掌握前端开发核心技能。",
    level: "beginner-intermediate",
    category: "web",
    image: "/ai-chat-course-4.jpg",
    keywords: ["前端", "html", "css", "javascript", "响应式"]
  },
  {
    id: "5",
    title: "人工智能基础与应用",
    description: "了解AI的基本概念、算法和应用场景，为深入学习人工智能打下基础。",
    level: "beginner-intermediate",
    category: "ai",
    image: "/ai-chat-course-5.jpg",
    keywords: ["人工智能", "ai", "算法", "应用", "基础"]
  }
];

// 获取课程的系统提示
export function getSystemPrompt(): string {
  return `你是一位专业的课程顾问，负责根据用户的学习需求推荐最合适的课程。
你应该分析用户的描述，理解他们的学习目标、背景和偏好，然后推荐最适合的课程。
你的回答应该包括：
1. 简要分析用户的需求和目标
2. 2-3门最适合的推荐课程，并解释为什么这些课程适合用户
3. 学习建议或路径规划

可供推荐的课程列表：
${courseData.map(course => 
  `- ${course.title}：${course.description}（适合：${course.level === 'beginner' ? '初学者' : 
    course.level === 'intermediate' ? '中级学习者' : 
    course.level === 'advanced' ? '高级学习者' : 
    course.level === 'beginner-intermediate' ? '初学者到中级' :
    course.level === 'intermediate-advanced' ? '中级到高级' : '所有层级'}）`
).join('\n')}

请基于用户的描述，选择最适合的2-3门课程。你的回复应直接使用中文，不要使用Markdown格式，保持简洁自然的对话风格。`;
}

// 调用Ollama API
export async function generateOllamaResponse(userPrompt: string): Promise<OllamaResponse> {
  const OLLAMA_API_URL = process.env.NEXT_PUBLIC_OLLAMA_API_URL || 'http://localhost:11434/api/generate';
  const OLLAMA_MODEL = process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'llama3:latest';
  
  const systemPrompt = getSystemPrompt();
  const fullPrompt = `${systemPrompt}\n\n用户需求: ${userPrompt}`;
  
  try {
    console.log('正在调用Ollama API...');
    console.log('使用模型:', OLLAMA_MODEL);
    
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: fullPrompt,
        stream: false, // 设置为false，确保返回完整响应而非流
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40,
        }
      } as OllamaRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama API返回非200状态码:', response.status, errorText);
      throw new Error(`API调用失败: ${response.status} - ${errorText}`);
    }
    
    try {
      // 获取响应文本
      const textResponse = await response.text();
      console.log('API响应前100个字符:', textResponse.substring(0, 100) + '...');
      
      // 尝试解析JSON
      const data = JSON.parse(textResponse);
      
      return {
        model: data.model || OLLAMA_MODEL,
        created_at: data.created_at || new Date().toISOString(),
        response: data.response || '抱歉，无法获取有效响应',
        done: data.done !== undefined ? data.done : true
      } as OllamaResponse;
    } catch (parseError) {
      console.error('解析API响应时出错:', parseError);
      console.error('响应内容:', await response.text());
      
      // 返回一个默认响应，避免应用崩溃
      return {
        model: OLLAMA_MODEL,
        created_at: new Date().toISOString(),
        response: '抱歉，我暂时无法提供建议。请尝试提供更具体的学习需求描述。',
        done: true
      } as OllamaResponse;
    }
  } catch (error) {
    console.error('调用Ollama API时出错:', error);
    throw error;
  }
}

// 解析AI响应，推荐相关课程
export function extractRecommendedCourses(aiResponse: string): Course[] {
  // 这是一个简单的示例，实际中可能需要更复杂的解析逻辑
  // 基于关键词匹配从课程数据中推荐课程
  
  // 将AI响应转换为小写以便匹配
  const responseLower = aiResponse.toLowerCase();
  
  // 为每个课程计算匹配得分
  const courseScores = courseData.map(course => {
    let score = 0;
    
    // 检查课程标题是否出现在响应中
    if (responseLower.includes(course.title.toLowerCase())) {
      score += 10;
    }
    
    // 检查课程关键词是否出现在响应中 - 使用可选链处理undefined情况
    course.keywords?.forEach(keyword => {
      if (responseLower.includes(keyword.toLowerCase())) {
        score += 5;
      }
    });
    
    // 检查课程描述中的关键短语是否出现在响应中
    const descriptionWords = course.description.toLowerCase().split(' ');
    descriptionWords.forEach(word => {
      if (word.length > 4 && responseLower.includes(word)) {
        score += 2;
      }
    });
    
    return { course, score };
  });
  
  // 按得分排序并取前3个
  const sortedCourses = courseScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.course);
  
  // 如果没有匹配，返回前3个课程作为默认推荐
  if (courseScores.every(item => item.score === 0)) {
    return courseData.slice(0, 3);
  }
  
  return sortedCourses;
} 