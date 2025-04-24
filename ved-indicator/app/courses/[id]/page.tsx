"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
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
  Video,
  Loader2 
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
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  longDescription?: string;
  duration: string;
  totalHours?: number;
  status: string;
  statusColor: string;
  imageSrc: string;
  rarityLevel: string;
  popularity?: string;
  learningPath?: string[];
  prerequisites?: string[];
  syllabus?: {
    title: string;
    lessons: {
      title: string;
      duration: string;
      type: string;
    }[];
  }[];
  reviews?: {
    user: string;
    avatar?: string;
    rating: number;
    date: string;
    content: string;
  }[];
  relatedCourses?: {
    id: string;
    title: string;
    provider: string;
    level: number;
  }[];
}

type CoursesDB = {
  [key: string]: CourseInfo;
}

// 模拟课程大纲数据（当爬取的课程没有大纲时使用）
const mockSyllabus = [
  {
    title: "第1单元：课程简介",
    lessons: [
      { title: "1.1 课程内容概述", duration: "30分钟", type: "视频" },
      { title: "1.2 学习方法指导", duration: "20分钟", type: "视频" }
    ]
  },
  {
    title: "第2单元：基础知识",
    lessons: [
      { title: "2.1 核心概念讲解", duration: "45分钟", type: "视频" },
      { title: "2.2 实践操作演示", duration: "60分钟", type: "实验" }
    ]
  },
  {
    title: "第3单元：进阶技能",
    lessons: [
      { title: "3.1 高级特性介绍", duration: "50分钟", type: "视频" },
      { title: "3.2 综合案例分析", duration: "70分钟", type: "实验" }
    ]
  }
];

// 课程难度映射
const levelLabels = ["入门", "初级", "中级", "高级", "专家"];

