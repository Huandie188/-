"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowUpDown,
  Book,
  Calendar,
  ChevronLeft,
  Clock,
  Filter,
  Home,
  Laptop,
  Moon,
  Star,
  Sun,
} from "lucide-react"

export default function CoursesListPage() {
  const [theme, setTheme] = React.useState("light")
  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([])

  // 模拟课程数据
  const courses = [
    {
      id: "1",
      title: "Web前端开发实战",
      provider: "慕课网",
      instructor: "李明",
      level: "中级",
      duration: "40小时",
      updateStatus: "已完结",
      field: "前端开发",
      rating: 4.7,
      students: 12453,
      price: 299,
      tags: ["JavaScript", "React", "CSS", "HTML5"],
      image: "/course-images/web-development.jpg"
    },
    {
      id: "2",
      title: "Python数据分析入门到精通",
      provider: "网易云课堂",
      instructor: "张伟",
      level: "初级到中级",
      duration: "35小时",
      updateStatus: "更新中",
      field: "数据科学",
      rating: 4.8,
      students: 8759,
      price: 399,
      tags: ["Python", "Pandas", "数据可视化", "NumPy"],
      image: "/course-images/python-data.jpg"
    },
    {
      id: "3",
      title: "深度学习与人工智能",
      provider: "Coursera",
      instructor: "Andrew Ng",
      level: "高级",
      duration: "60小时",
      updateStatus: "已完结",
      field: "人工智能",
      rating: 4.9,
      students: 25678,
      price: 0,
      tags: ["深度学习", "神经网络", "TensorFlow", "机器学习"],
      image: "/course-images/deep-learning.jpg"
    },
    {
      id: "4",
      title: "Java企业级应用开发",
      provider: "极客时间",
      instructor: "王刚",
      level: "中级到高级",
      duration: "50小时",
      updateStatus: "更新中",
      field: "后端开发",
      rating: 4.6,
      students: 6542,
      price: 499,
      tags: ["Java", "Spring Boot", "微服务", "数据库"],
      image: "/course-images/java-enterprise.jpg"
    },
  ]

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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="flex-1">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Home className="h-4 w-4" />
                <span className="sr-only">首页</span>
              </Button>
            </Link>
            <span>/</span>
            <Link href="/courses">
              <Button variant="ghost" size="sm">
                课程
              </Button>
            </Link>
            <span>/</span>
            <Button variant="ghost" size="sm" disabled>
              课程列表
            </Button>
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <Button onClick={toggleTheme} variant="outline" size="icon" className="h-8 w-8">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="sr-only">切换主题</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <div className="border-r bg-muted/40 md:w-64">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <h2 className="text-lg font-semibold">筛选条件</h2>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">技术领域</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="field-frontend" />
                    <label htmlFor="field-frontend" className="text-sm">前端开发</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="field-backend" />
                    <label htmlFor="field-backend" className="text-sm">后端开发</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="field-data" />
                    <label htmlFor="field-data" className="text-sm">数据科学</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="field-ai" />
                    <label htmlFor="field-ai" className="text-sm">人工智能</label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">难度级别</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="level-beginner" />
                    <label htmlFor="level-beginner" className="text-sm">初级</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="level-intermediate" />
                    <label htmlFor="level-intermediate" className="text-sm">中级</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="level-advanced" />
                    <label htmlFor="level-advanced" className="text-sm">高级</label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">更新状态</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="status-ongoing" />
                    <label htmlFor="status-ongoing" className="text-sm">更新中</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="status-finished" />
                    <label htmlFor="status-finished" className="text-sm">已完结</label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">课程时长</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="duration-short" />
                    <label htmlFor="duration-short" className="text-sm">小于20小时</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="duration-medium" />
                    <label htmlFor="duration-medium" className="text-sm">20-40小时</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="duration-long" />
                    <label htmlFor="duration-long" className="text-sm">40小时以上</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex gap-2">
              <Input placeholder="搜索课程..." className="w-64" />
              <Button>搜索</Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">找到 {courses.length} 个课程</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    <span>排序</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>最新上线</DropdownMenuItem>
                  <DropdownMenuItem>评分最高</DropdownMenuItem>
                  <DropdownMenuItem>学习人数最多</DropdownMenuItem>
                  <DropdownMenuItem>价格从低到高</DropdownMenuItem>
                  <DropdownMenuItem>价格从高到低</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader className="p-4">
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <Book className="h-10 w-10 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-1 pt-3">
                    <CardTitle className="line-clamp-1 text-lg">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-1">{course.provider} · {course.instructor}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-2 p-4 pt-0">
                  <div className="flex flex-wrap gap-1">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Laptop className="h-3.5 w-3.5" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{course.updateStatus}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div className="font-medium">
                    {course.price === 0 ? (
                      <span className="text-green-600">免费</span>
                    ) : (
                      <span>¥{course.price}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toggleCourseSelection(course.id)}>
                      {selectedCourses.includes(course.id) ? "取消选择" : "选择对比"}
                    </Button>
                    <Link href={`/courses/${course.id}`}>
                      <Button size="sm">查看详情</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
      
      {selectedCourses.length > 0 && (
        <div className="sticky bottom-0 border-t bg-background p-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">已选择 {selectedCourses.length}/3 个课程进行对比</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCourses([])}>清空</Button>
            </div>
            <Button disabled={selectedCourses.length < 2}>
              比较所选课程
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 