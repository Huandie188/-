"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { ArrowRight, BookOpen, GraduationCap, Book, Users, Lightbulb, Sparkles, ArrowLeft, Clock, Star, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useAuth from "@/hooks/useAuth"
import { Badge } from "@/components/ui/badge"
import CourseCarousel from "@/components/CourseCarousel"
import MapParticles from "@/components/MapParticles"

// 创建一个客户端组件来使用 useSearchParams
function SearchParamsHandler() {
  const { setLoggedIn } = useAuth()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const loginStatus = searchParams.get('login')
    if (loginStatus === 'success') {
      setLoggedIn(true)
      // 清除URL参数
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams, setLoggedIn])
  
  return null
}

export default function Home() {
  const { isLoggedIn, setLoggedIn } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 使用 requestAnimationFrame 来延迟一帧，确保状态更新和渲染同步
    requestAnimationFrame(() => {
      setIsLoading(false)
    })
  }, [])

  // 骨架屏组件
  const SkeletonContent = () => (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-6">
        <div className="h-16 bg-muted rounded-lg w-3/4" />
        <div className="h-8 bg-muted rounded-lg w-2/3" />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="h-12 w-32 bg-muted rounded-lg" />
        <div className="h-12 w-32 bg-muted rounded-lg" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
        <div className="space-y-2">
          <div className="h-10 bg-muted rounded-lg" />
          <div className="h-4 bg-muted rounded-lg w-1/2" />
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-muted rounded-lg" />
          <div className="h-4 bg-muted rounded-lg w-1/2" />
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-muted rounded-lg" />
          <div className="h-4 bg-muted rounded-lg w-1/2" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      {/* 将 useSearchParams 包装在 Suspense 中 */}
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>
      
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <img src="/5.png" alt="EduFusion" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">EduFusion</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium flex-1 justify-center">
            {process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL ? (
              <Link href={process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                AI课程推荐
              </Link>
            ) : null}
            <Link href="/courses" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              在线课程
            </Link>
            <Link href="/pomodoro" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              <Clock className="inline-block mr-1 h-4 w-4" /> 番茄钟
            </Link>
            <Link href="/vocabulary" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              <Book className="inline-block mr-1 h-4 w-4" /> 背单词
            </Link>
            {process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL ? (
              <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                个人学习路线
              </Link>
            ) : null}
            <Link href="/profile" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              个人信息
            </Link>
            <Link href="/community" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              用户社区
            </Link>
          </nav>
          <div className="flex items-center gap-4 w-[180px] justify-end">
            {!isLoading && (
              isLoggedIn ? (
                <>
                  <Link href="/vocabulary" className="md:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                      <Book className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/pomodoro" className="md:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                      <Clock className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href={process.env.NEXT_PUBLIC_ADMIN_URL || '#'}>
                    <Button variant="ghost" className="rounded-full hover:bg-primary-50 text-primary-700">后台管理</Button>
                  </Link>
                  <Button variant="outline" className="rounded-full" onClick={() => setLoggedIn(false)}>
                    登出
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/vocabulary" className="md:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                      <Book className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/pomodoro" className="md:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                      <Clock className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href={process.env.NEXT_PUBLIC_AUTH_URL || '#'}>
                    <Button className="rounded-full shadow-subtle">登录/注册</Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 pt-14">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-8 md:py-12 lg:py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900/80 dark:via-background dark:to-background">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full max-w-7xl mx-auto">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-300/20 dark:bg-violet-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '0s' }} />
                <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-300/20 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
                <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-primary-300/20 dark:bg-primary-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
              </div>
            </div>
          </div>

          <div className="container relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-6 md:py-8 items-center">
              <div className="space-y-8 max-w-2xl">
                {isLoading ? (
                  <SkeletonContent />
                ) : (
                  <>
                    <div className="space-y-6">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-2">
                        <span className="flex h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2"></span>
                        重新定义在线教育
                      </div>
                      
                      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        让优质教育{" "}
                        <span className="relative">
                          <span className="bg-gradient-to-r from-violet-600 via-primary-600 to-blue-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                            精准流动
                          </span>
                          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-violet-600 via-primary-600 to-blue-500 opacity-70"></span>
                        </span>
                      </h1>
                      
                      <p className="text-xl leading-relaxed text-muted-foreground max-w-lg">
                        基于尖端AI技术的个性化学习平台，今日已优化<span className="font-semibold text-foreground">32,145</span>门课程，
                        解决<span className="font-semibold text-foreground">72</span>项技能缺口。
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <Link href="/courses">
                        <Button size="lg" className="rounded-full px-6 gap-2 bg-primary hover:bg-primary-600 group relative overflow-hidden">
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                          开始探索 
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button size="lg" variant="outline" className="rounded-full px-6 border-gray-300 dark:border-gray-700 shadow-sm">
                          联系我们
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-100 to-violet-100 dark:from-primary-900/20 dark:to-violet-900/20 rounded-lg blur opacity-50"></div>
                        <div className="relative space-y-1 bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                          <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-violet-500 bg-clip-text text-transparent">32,145</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">精选课程</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-900/20 dark:to-blue-900/20 rounded-lg blur opacity-50"></div>
                        <div className="relative space-y-1 bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                          <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">98%</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">匹配精度</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-primary-100 dark:from-blue-900/20 dark:to-primary-900/20 rounded-lg blur opacity-50"></div>
                        <div className="relative space-y-1 bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                          <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-primary-600 bg-clip-text text-transparent">20000+</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">活跃学习者</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 添加移动端课程轮播组件 */}
                    <div className="lg:hidden mt-8">
                      <div className="relative bg-white/90 dark:bg-gray-900/90 rounded-2xl border shadow-card backdrop-blur-sm p-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-2xl overflow-hidden">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        </div>
                        <div className="relative p-4 space-y-4">
                          <CourseCarousel />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 rounded-2xl blur-3xl opacity-70"></div>
                <div className="absolute w-20 h-20 -right-10 -top-10 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-ring"></div>
                <div className="absolute w-20 h-20 -left-10 -bottom-10 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-ring" style={{ animationDelay: '-1.5s' }}></div>
                
                <div className="relative bg-white/90 dark:bg-gray-900/90 rounded-2xl border shadow-card backdrop-blur-sm p-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>
                  
                  <div className="relative p-4 space-y-4">
                    <CourseCarousel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-dots bg-dots-lg opacity-30 dark:opacity-20"></div>
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white dark:from-gray-950 to-transparent"></div>
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 top-1/3 w-80 h-80 bg-violet-300/20 dark:bg-violet-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute -right-40 top-2/3 w-80 h-80 bg-blue-300/20 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '-5s' }}></div>
          </div>
          
          <div className="container relative z-10 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-2 mx-auto">
                <span className="flex h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2"></span>
                强大AI驱动
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
                AI 智能推荐系统
              </h2>
              <p className="text-xl text-muted-foreground">
                通过强大的AI技术，帮助您找到最适合的学习资源和发展路径
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-100 to-violet-100 dark:from-primary-900/40 dark:to-violet-900/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <Card className="relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-subtle group-hover:shadow-card transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>
                  
                  <CardContent className="relative p-6 space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">个性化推荐</h3>
                    <p className="text-muted-foreground">
                      基于您的学习历史、兴趣偏好和职业目标，提供精准的课程推荐
                    </p>
                    {process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL ? (
                      <div className="pt-2">
                        <Link href={process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL}>
                          <Button variant="ghost" className="px-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-transparent group-hover:-translate-y-0.5 transition-transform duration-300">
                            了解更多 <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    ) : null}
                    
                    <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-primary-500/5 to-violet-500/5 rounded-full blur-xl"></div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-900/40 dark:to-blue-900/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <Card className="relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-subtle group-hover:shadow-card transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>
                  
                  <CardContent className="relative p-6 space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">学习路径设计</h3>
                    <p className="text-muted-foreground">
                      智能规划学习顺序，从基础到进阶，确保知识体系的完整性和连贯性
                    </p>
                    {process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL ? (
                      <div className="pt-2">
                        <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL}>
                          <Button variant="ghost" className="px-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-transparent group-hover:-translate-y-0.5 transition-transform duration-300">
                            探索学习路径 <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    ) : null}
                    
                    <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-violet-500/5 to-blue-500/5 rounded-full blur-xl"></div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-100 to-primary-100 dark:from-blue-900/40 dark:to-primary-900/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <Card className="relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-subtle group-hover:shadow-card transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>
                  
                  <CardContent className="relative p-6 space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-primary-500 flex items-center justify-center text-white shadow-md">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">社区互动学习</h3>
                    <p className="text-muted-foreground">
                      连接相同学习方向的伙伴，共同进步，分享经验，拓展人脉
                    </p>
                    <div className="pt-2">
                      <Link href="/community">
                        <Button variant="ghost" className="px-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-transparent group-hover:-translate-y-0.5 transition-transform duration-300">
                          了解更多 <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-primary-500/5 rounded-full blur-xl"></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-dots bg-dots-lg opacity-20 dark:opacity-10"></div>
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
          
          <div className="container space-y-8 relative z-10">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
                    重磅课程
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">精选在线课程</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mt-3">
                    涵盖各领域顶级院校和平台的优质课程，品质保证
                  </p>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2">
                  <Button variant="outline" size="sm" className="rounded-full border-gray-300 dark:border-gray-700">
                    <ArrowLeft className="h-4 w-4 mr-1" /> 上一页
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full border-gray-300 dark:border-gray-700">
                    下一页 <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "初识机器学习-理论篇",
                  provider: "慕课网",
                  level: "中级",
                  duration: "8周",
                  rating: 4.9,
                  icon: <Book className="h-5 w-5" />,
                  color: "from-violet-500 to-blue-500",
                  bgLight: "from-violet-100/70 to-blue-50/70",
                  bgDark: "from-violet-900/30 to-blue-900/30",
                  iconBg: "bg-violet-500",
                  badge: "热门",
                  badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                },
                {
                  title: "R语言之数据可视化",
                  provider: "慕课网",
                  level: "中级",
                  duration: "10周",
                  rating: 4.8,
                  icon: <Book className="h-5 w-5" />,
                  color: "from-blue-500 to-cyan-500",
                  bgLight: "from-blue-100/70 to-cyan-50/70",
                  bgDark: "from-blue-900/30 to-cyan-900/30",
                  iconBg: "bg-blue-500",
                  badge: "推荐",
                  badgeColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                },
                {
                  title: "PHP实现微信公众平台开发—提升篇",
                  provider: "慕课网",
                  level: "进阶",
                  duration: "12周",
                  rating: 4.7,
                  icon: <Book className="h-5 w-5" />,
                  color: "from-primary-500 to-violet-500",
                  bgLight: "from-primary-100/70 to-violet-50/70",
                  bgDark: "from-primary-900/30 to-violet-900/30",
                  iconBg: "bg-primary-500",
                  badge: "新课",
                  badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                }
              ].map((course, i) => (
                <div key={i} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${course.bgLight} dark:${course.bgDark} rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300`}></div>
                  <Card className="relative border border-gray-200 dark:border-gray-800 shadow-subtle group-hover:shadow-card transition-all duration-300 overflow-hidden">
                    <div className={`h-48 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] z-10"></div>
                      <div className="relative h-full w-full">
                        <img 
                          src={i === 0 ? "/course-images/ai-intro.jpg" : i === 1 ? "/course-images/data-viz.jpg" : "/course-images/web-dev.jpg"} 
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>
                      
                      {course.badge && (
                        <Badge className={`absolute top-4 right-4 z-20 ${course.badgeColor}`}>
                          {course.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className="p-6 space-y-5">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{course.title}</h3>
                        <p className="text-muted-foreground">{course.provider}</p>
                      </div>
                      
                      <div className="flex flex-wrap justify-between text-sm gap-y-2">
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                          <GraduationCap className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" /> 
                          <span className="text-gray-700 dark:text-gray-300">{course.level}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                          <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" /> 
                          <span className="text-gray-700 dark:text-gray-300">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3.5 w-3.5 ${i < Math.floor(course.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 ml-1">{course.rating}</span>
                        </div>
                      </div>
                      
                      <Link href={i === 0 ? "/courses/imooc-717" : i === 1 ? "/courses/imooc-640" : "/courses/imooc-509"}>
                        <Button className={`w-full rounded-full bg-gradient-to-r ${course.color} text-white border-0 shadow-md hover:shadow-lg transition-shadow`}>
                          查看详情
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-10">
              <Link href="/courses">
                <Button variant="outline" className="rounded-full px-6 py-6 text-lg border-gray-300 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  查看全部课程 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>
          
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300/20 dark:bg-primary-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '-3s' }}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '-7s' }}></div>
          
          <div className="container relative z-10 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-2 mx-auto">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
                全程指导
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
                个人学习路线
              </h2>
              <p className="text-xl text-muted-foreground">
                丰富的学习资源和工具，助力您的学习之旅
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-100 to-violet-100 dark:from-blue-900/40 dark:to-violet-900/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <Card className="relative h-full border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 shadow-subtle backdrop-blur-sm group-hover:shadow-card transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent dark:from-gray-900 dark:to-transparent rounded-xl overflow-hidden"></div>
                  <CardContent className="relative p-8 flex flex-col h-full">
                    <div className="mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white shadow-md mb-4">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">职业路径</h3>
                      <p className="text-muted-foreground">根据您的职业目标，定制专属学习路线，循序渐进达成目标</p>
                    </div>
                    
                    <div className="space-y-4 flex-1 my-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group/item hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">数据科学家</p>
                          <p className="text-xs text-muted-foreground">13个课程 · 5个项目</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group/item hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">全栈工程师</p>
                          <p className="text-xs text-muted-foreground">18个课程 · 8个项目</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group/item hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">AI工程师</p>
                          <p className="text-xs text-muted-foreground">15个课程 · 6个项目</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL || '#'}>
                      <Button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 shadow-md hover:shadow-lg transition-shadow">
                        查看所有路径
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-100 to-amber-100 dark:from-primary-900/40 dark:to-amber-900/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <Card className="relative h-full border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 shadow-subtle backdrop-blur-sm group-hover:shadow-card transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent dark:from-gray-900 dark:to-transparent rounded-xl overflow-hidden"></div>
                  <CardContent className="relative p-8 flex flex-col h-full">
                    <div className="mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-amber-500 flex items-center justify-center text-white shadow-md mb-4">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">技能进阶</h3>
                      <p className="text-muted-foreground">针对特定技能的提升，满足您在特定领域的专业需求</p>
                    </div>
                    
                    <div className="space-y-4 flex-1 my-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group/item hover:border-amber-200 dark:hover:border-amber-900 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">大型语言模型应用</p>
                          <p className="text-xs text-muted-foreground">7个课程 · 3个项目</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity text-amber-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group/item hover:border-amber-200 dark:hover:border-amber-900 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">云原生架构</p>
                          <p className="text-xs text-muted-foreground">9个课程 · 4个项目</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity text-amber-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 group/item hover:border-amber-200 dark:hover:border-amber-900 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">前端工程化</p>
                          <p className="text-xs text-muted-foreground">12个课程 · 5个项目</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity text-amber-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Link href="/courses">
                      <Button className="w-full rounded-full bg-gradient-to-r from-primary-500 to-amber-500 text-white border-0 shadow-md hover:shadow-lg transition-shadow">
                        探索更多技能
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="text-center pt-8">
              {process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL ? (
                <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL}>
                  <Button variant="outline" className="rounded-full px-6 py-6 text-lg border-blue-800 text-blue-400 hover:bg-blue-900/20 shadow-[0_0_20px_rgba(0,0,255,0.2)] hover:shadow-[0_0_30px_rgba(0,0,255,0.3)] transition-all">
                    定制我的学习计划 <Sparkles className="ml-2 h-4 w-4 text-amber-500" />
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
        
        {/* 学习者生态地图 Section */}
        <section id="knowledge-map" className="py-12 md:py-16 lg:py-20 relative overflow-hidden bg-[#0A0A1A] text-white">
          {/* 背景效果 - 模拟星空 */}
          <div className="absolute inset-0 bg-[#0A0A1A]">
            {/* 星星背景 */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-30"></div>
            
            {/* 渐变光晕 */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full mix-blend-screen filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-violet-900/10 rounded-full mix-blend-screen filter blur-3xl"></div>
            <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-primary-900/10 rounded-full mix-blend-screen filter blur-3xl"></div>
          </div>
          
          <div className="container relative z-10 space-y-12">
            {/* 标题区域 */}
            <div className="text-center space-y-5 max-w-3xl mx-auto">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-2 mx-auto border border-blue-800/50">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                数据可视化
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-300 via-violet-300 to-primary-300 bg-clip-text text-transparent">
                知识星火 · 燎原中国
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                探索全国学习者分布与知识流动，见证教育资源的精准流动与共享
              </p>
            </div>
            
            {/* 三层立体式布局 */}
            <div className="relative mt-16">
              {/* 1. 动态标题层 */}
              <div className="absolute inset-0 flex items-center justify-center -mt-16 opacity-5">
                <div className="w-full max-w-4xl">
                  {/* 中国地图轮廓（占位） */}
                  <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                    <img 
                      src="/placeholder-logo.jpg" 
                      alt="中国地图轮廓" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A1A] via-transparent to-[#0A0A1A]"></div>
                  </div>
                </div>
              </div>
              
              {/* 2. 核心地图层 */}
              <div className="relative mx-auto max-w-4xl bg-[#0F111A] rounded-2xl shadow-[0_0_50px_rgba(0,0,255,0.1)] border border-blue-900/30 overflow-hidden">
                <div className="aspect-[4/3] relative p-4">
                  {/* 基础层：中国地图 */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img 
                      src="/placeholder-logo.jpg" 
                      alt="中国地图" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0F111A_100%)]"></div>
                  </div>
                  
                  {/* 数据层：光点标记（使用客户端组件替代） */}
                  <MapParticles />
                  
                  {/* 趋势层：知识流动路径（静态展示） */}
                  <div className="absolute inset-0">
                    {/* 东南沿海到中部的主要知识流动路径 */}
                    <div className="absolute h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/80 to-blue-500/0 -rotate-12 top-1/2 right-1/5 w-1/3"></div>
                    <div className="absolute h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-500/80 to-violet-500/0 -rotate-18 top-2/5 right-1/4 w-1/4"></div>
                    
                    {/* 中部到西北的次要知识流动路径 */}
                    <div className="absolute h-0.5 bg-gradient-to-r from-amber-500/0 via-amber-500/80 to-amber-500/0 -rotate-25 top-1/3 left-1/3 w-1/5"></div>
                    
                    {/* 东南沿海点到点的知识连接 */}
                    <div className="absolute h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500/60 to-primary-500/0 rotate-40 bottom-1/3 right-1/5 w-1/6"></div>
                    <div className="absolute h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 rotate-70 bottom-1/4 right-1/4 w-1/8"></div>
                    
                    {/* 东北区域连接 */}
                    <div className="absolute h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-500/70 to-violet-500/0 rotate-15 top-1/4 right-1/4 w-1/5"></div>
                    
                    {/* 西南区域连接 */}
                    <div className="absolute h-0.5 bg-gradient-to-r from-amber-500/0 via-amber-500/70 to-amber-500/0 rotate-5 bottom-1/3 left-1/3 w-1/5"></div>
                    
                    {/* 跨区域长链接 */}
                    <div className="absolute h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 rotate-40 top-1/3 w-3/5" style={{left: '23%'}}></div>
                  </div>
                  
                  {/* 省份热力标注（静态） */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* 东南沿海热力区 */}
                    <div className="absolute bottom-1/4 right-1/5 w-36 h-36 bg-blue-500/15 rounded-full blur-xl animate-pulse-slow"></div>
                    <div className="absolute bottom-1/3 right-1/6 w-28 h-28 bg-violet-500/15 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '-2s' }}></div>
                    
                    {/* 中部热力区 */}
                    <div className="absolute top-2/4 left-5/12 w-24 h-24 bg-amber-500/15 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '-1s' }}></div>
                    <div className="absolute top-2/5 left-2/5 w-20 h-20 bg-primary-500/15 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '-3s' }}></div>
                    
                    {/* 西北热力区 */}
                    <div className="absolute top-1/4 left-1/4 w-[4.5rem] h-[4.5rem] bg-blue-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '-1.5s' }}></div>
                    
                    {/* 东北热力区 */}
                    <div className="absolute top-1/5 right-1/5 w-20 h-20 bg-violet-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '-2.5s' }}></div>
                    
                    {/* 西南热力区 */}
                    <div className="absolute bottom-1/5 left-1/3 w-[5rem] h-[5rem] bg-amber-500/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '-0.8s' }}></div>
                  </div>
                </div>
                
                {/* 3. 数据注解层 */}
                <div className="bg-[#080A14] border-t border-blue-900/30 p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 text-center">
                      <p className="text-xs uppercase tracking-wider text-gray-500">活跃学习者</p>
                      <p className="text-2xl font-mono text-blue-400 font-bold tracking-widest">20000+</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="text-xs uppercase tracking-wider text-gray-500">知识流动路径</p>
                      <p className="text-2xl font-mono text-violet-400 font-bold tracking-widest">458</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="text-xs uppercase tracking-wider text-gray-500">课程访问峰值</p>
                      <p className="text-2xl font-mono text-amber-400 font-bold tracking-widest">4000+</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 图例说明 */}
              <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0F111A] rounded-lg border border-blue-900/30 p-4 flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_currentColor]"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">普通学习者</p>
                    <p className="text-xs text-gray-500">分布于教育资源紧缺区域</p>
                  </div>
                </div>
                <div className="bg-[#0F111A] rounded-lg border border-blue-900/30 p-4 flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_10px_currentColor]"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">高活跃用户</p>
                    <p className="text-xs text-gray-500">每周学习时长超过15小时</p>
                  </div>
                </div>
                <div className="bg-[#0F111A] rounded-lg border border-blue-900/30 p-4 flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-violet-400 shadow-[0_0_10px_currentColor]"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">知识贡献者</p>
                    <p className="text-xs text-gray-500">提供学习资源与指导</p>
                  </div>
                </div>
              </div>
              
              {/* 注释信息 */}
              <div className="mt-8 max-w-2xl mx-auto text-center">
                <p className="text-sm text-gray-500 italic">
                  注：地图数据每10分钟更新一次，覆盖全国各省份地区，东南沿海地区用户密度最高，流动路径代表跨地区知识资源传递
                </p>
              </div>
            </div>
            
            {/* 号召性按钮 */}
            <div className="text-center pt-8">
              <Link href="/community">
                <Button variant="outline" className="rounded-full px-6 py-6 text-lg border-blue-800 text-blue-400 hover:bg-blue-900/20 shadow-[0_0_20px_rgba(0,0,255,0.2)] hover:shadow-[0_0_30px_rgba(0,0,255,0.3)] transition-all">
                  探索你的学习社区 <Users className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/5.png" alt="EduFusion" className="h-8 w-8" />
                <span className="text-xl font-bold">EduFusion</span>
              </div>
              <p className="text-muted-foreground">让优质教育精准流动，链接未来无限可能</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">产品</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">AI课程推荐</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">学习路径规划</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">技能评估</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">资源</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">学习指南</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">行业报告</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">职业发展</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">关于我们</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">团队介绍</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">联系我们</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">加入我们</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 EduFusion。保留所有权利。</p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">
                隐私政策
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">
                服务条款
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">
                Cookie 设置
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
