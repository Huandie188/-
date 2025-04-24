import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET(request, { params }) {
  try {
    // 连接数据库
    const db = await connectToDatabase();
    
    // 检查数据库连接是否成功
    if (!db) {
      console.warn('数据库连接未配置或连接失败，尝试返回模拟数据');
      
      // 获取ID
      const { id } = params;
      
      // 提供更完整的模拟数据，确保包含所有前端需要的字段
      return NextResponse.json({ 
        course: {
          id: id,
          title: `示例课程 ${id}`,
          provider: "示例提供商",
          instructor: "示例讲师",
          level: 2,
          updatedAt: "2023-10-15",
          responseRate: "92%",
          trend: "上升",
          heat: 85,
          tags: ["编程", "Web开发", "JavaScript"],
          description: "这是一个示例课程，由于数据库连接问题，显示的是模拟数据。该课程提供了全面的Web开发指南，从基础到高级应用。",
          duration: "10周",
          status: "进行中",
          statusColor: "green",
          imageSrc: "/placeholder.jpg",
          rarityLevel: "普通"
        }
      }, { status: 200 });
    }
    
    const { id } = params;
    
    // 获取指定ID的课程
    const course = await Course.findOne({ id }).lean();
    
    if (!course) {
      return NextResponse.json(
        { error: '课程不存在' }, 
        { status: 404 }
      );
    }
    
    // 返回课程数据
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error('获取课程失败:', error);
    return NextResponse.json(
      { error: '获取课程失败', message: error.message }, 
      { status: 500 }
    );
  }
} 