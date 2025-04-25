"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Loader2, Save } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard-header"

// 定义用户类型
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
  avatar?: string
}

// 表单验证模式
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "用户名至少需要2个字符"
  }),
  email: z.string().email({
    message: "请输入有效的电子邮件地址"
  }),
  role: z.enum(["学生", "讲师", "管理员"], {
    required_error: "请选择用户角色"
  }),
  status: z.enum(["活跃", "暂停", "禁用"], {
    required_error: "请选择用户状态"
  }),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
})

// 模拟获取用户数据的函数
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
      avatar: "/avatars/01.png"
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
      avatar: "/avatars/02.png"
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
      avatar: "/avatars/03.png"
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
      avatar: "/avatars/04.png"
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
      avatar: "/avatars/05.png"
    }
  ]
  
  return users.find(user => user.id === id) || null
}

export default function UserEditPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  // 表单初始化
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "学生",
      status: "活跃",
      phone: "",
      location: "",
      bio: "",
    },
  })
  
  // 加载用户数据
  useEffect(() => {
    const userId = params.id as string
    
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const userData = getUserById(userId)
      
      if (userData) {
        setUser(userData)
        
        // 使用获取的用户数据填充表单
        form.reset({
          name: userData.name,
          email: userData.email,
          role: userData.role as any,
          status: userData.status as any,
          phone: userData.phone || "",
          location: userData.location || "",
          bio: userData.bio || "",
        })
      }
      
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [params.id, form])
  
  // 表单提交处理
  const onSubmit = async (data: z.infer<typeof userFormSchema>) => {
    setIsSaving(true)
    
    try {
      // 模拟API请求
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // 更新成功
      toast.success("用户信息已成功更新")
      
      // 成功后返回用户详情页
      router.push(`/users/${params.id}`)
    } catch (error) {
      toast.error("更新失败，请稍后重试")
      console.error("更新用户信息失败:", error)
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleCancel = () => {
    router.back()
  }
  
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
            <h1 className="text-3xl font-bold tracking-tight">编辑用户信息</h1>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>修改用户的基本个人信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>手机号码</FormLabel>
                        <FormControl>
                          <Input placeholder="输入手机号码" {...field} />
                        </FormControl>
                        <FormDescription>
                          仅管理员可见，不会公开显示
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>所在地区</FormLabel>
                        <FormControl>
                          <Input placeholder="输入所在地区" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>个人简介</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="输入个人简介..." 
                          className="resize-none min-h-[120px]" 
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        简短介绍用户的背景、兴趣或专业领域
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>账户设置</CardTitle>
                <CardDescription>管理用户的角色和账户状态</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户角色</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="选择用户角色" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="学生">学生</SelectItem>
                              <SelectItem value="讲师">讲师</SelectItem>
                              <SelectItem value="管理员">管理员</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          决定用户在系统中的权限和可访问的功能
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>账户状态</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="选择账户状态" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="活跃">活跃</SelectItem>
                              <SelectItem value="暂停">暂停</SelectItem>
                              <SelectItem value="禁用">禁用</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          控制用户是否可以登录和使用平台功能
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">账户信息</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-sm">
                      <span className="font-medium">注册时间:</span> {user.joinDate}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">最近活动:</span> {user.lastActive}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>危险操作</CardTitle>
                <CardDescription>这些操作可能会对用户数据产生不可逆的影响</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">重置密码</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">
                    将向用户发送密码重置链接，允许他们创建新密码
                  </p>
                  <Button variant="outline" type="button">
                    发送密码重置链接
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="font-medium text-destructive">删除账户</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">
                    永久删除此用户账户及其所有数据，此操作不可撤销
                  </p>
                  <Button variant="destructive" type="button">
                    删除用户账户
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-center justify-end gap-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                取消
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                保存修改
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
} 