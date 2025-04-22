"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedShapes } from "@/components/animated-shapes"
import { userStore } from "@/lib/user-store"
import Link from "next/link"

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // 动画挂载效果
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      // 验证表单
      if (password !== confirmPassword) {
        throw new Error("两次输入的密码不一致")
      }
      
      if (password.length < 6) {
        throw new Error("密码长度不能少于6个字符")
      }
      
      // 检查邮箱是否已注册
      if (userStore.isEmailRegistered(email)) {
        throw new Error("该邮箱已被注册")
      }
      
      // 添加用户
      const newUser = userStore.addUser({
        email,
        password,
        name: name || undefined
      })
      
      if (!newUser) {
        throw new Error("注册失败，请稍后再试")
      }
      
      // 短暂延迟以显示成功状态
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 注册成功，重定向到登录页
      router.push('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      setError(error instanceof Error ? error.message : "注册失败，请稍后再试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className={cn(
        "flex flex-col gap-6 transition-opacity duration-700", 
        mounted ? "opacity-100" : "opacity-0",
        className
      )} 
      {...props}
    >
      <Card className="overflow-hidden border-0 shadow-2xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="z-10 p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="h-4 w-4 text-white"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">EduFusion</span>
                </div>
                <h1 className="text-2xl font-bold text-white">创建账户</h1>
                <p className="text-balance text-gray-400">注册EduFusion账户，开启您的教育优化之旅</p>
              </div>
              
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">
                  <p>{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="group relative z-0">
                  <Input 
                    id="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0" 
                    placeholder=" " 
                  />
                  <Label 
                    htmlFor="name" 
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                  >
                    姓名 (选填)
                  </Label>
                </div>
                
                <div className="group relative z-0">
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0" 
                    placeholder=" " 
                    required 
                  />
                  <Label 
                    htmlFor="email" 
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                  >
                    邮箱地址
                  </Label>
                </div>
                
                <div className="group relative z-0">
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0" 
                    placeholder=" " 
                    required 
                  />
                  <Label 
                    htmlFor="password" 
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                  >
                    密码
                  </Label>
                </div>
                
                <div className="group relative z-0">
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0" 
                    placeholder=" " 
                    required 
                  />
                  <Label 
                    htmlFor="confirmPassword" 
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                  >
                    确认密码
                  </Label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="group relative mt-2 w-full overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2.5 text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/25" 
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      注册中...
                    </>
                  ) : (
                    "注册"
                  )}
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
              
              <div className="text-center text-sm text-gray-400">
                已有账户？{" "}
                <Link href="/login" className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300">
                  登录
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-slate-900 md:block">
            {/* 背景渐变 */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20"></div>
            
            {/* 网格背景 */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-50"></div>
            
            {/* 使用动画形状组件 */}
            <AnimatedShapes />
            
            {/* 特性说明内容 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform space-y-6 text-center z-10">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] animate-pulse-glow">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900/90 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift">加入教育创新社区</h3>
                <p className="mt-2 text-sm text-gray-400">成为变革教育未来的一员</p>
              </div>
              <div className="flex justify-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                <span className="h-2 w-2 rounded-full bg-pink-400"></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-gray-500 [&_a]:text-indigo-400 [&_a]:transition-colors hover:[&_a]:text-indigo-300">
        点击注册，即表示您同意我们的 <a href="#">服务条款</a> 和 <a href="#">隐私政策</a>。
      </div>
    </div>
  )
} 