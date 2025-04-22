"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Sparkles, Star, Users, Zap, Shield, Trophy, GraduationCap, Clock } from "lucide-react"
import BackButton from "@/components/BackButton"

export default function MembershipPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 导航栏 */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <img src="/5.png" alt="EduFusion" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">EduFusion</span>
          </Link>
          <div className="flex-1"></div>
        </div>
      </header>

      <main className="flex-1 pt-14">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
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
            <BackButton />
            <div className="text-center mx-auto max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                提升学习效率，加速技能提升
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                认证学习
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-primary-600 dark:from-blue-400 dark:via-violet-400 dark:to-primary-400 bg-clip-text text-transparent"> 会员 </span>
                体系
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                专为认真学习的你量身定制，享受个性化学习指导与特权资源，实现学习目标
              </p>
            </div>
          </div>
        </section>

        {/* 会员等级卡片 */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative">
          <div className="container relative z-10 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">选择最适合你的会员等级</h2>
              <p className="text-lg text-muted-foreground">
                根据你的学习需求和目标，选择合适的会员等级，开启高效学习之旅
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 基础会员 */}
              <Card className="relative overflow-hidden border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-full blur-xl"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-xl">基础会员</CardTitle>
                    </div>
                    <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400">
                      入门级
                    </Badge>
                  </div>
                  <CardDescription className="pt-2">适合初次接触学习平台的用户</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">¥99</span>
                    <span className="text-muted-foreground ml-1">/月</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">访问全平台基础课程</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">基础学习路径规划</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">每周学习进度报告</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">社区问答支持</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                    开始试用
                  </Button>
                </CardFooter>
              </Card>

              {/* 高级会员 */}
              <Card className="relative overflow-hidden border-violet-200 dark:border-violet-800 shadow-xl hover:shadow-2xl transition-shadow scale-105 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br from-violet-100 to-blue-50 dark:from-violet-900/30 dark:to-blue-900/20 rounded-full blur-xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-blue-100 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/10 rounded-full blur-xl"></div>
                <div className="absolute right-4 top-0">
                  <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 text-white border-0 px-3 py-1 -mt-1">
                    最受欢迎
                  </Badge>
                </div>
                <CardHeader className="pt-6 pb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-violet-500" />
                    <CardTitle className="text-xl">高级会员</CardTitle>
                  </div>
                  <CardDescription className="pt-2">面向认真学习与技能提升的用户</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">¥199</span>
                    <span className="text-muted-foreground ml-1">/月</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">访问全平台所有课程</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">定制化的AI学习路径规划</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">每周1次导师在线答疑</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">优先参与线上研讨会</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">实战项目指导</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white border-0">
                    立即加入
                  </Button>
                </CardFooter>
              </Card>

              {/* 专业会员 */}
              <Card className="relative overflow-hidden border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-gradient-to-br from-primary-100 to-amber-50 dark:from-primary-900/20 dark:to-amber-900/10 rounded-full blur-xl"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-500" />
                      <CardTitle className="text-xl">专业会员</CardTitle>
                    </div>
                    <Badge variant="outline" className="border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400">
                      高级认证
                    </Badge>
                  </div>
                  <CardDescription className="pt-2">为追求卓越的专业学习者打造</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">¥399</span>
                    <span className="text-muted-foreground ml-1">/月</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">高级会员所有权益</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">专属1对1导师指导(月4次)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">行业专家直播课程</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">职业发展规划与推荐</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">专业技能认证</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full bg-amber-600 hover:bg-amber-700 text-white">
                    升级专业版
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* 会员特权 */}
        <section className="py-16 md:py-24 relative">
          <div className="container max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-3">
                <Star className="mr-2 h-3.5 w-3.5" />
                专属权益
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">会员特权与服务</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                作为认证会员，你将获得独特的学习资源与服务支持，加速你的学习与成长
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <GraduationCap className="h-5 w-5" />,
                  title: "专属学习路径",
                  description: "根据个人能力和目标，由AI智能生成最优学习路径"
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: "导师1对1指导",
                  description: "行业专家定期辅导，解答疑问，指导学习方向"
                },
                {
                  icon: <Sparkles className="h-5 w-5" />,
                  title: "高级课程资源",
                  description: "访问平台独家高级课程，掌握前沿技术与知识"
                },
                {
                  icon: <Zap className="h-5 w-5" />,
                  title: "学习进度加速",
                  description: "个性化学习计划，优化学习时间，提高学习效率"
                },
                {
                  icon: <Star className="h-5 w-5" />,
                  title: "职业发展支持",
                  description: "获取行业趋势分析和职业发展建议，规划职业道路"
                },
                {
                  icon: <Trophy className="h-5 w-5" />,
                  title: "专业技能认证",
                  description: "完成相应课程后获得平台颁发的专业技能认证证书"
                }
              ].map((feature, i) => (
                <Card key={i} className="relative border-gray-200 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 会员统计 */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-6xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10,000+", label: "认证会员", icon: <Users className="h-5 w-5" /> },
                { value: "92%", label: "满意度", icon: <Star className="h-5 w-5" /> },
                { value: "3倍", label: "学习效率提升", icon: <Zap className="h-5 w-5" /> },
                { value: "85%", label: "职业晋升率", icon: <Trophy className="h-5 w-5" /> }
              ].map((stat, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20"></div>
          <div className="container max-w-4xl relative">
            <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white mx-auto mb-6">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">加入认证学习会员，加速你的学习之旅</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                不再迷茫，不再孤独。与志同道合的伙伴和专业导师一起，实现你的学习目标
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8 py-6 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white">
                  立即开始 7 天免费试用
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6">
                  了解更多详情
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 EduFusion。保留所有权利。</p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">
                隐私政策
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">
                服务条款
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary-600 dark:hover:text-primary-400">
                帮助中心
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 