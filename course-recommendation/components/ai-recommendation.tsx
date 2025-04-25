"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Sparkles, CircleAlert, Bot, ChevronRight } from "lucide-react"
import { Course } from "@/types/course"

interface AiRecommendationProps {
  onBack: () => void
  username: string
}

export default function AiRecommendation({ onBack, username }: AiRecommendationProps) {
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [courses, setCourses] = useState<Course[]>([])

  // 添加占位图像点击事件处理函数
  const handleImageClick = (courseId: string) => {
    const courseInfo = {
      "1": { title: "Python编程基础", image: "/ai-chat-course-1.jpg" },
      "2": { title: "JavaScript全栈开发", image: "/ai-chat-course-2.jpg" },
      "3": { title: "数据科学与机器学习", image: "/ai-chat-course-3.jpg" },
      "4": { title: "Web前端开发实战", image: "/ai-chat-course-4.jpg" },
      "5": { title: "人工智能基础与应用", image: "/ai-chat-course-5.jpg" }
    }
    
    if (courseId in courseInfo) {
      const info = courseInfo[courseId as keyof typeof courseInfo]
      alert(`请替换AI对话推荐课程"${info.title}"的图像。\n您可以替换 'public${info.image}' 文件，推荐尺寸为800x450像素。`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // 改为使用模拟AI回答而不是真实API调用
      console.log('模拟AI回答');
      
      // 设置加载时间，模拟AI思考过程
      const thinkingTime = 1500 + Math.random() * 1500;
      await new Promise(resolve => setTimeout(resolve, thinkingTime));
      
      // 生成模拟AI回答
      const simulatedResponse = generateSimulatedResponse(userInput);
      
      // 更新UI和状态
      setAiResponse(simulatedResponse);
      setCourses(getDefaultCourses());
      setShowResults(true);
    } catch (error: any) {
      console.error('处理请求失败:', error.message || error);
      setError('系统暂时遇到了问题，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  }
  
  // 生成模拟AI的回答
  const generateSimulatedResponse = (input: string): string => {
    // 提取用户输入中的关键词，用于个性化回复
    const inputLower = input.toLowerCase();
    const keywords = {
      beginner: inputLower.includes('零基础') || inputLower.includes('初学') || inputLower.includes('入门'),
      frontend: inputLower.includes('前端') || inputLower.includes('网页') || inputLower.includes('web') || inputLower.includes('html'),
      backend: inputLower.includes('后端') || inputLower.includes('服务器') || inputLower.includes('服务端'),
      python: inputLower.includes('python') || inputLower.includes('数据分析') || inputLower.includes('爬虫'),
      ai: inputLower.includes('人工智能') || inputLower.includes('机器学习') || inputLower.includes('ai') || inputLower.includes('深度学习'),
      data: inputLower.includes('数据') || inputLower.includes('分析') || inputLower.includes('data') || inputLower.includes('大数据'),
      job: inputLower.includes('工作') || inputLower.includes('就业') || inputLower.includes('就职') || inputLower.includes('转行'),
      quick: inputLower.includes('速成') || inputLower.includes('快速') || inputLower.includes('短期') || inputLower.includes('速学')
    };
    
    // 多样化的开场白
    const intros = [
      `分析您的需求："${input.length > 50 ? input.substring(0, 50) + '...' : input}"，`,
      `根据您的描述，我认为`,
      `感谢您的咨询！基于您的学习目标，`,
      `我理解您想要${keywords.beginner ? '入门' : '深入学习'}计算机科学相关知识。`,
      `您好！针对您的问题，我建议`,
      `经过分析，我觉得您可能对以下课程感兴趣：`
    ];
    
    // 多样化的分析部分
    const analysis = [
      keywords.beginner ? '看起来您是计算机领域的新手，建议从基础课程开始学习。' : '您似乎已经有一定的编程基础，可以考虑进阶课程。',
      keywords.frontend ? '前端开发是一个不错的切入点，您可以从HTML/CSS/JavaScript开始学习。' : '',
      keywords.backend ? '后端开发需要扎实的编程基础，建议先学习一门编程语言如Python或JavaScript。' : '',
      keywords.python ? 'Python是一门非常适合初学者的语言，应用领域广泛。' : '',
      keywords.ai ? '人工智能学习需要数学和编程基础，建议循序渐进。' : '',
      keywords.data ? '数据科学是当前热门领域，需要统计学和编程知识的结合。' : '',
      keywords.job ? '从就业角度考虑，全栈开发技能需求量大且薪资不错。' : '',
      keywords.quick ? '虽然希望快速掌握，但编程学习需要时间和实践，建议合理规划学习路径。' : ''
    ].filter(item => item !== ''); // 过滤掉空字符串
    
    // 多样化的课程推荐理由
    const reasons = [
      '基于您的兴趣和目标，以下课程最为合适：',
      '考虑到您的学习需求，我特别推荐：',
      '以下是为您精心挑选的课程：',
      '根据您的描述，这些课程将帮助您实现目标：',
      '我认为这几门课程最适合您目前的学习阶段：'
    ];
    
    // 多样化的学习建议
    const suggestions = [
      '建议您按顺序学习这些课程，打好基础再逐步提高。',
      '学习过程中，动手实践很重要，建议每学一个知识点就做一个小项目。',
      '可以结合在线资源和社区讨论，加深对知识的理解。',
      '制定合理的学习计划，保持每天学习的习惯，效果会更好。',
      `${keywords.job ? '准备作品集对于求职非常重要，建议在学习过程中积累项目经验。' : '坚持是学习编程最重要的品质，遇到问题不要轻易放弃。'}`,
      '推荐同时参与开源项目，这对提升实战能力很有帮助。',
      `${keywords.quick ? '虽然期望速成，但编程能力的提升需要时间积累，耐心一些会有更好的效果。' : '学习是一个持续的过程，希望您能享受这个过程。'}`
    ];
    
    // 构建完整回复
    const randomIntro = intros[Math.floor(Math.random() * intros.length)];
    const randomAnalysis = analysis.length > 0 ? 
      analysis[Math.floor(Math.random() * analysis.length)] + ' ' + 
      (analysis.length > 1 ? analysis[(Math.floor(Math.random() * analysis.length) + 1) % analysis.length] : '') : 
      '';
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    const randomSuggestions = [
      suggestions[Math.floor(Math.random() * suggestions.length)],
      suggestions[(Math.floor(Math.random() * suggestions.length) + 2) % suggestions.length]
    ].join(' ');
    
    return `${randomIntro} ${randomAnalysis}\n\n${randomReason}\n\n${randomSuggestions}`;
  }
  
  // 获取默认课程推荐
  const getDefaultCourses = (): Course[] => {
    // 创建不同组合的课程推荐，每次随机选择一组
    const courseSet1 = [
      {
        id: "1",
        title: "Python编程基础",
        description: "适合零基础学习者的Python入门课程，通过简单易懂的实例学习编程基础知识。",
        level: "beginner",
        category: "web,data,ai",
        image: "/ai-chat-course-1.jpg",
      },
      {
        id: "2",
        title: "JavaScript全栈开发",
        description: "从前端到后端，全面掌握JavaScript开发技能，构建完整Web应用。",
        level: "intermediate",
        category: "web",
        image: "/ai-chat-course-2.jpg",
      },
      {
        id: "3",
        title: "数据科学与机器学习",
        description: "学习数据分析、可视化和机器学习算法，解决实际问题。",
        level: "intermediate-advanced",
        category: "data,ai",
        image: "/ai-chat-course-3.jpg",
      },
    ];
    
    const courseSet2 = [
      {
        id: "1",
        title: "Python编程基础",
        description: "适合零基础学习者的Python入门课程，通过简单易懂的实例学习编程基础知识。",
        level: "beginner",
        category: "web,data,ai",
        image: "/ai-chat-course-1.jpg",
      },
      {
        id: "4",
        title: "Web前端开发实战",
        description: "学习HTML、CSS和JavaScript，构建现代化响应式网站，掌握前端开发核心技能。",
        level: "beginner-intermediate",
        category: "web",
        image: "/ai-chat-course-4.jpg",
      },
      {
        id: "5",
        title: "人工智能基础与应用",
        description: "了解AI的基本概念、算法和应用场景，为深入学习人工智能打下基础。",
        level: "beginner-intermediate",
        category: "ai",
        image: "/ai-chat-course-5.jpg",
      },
    ];
    
    const courseSet3 = [
      {
        id: "2",
        title: "JavaScript全栈开发",
        description: "从前端到后端，全面掌握JavaScript开发技能，构建完整Web应用。",
        level: "intermediate",
        category: "web",
        image: "/ai-chat-course-2.jpg",
      },
      {
        id: "3",
        title: "数据科学与机器学习",
        description: "学习数据分析、可视化和机器学习算法，解决实际问题。",
        level: "intermediate-advanced",
        category: "data,ai",
        image: "/ai-chat-course-3.jpg",
      },
      {
        id: "5",
        title: "人工智能基础与应用",
        description: "了解AI的基本概念、算法和应用场景，为深入学习人工智能打下基础。",
        level: "beginner-intermediate",
        category: "ai",
        image: "/ai-chat-course-5.jpg",
      },
    ];
    
    // 随机选择一组课程
    const courseSets = [courseSet1, courseSet2, courseSet3];
    return courseSets[Math.floor(Math.random() * courseSets.length)];
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <span className="sr-only">返回</span>
        </Button>
        <div className="text-center flex-1">
          {/* 删除标题，不需要任何替代内容 */}
        </div>
        <div className="w-10"></div> {/* 占位，保持布局平衡 */}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-300">
          <CircleAlert className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!showResults ? (
        <Card className="shadow-lg border bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-100 dark:border-purple-900/30">
          <CardContent className="pt-4 px-4">
            <div className="flex items-center justify-center mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-900/30">
                <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <p className="text-purple-700 dark:text-purple-300 font-medium text-sm">AI助手已准备好帮助您</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-3">告诉AI您的目标，定制专属逆袭计划！</h2>
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-md">
                    <span className="font-medium">注意：</span> 目前仅支持计算机科学方向的课程
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-xs bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg border border-purple-100 dark:border-purple-800/30">
                  <span className="font-medium">提示：</span> 您可以像聊天一样自然地描述您的需求，例如：
                  "我想转行数据分析，有哪些必学的课程？" 或 "我有3个月时间，如何从零开始学习前端开发？"
                </p>
                <div className="relative">
                  <Textarea
                    placeholder="请输入您想学习的内容、目标或困惑..."
                    className="min-h-[120px] border-2 focus:border-purple-400 dark:focus:border-purple-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm resize-none p-3 pr-12 text-sm"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <div className="absolute bottom-2 right-3 text-gray-400 text-xs">
                    {userInput.length} 字
                  </div>
                </div>
                
                {/* 语音输入按钮 */}
                <div className="mt-3 flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 flex items-center gap-2"
                    onClick={() => alert("语音输入功能即将上线")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                    <span className="text-sm">语音输入</span>
                  </Button>
                </div>
              </div>
              <div className="flex justify-end pb-3">
                <Button
                  type="submit"
                  size="sm"
                  className={`px-4 py-1 flex items-center gap-2 rounded-full ${
                    isLoading || !userInput.trim() 
                      ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" 
                      : "bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                  } text-white transition-colors`}
                  disabled={isLoading || !userInput.trim()}
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="h-3 w-3 animate-spin" />
                      <span className="text-sm">AI分析中...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm">获取推荐</span>
                      <ChevronRight className="h-3 w-3" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="shadow-lg border bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-100 dark:border-purple-900/30">
            <CardContent className="pt-4 px-4">
              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-purple-100 dark:border-purple-900/30">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1 text-purple-700 dark:text-purple-300">AI分析结果</h3>
                  <div className="text-gray-700 dark:text-gray-300 p-2 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg text-sm">
                    {aiResponse}
                  </div>
                </div>
              </div>

              <div className="mb-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600 mb-3 text-white p-3">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mb-1">您的专属课程推荐</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md mx-auto">基于您的需求，我们精选了以下最适合您的课程</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg dark:shadow-gray-900/30 transition-all duration-300 hover:translate-y-[-4px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 group"
                  >
                    <div className="h-32 bg-purple-50 dark:bg-purple-900/20 relative overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                        onClick={() => handleImageClick(course.id)}
                      />
                      <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        {course.level.includes("beginner") ? "初级" : 
                         course.level.includes("intermediate") ? "中级" : "高级"}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-base mb-1 text-purple-700 dark:text-purple-300">{course.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">{course.description}</p>
                      
                      {/* 添加推荐理由 - 基于课程类别生成 */}
                      <div className="bg-purple-50 dark:bg-purple-900/10 rounded-md p-2 mb-3">
                        <p className="text-xs text-purple-700 dark:text-purple-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M12 2a10 10 0 1 0 10 10z"></path>
                            <path d="M12 12h-1"></path>
                            <path d="M12 2v1"></path>
                            <path d="M12 21v-1"></path>
                            <path d="m4.6 4.6.7.7"></path>
                            <path d="m19.4 19.4-.7-.7"></path>
                            <path d="m6 12-1 0"></path>
                            <path d="m19 12-1 0"></path>
                            <path d="m4.6 19.4.7-.7"></path>
                            <path d="m19.4 4.6-.7.7"></path>
                          </svg>
                          <span>
                            {course.category.includes("web") && "适合Web开发学习路径"}
                            {course.category.includes("data") && !course.category.includes("web") && "适合数据分析与处理学习"}
                            {course.category.includes("ai") && !course.category.includes("data") && !course.category.includes("web") && "适合人工智能学习方向"}
                          </span>
                        </p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-600 dark:group-hover:text-white transition-colors group-hover:border-transparent text-xs py-1"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center flex flex-wrap gap-3 justify-center pb-4 mb-2">
            <Button
              onClick={() => {
                setShowResults(false)
                setUserInput("")
              }}
              variant="outline"
              size="sm"
              className="bg-transparent border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 rounded-full text-xs"
            >
              重新提问
            </Button>
            <Button 
              onClick={onBack} 
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors px-4 rounded-full text-xs"
            >
              返回首页
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
