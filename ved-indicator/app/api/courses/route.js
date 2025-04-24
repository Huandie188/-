import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET() {
  try {
    // 连接数据库
    const db = await connectToDatabase();
    
    // 检查数据库连接是否成功
    if (!db) {
      console.warn('数据库连接未配置或连接失败，尝试返回模拟数据');
      
      // 提供更完整的模拟数据，确保包含所有前端需要的字段
      return NextResponse.json({ 
        courses: [
          {
            id: "mock1",
            title: "示例课程 1",
            provider: "示例提供商",
            instructor: "示例讲师",
            level: 1,
            updatedAt: "2023-10-01",
            responseRate: "95%",
            trend: "上升",
            heat: 80,
            tags: ["前端", "JavaScript", "React"],
            description: "这是一个示例课程，由于数据库连接问题，显示的是模拟数据。",
            duration: "8周",
            status: "进行中",
            statusColor: "green",
            imageSrc: "/placeholder.jpg",
            rarityLevel: "普通"
          },
          {
            id: "mock2",
            title: "示例课程 2",
            provider: "示例提供商",
            instructor: "示例讲师",
            level: 2,
            updatedAt: "2023-09-15",
            responseRate: "90%",
            trend: "稳定",
            heat: 75,
            tags: ["后端", "Python", "Django"],
            description: "这是一个示例课程，由于数据库连接问题，显示的是模拟数据。",
            duration: "10周",
            status: "已完成",
            statusColor: "blue",
            imageSrc: "/placeholder.jpg",
            rarityLevel: "精品"
          },
          {
            id: "mock3",
            title: "示例课程 3",
            provider: "示例提供商",
            instructor: "示例讲师",
            level: 3,
            updatedAt: "2023-11-05",
            responseRate: "85%",
            trend: "下降",
            heat: 65,
            tags: ["数据分析", "机器学习", "Python"],
            description: "这是一个示例课程，由于数据库连接问题，显示的是模拟数据。",
            duration: "12周",
            status: "未开始",
            statusColor: "gray",
            imageSrc: "/placeholder.jpg",
            rarityLevel: "稀有"
          }
        ]
      }, { status: 200 });
    }
    
    // 获取所有课程
    const courses = await Course.find({}).lean();
    
    // 返回课程数据
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error('获取课程失败:', error);
    return NextResponse.json(
      { error: '获取课程失败', message: error.message }, 
      { status: 500 }
    );
  }
} 