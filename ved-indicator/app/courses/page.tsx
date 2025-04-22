"use client"

import Link from "next/link"
import { useState } from "react"
import {
  User,
  Settings,
  Moon,
  Sun,
  Search,
  Mic,
  Image as ImageIcon,
  ChevronDown,
  ChevronRight,
  Flame,
  Diamond,
  ArrowRight,
  MessageSquare,
  Filter,
  BarChart2,
  SlidersHorizontal,
  X,
  Plus,
  Clock,
  PlusCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

export default function CoursesPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [showComparePanel, setShowComparePanel] = useState(true)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [coursesPerPage] = useState(4)
  
  // 添加智能权重调整的状态变量
  const [jobMatchWeight, setJobMatchWeight] = useState(40)
  const [trendWeight, setTrendWeight] = useState(30)
  const [localHeatWeight, setLocalHeatWeight] = useState(20)
  const [interestWeight, setInterestWeight] = useState(10)
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const toggleCourseSelection = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId))
    } else {
      if (selectedCourses.length < 3) {
        setSelectedCourses([...selectedCourses, courseId])
      }
    }
  }

  const courseList = [
    {
      id: "course1",
      title: "大型语言模型应用开发与实践",
      provider: "深蓝学院",
      instructor: "张教授",
      level: 4,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+45%",
      heat: 92,
      tags: ["AI", "LLM", "Python"],
      description: "从零开始学习大型语言模型的应用开发，包含实战项目和部署经验",
      duration: "8周",
      status: "最新认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "course2",
      title: "云原生微服务架构设计",
      provider: "极客时间",
      instructor: "李教授",
      level: 3,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+32%",
      heat: 85,
      tags: ["微服务", "Docker", "Kubernetes"],
      description: "学习现代云原生应用的设计模式和最佳实践，掌握容器化部署技术",
      duration: "10周",
      status: "大纲已变更",
      statusColor: "red",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "course3",
      title: "数据分析与可视化进阶",
      provider: "数据领航",
      instructor: "王教授",
      level: 3,
      updatedAt: "2周前",
      responseRate: "慢速",
      trend: "+28%",
      heat: 78,
      tags: ["数据分析", "Python", "可视化"],
      description: "深入理解数据分析技术，学习高级可视化方法，提升数据洞察能力",
      duration: "6周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "course4",
      title: "机器学习算法工程应用",
      provider: "人工智能学院",
      instructor: "刘教授",
      level: 4,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+38%",
      heat: 88,
      tags: ["机器学习", "算法", "Python"],
      description: "将机器学习算法应用于实际工程问题，掌握从模型到产品的完整流程",
      duration: "12周",
      status: "最新认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "低"
    },
    {
      id: "course5",
      title: "前端开发全栈进阶实战",
      provider: "前端大学",
      instructor: "陈教授",
      level: 3,
      updatedAt: "1天前",
      responseRate: "快速",
      trend: "+42%",
      heat: 90,
      tags: ["React", "Vue", "Node.js"],
      description: "从基础到高级，全面掌握现代前端开发技术栈和全栈开发能力",
      duration: "14周",
      status: "最新认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "course6",
      title: "区块链与智能合约开发",
      provider: "区块链学院",
      instructor: "赵教授",
      level: 5,
      updatedAt: "4天前",
      responseRate: "一般",
      trend: "+35%",
      heat: 82,
      tags: ["区块链", "以太坊", "Solidity"],
      description: "学习区块链核心原理与智能合约开发，掌握DApp应用开发技能",
      duration: "12周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "course7",
      title: "网络安全渗透测试实践",
      provider: "安全攻防学院",
      instructor: "黄教授",
      level: 4,
      updatedAt: "1周前",
      responseRate: "快速",
      trend: "+30%",
      heat: 86,
      tags: ["网络安全", "渗透测试", "安全防护"],
      description: "从攻防两方面深入了解网络安全，掌握安全漏洞检测与修复技术",
      duration: "10周",
      status: "最新认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "course8",
      title: "移动应用开发与用户体验",
      provider: "移动技术社区",
      instructor: "吴教授",
      level: 3,
      updatedAt: "3天前",
      responseRate: "一般",
      trend: "+25%",
      heat: 80,
      tags: ["移动开发", "UI/UX", "Flutter"],
      description: "学习跨平台移动应用开发，提升用户体验设计能力与技术实现",
      duration: "8周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "course9",
      title: "DevOps与CI/CD流水线搭建",
      provider: "云原生学院",
      instructor: "林教授",
      level: 4,
      updatedAt: "6天前",
      responseRate: "慢速",
      trend: "+33%",
      heat: 84,
      tags: ["DevOps", "CI/CD", "自动化"],
      description: "掌握现代开发运维一体化实践，提升团队协作与软件交付效率",
      duration: "9周",
      status: "大纲已变更",
      statusColor: "red",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "course10",
      title: "物联网开发与智能家居应用",
      provider: "物联网研究院",
      instructor: "郑教授",
      level: 3,
      updatedAt: "2周前",
      responseRate: "快速",
      trend: "+28%",
      heat: 79,
      tags: ["IoT", "嵌入式", "Arduino"],
      description: "学习物联网设备开发与智能家居系统集成，实现智能化应用场景",
      duration: "11周",
      status: "最新认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "course11",
      title: "数据库优化与高性能架构",
      provider: "数据库技术社区",
      instructor: "孙教授",
      level: 4,
      updatedAt: "5天前",
      responseRate: "一般",
      trend: "+31%",
      heat: 83,
      tags: ["数据库", "性能优化", "分布式"],
      description: "掌握主流数据库性能调优技术，设计高并发高可用数据架构",
      duration: "7周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "course12",
      title: "自然语言处理与文本挖掘",
      provider: "AI技术社区",
      instructor: "钱教授",
      level: 5,
      updatedAt: "1周前",
      responseRate: "快速",
      trend: "+40%",
      heat: 89,
      tags: ["NLP", "文本挖掘", "机器学习"],
      description: "深入学习自然语言处理技术，实现智能文本分析与信息抽取",
      duration: "10周",
      status: "最新认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    }
  ]

  // 侧边栏筛选条件
  const filterCategories = [
    {
      name: "技术领域",
      options: ["人工智能", "Web开发", "移动开发", "DevOps", "数据科学", "云计算", "安全"]
    },
    {
      name: "难度级别",
      options: ["入门", "初级", "中级", "高级", "专家"]
    },
    {
      name: "更新状态",
      options: ["最新认证", "更新中", "大纲已变更"]
    },
    {
      name: "课程时长",
      options: ["1-4周", "5-8周", "9-12周", "12周以上"]
    }
  ]

  // 职业路径数据
  const careerPaths = [
    {
      name: "AI工程师",
      subPaths: ["算法工程师", "AI应用开发", "MLOps工程师"]
    },
    {
      name: "全栈开发",
      subPaths: ["前端开发", "后端开发", "DevOps"]
    },
    {
      name: "数据科学家",
      subPaths: ["数据分析师", "数据工程师", "机器学习工程师"]
    }
  ]

  // 计算当前页的课程
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = courseList.slice(indexOfFirstCourse, indexOfLastCourse)
  
  // 计算总页数
  const totalPages = Math.ceil(courseList.length / coursesPerPage)
  
  // 模拟更多页面 - 但不显示具体的最终页码
  const displayTotalPages = totalPages + 5  // 这个值仍然保留用于计算

  // 渲染分页按钮
  const renderPaginationButtons = () => {
    const buttons = []
    
    // 始终显示第一页
    buttons.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => handlePageChange(1)}
        className={`w-8 h-8 p-0 rounded-lg ${
          currentPage === 1 
            ? "bg-primary-500 text-white" 
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        1
      </Button>
    )
    
    // 如果当前页大于3，显示前省略号
    if (currentPage > 3) {
      buttons.push(
        <div key="start-ellipsis" className="flex items-center justify-center w-8 h-8">
          <span className="text-gray-500">...</span>
        </div>
      )
    }
    
    // 显示当前页附近的页码
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(displayTotalPages - 1, currentPage + 1); i++) {
      if (i > 1 && i < displayTotalPages) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 p-0 rounded-lg ${
              currentPage === i 
                ? "bg-primary-500 text-white" 
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {i}
          </Button>
        )
      }
    }
    
    // 始终显示后省略号，表示有更多页面，但不显示具体的最后一页
    if (currentPage < displayTotalPages - 1) {
      buttons.push(
        <div key="end-ellipsis" className="flex items-center justify-center w-8 h-8">
          <span className="text-gray-500">...</span>
        </div>
      )
    }
    
    return buttons
  }

  // 页面变化处理函数
  const handlePageChange = (pageNumber: number) => {
    // 限制页码范围在1到实际总页数之间
    const validPage = Math.max(1, Math.min(pageNumber, totalPages))
    setCurrentPage(validPage)
    // 页面滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb] dark:bg-gray-950">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md dark:bg-gray-950/95 dark:border-gray-800 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/5.png" alt="EduFusion" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              EduFusion
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium flex-1 justify-center">
            <Link href={process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL || 'http://localhost:3001'} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              AI课程推荐
            </Link>
            <Link href="/courses" className="transition-colors text-primary-600 py-1 border-b-2 border-primary-500">
              在线课程
            </Link>
            <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL || 'http://localhost:3004'} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              个人学习路线
            </Link>
            <Link href="/profile" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              个人信息
            </Link>
            <Link href="/community" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              用户社区
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">用户</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">切换主题</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">设置</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container pt-24 pb-16 flex flex-col lg:flex-row gap-6">
        {/* 左侧筛选面板 - 在移动端可收起 */}
        <aside className="w-full lg:w-1/5 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-lg font-semibold mb-4">多模态搜索</h2>
            
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="适合转行AI的实战课..." 
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-lg text-xs">
                  <Mic className="h-3.5 w-3.5 mr-1" /> 语音搜索
                </Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-lg text-xs">
                  <ImageIcon className="h-3.5 w-3.5 mr-1" /> 截图识别
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-lg font-semibold mb-4">智能权重调整</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>岗位匹配度</span>
                  <span className="font-medium text-blue-600">{jobMatchWeight}%</span>
                </div>
                <Slider defaultValue={[jobMatchWeight]} max={100} step={5} onValueChange={(value) => setJobMatchWeight(value[0])} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>趋势预测值</span>
                  <span className="font-medium text-blue-600">{trendWeight}%</span>
                </div>
                <Slider defaultValue={[trendWeight]} max={100} step={5} onValueChange={(value) => setTrendWeight(value[0])} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>同城选课热度</span>
                  <span className="font-medium text-blue-600">{localHeatWeight}%</span>
                </div>
                <Slider defaultValue={[localHeatWeight]} max={100} step={5} onValueChange={(value) => setLocalHeatWeight(value[0])} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>个人兴趣偏好</span>
                  <span className="font-medium text-blue-600">{interestWeight}%</span>
                </div>
                <Slider defaultValue={[interestWeight]} max={100} step={5} onValueChange={(value) => setInterestWeight(value[0])} />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">职业路径</h2>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
            
            <div className="space-y-3">
              {careerPaths.map((path, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="font-medium">{path.name}</span>
                  </div>
                  
                  <div className="pl-6 space-y-1.5">
                    {path.subPaths.map((subPath, subIndex) => (
                      <div key={subIndex} className="flex items-center">
                        <Checkbox id={`${path.name}-${subPath}`} className="mr-2" />
                        <label htmlFor={`${path.name}-${subPath}`} className="text-sm text-gray-600 dark:text-gray-400">
                          {subPath}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-lg font-semibold mb-4">动态维度筛选</h2>
            
            {filterCategories.map((category, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-sm font-medium mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.options.map((option, optionIndex) => (
                    <Badge 
                      key={optionIndex} 
                      variant="outline" 
                      className="cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        
        {/* 中间课程列表 */}
        <div className="w-full lg:w-3/5 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">探索课程</h1>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="rounded-lg flex items-center gap-1">
                  <Filter className="h-4 w-4" /> 筛选
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-lg flex items-center gap-1">
                      <SlidersHorizontal className="h-4 w-4" /> 排序
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>热度排序</DropdownMenuItem>
                    <DropdownMenuItem>最新发布</DropdownMenuItem>
                    <DropdownMenuItem>趋势上升</DropdownMenuItem>
                    <DropdownMenuItem>难度递增</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Tabs defaultValue="recommended">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger value="recommended" className="rounded-md text-sm">
                  推荐课程
                </TabsTrigger>
                <TabsTrigger value="trending" className="rounded-md text-sm">
                  趋势新课
                </TabsTrigger>
                <TabsTrigger value="popular" className="rounded-md text-sm">
                  热门选择
                </TabsTrigger>
                <TabsTrigger value="career" className="rounded-md text-sm">
                  岗位定制
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
              <span>共找到3214个相关课程</span>
              <span>已选择: {selectedCourses.length}/3</span>
            </div>
          </div>
          
          {/* 课程卡片列表 */}
          <div className="space-y-4">
            {currentCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex p-4 md:p-6">
                  {/* 课程信息 */}
                  <div className="flex-1 pr-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          {course.rarityLevel === "高" && (
                            <Diamond className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>{course.provider}</span>
                          <span className="mx-2">•</span>
                          <span>{course.instructor}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant={selectedCourses.includes(course.id) ? "default" : "outline"} 
                        size="sm" 
                        className="rounded-full"
                        onClick={() => toggleCourseSelection(course.id)}
                      >
                        {selectedCourses.includes(course.id) ? (
                          <X className="h-4 w-4 mr-1" />
                        ) : (
                          <Plus className="h-4 w-4 mr-1" />
                        )}
                        {selectedCourses.includes(course.id) ? "取消" : "对比"}
                      </Button>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{course.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                          {tag}
                        </Badge>
                      ))}
                      <Badge 
                        className={`${
                          course.statusColor === "green" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : course.statusColor === "red"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                        }`}
                      >
                        {course.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-sm">难度:</span>
                        <div className="ml-1 w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-green-400 to-purple-500" 
                            style={{ width: `${course.level * 20}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className={
                          course.responseRate === "快速" 
                            ? "text-green-500" 
                            : course.responseRate === "一般"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }>
                          {course.responseRate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 右侧热度与趋势 */}
                  <div className="hidden sm:flex flex-col justify-between items-end min-w-[100px]">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-1 text-amber-500">
                        <Flame className="h-4 w-4" />
                        <span className="font-semibold">{course.heat}</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        未来需求{course.trend}
                      </span>
                    </div>
                    
                    <Link href={`/courses/${course.id}`}>
                      <Button variant="ghost" size="sm" className="rounded-lg text-xs px-2">
                        <ArrowRight className="h-3.5 w-3.5 mr-1" />
                        查看详情
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
            
            {/* 分页控制 */}
            <div className="flex justify-center mt-8 space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                上一页
              </Button>
              
              <div className="flex space-x-1">
                {renderPaginationButtons()}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg"
              >
                下一页
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 ml-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* 右侧对比面板 - 可折叠 */}
        <aside className={`w-full lg:w-1/5 space-y-6 ${showComparePanel ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 sticky top-24 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">课程对比</h2>
              <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setShowComparePanel(!showComparePanel)}>
                {showComparePanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
            
            {selectedCourses.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
                  <BarChart2 className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  选择最多3门课程进行对比
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedCourses.map((courseId) => {
                  const course = courseList.find(c => c.id === courseId)
                  if (!course) return null
                  
                  return (
                    <div key={courseId} className="border border-gray-100 dark:border-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm line-clamp-2">{course.title}</h4>
                          <p className="text-xs text-gray-500">{course.provider}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0 rounded-full"
                          onClick={() => toggleCourseSelection(courseId)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-2 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span>难度</span>
                          <span>{course.level}/5</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>时长</span>
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>未来趋势</span>
                          <span className="text-green-600">{course.trend}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {selectedCourses.length >= 2 && (
                  <div className="pt-2">
                    <Button className="w-full rounded-lg">
                      生成最优学习路径
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  )
}

interface ChevronLeftProps {
  className?: string;
}

function ChevronLeft(props: ChevronLeftProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
} 