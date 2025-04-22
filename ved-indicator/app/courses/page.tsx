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
  
  // 添加搜索相关状态
  const [searchTerm, setSearchTerm] = useState("")
  const [searchMode, setSearchMode] = useState<"text" | "voice" | "image">("text")
  const [isSearching, setIsSearching] = useState(false)
  
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
      trend: "+31%",
      heat: 80,
      tags: ["移动开发", "UI/UX", "React Native"],
      description: "专注于移动应用的开发与优化，提升用户体验和界面设计能力",
      duration: "8周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    // 从Excel导入的新课程数据
    {
      id: "excel1",
      title: "AI驱动的前端开发",
      provider: "腾讯课堂",
      instructor: "张明",
      level: 4,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+52%",
      heat: 95,
      tags: ["AI", "前端", "React"],
      description: "学习如何使用AI辅助工具加速前端开发，包括自动化代码生成和智能UI设计",
      duration: "10周",
      status: "最新上线",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel2",
      title: "大数据与商业智能",
      provider: "清华大学网络学院",
      instructor: "李强",
      level: 5,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+38%",
      heat: 88,
      tags: ["大数据", "BI", "数据挖掘"],
      description: "深入学习如何利用大数据技术进行商业决策分析，提升企业竞争力",
      duration: "16周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel3",
      title: "云计算架构设计师",
      provider: "阿里云大学",
      instructor: "王建国",
      level: 5,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+45%",
      heat: 92,
      tags: ["云计算", "架构设计", "AWS"],
      description: "从入门到精通，全面掌握云计算架构设计原则和实践技能",
      duration: "12周",
      status: "认证课程",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel4",
      title: "全栈DevOps工程师",
      provider: "极客大学",
      instructor: "陈志强",
      level: 4,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+40%",
      heat: 89,
      tags: ["DevOps", "自动化", "CI/CD"],
      description: "学习DevOps文化与工具链，实现开发、测试与运维的无缝集成",
      duration: "14周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel5",
      title: "Web3.0与元宇宙开发",
      provider: "未来学院",
      instructor: "刘天明",
      level: 5,
      updatedAt: "1天前",
      responseRate: "一般",
      trend: "+60%",
      heat: 97,
      tags: ["Web3", "元宇宙", "区块链"],
      description: "探索Web3.0技术与元宇宙应用开发，把握未来数字经济发展方向",
      duration: "16周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel6",
      title: "低代码平台开发实战",
      provider: "微软技术社区",
      instructor: "赵雪",
      level: 3,
      updatedAt: "6天前",
      responseRate: "快速",
      trend: "+35%",
      heat: 85,
      tags: ["低代码", "快速开发", "平台设计"],
      description: "掌握低代码平台的设计与开发技能，提高企业应用交付速度",
      duration: "8周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    // 添加Excel中的更多数据
    {
      id: "excel7",
      title: "产品经理数字化转型",
      provider: "产品思维学院",
      instructor: "王梅",
      level: 3,
      updatedAt: "4天前",
      responseRate: "一般",
      trend: "+33%",
      heat: 83,
      tags: ["产品管理", "数字化", "用户体验"],
      description: "学习数字化时代的产品管理方法论，提升产品规划与执行能力",
      duration: "10周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel8",
      title: "网络安全高级渗透测试",
      provider: "安全领导者联盟",
      instructor: "张卫国",
      level: 5,
      updatedAt: "1周前",
      responseRate: "快速",
      trend: "+42%",
      heat: 91,
      tags: ["网络安全", "渗透测试", "安全防护"],
      description: "掌握高级网络安全渗透测试技术，提升企业安全防护能力",
      duration: "12周",
      status: "认证课程",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel9",
      title: "5G通信技术与应用",
      provider: "通信工程学院",
      instructor: "李明亮",
      level: 4,
      updatedAt: "2周前",
      responseRate: "一般",
      trend: "+36%",
      heat: 84,
      tags: ["5G", "通信技术", "物联网"],
      description: "全面了解5G通信技术原理与应用场景，把握未来通信发展方向",
      duration: "14周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel10",
      title: "量子计算入门与实践",
      provider: "未来科技研究院",
      instructor: "赵量子",
      level: 5,
      updatedAt: "5天前",
      responseRate: "慢速",
      trend: "+55%",
      heat: 94,
      tags: ["量子计算", "物理", "编程"],
      description: "探索量子计算的基础原理与编程模型，了解前沿量子算法",
      duration: "16周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel11",
      title: "金融科技与区块链应用",
      provider: "金融学院",
      instructor: "陈彦宏",
      level: 4,
      updatedAt: "1天前",
      responseRate: "快速",
      trend: "+39%",
      heat: 87,
      tags: ["金融科技", "区块链", "支付系统"],
      description: "学习金融科技创新与区块链在金融领域的应用，把握行业发展趋势",
      duration: "10周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel12",
      title: "自动驾驶算法与系统",
      provider: "智能交通研究所",
      instructor: "林自驾",
      level: 5,
      updatedAt: "3天前",
      responseRate: "一般",
      trend: "+48%",
      heat: 93,
      tags: ["自动驾驶", "计算机视觉", "机器学习"],
      description: "深入学习自动驾驶核心算法与系统架构，掌握前沿技术与实践方法",
      duration: "16周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel13",
      title: "增强现实(AR)开发技术",
      provider: "虚拟现实学院",
      instructor: "王增强",
      level: 4,
      updatedAt: "1周前",
      responseRate: "快速",
      trend: "+44%",
      heat: 89,
      tags: ["AR", "3D建模", "Unity"],
      description: "学习增强现实应用开发技术，掌握AR内容创作与交互设计能力",
      duration: "12周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel14",
      title: "数据湖架构与实践",
      provider: "大数据研究院",
      instructor: "张数湖",
      level: 4,
      updatedAt: "6天前",
      responseRate: "一般",
      trend: "+37%",
      heat: 86,
      tags: ["数据湖", "大数据", "云计算"],
      description: "深入理解数据湖架构设计与实施方法，解决企业大数据存储与分析难题",
      duration: "14周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel15",
      title: "高级算法与竞赛编程",
      provider: "算法竞赛学院",
      instructor: "刘算法",
      level: 5,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+30%",
      heat: 82,
      tags: ["算法", "数据结构", "竞赛编程"],
      description: "系统学习高级算法与数据结构，提升解决复杂问题的能力，为编程竞赛做准备",
      duration: "12周",
      status: "精英课程",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel16",
      title: "ChatGPT应用开发实战",
      provider: "OpenAI生态联盟",
      instructor: "马人工",
      level: 3,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+58%",
      heat: 96,
      tags: ["ChatGPT", "AI", "应用开发"],
      description: "学习如何利用ChatGPT API开发智能应用，打造AI驱动的产品与服务",
      duration: "8周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel17",
      title: "物联网与智慧城市",
      provider: "城市科技学院",
      instructor: "钱智慧",
      level: 4,
      updatedAt: "1周前", 
      responseRate: "一般",
      trend: "+34%",
      heat: 83,
      tags: ["物联网", "智慧城市", "传感器网络"],
      description: "探索物联网技术在智慧城市中的应用，学习智能基础设施与服务设计",
      duration: "14周",
      status: "行业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel18",
      title: "生物信息学与基因组分析",
      provider: "生物技术研究所",
      instructor: "周基因",
      level: 5,
      updatedAt: "3天前",
      responseRate: "慢速",
      trend: "+41%",
      heat: 88,
      tags: ["生物信息", "基因组学", "数据分析"],
      description: "学习生物信息学关键技术与方法，掌握基因组数据分析与解读能力",
      duration: "16周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel19",
      title: "可穿戴设备开发技术",
      provider: "智能硬件学院",
      instructor: "郑可穿",
      level: 4,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+38%",
      heat: 85,
      tags: ["可穿戴设备", "嵌入式系统", "传感器"],
      description: "学习可穿戴设备的设计与开发技术，包括硬件集成、软件开发和用户体验优化",
      duration: "12周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel20",
      title: "情感计算与人机交互",
      provider: "交互设计学院",
      instructor: "黄情感",
      level: 4,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+40%",
      heat: 87,
      tags: ["情感计算", "人机交互", "用户体验"],
      description: "探索情感计算在人机交互中的应用，设计更具情感体验的交互界面与系统",
      duration: "10周",
      status: "前沿课程",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    // 继续添加更多Excel数据（21-40）
    {
      id: "excel21",
      title: "工业4.0与智能制造",
      provider: "工业工程学院",
      instructor: "李智能",
      level: 4,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+43%",
      heat: 89,
      tags: ["工业4.0", "智能制造", "自动化"],
      description: "学习工业4.0核心概念与智能制造技术，掌握数字化工厂规划与实施能力",
      duration: "14周",
      status: "行业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel22",
      title: "无人机应用开发",
      provider: "航空科技学院",
      instructor: "王飞行",
      level: 3,
      updatedAt: "5天前",
      responseRate: "一般",
      trend: "+36%",
      heat: 85,
      tags: ["无人机", "航拍", "嵌入式系统"],
      description: "掌握无人机编程与应用开发，学习飞行控制算法与图像处理技术",
      duration: "10周",
      status: "实践课程",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel23",
      title: "网络空间安全分析",
      provider: "国家安全学院",
      instructor: "张网安",
      level: 5,
      updatedAt: "1周前",
      responseRate: "慢速",
      trend: "+45%",
      heat: 91,
      tags: ["网络安全", "威胁情报", "安全分析"],
      description: "深入学习网络空间安全分析方法，掌握威胁情报收集与安全态势感知技术",
      duration: "16周",
      status: "保密级",
      statusColor: "red",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel24",
      title: "脑机接口技术入门",
      provider: "神经科学研究所",
      instructor: "刘脑机",
      level: 5,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+62%",
      heat: 98,
      tags: ["脑机接口", "神经科学", "信号处理"],
      description: "探索脑机接口前沿技术，学习脑电信号采集与处理方法，开发简单的意念控制应用",
      duration: "16周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel25",
      title: "数字孪生与虚拟仿真",
      provider: "数字技术学院",
      instructor: "周虚拟",
      level: 4,
      updatedAt: "6天前",
      responseRate: "一般",
      trend: "+47%",
      heat: 92,
      tags: ["数字孪生", "虚拟仿真", "建模"],
      description: "学习数字孪生技术与虚拟仿真方法，应用于城市规划、工业设计与产品开发",
      duration: "12周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel26",
      title: "隐私计算与联邦学习",
      provider: "数据安全研究院",
      instructor: "钱隐私",
      level: 5,
      updatedAt: "4天前",
      responseRate: "慢速",
      trend: "+50%",
      heat: 93,
      tags: ["隐私计算", "联邦学习", "数据安全"],
      description: "深入学习隐私计算技术与联邦学习方法，保障数据安全的同时实现多方协作",
      duration: "14周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel27",
      title: "区块链金融与NFT开发",
      provider: "数字经济学院",
      instructor: "孙区块",
      level: 4,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+55%",
      heat: 95,
      tags: ["区块链", "NFT", "数字金融"],
      description: "学习区块链在金融领域的创新应用，掌握NFT开发与数字资产管理技术",
      duration: "12周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel28",
      title: "智能农业与精准种植",
      provider: "农业科技学院",
      instructor: "赵智农",
      level: 3,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+32%",
      heat: 81,
      tags: ["智能农业", "物联网", "数据分析"],
      description: "探索智能农业技术应用，学习精准种植方法与农业物联网系统开发",
      duration: "10周",
      status: "行业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel29",
      title: "新能源汽车技术",
      provider: "汽车工程学院",
      instructor: "吴新能",
      level: 4,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+41%",
      heat: 88,
      tags: ["新能源", "电动汽车", "智能控制"],
      description: "系统学习新能源汽车核心技术，包括电池管理、电驱动系统与智能控制",
      duration: "14周",
      status: "企业合作",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel30",
      title: "空间数据科学与遥感",
      provider: "地理信息学院",
      instructor: "郑遥感",
      level: 4,
      updatedAt: "3天前",
      responseRate: "一般",
      trend: "+34%",
      heat: 83,
      tags: ["空间数据", "遥感", "GIS"],
      description: "掌握空间数据分析与遥感图像处理技术，应用于环境监测、城市规划等领域",
      duration: "12周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel31",
      title: "医疗人工智能应用",
      provider: "医学AI研究院",
      instructor: "陈医智",
      level: 5,
      updatedAt: "1天前",
      responseRate: "快速",
      trend: "+53%",
      heat: 94,
      tags: ["医疗AI", "影像识别", "临床决策"],
      description: "探索AI在医疗领域的前沿应用，学习医学影像分析与智能诊断系统开发",
      duration: "16周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel32",
      title: "绿色计算与节能优化",
      provider: "可持续发展研究院",
      instructor: "林节能",
      level: 3,
      updatedAt: "6天前",
      responseRate: "一般",
      trend: "+30%",
      heat: 79,
      tags: ["绿色计算", "节能优化", "碳中和"],
      description: "学习数据中心能效优化与绿色计算技术，为实现碳中和目标贡献技术力量",
      duration: "8周",
      status: "ESG认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel33",
      title: "语音交互系统开发",
      provider: "语音技术学院",
      instructor: "王语音",
      level: 4,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+38%",
      heat: 86,
      tags: ["语音识别", "自然语言处理", "交互设计"],
      description: "掌握语音交互系统开发技术，设计与实现智能语音助手和声音交互界面",
      duration: "12周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel34",
      title: "计算创意与生成艺术",
      provider: "数字艺术学院",
      instructor: "张创意",
      level: 3,
      updatedAt: "1周前",
      responseRate: "快速",
      trend: "+46%",
      heat: 90,
      tags: ["生成艺术", "创意编程", "交互设计"],
      description: "探索计算机辅助创意与生成艺术领域，学习算法艺术与交互装置设计",
      duration: "10周",
      status: "创意工作坊",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel35",
      title: "数据可视化高级技术",
      provider: "可视化研究中心",
      instructor: "刘可视",
      level: 4,
      updatedAt: "2天前",
      responseRate: "一般",
      trend: "+35%",
      heat: 84,
      tags: ["数据可视化", "信息设计", "交互视图"],
      description: "掌握高级数据可视化技术与方法，设计直观有效的可视化解决方案",
      duration: "12周",
      status: "实践课程",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel36",
      title: "机器视觉与3D感知",
      provider: "感知技术学院",
      instructor: "赵视觉",
      level: 5,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+49%",
      heat: 92,
      tags: ["机器视觉", "3D感知", "深度学习"],
      description: "学习机器视觉与3D环境感知技术，应用于机器人导航、自动驾驶等领域",
      duration: "14周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel37",
      title: "生物识别与安全认证",
      provider: "生物识别研究所",
      instructor: "钱识别",
      level: 4,
      updatedAt: "3天前",
      responseRate: "一般",
      trend: "+40%",
      heat: 87,
      tags: ["生物识别", "身份认证", "安全技术"],
      description: "掌握指纹、人脸、虹膜等生物识别技术，设计安全可靠的身份认证系统",
      duration: "10周",
      status: "安全认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel38",
      title: "边缘计算与IoT架构",
      provider: "物联网技术学院",
      instructor: "孙边缘",
      level: 4,
      updatedAt: "1周前",
      responseRate: "快速",
      trend: "+43%",
      heat: 89,
      tags: ["边缘计算", "IoT", "分布式系统"],
      description: "学习边缘计算架构与物联网系统设计，优化数据处理与传输效率",
      duration: "12周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel39",
      title: "数字营销与增长黑客",
      provider: "营销技术学院",
      instructor: "吴增长",
      level: 3,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+36%",
      heat: 85,
      tags: ["数字营销", "增长黑客", "用户获取"],
      description: "学习数据驱动的营销方法与增长黑客技术，提升用户获取与转化能力",
      duration: "8周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel40",
      title: "商业智能与决策支持",
      provider: "商业分析学院",
      instructor: "郑智能",
      level: 4,
      updatedAt: "2天前",
      responseRate: "一般",
      trend: "+33%",
      heat: 82,
      tags: ["商业智能", "决策支持", "数据分析"],
      description: "掌握商业智能工具与决策支持系统设计方法，提升企业数据分析能力",
      duration: "10周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    // 继续添加更多Excel数据（41-60）
    {
      id: "excel41",
      title: "图像识别与计算机视觉",
      provider: "人工智能研究院",
      instructor: "李视觉",
      level: 4,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+47%",
      heat: 91,
      tags: ["计算机视觉", "深度学习", "图像识别"],
      description: "深入学习计算机视觉算法与应用，掌握目标检测、图像分割和视觉追踪技术",
      duration: "14周",
      status: "认证课程",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel42",
      title: "区块链底层技术开发",
      provider: "分布式技术学院",
      instructor: "王链开",
      level: 5,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+44%",
      heat: 89,
      tags: ["区块链", "共识算法", "分布式账本"],
      description: "深入区块链底层技术原理，学习共识算法设计与智能合约高级开发",
      duration: "16周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel43",
      title: "自然语言处理与对话系统",
      provider: "语言计算学院",
      instructor: "张自然",
      level: 5,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+51%",
      heat: 93,
      tags: ["NLP", "对话系统", "语义理解"],
      description: "学习自然语言处理核心技术，掌握智能对话系统设计与开发方法",
      duration: "14周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel44",
      title: "云原生应用架构设计",
      provider: "云计算技术学院",
      instructor: "刘云原",
      level: 4,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+39%",
      heat: 87,
      tags: ["云原生", "微服务", "容器化"],
      description: "学习云原生应用设计原则与实践，掌握微服务架构与容器编排技术",
      duration: "12周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel45",
      title: "数据挖掘与预测分析",
      provider: "数据科学研究院",
      instructor: "赵数挖",
      level: 4,
      updatedAt: "4天前",
      responseRate: "一般",
      trend: "+36%",
      heat: 84,
      tags: ["数据挖掘", "预测分析", "机器学习"],
      description: "掌握数据挖掘技术与预测分析方法，从海量数据中发现价值信息",
      duration: "10周",
      status: "更新中",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel46",
      title: "智能推荐系统设计",
      provider: "个性化计算学院",
      instructor: "钱推荐",
      level: 4,
      updatedAt: "1天前",
      responseRate: "快速",
      trend: "+42%",
      heat: 88,
      tags: ["推荐系统", "个性化", "机器学习"],
      description: "学习智能推荐算法与系统设计，提升用户体验与业务转化率",
      duration: "12周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel47",
      title: "网络协议分析与优化",
      provider: "网络工程学院",
      instructor: "孙网络",
      level: 4,
      updatedAt: "6天前",
      responseRate: "慢速",
      trend: "+31%",
      heat: 80,
      tags: ["网络协议", "性能优化", "网络安全"],
      description: "深入分析网络协议原理，学习网络性能优化与安全加固技术",
      duration: "14周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel48",
      title: "知识图谱与语义网络",
      provider: "语义技术研究所",
      instructor: "周知图",
      level: 5,
      updatedAt: "3天前",
      responseRate: "一般",
      trend: "+45%",
      heat: 90,
      tags: ["知识图谱", "语义网络", "本体建模"],
      description: "学习知识图谱构建与应用，掌握语义网络技术与本体建模方法",
      duration: "14周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel49",
      title: "智能游戏开发与设计",
      provider: "游戏技术学院",
      instructor: "吴游戏",
      level: 3,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+38%",
      heat: 86,
      tags: ["游戏开发", "AI游戏", "虚拟世界"],
      description: "学习AI驱动的游戏开发技术，设计智能NPC与沉浸式交互体验",
      duration: "12周",
      status: "创意工作坊",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel50",
      title: "数字货币与支付创新",
      provider: "金融科技学院",
      instructor: "郑数币",
      level: 4,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+49%",
      heat: 92,
      tags: ["数字货币", "支付技术", "金融创新"],
      description: "探索数字货币技术与支付创新，了解CBDC、加密货币与DeFi发展趋势",
      duration: "10周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel51",
      title: "智能合约审计与安全",
      provider: "区块链安全学院",
      instructor: "李合约",
      level: 5,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+43%",
      heat: 89,
      tags: ["智能合约", "安全审计", "漏洞分析"],
      description: "学习智能合约安全审计技术，掌握漏洞检测与防护最佳实践",
      duration: "12周",
      status: "安全认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel52",
      title: "元宇宙内容创作",
      provider: "虚拟世界学院",
      instructor: "王元宇",
      level: 3,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+57%",
      heat: 95,
      tags: ["元宇宙", "3D建模", "虚拟体验"],
      description: "学习元宇宙内容创作技术，设计沉浸式虚拟世界与互动体验",
      duration: "10周",
      status: "创意工作坊",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel53",
      title: "机器学习运维(MLOps)",
      provider: "AI工程学院",
      instructor: "张运维",
      level: 4,
      updatedAt: "3天前",
      responseRate: "一般",
      trend: "+41%",
      heat: 88,
      tags: ["MLOps", "模型部署", "AI工程"],
      description: "掌握机器学习模型从开发到部署的全生命周期管理，建立可靠的AI系统",
      duration: "14周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel54",
      title: "智能物流与供应链优化",
      provider: "物流管理学院",
      instructor: "刘智链",
      level: 3,
      updatedAt: "6天前",
      responseRate: "快速",
      trend: "+32%",
      heat: 81,
      tags: ["智能物流", "供应链", "优化算法"],
      description: "学习智能物流技术与供应链优化方法，提升企业运营效率与降低成本",
      duration: "10周",
      status: "行业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel55",
      title: "密码学与数据安全",
      provider: "信息安全学院",
      instructor: "赵密码",
      level: 5,
      updatedAt: "5天前",
      responseRate: "慢速",
      trend: "+37%",
      heat: 85,
      tags: ["密码学", "数据安全", "隐私保护"],
      description: "深入学习现代密码学原理与应用，掌握数据安全保护与隐私计算技术",
      duration: "14周",
      status: "安全认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel56",
      title: "可解释人工智能",
      provider: "AI伦理研究所",
      instructor: "钱可解",
      level: 5,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+46%",
      heat: 91,
      tags: ["可解释AI", "AI伦理", "模型透明"],
      description: "探索可解释AI技术与方法，设计透明、可信的人工智能系统",
      duration: "12周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel57",
      title: "全栈数据科学实战",
      provider: "数据工程学院",
      instructor: "孙全栈",
      level: 4,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+39%",
      heat: 87,
      tags: ["数据科学", "全栈开发", "数据产品"],
      description: "培养全栈数据科学家能力，从数据获取、分析到产品开发的完整技能",
      duration: "16周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel58",
      title: "智能客服与聊天机器人",
      provider: "服务智能化学院",
      instructor: "周智客",
      level: 3,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+35%",
      heat: 83,
      tags: ["智能客服", "聊天机器人", "NLP"],
      description: "学习智能客服系统与聊天机器人开发，提升企业服务效率与客户体验",
      duration: "8周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel59",
      title: "数据标注与众包平台",
      provider: "众智研究院",
      instructor: "吴众包",
      level: 2,
      updatedAt: "3天前",
      responseRate: "一般",
      trend: "+28%",
      heat: 77,
      tags: ["数据标注", "众包", "AI训练"],
      description: "学习数据标注技术与众包平台运营，为AI模型训练提供高质量数据",
      duration: "6周",
      status: "入门课程",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "低"
    },
    {
      id: "excel60",
      title: "智慧城市规划与设计",
      provider: "城市科学学院",
      instructor: "郑智城",
      level: 4,
      updatedAt: "5天前",
      responseRate: "慢速",
      trend: "+40%",
      heat: 88,
      tags: ["智慧城市", "城市规划", "数据治理"],
      description: "学习智慧城市规划方法与设计原则，应用数字技术解决城市发展难题",
      duration: "14周",
      status: "行业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    // 继续添加更多Excel数据（61-80）
    {
      id: "excel61",
      title: "跨平台移动应用开发",
      provider: "移动技术学院",
      instructor: "李跨平",
      level: 3,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+34%",
      heat: 83,
      tags: ["React Native", "Flutter", "跨平台开发"],
      description: "学习主流跨平台移动应用开发框架，一次编码多端部署",
      duration: "10周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel62",
      title: "时序数据分析与预测",
      provider: "预测科学研究所",
      instructor: "王时序",
      level: 4,
      updatedAt: "4天前",
      responseRate: "一般",
      trend: "+38%",
      heat: 86,
      tags: ["时序数据", "预测分析", "金融预测"],
      description: "掌握时序数据处理与分析技术，应用于金融、能源等领域的预测任务",
      duration: "12周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel63",
      title: "企业级微服务架构",
      provider: "架构师学院",
      instructor: "张微服",
      level: 5,
      updatedAt: "1周前",
      responseRate: "快速",
      trend: "+42%",
      heat: 89,
      tags: ["微服务", "分布式系统", "服务网格"],
      description: "深入学习企业级微服务架构设计与实践，掌握大规模分布式系统开发能力",
      duration: "16周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel64",
      title: "深度强化学习实战",
      provider: "智能决策学院",
      instructor: "刘强化",
      level: 5,
      updatedAt: "3天前",
      responseRate: "慢速",
      trend: "+52%",
      heat: 94,
      tags: ["强化学习", "深度学习", "智能决策"],
      description: "学习深度强化学习算法与应用，解决复杂的序贯决策问题",
      duration: "14周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel65",
      title: "DevSecOps与安全开发",
      provider: "安全开发学院",
      instructor: "赵安全",
      level: 4,
      updatedAt: "5天前",
      responseRate: "一般",
      trend: "+36%",
      heat: 84,
      tags: ["DevSecOps", "安全开发", "CI/CD"],
      description: "将安全融入DevOps流程，构建更安全可靠的软件交付管道",
      duration: "12周",
      status: "安全认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel66",
      title: "数据治理与质量管理",
      provider: "数据管理研究院",
      instructor: "钱数治",
      level: 3,
      updatedAt: "1天前",
      responseRate: "快速",
      trend: "+31%",
      heat: 80,
      tags: ["数据治理", "数据质量", "主数据管理"],
      description: "学习企业数据治理方法论与实践，提升数据质量与资产价值",
      duration: "10周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel67",
      title: "下一代通信网络技术",
      provider: "通信工程学院",
      instructor: "孙通信",
      level: 5,
      updatedAt: "6天前",
      responseRate: "一般",
      trend: "+45%",
      heat: 90,
      tags: ["6G", "网络切片", "低轨卫星"],
      description: "探索下一代通信网络技术与架构，了解6G、卫星互联网等前沿发展",
      duration: "14周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel68",
      title: "智能硬件与物联网开发",
      provider: "物联网学院",
      instructor: "周智硬",
      level: 4,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+39%",
      heat: 87,
      tags: ["智能硬件", "物联网", "嵌入式系统"],
      description: "学习智能硬件产品设计与开发，构建物联网解决方案",
      duration: "12周",
      status: "实践课程",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel69",
      title: "AI艺术与创意生成",
      provider: "创意计算学院",
      instructor: "吴艺术",
      level: 3,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+54%",
      heat: 95,
      tags: ["AI艺术", "生成模型", "创意计算"],
      description: "探索AI辅助创意与艺术生成技术，掌握DALL·E、Midjourney等工具应用",
      duration: "8周",
      status: "创意工作坊",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel70",
      title: "产业数字孪生应用",
      provider: "工业数字化学院",
      instructor: "郑孪生",
      level: 4,
      updatedAt: "5天前",
      responseRate: "一般",
      trend: "+43%",
      heat: 89,
      tags: ["数字孪生", "工业互联网", "预测性维护"],
      description: "学习产业数字孪生技术应用，优化生产流程与预测性维护",
      duration: "14周",
      status: "行业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel71",
      title: "高性能GPU编程",
      provider: "并行计算学院",
      instructor: "李高性",
      level: 5,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+41%",
      heat: 88,
      tags: ["GPU编程", "CUDA", "并行计算"],
      description: "掌握GPU编程技术与CUDA开发，加速科学计算与AI应用",
      duration: "12周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel72",
      title: "区块链治理与经济模型",
      provider: "区块链经济学院",
      instructor: "王治理",
      level: 4,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+38%",
      heat: 86,
      tags: ["区块链治理", "代币经济", "DAO"],
      description: "探索区块链治理机制与代币经济模型设计，了解去中心化自治组织(DAO)实践",
      duration: "10周",
      status: "前沿课程",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel73",
      title: "视频内容分析与理解",
      provider: "多媒体技术学院",
      instructor: "张视频",
      level: 4,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+46%",
      heat: 91,
      tags: ["视频分析", "场景理解", "内容审核"],
      description: "学习视频内容分析技术，实现场景识别、行为检测与内容理解",
      duration: "14周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel74",
      title: "RPA流程自动化开发",
      provider: "自动化技术学院",
      instructor: "刘自动",
      level: 3,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+33%",
      heat: 82,
      tags: ["RPA", "流程自动化", "低代码"],
      description: "掌握机器人流程自动化(RPA)技术，提升企业流程效率与降低运营成本",
      duration: "8周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel75",
      title: "计算广告与营销科学",
      provider: "数字营销学院",
      instructor: "赵广告",
      level: 4,
      updatedAt: "5天前",
      responseRate: "一般",
      trend: "+37%",
      heat: 85,
      tags: ["计算广告", "营销科学", "用户增长"],
      description: "学习计算广告技术与营销科学方法，优化广告投放效果与ROI",
      duration: "12周",
      status: "行业实践",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel76",
      title: "多模态交互系统设计",
      provider: "交互设计学院",
      instructor: "钱多模",
      level: 4,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+48%",
      heat: 92,
      tags: ["多模态交互", "人机界面", "体感交互"],
      description: "学习多模态交互系统设计，整合语音、视觉、手势等多种交互方式",
      duration: "10周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel77",
      title: "数据库系统内核开发",
      provider: "数据库技术学院",
      instructor: "孙内核",
      level: 5,
      updatedAt: "1周前",
      responseRate: "慢速",
      trend: "+39%",
      heat: 87,
      tags: ["数据库内核", "存储引擎", "并发控制"],
      description: "深入数据库系统内核原理与开发，掌握存储引擎设计与查询优化技术",
      duration: "16周",
      status: "精英课程",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel78",
      title: "智能医疗设备开发",
      provider: "医疗技术学院",
      instructor: "周医疗",
      level: 4,
      updatedAt: "6天前",
      responseRate: "一般",
      trend: "+44%",
      heat: 90,
      tags: ["智能医疗", "医疗设备", "健康监测"],
      description: "学习智能医疗设备开发技术，设计智能健康监测与医疗辅助系统",
      duration: "14周",
      status: "医疗认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel79",
      title: "企业知识图谱应用",
      provider: "企业智能学院",
      instructor: "吴知图",
      level: 4,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+35%",
      heat: 84,
      tags: ["知识图谱", "企业智能", "语义搜索"],
      description: "学习企业知识图谱构建与应用，提升企业知识管理与智能决策能力",
      duration: "12周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel80",
      title: "分布式系统与一致性算法",
      provider: "计算机系统学院",
      instructor: "郑分布",
      level: 5,
      updatedAt: "2天前",
      responseRate: "一般",
      trend: "+40%",
      heat: 88,
      tags: ["分布式系统", "一致性算法", "Raft"],
      description: "深入学习分布式系统原理与一致性算法，掌握高可用系统设计方法",
      duration: "14周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    // 最后一批Excel数据（81-100）
    {
      id: "excel81",
      title: "数据中台架构设计",
      provider: "数据架构学院",
      instructor: "李中台",
      level: 4,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+39%",
      heat: 87,
      tags: ["数据中台", "数据治理", "数据服务"],
      description: "学习企业级数据中台设计与实施方法，构建统一数据服务能力",
      duration: "14周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel82",
      title: "机器学习可解释性技术",
      provider: "AI伦理学院",
      instructor: "王可解",
      level: 5,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+47%",
      heat: 91,
      tags: ["可解释性", "AI透明", "模型分析"],
      description: "探索机器学习模型可解释性方法，提升AI系统透明度与可信度",
      duration: "12周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel83",
      title: "低代码应用开发平台",
      provider: "企业应用学院",
      instructor: "张低代",
      level: 3,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+34%",
      heat: 83,
      tags: ["低代码", "企业应用", "快速开发"],
      description: "掌握低代码平台应用开发技术，加速企业数字化应用交付",
      duration: "8周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel84",
      title: "生物特征识别技术",
      provider: "识别技术学院",
      instructor: "刘特征",
      level: 4,
      updatedAt: "2天前",
      responseRate: "一般",
      trend: "+38%",
      heat: 86,
      tags: ["生物识别", "人脸识别", "指纹识别"],
      description: "学习先进生物特征识别技术，应用于安全认证与身份验证系统",
      duration: "12周",
      status: "安全认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel85",
      title: "智能驾驶系统开发",
      provider: "自动驾驶学院",
      instructor: "赵智驾",
      level: 5,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+51%",
      heat: 94,
      tags: ["智能驾驶", "自动驾驶", "传感融合"],
      description: "深入学习智能驾驶系统开发技术，包括感知、决策与控制算法",
      duration: "16周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel86",
      title: "全球定位与导航系统",
      provider: "导航技术学院",
      instructor: "钱导航",
      level: 4,
      updatedAt: "6天前",
      responseRate: "一般",
      trend: "+33%",
      heat: 82,
      tags: ["定位导航", "GNSS", "室内定位"],
      description: "学习全球定位与导航系统技术，掌握精确定位与室内导航方案开发",
      duration: "10周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel87",
      title: "数字资产与NFT创作",
      provider: "数字艺术学院",
      instructor: "孙数艺",
      level: 3,
      updatedAt: "1天前",
      responseRate: "快速",
      trend: "+53%",
      heat: 93,
      tags: ["数字资产", "NFT", "区块链艺术"],
      description: "学习数字资产创作与NFT发行技术，探索区块链艺术新商业模式",
      duration: "8周",
      status: "创意工作坊",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel88",
      title: "远程医疗与健康信息学",
      provider: "健康信息学院",
      instructor: "周远医",
      level: 4,
      updatedAt: "3天前",
      responseRate: "一般",
      trend: "+42%",
      heat: 89,
      tags: ["远程医疗", "健康信息", "医疗数据"],
      description: "学习远程医疗系统开发与健康信息管理技术，提升医疗服务可及性",
      duration: "12周",
      status: "医疗认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel89",
      title: "智能电网与能源互联网",
      provider: "能源技术学院",
      instructor: "吴智能",
      level: 4,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+37%",
      heat: 85,
      tags: ["智能电网", "能源互联", "分布式能源"],
      description: "学习智能电网与能源互联网技术，优化能源生产、传输与消费效率",
      duration: "14周",
      status: "行业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel90",
      title: "智能法律与合规科技",
      provider: "法律科技学院",
      instructor: "郑法科",
      level: 4,
      updatedAt: "1周前",
      responseRate: "一般",
      trend: "+36%",
      heat: 84,
      tags: ["法律科技", "合规科技", "智能合同"],
      description: "探索法律科技创新应用，学习智能合同开发与合规自动化技术",
      duration: "10周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel91",
      title: "图像生成与视觉艺术",
      provider: "视觉艺术学院",
      instructor: "李视艺",
      level: 3,
      updatedAt: "2天前",
      responseRate: "快速",
      trend: "+56%",
      heat: 96,
      tags: ["图像生成", "AI艺术", "视觉创意"],
      description: "学习AI辅助图像生成技术，探索计算机视觉艺术创作新方法",
      duration: "8周",
      status: "创意工作坊",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel92",
      title: "智能制造与工业机器人",
      provider: "制造工程学院",
      instructor: "王智造",
      level: 4,
      updatedAt: "4天前",
      responseRate: "一般",
      trend: "+41%",
      heat: 88,
      tags: ["智能制造", "工业机器人", "工厂自动化"],
      description: "学习智能制造系统规划与工业机器人编程，实现工厂自动化升级",
      duration: "14周",
      status: "行业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel93",
      title: "人机协作与增强劳动力",
      provider: "未来工作研究院",
      instructor: "张人机",
      level: 4,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+44%",
      heat: 90,
      tags: ["人机协作", "增强劳动力", "协作机器人"],
      description: "探索人机协作技术与应用，提升增强型劳动力效率与工作体验",
      duration: "10周",
      status: "前沿技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel94",
      title: "数据标准化与互操作性",
      provider: "数据工程学院",
      instructor: "刘标准",
      level: 3,
      updatedAt: "6天前",
      responseRate: "一般",
      trend: "+32%",
      heat: 81,
      tags: ["数据标准", "互操作性", "元数据管理"],
      description: "学习数据标准化方法与互操作性技术，实现跨系统数据共享与集成",
      duration: "8周",
      status: "企业级",
      statusColor: "blue",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel95",
      title: "量子计算与密码学",
      provider: "量子信息学院",
      instructor: "赵量子",
      level: 5,
      updatedAt: "1周前",
      responseRate: "慢速",
      trend: "+59%",
      heat: 97,
      tags: ["量子计算", "量子密码", "后量子密码"],
      description: "探索量子计算对密码学的影响，学习量子安全通信与后量子密码技术",
      duration: "16周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
    },
    {
      id: "excel96",
      title: "AI系统优化与加速",
      provider: "高性能计算学院",
      instructor: "钱优化",
      level: 5,
      updatedAt: "5天前",
      responseRate: "快速",
      trend: "+46%",
      heat: 91,
      tags: ["AI优化", "模型加速", "推理优化"],
      description: "学习AI系统性能优化与加速技术，实现高效模型训练与推理部署",
      duration: "12周",
      status: "专业认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel97",
      title: "数据隐私保护技术",
      provider: "隐私计算研究院",
      instructor: "孙隐私",
      level: 4,
      updatedAt: "2天前",
      responseRate: "一般",
      trend: "+45%",
      heat: 90,
      tags: ["隐私保护", "联邦学习", "差分隐私"],
      description: "掌握数据隐私保护核心技术，平衡数据价值挖掘与隐私安全保障",
      duration: "14周",
      status: "安全认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高"
    },
    {
      id: "excel98",
      title: "无代码开发与自动化",
      provider: "企业数字化学院",
      instructor: "周无代",
      level: 2,
      updatedAt: "4天前",
      responseRate: "快速",
      trend: "+35%",
      heat: 84,
      tags: ["无代码", "业务自动化", "流程设计"],
      description: "学习无代码开发平台应用，快速构建业务应用与自动化工作流",
      duration: "6周",
      status: "入门课程",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "低"
    },
    {
      id: "excel99",
      title: "智能问答系统开发",
      provider: "对话技术学院",
      instructor: "吴问答",
      level: 4,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+43%",
      heat: 89,
      tags: ["智能问答", "知识库", "对话系统"],
      description: "学习智能问答系统设计与开发，构建企业知识库与用户服务平台",
      duration: "12周",
      status: "热门推荐",
      statusColor: "orange",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "中"
    },
    {
      id: "excel100",
      title: "数字人与虚拟人技术",
      provider: "虚拟人技术学院",
      instructor: "郑数字",
      level: 5,
      updatedAt: "1天前",
      responseRate: "一般",
      trend: "+58%",
      heat: 97,
      tags: ["数字人", "虚拟人", "元宇宙"],
      description: "探索数字人与虚拟人创建技术，学习真实感建模与自然交互系统开发",
      duration: "14周",
      status: "尖端技术",
      statusColor: "purple",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "极高"
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
  
  // 过滤课程
  const filteredCourses = searchTerm.trim() === "" 
    ? courseList 
    : courseList.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  
  // 更新分页逻辑，使用过滤后的课程列表
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
                <span>共找到30579个相关课程</span>
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