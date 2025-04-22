import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { RecentCourses } from "@/components/recent-courses" 
import { PerformanceMetrics } from "@/components/performance-metrics"
import { DashboardHeader } from "@/components/dashboard-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Sparkle, AlertCircle } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* 系统状态提醒 */}
        <Alert className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-900/20 dark:to-yellow-900/20 dark:border-amber-800/30">
          <Sparkle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
          <AlertTitle className="text-amber-800 dark:text-amber-500">系统状态通知</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            AI模型更新完成：课程推荐精度提升12.5%，热门技能预测准确率达91.3%。市场数据同步成功，最新就业趋势已加载。
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">平台总用户数</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,314</div>
              <p className="text-xs text-muted-foreground">较上月增长12.8%</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">
                收录课程总数
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,847</div>
              <p className="text-xs text-muted-foreground">较上月增加187门</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">AI推荐准确率</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.3%</div>
              <p className="text-xs text-muted-foreground">较上月增长2.8%</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">课程完成率</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-muted-foreground">较上月增长5.2%</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="course-trends">课程趋势</TabsTrigger>
            <TabsTrigger value="market-analysis">市场分析</TabsTrigger>
            <TabsTrigger value="user-behavior">用户行为</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">用户活跃度</CardTitle>
                  <CardDescription>过去30天的每日活跃用户数</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LineChart />
                </CardContent>
              </Card>
              <Card className="col-span-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">学习方式分布</CardTitle>
                  <CardDescription>用户偏好的学习方式占比</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">热门新增课程</CardTitle>
                  <CardDescription>最近添加的高潜力课程</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentCourses />
                </CardContent>
              </Card>
              <Card className="col-span-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">AI模型性能指标</CardTitle>
                  <CardDescription>推荐算法关键指标</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceMetrics />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="course-trends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">课程热度趋势</CardTitle>
                  <CardDescription>热门课程随时间变化</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LineChart />
                </CardContent>
              </Card>
              <Card className="col-span-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">课程同质化分析</CardTitle>
                  <CardDescription>不同类别课程的同质化程度</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
            </div>
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-500" />
              <AlertTitle className="text-blue-800 dark:text-blue-500">课程趋势分析</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                AI模型预测未来3个月内"大模型应用开发"相关课程将增长53%，建议优先审核并推荐此类课程。
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="market-analysis" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">市场技能需求</CardTitle>
                  <CardDescription>招聘市场技能需求热度</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart />
                </CardContent>
              </Card>
              <Card className="col-span-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">课程市场缺口</CardTitle>
                  <CardDescription>技能需求与课程供给对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
            </div>
            <Alert className="border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500" />
              <AlertTitle className="text-red-800 dark:text-red-500">资源优化建议</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-400">
                系统检测到"区块链安全"领域存在显著课程缺口，建议联系相关高校或教育机构开发此类课程，预计需求增长率为127%。
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="user-behavior" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">学习路径偏好</CardTitle>
                  <CardDescription>用户学习路径选择分析</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LineChart />
                </CardContent>
              </Card>
              <Card className="col-span-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">用户关注点</CardTitle>
                  <CardDescription>用户最关注的课程特性</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
            </div>
            <Alert className="border-green-200 bg-green-50 dark:border-green-900/30 dark:bg-green-900/10">
              <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
              <AlertTitle className="text-green-800 dark:text-green-500">用户行为洞察</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                多模态分析显示，互动性强且有实践项目的课程完成率高出43%，建议向内容提供者推广增加实践环节和互动元素。
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
