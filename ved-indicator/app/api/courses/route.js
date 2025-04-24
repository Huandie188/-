import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET() {
  try {
    // 连接数据库
    await connectToDatabase();
    
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