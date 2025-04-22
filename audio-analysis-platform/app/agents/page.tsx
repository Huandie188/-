import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Download, Search, SlidersHorizontal, UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AgentsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[2.25rem] font-bold tracking-tight text-blue-800 dark:text-blue-600">客服人员</h2>
          <div className="flex items-center space-x-2">
            <Button className="transition-all duration-200 hover:scale-105">
              <UserPlus className="mr-2 h-4 w-4" />
              添加客服
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索客服..."
                className="w-[200px] lg:w-[300px] pl-8 transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 transition-all duration-200 hover:scale-105">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              筛选
            </Button>
            <Button variant="outline" size="sm" className="h-9 transition-all duration-200 hover:scale-105">
              <Download className="mr-2 h-4 w-4" />
              导出
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">客服总数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">较上月增加2人</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">平均遵循度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">较上月增长5.2%</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">最佳表现</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">赵六</div>
              <p className="text-xs text-muted-foreground">94%遵循率</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[1.05rem] font-medium text-blue-800 dark:text-blue-600">进步最大</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">李四</div>
              <p className="text-xs text-muted-foreground">提升15%</p>
            </CardContent>
          </Card>
        </div>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">客服列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客服</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>团队</TableHead>
                  <TableHead>遵循度</TableHead>
                  <TableHead>客户满意度</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id} className="transition-all duration-200 hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 transition-all duration-200 hover:scale-110">
                          <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                          <AvatarFallback>{agent.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{agent.id}</TableCell>
                    <TableCell>{agent.team}</TableCell>
                    <TableCell>{agent.adherence}%</TableCell>
                    <TableCell>{agent.satisfaction}/5</TableCell>
                    <TableCell>
                      <Badge
                        variant={agent.status === "在线" ? "default" : "secondary"}
                        className="transition-all duration-200 hover:scale-105"
                      >
                        {agent.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const agents = [
  {
    id: "AG001",
    name: "张三",
    initials: "张",
    email: "zhangsan@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    team: "客户支持",
    adherence: 92,
    satisfaction: 4.5,
    status: "在线",
  },
  {
    id: "AG002",
    name: "李四",
    initials: "李",
    email: "lisi@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    team: "技术支持",
    adherence: 85,
    satisfaction: 4.2,
    status: "在线",
  },
  {
    id: "AG003",
    name: "王五",
    initials: "王",
    email: "wangwu@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    team: "客户支持",
    adherence: 68,
    satisfaction: 3.8,
    status: "离线",
  },
  {
    id: "AG004",
    name: "赵六",
    initials: "赵",
    email: "zhaoliu@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    team: "销售",
    adherence: 94,
    satisfaction: 4.7,
    status: "在线",
  },
  {
    id: "AG005",
    name: "钱七",
    initials: "钱",
    email: "qianqi@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    team: "客户支持",
    adherence: 72,
    satisfaction: 3.9,
    status: "离线",
  },
]
