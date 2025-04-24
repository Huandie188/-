import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET(request, { params }) {
  try {
    // 连接数据库
    await connectToDatabase();
    
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