"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  User,
  Users as UsersIcon,
  Settings,
  Moon,
  Sun,
  Edit2,
  Clock,
  BookOpen,
  Award,
  Briefcase,
  TrendingUp,
  Calendar,
  BarChart2,
  LineChart,
  AlertCircle,
  PieChart,
  Book
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProfileEditForm } from "@/components/ProfileEditForm"

export default function ProfilePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "赵力",
    title: "AI架构师 Lv5",
    bio: "「AI与机器学习爱好者，现就职于科技公司，专注于深度学习技术在商业领域的应用」",
    avatarUrl: "/placeholder-user.jpg",
  })
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const handleProfileUpdate = (values: {
    name: string;
    title: string;
    bio: string;
    avatarUrl?: string;
  }) => {
    setProfileData({
      ...profileData,
      name: values.name,
      title: `${values.title} Lv5`,
      bio: `「${values.bio}」`,
      avatarUrl: values.avatarUrl || profileData.avatarUrl,
    })
    
    // 显示更新成功提示
    toast.success("个人信息更新成功！", {
      description: "您的个人资料已经更新",
      duration: 3000,
    })
  }

  const handleEditProfile = () => {
    setIsEditProfileOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-gray-950">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md dark:bg-gray-950/95 dark:border-gray-800 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/5.png" alt="EduFusion" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
              EduFusion
            </span>
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
            <Link href="/profile" className="transition-colors text-primary-600 py-1 border-b-2 border-primary-500">
              个人信息
            </Link>
            <Link href="/community" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              用户社区
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
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
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">用户</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">切换主题</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">设置</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container pt-24 pb-16">
        {/* 顶部身份区 */}
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative md:w-[120px] flex-shrink-0">
              <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800 shadow-md">
                <AvatarImage src={profileData.avatarUrl} alt="用户头像" />
                <AvatarFallback>{profileData.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full shadow-sm">
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <div className="md:flex-1 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 className="text-xl font-bold">{profileData.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {profileData.title}
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    认证讲师
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{profileData.bio}</p>
              
              <div className="pt-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>经验值</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">4,250 / 5,000</span>
                </div>
                <Progress value={85} className="h-1.5 bg-blue-100 dark:bg-blue-950 [&>div]:bg-blue-600 dark:[&>div]:bg-blue-500" />
              </div>
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto md:flex-shrink-0 md:max-w-[400px] lg:max-w-[380px]">
              <div className="w-full sm:w-1/3 flex-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800/30 shadow-sm">
                <div className="text-center">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">1,246</div>
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    学习时长
                    <span className="text-xs ml-1 text-blue-600/80 dark:text-blue-400/80">(分钟)</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full sm:w-1/3 flex-1 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800/30 shadow-sm">
                <div className="text-center">
                  <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-1">18/24</div>
                  <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">完成/进行课程</div>
                </div>
              </div>
              
              <div className="w-full sm:w-1/3 flex-1 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800/30 shadow-sm">
                <div className="text-center">
                  <Award className="h-6 w-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-1">87%</div>
                  <div className="text-sm font-medium text-amber-700 dark:text-amber-300">技能匹配度</div>
                </div>
              </div>
            </div>

            {/* 编辑个人信息按钮 */}
            <Button 
              variant="outline" 
              size="sm" 
              className="md:self-start flex items-center gap-1.5"
              onClick={handleEditProfile}
            >
              <Edit2 className="h-3.5 w-3.5" />
              编辑信息
            </Button>
          </div>
        </div>
        
        {/* 编辑个人信息表单 */}
        <ProfileEditForm
          open={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
          defaultValues={{
            name: profileData.name,
            title: profileData.title.split(' ')[0], // 只取职位名称部分，不包括等级
            bio: profileData.bio.replace(/[「」]/g, ''), // 去掉引号
            avatarUrl: profileData.avatarUrl,
          }}
          onSubmit={handleProfileUpdate}
        />
        
        {/* 核心功能导航区 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">学习驾驶舱</h2>
          
          <Card className="shadow-sm border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-4">
              <Tabs defaultValue="job_match">
                <TabsList className="bg-gray-50 dark:bg-gray-800/50">
                  <TabsTrigger value="job_match" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Briefcase className="h-4 w-4 mr-2" />
                    岗位匹配
                  </TabsTrigger>
                  <TabsTrigger value="trend_prediction" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    热点预测
                  </TabsTrigger>
                  <TabsTrigger value="peer_learning" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    同城校友选课
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="job_match" className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: "大语言模型进阶：构建可扩展AI应用",
                        platform: "EduFusion原创",
                        trend: "+35%",
                        badge: "热门岗位匹配"
                      },
                      {
                        title: "分布式系统与云原生架构",
                        platform: "斯坦福大学",
                        trend: "+28%",
                        badge: "高薪技能"
                      },
                      {
                        title: "企业级AI解决方案设计与实现",
                        platform: "微软认证课程",
                        trend: "+42%",
                        badge: "稀缺技能"
                      }
                    ].map((course, i) => (
                      <Card key={i} className="border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mb-2">
                              {course.badge}
                            </Badge>
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                              薪资涨幅 {course.trend}
                            </Badge>
                          </div>
                          <h3 className="text-base font-medium mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{course.platform}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="trend_prediction" className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: "RAG应用开发与最佳实践",
                        platform: "EduFusion原创",
                        trend: "未来6个月需求+65%",
                        badge: "新兴领域"
                      },
                      {
                        title: "AI Agent开发与系统集成",
                        platform: "DeepLearning.AI",
                        trend: "预计薪资涨幅+45%",
                        badge: "前沿技术"
                      },
                      {
                        title: "多模态大模型应用实战",
                        platform: "OpenAI合作课程",
                        trend: "产业转型关键技能",
                        badge: "热门趋势"
                      }
                    ].map((course, i) => (
                      <Card key={i} className="border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 mb-2">
                              {course.badge}
                            </Badge>
                            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <h3 className="text-base font-medium mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{course.platform}</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-4">{course.trend}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="peer_learning" className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: "机器学习算法实战",
                        platform: "北京大学",
                        learners: "120名同城学员",
                        rating: 4.9
                      },
                      {
                        title: "深度学习与计算机视觉",
                        platform: "清华大学",
                        learners: "87名同校校友",
                        rating: 4.8
                      },
                      {
                        title: "量化交易与金融AI",
                        platform: "行业认证课程",
                        learners: "56名同行业学员",
                        rating: 4.7
                      }
                    ].map((course, i) => (
                      <Card key={i} className="border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 mb-2">
                              热门选择
                            </Badge>
                            <div className="flex items-center text-amber-500">
                              <span className="font-medium mr-1">{course.rating}</span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-base font-medium mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{course.platform}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-4">{course.learners}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>

        {/* 技能雷达图 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">技能全景</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2 shadow-sm border-gray-100 dark:border-gray-800">
              <CardHeader>
                <CardTitle>技能雷达</CardTitle>
                <CardDescription>
                  三层雷达对比: 已掌握技能 vs 岗位需求 vs AI预测趋势
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square max-h-[500px] w-full relative flex items-center justify-center p-4">
                  <div className="w-full h-full bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 rounded-full flex items-center justify-center opacity-20 absolute"></div>
                  <div className="w-[75%] h-[75%] bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-full flex items-center justify-center opacity-30 absolute"></div>
                  <div className="w-[50%] h-[50%] bg-gradient-to-r from-blue-200 to-green-200 dark:from-blue-900/40 dark:to-green-900/40 rounded-full flex items-center justify-center opacity-40 absolute"></div>
                  
                  {/* 样例雷达图 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px] max-h-[500px]">
                      {/* 网格线 */}
                      <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                      <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                      <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                      <circle cx="200" cy="200" r="40" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                      
                      {/* 轴线 */}
                      <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                      <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                      <line x1="80" y1="80" x2="320" y2="320" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                      <line x1="320" y1="80" x2="80" y2="320" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                      
                      {/* 已掌握技能多边形 - 内层 */}
                      <polygon 
                        points="200,90 290,130 310,220 250,300 140,300 90,220 110,130" 
                        fill="rgba(56, 189, 248, 0.2)" 
                        stroke="rgba(56, 189, 248, 0.8)" 
                        strokeWidth="2"
                      />
                      
                      {/* 岗位需求技能多边形 - 中层 */}
                      <polygon 
                        points="200,60 320,115 340,220 270,330 130,330 70,220 100,100" 
                        fill="none" 
                        stroke="rgba(234, 88, 12, 0.5)" 
                        strokeWidth="2" 
                        strokeDasharray="4"
                      />
                      
                      {/* 趋势预测技能多边形 - 外层 */}
                      <polygon 
                        points="200,40 330,100 370,220 290,350 110,350 50,220 80,80" 
                        fill="none" 
                        stroke="rgba(22, 163, 74, 0.5)" 
                        strokeWidth="2" 
                        strokeDasharray="2 4"
                      />
                      
                      {/* 技能点 */}
                      <circle cx="200" cy="90" r="4" fill="#38bdf8" />
                      <circle cx="290" cy="130" r="4" fill="#38bdf8" />
                      <circle cx="310" cy="220" r="4" fill="#38bdf8" />
                      <circle cx="250" cy="300" r="4" fill="#38bdf8" />
                      <circle cx="140" cy="300" r="4" fill="#38bdf8" />
                      <circle cx="90" cy="220" r="4" fill="#38bdf8" />
                      <circle cx="110" cy="130" r="4" fill="#38bdf8" />
                      
                      {/* 技能标签 */}
                      <text x="200" y="35" textAnchor="middle" fontSize="12" fill="currentColor">大语言模型应用</text>
                      <text x="355" y="100" textAnchor="start" fontSize="12" fill="currentColor">系统设计</text>
                      <text x="380" y="220" textAnchor="start" fontSize="12" fill="currentColor">云原生架构</text>
                      <text x="290" y="365" textAnchor="middle" fontSize="12" fill="currentColor">MLOps</text>
                      <text x="100" y="365" textAnchor="middle" fontSize="12" fill="currentColor">多模态模型</text>
                      <text x="35" y="220" textAnchor="end" fontSize="12" fill="currentColor">算法优化</text>
                      <text x="60" y="80" textAnchor="start" fontSize="12" fill="currentColor">数据工程</text>
                    </svg>
                    
                    {/* 图例 */}
                    <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 rounded p-2 text-xs shadow-sm">
                      <div className="flex items-center mb-1">
                        <div className="w-3 h-3 bg-blue-400/30 border border-blue-400 mr-2"></div>
                        <span>已掌握技能</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <div className="w-3 h-3 border border-orange-500/50 mr-2" style={{ borderStyle: 'dashed' }}></div>
                        <span>岗位需求技能</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 border border-green-500/50 mr-2" style={{ borderStyle: 'dotted' }}></div>
                        <span>AI预测趋势技能</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-gray-100 dark:border-gray-800">
              <CardHeader>
                <CardTitle>技能匹配分析</CardTitle>
                <CardDescription>
                  与目标岗位「AI架构师」的技能差距分析
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>大型语言模型应用开发</span>
                    <span className="text-emerald-600 dark:text-emerald-400">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>分布式系统设计</span>
                    <span className="text-emerald-600 dark:text-emerald-400">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>云原生架构</span>
                    <span className="text-amber-500">76%</span>
                  </div>
                  <Progress value={76} className="h-2 [&>div]:bg-amber-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>MLOps & 模型部署</span>
                    <span className="text-orange-500">68%</span>
                  </div>
                  <Progress value={68} className="h-2 [&>div]:bg-orange-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>多模态模型开发</span>
                    <span className="text-rose-500">45%</span>
                  </div>
                  <Progress value={45} className="h-2 [&>div]:bg-rose-500" />
                </div>
                
                <Button variant="outline" className="w-full mt-4">查看完整技能报告</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* 学习档案区 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">学习档案</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm border-gray-100 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-amber-500" />
                  里程碑与成就
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI应用开发专家认证</h3>
                      <p className="text-sm text-muted-foreground mb-1">完成「AI应用架构师」专业课程系列</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>获得于 2023年11月15日</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">完成10门AI核心课程</h3>
                      <p className="text-sm text-muted-foreground mb-1">成为平台前5%的学习者</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>获得于 2023年9月2日</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                      <UsersIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">社区贡献者</h3>
                      <p className="text-sm text-muted-foreground mb-1">解答100+学习者问题，平均满意度4.8/5</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>获得于 2023年8月18日</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full mt-6">
                  查看全部成就
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-gray-100 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                  能力进化图谱
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="aspect-[4/3] w-full bg-white dark:bg-gray-900 rounded-lg p-6">
                    {/* 能力进化图谱示例 */}
                    <div className="flex flex-col h-full">
                      {/* 图表标签 */}
                      <div className="flex justify-between mb-2 text-xs text-muted-foreground">
                        <div>1月</div>
                        <div>2月</div>
                        <div>3月</div>
                        <div>4月</div>
                        <div>5月</div>
                        <div>6月</div>
                      </div>
                      
                      {/* 图表主体 */}
                      <div className="flex-1 relative">
                        {/* 网格线 */}
                        <div className="absolute inset-0 border-b border-gray-200 dark:border-gray-800"></div>
                        <div className="absolute inset-0 border-b border-gray-200 dark:border-gray-800 top-1/4"></div>
                        <div className="absolute inset-0 border-b border-gray-200 dark:border-gray-800 top-2/4"></div>
                        <div className="absolute inset-0 border-b border-gray-200 dark:border-gray-800 top-3/4"></div>
                        
                        {/* 技能曲线 - 大语言模型应用 */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                          {/* 深蓝色：大语言模型应用 */}
                          <path 
                            d="M0,90 C30,85 60,75 100,65 C140,55 180,50 220,35 C260,20 300,10 340,5"
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="2.5"
                          />
                          <circle cx="0" cy="90" r="3" fill="#3b82f6" />
                          <circle cx="100" cy="65" r="3" fill="#3b82f6" />
                          <circle cx="220" cy="35" r="3" fill="#3b82f6" />
                          <circle cx="340" cy="5" r="3" fill="#3b82f6" />
                          
                          {/* 绿色：系统设计 */}
                          <path 
                            d="M0,130 C30,125 60,120 100,115 C140,110 180,90 220,70 C260,50 300,45 340,40"
                            fill="none" 
                            stroke="#10b981" 
                            strokeWidth="2.5"
                          />
                          <circle cx="0" cy="130" r="3" fill="#10b981" />
                          <circle cx="100" cy="115" r="3" fill="#10b981" />
                          <circle cx="220" cy="70" r="3" fill="#10b981" />
                          <circle cx="340" cy="40" r="3" fill="#10b981" />
                          
                          {/* 紫色：云原生架构 */}
                          <path 
                            d="M0,160 C30,155 60,150 100,140 C140,135 180,130 220,100 C260,85 300,75 340,60"
                            fill="none" 
                            stroke="#8b5cf6" 
                            strokeWidth="2.5"
                          />
                          <circle cx="0" cy="160" r="3" fill="#8b5cf6" />
                          <circle cx="100" cy="140" r="3" fill="#8b5cf6" />
                          <circle cx="220" cy="100" r="3" fill="#8b5cf6" />
                          <circle cx="340" cy="60" r="3" fill="#8b5cf6" />
                          
                          {/* 橙色：MLOps */}
                          <path 
                            d="M0,180 C30,175 60,170 100,165 C140,160 180,150 220,130 C260,110 300,100 340,80"
                            fill="none" 
                            stroke="#f59e0b" 
                            strokeWidth="2.5"
                          />
                          <circle cx="0" cy="180" r="3" fill="#f59e0b" />
                          <circle cx="100" cy="165" r="3" fill="#f59e0b" />
                          <circle cx="220" cy="130" r="3" fill="#f59e0b" />
                          <circle cx="340" cy="80" r="3" fill="#f59e0b" />
                        </svg>
                      </div>
                      
                      {/* Y轴标签 */}
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <div>入门</div>
                        <div className="flex-1"></div>
                        <div>熟练</div>
                        <div className="flex-1"></div>
                        <div>精通</div>
                      </div>
                      
                      {/* 图例 */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 justify-center text-xs">
                        <div className="flex items-center">
                          <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
                          <span>大语言模型应用</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                          <span>系统设计</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: '#8b5cf6' }}></div>
                          <span>云原生架构</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
                          <span>MLOps</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button variant="outline">按周查看</Button>
                  <Button variant="outline">按月查看</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// 因为TypeScript中没有Users组件，所以定义一个
function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
} 