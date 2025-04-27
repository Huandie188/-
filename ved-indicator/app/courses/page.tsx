"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
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
  ChevronLeft as ChevronLeftIcon,
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
  PlusCircle,
  Layers,
  BarChart,
  Tag,
  Sliders,
  Bookmark,
  Star,
  ArrowUpDown,
  Calculator,
  Calendar,
  CreditCard,
  Smile,
  Award,
  Users,
  Zap,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Layout,
  BrainCircuit,
  Compass,
  Cpu,
  Wallet,
  Building2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { TrendChart } from "@/components/TrendChart"

// 定义课程类型接口
interface Course {
  id: string;
  title: string;
  provider: string;
  instructor: string;
  level: number;
  updatedAt: string;
  responseRate: string;
  trend: string;
  heat: number;
  tags: string[];
  description: string;
  duration: string;
  status: string;
  statusColor: string;
  imageSrc: string;
  rarityLevel: string;
}

export default function CoursesPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [showComparePanel, setShowComparePanel] = useState(true)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [coursesPerPage] = useState(4)
  
  // 添加搜索相关状态
  const [searchTerm, setSearchTerm] = useState("")
  const [searchMode, setSearchMode] = useState<"text" | "voice" | "image">("text")
  const [isSearching, setIsSearching] = useState(false)
  
  // 添加智能权重调整的状态变量
  const [jobMatchWeight, setJobMatchWeight] = useState(40)
  const [trendWeight, setTrendWeight] = useState(30)
  const [localHeatWeight, setLocalHeatWeight] = useState(20)
  const [interestWeight, setInterestWeight] = useState(10)
  
  // 添加当前选中的标签页状态
  const [selectedTab, setSelectedTab] = useState<"recommended" | "trending" | "career">("recommended")
  
  // 添加职位偏好状态
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null)
  
  // 添加职业子路径选择状态
  const [selectedSubPaths, setSelectedSubPaths] = useState<{[key: string]: string[]}>({
    "AI工程师": [],
    "全栈开发": [],
    "数据科学家": []
  })
  
  // 添加职业路径展开/收起状态
  const [expandedPaths, setExpandedPaths] = useState<{[key: string]: boolean}>({
    "AI工程师": true,
    "全栈开发": true,
    "数据科学家": true
  })

  // 添加动态维度筛选状态
  const [showDimensionFilter, setShowDimensionFilter] = useState(true)
  const [activeDimensions, setActiveDimensions] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({
    "技术领域": [],
    "难度级别": [],
    "更新状态": [],
    "课程时长": []
  })

  // 添加课程数据状态及加载状态
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 从API获取课程数据
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('获取课程数据失败');
        }
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('获取课程数据错误:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

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

  // 切换职业路径展开/收起状态
  const togglePathExpansion = (pathName: string) => {
    setExpandedPaths({
      ...expandedPaths,
      [pathName]: !expandedPaths[pathName]
    })
  }
  
  // 选择或取消选择子路径
  const toggleSubPath = (pathName: string, subPath: string) => {
    const currentSubPaths = selectedSubPaths[pathName] || []
    const newSubPaths = currentSubPaths.includes(subPath)
      ? currentSubPaths.filter(p => p !== subPath)
      : [...currentSubPaths, subPath]
    
    setSelectedSubPaths({
      ...selectedSubPaths,
      [pathName]: newSubPaths
    })
    
    // 同时设置当前选择的职业路径
    if (newSubPaths.length > 0 && !selectedCareerPath) {
      setSelectedCareerPath(pathName)
    } else if (newSubPaths.length === 0 && selectedCareerPath === pathName) {
      // 检查是否所有路径都没有选择
      const anyPathSelected = Object.values(selectedSubPaths)
        .some(paths => paths.filter(p => p !== subPath).length > 0)
      
      if (!anyPathSelected) {
        setSelectedCareerPath(null)
      }
    }
    
    // 设置选项卡为"岗位定制"
    setSelectedTab("career")
  }

  // 添加标签页切换处理函数
  const handleTabChange = (value: string) => {
    setSelectedTab(value as "recommended" | "trending" | "career")
    setCurrentPage(1) // 切换标签页时重置到第一页
  }
  
  // 获取与职业路径相关的标签
  const getRelevantTagsForCareer = (careerPath: string, subPaths: string[] = []) => {
    // 基础标签，根据职业路径提供默认标签
    let baseTags: string[] = [];
    
    switch(careerPath) {
      case "AI工程师":
        baseTags = ["AI", "机器学习", "深度学习", "大模型", "LLM", "Python"];
        break;
      case "全栈开发":
        baseTags = ["Web开发", "前端", "后端", "React", "Vue", "Node.js"];
        break;
      case "数据科学家":
        baseTags = ["数据分析", "数据可视化", "大数据", "Python", "R"];
        break;
      default:
        return [];
    }
    
    // 如果没有选择子路径，返回基础标签
    if (!subPaths || subPaths.length === 0) {
      return baseTags;
    }
    
    // 根据选择的子路径增加特定标签
    const specificTags: {[key: string]: string[]} = {
      // AI工程师子路径
      "算法工程师": ["算法", "机器学习", "数学", "优化"],
      "AI应用开发": ["应用开发", "API", "集成", "LLM", "大模型"],
      "MLOps工程师": ["MLOps", "DevOps", "部署", "监控", "自动化"],
      
      // 全栈开发子路径
      "前端开发": ["前端", "UI", "React", "Vue", "CSS", "JavaScript"],
      "后端开发": ["后端", "API", "数据库", "服务器", "Node.js", "Java", "Python"],
      "DevOps": ["DevOps", "CI/CD", "容器化", "Docker", "Kubernetes"],
      
      // 数据科学家子路径
      "数据分析师": ["数据分析", "统计", "可视化", "报表", "BI"],
      "数据工程师": ["数据工程", "ETL", "数据仓库", "大数据", "Hadoop", "Spark"],
      "机器学习工程师": ["机器学习", "算法", "模型", "训练", "Python", "TensorFlow"]
    };
    
    // 合并所有选中子路径的标签
    const additionalTags = subPaths.flatMap(subPath => specificTags[subPath] || []);
    
    // 合并标签并去重
    return [...new Set([...baseTags, ...additionalTags])];
  }
  
  // 计算课程综合得分
  const calculateCourseScore = (course: Course) => {
    const trendScore = parseInt(course.trend.replace('+', '')) * (trendWeight / 100);
    const heatScore = course.heat * (localHeatWeight / 100);
    const jobScore = (course.level >= 3 ? 100 : 50) * (jobMatchWeight / 100); // 简化的岗位匹配度
    const interestScore = course.tags.includes("AI") ? 100 : 50 * (interestWeight / 100); // 简化的兴趣匹配度
    
    return trendScore + heatScore + jobScore + interestScore;
  }

  // 显示加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">加载课程数据中...</p>
        </div>
      </div>
    );
  }

  // 如果没有数据，显示空状态
  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg mb-4">暂无课程数据</p>
          <Button>刷新</Button>
        </div>
      </div>
    );
  }

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

  // 搜索功能
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    
    // 模拟搜索延迟
    setTimeout(() => {
      setIsSearching(false);
    }, 800);
  }
  
  // 切换搜索模式
  const toggleSearchMode = (mode: "text" | "voice" | "image") => {
    setSearchMode(mode);
    
    if (mode === "voice") {
      // 这里可以添加语音识别逻辑
      alert("语音搜索功能已启动");
    } else if (mode === "image") {
      // 这里可以添加图像识别逻辑
      alert("图像识别功能已启动");
    }
  }
  
  // 处理维度选择
  const toggleDimension = (dimension: string) => {
    if (activeDimensions.includes(dimension)) {
      setActiveDimensions(activeDimensions.filter(d => d !== dimension))
    } else {
      setActiveDimensions([...activeDimensions, dimension])
    }
  }

  // 处理筛选选项选择
  const toggleFilter = (category: string, option: string) => {
    const currentFilters = selectedFilters[category] || []
    
    if (currentFilters.includes(option)) {
      setSelectedFilters({
        ...selectedFilters,
        [category]: currentFilters.filter(o => o !== option)
      })
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [category]: [...currentFilters, option]
      })
    }
  }

  // 清除所有筛选条件
  const clearAllFilters = () => {
    setSelectedFilters({
      "技术领域": [],
      "难度级别": [],
      "更新状态": [],
      "课程时长": []
    })
  }

  // 获取活跃筛选条件总数
  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((count, filters) => count + filters.length, 0)
  }

  // 根据筛选条件过滤课程
  const filterCoursesByDimensions = (courses: Course[]) => {
    // 如果没有选择任何筛选条件，返回原列表
    if (getActiveFilterCount() === 0) return courses
    
    return courses.filter(course => {
      // 技术领域筛选 (基于标签)
      if (selectedFilters["技术领域"].length > 0 && 
          !selectedFilters["技术领域"].some(tech => course.tags.includes(tech))) {
        return false
      }
      
      // 难度级别筛选
      if (selectedFilters["难度级别"].length > 0) {
        const levelMap: {[key: string]: number} = {
          "入门": 1,
          "初级": 2,
          "中级": 3,
          "高级": 4,
          "专家": 5
        }
        const courseLevelName = Object.keys(levelMap).find(key => levelMap[key] === course.level)
        if (!courseLevelName || !selectedFilters["难度级别"].includes(courseLevelName)) {
          return false
        }
      }
      
      // 更新状态筛选
      if (selectedFilters["更新状态"].length > 0 && 
          !selectedFilters["更新状态"].includes(course.status)) {
        return false
      }
      
      // 课程时长筛选
      if (selectedFilters["课程时长"].length > 0) {
        const durationWeeks = parseInt(course.duration.replace("周", ""))
        let matches = false
        
        selectedFilters["课程时长"].forEach(range => {
          if (range === "1-4周" && durationWeeks >= 1 && durationWeeks <= 4) matches = true
          if (range === "5-8周" && durationWeeks >= 5 && durationWeeks <= 8) matches = true
          if (range === "9-12周" && durationWeeks >= 9 && durationWeeks <= 12) matches = true
          if (range === "12周以上" && durationWeeks > 12) matches = true
        })
        
        if (!matches) return false
      }
      
      return true
    })
  }
  
  // 根据不同标签过滤课程
  const getFilteredCoursesByTab = () => {
    let filtered = searchTerm.trim() === "" 
      ? courses 
      : courses.filter(course => 
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    
    // 应用动态维度筛选
    filtered = filterCoursesByDimensions(filtered)
    
    switch (selectedTab) {
      case "trending":
        // 按趋势升序排序 (去掉+号并转为数字)
        return filtered.sort((a, b) => 
          parseInt(b.trend.replace('+', '')) - parseInt(a.trend.replace('+', ''))
        );
      
      case "career":
        if (selectedCareerPath) {
          // 获取当前选中的子路径
          const activeSubPaths = selectedSubPaths[selectedCareerPath] || [];
          
          // 获取与选中职业路径和子路径相关的标签
          const relevantTags = getRelevantTagsForCareer(selectedCareerPath, activeSubPaths);
          
          return filtered.sort((a, b) => {
            // 计算每个课程与标签的匹配度
            const aRelevance = a.tags.filter(tag => relevantTags.includes(tag)).length;
            const bRelevance = b.tags.filter(tag => relevantTags.includes(tag)).length;
            
            // 如果匹配度相同，则按热度排序
            if (aRelevance === bRelevance) {
              return b.heat - a.heat;
            }
            
            // 按匹配度排序
            return bRelevance - aRelevance;
          });
        }
        return filtered;
      
      default:
        // 推荐课程，使用加权排序
        return filtered.sort((a, b) => {
          const aScore = calculateCourseScore(a);
          const bScore = calculateCourseScore(b);
          return bScore - aScore;
        });
    }
  }
  
  // 更新分页逻辑，使用过滤后的课程列表
  const filteredCourses = getFilteredCoursesByTab();
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  
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
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
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
              {process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL ? (
                <Link href={process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                  AI课程推荐
                </Link>
              ) : null}
              <Link href="/courses" className="transition-colors text-primary-600 py-1 border-b-2 border-primary-500">
                在线课程
              </Link>
              <Link href="/pomodoro" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                <Clock className="inline-block mr-1 h-4 w-4" /> 番茄钟
              </Link>
              {process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL ? (
                <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                  个人学习路线
                </Link>
              ) : null}
              <Link href="/profile" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                个人信息
              </Link>
              <Link href="/community" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                用户社区
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/pomodoro" className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                  <Clock className="h-5 w-5" />
                </Button>
              </Link>
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

        <main className="container pt-20 pb-12 flex flex-col lg:flex-row gap-4">
          {/* 左侧筛选面板布局优化 */}
          <aside className="w-full lg:w-1/5 space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
              <h2 className="text-lg font-semibold mb-4">多模态搜索</h2>
              
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="适合转行AI的实战课..." 
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="flex-1 rounded-lg text-xs"
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    <Search className="h-3.5 w-3.5 mr-1" /> 
                    {isSearching ? "搜索中..." : "搜索"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="rounded-lg text-xs">
                        {searchMode === "text" ? <Search className="h-3.5 w-3.5" /> : 
                         searchMode === "voice" ? <Mic className="h-3.5 w-3.5" /> : 
                         <ImageIcon className="h-3.5 w-3.5" />}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => toggleSearchMode("text")}>
                        <Search className="h-4 w-4 mr-2" /> 文本搜索
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleSearchMode("voice")}>
                        <Mic className="h-4 w-4 mr-2" /> 语音搜索
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleSearchMode("image")}>
                        <ImageIcon className="h-4 w-4 mr-2" /> 截图识别
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                <Button variant="ghost" size="sm" className="rounded-full p-0 h-6 w-6">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {careerPaths.map((path, index) => (
                  <div key={index} className="space-y-2">
                    <div 
                      className="flex items-center cursor-pointer" 
                      onClick={() => togglePathExpansion(path.name)}
                    >
                      {expandedPaths[path.name] ? (
                        <ChevronDown className="h-4 w-4 text-gray-500 mr-1" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-1" />
                      )}
                      <span className={`font-medium ${selectedCareerPath === path.name ? 'text-blue-600' : ''}`}>
                        {path.name}
                      </span>
                      {selectedSubPaths[path.name]?.length > 0 && (
                        <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {selectedSubPaths[path.name].length}
                        </Badge>
                      )}
                    </div>
                    
                    {expandedPaths[path.name] && (
                      <div className="pl-6 space-y-1.5">
                        {path.subPaths.map((subPath, subIndex) => (
                          <div key={subIndex} className="flex items-center">
                            <Checkbox 
                              id={`${path.name}-${subPath}`} 
                              className="mr-2"
                              checked={selectedSubPaths[path.name]?.includes(subPath) || false}
                              onCheckedChange={() => toggleSubPath(path.name, subPath)}
                            />
                            <label 
                              htmlFor={`${path.name}-${subPath}`} 
                              className={`text-sm cursor-pointer ${
                                selectedSubPaths[path.name]?.includes(subPath) 
                                  ? 'text-blue-600 font-medium' 
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                              onClick={() => toggleSubPath(path.name, subPath)}
                            >
                              {subPath}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {Object.values(selectedSubPaths).some(paths => paths.length > 0) && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full rounded-lg text-xs"
                    onClick={() => {
                      setSelectedSubPaths({
                        "AI工程师": [],
                        "全栈开发": [],
                        "数据科学家": []
                      });
                      setSelectedCareerPath(null);
                    }}
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> 清除选择
                  </Button>
                </div>
              )}
            </div>
          </aside>
          
          {/* 中间课程列表区域优化 */}
          <div className="w-full lg:w-3/5 space-y-4">
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
              
              <Tabs defaultValue="recommended" onValueChange={handleTabChange}>
                <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger value="recommended" className="rounded-md text-sm">
                    推荐课程
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="rounded-md text-sm">
                    趋势新课
                  </TabsTrigger>
                  <TabsTrigger value="career" className="rounded-md text-sm">
                    岗位定制
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="recommended" className="mt-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    基于您的历史学习记录和兴趣偏好，我们为您精选以下课程
                  </div>
                </TabsContent>
                
                <TabsContent value="trending" className="mt-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    这些课程在近期增长势头强劲，代表行业的最新趋势和技术方向
                  </div>
                </TabsContent>
                
                <TabsContent value="career" className="mt-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    选择您感兴趣的职业路径，我们将根据您的选择推荐最匹配的技能课程
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {careerPaths.map((path, index) => (
                      <Badge 
                        key={index} 
                        variant={selectedCareerPath === path.name ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const newValue = selectedCareerPath === path.name ? null : path.name;
                          setSelectedCareerPath(newValue);
                          // 自动展开被选中的路径
                          if (newValue) {
                            setExpandedPaths({
                              ...expandedPaths,
                              [path.name]: true
                            });
                          }
                        }}
                      >
                        {path.name}
                        {selectedSubPaths[path.name]?.length > 0 && (
                          <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 w-4 h-4 text-[10px]">
                            {selectedSubPaths[path.name].length}
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {selectedCareerPath && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 rounded-full bg-blue-100 dark:bg-blue-800/40 p-1.5">
                          <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-800 dark:text-blue-400">
                            {selectedCareerPath} 职业路径
                          </h3>
                          
                          {/* 显示选中的子路径 */}
                          {selectedSubPaths[selectedCareerPath]?.length > 0 ? (
                            <div className="mt-1.5 text-sm text-blue-700 dark:text-blue-300">
                              <p className="mb-1">已选择专业方向:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedSubPaths[selectedCareerPath].map((subPath, i) => (
                                  <Badge 
                                    key={i} 
                                    className="bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-300 cursor-pointer"
                                    onClick={() => toggleSubPath(selectedCareerPath, subPath)}
                                  >
                                    {subPath} <X className="ml-1 h-3 w-3" />
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                              请在左侧选择具体专业方向，获取更精准的课程推荐
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!selectedCareerPath && (
                    <div className="text-center py-4 mb-4 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="font-medium mb-1">请选择职业发展方向</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        选择您感兴趣的职业路径和专业方向，我们将为您定制匹配度最高的技能课程
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span>共找到30731个相关课程</span>
                <span>已选择: {selectedCourses.length}/3</span>
              </div>
              
              {/* 添加搜索无结果提示 */}
              {searchTerm && filteredCourses.length === 0 && (
                <div className="my-12 text-center">
                  <Search className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium">未找到相关课程</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                    抱歉，没有找到与"{searchTerm}"相关的课程。请尝试其他关键词或浏览我们的推荐课程。
                  </p>
                </div>
              )}
            </div>
            
            {/* 课程卡片列表 */}
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={(e) => {
                    // 防止点击对比按钮或其他链接时触发卡片导航
                    if (e.target && (e.target as HTMLElement).closest('button, a[href]')) {
                      return;
                    }
                    window.location.href = `/courses/${course.id}`;
                  }}
                  className="cursor-pointer group"
                >
                  <Card 
                    className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 relative group-hover:border-blue-300 dark:group-hover:border-blue-700 group-hover:translate-y-[-2px]"
                  >
                    <div className="flex p-4 md:p-6 relative z-10">
                      {/* 课程信息 */}
                      <div className="flex-1 pr-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="space-y-1">
                            <Link href={`/courses/${course.id}`} className="group inline-block">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-lg group-hover:text-blue-600 group-hover:underline transition-colors">{course.title}</h3>
                                {course.rarityLevel === "高" && (
                                  <Diamond className="h-4 w-4 text-blue-500" />
                                )}
                              </div>
                            </Link>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCourseSelection(course.id);
                            }}
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
                          <Link href={`/courses/${course.id}`} className="inline-block">
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{course.description}</p>
                          </Link>
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
                        
                        <Link href={`/courses/${course.id}`} className="block">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-lg text-xs px-3 py-1 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500"
                          >
                            <ArrowRight className="h-3.5 w-3.5 mr-1" />
                            查看详情
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
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
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
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
          
          {/* 右侧区域优化 */}
          <div className="w-full lg:w-1/5 space-y-4">
            {/* 动态维度筛选面板 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">动态维度筛选</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setShowDimensionFilter(!showDimensionFilter)}
                >
                  {showDimensionFilter ? <ChevronRight className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
                </Button>
              </div>
              
              {showDimensionFilter && (
                <div className="space-y-5">
                  {getActiveFilterCount() > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-600 font-medium">
                        已选 {getActiveFilterCount()} 个条件
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 rounded-lg text-xs text-red-500 hover:text-red-600"
                        onClick={clearAllFilters}
                      >
                        <X className="h-3 w-3 mr-1" /> 清除全部
                      </Button>
                    </div>
                  )}
                  
                  {filterCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleDimension(category.name)}
                      >
                        <div className="flex items-center">
                          {category.name === "技术领域" && <Tag className="h-4 w-4 mr-1.5 text-blue-500" />}
                          {category.name === "难度级别" && <BarChart className="h-4 w-4 mr-1.5 text-green-500" />}
                          {category.name === "更新状态" && <Clock className="h-4 w-4 mr-1.5 text-amber-500" />}
                          {category.name === "课程时长" && <Sliders className="h-4 w-4 mr-1.5 text-purple-500" />}
                          <h3 className="text-sm font-medium">{category.name}</h3>
                        </div>
                        {activeDimensions.includes(category.name) ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      
                      {activeDimensions.includes(category.name) && (
                        <div className="pl-6 space-y-1.5">
                          {category.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center">
                              <Checkbox 
                                id={`${category.name}-${option}`} 
                                className="mr-2"
                                checked={selectedFilters[category.name]?.includes(option) || false}
                                onCheckedChange={() => toggleFilter(category.name, option)}
                              />
                              <label 
                                htmlFor={`${category.name}-${option}`} 
                                className={`text-sm cursor-pointer ${
                                  selectedFilters[category.name]?.includes(option) 
                                    ? 'text-blue-600 font-medium' 
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      应用筛选后的课程数量
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <Progress value={filterCoursesByDimensions(courses).length / courses.length * 100} className="h-2" />
                      </div>
                      <span className="ml-3 text-sm font-medium">
                        {filterCoursesByDimensions(courses).length}/{courses.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
                    <Button variant="default" size="sm" className="w-full rounded-lg">
                      <Layers className="h-4 w-4 mr-1.5" /> 应用并刷新
                    </Button>
                    
                    {/* 新增: 添加自定义维度按钮 */}
                    <Button variant="outline" size="sm" className="w-full rounded-lg">
                      <PlusCircle className="h-4 w-4 mr-1.5" /> 添加自定义维度
                    </Button>
                    
                    {/* 新增: 添加高级筛选选项 */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Sliders className="h-4 w-4 mr-1.5 text-blue-500" />
                        高级筛选维度
                      </h4>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Checkbox id="advanced-price" className="mr-2" />
                          <label htmlFor="advanced-price" className="cursor-pointer text-gray-600 dark:text-gray-400">
                            价格区间
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <Checkbox id="advanced-rating" className="mr-2" />
                          <label htmlFor="advanced-rating" className="cursor-pointer text-gray-600 dark:text-gray-400">
                            用户评分
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <Checkbox id="advanced-completion" className="mr-2" />
                          <label htmlFor="advanced-completion" className="cursor-pointer text-gray-600 dark:text-gray-400">
                            完课率
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-blue-600 flex items-center cursor-pointer">
                        <span>查看更多维度</span>
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                    
                    {/* 新增: 保存为筛选方案 */}
                    <div className="text-center pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs text-blue-600 cursor-pointer flex items-center justify-center">
                        <Bookmark className="h-3 w-3 mr-1" />
                        保存为个人筛选方案
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 课程对比面板 */}
            <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 sticky top-96 transition-all duration-300 ${showComparePanel ? 'block' : 'hidden lg:block'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">课程对比</h2>
                <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setShowComparePanel(!showComparePanel)}>
                  {showComparePanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
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
                    const course = courses.find(c => c.id === courseId)
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
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCourseSelection(courseId);
                            }}
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
          </div>
        </main>

        {/* 数据可视化区域 - 减少留白、优化布局 */}
        <section className="container pb-12 space-y-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">数据洞察与市场趋势</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* 技术趋势热度图 - OpenAI风格优化 */}
            <Card className="md:col-span-8 lg:col-span-7 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-3 px-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"></div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">技术趋势热度分析</h3>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/30 font-normal">
                    实时数据
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    {/* 使用新的TrendChart组件 */}
                    <TrendChart />
                  </div>
                  <div className="w-full md:w-60 shrink-0 space-y-3">
                    <h4 className="text-sm font-medium border-b pb-1 mb-2">热度榜Top 5</h4>
                    <div className="space-y-2.5">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                            大语言模型
                          </span>
                          <span className="font-medium text-blue-600 dark:text-blue-400">92%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                            AI应用开发
                          </span>
                          <span className="font-medium text-purple-600 dark:text-purple-400">87%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                            云原生开发
                          </span>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">76%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '76%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                            Web3/区块链
                          </span>
                          <span className="font-medium text-amber-600 dark:text-amber-400">65%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                            网络安全
                          </span>
                          <span className="font-medium text-red-600 dark:text-red-400">61%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '61%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 技能雷达图 */}
            <Card className="md:col-span-4 lg:col-span-5 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/40 dark:to-teal-950/40 py-3 px-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">技能需求雷达</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    实时更新
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-3 pb-4 px-4">
                <div className="h-72 w-full relative">
                  {/* 技能雷达图可视化 */}
                  <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* 雷达图主体 */}
                      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px] max-h-[500px] mx-auto">
                        {/* 背景渐变 */}
                        <defs>
                          <radialGradient id="radarBackground" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.05)" />
                            <stop offset="100%" stopColor="rgba(20, 184, 166, 0.01)" />
                          </radialGradient>
                          
                          {/* 技能区域渐变 */}
                          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
                          </linearGradient>
                          
                          {/* 技能趋势渐变 */}
                          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
                            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.05)" />
                          </linearGradient>
                        </defs>
                        
                        {/* 背景圆和网格 */}
                        <circle cx="200" cy="200" r="180" fill="url(#radarBackground)" />
                        {[40, 80, 120, 160].map((radius, index) => (
                          <circle 
                            key={`circle-${index}`} 
                            cx="200" 
                            cy="200" 
                            r={radius} 
                            fill="none" 
                            stroke="rgba(148, 163, 184, 0.15)" 
                            strokeWidth="1" 
                            className="dark:stroke-slate-700/30"
                          />
                        ))}
                        
                        {/* 轴线 - 8个方向 */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
                          const radian = (angle * Math.PI) / 180;
                          const x2 = 200 + 180 * Math.cos(radian);
                          const y2 = 200 + 180 * Math.sin(radian);
                          return (
                            <line 
                              key={`axis-${index}`}
                              x1="200" 
                              y1="200" 
                              x2={x2} 
                              y2={y2} 
                              stroke="rgba(148, 163, 184, 0.15)" 
                              strokeWidth="1"
                              className="dark:stroke-slate-700/30"
                            />
                          );
                        })}
                        
                        {/* 当前技能水平多边形 */}
                        <polygon 
                          points="200,50 300,90 330,200 260,300 140,300 70,200 100,90" 
                          fill="url(#areaGradient)" 
                          stroke="rgba(16, 185, 129, 0.7)" 
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                          className="transition-all duration-500 ease-out"
                        />
                        
                        {/* 行业趋势多边形 */}
                        <polygon 
                          points="200,30 320,80 350,200 280,330 120,330 50,200 80,70" 
                          fill="none" 
                          stroke="rgba(56, 189, 248, 0.7)" 
                          strokeWidth="1.5" 
                          strokeDasharray="3,3"
                          strokeLinejoin="round"
                          className="transition-all duration-500 ease-out"
                        />
                        
                        {/* 技能数据点 - 当前水平 */}
                        <circle cx="200" cy="50" r="4" fill="white" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                        <circle cx="300" cy="90" r="4" fill="white" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                        <circle cx="330" cy="200" r="4" fill="white" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                        <circle cx="260" cy="300" r="4" fill="white" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                        <circle cx="140" cy="300" r="4" fill="white" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                        <circle cx="70" cy="200" r="4" fill="white" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                        <circle cx="100" cy="90" r="4" fill="white" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                        
                        {/* 技能标签 - 优化位置和样式 */}
                        <g className="skills-labels">
                          {/* Python */}
                          <g className="skill-label" transform="translate(200, 20)">
                            <rect x="-40" y="-16" width="80" height="22" rx="4" fill="white" className="dark:fill-slate-800" fillOpacity="0.9" />
                            <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="500" fill="currentColor">Python</text>
                          </g>
                          
                          {/* React */}
                          <g className="skill-label" transform="translate(340, 90)">
                            <rect x="-40" y="-16" width="80" height="22" rx="4" fill="white" className="dark:fill-slate-800" fillOpacity="0.9" />
                            <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="500" fill="currentColor">React</text>
                          </g>
                          
                          {/* AWS */}
                          <g className="skill-label" transform="translate(370, 200)">
                            <rect x="-40" y="-16" width="80" height="22" rx="4" fill="white" className="dark:fill-slate-800" fillOpacity="0.9" />
                            <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="500" fill="currentColor">AWS</text>
                          </g>
                          
                          {/* TensorFlow */}
                          <g className="skill-label" transform="translate(260, 340)">
                            <rect x="-50" y="-16" width="100" height="22" rx="4" fill="white" className="dark:fill-slate-800" fillOpacity="0.9" />
                            <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="500" fill="currentColor">TensorFlow</text>
                          </g>
                          
                          {/* Node.js */}
                          <g className="skill-label" transform="translate(100, 340)">
                            <rect x="-40" y="-16" width="80" height="22" rx="4" fill="white" className="dark:fill-slate-800" fillOpacity="0.9" />
                            <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="500" fill="currentColor">Node.js</text>
                          </g>
                          
                          {/* Go */}
                          <g className="skill-label" transform="translate(30, 200)">
                            <rect x="-30" y="-16" width="60" height="22" rx="4" fill="white" className="dark:fill-slate-800" fillOpacity="0.9" />
                            <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="500" fill="currentColor">Go</text>
                          </g>
                          
                          {/* Vue */}
                          <g className="skill-label" transform="translate(60, 90)">
                            <rect x="-30" y="-16" width="60" height="22" rx="4" fill="white" className="dark:fill-slate-800" fillOpacity="0.9" />
                            <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="500" fill="currentColor">Vue</text>
                          </g>
                        </g>
                        
                        {/* 图例 */}
                        <g transform="translate(320, 20)">
                          <rect x="-80" y="0" width="160" height="65" rx="6" fill="white" fillOpacity="0.9" className="dark:fill-slate-800/90" />
                          
                          <g transform="translate(0, 15)">
                            <rect x="-70" y="-8" width="16" height="16" rx="2" fill="url(#areaGradient)" stroke="rgba(16, 185, 129, 0.7)" strokeWidth="1" />
                            <text x="-45" y="0" dominantBaseline="middle" fontSize="11" fill="currentColor">当前技能水平</text>
                          </g>
                          
                          <g transform="translate(0, 40)">
                            <rect x="-70" y="-8" width="16" height="16" rx="2" fill="none" stroke="rgba(56, 189, 248, 0.7)" strokeWidth="1" strokeDasharray="3,3" />
                            <text x="-45" y="0" dominantBaseline="middle" fontSize="11" fill="currentColor">行业趋势需求</text>
                          </g>
                        </g>
                      </svg>
                      
                      {/* 交互式提示 */}
                      <div className="absolute bottom-2 right-2 text-xs text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z" fill="currentColor"/>
                          </svg>
                          <span>悬停在技能上查看详情</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-3 text-center">
                    <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">市场需求增速</h4>
                    <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">+86%</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 text-center">
                    <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">技能覆盖率</h4>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">72%</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-3 text-center">
                    <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">薪资增长潜力</h4>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">58%</p>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-1 justify-center">
                  <div className="bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-400 px-2 py-1 rounded-full text-xs">
                    Python +128%
                  </div>
                  <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400 px-2 py-1 rounded-full text-xs">
                    React +85%
                  </div>
                  <div className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400 px-2 py-1 rounded-full text-xs">
                    AWS +67%
                  </div>
                  <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 px-2 py-1 rounded-full text-xs">
                    TensorFlow +92%
                  </div>
                  <div className="bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 px-2 py-1 rounded-full text-xs">
                    Go +46%
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400 px-2 py-1 rounded-full text-xs">
                    Vue +53%
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 px-2 py-1 rounded-full text-xs">
                    Node.js +79%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 就业市场前景 */}
            <Card className="md:col-span-6 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 py-3 px-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">就业市场前景</h3>
                  <div className="text-xs text-purple-600 font-medium">
                    北京地区
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-3 pb-4 px-4">
                <div className="h-64 w-full relative">
                  {/* 就业市场数据可视化 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-violet-500/5 to-pink-500/5 rounded-lg p-2">
                    <div className="h-full flex flex-col">
                      <div className="text-xs text-gray-500 mb-3 font-medium text-center">北京地区IT相关职位薪资分布</div>
                      
                      <div className="flex-1 flex flex-col space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-28 text-right text-xs">AI工程师</div>
                          <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-sm relative">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-sm" style={{ width: '80%' }}></div>
                            <div className="absolute inset-y-0 flex items-center justify-end right-2 text-xs font-medium">
                              ¥35K-55K
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-28 text-right text-xs">全栈开发工程师</div>
                          <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-sm relative">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-sm" style={{ width: '70%' }}></div>
                            <div className="absolute inset-y-0 flex items-center justify-end right-2 text-xs font-medium">
                              ¥25K-45K
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-28 text-right text-xs">数据科学家</div>
                          <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-sm relative">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-sm" style={{ width: '75%' }}></div>
                            <div className="absolute inset-y-0 flex items-center justify-end right-2 text-xs font-medium">
                              ¥30K-50K
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-28 text-right text-xs">DevOps工程师</div>
                          <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-sm relative">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-sm" style={{ width: '65%' }}></div>
                            <div className="absolute inset-y-0 flex items-center justify-end right-2 text-xs font-medium">
                              ¥20K-40K
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-28 text-right text-xs">前端开发工程师</div>
                          <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-sm relative">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-sm" style={{ width: '60%' }}></div>
                            <div className="absolute inset-y-0 flex items-center justify-end right-2 text-xs font-medium">
                              ¥18K-35K
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-28 text-right text-xs">后端开发工程师</div>
                          <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-sm relative">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-sm" style={{ width: '63%' }}></div>
                            <div className="absolute inset-y-0 flex items-center justify-end right-2 text-xs font-medium">
                              ¥20K-38K
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-3 text-center">
                        数据来源：2024年Q2招聘平台统计 | 更新时间：2024-06-01
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="border rounded-lg p-2 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">平均薪资</p>
                    <p className="text-lg font-bold text-purple-600">¥28.5K</p>
                    <p className="text-xs text-green-600">↑ 12% 同比</p>
                  </div>
                  <div className="border rounded-lg p-2 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">岗位数量</p>
                    <p className="text-lg font-bold text-purple-600">12,508</p>
                    <p className="text-xs text-green-600">↑ 8% 环比</p>
                  </div>
                  <div className="border rounded-lg p-2 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">竞争指数</p>
                    <p className="text-lg font-bold text-amber-600">3.6</p>
                    <p className="text-xs text-amber-600">中等竞争</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 互动学习路径可视化 */}
            <Card className="md:col-span-6 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 py-3 px-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">AI推荐学习路径</h3>
                  <div className="text-xs bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-md font-medium">
                    AI工程师
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-3 pb-4 px-4">
                <div className="h-64 w-full relative">
                  {/* AI学习路径可视化 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-red-500/5 rounded-lg p-3">
                    <div className="h-full flex flex-col">
                      <div className="text-center text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">AI工程师学习路径图谱</div>
                      
                      <div className="relative flex-1 overflow-hidden">
                        {/* 主干线路 */}
                        <div className="absolute top-8 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 rounded-full"></div>
                        
                        {/* 阶段节点 - 入门 */}
                        <div className="absolute top-0 left-0 sm:left-4 md:left-6 w-[28%] max-w-28">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-400 flex items-center justify-center">
                              <div className="text-amber-600 dark:text-amber-400 text-xs font-medium text-center">入门</div>
                            </div>
                            <div className="mt-3 space-y-1.5 w-full">
                              <div className="bg-white dark:bg-gray-800 text-xs py-1 px-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                                Python基础
                              </div>
                              <div className="bg-white dark:bg-gray-800 text-xs py-1 px-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                                数据结构
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* 阶段节点 - 进阶 */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[28%] max-w-28">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 flex items-center justify-center">
                              <div className="text-orange-600 dark:text-orange-400 text-xs font-medium text-center">进阶</div>
                            </div>
                            <div className="mt-3 space-y-1.5 w-full">
                              <div className="bg-white dark:bg-gray-800 text-xs py-1 px-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                                机器学习
                              </div>
                              <div className="bg-white dark:bg-gray-800 text-xs py-1 px-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 relative">
                                深度学习
                                <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-500 rounded-full border border-white dark:border-gray-800"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* 阶段节点 - 专业 */}
                        <div className="absolute top-0 right-0 sm:right-4 md:right-6 w-[28%] max-w-28">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 border-2 border-red-400 flex items-center justify-center">
                              <div className="text-red-600 dark:text-red-400 text-xs font-medium text-center">专业</div>
                            </div>
                            <div className="mt-3 space-y-1.5 w-full">
                              <div className="bg-white dark:bg-gray-800 text-xs py-1 px-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 relative">
                                LLM应用开发
                                <div className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                              </div>
                              <div className="bg-white dark:bg-gray-800 text-xs py-1 px-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                                模型微调
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* 下方系列课程 */}
                        <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 gap-2">
                          <div className="flex flex-col">
                            <div className="text-xs text-gray-500 font-medium mb-1.5">基础知识</div>
                            <div className="flex flex-col space-y-1.5">
                              <div className="bg-amber-50 dark:bg-amber-900/10 text-[10px] py-1 px-1.5 rounded border border-amber-200 dark:border-amber-800/30 truncate">
                                Python基础编程
                              </div>
                              <div className="bg-amber-50 dark:bg-amber-900/10 text-[10px] py-1 px-1.5 rounded border border-amber-200 dark:border-amber-800/30 truncate">
                                数据结构与算法
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs text-gray-500 font-medium mb-1.5">进阶知识</div>
                            <div className="flex flex-col space-y-1.5">
                              <div className="bg-orange-50 dark:bg-orange-900/10 text-[10px] py-1 px-1.5 rounded border border-orange-200 dark:border-orange-800/30 truncate">
                                机器学习理论
                              </div>
                              <div className="bg-orange-50 dark:bg-orange-900/10 text-[10px] py-1 px-1.5 rounded border border-orange-200 dark:border-orange-800/30 truncate">
                                深度学习框架
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs text-gray-500 font-medium mb-1.5">专业技能</div>
                            <div className="flex flex-col space-y-1.5">
                              <div className="bg-red-50 dark:bg-red-900/10 text-[10px] py-1 px-1.5 rounded border border-red-200 dark:border-red-800/30 truncate">
                                LLM应用开发
                              </div>
                              <div className="bg-red-50 dark:bg-red-900/10 text-[10px] py-1 px-1.5 rounded border border-red-200 dark:border-red-800/30 truncate">
                                AI系统集成
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-blue-600 font-medium">
                      个性化学习路径推荐
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      已匹配 128 门课程
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 学习行为分析 */}
            <Card className="md:col-span-12 lg:col-span-6 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 py-3 px-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">学习行为分析</h3>
                  <div className="text-xs px-2 py-1 rounded-md font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                    近6个月
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-3 pb-4 px-4">
                <div className="h-64 w-full relative">
                  {/* 学习行为分析可视化 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-cyan-500/5 rounded-lg p-3">
                    <div className="h-full flex flex-col">
                      <div className="flex-1 flex space-x-4">
                        <div className="w-1/2 flex flex-col items-center justify-center space-y-1">
                          {/* 完课率圆环 */}
                          <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute w-full h-full rounded-full border-[10px] border-gray-200 dark:border-gray-700"></div>
                            <div className="absolute w-full h-full rounded-full border-[10px] border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent transform rotate-45"></div>
                            <div className="text-blue-600 font-bold text-2xl">76%</div>
                          </div>
                          <div className="text-xs text-center">
                            <span className="font-medium">完课率</span><br/>
                            <span className="text-gray-500 text-[10px]">高于行业均值15%</span>
                          </div>
                        </div>
                        
                        <div className="w-1/2">
                          {/* 学习时段分布图 */}
                          <div className="text-xs text-gray-500 mb-1 text-center">学习时段分布</div>
                          <div className="space-y-2">
                            <div className="flex items-center text-xs">
                              <div className="w-16 text-right mr-2">早晨 (6-9点)</div>
                              <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                <div className="h-full rounded-full bg-blue-400" style={{width: '15%'}}></div>
                              </div>
                              <div className="w-8 text-right ml-2">15%</div>
                            </div>
                            <div className="flex items-center text-xs">
                              <div className="w-16 text-right mr-2">上午 (9-12点)</div>
                              <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                <div className="h-full rounded-full bg-blue-400" style={{width: '10%'}}></div>
                              </div>
                              <div className="w-8 text-right ml-2">10%</div>
                            </div>
                            <div className="flex items-center text-xs">
                              <div className="w-16 text-right mr-2">下午 (12-18点)</div>
                              <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                <div className="h-full rounded-full bg-blue-400" style={{width: '20%'}}></div>
                              </div>
                              <div className="w-8 text-right ml-2">20%</div>
                            </div>
                            <div className="flex items-center text-xs">
                              <div className="w-16 text-right mr-2">晚上 (18-22点)</div>
                              <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                <div className="h-full rounded-full bg-blue-400" style={{width: '45%'}}></div>
                              </div>
                              <div className="w-8 text-right ml-2">45%</div>
                            </div>
                            <div className="flex items-center text-xs">
                              <div className="w-16 text-right mr-2">深夜 (22-6点)</div>
                              <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                <div className="h-full rounded-full bg-blue-400" style={{width: '10%'}}></div>
                              </div>
                              <div className="w-8 text-right ml-2">10%</div>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-center">
                            <div className="font-medium text-sm text-cyan-500">24.5小时</div>
                            <div className="text-xs text-gray-500">平均周学习时长</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-6 flex space-x-2 mt-3">
                        <div className="flex-1 bg-blue-50 dark:bg-blue-900/10 rounded-sm flex items-center justify-center">
                          <div className="text-xs">专注力得分：<span className="text-blue-600 font-medium">8.6/10</span></div>
                        </div>
                        <div className="flex-1 bg-green-50 dark:bg-green-900/10 rounded-sm flex items-center justify-center">
                          <div className="text-xs">笔记量：<span className="text-green-600 font-medium">24条/周</span></div>
                        </div>
                        <div className="flex-1 bg-purple-50 dark:bg-purple-900/10 rounded-sm flex items-center justify-center">
                          <div className="text-xs">互动量：<span className="text-purple-600 font-medium">15次/周</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="border rounded-lg p-2 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">专注指数</p>
                    <p className="text-lg font-bold text-blue-600">8.6/10</p>
                    <p className="text-xs text-green-600">高于平均</p>
                  </div>
                  <div className="border rounded-lg p-2 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">已获证书</p>
                    <p className="text-lg font-bold text-blue-600">5</p>
                    <p className="text-xs text-green-600">同比↑ 2</p>
                  </div>
                  <div className="border rounded-lg p-2 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">技能增长</p>
                    <p className="text-lg font-bold text-blue-600">+38%</p>
                    <p className="text-xs text-blue-600">深度学习领域</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 课程评价与反馈 */}
            <Card className="md:col-span-12 lg:col-span-6 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40 py-3 px-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">课程评价与社区反馈</h3>
                  <div className="text-xs px-2 py-1 rounded-md font-medium bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300">
                    最新反馈
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-3 pb-4 px-4">
                <div className="h-64 w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5 rounded-lg p-4">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium">4.8/5.0</span>
                        </div>
                        <span className="text-xs text-gray-500">基于1,234条评价</span>
                      </div>
                      
                      <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "calc(100% - 30px)" }}>
                        <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 shadow-sm">
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium mr-2">L</div>
                              <span className="font-medium text-sm">李同学</span>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < 5 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">课程内容非常丰富，实践项目贴近工作场景，讲师解释清晰。我学完后成功转岗到AI工程师岗位，感谢平台提供的优质课程！</p>
                          <div className="mt-2 text-[10px] text-gray-500">《大语言模型应用开发实战》· 2024.06.05</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 shadow-sm">
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-medium mr-2">Z</div>
                              <span className="font-medium text-sm">张同学</span>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">课程节奏适中，从基础到进阶逐步深入，非常适合我这样的转行人员。作业反馈及时，社区讨论也很活跃。</p>
                          <div className="mt-2 text-[10px] text-gray-500">《云原生应用架构与实践》· 2024.05.28</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-violet-600 font-medium">
                    用户满意度评分
                  </div>
                  <div className="text-xs text-gray-500">
                    4.8分，位列AI开发类课程前5%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* AI驱动的课程推荐系统 - 减少内部间距和留白 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-xl border border-blue-100 dark:border-blue-800/30 shadow-md p-5 mt-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <Sliders className="h-6 w-6 mr-2 text-blue-500" />
                    智能课程匹配引擎
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    基于深度学习的个性化推荐，为你精准匹配职业发展所需课程
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="rounded-lg border-blue-300 dark:border-blue-700">
                    <User className="h-4 w-4 mr-1.5" />
                    定制偏好
                  </Button>
                  <Button className="rounded-lg bg-blue-600 hover:bg-blue-700">
                    <Layers className="h-4 w-4 mr-1.5" />
                    立即匹配
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="lg:w-2/3 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-800 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/60">
                          个人偏好
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1.5">个人学习档案</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        分析你的学习历史、完课率和效果评估，优化推荐模型
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-800 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/40">
                          <BarChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/60">
                          市场数据
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1.5">行业需求分析</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        整合求职市场数据和薪资水平，确定最具价值的技能课程
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-800 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40">
                          <Sliders className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/60">
                          趋势预测
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1.5">技术趋势预测</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        预测未来6-12个月技术热点，提前布局高增长潜力领域
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">技能知识图谱</h4>
                      <Button variant="ghost" size="sm" className="h-7 rounded-lg text-xs">
                        <span>全局视图</span>
                        <ChevronDown className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                    <div className="h-44 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                      <div className="text-center text-gray-400 dark:text-gray-500">
                        <div className="flex items-center justify-center gap-6 relative">
                          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-2 border-blue-300 dark:border-blue-700">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">核心技能</span>
                          </div>
                          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center border-2 border-purple-300 dark:border-purple-700">
                            <span className="text-xs font-medium text-purple-700 dark:text-purple-400">辅助技能</span>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border-2 border-green-300 dark:border-green-700">
                            <span className="text-xs font-medium text-green-700 dark:text-green-400">工具</span>
                          </div>
                          <div className="absolute left-20 right-0 top-10 border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <p className="mt-5 text-sm">[完整知识图谱将在此渲染]</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/3 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm p-4">
                  <h4 className="font-medium mb-3">个性化推荐摘要</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                        <Flame className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">当前热门技能</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          大语言模型应用开发、多模态AI、向量数据库集成开发
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">适合你的学习路径</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          基于你的Python基础，建议学习进阶AI框架和部署实践课程
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                        <BarChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">就业机会增长率</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          AI应用工程师需求增长87%，薪资中位数¥35K，竞争指数中等
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full rounded-lg mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    查看完整推荐报告
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

interface ChevronLeftProps {
  className?: string;
}

function ChevronLeft(props: ChevronLeftProps) {
  const { className, ...rest } = props;
  return (
    <svg
      {...rest}
      className={className}
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