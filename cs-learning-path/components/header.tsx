"use client"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Moon, Sun, Settings, User, Menu, ChevronRight, LogOut, HelpCircle } from "lucide-react"

export default function Header() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="openai-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={process.env.NEXT_PUBLIC_VED_INDICATOR_URL || 'http://localhost:3000'} className="flex items-center gap-2">
            <Image src="/5.png" alt="EduFusion" width={32} height={32} className="h-8 w-8" />
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 hidden sm:inline-block">
              EduFusion
            </span>
          </Link>
          
          {/* 移除了导航栏中的三个按钮 */}
        </div>

        <div className="flex items-center gap-2">
          {/* 移动端菜单 */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-md">
                <Menu className="h-5 w-5" />
                <span className="sr-only">菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-4">
                <Link href={process.env.NEXT_PUBLIC_VED_INDICATOR_URL || 'http://localhost:3000'} className="flex items-center gap-2 mb-6">
                  <Image src="/5.png" alt="EduFusion" width={32} height={32} className="h-8 w-8" />
                  <span className="text-xl font-semibold">EduFusion</span>
                </Link>
                <div className="space-y-1">
                  {[
                    { title: "设置", href: "/settings" },
                    { title: "帮助", href: "/help" },
                  ].map((item) => (
                    <Button
                      key={item.title}
                      variant="ghost"
                      className="w-full justify-start rounded-md"
                      asChild
                    >
                      <Link href={item.href}>
                        {item.title}
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md">
                <User className="h-5 w-5" />
                <span className="sr-only">用户菜单</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1">
                  <User className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">学习者</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>个人资料</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>设置</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>帮助中心</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">切换主题</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>浅色</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>深色</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>系统</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
