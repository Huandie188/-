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
      
      // 如果数据库连接失败，返回模拟数据
      return NextResponse.json({ 
        courses: [
          {
            id: "mock1",
            title: "示例课程 1",
            description: "这是一个示例课程，由于数据库连接问题，显示的是模拟数据。",
            level: "初级",
            provider: "示例提供商",
            status: "进行中",
            imageSrc: "/placeholder.jpg"
          },
          {
            id: "mock2",
            title: "示例课程 2",
            description: "这是一个示例课程，由于数据库连接问题，显示的是模拟数据。",
            level: "中级",
            provider: "示例提供商",
            status: "已完成",
            imageSrc: "/placeholder.jpg"
          },
          {
            id: "mock3",
            title: "示例课程 3",
            description: "这是一个示例课程，由于数据库连接问题，显示的是模拟数据。",
            level: "高级",
            provider: "示例提供商",
            status: "未开始",
            imageSrc: "/placeholder.jpg"
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