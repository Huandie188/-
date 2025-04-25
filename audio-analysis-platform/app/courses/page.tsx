"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import type { BadgeProps } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { PieChart, ChartDataPoint } from "@/components/charts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChevronDown,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  BookOpen,
  TrendingUp,
  AlertCircle,
  Copy,
  Loader2,
} from "lucide-react"

// 定义课程类型
interface Course {
  id: string;
  title: string;
  provider: string;
  instructor?: string;
  level?: number;
  updatedAt?: string;
  responseRate?: string;
  trend?: string;
  heat?: number;
  tags?: string[];
  description?: string;
  duration?: string;
  status?: string;
  statusColor?: string;
  imageSrc?: string;
  rarityLevel?: string;
  date?: string;
  category?: string;
  rating?: number;
  popularity?: string;
  recommendations?: number;
  duplication?: string;
}

// 获取课程数据
async function fetchCourses(): Promise<Course[]> {
  try {
    // 由于API可能不存在或无法访问，直接返回示例数据
    // 在实际项目中，这里应该是一个真实的API调用
    // const apiUrl = process.env.NEXT_PUBLIC_VED_INDICATOR_URL || "https://test-ten-nu-93.vercel.app";
    // const response = await fetch(`${apiUrl}/api/courses`);
    
    // if (!response.ok) {
    //   throw new Error('Failed to fetch courses');
    // }
    
    // const data = await response.json();
    // return data;
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    return sampleCourses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return sampleCourses;
  }
}

