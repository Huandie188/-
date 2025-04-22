"use client"

import { FileAudio, MoreHorizontal, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const recordings = [
  {
    id: "rec-001",
    title: "客户支持通话 #1234",
    date: "2023-05-15",
    duration: "4:32",
    agent: "张三",
    sentiment: "积极",
  },
  {
    id: "rec-002",
    title: "技术支持 #5678",
    date: "2023-05-14",
    duration: "8:15",
    agent: "李四",
    sentiment: "中性",
  },
  {
    id: "rec-003",
    title: "账单咨询 #9012",
    date: "2023-05-13",
    duration: "3:45",
    agent: "王五",
    sentiment: "消极",
  },
  {
    id: "rec-004",
    title: "销售通话 #3456",
    date: "2023-05-12",
    duration: "6:20",
    agent: "赵六",
    sentiment: "积极",
  },
]

export function RecentRecordings() {
  return (
    <div className="space-y-4">
      {recordings.map((recording) => (
        <div key={recording.id} className="flex items-center justify-between space-x-4 rounded-md border p-3">
          <div className="flex items-center space-x-4">
            <div className="rounded-md bg-primary/10 p-2">
              <FileAudio className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">{recording.title}</p>
              <div className="flex items-center pt-1">
                <p className="text-xs text-muted-foreground">
                  {recording.date} • {recording.duration} • {recording.agent}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
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
            <Button variant="ghost" size="icon">
              <Play className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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
        </div>
      ))}
    </div>
  )
}
