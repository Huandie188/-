"use client"

import { Progress } from "@/components/ui/progress"

const metrics = [
  {
    name: "脚本遵循度",
    value: 87,
    target: 90,
    change: "+5%",
  },
  {
    name: "客户满意度",
    value: 84,
    target: 85,
    change: "+2%",
  },
  {
    name: "通话解决率",
    value: 92,
    target: 90,
    change: "+3%",
  },
  {
    name: "平均处理时间",
    value: 78,
    target: 80,
    change: "-4%",
  },
]

export function PerformanceMetrics() {
  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{metric.name}</p>
              <p className="text-xs text-muted-foreground">
                目标: {metric.target}% • 变化: {metric.change}
              </p>
            </div>
            <div className="text-sm font-medium">{metric.value}%</div>
          </div>
          <Progress value={metric.value} className="h-2" />
        </div>
      ))}
    </div>
  )
}
