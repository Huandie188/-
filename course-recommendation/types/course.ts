// 课程类型定义
export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  image: string;
  keywords?: string[]; // 用于匹配AI响应的关键词
} 