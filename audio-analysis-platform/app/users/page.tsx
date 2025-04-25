"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ChevronDown, 
  Download, 
  Plus, 
  Search, 
  Trash2, 
  Users,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Edit,
  UserPlus,
  RefreshCw
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { DashboardHeader } from "@/components/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 用户接口定义
interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  joinDate: string
  lastActive: string
  avatar?: string
  coursesEnrolled?: number
  completionRate?: number
}

// 创建用户表单验证
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "用户名至少需要2个字符",
  }),
  email: z.string().email({
    message: "请输入有效的电子邮件地址",
  }),
  role: z.enum(["学生", "讲师", "管理员"], {
    required_error: "请选择用户角色",
  }),
})

// 获取用户初始数据的模拟函数
const getUsers = (): User[] => {
  return [
    {
      id: "1",
      name: "张伟",
      email: "zhang.wei@example.com",
      role: "学生",
      status: "活跃",
      joinDate: "2023-10-15",
      lastActive: "2024-06-10",
      avatar: "/avatars/01.png",
      coursesEnrolled: 5,
      completionRate: 75
    },
    {
      id: "2",
      name: "李娜",
      email: "li.na@example.com",
      role: "学生",
      status: "活跃",
      joinDate: "2023-11-03", 
      lastActive: "2024-06-08",
      avatar: "/avatars/02.png",
      coursesEnrolled: 3,
      completionRate: 90
    },
    {
      id: "3",
      name: "王强",
      email: "wang.qiang@example.com",
      role: "讲师",
      status: "活跃",
      joinDate: "2023-05-20",
      lastActive: "2024-06-10",
      avatar: "/avatars/03.png",
      coursesEnrolled: 0,
      completionRate: 0
    },
    {
      id: "4",
      name: "赵敏",
      email: "zhao.min@example.com",
      role: "学生",
      status: "暂停",
      joinDate: "2023-09-05",
      lastActive: "2024-03-15",
      avatar: "/avatars/04.png",
      coursesEnrolled: 2,
      completionRate: 45
    },
    {
      id: "5",
      name: "刘洋",
      email: "liu.yang@example.com",
      role: "管理员",
      status: "活跃",
      joinDate: "2023-01-10",
      lastActive: "2024-06-11",
      avatar: "/avatars/05.png",
      coursesEnrolled: 0,
      completionRate: 0
    },
    {
      id: "6",
      name: "陈明",
      email: "chen.ming@example.com",
      role: "学生",
      status: "活跃",
      joinDate: "2023-12-01",
      lastActive: "2024-06-05",
      avatar: "/avatars/06.png",
      coursesEnrolled: 4,
      completionRate: 60
    },
    {
      id: "7",
      name: "杨华",
      email: "yang.hua@example.com",
      role: "学生",
      status: "禁用",
      joinDate: "2023-08-17",
      lastActive: "2024-01-20",
      avatar: "/avatars/07.png",
      coursesEnrolled: 1,
      completionRate: 30
    },
    {
      id: "8",
      name: "黄丽",
      email: "huang.li@example.com",
      role: "讲师",
      status: "活跃",
      joinDate: "2023-04-12",
      lastActive: "2024-06-09",
      avatar: "/avatars/08.png",
      coursesEnrolled: 0,
      completionRate: 0
    }
  ]
}

