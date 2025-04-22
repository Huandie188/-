import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, BarChart } from "@/components/charts"
import { 
  BrainCircuit, 
  HelpCircle, 
  PlayCircle, 
  PauseCircle,
  Download, 
  RotateCcw, 
  ArrowUpCircle,
  Settings,
  AlertCircle,
  Check,
  RefreshCw,
  TrendingUp
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AIModelPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-blue-800 dark:text-blue-600">AI模型管理</h2>
            <p className="text-muted-foreground">管理和监控系统中的AI模型性能与训练状态</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-1">
              <BrainCircuit className="h-4 w-4" />
              部署新模型
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">模型概览</TabsTrigger>
            <TabsTrigger value="performance">性能指标</TabsTrigger>
            <TabsTrigger value="training">训练与优化</TabsTrigger>
            <TabsTrigger value="logs">日志与警报</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">已部署模型</CardTitle>
                  <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">较上月增加1个</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">平均准确率</CardTitle>
                  <Check className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.7%</div>
                  <p className="text-xs text-muted-foreground">较上月提升2.3%</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">预测响应时间</CardTitle>
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">132ms</div>
                  <p className="text-xs text-muted-foreground">较上月降低17ms</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">模型健康度</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96.8%</div>
                  <p className="text-xs text-muted-foreground">较上月提升0.9%</p>
                </CardContent>
              </Card>
            </div>
            
            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-500" />
              <AlertTitle className="text-blue-800 dark:text-blue-500">模型状态通知</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                课程推荐模型已完成自动优化，准确率提升3.7%。当前系统负载正常，所有模型均运行健康。
              </AlertDescription>
            </Alert>

            <Card className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle>已部署类别及操作</CardTitle>
                <CardDescription>模型状态与关键指标</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>模型名称</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>版本</TableHead>
                        <TableHead>准确率</TableHead>
                        <TableHead>响应时间</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell className="font-medium">课程推荐引擎</TableCell>
                        <TableCell>推荐系统</TableCell>
                        <TableCell>v2.3.1</TableCell>
                        <TableCell>95.8%</TableCell>
                        <TableCell>118ms</TableCell>
                        <TableCell><Badge className="bg-green-500">运行中</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><PauseCircle className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>暂停</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>设置</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell className="font-medium">课程内容分析器</TableCell>
                        <TableCell>自然语言处理</TableCell>
                        <TableCell>v1.8.5</TableCell>
                        <TableCell>94.2%</TableCell>
                        <TableCell>142ms</TableCell>
                        <TableCell><Badge className="bg-green-500">运行中</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><PauseCircle className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>暂停</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>设置</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell className="font-medium">学习路径规划器</TableCell>
                        <TableCell>图计算</TableCell>
                        <TableCell>v2.0.1</TableCell>
                        <TableCell>96.3%</TableCell>
                        <TableCell>163ms</TableCell>
                        <TableCell><Badge className="bg-green-500">运行中</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><PauseCircle className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>暂停</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>设置</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell className="font-medium">技能缺口预测器</TableCell>
                        <TableCell>时间序列预测</TableCell>
                        <TableCell>v1.4.7</TableCell>
                        <TableCell>91.5%</TableCell>
                        <TableCell>127ms</TableCell>
                        <TableCell><Badge className="bg-green-500">运行中</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><PauseCircle className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>暂停</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>设置</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell className="font-medium">课程热度分析器</TableCell>
                        <TableCell>多因子分析</TableCell>
                        <TableCell>v1.2.3</TableCell>
                        <TableCell>93.9%</TableCell>
                        <TableCell>109ms</TableCell>
                        <TableCell><Badge className="bg-amber-500">优化中</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><PlayCircle className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>启动</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>设置</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>模型性能详情</CardTitle>
                <CardDescription>各模型性能指标详细数据</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">课程推荐引擎</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">准确率</span>
                          <span className="text-sm font-medium">95.8%</span>
                        </div>
                        <Progress value={95.8} className="h-2" />
                        
                        <div className="flex justify-between mt-4">
                          <span className="text-sm">召回率</span>
                          <span className="text-sm font-medium">92.4%</span>
                        </div>
                        <Progress value={92.4} className="h-2" />
                        
                        <div className="flex justify-between mt-4">
                          <span className="text-sm">F1分数</span>
                          <span className="text-sm font-medium">94.1%</span>
                        </div>
                        <Progress value={94.1} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">用户满意度</span>
                          <span className="text-sm font-medium">89.7%</span>
                        </div>
                        <Progress value={89.7} className="h-2" />
                        
                        <div className="flex justify-between mt-4">
                          <span className="text-sm">平均响应时间</span>
                          <span className="text-sm font-medium">118ms</span>
                        </div>
                        <Progress value={82} className="h-2" />
                        
                        <div className="flex justify-between mt-4">
                          <span className="text-sm">计算资源使用率</span>
                          <span className="text-sm font-medium">68.3%</span>
                        </div>
                        <Progress value={68.3} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {/* 可以添加更多模型的性能指标 */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>模型训练管理</CardTitle>
                <CardDescription>模型训练和优化状态监控</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">课程热度分析器 v1.3.0</h3>
                        <p className="text-sm text-muted-foreground">训练进度: 78%</p>
                      </div>
                      <Badge className="bg-amber-500">训练中</Badge>
                    </div>
                    <Progress value={78} className="h-2 mb-4" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">开始时间</p>
                        <p className="font-medium">2024-05-15 09:32</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">预计完成</p>
                        <p className="font-medium">2024-05-16 13:20</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">当前样本</p>
                        <p className="font-medium">2.8M / 3.6M</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">当前损失</p>
                        <p className="font-medium">0.0324</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <PauseCircle className="h-4 w-4 mr-1" />
                        暂停训练
                      </Button>
                      <Button variant="outline" size="sm">
                        <HelpCircle className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  </div>
                  
                  {/* 可以添加更多训练任务 */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>模型日志与警报</CardTitle>
                <CardDescription>系统日志和异常警报</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-400">课程推荐引擎 v2.3.1 优化完成</span>
                      <Badge variant="outline" className="ml-auto">2024-05-15 14:32</Badge>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-500 mt-1 ml-6">
                      模型准确率从 94.1% 提升至 95.8%，响应时间降低 11ms。所有指标均达到预期目标。
                    </p>
                  </div>
                  
                  <div className="rounded-md border p-3 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-800 dark:text-amber-400">技能缺口预测器资源使用率过高</span>
                      <Badge variant="outline" className="ml-auto">2024-05-15 11:28</Badge>
                    </div>
                    <p className="text-sm text-amber-700 dark:text-amber-500 mt-1 ml-6">
                      模型在处理大批量数据时CPU使用率达到92%，建议优化计算资源分配或提升硬件配置。
                    </p>
                  </div>
                  
                  {/* 可以添加更多日志 */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 