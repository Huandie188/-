"use client"

import { BarChart3, BookOpen, Home, Upload, Users, Settings, HelpCircle, LogOut, Sparkles, Database, AlertCircle, MessageSquare, School, TrendingUp, BookMarked } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    // 清除登录状态
    localStorage.removeItem('isLoggedIn')
    // 跳转到登录页面
    if (!process.env.NEXT_PUBLIC_LOGIN_URL) {
      console.error('环境变量NEXT_PUBLIC_LOGIN_URL未设置')
      alert('系统配置错误，请联系管理员')
      return
    }
    window.location.href = process.env.NEXT_PUBLIC_LOGIN_URL
  }

  return (
    <Sidebar className="fixed left-0 top-0 bottom-0 z-[60]">
      <SidebarHeader className="py-4">
        <Link 
          href={process.env.NEXT_PUBLIC_VED_INDICATOR_URL ? process.env.NEXT_PUBLIC_VED_INDICATOR_URL : "/"}
          className="flex items-center gap-2 px-4"
        >
          <Image src="/5.png" alt="Logo" width={36} height={36} className="h-9 w-9" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
            EduFusion
          </span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>管理面板</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>总览面板</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/courses")}>
                  <Link href="/courses">
                    <BookOpen className="h-4 w-4" />
                    <span>课程管理</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/learning-paths")}>
                  <Link href="/learning-paths">
                    <School className="h-4 w-4" />
                    <span>学习路径</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/ai-model")}>
                  <Link href="/ai-model">
                    <Sparkles className="h-4 w-4" />
                    <span>AI模型管理</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/users")}>
                  <Link href="/users">
                    <Users className="h-4 w-4" />
                    <span>用户与反馈</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>数据分析</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/market-analysis")}>
                  <Link href="/market-analysis">
                    <TrendingUp className="h-4 w-4" />
                    <span>市场分析</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/content-analysis")}>
                  <Link href="/content-analysis">
                    <BookMarked className="h-4 w-4" />
                    <span>内容分析</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/course-gaps")}>
                  <Link href="/course-gaps">
                    <AlertCircle className="h-4 w-4" />
                    <span>课程缺口</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/reports")}>
                  <Link href="/reports">
                    <BarChart3 className="h-4 w-4" />
                    <span>报表中心</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>系统管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/data-sources")}>
                  <Link href="/data-sources">
                    <Database className="h-4 w-4" />
                    <span>数据源管理</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/assistant")}>
                  <Link href="/assistant">
                    <MessageSquare className="h-4 w-4" />
                    <span>AI助手设置</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")}>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>系统设置</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/help")}>
                  <Link href="/help">
                    <HelpCircle className="h-4 w-4" />
                    <span>帮助与支持</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="用户" />
              <AvatarFallback>王明</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">王明</p>
              <p className="text-xs text-muted-foreground">系统管理员</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