export default function CourseDetailPage({ params }: { params: any }) {
  // 使用类型断言解决类型问题
  const unwrappedParams = React.use(params) as { id: string };
  const id = unwrappedParams.id;
  
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userName, setUserName] = useState("")
  const [userComment, setUserComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userReviews, setUserReviews] = useState<{user: string; rating: number; date: string; content: string}[]>([])
  
  // 添加状态管理：课程数据
  const [course, setCourse] = useState<CourseInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const router = useRouter()
  
  // 获取课程数据 - 使用API从MongoDB获取真实爬取的数据
  useEffect(() => {
    async function fetchCourseData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/courses/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("课程不存在")
          }
          throw new Error("获取课程数据失败")
        }
        
        const data = await response.json()
        
        // 处理课程数据，确保数据格式一致
        const courseData: CourseInfo = {
          ...data.course,
          // 确保必须字段有值
          provider: data.course.provider || "慕课网",
          status: data.course.status || "热门",
          statusColor: data.course.statusColor || "red",
          // 添加默认值为模拟的大纲数据
          syllabus: data.course.syllabus || mockSyllabus,
          // 添加模拟评论（暂未从爬虫获取评论数据）
          reviews: data.course.reviews || [
            {
              user: "学习者",
              rating: 5,
              date: "2024-04-01",
              content: "这门课程内容非常丰富，讲解清晰，很有收获！"
            },
            {
              user: "编程爱好者",
              rating: 4,
              date: "2024-03-25",
              content: "课程质量不错，但有些内容可以更深入一些。总体来说很推荐。"
            }
          ]
        }
        
        setCourse(courseData)
      } catch (error: any) {
        console.error("获取课程详情失败:", error)
        setError(error.message || "获取课程详情失败")
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchCourseData()
    }
  }, [id])
  
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

  // 生成随机颜色（当图片加载失败时使用）
  const getRandomColor = () => {
    const colors = ["4287f5", "f54242", "42f54e", "f5d442", "9942f5", "f542e6"]
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  // 根据课程ID获取对应的封面图片
  const getCourseImage = (courseId: string) => {
    // 映射特定课程ID到首页使用的图片
    const imageMap: Record<string, string> = {
      "imooc-717": "/course-images/ai-intro.jpg",      // 初识机器学习-理论篇
      "imooc-640": "/course-images/data-viz.jpg",      // R语言之数据可视化
      "imooc-509": "/course-images/web-dev.jpg"        // PHP实现微信公众平台开发—提升篇
    }
    
    // 如果在映射中找到了图片，返回映射的图片路径，否则返回课程自身的图片
    return imageMap[courseId] || course?.imageSrc
  }
  
  // 处理图片加载错误
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    const text = course?.title || "课程图片"
    target.onerror = null // 防止无限循环
    target.src = `https://via.placeholder.com/320x180/${getRandomColor()}/FFFFFF?text=${encodeURIComponent(text)}`
  }
  
  // 渲染加载状态
  if (loading) {
  return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
          <p className="text-lg">正在加载课程数据...</p>
        </div>
      </div>
    )
  }
  
  // 渲染错误状态
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            {error} - <Link href="/courses" className="underline">返回课程列表</Link>
          </AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/courses')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回课程列表
            </Button>
      </div>
    )
  }
  
  // 渲染没有课程的状态
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert className="mb-6">
          <AlertDescription>
            未找到课程数据 - <Link href="/courses" className="underline">返回课程列表</Link>
          </AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/courses')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回课程列表
            </Button>
      </div>
    )
  }
  
  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-950 text-white" : "bg-white"}`}>
      <header className="border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => router.push('/courses')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回课程列表
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 课程主信息 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{course.provider || "慕课网"}</Badge>
              <Badge variant={course.statusColor === "red" ? "destructive" : "default"}>
                {course.status || "热门"}
                        </Badge>
              <Badge variant="outline" className="ml-auto">
                难度: {levelLabels[course.level - 1] || "初级"}
                      </Badge>
                    </div>
            
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Flame className="h-5 w-5 text-orange-500" />
                <span>热度 {course.heat}%</span>
                    </div>
              <div className="flex items-center gap-1 text-green-500">
                <span>{course.trend}</span>
                  </div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-5 w-5" />
                <span>更新: {course.updatedAt}</span>
                  </div>
                </div>
                
            <div className="mb-8">
              <img 
                src={getCourseImage(id)} 
                alt={course.title} 
                className="w-full h-128 object-cover rounded-lg mb-4"
                onError={handleImageError}
                style={{height: '512px'}}
              />
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">课程描述</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleBookmark}>
                    <Heart className={`h-5 w-5 ${isBookmarked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {course.longDescription || course.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags && course.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
                  </div>
                  
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">预备知识</h3>
                  <ul className="list-disc pl-5">
                    {course.prerequisites.map((item, index) => (
                      <li key={index} className="mb-1">{item}</li>
                    ))}
                  </ul>
                          </div>
              )}
              
              {course.learningPath && course.learningPath.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">学习路径</h3>
                  <div className="flex items-center">
                    {course.learningPath.map((path, index) => (
                      <React.Fragment key={index}>
                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
                          {path}
                        </Badge>
                        {index < course.learningPath!.length - 1 && (
                          <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                        )}
                      </React.Fragment>
                      ))}
                    </div>
                </div>
              )}
                  </div>
                  
            {/* 课程大纲 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">课程大纲</h2>
              <Accordion type="single" collapsible className="w-full">
                {(course.syllabus || mockSyllabus).map((section, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-900 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{section.title}</span>
                        <Badge variant="outline">{section.lessons.length} 个课时</Badge>
                            </div>
                          </AccordionTrigger>
                    <AccordionContent className="px-4">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="py-2 border-b last:border-0 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                                    {lesson.type === "视频" ? (
                              <Video className="h-4 w-4 text-blue-500" />
                                    ) : (
                              <FileText className="h-4 w-4 text-green-500" />
                                    )}
                            <span>{lesson.title}</span>
                                  </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{lesson.type}</Badge>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                                  </div>
                                </div>
                              ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  
            {/* 学员评价 */}
            <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">学员评价</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {(course.reviews || [
                  {
                    user: "学习者",
                    rating: 5,
                    date: "2024-04-01",
                    content: "这门课程内容非常丰富，讲解清晰，很有收获！"
                  },
                  {
                    user: "编程爱好者",
                    rating: 4,
                    date: "2024-03-25",
                    content: "课程质量不错，但有些内容可以更深入一些。总体来说很推荐。"
                  }
                ]).map((review, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {review.avatar ? (
                              <AvatarImage src={review.avatar} alt={review.user} />
                            ) : (
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            )}
                            </Avatar>
                          <div>
                            <div className="font-medium">{review.user}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{review.date}</div>
                              </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                                  />
                                ))}
                              </div>
                            </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* 添加评价 */}
              <Card>
                <CardHeader>
                  <CardTitle>添加评价</CardTitle>
                </CardHeader>
                <CardContent>
                        <div className="space-y-4">
                          <div>
                      <Label htmlFor="rating">评分</Label>
                      <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                                  <Star 
                            key={rating}
                            className={`h-6 w-6 cursor-pointer ${
                              rating <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                            onClick={() => handleRatingClick(rating)}
                          />
                              ))}
                            </div>
                          </div>
                          <div>
                      <Label htmlFor="name">姓名</Label>
                            <Input 
                              id="name" 
                              placeholder="请输入您的姓名" 
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </div>
                          <div>
                      <Label htmlFor="comment">评价内容</Label>
                            <Textarea 
                              id="comment" 
                        placeholder="分享您对这门课程的看法..."
                              rows={4}
                              value={userComment}
                              onChange={(e) => setUserComment(e.target.value)}
                            />
                  </div>
                </div>
              </CardContent>
                <CardFooter>
                  <Button onClick={handleSubmitReview} disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    提交评价
                  </Button>
                </CardFooter>
            </Card>
            </div>
          </div>
          
          {/* 侧边栏 */}
          <div>
            <Card className="sticky top-6 mb-6">
              <CardHeader>
                <CardTitle>课程信息</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">讲师</div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{course.instructor ? course.instructor[0] : "讲"}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{course.instructor}</div>
                      </div>
                      </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">响应率</div>
                    <div className="font-medium">{course.responseRate || "48小时内"}</div>
                      </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">学习人数</div>
                    <div className="font-medium">{course.popularity || "10,000+"}</div>
                      </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">稀有程度</div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        course.rarityLevel === "传说" ? "bg-purple-500" :
                        course.rarityLevel === "史诗" ? "bg-orange-500" :
                        course.rarityLevel === "稀有" ? "bg-blue-500" :
                        "bg-gray-500"
                      }>
                        {course.rarityLevel}
                      </Badge>
                      </div>
                    </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">学时</div>
                    <div className="font-medium">{course.totalHours || "40"} 小时</div>
                            </div>
                  <div className="pt-4">
                    <Button className="w-full mb-3">
                      <Play className="mr-2 h-4 w-4" />
                      开始学习
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Book className="mr-2 h-4 w-4" />
                      课程大纲
                    </Button>
                              </div>
                            </div>
              </CardContent>
            </Card>
            
            {/* 相关课程 */}
            {course.relatedCourses && course.relatedCourses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>相关课程</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.relatedCourses.map((relatedCourse, index) => (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                        <div className="rounded-md overflow-hidden w-16 h-12">
                          <img 
                            src={getCourseImage(relatedCourse.id)}
                            alt={relatedCourse.title}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                          </div>
                        <div>
                          <Link href={`/courses/${relatedCourse.id}`}>
                            <div className="font-medium hover:text-blue-500">{relatedCourse.title}</div>
                        </Link>
                          <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                            <span>{relatedCourse.provider}</span>
                            <span>•</span>
                            <span>难度: {levelLabels[relatedCourse.level - 1]}</span>
                    </div>
                  </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">在线课程平台</h3>
              <p className="text-gray-600 dark:text-gray-400">发现最好的学习资源，提升职业技能</p>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                关于我们
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                联系方式
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                隐私政策
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2024 在线课程平台. 保留所有权利.
          </div>
        </div>
      </footer>
    </div>
  )
} 