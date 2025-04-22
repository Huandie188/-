"use client"

import { BookOpen, MoreHorizontal, Eye, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    id: "course-001",
    title: "大模型Prompt工程实战",
    date: "2024-05-15",
    provider: "Stanford University",
    popularity: "高",
    growth: "+83%",
  },
  {
    id: "course-002",
    title: "Web3与区块链开发",
    date: "2024-05-14",
    provider: "MIT",
    popularity: "中",
    growth: "+42%",
  },
  {
    id: "course-003",
    title: "云原生微服务架构",
    date: "2024-05-13",
    provider: "UC Berkeley",
    popularity: "高",
    growth: "+65%",
  },
  {
    id: "course-004",
    title: "AI辅助软件开发",
    date: "2024-05-12",
    provider: "Coursera",
    popularity: "高",
    growth: "+78%",
  },
]

export function RecentCourses() {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="flex items-center justify-between space-x-4 rounded-md border p-3 hover:bg-muted/30 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="rounded-md bg-primary/10 p-2">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">{course.title}</p>
              <div className="flex items-center pt-1">
                <p className="text-xs text-muted-foreground">
                  {course.date} • {course.provider}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <TrendingUp className={`h-3.5 w-3.5 mr-1 ${
                parseInt(course.growth) > 60 
                  ? "text-green-500" 
                  : parseInt(course.growth) > 40 
                    ? "text-amber-500" 
                    : "text-blue-500"
              }`} />
              <span className="text-xs font-medium">{course.growth}</span>
            </div>
            <Badge
              variant={
                course.popularity === "高"
                  ? "default"
                  : course.popularity === "中"
                    ? "secondary"
                    : "outline"
              }
              className="text-xs"
            >
              {course.popularity}
            </Badge>
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
                <DropdownMenuItem>查看详情</DropdownMenuItem>
                <DropdownMenuItem>编辑信息</DropdownMenuItem>
                <DropdownMenuItem>推广课程</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">下架</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
} 