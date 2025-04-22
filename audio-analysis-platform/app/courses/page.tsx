"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { PieChart } from "@/components/charts"
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
} from "lucide-react"

// 模拟课程数据
const courses = [
  {
    id: "c-001",
    title: "大模型Prompt工程实战",
    provider: "Stanford University",
    date: "2024-05-15",
    category: "人工智能",
    rating: 4.9,
    popularity: "高",
    recommendations: 1245,
    status: "已发布",
    duplication: "低",
  },
  {
    id: "c-002",
    title: "Web3与区块链开发",
    provider: "MIT",
    date: "2024-05-14",
    category: "区块链",
    rating: 4.7,
    popularity: "中",
    recommendations: 782,
    status: "已发布",
    duplication: "低",
  },
  {
    id: "c-003",
    title: "云原生微服务架构",
    provider: "UC Berkeley",
    date: "2024-05-13",
    category: "云计算",
    rating: 4.8,
    popularity: "高",
    recommendations: 964,
    status: "已发布",
    duplication: "中",
  },
  {
    id: "c-004",
    title: "AI辅助软件开发",
    provider: "Coursera",
    date: "2024-05-12",
    category: "软件开发",
    rating: 4.6,
    popularity: "高",
    recommendations: 876,
    status: "已发布",
    duplication: "低",
  },
  {
    id: "c-005",
    title: "全栈JavaScript开发",
    provider: "Udemy",
    date: "2024-05-10",
    category: "前端开发",
    rating: 4.5,
    popularity: "高",
    recommendations: 1452,
    status: "已发布",
    duplication: "高",
  },
  {
    id: "c-006",
    title: "数据科学与分析",
    provider: "Coursera",
    date: "2024-05-08",
    category: "数据科学",
    rating: 4.8,
    popularity: "中",
    recommendations: 986,
    status: "审核中",
    duplication: "中",
  },
  {
    id: "c-007",
    title: "机器学习实战",
    provider: "Stanford University",
    date: "2024-05-06",
    category: "人工智能",
    rating: 4.9,
    popularity: "高",
    recommendations: 1398,
    status: "已发布",
    duplication: "中",
  },
  {
    id: "c-008",
    title: "网络安全基础",
    provider: "Udacity",
    date: "2024-05-05",
    category: "网络安全",
    rating: 4.7,
    popularity: "中",
    recommendations: 754,
    status: "已发布",
    duplication: "低",
  },
]

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "已发布":
      return "default"
    case "审核中":
      return "secondary"
    case "草稿":
      return "outline"
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
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索课程名称、提供者、类别..."
                  className="pl-8 w-[300px]"
                />
              </div>
              <DatePickerWithRange className="w-[300px]" />
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                筛选器
              </Button>
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
                系统检测到前端开发类别的课程同质化程度较高，建议审核内容并优化推荐策略。
              </AlertDescription>
            </Alert>
            
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardContent className="p-0">
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
                      {courses.map((course) => (
                        <TableRow key={course.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span>{course.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>{course.provider}</TableCell>
                          <TableCell>{course.date}</TableCell>
                          <TableCell>{course.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                              <span>{course.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                course.popularity === "高"
                                  ? "default"
                                  : course.popularity === "中"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {course.popularity}
                            </Badge>
                          </TableCell>
                          <TableCell>{course.recommendations}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(course.status)}>
                              {course.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getDuplicationBadgeVariant(course.duplication)}>
                              {course.duplication}
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
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 dark:bg-red-900/20 dark:border-red-800/40">
                    <div className="flex items-center gap-2 mb-2">
                      <Copy className="h-5 w-5 text-red-600 dark:text-red-500" />
                      <h3 className="font-medium text-red-800 dark:text-red-400">高重复度课程组</h3>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      系统检测到15个JavaScript框架入门课程内容重复度超过85%，建议进行合并或差异化处理。
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">课程同质化热点领域</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">前端开发</span>
                          <span className="text-sm font-medium text-red-500">78% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">基础Python</span>
                          <span className="text-sm font-medium text-red-500">72% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">SQL入门</span>
                          <span className="text-sm font-medium text-amber-500">63% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "63%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Java基础</span>
                          <span className="text-sm font-medium text-amber-500">54% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "54%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">大模型应用</span>
                          <span className="text-sm font-medium text-green-500">23% 同质化</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "23%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">优化建议</h3>
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
                          <div className="font-medium text-primary mb-1">推荐优化</div>
                          <p className="text-sm text-muted-foreground">在同一领域只推荐差异化明显的课程，避免用户获得重复内容</p>
                        </div>
                        
                        <div className="rounded-lg border p-3 bg-gray-50 dark:bg-gray-900">
                          <div className="font-medium text-primary mb-1">内容更新提醒</div>
                          <p className="text-sm text-muted-foreground">向内容提供方发送差异化建议，指导其对内容进行更新与优化</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <CardHeader className="py-4 px-5">
                        <CardTitle className="text-base text-center">平均完成率</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-5 flex flex-col items-center">
                        <div className="text-3xl font-bold text-primary mb-1">67.3%</div>
                        <p className="text-xs text-muted-foreground text-center">较行业平均高8.5%</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <CardHeader className="py-4 px-5">
                        <CardTitle className="text-base text-center">平均用户评分</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-5 flex flex-col items-center">
                        <div className="text-3xl font-bold text-primary mb-1">4.72</div>
                        <p className="text-xs text-muted-foreground text-center">满分5分，位于前10%</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <CardHeader className="py-4 px-5">
                        <CardTitle className="text-base text-center">内容更新频率</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-5 flex flex-col items-center">
                        <div className="text-3xl font-bold text-primary mb-1">36天</div>
                        <p className="text-xs text-muted-foreground text-center">平均每36天更新一次</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* 此处可以添加更多课程质量评估的详细分析内容 */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 