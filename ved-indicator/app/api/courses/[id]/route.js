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
      
      // 如果数据库连接失败，返回模拟数据
      // 这部分可以根据实际需求自定义
      return NextResponse.json({ 
        course: {
          id: id,
          title: `示例课程 ${id}`,
          description: "这是一个示例课程，由于数据库连接问题，显示的是模拟数据。",
          level: "中级",
          provider: "示例提供商",
          status: "进行中",
          imageSrc: "/placeholder.jpg"
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