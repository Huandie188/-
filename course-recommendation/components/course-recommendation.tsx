"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Code, BookOpen, BrainCircuit, GraduationCap, ArrowLeft, Database, LineChart, Smartphone, Lock, Activity, Globe, Briefcase, Rocket, Clock, TrendingUp } from "lucide-react"

type Question = {
  id: number
  text: string
  options: {
    id: string
    text: string
    value: string
    icon?: React.ReactNode
  }[]
}

type Course = {
  id: string
  title: string
  description: string
  level: string
  category: string
  image: string
}

interface CourseRecommendationProps {
  onBack: () => void
  username: string
}

export default function CourseRecommendation({ onBack, username }: CourseRecommendationProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  // 添加占位图像点击事件处理函数
  const handleImageClick = (courseId: string) => {
    const aiCourseIds = ["1", "3", "5", "7", "9", "10"]
    if (aiCourseIds.includes(courseId)) {
      const courseInfo = {
        "1": { title: "Python编程基础", image: "/ai-course-1.jpg" },
        "3": { title: "数据科学与机器学习", image: "/ai-course-2.jpg" },
        "5": { title: "深度学习与神经网络", image: "/ai-course-3.jpg" },
        "7": { title: "云计算与DevOps实践", image: "/placeholder.svg?height=150&width=250" },
        "9": { title: "区块链技术与应用开发", image: "/placeholder.svg?height=150&width=250" },
        "10": { title: "大数据处理与分析", image: "/placeholder.svg?height=150&width=250" }
      }
      const info = courseInfo[courseId as keyof typeof courseInfo]
      alert(`请替换AI课程"${info.title}"的图像。\n您可以替换 'public${info.image}' 文件，推荐尺寸为800x450像素。`)
    }
  }

  const questions: Question[] = [
    {
      id: 1,
      text: "您的核心学习目标是什么？",
      options: [
        { 
          id: "academic", 
          text: "考研/升学（如计算机、金融等专业）", 
          value: "academic",
          icon: <GraduationCap className="h-5 w-5" />
        },
        { 
          id: "skill", 
          text: "职业技能提升（如编程、设计、项目管理）", 
          value: "skill",
          icon: <Briefcase className="h-5 w-5" />
        },
        { 
          id: "hobby", 
          text: "兴趣爱好拓展（如摄影、心理学、语言学习）", 
          value: "hobby",
          icon: <BookOpen className="h-5 w-5" />
        },
        { 
          id: "career_change", 
          text: "职场转型（如从传统行业转向AI、数据分析领域）", 
          value: "career_change",
          icon: <Rocket className="h-5 w-5" />
        },
      ],
    },
    {
      id: 2,
      text: "您当前在该领域的基础水平如何？",
      options: [
        { 
          id: "zero", 
          text: "零基础，完全从新开始", 
          value: "zero",
          icon: <Activity className="h-5 w-5" />
        },
        { 
          id: "weak", 
          text: "基础薄弱，需系统化巩固", 
          value: "weak",
          icon: <Activity className="h-5 w-5" />
        },
        { 
          id: "medium", 
          text: "中等水平，希望进阶提升", 
          value: "medium",
          icon: <Activity className="h-5 w-5" />
        },
        { 
          id: "advanced", 
          text: "熟练掌握，需要专项突破", 
          value: "advanced",
          icon: <Activity className="h-5 w-5" />
        },
      ],
    },
    {
      id: 3,
      text: "您更倾向哪种学习形式？",
      options: [
        { 
          id: "short_video", 
          text: "短视频+随堂测试（碎片化学习）", 
          value: "short_video",
          icon: <Smartphone className="h-5 w-5" />
        },
        { 
          id: "long_video", 
          text: "长课时直播+课后作业（深度系统学习）", 
          value: "long_video",
          icon: <Globe className="h-5 w-5" />
        },
        { 
          id: "interactive", 
          text: "交互式项目实战（如代码沙盒、设计工坊）", 
          value: "interactive",
          icon: <Code className="h-5 w-5" />
        },
        { 
          id: "community", 
          text: "社群讨论+导师答疑（协作式学习）", 
          value: "community",
          icon: <BrainCircuit className="h-5 w-5" />
        },
      ],
    },
    {
      id: 4,
      text: "您每周可投入的学习时间约为？",
      options: [
        { 
          id: "light", 
          text: "1-3小时（轻度学习）", 
          value: "light",
          icon: <Clock className="h-5 w-5" />
        },
        { 
          id: "medium", 
          text: "4-6小时（常规学习）", 
          value: "medium",
          icon: <Clock className="h-5 w-5" />
        },
        { 
          id: "high", 
          text: "7-10小时（高强度学习）", 
          value: "high",
          icon: <Clock className="h-5 w-5" />
        },
        { 
          id: "full", 
          text: "10小时以上（全职式学习）", 
          value: "full",
          icon: <Clock className="h-5 w-5" />
        },
      ],
    },
    {
      id: 5,
      text: "您是否关注当前市场热门技能趋势？",
      options: [
        { 
          id: "high_salary", 
          text: "是，希望学习高薪技能（如AI提示工程、低代码开发）", 
          value: "high_salary",
          icon: <TrendingUp className="h-5 w-5" />
        },
        { 
          id: "personal_interest", 
          text: "否，优先满足个人兴趣或已有规划", 
          value: "personal_interest",
          icon: <BookOpen className="h-5 w-5" />
        },
        { 
          id: "long_term", 
          text: "是，但需结合长期职业发展（如绿色能源、生物科技）", 
          value: "long_term",
          icon: <LineChart className="h-5 w-5" />
        },
        { 
          id: "undecided", 
          text: "不确定，需系统评估后推荐", 
          value: "undecided",
          icon: <Database className="h-5 w-5" />
        },
      ],
    },
  ]

  const courses: Course[] = [
    {
      id: "1",
      title: "Python编程基础",
      description: "适合零基础学习者的Python入门课程，通过简单易懂的实例学习编程基础知识。",
      level: "beginner",
      category: "web,data,ai",
      image: "/ai-course-1.jpg",
    },
    {
      id: "2",
      title: "JavaScript全栈开发",
      description: "从前端到后端，全面掌握JavaScript开发技能，构建完整Web应用。",
      level: "intermediate",
      category: "web",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "3",
      title: "数据科学与机器学习",
      description: "学习数据分析、可视化和机器学习算法，解决实际问题。",
      level: "intermediate-advanced",
      category: "data,ai",
      image: "/ai-course-2.jpg",
    },
    {
      id: "4",
      title: "React Native移动应用开发",
      description: "使用React Native构建跨平台移动应用，一次编写随处运行。",
      level: "intermediate",
      category: "mobile",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "5",
      title: "深度学习与神经网络",
      description: "深入学习神经网络原理与实践，构建智能系统和模型。",
      level: "advanced",
      category: "ai",
      image: "/ai-course-3.jpg",
    },
    {
      id: "6",
      title: "Web前端开发入门",
      description: "学习HTML、CSS和JavaScript基础，开始您的Web开发之旅。",
      level: "beginner",
      category: "web",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "7",
      title: "云计算与DevOps实践",
      description: "掌握AWS、Docker、Kubernetes等云服务和自动化部署工具，打造高效开发运维流程。",
      level: "intermediate-advanced",
      category: "cloud,devops",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "8",
      title: "UI/UX设计与用户研究",
      description: "学习界面设计原则、用户体验方法论和原型工具，打造出色的数字产品体验。",
      level: "beginner-intermediate",
      category: "design,web",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "9",
      title: "区块链技术与应用开发",
      description: "了解区块链核心概念，学习智能合约开发，构建去中心化应用(DApps)。",
      level: "intermediate",
      category: "blockchain,web3",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "10",
      title: "大数据处理与分析",
      description: "学习Hadoop、Spark等大数据框架，掌握海量数据处理、分析与可视化技术。",
      level: "intermediate-advanced",
      category: "data,bigdata",
      image: "/placeholder.svg?height=150&width=250",
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (optionValue: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionValue,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
  }

  const getRecommendedCourses = () => {
    // 简单的推荐逻辑，根据用户回答筛选课程
    const learningGoal = answers[1] || ""
    const skillLevel = answers[2] || ""
    const learningFormat = answers[3] || ""
    const timeCommitment = answers[4] || ""
    const trendAwareness = answers[5] || ""

    let filteredCourses = [...courses]

    // 根据学习目标筛选
    if (learningGoal === "academic") {
      filteredCourses = filteredCourses.filter(course => 
        course.category.includes("data") || course.category.includes("ai") || course.category.includes("bigdata"))
    } else if (learningGoal === "skill") {
      filteredCourses = filteredCourses.filter(course => 
        course.category.includes("web") || course.category.includes("mobile") || 
        course.category.includes("cloud") || course.category.includes("devops"))
    } else if (learningGoal === "hobby") {
      filteredCourses = filteredCourses.filter(course => 
        course.category.includes("design") || course.category.includes("web"))
    } else if (learningGoal === "career_change") {
      filteredCourses = filteredCourses.filter(course => 
        course.category.includes("ai") || course.category.includes("data") || 
        course.category.includes("blockchain") || course.category.includes("web3") || 
        course.category.includes("cloud"))
    }

    // 根据技能水平筛选
    if (skillLevel) {
      if (skillLevel === "zero" || skillLevel === "weak") {
        filteredCourses = filteredCourses.filter((course) => 
          course.level.includes("beginner"))
      } else if (skillLevel === "medium") {
        filteredCourses = filteredCourses.filter((course) => 
          course.level.includes("intermediate"))
      } else if (skillLevel === "advanced") {
        filteredCourses = filteredCourses.filter((course) => 
          course.level.includes("advanced") || course.level.includes("intermediate"))
      }
    }

    // 根据热门趋势筛选
    if (trendAwareness === "high_salary") {
      // 优先推荐AI、区块链、云计算等高薪技能
      const trendingCourses = filteredCourses.filter(course => 
        course.category.includes("ai") || course.category.includes("blockchain") || 
        course.category.includes("cloud") || course.category.includes("web3"))
      
      if (trendingCourses.length > 0) {
        filteredCourses = trendingCourses
      }
    } else if (trendAwareness === "long_term") {
      // 优先推荐大数据、云计算等长期发展方向
      const longTermCourses = filteredCourses.filter(course => 
        course.category.includes("data") || course.category.includes("bigdata") || 
        course.category.includes("cloud") || course.category.includes("devops"))
      
      if (longTermCourses.length > 0) {
        filteredCourses = longTermCourses
      }
    }

    // 限制返回课程数量，最多6门课程
    filteredCourses = filteredCourses.slice(0, 6)
    
    // 如果没有匹配的课程，返回所有课程
    return filteredCourses.length > 0 ? filteredCourses : courses.slice(0, 6)
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      {/* 左侧装饰图标区域 */}
      <div className="absolute left-0 top-1/4 -translate-x-20 opacity-15 z-0 hidden lg:block">
        <div className="mb-20">
          <Code className="h-20 w-20 text-blue-500 dark:text-blue-400" />
          <div className="h-60 w-1 bg-gradient-to-b from-blue-500 to-transparent ml-10 mt-3 opacity-20"></div>
        </div>
        <div className="mt-32">
          <BookOpen className="h-20 w-20 text-blue-500 dark:text-blue-400" />
          <div className="h-60 w-1 bg-gradient-to-t from-blue-500 to-transparent ml-10 mt-3 opacity-20"></div>
        </div>
      </div>
      
      {/* 右侧装饰图标区域 */}
      <div className="absolute right-0 top-1/3 translate-x-20 opacity-15 z-0 hidden lg:block">
        <div className="mb-20">
          <BrainCircuit className="h-20 w-20 text-blue-500 dark:text-blue-400" />
          <div className="h-60 w-1 bg-gradient-to-b from-blue-500 to-transparent ml-10 mt-3 opacity-20"></div>
        </div>
        <div className="mt-40">
          <GraduationCap className="h-20 w-20 text-blue-500 dark:text-blue-400" />
          <div className="h-60 w-1 bg-gradient-to-t from-blue-500 to-transparent ml-10 mt-3 opacity-20"></div>
        </div>
      </div>
      
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="sr-only">返回</span>
        </Button>
        <div className="text-center flex-1">
          {/* 删除标题，不需要任何替代内容 */}
        </div>
        <div className="w-10"></div> {/* 占位，保持布局平衡 */}
      </div>

      {!showResults ? (
        <Card className="shadow-lg border bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-blue-100 dark:border-blue-900/30 relative z-10">
          <CardContent className="pt-6 px-6">
            <div className="mb-6">
              <div className="flex justify-between text-base text-gray-600 dark:text-gray-400 mb-2">
                <span>
                  问题 {currentQuestionIndex + 1} / {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-6">{currentQuestion.text}</h2>

            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`flex items-center p-5 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:translate-y-[-2px] ${
                    answers[currentQuestion.id] === option.value
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600 shadow-md"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  }`}
                  data-state={answers[currentQuestion.id] === option.value ? "selected" : "unselected"}
                >
                  <div className={`mr-4 ${answers[currentQuestion.id] === option.value ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
                    {option.icon || <GraduationCap className="h-7 w-7" />}
                  </div>
                  <span className={`text-lg ${answers[currentQuestion.id] === option.value ? "font-medium text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"}`}>
                    {option.text}
                  </span>
                  {answers[currentQuestion.id] === option.value && (
                    <CheckCircle className="ml-auto h-6 w-6 text-blue-500 dark:text-blue-400" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pb-6">
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className={`w-full sm:w-auto px-8 py-3 text-lg ${
                  !answers[currentQuestion.id] 
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                } text-white transition-colors`}
              >
                {currentQuestionIndex < questions.length - 1 ? "下一题 →" : "查看结果"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="relative z-10">
          <Card className="shadow-lg border bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-100 dark:border-green-900/30 mb-6">            
            <CardContent className="pt-6 px-6">
              <div className="mb-5 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">您的专属课程推荐</h2>
                <p className="text-base text-gray-600 dark:text-gray-300">根据您的回答，我们为您推荐以下课程：</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getRecommendedCourses().map((course) => (
                  <div
                    key={course.id}
                    className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md dark:shadow-gray-900/30 transition-all duration-300 hover:translate-y-[-2px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className={`w-full h-full object-cover ${["1", "3", "5", "7", "9", "10"].includes(course.id) ? "cursor-pointer" : ""}`}
                        onClick={() => handleImageClick(course.id)}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">{course.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{course.description}</p>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-md p-3 mb-4">
                        <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="m9 10 3 3 3-3"></path>
                            <path d="M3 6h18v12H3z"></path>
                          </svg>
                          <span>
                            {answers[2] === "zero" && "适合您的零基础水平"}
                            {answers[2] === "weak" && "针对您需巩固的基础知识"}
                            {answers[2] === "medium" && "根据您的中级水平定制"}
                            {answers[2] === "advanced" && "满足您专项突破的需求"}
                            {answers[1] && ` · 符合您${
                              answers[1] === "academic" ? "考研/升学" :
                              answers[1] === "skill" ? "职业技能提升" :
                              answers[1] === "hobby" ? "兴趣爱好拓展" :
                              answers[1] === "career_change" ? "职场转型" : ""
                            }的目标`}
                          </span>
                        </p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="default"
                        className="w-full border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm py-2"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center flex flex-wrap gap-4 justify-center pb-4 mb-2">
            <Button 
              onClick={handleRestart} 
              variant="outline" 
              size="default"
              className="bg-transparent border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm px-5 py-2"
            >
              重新测评
            </Button>
            <Button 
              onClick={onBack} 
              size="default"
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm px-5 py-2"
            >
              返回首页
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
