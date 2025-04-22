import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, FileAudio, Filter, MoreHorizontal, Play, Search, SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"

export default function RecordingsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[2.25rem] font-bold tracking-tight text-blue-800 dark:text-blue-600">录音</h2>
          <div className="flex items-center space-x-2">
            <Button className="transition-all duration-200 hover:scale-105">
              <Download className="mr-2 h-4 w-4" />
              导出
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索录音..."
                className="w-[200px] lg:w-[300px] pl-8 transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 transition-all duration-200 hover:scale-105">
                  <Filter className="mr-2 h-4 w-4" />
                  筛选
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>筛选条件</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>所有录音</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>客户支持</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>技术支持</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>销售通话</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>账单咨询</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 transition-all duration-200 hover:scale-105">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  视图
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>排序方式</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>日期（最新优先）</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>日期（最旧优先）</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>时长（最长优先）</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>时长���最短优先）</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border transition-all duration-200 hover:shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>录音</TableHead>
                <TableHead>日期</TableHead>
                <TableHead>时长</TableHead>
                <TableHead>客服</TableHead>
                <TableHead>遵循度</TableHead>
                <TableHead>情绪</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recordings.map((recording) => (
                <TableRow key={recording.id} className="transition-all duration-200 hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <FileAudio className="h-4 w-4 text-primary" />
                      <span>{recording.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{recording.date}</TableCell>
                  <TableCell>{recording.duration}</TableCell>
                  <TableCell>{recording.agent}</TableCell>
                  <TableCell>
                    <Badge variant={getAdherenceBadgeVariant(recording.adherence)}>{recording.adherence}%</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        recording.sentiment === "积极"
                          ? "default"
                          : recording.sentiment === "中性"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {recording.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="transition-all duration-200 hover:scale-110 hover:bg-primary/10"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="transition-all duration-200 hover:scale-110 hover:bg-primary/10"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>操作</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>查看分析</DropdownMenuItem>
                          <DropdownMenuItem>下载录音</DropdownMenuItem>
                          <DropdownMenuItem>分享</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function getAdherenceBadgeVariant(adherence: number) {
  if (adherence >= 90) return "default"
  if (adherence >= 75) return "secondary"
  return "destructive"
}

const recordings = [
  {
    id: "rec-001",
    title: "客户支持通话 #1234",
    date: "2023-05-15",
    duration: "4:32",
    agent: "张三",
    adherence: 92,
    sentiment: "积极",
  },
  {
    id: "rec-002",
    title: "技术支持 #5678",
    date: "2023-05-14",
    duration: "8:15",
    agent: "李四",
    adherence: 85,
    sentiment: "中性",
  },
  {
    id: "rec-003",
    title: "账单咨询 #9012",
    date: "2023-05-13",
    duration: "3:45",
    agent: "王五",
    adherence: 68,
    sentiment: "消极",
  },
  {
    id: "rec-004",
    title: "销售通话 #3456",
    date: "2023-05-12",
    duration: "6:20",
    agent: "赵六",
    adherence: 94,
    sentiment: "积极",
  },
  {
    id: "rec-005",
    title: "客户投诉 #7890",
    date: "2023-05-11",
    duration: "5:45",
    agent: "钱七",
    adherence: 72,
    sentiment: "消极",
  },
  {
    id: "rec-006",
    title: "产品咨询 #2345",
    date: "2023-05-10",
    duration: "4:10",
    agent: "孙八",
    adherence: 88,
    sentiment: "中性",
  },
  {
    id: "rec-007",
    title: "技术支持 #6789",
    date: "2023-05-09",
    duration: "7:30",
    agent: "周九",
    adherence: 90,
    sentiment: "积极",
  },
  {
    id: "rec-008",
    title: "销售跟进 #0123",
    date: "2023-05-08",
    duration: "3:25",
    agent: "吴十",
    adherence: 95,
    sentiment: "积极",
  },
]
