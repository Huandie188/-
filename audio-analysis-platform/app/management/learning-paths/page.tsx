"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Pencil, Trash2, Search, Eye } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

// 定义学习路径类型
interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  courses: number;
  students: number;
  status: string;
}

// 模拟的学习路径数据
const initialLearningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Web开发入门到精通",
    description: "从HTML/CSS/JavaScript基础开始，逐步学习React和Next.js开发现代Web应用",
    difficulty: "初级到中级",
    courses: 12,
    students: 256,
    status: "已发布"
  },
  {
    id: "2",
    title: "Python数据分析师",
    description: "掌握Python编程基础，学习pandas、NumPy、Matplotlib等数据分析工具",
    difficulty: "中级",
    courses: 8,
    students: 189,
    status: "已发布"
  },
  {
    id: "3",
    title: "人工智能与机器学习基础",
    description: "从数学基础到实际算法实现，构建机器学习模型",
    difficulty: "中级到高级",
    courses: 15,
    students: 143,
    status: "草稿"
  },
  {
    id: "4",
    title: "UI/UX设计实战",
    description: "从设计原则到Figma工具使用，打造专业级用户界面",
    difficulty: "初级",
    courses: 7,
    students: 112,
    status: "已发布"
  },
  {
    id: "5",
    title: "移动应用开发：Flutter全栈",
    description: "使用Flutter框架开发跨平台移动应用，包含前端UI和后端集成",
    difficulty: "中级",
    courses: 10,
    students: 98,
    status: "已发布"
  },
]

export default function LearningPathsPage() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(initialLearningPaths)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  
  // 新学习路径的表单状态
  const [newPath, setNewPath] = useState({
    title: "",
    description: "",
    difficulty: "初级",
    status: "草稿"
  })

  // 搜索过滤
  const filteredPaths = learningPaths.filter(path => 
    path.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    path.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 添加新学习路径
  const handleAddPath = () => {
    const id = (learningPaths.length + 1).toString()
    setLearningPaths([
      ...learningPaths, 
      { 
        ...newPath, 
        id, 
        courses: 0,
        students: 0
      }
    ])
    setNewPath({
      title: "",
      description: "",
      difficulty: "初级",
      status: "草稿"
    })
    setIsAddDialogOpen(false)
  }

  // 删除学习路径
  const handleDeletePath = () => {
    if (selectedPath) {
      setLearningPaths(learningPaths.filter(path => path.id !== selectedPath.id))
      setIsDeleteDialogOpen(false)
      setSelectedPath(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-blue-800 dark:text-blue-600">学习路径管理</h2>
            <p className="text-muted-foreground">创建和管理平台上的学习路径，组织课程并提供完整的学习体验。</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <PlusCircle className="mr-2 h-4 w-4" />
                创建学习路径
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新学习路径</DialogTitle>
                <DialogDescription>
                  填写以下信息创建新的学习路径。创建后可以在详情页添加课程内容。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">标题</Label>
                  <Input 
                    id="title" 
                    value={newPath.title}
                    onChange={(e) => setNewPath({...newPath, title: e.target.value})}
                    placeholder="输入学习路径标题" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">描述</Label>
                  <Input 
                    id="description" 
                    value={newPath.description}
                    onChange={(e) => setNewPath({...newPath, description: e.target.value})}
                    placeholder="输入学习路径描述" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="difficulty">难度级别</Label>
                  <select 
                    id="difficulty" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newPath.difficulty}
                    onChange={(e) => setNewPath({...newPath, difficulty: e.target.value})}
                  >
                    <option value="初级">初级</option>
                    <option value="中级">中级</option>
                    <option value="高级">高级</option>
                    <option value="初级到中级">初级到中级</option>
                    <option value="中级到高级">中级到高级</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">状态</Label>
                  <select 
                    id="status" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newPath.status}
                    onChange={(e) => setNewPath({...newPath, status: e.target.value})}
                  >
                    <option value="草稿">草稿</option>
                    <option value="已发布">已发布</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
                <Button onClick={handleAddPath}>创建学习路径</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>学习路径列表</CardTitle>
            <CardDescription>
              管理平台上的所有学习路径。您可以查看、编辑或删除现有路径。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索学习路径..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名称</TableHead>
                    <TableHead>难度</TableHead>
                    <TableHead className="hidden md:table-cell">课程数</TableHead>
                    <TableHead className="hidden md:table-cell">学生数</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPaths.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        未找到匹配的学习路径
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPaths.map(path => (
                      <TableRow key={path.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{path.title}</div>
                            <div className="text-sm text-muted-foreground hidden sm:block">
                              {path.description.length > 50 ? `${path.description.substring(0, 50)}...` : path.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{path.difficulty}</TableCell>
                        <TableCell className="hidden md:table-cell">{path.courses}</TableCell>
                        <TableCell className="hidden md:table-cell">{path.students}</TableCell>
                        <TableCell>
                          <Badge variant={path.status === "已发布" ? "default" : "secondary"}>
                            {path.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/management/learning-paths/${path.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">查看</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/management/learning-paths/${path.id}/edit`}>
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">编辑</span>
                              </Link>
                            </Button>
                            <AlertDialog open={isDeleteDialogOpen && selectedPath?.id === path.id} onOpenChange={(open) => !open && setSelectedPath(null)}>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => {
                                    setSelectedPath(path)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">删除</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>确认删除</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    您确定要删除学习路径 "{selectedPath?.title}" 吗？此操作无法撤销。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>取消</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleDeletePath}>删除</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              总计: {filteredPaths.length} 个学习路径
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 