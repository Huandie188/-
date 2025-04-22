"use client"

import { useState, useEffect, ReactNode } from "react"
import {
  Line,
  LineChart as RechartsLineChart,
  Bar,
  BarChart as RechartsBarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// 图表示例数据
const lineData = [
  { name: "一月", value: 400 },
  { name: "二月", value: 300 },
  { name: "三月", value: 600 },
  { name: "四月", value: 800 },
  { name: "五月", value: 500 },
  { name: "六月", value: 900 },
  { name: "七月", value: 700 },
]

const barData = [
  { name: "脚本偏离", value: 35 },
  { name: "信息缺失", value: 28 },
  { name: "信息错误", value: 18 },
  { name: "跳过部分", value: 12 },
  { name: "其他", value: 7 },
]

const pieData = [
  { name: "在线课程学习", value: 40 },
  { name: "交互式实验", value: 25 },
  { name: "社区讨论", value: 15 },
  { name: "视频讲解", value: 12 },
  { name: "文档阅读", value: 8 }
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

// 通用的图表错误边界组件
interface ChartErrorBoundaryProps {
  children: ReactNode;
}

function ChartErrorBoundary({ children }: ChartErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-[300px] border rounded-md bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-4">
          <p className="text-red-500 font-medium">图表加载失败</p>
          <button 
            className="mt-2 text-sm text-blue-500 hover:underline"
            onClick={() => setHasError(false)}
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  // 确保只在客户端渲染
  if (!isClient) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">加载图表中...</div>
      </div>
    )
  }

  try {
    return children
  } catch (error) {
    console.error("Chart rendering error:", error)
    setHasError(true)
    return null
  }
}

export function LineChart() {
  return (
    <ChartErrorBoundary>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartErrorBoundary>
  )
}

export function BarChart() {
  return (
    <ChartErrorBoundary>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {barData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartErrorBoundary>
  )
}

export function PieChart() {
  return (
    <ChartErrorBoundary>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartErrorBoundary>
  )
}

// 导出所有图表组件
const Charts = {
  LineChart,
  BarChart,
  PieChart
}

export default Charts
