import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[2.25rem] font-bold tracking-tight text-blue-800 dark:text-blue-600">分析</h2>
        </div>
        <Tabs defaultValue="adherence" className="space-y-4">
          <TabsList>
            <TabsTrigger value="adherence" className="transition-all duration-200 hover:bg-primary/20">
              遵循度分析
            </TabsTrigger>
            <TabsTrigger value="agent" className="transition-all duration-200 hover:bg-primary/20">
              客服绩效
            </TabsTrigger>
            <TabsTrigger value="customer" className="transition-all duration-200 hover:bg-primary/20">
              客户分析
            </TabsTrigger>
            <TabsTrigger value="trends" className="transition-all duration-200 hover:bg-primary/20">
              趋势
            </TabsTrigger>
          </TabsList>
          <TabsContent value="adherence" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">
                    平均遵循度
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.5%</div>
                  <p className="text-xs text-muted-foreground">较上月增长5.2%</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">
                    主要遵循问题
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">脚本偏离</div>
                  <p className="text-xs text-muted-foreground">占所有问题的35%</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">改进率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12.3%</div>
                  <p className="text-xs text-muted-foreground">季度环比</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">脚本部分遵循度</CardTitle>
                  <CardDescription>按脚本部分的遵循度分析</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart />
                </CardContent>
              </Card>
              <Card className="col-span-1 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">不遵循原因</CardTitle>
                  <CardDescription>不遵循脚本的常见原因</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="agent" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">
                    最佳表现
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">赵六</div>
                  <p className="text-xs text-muted-foreground">94%遵循率</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">
                    需要改进
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">王五</div>
                  <p className="text-xs text-muted-foreground">68%遵循率</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">
                    进步最大
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">李四</div>
                  <p className="text-xs text-muted-foreground">提升15%</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">客服绩效对比</CardTitle>
                  <CardDescription>按客服人员的绩效指标</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart />
                </CardContent>
              </Card>
              <Card className="col-span-1 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">客服改进趋势</CardTitle>
                  <CardDescription>绩效随时间的改进</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="customer" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">
                    平均情绪
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">积极</div>
                  <p className="text-xs text-muted-foreground">占所有通话的65%</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">
                    主要客户问题
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">账单问题</div>
                  <p className="text-xs text-muted-foreground">占所有通话的28%</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">解决率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">较上月增长3%</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">客户情绪趋势</CardTitle>
                  <CardDescription>情绪分析随时间变化</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LineChart />
                </CardContent>
              </Card>
              <Card className="col-span-1 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">客户问题</CardTitle>
                  <CardDescription>客户问题分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="trends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">通话量趋势</CardTitle>
                  <CardDescription>通话量随时间变化</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LineChart />
                </CardContent>
              </Card>
              <Card className="col-span-1 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">
                    绩效指标随时间变化
                  </CardTitle>
                  <CardDescription>关键指标趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
            </div>
            <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">季度对比</CardTitle>
                <CardDescription>按季度的绩效对比</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