// 示例课程数据（备用）
const sampleCourses: Course[] = [
  {
    id: "imooc-1440",
    title: "LLM 大模型快速入门",
    provider: "慕课网",
    instructor: "讲师70号",
    level: 2,
    updatedAt: "4天前",
    responseRate: "85%",
    trend: "+57%",
    heat: 98,
    tags: ["编程", "实用技术"],
    description: "AI时代2.0，各企业迅速融合LLM大模型，提效降本，大模型技能已是必备技能。本课程专为LLM零基础用户设计...",
    duration: "1周",
    status: "最新认证",
    statusColor: "purple",
    imageSrc: "https://img1.sycdn.imooc.com/6734099f09d4934e05400304.jpg",
    rarityLevel: "普通",
    date: "2024-06-01",
    category: "人工智能",
    rating: 4.8,
    popularity: "高",
    recommendations: 1245,
    duplication: "低"
  },
  {
    id: "imooc-1439",
    title: "AI大模型应用开发（六）基于Python实现聊天机器人",
    provider: "慕课网",
    instructor: "讲师19号",
    level: 2,
    updatedAt: "1天前",
    responseRate: "85%",
    trend: "+77%",
    heat: 72,
    tags: ["Python", "开发", "AI"],
    description: "本课程主要讲解Streamlit，讲解Streamlit会话及使用指南，将Streamlit部署到云端，通过Streamlit实现聊天机器人应用。",
    duration: "1周",
    status: "最新认证",
    statusColor: "purple",
    imageSrc: "https://img1.sycdn.imooc.com/667bc56a09400a0e05400304.jpg",
    rarityLevel: "稀有",
    date: "2024-05-28",
    category: "人工智能",
    rating: 4.7,
    popularity: "高",
    recommendations: 982,
    duplication: "低"
  },
  {
    id: "imooc-1438",
    title: "AI大模型应用开发（五）大模型开发框架LangChain进阶",
    provider: "慕课网",
    instructor: "讲师8号",
    level: 2,
    updatedAt: "21天前",
    responseRate: "88%",
    trend: "+32%",
    heat: 76,
    tags: ["开发", "AI"],
    description: "本课程主要讲解大模型开发框架LangChain进阶内容，包括LangChain核心及内部构造，通过LangChain实现聊天机器人案例",
    duration: "1周",
    status: "即将开始",
    statusColor: "blue",
    imageSrc: "https://img1.sycdn.imooc.com/667bc21a09cfb0fc05400304.jpg",
    rarityLevel: "稀有",
    date: "2024-05-15",
    category: "人工智能",
    rating: 4.6,
    popularity: "中",
    recommendations: 754,
    duplication: "低"
  },
  {
    id: "imooc-1437",
    title: "Java安全之旅（六）：初探架构与安全升级",
    provider: "慕课网",
    instructor: "讲师96号",
    level: 2,
    updatedAt: "21天前",
    responseRate: "83%",
    trend: "+36%",
    heat: 90,
    tags: ["Java", "安全", "架构"],
    description: "本课程是《Java安全之旅》第六篇，实战精进篇。通过讲解微服务架构的基础知识，以及实战案例的演练，带你提升将单体应用拆分为微服务的技能。",
    duration: "1周",
    status: "热门",
    statusColor: "red",
    imageSrc: "https://img1.sycdn.imooc.com/667bbe500917759205400304.jpg",
    rarityLevel: "稀有",
    date: "2024-05-12",
    category: "开发",
    rating: 4.9,
    popularity: "高",
    recommendations: 1340,
    duplication: "中"
  },
  {
    id: "imooc-1432",
    title: "Java安全之旅（四）：物流系统架构与API开发",
    provider: "慕课网",
    instructor: "讲师13号",
    level: 2,
    updatedAt: "14天前",
    responseRate: "85%",
    trend: "+35%",
    heat: 79,
    tags: ["Java", "开发", "安全", "架构"],
    description: "本课程是《Java安全之旅》第四篇，实战启动篇，带你开启物流系统的实战征程。会带你实践Spring Boot项目的搭建、与RESTful API的设计与实现。",
    duration: "1周",
    status: "最新认证",
    statusColor: "purple",
    imageSrc: "https://img1.sycdn.imooc.com/6679236909ae269105400304.jpg",
    rarityLevel: "史诗",
    date: "2024-05-10",
    category: "Java开发",
    rating: 4.8,
    popularity: "高",
    recommendations: 926,
    duplication: "中"
  },
  // 新增课程
  {
    id: "imooc-1431",
    title: "AI大模型应用开发（一）热门大模型应用使用",
    provider: "慕课网",
    instructor: "讲师72号",
    level: 2,
    updatedAt: "19天前",
    responseRate: "98%",
    trend: "+79%",
    heat: 94,
    tags: ["开发", "AI"],
    description: "本课程主要介绍大模型对企业的带来的影响，以及在企业各种应用场景，国内外热门大模型应用的使用",
    duration: "1周",
    status: "进行中",
    statusColor: "green",
    imageSrc: "https://img1.sycdn.imooc.com/66790dbe092194f400000000.jpg",
    rarityLevel: "普通",
    date: "2024-05-05",
    category: "人工智能",
    rating: 4.7,
    popularity: "高",
    recommendations: 1120,
    duplication: "中"
  },
  {
    id: "imooc-1430",
    title: "Java安全之旅（三）：Spring Security与Shiro",
    provider: "慕课网",
    instructor: "讲师63号",
    level: 2,
    updatedAt: "22天前",
    responseRate: "88%",
    trend: "+67%",
    heat: 97,
    tags: ["Java", "安全", "Spring"],
    description: "本课程是《Java安全之旅》第三篇，进阶篇。通过实践Spring Security和Shiro权限框架，以及流量控制技术，帮助学员构建安全可靠的系统，提升系统安全性。",
    duration: "1周",
    status: "最新认证",
    statusColor: "purple",
    imageSrc: "https://img1.sycdn.imooc.com/6678ed4209011e7305400304.jpg",
    rarityLevel: "稀有",
    date: "2024-05-03",
    category: "Java开发",
    rating: 4.5,
    popularity: "高",
    recommendations: 895,
    duplication: "中"
  },
  {
    id: "imooc-1429",
    title: "Java安全之旅（二）：访问控制与会话管理",
    provider: "慕课网",
    instructor: "讲师15号",
    level: 2,
    updatedAt: "3天前",
    responseRate: "82%",
    trend: "+25%",
    heat: 70,
    tags: ["Java", "安全"],
    description: "本课程是《Java安全之旅》第二篇，基础篇。通过实践Java的访问控制和会话管理，帮助学员构建安全的Web应用，防范常见的安全问题。",
    duration: "1周",
    status: "已发布",
    statusColor: "default",
    imageSrc: "https://img1.sycdn.imooc.com/66785a4d0919be9605400304.jpg",
    rarityLevel: "普通",
    date: "2024-05-01",
    category: "Java开发",
    rating: 4.3,
    popularity: "中",
    recommendations: 720,
    duplication: "高"
  },
  {
    id: "coursera-001",
    title: "机器学习基础与实践",
    provider: "Coursera",
    instructor: "Andrew N.",
    level: 3,
    updatedAt: "7天前",
    responseRate: "90%",
    trend: "+45%",
    heat: 95,
    tags: ["机器学习", "数据科学"],
    description: "本课程涵盖机器学习的核心概念和算法，从理论到实践，帮助学员构建实际的机器学习模型。适合有编程基础的学习者。",
    duration: "3周",
    status: "热门",
    statusColor: "red",
    imageSrc: "https://example.com/ml-course.jpg",
    rarityLevel: "稀有",
    date: "2024-04-28",
    category: "数据科学",
    rating: 4.9,
    popularity: "高",
    recommendations: 2345,
    duplication: "低"
  },
  {
    id: "coursera-002",
    title: "深度学习专项课程",
    provider: "Coursera",
    instructor: "Ian G.",
    level: 4,
    updatedAt: "11天前",
    responseRate: "85%",
    trend: "+38%",
    heat: 88,
    tags: ["深度学习", "人工智能"],
    description: "深入学习神经网络架构、优化算法和实现方法，从基础CNN到先进的Transformer架构，全面掌握深度学习技术。",
    duration: "4周",
    status: "已发布",
    statusColor: "default",
    imageSrc: "https://example.com/dl-course.jpg",
    rarityLevel: "史诗",
    date: "2024-04-20",
    category: "人工智能",
    rating: 4.8,
    popularity: "高",
    recommendations: 1987,
    duplication: "低"
  },
  {
    id: "udemy-001",
    title: "Web开发全栈工程师指南",
    provider: "Udemy",
    instructor: "李明达",
    level: 2,
    updatedAt: "5天前",
    responseRate: "92%",
    trend: "+52%",
    heat: 87,
    tags: ["Web开发", "JavaScript", "React"],
    description: "从前端到后端，全面掌握现代Web开发技术栈。包括HTML/CSS/JavaScript、React、Node.js、Express和MongoDB等核心技术。",
    duration: "8周",
    status: "热门",
    statusColor: "red",
    imageSrc: "https://example.com/web-dev.jpg",
    rarityLevel: "普通",
    date: "2024-04-15",
    category: "Web开发",
    rating: 4.7,
    popularity: "高",
    recommendations: 3250,
    duplication: "中"
  },
  {
    id: "udemy-002",
    title: "Python数据分析与可视化",
    provider: "Udemy",
    instructor: "张三",
    level: 2,
    updatedAt: "15天前",
    responseRate: "89%",
    trend: "+30%",
    heat: 82,
    tags: ["Python", "数据分析", "可视化"],
    description: "使用Python进行数据分析和可视化，掌握NumPy、Pandas、Matplotlib和Seaborn等核心库，解决实际数据分析问题。",
    duration: "6周",
    status: "已发布",
    statusColor: "default",
    imageSrc: "https://example.com/data-viz.jpg",
    rarityLevel: "普通",
    date: "2024-04-10",
    category: "数据科学",
    rating: 4.6,
    popularity: "高",
    recommendations: 1876,
    duplication: "中"
  },
  {
    id: "edx-001",
    title: "云计算与DevOps实践",
    provider: "edX",
    instructor: "刘教授",
    level: 3,
    updatedAt: "9天前",
    responseRate: "87%",
    trend: "+42%",
    heat: 84,
    tags: ["云计算", "DevOps", "Docker"],
    description: "学习现代云计算技术和DevOps实践，包括容器化、CI/CD、Kubernetes等核心概念和工具，提升软件交付能力。",
    duration: "5周",
    status: "审核中",
    statusColor: "secondary",
    imageSrc: "https://example.com/cloud-devops.jpg",
    rarityLevel: "稀有",
    date: "2024-04-05",
    category: "云计算",
    rating: 4.5,
    popularity: "中",
    recommendations: 1450,
    duplication: "低"
  },
  {
    id: "edx-002",
    title: "区块链技术与应用",
    provider: "edX",
    instructor: "王教授",
    level: 3,
    updatedAt: "18天前",
    responseRate: "83%",
    trend: "+28%",
    heat: 78,
    tags: ["区块链", "加密货币", "智能合约"],
    description: "深入理解区块链技术原理和应用场景，掌握智能合约开发和分布式应用构建，了解行业最新发展动向。",
    duration: "7周",
    status: "即将开始",
    statusColor: "blue",
    imageSrc: "https://example.com/blockchain.jpg",
    rarityLevel: "史诗",
    date: "2024-04-01",
    category: "区块链",
    rating: 4.4,
    popularity: "中",
    recommendations: 980,
    duplication: "低"
  },
  {
    id: "xuetang-001",
    title: "前端框架实战：Vue3+TypeScript",
    provider: "学堂在线",
    instructor: "赵老师",
    level: 2,
    updatedAt: "6天前",
    responseRate: "91%",
    trend: "+48%",
    heat: 86,
    tags: ["前端", "Vue", "TypeScript"],
    description: "深入学习Vue3与TypeScript结合开发企业级应用，包括组合式API、状态管理、性能优化等核心内容。",
    duration: "5周",
    status: "热门",
    statusColor: "red",
    imageSrc: "https://example.com/vue3-ts.jpg",
    rarityLevel: "普通",
    date: "2024-03-28",
    category: "前端开发",
    rating: 4.7,
    popularity: "高",
    recommendations: 2180,
    duplication: "高"
  },
  {
    id: "xuetang-002",
    title: "网络安全与渗透测试",
    provider: "学堂在线",
    instructor: "钱教授",
    level: 3,
    updatedAt: "12天前",
    responseRate: "86%",
    trend: "+37%",
    heat: 81,
    tags: ["网络安全", "渗透测试", "安全"],
    description: "学习网络安全基础理论和渗透测试实践技能，包括漏洞扫描、安全评估、攻防演练等，成为安全领域专业人才。",
    duration: "6周",
    status: "已发布",
    statusColor: "default",
    imageSrc: "https://example.com/cyber-security.jpg",
    rarityLevel: "稀有",
    date: "2024-03-20",
    category: "网络安全",
    rating: 4.6,
    popularity: "中",
    recommendations: 1240,
    duplication: "低"
  },
  {
    id: "xuetang-003",
    title: "大数据处理与分析",
    provider: "学堂在线",
    instructor: "孙博士",
    level: 3,
    updatedAt: "20天前",
    responseRate: "84%",
    trend: "+32%",
    heat: 79,
    tags: ["大数据", "Hadoop", "Spark"],
    description: "掌握大数据生态系统核心技术，包括Hadoop、Spark、Hive等，学习数据湖构建和大规模数据处理方法。",
    duration: "7周",
    status: "已发布",
    statusColor: "default",
    imageSrc: "https://example.com/big-data.jpg",
    rarityLevel: "普通",
    date: "2024-03-15",
    category: "大数据",
    rating: 4.5,
    popularity: "中",
    recommendations: 1050,
    duplication: "中"
  }
]

