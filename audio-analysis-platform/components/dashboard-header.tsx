import { Bell, Search, Sparkles, ArrowLeft, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import Image from "next/image"

export function DashboardHeader() {
  // 主页URL - 确保绝对有一个有效值
  const homeUrl = process.env.NEXT_PUBLIC_VED_INDICATOR_URL || 'https://test-ten-nu-93.vercel.app';
  
  // 调试信息 - 在开发者控制台打印环境变量的值
  console.log('主页URL:', homeUrl);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-gradient-to-r from-blue-700 to-purple-600 shadow-md">
      <div className="flex h-16 items-center px-4 relative">
        <div className="flex items-center">
          <a 
            href={homeUrl}
            className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200"
            title="返回主系统"
          >
            <Image src="/5.png" alt="Logo" width={32} height={32} className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">EduFusion</span>
              <span className="text-xs text-white/70">点击返回主系统</span>
            </div>
          </a>
        </div>
        
        <div className="absolute left-[275px] top-1/2 transform -translate-y-1/2">
          <a href={homeUrl}>
            <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white flex items-center space-x-2 px-5 py-2.5">
              <Home className="h-6 w-6" />
              <span className="text-base font-medium">返回主页</span>
            </Button>
          </a>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
            <Input
              type="search"
              placeholder="搜索课程、用户、趋势..."
              className="w-[200px] lg:w-[300px] pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20 hover:text-white">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-[10px] font-medium text-blue-700 flex items-center justify-center">
                  5
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>系统通知</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>AI模型更新完成：推荐精度提升12.5%</DropdownMenuItem>
              <DropdownMenuItem>发现新兴技能趋势：低代码开发需求增长58%</DropdownMenuItem>
              <DropdownMenuItem>已收到15条课程缺口反馈，待处理</DropdownMenuItem>
              <DropdownMenuItem>高校合作请求：北京大学计算机学院</DropdownMenuItem>
              <DropdownMenuItem>系统性能报告已生成：2024年5月</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
          <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
            AI助手
          </Button>
        </div>
      </div>
    </div>
  )
}
