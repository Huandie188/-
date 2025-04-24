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
  Bookmark
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
    // 添加安全检查，确保course.trend存在且为字符串
    const trendScore = course?.trend && typeof course.trend === 'string' 
      ? parseInt(course.trend.replace('+', '') || '0') * (trendWeight / 100)
      : 0;
    
    // 添加安全检查，确保course.heat存在
    const heatScore = (course?.heat || 0) * (localHeatWeight / 100);
    
    // 添加安全检查，确保course.level存在
    const jobScore = (course?.level && course.level >= 3 ? 100 : 50) * (jobMatchWeight / 100);
    
    // 添加安全检查，确保course.tags存在且为数组
    const interestScore = (course?.tags && Array.isArray(course.tags) && course.tags.includes("AI") ? 100 : 50) * (interestWeight / 100);
    
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
        // 添加安全检查，确保course.duration存在且为字符串
        let durationWeeks = 0;
        if (course?.duration && typeof course.duration === 'string') {
          try {
            durationWeeks = parseInt(course.duration.replace("周", "") || '0');
          } catch (e) {
            console.warn('解析课程时长失败:', course.duration);
            durationWeeks = 0;
          }
        }
        
        let matches = false;
        
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
      : courses.filter(course => {
          // 添加安全检查确保所有属性存在
          const title = course?.title?.toLowerCase() || "";
          const description = course?.description?.toLowerCase() || "";
          const instructor = course?.instructor?.toLowerCase() || "";
          const provider = course?.provider?.toLowerCase() || "";
          const tags = course?.tags || [];
          
          const term = searchTerm.toLowerCase();
          
          return title.includes(term) ||
            description.includes(term) ||
            instructor.includes(term) ||
            provider.includes(term) ||
            (Array.isArray(tags) && tags.some(tag => (tag || "").toLowerCase().includes(term)));
        });
    
    // 应用动态维度筛选
    filtered = filterCoursesByDimensions(filtered)
    
    switch (selectedTab) {
      case "trending":
        // 按趋势升序排序 (去掉+号并转为数字)
        return filtered.sort((a, b) => {
          // 添加安全检查，确保a.trend和b.trend存在且为字符串
          const aTrend = a?.trend && typeof a.trend === 'string' 
            ? parseInt(a.trend.replace('+', '') || '0') 
            : 0;
          const bTrend = b?.trend && typeof b.trend === 'string' 
            ? parseInt(b.trend.replace('+', '') || '0') 
            : 0;
          return bTrend - aTrend;
        });
      
      case "career":
        if (selectedCareerPath) {
          // 获取当前选中的子路径
          const activeSubPaths = selectedSubPaths[selectedCareerPath] || [];
          
          // 获取与选中职业路径和子路径相关的标签
          const relevantTags = getRelevantTagsForCareer(selectedCareerPath, activeSubPaths);
          
          return filtered.sort((a, b) => {
            // 添加安全检查，确保a.tags和b.tags存在且为数组
            // 计算每个课程与标签的匹配度
            const aRelevance = a?.tags && Array.isArray(a.tags) 
              ? a.tags.filter(tag => relevantTags.includes(tag)).length
              : 0;
            const bRelevance = b?.tags && Array.isArray(b.tags)
              ? b.tags.filter(tag => relevantTags.includes(tag)).length
              : 0;
            
            // 如果匹配度相同，则按热度排序
            if (aRelevance === bRelevance) {
              // 添加热度的安全检查
              const aHeat = a?.heat || 0;
              const bHeat = b?.heat || 0;
              return bHeat - aHeat;
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
          
          {/* 右侧区域 */}
          <div className="w-full lg:w-1/5 space-y-6">
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
      </div>
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