// 获取用户状态对应的徽章
const getUserStatusBadge = (status: string) => {
  switch (status) {
    case "活跃":
      return <Badge className="bg-green-100 text-green-800 border-green-200">活跃</Badge>
    case "暂停":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">暂停</Badge>
    case "禁用":
      return <Badge variant="destructive">禁用</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  
  // 初始化表单
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "学生",
    },
  })
  
  // 加载用户数据
  useEffect(() => {
    // 模拟API调用延迟
    const timer = setTimeout(() => {
      const fetchedUsers = getUsers()
      setUsers(fetchedUsers)
      setFilteredUsers(fetchedUsers)
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  // 搜索过滤器
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = users.filter(
        user => 
          user.name.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])
  
  // 处理搜索输入
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  
  // 处理创建用户
  const onSubmit = async (data: z.infer<typeof userFormSchema>) => {
    // 模拟API调用
    try {
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // 创建新用户
      const newUser: User = {
        id: (users.length + 1).toString(),
        name: data.name,
        email: data.email,
        role: data.role,
        status: "活跃",
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
        coursesEnrolled: 0,
        completionRate: 0,
        avatar: `/avatars/${Math.floor(Math.random() * 8) + 1}.png`,
      }
      
      // 更新状态
      setUsers([...users, newUser])
      setFilteredUsers([...filteredUsers, newUser])
      
      // 关闭对话框并重置表单
      setIsDialogOpen(false)
      form.reset()
      
      // 显示成功消息
      toast.success(`用户 ${data.name} 已成功创建`)
    } catch (error) {
      toast.error("创建用户失败，请重试")
      console.error("创建用户失败:", error)
    }
  }
  
  // 处理删除用户
  const handleDeleteUser = async (userId: string) => {
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // 从列表中移除用户
      const updatedUsers = users.filter(user => user.id !== userId)
      const deletedUser = users.find(user => user.id === userId)
      
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers.filter(
        user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
      ))
      
      // 显示成功消息
      if (deletedUser) {
        toast.success(`用户 ${deletedUser.name} 已成功删除`)
      }
    } catch (error) {
      toast.error("删除用户失败，请重试")
      console.error("删除用户失败:", error)
    }
  }
  
  // 处理批量选择
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUserIds(filteredUsers.map(user => user.id))
    } else {
      setSelectedUserIds([])
    }
  }
  
  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUserIds([...selectedUserIds, userId])
    } else {
      setSelectedUserIds(selectedUserIds.filter(id => id !== userId))
    }
  }
  
  // 处理批量删除
  const handleBulkDelete = async () => {
    if (selectedUserIds.length === 0) return
    
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // 从列表中移除选中的用户
      const updatedUsers = users.filter(user => !selectedUserIds.includes(user.id))
      
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers.filter(
        user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
      ))
      
      // 清空选择
      setSelectedUserIds([])
      
      // 显示成功消息
      toast.success(`已成功删除 ${selectedUserIds.length} 个用户`)
    } catch (error) {
      toast.error("批量删除失败，请重试")
      console.error("批量删除失败:", error)
    }
  }
  
  // 导航到用户详情页
  const goToUserDetail = (userId: string) => {
    router.push(`/users/${userId}`)
  }
  
  // 导航到用户编辑页
  const goToUserEdit = (userId: string) => {
    router.push(`/users/${userId}/edit`)
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">用户管理</h1>
            <p className="text-sm text-muted-foreground">管理平台用户，查看用户信息和活动记录</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>新建用户</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>创建新用户</DialogTitle>
                  <DialogDescription>请输入新用户的信息以创建账户</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>用户名</FormLabel>
                          <FormControl>
                            <Input placeholder="输入用户名" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>电子邮件</FormLabel>
                          <FormControl>
                            <Input placeholder="输入电子邮件" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>用户角色</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择用户角色" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="学生">学生</SelectItem>
                              <SelectItem value="讲师">讲师</SelectItem>
                              <SelectItem value="管理员">管理员</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">创建用户</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索用户..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            {selectedUserIds.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleBulkDelete} className="gap-1">
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">删除所选</span>
                <span className="sm:hidden">删除</span>
                <span className="ml-1">({selectedUserIds.length})</span>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              导出
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <span>筛选</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>筛选条件</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>按角色筛选</DropdownMenuItem>
                <DropdownMenuItem>按状态筛选</DropdownMenuItem>
                <DropdownMenuItem>按注册日期筛选</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  重置筛选器
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="rounded-md border">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="text-sm text-muted-foreground">加载用户列表...</span>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={handleSelectAll}
                      checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                      // @ts-ignore indeterminate属性在TypeScript定义中不存在，但在DOM中有效
                      indeterminate={selectedUserIds.length > 0 && selectedUserIds.length < filteredUsers.length}
                    />
                  </TableHead>
                  <TableHead className="w-12 p-0"></TableHead>
                  <TableHead>用户名</TableHead>
                  <TableHead>电子邮件</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>注册日期</TableHead>
                  <TableHead>最近活动</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center">
                      {searchQuery ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Users className="h-8 w-8 text-muted-foreground" />
                          <p className="text-lg font-medium">未找到匹配的用户</p>
                          <p className="text-sm text-muted-foreground">尝试使用不同的搜索词</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Users className="h-8 w-8 text-muted-foreground" />
                          <p className="text-lg font-medium">暂无用户数据</p>
                          <p className="text-sm text-muted-foreground">点击"新建用户"按钮添加用户</p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="p-2 text-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={selectedUserIds.includes(user.id)}
                          onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell className="p-2" onClick={() => goToUserDetail(user.id)}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium" onClick={() => goToUserDetail(user.id)}>
                        {user.name}
                      </TableCell>
                      <TableCell onClick={() => goToUserDetail(user.id)}>{user.email}</TableCell>
                      <TableCell onClick={() => goToUserDetail(user.id)}>{user.role}</TableCell>
                      <TableCell onClick={() => goToUserDetail(user.id)}>
                        {getUserStatusBadge(user.status)}
                      </TableCell>
                      <TableCell onClick={() => goToUserDetail(user.id)}>{user.joinDate}</TableCell>
                      <TableCell onClick={() => goToUserDetail(user.id)}>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">打开菜单</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => goToUserDetail(user.id)}>
                              <Users className="mr-2 h-4 w-4" />
                              查看详情
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => goToUserEdit(user.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              编辑用户
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "活跃" ? (
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4" />
                                禁用账户
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                启用账户
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteUser(user.id);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              删除用户
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            显示 <strong>{filteredUsers.length}</strong> 个用户，共 <strong>2357</strong> 个
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={true}>
              上一页
            </Button>
            <Button variant="outline" size="sm" disabled={true}>
              下一页
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 