function getStatusBadgeVariant(status: string): BadgeProps["variant"] {
  switch (status) {
    case "已发布":
    case "热门":
      return "default"
    case "审核中":
    case "即将开始":
      return "secondary"
    case "草稿":
      return "outline"
    case "最新认证":
      // 如果组件不支持"purple"变种，使用默认变种
      return "default"
    default:
      return "default"
  }
}

function getDuplicationBadgeVariant(duplication: string) {
  switch (duplication) {
    case "高":
      return "destructive"
    case "中":
      return "secondary"
    case "低":
      return "outline"
    default:
      return "outline"
  }
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true);
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCourses();
  }, []);

  // 过滤课程
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = searchTerm === "" || 
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.provider?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === null || course.category === categoryFilter;
    const matchesStatus = statusFilter === null || course.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 提取所有类别
  const categories = Array.from(new Set(courses.map(course => course.category).filter(Boolean)));
  
  // 提取所有状态
  const statuses = Array.from(new Set(courses.map(course => course.status).filter(Boolean)));

  // 获取重复率统计
  const duplicationStats = {
    high: courses.filter(c => c.duplication === "高").length,
    medium: courses.filter(c => c.duplication === "中").length,
    low: courses.filter(c => c.duplication === "低").length,
  };

  // 示例: 获取平均评分
  const averageRating = courses.length > 0 
    ? courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length
    : 0;

  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-blue-800 dark:text-blue-600">课程管理</h2>
            <p className="text-muted-foreground">管理平台收集的所有在线课程</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              添加课程
            </Button>
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              导出
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all-courses" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[600px]">
            <TabsTrigger value="all-courses">全部课程</TabsTrigger>
            <TabsTrigger value="duplications">重复分析</TabsTrigger>
            <TabsTrigger value="quality">质量评估</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-courses" className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索课程名称、提供者、类别..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DatePickerWithRange className="w-[300px]" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Filter className="h-4 w-4" />
                    类别筛选
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>选择类别</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                    全部类别
                  </DropdownMenuItem>
                  {categories.map((category) => category && (
                    <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                    状态筛选
              </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>选择状态</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    全部状态
                  </DropdownMenuItem>
                  {statuses.map((status) => status && (
                    <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    视图
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>排序方式</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>日期（最新优先）</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>日期（最旧优先）</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>评分（最高优先）</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>推荐量（最多优先）</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>热度（最高优先）</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
              <AlertTitle className="text-amber-800 dark:text-amber-500">课程同质化警告</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                系统检测到AI大模型类别的课程同质化程度较高，建议审核内容并优化推荐策略。
              </AlertDescription>
            </Alert>
            
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-lg">加载课程数据...</span>
                  </div>
                ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>课程名称</TableHead>
                        <TableHead>提供者</TableHead>
                        <TableHead>添加日期</TableHead>
                        <TableHead>类别</TableHead>
                        <TableHead>评分</TableHead>
                        <TableHead>热度</TableHead>
                        <TableHead>推荐次数</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>重复率</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCourses.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={10} className="h-24 text-center">
                              没有找到匹配的课程
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredCourses.map((course) => (
                        <TableRow key={course.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span>{course.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>{course.provider}</TableCell>
                              <TableCell>{course.date || course.updatedAt}</TableCell>
                              <TableCell>{course.category || course.tags?.[0]}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                                  <span>{course.rating || (course.heat ? (course.heat / 20).toFixed(1) : "N/A")}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                    (course.popularity === "高" || (course.heat && course.heat > 85))
                                  ? "default"
                                      : (course.popularity === "中" || (course.heat && course.heat > 70 && course.heat <= 85))
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                                  {course.popularity || (course.heat && course.heat > 85 ? "高" : course.heat && course.heat > 70 ? "中" : "低")}
                            </Badge>
                          </TableCell>
                              <TableCell>{course.recommendations || (course.heat ? Math.floor(course.heat * 10) : 0)}</TableCell>
                          <TableCell>
                                <Badge variant={getStatusBadgeVariant(course.status || "已发布")}>
                                  {course.status || "已发布"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                                <Badge variant={getDuplicationBadgeVariant(course.duplication || "中")}>
                                  {course.duplication || "中"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>操作</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>编辑信息</DropdownMenuItem>
                                  <DropdownMenuItem>查看分析</DropdownMenuItem>
                                  <DropdownMenuItem>查看相似课程</DropdownMenuItem>
                                  <DropdownMenuItem>更新内容</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">下架课程</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                          ))
                        )}
                    </TableBody>
                  </Table>
                </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="duplications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>课程重复分析</CardTitle>
                <CardDescription>检测课程内容的重复性与同质化程度</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-lg">分析课程数据中...</span>
                  </div>
                ) : (
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 dark:bg-red-900/20 dark:border-red-800/40">
                    <div className="flex items-center gap-2 mb-2">
                      <Copy className="h-5 w-5 text-red-600 dark:text-red-500" />
                      <h3 className="font-medium text-red-800 dark:text-red-400">高重复度课程组</h3>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                        系统检测到{courses.filter(c => c.title?.includes("AI大模型应用开发")).length}个AI大模型应用开发课程内容重复度超过78%，建议进行合并或差异化处理。
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">课程同质化热点领域</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">AI大模型</span>
                          <span className="text-sm font-medium text-red-500">78% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Java安全</span>
                          <span className="text-sm font-medium text-red-500">72% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-sm">前端开发</span>
                          <span className="text-sm font-medium text-amber-500">63% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "63%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Python基础</span>
                          <span className="text-sm font-medium text-amber-500">54% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "54%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-sm">项目管理</span>
                          <span className="text-sm font-medium text-green-500">23% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "23%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-medium mb-4">重复课程主要来源</h3>
                        <div className="space-y-4">
                          <PieChart 
                            data={[
                              { name: "慕课网", value: courses.filter(c => c.provider === "慕课网").length },
                              { name: "Coursera", value: courses.filter(c => c.provider === "Coursera").length || 3 },
                              { name: "Udemy", value: courses.filter(c => c.provider === "Udemy").length || 2 },
                              { name: "其他", value: courses.filter(c => !["慕课网", "Coursera", "Udemy"].includes(c.provider || "")).length || 2 }
                            ]}
                          />

                          <div className="mt-6">
                            <h4 className="font-medium mb-2">优化建议</h4>
                      <div className="space-y-3">
                        <div className="rounded-lg border p-3 bg-gray-50 dark:bg-gray-900">
                          <div className="font-medium text-primary mb-1">合并重复内容</div>
                          <p className="text-sm text-muted-foreground">对于内容高度重叠的课程，建议保留最优质的几门，避免用户选择困难</p>
                        </div>
                        
                        <div className="rounded-lg border p-3 bg-gray-50 dark:bg-gray-900">
                          <div className="font-medium text-primary mb-1">差异化呈现</div>
                          <p className="text-sm text-muted-foreground">根据课程的独特优势进行差异化标记和推荐，如"互动性强"、"实例丰富"等</p>
                        </div>
                        
                        <div className="rounded-lg border p-3 bg-gray-50 dark:bg-gray-900">
                          <div className="font-medium text-primary mb-1">内容更新提醒</div>
                          <p className="text-sm text-muted-foreground">向内容提供方发送差异化建议，指导其对内容进行更新与优化</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quality" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>课程质量评估</CardTitle>
                <CardDescription>课程内容质量与用户反馈分析</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-lg">生成质量报告中...</span>
                  </div>
                ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <CardHeader className="py-4 px-5">
                          <CardTitle className="text-base text-center">平均评分</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-5 flex flex-col items-center">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {courses.length > 0
                              ? (courses.reduce((sum, course) => {
                                  // 如果有评分，使用评分
                                  if (course.rating) {
                                    return sum + course.rating;
                                  }
                                  // 否则，如果有热度，将热度转换为评分（最高5分）
                                  else if (course.heat) {
                                    return sum + (course.heat / 20);
                                  }
                                  // 如果都没有，返回0
                                  return sum;
                                }, 0) / courses.length).toFixed(2)
                              : "0.00"
                            }
                          </div>
                          <p className="text-xs text-muted-foreground text-center">满分5分，位于前10%</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <CardHeader className="py-4 px-5">
                          <CardTitle className="text-base text-center">热度增长</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-5 flex flex-col items-center">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {courses.length > 0
                              ? `+${Math.floor(courses.reduce((sum, course) => {
                                  const trendMatch = course.trend?.match(/\+(\d+)%/);
                                  return sum + (trendMatch ? parseInt(trendMatch[1]) : 0);
                                }, 0) / courses.length)}%`
                              : "+0%"
                            }
                          </div>
                          <p className="text-xs text-muted-foreground text-center">近30天热度增长</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <CardHeader className="py-4 px-5">
                          <CardTitle className="text-base text-center">响应率</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-5 flex flex-col items-center">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {courses.length > 0
                              ? `${Math.floor(courses.reduce((sum, course) => {
                                  const rateMatch = course.responseRate?.match(/(\d+)%/);
                                  return sum + (rateMatch ? parseInt(rateMatch[1]) : 0);
                                }, 0) / courses.length)}%`
                              : "0%"
                            }
                          </div>
                          <p className="text-xs text-muted-foreground text-center">讲师平均响应率</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">课程质量分布</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 text-sm text-muted-foreground">课程稀有度分布</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                                <span className="text-sm">史诗</span>
                              </div>
                              <span className="text-sm">
                                {Math.round((courses.filter(c => c.rarityLevel === "史诗").length / Math.max(courses.length, 1)) * 100)}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                <span className="text-sm">稀有</span>
                              </div>
                              <span className="text-sm">
                                {Math.round((courses.filter(c => c.rarityLevel === "稀有").length / Math.max(courses.length, 1)) * 100)}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-sm">普通</span>
                              </div>
                              <span className="text-sm">
                                {Math.round((courses.filter(c => c.rarityLevel === "普通").length / Math.max(courses.length, 1)) * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3 text-sm text-muted-foreground">热度分布</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs w-14">90-100</span>
                              <div className="flex-1 bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                                <div className="bg-red-500 h-2 rounded-full" 
                                  style={{ width: `${Math.round((courses.filter(c => (c.heat || 0) >= 90).length / Math.max(courses.length, 1)) * 100)}%` }}>
                                </div>
                              </div>
                              <span className="text-xs w-8">
                                {courses.filter(c => (c.heat || 0) >= 90).length}门
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs w-14">80-89</span>
                              <div className="flex-1 bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                                <div className="bg-orange-500 h-2 rounded-full" 
                                  style={{ width: `${Math.round((courses.filter(c => (c.heat || 0) >= 80 && (c.heat || 0) < 90).length / Math.max(courses.length, 1)) * 100)}%` }}>
                                </div>
                              </div>
                              <span className="text-xs w-8">
                                {courses.filter(c => (c.heat || 0) >= 80 && (c.heat || 0) < 90).length}门
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs w-14">70-79</span>
                              <div className="flex-1 bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                                <div className="bg-yellow-500 h-2 rounded-full" 
                                  style={{ width: `${Math.round((courses.filter(c => (c.heat || 0) >= 70 && (c.heat || 0) < 80).length / Math.max(courses.length, 1)) * 100)}%` }}>
                                </div>
                              </div>
                              <span className="text-xs w-8">
                                {courses.filter(c => (c.heat || 0) >= 70 && (c.heat || 0) < 80).length}门
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs w-14">0-69</span>
                              <div className="flex-1 bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                                <div className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${Math.round((courses.filter(c => (c.heat || 0) < 70).length / Math.max(courses.length, 1)) * 100)}%` }}>
                                </div>
                              </div>
                              <span className="text-xs w-8">
                                {courses.filter(c => (c.heat || 0) < 70).length}门
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 dark:bg-blue-900/20 dark:border-blue-800/40 mt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                        <h3 className="font-medium text-blue-800 dark:text-blue-400">质量审核建议</h3>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        近期AI大模型相关课程质量参差不齐，建议对{courses.filter(c => c.title?.toLowerCase().includes("ai") && (c.heat || 0) < 75).length}门低热度AI课程进行内容审核，提高推荐排名精准度。
                      </p>
                    </div>
                </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 