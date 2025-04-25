"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Pencil, Plus, School, BookOpen, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"

// 定义学习路径类型
interface LearningPath {
  id: string
  title: string
  description: string
  difficulty: string
  courses: number
  students: number
  status: string
  objectives?: string[]
  prerequisites?: string[]
  estimatedTime?: string
  coursesList?: { id: string; title: string; order: number }[]
}

// 模拟的学习路径数据
const mockLearningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Web开发入门到精通",
    description: "从HTML/CSS/JavaScript基础开始，逐步学习React和Next.js开发现代Web应用",
    difficulty: "初级到中级",
    courses: 12,
    students: 256,
    status: "已发布",
    objectives: [
      "掌握HTML5、CSS3和JavaScript的基础知识",
      "学习React框架核心概念和组件化开发",
      "掌握Next.js的服务端渲染和静态网站生成",
      "能够独立开发完整的Web应用"
    ],
    prerequisites: [
      "基本的计算机操作能力",
      "简单的编程逻辑理解"
    ],
    estimatedTime: "3-4个月",
    coursesList: [
      { id: "101", title: "HTML5基础入门", order: 1 },
      { id: "102", title: "CSS3样式与布局", order: 2 },
      { id: "103", title: "JavaScript编程基础", order: 3 },
      { id: "104", title: "DOM操作与Web API", order: 4 },
      { id: "105", title: "响应式设计原则", order: 5 },
      { id: "106", title: "React基础与Hooks", order: 6 },
      { id: "107", title: "React Router与状态管理", order: 7 },
      { id: "108", title: "Next.js入门", order: 8 },
      { id: "109", title: "API路由与数据获取", order: 9 },
      { id: "110", title: "部署与优化技巧", order: 10 },
      { id: "111", title: "TypeScript集成", order: 11 },
      { id: "112", title: "综合项目实战", order: 12 }
    ]
  },
  {
    id: "2",
    title: "Python数据分析师",
    description: "掌握Python编程基础，学习pandas、NumPy、Matplotlib等数据分析工具",
    difficulty: "中级",
    courses: 8,
    students: 189,
    status: "已发布",
    objectives: [
      "掌握Python编程语言基础",
      "熟练使用pandas和NumPy进行数据处理",
      "使用Matplotlib和Seaborn进行数据可视化",
      "学习统计分析和机器学习基础",
      "完成实际数据分析项目"
    ],
    prerequisites: [
      "基本的数学知识（高中水平）",
      "简单的编程经验（任何语言均可）"
    ],
    estimatedTime: "2-3个月",
    coursesList: [
      { id: "201", title: "Python编程基础", order: 1 },
      { id: "202", title: "数据结构与算法", order: 2 },
      { id: "203", title: "NumPy数值计算", order: 3 },
      { id: "204", title: "Pandas数据分析", order: 4 },
      { id: "205", title: "数据可视化技术", order: 5 },
      { id: "206", title: "统计分析入门", order: 6 },
      { id: "207", title: "机器学习基础", order: 7 },
      { id: "208", title: "数据分析实战项目", order: 8 }
    ]
  }
]

export default function LearningPathPage({ params }: { params: { id: string } }) {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟API调用获取学习路径数据
    const fetchLearningPath = () => {
      setLoading(true)
      // 模拟网络延迟
      setTimeout(() => {
        const path = mockLearningPaths.find(p => p.id === params.id)
        if (path) {
          setLearningPath(path)
        }
        setLoading(false)
      }, 500)
    }

    fetchLearningPath()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <DashboardHeader />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-48"></div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!learningPath) {
    return notFound()
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/management/learning-paths">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-blue-800 dark:text-blue-600">{learningPath.title}</h1>
            <Badge variant={learningPath.status === "已发布" ? "default" : "secondary"}>
              {learningPath.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <p className="text-muted-foreground">{learningPath.description}</p>
            </div>
            <Button asChild>
              <Link href={`/management/learning-paths/${params.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                编辑学习路径
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">难度级别</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{learningPath.difficulty}</div>
                  <School className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">课程数量</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{learningPath.courses}</div>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">学生人数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{learningPath.students}</div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">预计完成时间</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{learningPath.estimatedTime || "未设置"}</div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="courses">
            <TabsList>
              <TabsTrigger value="courses">课程列表</TabsTrigger>
              <TabsTrigger value="details">详细信息</TabsTrigger>
              <TabsTrigger value="students">学生情况</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="p-4 border rounded-md mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">课程列表</h3>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加课程
                </Button>
              </div>
              {learningPath.coursesList && learningPath.coursesList.length > 0 ? (
                <div className="grid gap-4">
                  {learningPath.coursesList.map((course, index) => (
                    <Card key={course.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                            {course.order}
                          </div>
                          <div>
                            <p className="font-medium">{course.title}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">编辑</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    此学习路径尚未添加任何课程。点击"添加课程"按钮开始构建学习路径。
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            <TabsContent value="details" className="p-4 border rounded-md mt-4">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">学习目标</h3>
                  {learningPath.objectives && learningPath.objectives.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {learningPath.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">未设置学习目标</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">预备知识</h3>
                  {learningPath.prerequisites && learningPath.prerequisites.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {learningPath.prerequisites.map((prerequisite, index) => (
                        <li key={index}>{prerequisite}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">未设置预备知识</p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="students" className="p-4 border rounded-md mt-4">
              <div className="text-center p-8">
                <h3 className="text-lg font-medium mb-2">学生数据分析</h3>
                <p className="text-muted-foreground">
                  学生统计信息正在开发中，敬请期待...
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 