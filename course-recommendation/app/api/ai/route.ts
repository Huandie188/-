import { NextResponse } from 'next/server';
import { generateOllamaResponse, extractRecommendedCourses } from '@/lib/ollama';

export async function POST(request: Request) {
  try {
    // 获取请求体中的用户输入
    const { userInput } = await request.json();
    
    if (!userInput || typeof userInput !== 'string') {
      console.error('无效的用户输入:', userInput);
      return NextResponse.json(
        { error: '请提供有效的用户输入' },
        { status: 400 }
      );
    }

    console.log('处理用户输入:', userInput.substring(0, 50) + (userInput.length > 50 ? '...' : ''));
    
    try {
      // 调用Ollama API获取响应
      const ollamaResponse = await generateOllamaResponse(userInput);
      console.log('获取到Ollama响应');
      
      // 从AI响应中提取推荐课程
      const recommendedCourses = extractRecommendedCourses(ollamaResponse.response);
      console.log('提取的推荐课程数量:', recommendedCourses.length);
      
      // 返回AI响应和推荐课程
      return NextResponse.json({
        aiResponse: ollamaResponse.response,
        recommendedCourses
      });
    } catch (apiError: any) {
      console.error('调用Ollama API或处理响应时出错:', apiError.message || apiError);
      
      // 返回详细的API错误
      return NextResponse.json(
        { error: `AI服务调用失败: ${apiError.message || '未知错误'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('API请求处理失败:', error.message || error);
    
    // 返回错误响应
    return NextResponse.json(
      { error: `处理AI请求时出错: ${error.message || '未知错误'}` },
      { status: 500 }
    );
  }
}

// Ollama API需要较长的处理时间，增加接口超时
export const maxDuration = 60; // 60秒超时，根据需要调整 