"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Book, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Download, 
  ExternalLink, 
  FileText, 
  Flame, 
  Heart, 
  MessageSquare, 
  Moon, 
  Play, 
  Settings, 
  Share, 
  Star, 
  Sun, 
  User, 
  Users, 
  Video 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// 类型定义，解决TypeScript报错
type CourseInfo = {
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
  longDescription: string;
  duration: string;
  totalHours: number;
  status: string;
  statusColor: string;
  imageSrc: string;
  rarityLevel: string;
  popularity: string;
  learningPath: string[];
  prerequisites: string[];
  syllabus: {
    title: string;
    lessons: {
      title: string;
      duration: string;
      type: string;
    }[];
  }[];
  reviews: {
    user: string;
    avatar: string;
    rating: number;
    date: string;
    content: string;
  }[];
  relatedCourses: {
    id: string;
    title: string;
    provider: string;
    level: number;
  }[];
}

type CoursesDB = {
  [key: string]: CourseInfo;
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userName, setUserName] = useState("")
  const [userComment, setUserComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userReviews, setUserReviews] = useState<{user: string; rating: number; date: string; content: string}[]>([])
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }
  
  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
  }
  
  const handleSubmitReview = () => {
    if (userRating === 0) {
      alert("请选择评分")
      return
    }
    
    if (!userName.trim()) {
      alert("请输入您的姓名")
      return
    }
    
    if (!userComment.trim()) {
      alert("请输入评价内容")
      return
    }
    
    setIsSubmitting(true)
    
    // 模拟提交延迟
    setTimeout(() => {
      const newReview = {
        user: userName,
        rating: userRating,
        date: new Date().toISOString().split('T')[0],
        content: userComment
      }
      
      setUserReviews([newReview, ...userReviews])
      setUserRating(0)
      setUserName("")
      setUserComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  // 模拟课程数据库
  const coursesDB: CoursesDB = {
    "ai-intro": {
      id: "ai-intro",
      title: "人工智能导论",
      provider: "斯坦福大学",
      instructor: "李明教授",
      level: 3,
      updatedAt: "2周前",
      responseRate: "24小时内",
      trend: "+78%",
      heat: 96,
      tags: ["AI", "机器学习", "深度学习", "计算机视觉"],
      description: "本课程为人工智能入门课程，全面介绍人工智能的基本概念、核心算法与应用场景。从机器学习基础到深度学习架构，从经典算法到前沿技术，帮助学生构建AI领域的知识体系。",
      longDescription: "人工智能(AI)正在深刻改变我们的世界，从推荐系统到自动驾驶，从医疗诊断到智能助手。本课程由斯坦福大学AI领域专家团队精心打造，为学生提供扎实的人工智能理论基础和实践技能。\n\n课程内容覆盖机器学习、深度学习、计算机视觉、自然语言处理等AI核心领域，从基础概念到实际应用，循序渐进。每个主题都配有精心设计的编程实践，帮助学生巩固所学知识。\n\n通过本课程，你将能够：\n- 理解AI的核心概念和基本原理\n- 掌握机器学习的基本算法和工作流程\n- 了解神经网络架构和深度学习模型\n- 实现简单的计算机视觉和自然语言处理应用\n- 评估AI系统性能并理解其局限性\n- 思考AI的社会影响和伦理问题\n\n课程面向有基础编程经验的学生，推荐具备Python基础。数学背景（线性代数、概率论）有助于更深入理解算法原理，但不是必需的。我们提供丰富的学习资源和社区支持，帮助不同背景的学生顺利完成学习。",
      duration: "8周",
      totalHours: 40,
      status: "热门推荐",
      statusColor: "red",
      imageSrc: "/course-images/ai-intro.jpg",
      rarityLevel: "中",
      popularity: "96%",
      learningPath: ["编程基础", "数学基础", "机器学习", "深度学习"],
      prerequisites: ["Python编程基础", "基础数学知识"],
      syllabus: [
        {
          title: "第1周：人工智能概述",
          lessons: [
            { title: "1.1 人工智能的历史与发展", duration: "50分钟", type: "视频" },
            { title: "1.2 AI的分类与应用场景", duration: "45分钟", type: "视频" },
            { title: "1.3 AI与数据科学的关系", duration: "40分钟", type: "视频" },
            { title: "实战练习：搭建AI开发环境", duration: "60分钟", type: "实验" }
          ]
        },
        {
          title: "第2周：机器学习基础",
          lessons: [
            { title: "2.1 监督学习与无监督学习", duration: "55分钟", type: "视频" },
            { title: "2.2 回归与分类问题", duration: "50分钟", type: "视频" },
            { title: "2.3 模型评估方法", duration: "45分钟", type: "视频" },
            { title: "实战练习：实现简单的回归模型", duration: "70分钟", type: "实验" }
          ]
        },
        {
          title: "第3周：神经网络基础",
          lessons: [
            { title: "3.1 感知器与多层神经网络", duration: "60分钟", type: "视频" },
            { title: "3.2 激活函数与反向传播", duration: "55分钟", type: "视频" },
            { title: "3.3 优化算法概述", duration: "50分钟", type: "视频" },
            { title: "实战练习：从零实现神经网络", duration: "80分钟", type: "实验" }
          ]
        },
        {
          title: "第4周：深度学习架构",
          lessons: [
            { title: "4.1 卷积神经网络(CNN)", duration: "65分钟", type: "视频" },
            { title: "4.2 循环神经网络(RNN)", duration: "60分钟", type: "视频" },
            { title: "4.3 Transformer架构", duration: "70分钟", type: "视频" },
            { title: "实战练习：图像分类实战", duration: "90分钟", type: "实验" }
          ]
        },
        {
          title: "第5周：计算机视觉",
          lessons: [
            { title: "5.1 图像处理基础", duration: "50分钟", type: "视频" },
            { title: "5.2 目标检测与分割", duration: "65分钟", type: "视频" },
            { title: "5.3 人脸识别技术", duration: "55分钟", type: "视频" },
            { title: "实战练习：构建物体检测应用", duration: "85分钟", type: "实验" }
          ]
        },
        {
          title: "第6周：自然语言处理",
          lessons: [
            { title: "6.1 文本处理与表示", duration: "45分钟", type: "视频" },
            { title: "6.2 情感分析与命名实体识别", duration: "50分钟", type: "视频" },
            { title: "6.3 机器翻译与问答系统", duration: "60分钟", type: "视频" },
            { title: "实战练习：文本分类模型", duration: "75分钟", type: "实验" }
          ]
        },
        {
          title: "第7周：强化学习",
          lessons: [
            { title: "7.1 强化学习基本概念", duration: "55分钟", type: "视频" },
            { title: "7.2 Q-Learning与策略梯度", duration: "65分钟", type: "视频" },
            { title: "7.3 深度强化学习", duration: "60分钟", type: "视频" },
            { title: "实战练习：训练游戏AI", duration: "95分钟", type: "实验" }
          ]
        },
        {
          title: "第8周：AI伦理与未来",
          lessons: [
            { title: "8.1 AI伦理与偏见问题", duration: "50分钟", type: "视频" },
            { title: "8.2 隐私与安全挑战", duration: "45分钟", type: "视频" },
            { title: "8.3 AI技术前沿与未来趋势", duration: "60分钟", type: "视频" },
            { title: "综合项目：设计负责任的AI应用", duration: "100分钟", type: "实验" }
          ]
        }
      ],
      reviews: [
        {
          user: "张小明",
          avatar: "/avatars/user1.jpg",
          rating: 5,
          date: "2023-12-05",
          content: "课程内容非常全面，从AI基础概念到前沿技术都有涵盖。老师讲解清晰，示例丰富，特别是实战部分给我提供了很多实际操作的机会。作为AI初学者，这门课程是绝佳的入门选择。"
        },
        {
          user: "王芳",
          avatar: "/avatars/user2.jpg",
          rating: 4,
          date: "2024-01-12",
          content: "内容丰富，讲解透彻，实践项目设计合理。唯一的小缺点是有些数学概念讲解稍显仓促，可能需要额外查阅资料。总体来说是一门优质的AI入门课程，强烈推荐！"
        },
        {
          user: "李强",
          avatar: "/avatars/user3.jpg",
          rating: 5,
          date: "2024-02-08",
          content: "本来对AI一无所知，通过这门课程系统地学习了AI的基础知识。课程结构清晰，进度合理，实践与理论结合得很好。最重要的是，老师的解释让复杂的概念变得容易理解。学完后已经能够独立开发简单的AI应用了。"
        },
        {
          user: "赵静",
          avatar: "/avatars/user4.jpg",
          rating: 5,
          date: "2024-02-20",
          content: "作为一名转行人士，这门课程为我打开了AI的大门。从基础理论到实际编码，每个概念都讲解得清晰易懂。课后练习设计得很巧妙，能够强化所学知识。课程社区非常活跃，同学们互相帮助，学习氛围很好。"
        }
      ],
      relatedCourses: [
        { id: "ml-advanced", title: "高级机器学习", provider: "麻省理工学院", level: 4 },
        { id: "dl-practice", title: "深度学习实战", provider: "斯坦福大学", level: 4 },
        { id: "cv-intro", title: "计算机视觉导论", provider: "加州大学伯克利分校", level: 3 }
      ]
    },
    "data-viz": {
      id: "data-viz",
      title: "数据分析与可视化",
      provider: "麻省理工学院",
      instructor: "王德华教授",
      level: 3,
      updatedAt: "1周前",
      responseRate: "12小时内",
      trend: "+65%",
      heat: 94,
      tags: ["数据分析", "可视化", "Python", "统计学", "Tableau"],
      description: "本课程深入探讨数据分析与可视化的原理与实践，从数据处理、统计分析到高级可视化技术，全面提升数据洞察能力。结合Python、R和Tableau等主流工具，通过实际项目培养专业数据分析技能。",
      longDescription: "在当今数据驱动的世界中，能够有效分析和呈现数据已成为各行各业的核心竞争力。本课程由麻省理工学院数据科学团队设计，融合理论与实践，助你掌握专业数据分析与可视化技能。\n\n课程从数据处理基础开始，覆盖探索性数据分析、统计推断、机器学习与高级可视化技术。通过实际案例和项目，学习如何从复杂数据中提取见解并创建引人入胜的数据故事。\n\n通过本课程，你将能够：\n- 掌握数据清洗和预处理的核心技术\n- 应用统计分析方法解释数据模式和趋势\n- 熟练使用Python、Pandas和NumPy进行数据操作\n- 创建专业级数据可视化，利用Matplotlib、Seaborn和Tableau\n- 设计交互式仪表板展示复杂数据\n- 通过数据讲故事有效传达见解\n\n课程面向希望提升数据分析能力的学习者，建议具备基础Python或R编程经验。我们提供全面的学习资料和案例数据集，确保你能将所学应用到实际工作中。",
      duration: "10周",
      totalHours: 45,
      status: "推荐课程",
      statusColor: "green",
      imageSrc: "/course-images/data-viz.jpg",
      rarityLevel: "中",
      popularity: "94%",
      learningPath: ["数据基础", "统计分析", "数据可视化", "交互式仪表板"],
      prerequisites: ["基础Python或R", "初级统计学知识"],
      syllabus: [
        {
          title: "第1周：数据分析导论",
          lessons: [
            { title: "1.1 数据分析流程与方法论", duration: "55分钟", type: "视频" },
            { title: "1.2 数据类型与结构", duration: "45分钟", type: "视频" },
            { title: "1.3 分析工具生态概述", duration: "40分钟", type: "视频" },
            { title: "实战练习：搭建分析环境", duration: "60分钟", type: "实验" }
          ]
        },
        {
          title: "第2周：数据获取与清洗",
          lessons: [
            { title: "2.1 数据采集技术", duration: "50分钟", type: "视频" },
            { title: "2.2 数据质量与清洗方法", duration: "60分钟", type: "视频" },
            { title: "2.3 Pandas高级数据处理", duration: "65分钟", type: "视频" },
            { title: "实战练习：处理真实世界数据集", duration: "80分钟", type: "实验" }
          ]
        },
        {
          title: "第3周：探索性数据分析",
          lessons: [
            { title: "3.1 描述性统计与数据分布", duration: "45分钟", type: "视频" },
            { title: "3.2 相关性分析", duration: "50分钟", type: "视频" },
            { title: "3.3 异常检测技术", duration: "55分钟", type: "视频" },
            { title: "实战练习：销售数据探索分析", duration: "75分钟", type: "实验" }
          ]
        },
        {
          title: "第4周：统计分析基础",
          lessons: [
            { title: "4.1 概率分布与抽样", duration: "60分钟", type: "视频" },
            { title: "4.2 假设检验", duration: "70分钟", type: "视频" },
            { title: "4.3 回归分析基础", duration: "65分钟", type: "视频" },
            { title: "实战练习：市场调研数据分析", duration: "85分钟", type: "实验" }
          ]
        },
        {
          title: "第5周：数据可视化原理",
          lessons: [
            { title: "5.1 可视化设计原则", duration: "50分钟", type: "视频" },
            { title: "5.2 图表类型与适用场景", duration: "55分钟", type: "视频" },
            { title: "5.3 色彩理论与视觉感知", duration: "40分钟", type: "视频" },
            { title: "实战练习：改进糟糕的可视化", duration: "65分钟", type: "实验" }
          ]
        },
        {
          title: "第6周：Python可视化工具",
          lessons: [
            { title: "6.1 Matplotlib深入探究", duration: "60分钟", type: "视频" },
            { title: "6.2 Seaborn统计可视化", duration: "55分钟", type: "视频" },
            { title: "6.3 Plotly交互式图表", duration: "65分钟", type: "视频" },
            { title: "实战练习：构建分析报告", duration: "90分钟", type: "实验" }
          ]
        },
        {
          title: "第7周：地理空间数据可视化",
          lessons: [
            { title: "7.1 地理数据基础", duration: "45分钟", type: "视频" },
            { title: "7.2 交互式地图创建", duration: "60分钟", type: "视频" },
            { title: "7.3 时空数据分析", duration: "55分钟", type: "视频" },
            { title: "实战练习：区域销售分析地图", duration: "85分钟", type: "实验" }
          ]
        },
        {
          title: "第8周：高级Tableau技术",
          lessons: [
            { title: "8.1 Tableau界面与数据连接", duration: "50分钟", type: "视频" },
            { title: "8.2 创建交互式仪表板", duration: "65分钟", type: "视频" },
            { title: "8.3 高级计算与参数", duration: "60分钟", type: "视频" },
            { title: "实战练习：业务智能仪表板", duration: "95分钟", type: "实验" }
          ]
        },
        {
          title: "第9周：数据故事讲述",
          lessons: [
            { title: "9.1 数据叙事结构", duration: "45分钟", type: "视频" },
            { title: "9.2 受众分析与内容调整", duration: "40分钟", type: "视频" },
            { title: "9.3 演示技巧与最佳实践", duration: "50分钟", type: "视频" },
            { title: "实战练习：创建数据故事", duration: "70分钟", type: "实验" }
          ]
        },
        {
          title: "第10周：综合项目与前沿技术",
          lessons: [
            { title: "10.1 数据分析工作流自动化", duration: "55分钟", type: "视频" },
            { title: "10.2 可视化前沿技术", duration: "50分钟", type: "视频" },
            { title: "10.3 AI辅助数据分析", duration: "60分钟", type: "视频" },
            { title: "综合项目：端到端数据分析", duration: "120分钟", type: "实验" }
          ]
        }
      ],
      reviews: [
        {
          user: "陈建国",
          avatar: "/avatars/user5.jpg",
          rating: 5,
          date: "2024-01-18",
          content: "非常棒的课程！课程内容非常全面，从数据处理到高级可视化都有深入讲解。特别喜欢Tableau部分的内容，直接应用到了工作中的项目，得到了领导的高度评价。"
        },
        {
          user: "刘梦",
          avatar: "/avatars/user6.jpg",
          rating: 4,
          date: "2024-02-05",
          content: "课程质量很高，讲师经验丰富，案例也很贴近实际工作场景。唯一的小缺点是地理空间可视化部分有些复杂，需要多花时间消化。总体来说非常值得学习！"
        },
        {
          user: "张伟",
          avatar: "/avatars/user7.jpg",
          rating: 5,
          date: "2024-02-22",
          content: "作为一名市场分析师，这门课程极大提升了我的数据分析能力。学完后能够自己创建专业的分析报告和仪表板，不再依赖数据团队。课程社区非常活跃，同学们互相分享案例和代码很有帮助。"
        },
        {
          user: "林小华",
          avatar: "/avatars/user8.jpg",
          rating: 5,
          date: "2024-03-10",
          content: "从未想过数据可视化可以如此有趣！课程不仅教授技术，还注重设计原则和数据叙事能力培养。项目实践安排得很合理，循序渐进，最终能够独立完成复杂的分析项目。强烈推荐给所有需要处理数据的人。"
        }
      ],
      relatedCourses: [
        { id: "ai-intro", title: "人工智能导论", provider: "斯坦福大学", level: 3 },
        { id: "web-dev", title: "Web全栈开发", provider: "加州大学伯克利分校", level: 4 },
        { id: "big-data", title: "大数据分析与处理", provider: "麻省理工学院", level: 4 }
      ]
    },
    "web-dev": {
      id: "web-dev",
      title: "Web全栈开发",
      provider: "加州大学伯克利分校",
      instructor: "马克·约翰逊教授",
      level: 4,
      updatedAt: "3天前",
      responseRate: "24小时内",
      trend: "+85%",
      heat: 97,
      tags: ["前端", "后端", "JavaScript", "React", "Node.js", "数据库"],
      description: "本课程全面覆盖现代Web开发技术栈，从HTML/CSS/JavaScript到React前端框架，从Node.js后端到数据库设计与部署。通过构建真实项目，掌握全栈开发工作流程，成为独当一面的Web开发工程师。",
      longDescription: "Web开发领域日新月异，全栈工程师成为当今科技行业最炙手可热的人才。本课程由伯克利计算机科学系顶尖教授团队打造，融合学术理论与工业实践，带你全面掌握现代Web开发技能。\n\n课程采用项目驱动教学法，从基础前端技术开始，逐步深入到高级框架、后端开发、数据库设计和云部署。通过构建多个实际应用，体验完整的开发流程，培养解决实际问题的能力。\n\n通过本课程，你将能够：\n- 熟练运用HTML5、CSS3和JavaScript(ES6+)构建响应式网站\n- 掌握React生态系统，构建现代单页应用\n- 使用Node.js和Express开发RESTful API\n- 设计并实现关系型和非关系型数据库\n- 应用DevOps最佳实践，部署和维护Web应用\n- 理解Web安全原则并防范常见攻击\n\n课程适合有基础编程知识的学习者，特别是希望转型为全栈开发者的程序员。我们提供详细的学习资料、代码库和在线辅导，确保你能够跟上课程进度并掌握核心技能。",
      duration: "12周",
      totalHours: 60,
      status: "热门课程",
      statusColor: "orange",
      imageSrc: "/course-images/web-dev.jpg",
      rarityLevel: "高",
      popularity: "97%",
      learningPath: ["HTML/CSS基础", "JavaScript编程", "前端框架", "后端开发", "数据库", "部署与优化"],
      prerequisites: ["基础编程知识", "简单的HTML/CSS经验"],
      syllabus: [
        {
          title: "第1周：Web开发基础",
          lessons: [
            { title: "1.1 Web技术发展历程", duration: "45分钟", type: "视频" },
            { title: "1.2 HTML5语义化标签", duration: "60分钟", type: "视频" },
            { title: "1.3 CSS3核心特性", duration: "65分钟", type: "视频" },
            { title: "实战练习：构建响应式登录页", duration: "90分钟", type: "实验" }
          ]
        },
        {
          title: "第2周：JavaScript基础与ES6+",
          lessons: [
            { title: "2.1 JavaScript核心概念", duration: "70分钟", type: "视频" },
            { title: "2.2 ES6+新特性详解", duration: "65分钟", type: "视频" },
            { title: "2.3 异步编程与Promise", duration: "75分钟", type: "视频" },
            { title: "实战练习：交互式网页组件", duration: "85分钟", type: "实验" }
          ]
        },
        {
          title: "第3周：现代CSS技术",
          lessons: [
            { title: "3.1 Flexbox与Grid布局", duration: "60分钟", type: "视频" },
            { title: "3.2 CSS变量与计算", duration: "50分钟", type: "视频" },
            { title: "3.3 CSS动画与转场", duration: "55分钟", type: "视频" },
            { title: "实战练习：构建响应式仪表板", duration: "95分钟", type: "实验" }
          ]
        },
        {
          title: "第4周：React基础",
          lessons: [
            { title: "4.1 React核心概念", duration: "70分钟", type: "视频" },
            { title: "4.2 组件与Props", duration: "65分钟", type: "视频" },
            { title: "4.3 状态管理与生命周期", duration: "75分钟", type: "视频" },
            { title: "实战练习：Todo应用开发", duration: "100分钟", type: "实验" }
          ]
        },
        {
          title: "第5周：React高级概念",
          lessons: [
            { title: "5.1 Hooks详解", duration: "80分钟", type: "视频" },
            { title: "5.2 Context与全局状态", duration: "60分钟", type: "视频" },
            { title: "5.3 性能优化技巧", duration: "65分钟", type: "视频" },
            { title: "实战练习：购物车功能实现", duration: "110分钟", type: "实验" }
          ]
        },
        {
          title: "第6周：前端路由与状态管理",
          lessons: [
            { title: "6.1 React Router详解", duration: "60分钟", type: "视频" },
            { title: "6.2 Redux核心概念", duration: "75分钟", type: "视频" },
            { title: "6.3 Redux中间件与异步操作", duration: "70分钟", type: "视频" },
            { title: "实战练习：多页面应用开发", duration: "120分钟", type: "实验" }
          ]
        },
        {
          title: "第7周：Node.js与Express",
          lessons: [
            { title: "7.1 Node.js运行时详解", duration: "55分钟", type: "视频" },
            { title: "7.2 Express框架基础", duration: "65分钟", type: "视频" },
            { title: "7.3 中间件与路由系统", duration: "60分钟", type: "视频" },
            { title: "实战练习：构建RESTful API", duration: "100分钟", type: "实验" }
          ]
        },
        {
          title: "第8周：数据库设计与实现",
          lessons: [
            { title: "8.1 关系型数据库设计", duration: "70分钟", type: "视频" },
            { title: "8.2 MongoDB与NoSQL", duration: "65分钟", type: "视频" },
            { title: "8.3 ORM与数据访问层", duration: "60分钟", type: "视频" },
            { title: "实战练习：实现数据持久化", duration: "110分钟", type: "实验" }
          ]
        },
        {
          title: "第9周：用户认证与授权",
          lessons: [
            { title: "9.1 身份验证原理", duration: "50分钟", type: "视频" },
            { title: "9.2 JWT详解与实现", duration: "65分钟", type: "视频" },
            { title: "9.3 OAuth与第三方登录", duration: "60分钟", type: "视频" },
            { title: "实战练习：实现完整登录系统", duration: "105分钟", type: "实验" }
          ]
        },
        {
          title: "第10周：Web安全",
          lessons: [
            { title: "10.1 常见Web漏洞分析", duration: "65分钟", type: "视频" },
            { title: "10.2 XSS与CSRF防御", duration: "60分钟", type: "视频" },
            { title: "10.3 安全最佳实践", duration: "55分钟", type: "视频" },
            { title: "实战练习：安全审计与修复", duration: "90分钟", type: "实验" }
          ]
        },
        {
          title: "第11周：测试与CI/CD",
          lessons: [
            { title: "11.1 前端测试策略", duration: "60分钟", type: "视频" },
            { title: "11.2 后端单元与集成测试", duration: "65分钟", type: "视频" },
            { title: "11.3 CI/CD流程实现", duration: "70分钟", type: "视频" },
            { title: "实战练习：构建测试与部署流水线", duration: "110分钟", type: "实验" }
          ]
        },
        {
          title: "第12周：部署与性能优化",
          lessons: [
            { title: "12.1 云平台部署策略", duration: "60分钟", type: "视频" },
            { title: "12.2 容器化与Docker", duration: "70分钟", type: "视频" },
            { title: "12.3 前后端性能优化", duration: "65分钟", type: "视频" },
            { title: "综合项目：全栈应用上线", duration: "130分钟", type: "实验" }
          ]
        }
      ],
      reviews: [
        {
          user: "李俊",
          avatar: "/avatars/user9.jpg",
          rating: 5,
          date: "2024-01-25",
          content: "真正的全栈课程！理论与实践结合得非常好，几乎覆盖了所有Web开发所需的技术。特别欣赏课程对最新技术的及时更新，React Hooks和现代CSS技术讲解得非常透彻。"
        },
        {
          user: "赵雯",
          avatar: "/avatars/user10.jpg",
          rating: 5,
          date: "2024-02-12",
          content: "作为一名转行的设计师，这门课程让我成功转型为全栈开发者。从零开始，一步步构建复杂应用的过程非常清晰。项目驱动的教学方式让人始终保持高度参与感，强烈推荐！"
        },
        {
          user: "王子豪",
          avatar: "/avatars/user11.jpg",
          rating: 4,
          date: "2024-02-28",
          content: "课程内容非常全面，尤其是React和Node.js部分讲解得很透彻。唯一的建议是希望增加更多TypeScript的内容，因为这在行业中越来越重要。总体来说是目前遇到的最好的Web开发课程。"
        },
        {
          user: "张晓婷",
          avatar: "/avatars/user12.jpg",
          rating: 5,
          date: "2024-03-15",
          content: "12周的学习彻底改变了我的职业轨迹！课程不仅教授技术，还包含大量工程实践和团队协作经验。最后的综合项目直接成为了我的作品集，帮助我成功获得了理想的开发岗位。感谢马克教授！"
        }
      ],
      relatedCourses: [
        { id: "react-advanced", title: "React高级开发", provider: "Meta官方课程", level: 4 },
        { id: "data-viz", title: "数据分析与可视化", provider: "麻省理工学院", level: 3 },
        { id: "mobile-dev", title: "移动应用开发", provider: "加州大学伯克利分校", level: 4 }
      ]
    },
    "java-dev": {
      id: "java-dev",
      title: "Java企业级应用开发",
      provider: "极客时间",
      instructor: "王刚教授",
      level: 4,
      updatedAt: "1周前",
      responseRate: "24小时内",
      trend: "+72%",
      heat: 90,
      tags: ["Java", "Spring Boot", "微服务", "数据库"],
      description: "本课程深入讲解Java企业级应用开发技术栈，从Java基础到Spring生态，从单体架构到微服务架构。通过实际项目案例，掌握企业级应用设计、开发与部署的全流程，成为优秀的Java开发工程师。",
      longDescription: "Java企业级应用开发是当今IT行业最稳定且高薪的技术领域之一。本课程由资深Java架构师精心设计，结合实际企业项目经验，全面讲解Java企业级应用开发技术栈。\n\n课程从Java核心基础开始，逐步深入Spring生态系统，重点讲解Spring Boot、Spring Cloud微服务架构，以及DevOps与容器化部署。通过真实项目实践，培养学员解决复杂业务问题的能力。\n\n通过本课程，你将能够：\n- 掌握Java高级特性与设计模式\n- 熟练应用Spring Boot开发企业应用\n- 理解微服务架构原理与实现方法\n- 设计高性能、高可用的分布式系统\n- 实现CI/CD自动化部署流程\n- 解决企业应用开发中的常见挑战\n\n课程适合有一定Java基础的开发者，我们提供完整的学习资源与代码库，确保学员能够充分理解并应用所学知识。",
      duration: "10周",
      totalHours: 50,
      status: "热门推荐",
      statusColor: "red",
      imageSrc: "/course-images/java-enterprise.jpg",
      rarityLevel: "中",
      popularity: "90%",
      learningPath: ["Java核心", "Spring基础", "企业应用开发", "微服务架构"],
      prerequisites: ["Java基础", "面向对象编程概念"],
      syllabus: [
        {
          title: "第1周：Java高级特性",
          lessons: [
            { title: "1.1 Java 8+ 新特性详解", duration: "60分钟", type: "视频" },
            { title: "1.2 函数式编程与Stream API", duration: "55分钟", type: "视频" },
            { title: "1.3 并发编程基础", duration: "65分钟", type: "视频" },
            { title: "实战练习：函数式编程实战", duration: "90分钟", type: "实验" }
          ]
        },
        {
          title: "第2周：设计模式与架构",
          lessons: [
            { title: "2.1 常用设计模式", duration: "70分钟", type: "视频" },
            { title: "2.2 架构设计原则", duration: "60分钟", type: "视频" },
            { title: "2.3 代码重构与优化", duration: "55分钟", type: "视频" },
            { title: "实战练习：重构遗留代码", duration: "85分钟", type: "实验" }
          ]
        },
        {
          title: "第3周：Spring核心",
          lessons: [
            { title: "3.1 Spring IoC容器详解", duration: "65分钟", type: "视频" },
            { title: "3.2 AOP编程模型", duration: "60分钟", type: "视频" },
            { title: "3.3 事务管理机制", duration: "55分钟", type: "视频" },
            { title: "实战练习：构建Spring应用", duration: "95分钟", type: "实验" }
          ]
        },
        {
          title: "第4周：Spring Boot开发",
          lessons: [
            { title: "4.1 Spring Boot核心功能", duration: "60分钟", type: "视频" },
            { title: "4.2 自动配置原理", duration: "55分钟", type: "视频" },
            { title: "4.3 REST API设计与实现", duration: "65分钟", type: "视频" },
            { title: "实战练习：开发RESTful服务", duration: "100分钟", type: "实验" }
          ]
        },
        {
          title: "第5周：数据访问层",
          lessons: [
            { title: "5.1 JPA与Hibernate", duration: "65分钟", type: "视频" },
            { title: "5.2 MyBatis高级应用", duration: "60分钟", type: "视频" },
            { title: "5.3 数据库性能优化", duration: "70分钟", type: "视频" },
            { title: "实战练习：复杂查询实现", duration: "90分钟", type: "实验" }
          ]
        },
        {
          title: "第6周：微服务架构",
          lessons: [
            { title: "6.1 微服务设计原则", duration: "55分钟", type: "视频" },
            { title: "6.2 Spring Cloud概述", duration: "65分钟", type: "视频" },
            { title: "6.3 服务注册与发现", duration: "60分钟", type: "视频" },
            { title: "实战练习：拆分单体应用", duration: "105分钟", type: "实验" }
          ]
        },
        {
          title: "第7周：微服务通信",
          lessons: [
            { title: "7.1 同步通信：Feign", duration: "50分钟", type: "视频" },
            { title: "7.2 异步通信：消息队列", duration: "65分钟", type: "视频" },
            { title: "7.3 API网关设计", duration: "60分钟", type: "视频" },
            { title: "实战练习：构建微服务网关", duration: "95分钟", type: "实验" }
          ]
        },
        {
          title: "第8周：服务容错与监控",
          lessons: [
            { title: "8.1 熔断与限流实现", duration: "60分钟", type: "视频" },
            { title: "8.2 分布式链路追踪", duration: "65分钟", type: "视频" },
            { title: "8.3 监控告警系统", duration: "55分钟", type: "视频" },
            { title: "实战练习：高可用系统设计", duration: "100分钟", type: "实验" }
          ]
        },
        {
          title: "第9周：容器化与部署",
          lessons: [
            { title: "9.1 Docker基础与应用", duration: "70分钟", type: "视频" },
            { title: "9.2 Kubernetes入门", duration: "75分钟", type: "视频" },
            { title: "9.3 CI/CD流水线", duration: "65分钟", type: "视频" },
            { title: "实战练习：容器化部署", duration: "110分钟", type: "实验" }
          ]
        },
        {
          title: "第10周：综合实战项目",
          lessons: [
            { title: "10.1 项目需求分析", duration: "45分钟", type: "视频" },
            { title: "10.2 架构设计与实现", duration: "75分钟", type: "视频" },
            { title: "10.3 测试与部署", duration: "65分钟", type: "视频" },
            { title: "综合项目：企业级应用开发", duration: "150分钟", type: "实验" }
          ]
        }
      ],
      reviews: [
        {
          user: "张明",
          avatar: "/avatars/user5.jpg",
          rating: 5,
          date: "2024-01-10",
          content: "这是我学过的最实用的Java课程！通过系统学习，我成功从初级开发晋升为技术主管。课程内容紧跟企业需求，实战项目非常贴近实际工作场景。"
        },
        {
          user: "王丽",
          avatar: "/avatars/user6.jpg",
          rating: 4,
          date: "2024-02-15",
          content: "课程质量很高，尤其是微服务部分讲解得非常透彻。唯一的小遗憾是云原生部分内容相对较少。总体来说，非常推荐想进入企业级开发的同学学习！"
        },
        {
          user: "李强",
          avatar: "/avatars/user7.jpg",
          rating: 5,
          date: "2024-03-05",
          content: "作为一名有3年经验的Java开发，这门课程帮助我填补了知识空缺，特别是在架构设计方面。现在我能够独立负责复杂项目的架构设计，薪资也提升了30%。"
        }
      ],
      relatedCourses: [
        { id: "web-dev", title: "Web全栈开发", provider: "加州大学伯克利分校", level: 4 },
        { id: "data-viz", title: "数据分析与可视化", provider: "麻省理工学院", level: 3 },
        { id: "ai-intro", title: "人工智能导论", provider: "斯坦福大学", level: 3 }
      ]
    },
    // 默认课程数据（原有的示例课程）
    "default": {
      id: params.id,
      title: "大型语言模型应用开发与实践",
      provider: "深蓝学院",
      instructor: "张教授",
      level: 4,
      updatedAt: "3天前",
      responseRate: "快速",
      trend: "+45%",
      heat: 92,
      tags: ["AI", "LLM", "Python", "应用开发"],
      description: "本课程深入讲解大型语言模型的应用开发，从基础原理到实际部署。你将学习如何利用最新的LLM技术构建智能应用，掌握提示工程、参数微调、多模态集成等核心技能。课程包含多个实战项目，帮助你快速将理论转化为实践能力。",
      longDescription: "大型语言模型（LLM）正在彻底改变人工智能领域，为各行各业带来革命性变革。本课程专为希望掌握LLM应用开发的学习者设计，从基础概念到高级应用，全面覆盖LLM技术栈。\n\n课程由资深AI研究员和产品专家联合打造，结合理论讲解和实战项目，帮助你快速构建基于LLM的实用应用。我们将探讨提示工程的最佳实践、参数高效微调技术、多模态融合方法以及企业级应用部署策略。\n\n通过本课程，你将能够：\n- 理解LLM的核心原理和局限性\n- 掌握提示工程的艺术，设计高效指令\n- 学习各种微调技术，优化模型性能\n- 构建多模态应用，集成图像和文本能力\n- 实现LLM与各类API的集成\n- 部署生产级应用并优化性能\n\n课程面向具有基础Python编程能力的学习者，不要求深度学习背景。我们提供丰富的配套资源，包括代码库、项目模板和社区讨论，确保你能顺利掌握这一前沿技术。",
      duration: "8周",
      totalHours: 48,
      status: "最新认证",
      statusColor: "green",
      imageSrc: "/placeholder-course.jpg",
      rarityLevel: "高",
      popularity: "98%",
      learningPath: ["人工智能基础", "Python编程", "LLM原理", "应用开发实战"],
      prerequisites: ["Python基础", "机器学习入门"],
      syllabus: [
        {
          title: "第1周：大型语言模型概述",
          lessons: [
            { title: "1.1 LLM技术发展历程", duration: "45分钟", type: "视频" },
            { title: "1.2 Transformer架构详解", duration: "60分钟", type: "视频" },
            { title: "1.3 主流开源与闭源模型对比", duration: "50分钟", type: "视频" },
            { title: "实战练习：搭建本地LLM环境", duration: "90分钟", type: "实验" }
          ]
        },
        {
          title: "第2周：提示工程基础与进阶",
          lessons: [
            { title: "2.1 提示工程核心原则", duration: "55分钟", type: "视频" },
            { title: "2.2 上下文学习与思维链", duration: "65分钟", type: "视频" },
            { title: "2.3 角色扮演与指令优化", duration: "45分钟", type: "视频" },
            { title: "实战练习：设计高效提示模板", duration: "90分钟", type: "实验" }
          ]
        },
        {
          title: "第3周：模型微调技术",
          lessons: [
            { title: "3.1 微调原理与方法对比", duration: "60分钟", type: "视频" },
            { title: "3.2 LoRA与QLoRA实践", duration: "70分钟", type: "视频" },
            { title: "3.3 数据准备与质量控制", duration: "50分钟", type: "视频" },
            { title: "实战练习：领域专家模型微调", duration: "120分钟", type: "实验" }
          ]
        },
        {
          title: "第4周：LLM应用架构设计",
          lessons: [
            { title: "4.1 LLM应用系统架构", duration: "65分钟", type: "视频" },
            { title: "4.2 向量数据库与知识检索", duration: "70分钟", type: "视频" },
            { title: "4.3 Agent设计与Tool使用", duration: "55分钟", type: "视频" },
            { title: "实战练习：构建智能问答系统", duration: "100分钟", type: "实验" }
          ]
        }
      ],
      reviews: [
        {
          user: "李明",
          avatar: "/avatars/user1.jpg",
          rating: 5,
          date: "2023-11-15",
          content: "非常实用的课程！通过学习我成功开发了一个行业垂直领域的AI助手，已经在公司内部上线使用。课程内容与实际应用紧密结合，讲解深入浅出，代码示例丰富。"
        },
        {
          user: "张华",
          avatar: "/avatars/user2.jpg",
          rating: 4,
          date: "2023-12-02",
          content: "课程质量很高，特别是提示工程和微调部分的内容非常有价值。唯一的不足是部分高级主题讲解较快，需要多次回看才能完全理解。总体来说非常推荐！"
        },
        {
          user: "王芳",
          avatar: "/avatars/user3.jpg",
          rating: 5,
          date: "2024-01-10",
          content: "作为一名转行人士，这门课程让我快速掌握了LLM应用开发技能。课程不仅教授技术，还深入分析了行业趋势和应用场景，帮助我找到了理想的工作。老师回复问题非常及时。"
        }
      ],
      relatedCourses: [
        { id: "ai-intro", title: "人工智能导论", provider: "斯坦福大学", level: 3 },
        { id: "data-viz", title: "数据分析与可视化", provider: "麻省理工学院", level: 3 },
        { id: "web-dev", title: "Web全栈开发", provider: "加州大学伯克利分校", level: 4 }
      ]
    }
  }

  // 根据ID获取课程数据，如果不存在则使用默认数据
  const courseData = coursesDB[params.id] || coursesDB["default"]

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb] dark:bg-gray-950">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md dark:bg-gray-950/95 dark:border-gray-800 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/#courses" className="flex items-center space-x-2">
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

      <main className="container pt-24 pb-16">
        {/* 面包屑导航 */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link href="/courses" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回课程列表
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 dark:text-gray-100 font-medium truncate">
            {courseData.title}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧课程详情 */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      {courseData.rarityLevel === "高" && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          稀缺资源
                        </Badge>
                      )}
                      <Badge className={`${
                        courseData.statusColor === "green" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                          : courseData.statusColor === "red"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                      }`}>
                        {courseData.status}
                      </Badge>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold">{courseData.title}</h1>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{courseData.provider}</span>
                      <span className="mx-2">•</span>
                      <span>{courseData.instructor}</span>
                      <span className="mx-2">•</span>
                      <span>更新于 {courseData.updatedAt}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={toggleBookmark}>
                      <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="aspect-video w-full rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                  <img 
                    src={courseData.imageSrc || "/placeholder-course.jpg"} 
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700">
                      <Play className="h-6 w-6 text-white" fill="white" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <Clock className="h-5 w-5 text-blue-600 mb-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">总时长</span>
                    <span className="font-semibold">{courseData.totalHours}小时</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <Book className="h-5 w-5 text-blue-600 mb-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">难度</span>
                    <span className="font-semibold">{courseData.level}/5</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <Users className="h-5 w-5 text-blue-600 mb-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">热度</span>
                    <span className="font-semibold">{courseData.popularity}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 mb-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">响应速度</span>
                    <span className="font-semibold">{courseData.responseRate}</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">课程介绍</h2>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {courseData.longDescription}
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-2">学习路径</h2>
                    <div className="relative mb-6">
                      <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      {courseData.learningPath.map((step: string, index: number) => (
                        <div key={index} className="flex items-start mb-4 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                            index < 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="ml-4 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex-1">
                            <p className={`font-medium ${index < 2 ? 'text-blue-600' : ''}`}>{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-2">课程大纲</h2>
                    <Accordion type="single" collapsible className="border rounded-lg">
                      {courseData.syllabus.map((week: {title: string; lessons: any[]}, weekIndex: number) => (
                        <AccordionItem key={weekIndex} value={`week-${weekIndex}`}>
                          <AccordionTrigger className="px-4 py-3 hover:no-underline">
                            <div className="flex justify-between items-center w-full">
                              <span className="font-medium">{week.title}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {week.lessons.length}个课时
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 px-4 pb-3">
                              {week.lessons.map((lesson: {title: string; type: string; duration: string}, lessonIndex: number) => (
                                <div 
                                  key={lessonIndex} 
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                  <div className="flex items-center">
                                    {lesson.type === "视频" ? (
                                      <Video className="h-4 w-4 text-blue-600 mr-3" />
                                    ) : lesson.type === "实验" ? (
                                      <FileText className="h-4 w-4 text-green-600 mr-3" />
                                    ) : (
                                      <Book className="h-4 w-4 text-amber-600 mr-3" />
                                    )}
                                    <span className="text-sm">{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {lesson.duration}
                                    </span>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full ml-2">
                                      <Play className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">学员评价</h2>
                    <div className="space-y-4">
                      {userReviews.map((review, index) => (
                        <div key={`user-review-${index}`} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 bg-blue-100 dark:bg-blue-800">
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{review.user}</h4>
                              </div>
                              <div className="flex items-center my-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{review.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {courseData.reviews.map((review: {user: string; avatar: string; rating: number; date: string; content: string}, index: number) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{review.user}</h4>
                              </div>
                              <div className="flex items-center my-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{review.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-8 border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">发表评价</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="rating" className="block mb-2 text-sm font-medium">您的评分</Label>
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <button 
                                  key={i}
                                  type="button" 
                                  onClick={() => handleRatingClick(i + 1)}
                                  className="focus:outline-none"
                                >
                                  <Star 
                                    className={`h-6 w-6 ${i < userRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} hover:text-yellow-500 cursor-pointer`} 
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="name" className="block mb-2 text-sm font-medium">您的姓名</Label>
                            <Input 
                              id="name" 
                              placeholder="请输入您的姓名" 
                              className="w-full"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="comment" className="block mb-2 text-sm font-medium">评价内容</Label>
                            <Textarea 
                              id="comment" 
                              placeholder="请分享您对这门课程的看法..." 
                              rows={4}
                              className="w-full resize-none"
                              value={userComment}
                              onChange={(e) => setUserComment(e.target.value)}
                            />
                          </div>
                          
                          <Button 
                            className="mt-2"
                            onClick={handleSubmitReview}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "提交中..." : "提交评价"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 右侧边栏 */}
          <div className="space-y-6">
            <Card className="shadow-sm sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <Button className="w-full text-lg py-6" size="lg">
                    立即学习
                  </Button>
                  
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    下载课程大纲
                  </Button>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">课程包含</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Video className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">48小时专业视频内容</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">16个实战练习项目</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">完整源代码与资料</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">讲师24小时答疑</span>
                      </div>
                      <div className="flex items-center">
                        <ExternalLink className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">终身学习权限</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">推荐课程</h3>
                    <div className="space-y-3">
                      {courseData.relatedCourses.map((course: {id: string; title: string; provider: string; level: number}, index: number) => (
                        <Link href={`/courses/${course.id}`} key={index}>
                          <div className="flex items-start group">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                              <Book className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                                {course.title}
                              </h4>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {course.provider}
                                </span>
                                <span className="mx-1 text-gray-300">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  难度 {course.level}/5
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 