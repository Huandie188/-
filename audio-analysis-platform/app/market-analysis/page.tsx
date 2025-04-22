import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { LineChart, BarChart, PieChart } from "@/components/charts"
import { AreaChart } from "@/components/area-chart"
import { HeatMap } from "@/components/heat-map"
import { Sparkline } from "@/components/sparkline"
import { 
  TrendingUp, 
  Download, 
  Filter, 
  Search, 
  RefreshCw,
  Calendar,
  Laptop,
  BrainCircuit,
  Database,
  Globe,
  Code,
  FileText,
  Share2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MarketAnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-blue-800 dark:text-blue-600">市场分析</h2>
            <p className="text-muted-foreground">分析招聘市场趋势与技能需求，优化课程内容与方向</p>
          </div>
          <div className="flex items-center gap-2">
            <DatePickerWithRange className="w-[300px]" />
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              筛选
            </Button>
            <Button className="gap-1">
              <Download className="h-4 w-4" />
              导出报告
            </Button>
          </div>
        </div>

        <div className="flex gap-2 w-full mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索技能、职位、行业..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            更新数据
          </Button>
        </div>

        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
          <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-500" />
          <AlertTitle className="text-blue-800 dark:text-blue-500">市场洞察</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400">
            AI模型检测到"AI应用开发"领域岗位需求增长93%，但相关课程增长仅为41%，存在显著缺口；"低代码开发"成为新兴热点技能，建议增加相关课程内容。
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">市场概览</TabsTrigger>
            <TabsTrigger value="skills">技能热度</TabsTrigger>
            <TabsTrigger value="jobs">职位分析</TabsTrigger>
            <TabsTrigger value="gaps">课程缺口</TabsTrigger>
            <TabsTrigger value="forecast">趋势预测</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">监控职位数</CardTitle>
                  <Laptop className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">158,742</div>
                  <p className="text-xs text-muted-foreground">过去30天新增23,451个</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">热门技能数</CardTitle>
                  <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">754</div>
                  <p className="text-xs text-muted-foreground">较上月增加48个</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">数据源数量</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">37</div>
                  <p className="text-xs text-muted-foreground">较上月增加3个</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">已发现缺口</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">较上月增加7个</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
              <Card className="md:col-span-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle>职位需求趋势</CardTitle>
                  <CardDescription>过去12个月职位需求变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
              <Card className="md:col-span-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle>技能类别分布</CardTitle>
                  <CardDescription>按类别统计的技能需求</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
              <Card className="md:col-span-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle>增长最快的技能</CardTitle>
                  <CardDescription>近3个月增速最快的技能</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <BrainCircuit className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">大模型Prompt工程</div>
                          <div className="text-xs text-muted-foreground">AI/机器学习</div>
                        </div>
                      </div>
                      <Badge className="bg-green-500">+183%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Code className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">低代码/无代码开发</div>
                          <div className="text-xs text-muted-foreground">软件开发</div>
                        </div>
                      </div>
                      <Badge className="bg-green-500">+147%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Web3/区块链安全</div>
                          <div className="text-xs text-muted-foreground">网络安全</div>
                        </div>
                      </div>
                      <Badge className="bg-green-500">+118%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Database className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">数据湖/数据网格</div>
                          <div className="text-xs text-muted-foreground">数据工程</div>
                        </div>
                      </div>
                      <Badge className="bg-green-500">+92%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">可观测性系统</div>
                          <div className="text-xs text-muted-foreground">DevOps/SRE</div>
                        </div>
                      </div>
                      <Badge className="bg-green-500">+86%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle>技能市场供需差距</CardTitle>
                  <CardDescription>技能需求与课程供给对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart />
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>* 供需差距值越大表示市场需求远高于现有课程供给</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            {/* 技能热度分析内容 */}
            <Card>
              <CardHeader>
                <CardTitle>技能热度分析</CardTitle>
                <CardDescription>各技能在招聘市场的热度与趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">热度地图展示了各技能的相对需求量</p>
                  {/* 这里应该渲染一个热力图组件 */}
                  <div className="h-96 w-full bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">技能热度地图 (占位图)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            {/* 职位分析内容 */}
            <Card>
              <CardHeader>
                <CardTitle>职位需求分析</CardTitle>
                <CardDescription>各职位的市场需求与薪资趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">按行业和地区展示的职位需求分布</p>
                  {/* 这里应该渲染职位分析图表 */}
                  <div className="h-96 w-full bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">职位需求分布图 (占位图)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gaps" className="space-y-4">
            {/* 课程缺口分析内容 */}
            <Card>
              <CardHeader>
                <CardTitle>课程缺口分析</CardTitle>
                <CardDescription>技能需求与现有课程的缺口识别</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4 dark:bg-amber-900/20 dark:border-amber-800/40">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                      <h3 className="font-semibold text-amber-800 dark:text-amber-400">紧急缺口提醒</h3>
                    </div>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      系统已检测到3个高优先级的课程缺口，需要尽快开发相关课程内容以满足市场需求。
                    </p>
                  </div>
                  
                  {/* 这里应该渲染课程缺口图表 */}
                  <div className="h-96 w-full bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">课程缺口分析图 (占位图)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4">
            {/* 趋势预测内容 */}
            <Card>
              <CardHeader>
                <CardTitle>技能趋势预测</CardTitle>
                <CardDescription>未来3-6个月的技能需求预测</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">基于历史数据和市场信号的未来趋势预测</p>
                  {/* 这里应该渲染趋势预测图表 */}
                  <div className="h-96 w-full bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">技能趋势预测图 (占位图)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 