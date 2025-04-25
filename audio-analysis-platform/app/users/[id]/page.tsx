"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  Calendar,
  ChevronLeft,
  Clock,
  Edit,
  Mail,
  MapPin,
  Phone,
  BookOpen,
  BarChart,
  Award,
  User,
  MessageSquare,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard-header"

// 用户类型定义
interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  joinDate: string
  lastActive: string
  phone?: string
  location?: string
  bio?: string
  coursesEnrolled: number
  completedCourses?: number
  completionRate: number
  avatar?: string
  badges?: string[]
}

// 活动类型定义
interface Activity {
  id: string
  type: string
  content: string
  date: string
  courseId?: string
  courseName?: string
}

// 找到用户详情的函数（在真实环境中应该是API调用）
const getUserById = (id: string): User | null => {
  const users = [
    {
      id: "1",
      name: "张伟",
      email: "zhang.wei@example.com",
      role: "学生",
      status: "活跃",
      joinDate: "2023-10-15",
      lastActive: "2024-06-10",
      phone: "138****1234",
      location: "北京市",
      bio: "数据科学爱好者，目前正在学习Python和机器学习相关课程。",
      coursesEnrolled: 5,
      completedCourses: 3,
      completionRate: 75,
      avatar: "/avatars/01.png",
      badges: ["Python初学者", "数据分析师", "勤奋学习者"]
    },
    {
      id: "2",
      name: "李娜",
      email: "li.na@example.com",
      role: "学生",
      status: "活跃",
      joinDate: "2023-11-03",
      lastActive: "2024-06-08",
      phone: "139****5678",
      location: "上海市",
      bio: "前端开发工程师，希望提升自己的数据可视化技能。",
      coursesEnrolled: 3,
      completedCourses: 2,
      completionRate: 90,
      avatar: "/avatars/02.png",
      badges: ["JavaScript高手", "数据可视化"]
    },
    {
      id: "3",
      name: "王强",
      email: "wang.qiang@example.com",
      role: "讲师",
      status: "活跃",
      joinDate: "2023-05-20",
      lastActive: "2024-06-10",
      phone: "137****9012",
      location: "广州市",
      bio: "资深Python工程师，在数据分析和机器学习领域有5年经验。目前担任平台Python课程讲师。",
      coursesEnrolled: 0,
      completedCourses: 0,
      completionRate: 0,
      avatar: "/avatars/03.png",
      badges: ["认证讲师", "Python专家", "数据科学家"]
    },
    {
      id: "4",
      name: "赵敏",
      email: "zhao.min@example.com",
      role: "学生",
      status: "暂停",
      joinDate: "2023-09-05",
      lastActive: "2024-03-15",
      phone: "136****3456",
      location: "成都市",
      bio: "大学生，计算机科学专业，对人工智能感兴趣。",
      coursesEnrolled: 2,
      completedCourses: 0,
      completionRate: 30,
      avatar: "/avatars/04.png",
      badges: ["新手"]
    },
    {
      id: "5",
      name: "刘洋",
      email: "liu.yang@example.com",
      role: "管理员",
      status: "活跃",
      joinDate: "2023-01-10",
      lastActive: "2024-06-11",
      phone: "135****7890",
      location: "深圳市",
      bio: "平台管理员，负责内容审核和用户管理。",
      coursesEnrolled: 0,
      completedCourses: 0,
      completionRate: 0,
      avatar: "/avatars/05.png",
      badges: ["系统管理员", "内容审核员"]
    }
  ]
  
  return users.find(user => user.id === id) || null
}

// 获取用户活动历史
const getUserActivities = (userId: string): Activity[] => {
  return [
    {
      id: "a1",
      type: "课程进度",
      content: "完成了《Python数据分析入门》第3章",
      date: "2024-06-10 15:30",
      courseId: "c1",
      courseName: "Python数据分析入门"
    },
    {
      id: "a2",
      type: "课程评论",
      content: "在《Web开发基础》课程中发表了评论",
      date: "2024-06-09 10:15",
      courseId: "c2",
      courseName: "Web开发基础"
    },
    {
      id: "a3",
      type: "系统登录",
      content: "从新设备登录了系统",
      date: "2024-06-08 09:45"
    },
    {
      id: "a4",
      type: "课程进度",
      content: "开始学习《数据可视化技术》课程",
      date: "2024-06-07 14:20",
      courseId: "c3",
      courseName: "数据可视化技术"
    },
    {
      id: "a5",
      type: "提交作业",
      content: "提交了《Python数据分析入门》的第2章作业",
      date: "2024-06-05 16:40",
      courseId: "c1",
      courseName: "Python数据分析入门"
    }
  ]
}

