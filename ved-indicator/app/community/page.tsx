"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Users, Settings, Moon, Sun, Search, 
  Filter, Sparkles, MessageSquare, Clock, 
  TrendingUp, Zap, UserPlus, GitBranch,
  PlusCircle, Compass, Award, FileText,
  BrainCircuit, Trophy, BookOpen, Rocket
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isLoading, setIsLoading] = useState(true)
  const [zoomLevel, setZoomLevel] = useState<"macro" | "meso" | "micro">("meso")
  const [activeNetwork, setActiveNetwork] = useState<"academic" | "professional" | "social">("academic")
  const [activeTab, setActiveTab] = useState("teams")
  
  // 模拟加载效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] text-white">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-800 bg-[#030712]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#030712]/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/5.png" alt="EduFusion" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EduFusion
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium flex-1 justify-center">
            <Link href={process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL || 'http://localhost:3001'} className="transition-colors hover:text-primary-400 py-1 border-b-2 border-transparent hover:border-primary-400">
              AI课程推荐
            </Link>
            <Link href="/courses" className="transition-colors hover:text-primary-400 py-1 border-b-2 border-transparent hover:border-primary-400">
              在线课程
            </Link>
            <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL || 'http://localhost:3004'} className="transition-colors hover:text-primary-400 py-1 border-b-2 border-transparent hover:border-primary-400">
              个人学习路线
            </Link>
            <Link href="/profile" className="transition-colors hover:text-primary-400 py-1 border-b-2 border-transparent hover:border-primary-400">
              个人信息
            </Link>
            <Link href="/community" className="transition-colors text-blue-400 py-1 border-b-2 border-blue-400">
              用户社区
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white">
              <Search className="h-5 w-5" />
              <span className="sr-only">搜索</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">切换主题</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
              <span className="sr-only">设置</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* 主要内容区域 */}
      <main className="flex-1 pt-16">
        <div className="container py-8">
          {/* 社区页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              知识宇宙 · 社区共创
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              连接全球学习者，探索知识星图，共建学习生态系统
            </p>
          </div>
          
          {/* 三层分区布局 */}
          <div className="grid grid-cols-12 gap-6 mt-8">
            {/* 左侧面板 (30%) - 协作学习舱 */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              {/* 协作学习舱标题 */}
              <div className="bg-[#0A0D28] rounded-lg border border-[#1E2448] p-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-400" />
                  协作学习舱
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  找到你的学习伙伴，共同突破知识边界
                </p>
              </div>
              
              {/* 左侧选项卡控制 */}
              <Tabs defaultValue="teams" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full bg-[#0A0D28] border border-[#1E2448]">
                  <TabsTrigger value="teams" className="w-1/2 data-[state=active]:bg-blue-900/30">
                    学习小组
                  </TabsTrigger>
                  <TabsTrigger value="workshop" className="w-1/2 data-[state=active]:bg-blue-900/30">
                    项目工坊
                  </TabsTrigger>
                </TabsList>
                
                {/* 学习小组内容 */}
                <TabsContent value="teams" className="mt-2 space-y-4">
                  {/* 小组匹配功能 */}
                  <Card className="bg-[#0A0D28] border border-[#1E2448] overflow-hidden">
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-200">智能小组匹配</h4>
                        <Badge variant="secondary" className="bg-blue-900/50 text-blue-400 hover:bg-blue-900/80">
                          Beta
                        </Badge>
                      </div>
                      
                      {/* 匹配条件表单 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-20">学习目标:</span>
                          <select className="flex-1 bg-[#171C3A] border border-[#1E2448] rounded-md text-sm px-2 py-1 text-gray-200 focus:ring-blue-500 focus:border-blue-500">
                            <option>Web全栈开发</option>
                            <option>AI应用开发</option>
                            <option>数据分析与可视化</option>
                            <option>云原生架构</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-20">小组规模:</span>
                          <select className="flex-1 bg-[#171C3A] border border-[#1E2448] rounded-md text-sm px-2 py-1 text-gray-200 focus:ring-blue-500 focus:border-blue-500">
                            <option>2-3人 (紧密型)</option>
                            <option>4-6人 (平衡型)</option>
                            <option>7-10人 (多元型)</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-20">活跃时段:</span>
                          <select className="flex-1 bg-[#171C3A] border border-[#1E2448] rounded-md text-sm px-2 py-1 text-gray-200 focus:ring-blue-500 focus:border-blue-500">
                            <option>工作日晚间</option>
                            <option>周末全天</option>
                            <option>每日碎片时间</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* 匹配按钮 */}
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0">
                        <Sparkles className="mr-2 h-4 w-4" />
                        开始智能匹配
                      </Button>
                    </div>
                  </Card>
                  
                  {/* 已加入的学习小组 */}
                  <Card className="bg-[#0A0D28] border border-[#1E2448]">
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-200">我的学习小组</h4>
                        <Badge className="bg-green-900/50 text-green-400">3个小组</Badge>
                      </div>
                      
                      {/* 小组列表 */}
                      <div className="space-y-3">
                        {/* 小组1 */}
                        <div className="p-3 bg-[#121B44] rounded-lg border border-[#1E2448] hover:border-blue-500/50 cursor-pointer transition-colors group">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                                <BrainCircuit className="h-4 w-4 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-200">AI研习社</p>
                                <p className="text-xs text-gray-400">6个成员 · 活跃中</p>
                              </div>
                            </div>
                            <div className="invisible group-hover:visible">
                              <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {/* 进度指示器 */}
                          <div className="mt-2 w-full h-1 bg-[#1E2448] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{width: "75%"}}></div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">当前项目: 大语言模型微调 (75%)</p>
                        </div>
                        
                        {/* 小组2 */}
                        <div className="p-3 bg-[#121B44] rounded-lg border border-[#1E2448] hover:border-blue-500/50 cursor-pointer transition-colors group">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500/30 to-teal-500/30 flex items-center justify-center">
                                <Rocket className="h-4 w-4 text-green-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-200">全栈突击队</p>
                                <p className="text-xs text-gray-400">4个成员 · 活跃中</p>
                              </div>
                            </div>
                            <div className="invisible group-hover:visible">
                              <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {/* 进度指示器 */}
                          <div className="mt-2 w-full h-1 bg-[#1E2448] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-teal-500" style={{width: "40%"}}></div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">当前项目: 云原生应用部署 (40%)</p>
                        </div>
                        
                        {/* 创建或加入按钮 */}
                        <Button variant="outline" className="w-full border-dashed border-gray-700 hover:border-blue-500 bg-[#0A0D28]/50 hover:bg-[#0A0D28] space-x-2">
                          <PlusCircle className="h-4 w-4" />
                          <span>创建或加入更多小组</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                {/* 项目工坊内容 */}
                <TabsContent value="workshop" className="mt-2 space-y-4">
                  {/* 跨平台协作沙盘 */}
                  <Card className="bg-[#0A0D28] border border-[#1E2448] overflow-hidden">
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-200">协作沙盘</h4>
                        <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                          实时同步
                        </Badge>
                      </div>
                      
                      {/* 协作工具集 */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start p-3 h-auto border-[#1E2448] hover:border-blue-500/50 bg-[#121B44]/50">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 flex items-center justify-center mr-2">
                            <FileText className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-medium text-gray-200">论文批注</p>
                            <p className="text-[10px] text-gray-400">多人标注</p>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="justify-start p-3 h-auto border-[#1E2448] hover:border-blue-500/50 bg-[#121B44]/50">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center mr-2">
                            <GitBranch className="h-4 w-4 text-purple-400" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-medium text-gray-200">思维导图</p>
                            <p className="text-[10px] text-gray-400">实时共创</p>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="justify-start p-3 h-auto border-[#1E2448] hover:border-blue-500/50 bg-[#121B44]/50">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500/30 to-orange-500/30 flex items-center justify-center mr-2">
                            <BookOpen className="h-4 w-4 text-amber-400" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-medium text-gray-200">学习资源</p>
                            <p className="text-[10px] text-gray-400">共享文库</p>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="justify-start p-3 h-auto border-[#1E2448] hover:border-blue-500/50 bg-[#121B44]/50">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center mr-2">
                            <Trophy className="h-4 w-4 text-green-400" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-medium text-gray-200">成就系统</p>
                            <p className="text-[10px] text-gray-400">贡献记录</p>
                          </div>
                        </Button>
                      </div>
                      
                      {/* 启动协作空间 */}
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0">
                        启动协作空间
                      </Button>
                    </div>
                  </Card>
                  
                  {/* 成就铸造工坊 */}
                  <Card className="bg-[#0A0D28] border border-[#1E2448]">
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-200">成就铸造工坊</h4>
                        <Badge className="bg-purple-900/50 text-purple-400">实验性</Badge>
                      </div>
                      
                      {/* 我的成就 */}
                      <div className="p-3 rounded-lg border border-[#1E2448] bg-gradient-to-br from-[#121B44] to-[#1A1244]">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                            <Award className="h-6 w-6 text-purple-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-medium text-gray-200">知识贡献者</h5>
                              <Badge className="bg-blue-500/20 text-blue-400 text-[10px] px-1">链上记录</Badge>
                            </div>
                            <p className="text-xs text-gray-400">贡献值: 1,248 点</p>
                            <div className="mt-1 flex items-center gap-2">
                              <div className="flex -space-x-1">
                                {[...Array(3)].map((_, i) => (
                                  <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 flex items-center justify-center text-[8px] text-pink-300">
                                    N
                                  </div>
                                ))}
                              </div>
                              <span className="text-[10px] text-gray-400">已铸造3个NFT成就</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 成就进度 */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-medium text-gray-300">进行中的成就</h5>
                        <div className="space-y-3">
                          <div className="p-2 rounded-lg border border-[#1E2448] bg-[#121B44] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-amber-400" />
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-200">开源贡献者</p>
                                <div className="w-24 h-1 bg-[#1E2448] rounded-full mt-1">
                                  <div className="h-full bg-amber-500" style={{width: "35%"}}></div>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-amber-400">35%</span>
                          </div>
                          
                          <div className="p-2 rounded-lg border border-[#1E2448] bg-[#121B44] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                                <Compass className="h-4 w-4 text-green-400" />
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-200">知识探索者</p>
                                <div className="w-24 h-1 bg-[#1E2448] rounded-full mt-1">
                                  <div className="h-full bg-green-500" style={{width: "65%"}}></div>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-green-400">65%</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 成就市场按钮 */}
                      <Button variant="outline" className="w-full border-[#1E2448] hover:border-purple-500/50 space-x-2">
                        <span>探索成就市场</span>
                        <Zap className="h-4 w-4 text-purple-400" />
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* 中央全息展示区 (40%) */}
            <div className="col-span-12 lg:col-span-6">
              {/* 全息投影风格动态社区地图 */}
              <div className="relative bg-[#05071A] rounded-2xl border border-[#1E2448] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                {/* 宇宙背景 */}
                <div className="absolute inset-0">
                  {/* 星点背景 */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
                  
                  {/* 渐变光晕 */}
                  <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-900/10 rounded-full mix-blend-screen filter blur-3xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full mix-blend-screen filter blur-3xl"></div>
                  <div className="absolute top-1/2 right-1/3 w-[250px] h-[250px] bg-pink-900/10 rounded-full mix-blend-screen filter blur-3xl"></div>
                </div>
                
                {/* 图谱可视化区域 */}
                <div className="relative min-h-[600px]">
                  {/* 缩放控制条 */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-[#0A0D28]/70 backdrop-blur-md rounded-full px-1 py-1 border border-[#1E2448] flex items-center">
                    <Button 
                      variant={zoomLevel === "macro" ? "default" : "ghost"} 
                      size="sm" 
                      className={`rounded-full text-xs ${zoomLevel === "macro" ? "bg-blue-600" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setZoomLevel("macro")}
                    >
                      学科领域
                    </Button>
                    <Button 
                      variant={zoomLevel === "meso" ? "default" : "ghost"} 
                      size="sm" 
                      className={`rounded-full text-xs ${zoomLevel === "meso" ? "bg-blue-600" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setZoomLevel("meso")}
                    >
                      学习部落
                    </Button>
                    <Button 
                      variant={zoomLevel === "micro" ? "default" : "ghost"} 
                      size="sm" 
                      className={`rounded-full text-xs ${zoomLevel === "micro" ? "bg-blue-600" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setZoomLevel("micro")}
                    >
                      用户互动
                    </Button>
                  </div>
                  
                  {/* 视图类型选择器 - 环形菜单 */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-[#0A0D28]/70 backdrop-blur-md rounded-full px-1 py-1 border border-[#1E2448] flex items-center">
                    <Button 
                      variant={activeNetwork === "academic" ? "default" : "ghost"} 
                      size="sm" 
                      className={`rounded-full text-xs ${activeNetwork === "academic" ? "bg-blue-600" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setActiveNetwork("academic")}
                    >
                      学术关系网
                    </Button>
                    <Button 
                      variant={activeNetwork === "professional" ? "default" : "ghost"} 
                      size="sm" 
                      className={`rounded-full text-xs ${activeNetwork === "professional" ? "bg-blue-600" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setActiveNetwork("professional")}
                    >
                      职业协作网
                    </Button>
                    <Button 
                      variant={activeNetwork === "social" ? "default" : "ghost"} 
                      size="sm" 
                      className={`rounded-full text-xs ${activeNetwork === "social" ? "bg-blue-600" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setActiveNetwork("social")}
                    >
                      兴趣社交网
                    </Button>
                  </div>
                  
                  {/* 全息图谱内容 - 会根据zoomLevel和activeNetwork变化 */}
                  <div className="w-full h-full absolute inset-0 p-10 flex items-center justify-center">
                    {zoomLevel === "macro" && (
                      <div className="w-full h-full relative animate-float">
                        {/* 模拟学科领域星系图 */}
                        <div className="absolute top-1/4 left-1/4 w-28 h-28 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform">
                          <div className="text-center">
                            <p className="text-blue-400 font-semibold">计算机科学</p>
                            <p className="text-xs text-blue-300/70">4,281 用户</p>
                          </div>
                          {/* 发光轨道 */}
                          <div className="absolute inset-0 rounded-full border border-blue-400/20 scale-[1.2] animate-[spin_20s_linear_infinite]"></div>
                        </div>
                        
                        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform">
                          <div className="text-center">
                            <p className="text-purple-400 font-semibold">数据科学</p>
                            <p className="text-xs text-purple-300/70">3,192 用户</p>
                          </div>
                          <div className="absolute inset-0 rounded-full border border-purple-400/20 scale-[1.2] animate-[spin_25s_linear_infinite]"></div>
                        </div>
                        
                        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform">
                          <div className="text-center">
                            <p className="text-green-400 font-semibold">AI</p>
                            <p className="text-xs text-green-300/70">2,847 用户</p>
                          </div>
                          <div className="absolute inset-0 rounded-full border border-green-400/20 scale-[1.2] animate-[spin_30s_linear_infinite]"></div>
                        </div>
                        
                        {/* 模拟连线 */}
                        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                          {/* 金色线条（知识互补关系） */}
                          <path d="M 200,150 C 250,180 300,200 350,180" stroke="url(#goldGradient)" strokeWidth="1" fill="none" strokeDasharray="4,4" />
                          {/* 蓝色线条（学习轨迹相似度） */}
                          <path d="M 350,180 C 320,220 280,240 230,280" stroke="url(#blueGradient)" strokeWidth="1" fill="none" />
                          {/* 红色线条（竞争激励关系） */}
                          <path d="M 230,280 C 180,240 170,200 200,150" stroke="url(#redGradient)" strokeWidth="1" fill="none" strokeDasharray="2,2" />
                          
                          {/* 定义渐变 */}
                          <defs>
                            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#FFC53D20" />
                              <stop offset="50%" stopColor="#FFD70080" />
                              <stop offset="100%" stopColor="#FFC53D20" />
                            </linearGradient>
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3B82F620" />
                              <stop offset="50%" stopColor="#60A5FA80" />
                              <stop offset="100%" stopColor="#3B82F620" />
                            </linearGradient>
                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#EF444420" />
                              <stop offset="50%" stopColor="#F8717180" />
                              <stop offset="100%" stopColor="#EF444420" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        {/* 粒子效果（会在实际实现中用Canvas或WebGL绘制） */}
                        {[...Array(20)].map((_, i) => (
                          <div 
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-blue-400 opacity-70 animate-pulse"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                              animationDelay: `${Math.random() * 2}s`,
                              filter: "blur(1px)"
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {zoomLevel === "meso" && (
                      <div className="w-full h-full relative">
                        {/* 模拟学习部落能量圈 - 这里只做静态展示，实际应该是动态的 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* 中心用户组 */}
                          <div className="relative w-36 h-36 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                            <p className="text-center text-white font-medium">Web开发学习部落</p>
                            <div className="absolute -inset-4 rounded-full border border-blue-400/20 animate-[spin_30s_linear_infinite]"></div>
                            <div className="absolute -inset-8 rounded-full border border-purple-400/10 animate-[spin_40s_linear_infinite_reverse]"></div>
                            <div className="absolute -inset-12 rounded-full border border-pink-400/5 animate-[spin_60s_linear_infinite]"></div>
                            
                            {/* 围绕主题的用户节点 */}
                            {[...Array(8)].map((_, i) => {
                              const angle = (Math.PI * 2 / 8) * i
                              const radius = 120
                              const x = Math.cos(angle) * radius
                              const y = Math.sin(angle) * radius
                              // 随机中文用户名数组
                              const userNames = ["小李", "张明", "王芳", "陈杰", "林雨", "刘星", "黄天", "吴越", "赵云", "郑华", "孙亮", "钱思", "周涛", "徐骏", "叶枫", "朱晨"]
                              // 根据索引选择用户名，避免重复
                              const userName = userNames[i]
                              return (
                                <motion.div
                                  key={i}
                                  className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/40 to-purple-500/40 border border-blue-400/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform hover:border-blue-400"
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                                    zIndex: 10
                                  }}
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center text-xs text-white font-medium">
                                    {userName}
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                        
                        {/* 外围次要部落 */}
                        <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                          <p className="text-center text-green-400 text-sm">前端框架<br/>学习小组</p>
                        </div>
                        
                        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                          <p className="text-center text-amber-400 text-sm">后端开发<br/>学习小组</p>
                        </div>
                        
                        {/* 能量连接线 */}
                        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                          <path d="M 400,240 C 350,200 300,180 240,240" stroke="url(#greenGradient)" strokeWidth="2" fill="none" className="animate-dash" />
                          <path d="M 240,360 C 200,320 180,280 240,240" stroke="url(#amberGradient)" strokeWidth="2" fill="none" className="animate-dash-reverse" />
                          
                          <defs>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#10B98120" />
                              <stop offset="50%" stopColor="#34D39960" />
                              <stop offset="100%" stopColor="#10B98120" />
                            </linearGradient>
                            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#F59E0B20" />
                              <stop offset="50%" stopColor="#FBBF2460" />
                              <stop offset="100%" stopColor="#F59E0B20" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        {/* 热力区域效果 */}
                        <div className="absolute inset-0">
                          <div className="absolute top-1/3 left-1/2 w-48 h-48 rounded-full bg-blue-500/5 filter blur-3xl"></div>
                          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-purple-500/5 filter blur-3xl"></div>
                        </div>
                        
                        {/* 动态脉冲效果 */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-blue-400/20 animate-ping-slow"></div>
                      </div>
                    )}
                    
                    {zoomLevel === "micro" && (
                      <div className="w-full h-full relative">
                        {/* 用户互动光点层 - 模拟实时用户互动 */}
                        <div className="absolute inset-0">
                          {/* 中心用户 */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/40 to-purple-500/40 border-2 border-blue-400/60 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                            <p className="text-white font-medium">我</p>
                          </div>
                          
                          {/* 互动光点 */}
                          {[...Array(15)].map((_, i) => {
                            const angle = (Math.PI * 2 / 15) * i
                            const radius = 120 + Math.random() * 80
                            const x = Math.cos(angle) * radius
                            const y = Math.sin(angle) * radius
                            const colors = [
                              "bg-blue-400", "bg-purple-400", "bg-green-400", 
                              "bg-amber-400", "bg-pink-400", "bg-sky-400"
                            ]
                            const color = colors[Math.floor(Math.random() * colors.length)]
                            const size = 4 + Math.floor(Math.random() * 4)
                            
                            return (
                              <motion.div
                                key={i}
                                className={`absolute w-${size} h-${size} rounded-full ${color} shadow-[0_0_10px_currentColor] cursor-pointer hover:scale-150 transition-transform`}
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                                  opacity: 0.7 + Math.random() * 0.3
                                }}
                                whileHover={{ scale: 1.5, opacity: 1 }}
                              />
                            )
                          })}
                          
                          {/* 连接线 */}
                          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                            {[...Array(10)].map((_, i) => {
                              const startAngle = (Math.PI * 2 / 10) * i
                              const endAngle = (Math.PI * 2 / 10) * ((i + 3) % 10)
                              const startRadius = 8
                              const endRadius = 120 + Math.random() * 80
                              const startX = Math.cos(startAngle) * startRadius + 300
                              const startY = Math.sin(startAngle) * startRadius + 300
                              const endX = Math.cos(endAngle) * endRadius + 300
                              const endY = Math.sin(endAngle) * endRadius + 300
                              
                              // 随机选择连线类型
                              const lineTypes = [
                                "stroke-blue-400/30 stroke-dasharray-2", 
                                "stroke-gold-400/30", 
                                "stroke-red-400/30 stroke-dasharray-4"
                              ]
                              const lineType = lineTypes[Math.floor(Math.random() * lineTypes.length)]
                              
                              return (
                                <path 
                                  key={i}
                                  d={`M ${startX},${startY} C ${startX + 50},${startY + 50} ${endX - 50},${endY - 50} ${endX},${endY}`}
                                  className={`${lineType} fill-none stroke-1`}
                                />
                              )
                            })}
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 图例说明 */}
                <div className="bg-[#0A0D28]/80 border-t border-[#1E2448] p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                      <p className="text-xs text-gray-400">学习轨迹相似</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                      <p className="text-xs text-gray-400">知识互补关系</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]"></div>
                      <p className="text-xs text-gray-400">竞争激励关系</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 右侧面板 (30%) - 知识进化墙 */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              {/* 知识进化墙标题 */}
              <div className="bg-[#0A0D28] rounded-lg border border-[#1E2448] p-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-violet-400" />
                  知识进化墙
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  汇聚思想火花，追踪知识前沿
                </p>
              </div>
              
              {/* 热门话题追踪器 */}
              <Card className="bg-[#0A0D28] border border-[#1E2448] overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-200">热门话题追踪器</h4>
                    <Badge variant="outline" className="border-violet-500/50 text-violet-400">实时</Badge>
                  </div>
                  
                  {/* 热门话题列表 */}
                  <div className="space-y-3">
                    {/* 话题1 */}
                    <div className="p-3 bg-[#121B44] rounded-lg border border-[#1E2448] hover:border-violet-500/50 cursor-pointer transition-colors">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-violet-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">大型语言模型应用创新</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className="bg-violet-500/20 text-violet-400 text-[10px]">热度 98.6°</Badge>
                              <span className="text-[10px] text-gray-400">128人参与</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 话题生命力指标 */}
                      <div className="mt-3 flex items-center gap-4">
                        {/* 新鲜度 */}
                        <div className="flex flex-col items-center">
                          <div className="w-full h-20 bg-[#0A0D28] rounded-md overflow-hidden relative">
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400/20 h-[85%]"></div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center pb-1">
                              <span className="text-[10px] font-medium text-white">85%</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1">新鲜度</span>
                        </div>
                        
                        {/* 多样性 */}
                        <div className="flex flex-col items-center">
                          <div className="w-full h-20 bg-[#0A0D28] rounded-md overflow-hidden relative">
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400/20 h-[70%]"></div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center pb-1">
                              <span className="text-[10px] font-medium text-white">70%</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1">多样性</span>
                        </div>
                        
                        {/* 争议性 */}
                        <div className="flex flex-col items-center">
                          <div className="w-full h-20 bg-[#0A0D28] rounded-md overflow-hidden relative">
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-amber-500 to-amber-400/20 h-[45%]"></div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center pb-1">
                              <span className="text-[10px] font-medium text-white">45%</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1">争议性</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 话题2 */}
                    <div className="p-3 bg-[#121B44] rounded-lg border border-[#1E2448] hover:border-violet-500/50 cursor-pointer transition-colors">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                            <GitBranch className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">Web3教育生态构建</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className="bg-blue-500/20 text-blue-400 text-[10px]">热度 82.3°</Badge>
                              <span className="text-[10px] text-gray-400">97人参与</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 查看更多按钮 */}
                    <Button variant="outline" className="w-full border-[#1E2448] hover:border-violet-500/50">
                      查看更多话题
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* 智能内容孵化器 */}
              <Card className="bg-[#0A0D28] border border-[#1E2448]">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-200">内容孵化器</h4>
                    <Badge className="bg-pink-900/50 text-pink-400">AI驱动</Badge>
                  </div>
                  
                  {/* AI内容重组区 */}
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#121B44] to-[#1A1244] border border-[#1E2448]">
                    <div className="text-center space-y-2 py-2">
                      <p className="text-sm text-gray-200">拖拽两个优质帖子，生成AI优化版</p>
                      
                      {/* 拖拽区域可视化 */}
                      <div className="flex items-center justify-center gap-4 mt-3">
                        <div className="w-20 h-20 rounded-lg border-2 border-dashed border-blue-500/30 flex items-center justify-center bg-blue-500/5">
                          <p className="text-xs text-blue-400">帖子 1</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500/30 to-pink-500/30 flex items-center justify-center">
                            <span className="text-lg text-violet-400">+</span>
                          </div>
                        </div>
                        
                        <div className="w-20 h-20 rounded-lg border-2 border-dashed border-violet-500/30 flex items-center justify-center bg-violet-500/5">
                          <p className="text-xs text-violet-400">帖子 2</p>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 border-0">
                        <Sparkles className="mr-2 h-4 w-4" />
                        生成融合内容
                      </Button>
                    </div>
                  </div>
                  
                  {/* 历史精华帖 */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-gray-300">历史精华再探</h5>
                    <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#1E2448] scrollbar-track-transparent">
                      {/* 精华帖1 */}
                      <div className="p-2 rounded-lg border border-[#1E2448] bg-[#121B44] hover:border-pink-500/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-pink-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-200">计算机视觉的未来发展</p>
                            <p className="text-[10px] text-gray-400">2023-08-15 · 1,247次阅读</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 精华帖2 */}
                      <div className="p-2 rounded-lg border border-[#1E2448] bg-[#121B44] hover:border-pink-500/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-200">低代码开发的革命与挑战</p>
                            <p className="text-[10px] text-gray-400">2023-09-27 · 982次阅读</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 精华帖3 */}
                      <div className="p-2 rounded-lg border border-[#1E2448] bg-[#121B44] hover:border-pink-500/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-200">区块链教育生态建设方案</p>
                            <p className="text-[10px] text-gray-400">2023-11-03 · 876次阅读</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 未来预测按钮 */}
                  <Button variant="outline" className="w-full border-[#1E2448] hover:border-pink-500/50 space-x-2">
                    <span>探索未来知识预测</span>
                    <Compass className="h-4 w-4 text-pink-400" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 