// 获取用户反馈
const getUserFeedback = (userId: string) => {
  return [
    {
      id: "f1",
      content: "Python课程内容很棒，但希望能增加更多实践项目。",
      category: "课程建议",
      status: "待处理",
      date: "2024-05-20"
    },
    {
      id: "f2",
      content: "在完成数据分析课程章节3时遇到一个错误，代码示例似乎有问题。",
      category: "问题报告",
      status: "已解决",
      date: "2024-05-15"
    }
  ]
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [feedback, setFeedback] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const userId = params.id as string
    
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const userData = getUserById(userId)
      const userActivities = getUserActivities(userId)
      const userFeedback = getUserFeedback(userId)
      
      setUser(userData)
      setActivities(userActivities)
      setFeedback(userFeedback)
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [params.id])
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <DashboardHeader />
        <div className="flex-1 space-y-4 p-8 pt-20">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回
            </Button>
          </div>
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">加载用户数据...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <DashboardHeader />
        <div className="flex-1 space-y-4 p-8 pt-20">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回
            </Button>
          </div>
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold">未找到用户</h2>
              <p className="text-muted-foreground mb-4">找不到ID为 {params.id} 的用户</p>
              <Button onClick={() => router.push('/users')}>返回用户列表</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">用户详情</h1>
          </div>
          <Button onClick={() => router.push(`/users/${user.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            编辑用户
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-7">
          {/* 用户基本信息卡片 */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>
                  <Badge className="mt-1">{user.role}</Badge>
                  <Badge variant={user.status === "活跃" ? "default" : "outline"} className="mt-1 ml-2">
                    {user.status}
                  </Badge>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>注册于 {user.joinDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>最近活动 {user.lastActive}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="mb-2 text-sm font-medium">个人简介</h4>
                <p className="text-sm text-muted-foreground">{user.bio || "用户未设置个人简介"}</p>
              </div>
              
              {user.badges && user.badges.length > 0 && (
                <div className="pt-2">
                  <h4 className="mb-2 text-sm font-medium">获得徽章</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge, index) => (
                      <Badge key={index} variant="outline">
                        <Award className="mr-1 h-3 w-3" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* 右侧内容区 */}
          <div className="space-y-6 md:col-span-5">
            {/* 用户统计数据 */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">已报名课程</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{user.coursesEnrolled}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">完成课程</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{user.completedCourses || 0}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">完成率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 text-muted-foreground mr-2" />
                      <div className="text-2xl font-bold">{user.completionRate}%</div>
                    </div>
                    <Progress value={user.completionRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* 用户活动和反馈 */}
            <Tabs defaultValue="activities" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activities">活动历史</TabsTrigger>
                <TabsTrigger value="courses">课程进度</TabsTrigger>
                <TabsTrigger value="feedback">反馈记录</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>用户活动</CardTitle>
                    <CardDescription>用户最近的活动记录和行为历史</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {activities.length === 0 ? (
                        <div className="text-center py-4">
                          <User className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">没有活动记录</p>
                        </div>
                      ) : (
                        activities.map((activity, index) => (
                          <div key={activity.id} className="flex">
                            <div className="mr-4 flex flex-col items-center">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted">
                                {activity.type === "课程进度" && <BookOpen className="h-5 w-5 text-primary" />}
                                {activity.type === "课程评论" && <MessageSquare className="h-5 w-5 text-primary" />}
                                {activity.type === "系统登录" && <User className="h-5 w-5 text-primary" />}
                                {activity.type === "提交作业" && <Award className="h-5 w-5 text-primary" />}
                              </div>
                              {index < activities.length - 1 && (
                                <div className="w-px grow bg-muted" />
                              )}
                            </div>
                            <div className="flex flex-col gap-0 pb-8">
                              <p className="text-sm text-muted-foreground">{activity.date}</p>
                              <h4 className="text-sm font-medium">{activity.type}</h4>
                              <p className="text-sm">{activity.content}</p>
                              {activity.courseName && (
                                <Link href={`/courses/${activity.courseId}`} className="text-xs text-blue-500 hover:underline mt-1">
                                  {activity.courseName}
                                </Link>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      查看更多活动
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>课程进度</CardTitle>
                    <CardDescription>用户报名的课程及学习进度</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.coursesEnrolled === 0 ? (
                      <div className="text-center py-8">
                        <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">用户未报名任何课程</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="font-medium">Python数据分析入门</div>
                            <div>80%</div>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="font-medium">Web开发基础</div>
                            <div>100%</div>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="font-medium">数据可视化技术</div>
                            <div>35%</div>
                          </div>
                          <Progress value={35} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="font-medium">机器学习入门</div>
                            <div>10%</div>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {user.coursesEnrolled > 0 && (
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        查看全部课程
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="feedback" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>用户反馈</CardTitle>
                    <CardDescription>用户提交的问题和建议</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {feedback.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">没有反馈记录</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {feedback.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4">
                            <div className="flex justify-between">
                              <Badge>{item.category}</Badge>
                              <Badge variant={item.status === "已解决" ? "default" : "outline"}>
                                {item.status}
                              </Badge>
                            </div>
                            <p className="mt-2 text-sm">{item.content}</p>
                            <div className="mt-2 text-xs text-muted-foreground">{item.date}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  {feedback.length > 0 && (
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        查看全部反馈
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
} 