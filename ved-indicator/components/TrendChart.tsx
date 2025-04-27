"use client"

import React, { useState, useEffect } from "react"

// 趋势数据类型
interface TrendData {
  name: string
  color: string
  data: number[]
  gradient: string
}

// 技术趋势数据 - 使用OpenAI风格的柔和颜色
const trendData: TrendData[] = [
  {
    name: "大语言模型",
    color: "#3b83f67d",
    data: [60, 73, 82, 92],
    gradient: "blueGradient"
  },
  {
    name: "AI应用开发",
    color: "#8b5cf67d",
    data: [50, 64, 77, 87],
    gradient: "purpleGradient"
  },
  {
    name: "云原生开发",
    color: "#10b9817d",
    data: [45, 51, 67, 76],
    gradient: "greenGradient"
  },
  {
    name: "Web3/区块链",
    color: "#f59e0b7d",
    data: [40, 42, 55, 65],
    gradient: "amberGradient"
  },
  {
    name: "网络安全",
    color: "#ef44447d",
    data: [39, 41, 48, 61],
    gradient: "redGradient"
  }
]

// 时间周期标签
const timeLabels = ["2023年Q3", "2023年Q4", "2024年Q1", "2024年Q2"]

export const TrendChart: React.FC = () => {
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'all' | 'top3'>('all')
  const [hoveredPoint, setHoveredPoint] = useState<{series: string, index: number, value: number} | null>(null)
  const [mounted, setMounted] = useState(false)
  
  // 处理组件加载动画
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // 视图过滤
  const displayData = activeView === 'all' 
    ? trendData 
    : trendData.slice(0, 3)
  
  // 绘图区域参数
  const chartWidth = 500
  const chartHeight = 200
  const paddingTop = 20
  const paddingBottom = 20
  const paddingLeft = 10
  const paddingRight = 10
  
  // 转换数据点为SVG坐标
  const getPathFromData = (data: number[]): string => {
    const height = chartHeight - paddingTop - paddingBottom
    const width = chartWidth - paddingLeft - paddingRight
    
    return data.map((value, index) => {
      const x = paddingLeft + (index / (data.length - 1)) * width
      // 将0-100的百分比值转换为绘图高度 (0 = 底部, 100 = 顶部)
      const y = height - (value / 100 * height) + paddingTop
      
      return `${index === 0 ? 'M' : 'L'}${x},${y}`
    }).join(' ')
  }
  
  // 获取面积图路径（带底部封闭）
  const getAreaPathFromData = (data: number[]): string => {
    const height = chartHeight - paddingTop - paddingBottom
    const width = chartWidth - paddingLeft - paddingRight
    
    const path = getPathFromData(data)
    return `${path} L${paddingLeft + width},${chartHeight - paddingBottom} L${paddingLeft},${chartHeight - paddingBottom} Z`
  }
  
  // 获取数据点坐标
  const getPointCoordinates = (value: number, index: number) => {
    const height = chartHeight - paddingTop - paddingBottom
    const width = chartWidth - paddingLeft - paddingRight
    
    const x = paddingLeft + (index / (timeLabels.length - 1)) * width
    const y = height - (value / 100 * height) + paddingTop
    
    return { x, y }
  }
  
  return (
    <div className={`w-full h-full relative transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* 图例 */}
      <div className="absolute right-2 top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 z-10">
        <div className="text-xs font-medium mb-2 text-slate-600 dark:text-slate-300">趋势对比</div>
        <div className="space-y-1.5">
          {displayData.map((series) => (
            <div 
              key={series.name}
              className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded px-1 py-0.5"
              onMouseEnter={() => setHoveredSeries(series.name)}
              onMouseLeave={() => setHoveredSeries(null)}
            >
              <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: series.color }}></div>
              <span className="text-xs text-slate-700 dark:text-slate-300">{series.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
          <button 
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded px-1.5 py-0.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 w-full text-left" 
            onClick={() => setActiveView(activeView === 'all' ? 'top3' : 'all')}
          >
            {activeView === 'all' ? '仅显示Top3' : '显示全部'}
          </button>
        </div>
      </div>
      
      {/* 数据提示框 */}
      {hoveredPoint && (
        <div 
          className="absolute pointer-events-none z-20 bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm transform -translate-x-1/2 transition-all duration-200 backdrop-blur-sm"
          style={{ 
            left: `${(hoveredPoint.index / (timeLabels.length - 1)) * 100}%`,
            top: hoveredPoint.index % 2 === 0 ? '20%' : '30%',
          }}
        >
          <div className="font-medium text-slate-800 dark:text-slate-200 mb-1">{timeLabels[hoveredPoint.index]}</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: trendData.find(s => s.name === hoveredPoint.series)?.color }}></div>
            <span>{hoveredPoint.series}:</span>
            <span className="font-semibold">{hoveredPoint.value}%</span>
          </div>
        </div>
      )}
      
      {/* SVG图表 */}
      <svg 
        className="w-full h-[280px] mt-8" 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
        preserveAspectRatio="none"
      >
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="amberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        
        {/* 水平网格线 - 使用更轻微的线条 */}
        <g className="grid">
          {[0, 25, 50, 75, 100].map((value, i) => {
            const y = chartHeight - paddingBottom - (value / 100 * (chartHeight - paddingTop - paddingBottom))
            return (
              <React.Fragment key={`grid-h-${i}`}>
                <line 
                  x1={paddingLeft} 
                  y1={y} 
                  x2={chartWidth - paddingRight} 
                  y2={y} 
                  stroke="#e5e7eb" 
                  strokeWidth="1" 
                  strokeDasharray={value === 0 ? "none" : "3 3"} 
                  className="dark:stroke-slate-800"
                />
                <text 
                  x={paddingLeft - 10} 
                  y={y} 
                  dominantBaseline="middle" 
                  textAnchor="end" 
                  fontSize="9" 
                  fill="#94a3b8"
                  className="dark:fill-slate-500"
                >
                  {value}
                </text>
              </React.Fragment>
            )
          })}
        </g>
        
        {/* 坐标轴 */}
        <line 
          x1={paddingLeft} 
          y1={chartHeight - paddingBottom} 
          x2={chartWidth - paddingRight} 
          y2={chartHeight - paddingBottom} 
          stroke="#cbd5e1" 
          strokeWidth="1.5"
          className="dark:stroke-slate-700" 
        />
        <line 
          x1={paddingLeft} 
          y1={paddingTop} 
          x2={paddingLeft} 
          y2={chartHeight - paddingBottom} 
          stroke="#cbd5e1" 
          strokeWidth="1.5"
          className="dark:stroke-slate-700" 
        />
        
        {/* 底部标签 */}
        {timeLabels.map((label, i) => {
          const x = paddingLeft + (i / (timeLabels.length - 1)) * (chartWidth - paddingLeft - paddingRight)
          return (
            <g key={`label-${i}`}>
              <line 
                x1={x}
                y1={chartHeight - paddingBottom}
                x2={x}
                y2={chartHeight - paddingBottom + 5}
                stroke="#cbd5e1"
                strokeWidth="1"
                className="dark:stroke-slate-700"
              />
              <text
                x={x}
                y={chartHeight - paddingBottom + 15}
                fontSize="9"
                textAnchor="middle"
                fill="#64748b"
                className="dark:fill-slate-500"
              >
                {label}
              </text>
            </g>
          )
        })}

        {/* 区域填充 - 从后向前绘制，避免前面的区域被后面的覆盖 */}
        {displayData.map((series) => (
          <path 
            key={`area-${series.name}`}
            d={getAreaPathFromData(series.data)} 
            fill={`url(#${series.gradient})`}
            opacity={hoveredSeries === null || hoveredSeries === series.name ? 1 : 0.15}
            className="transition-opacity duration-300"
          />
        ))}
        
        {/* 折线 */}
        {displayData.map((series) => (
          <path 
            key={`line-${series.name}`}
            d={getPathFromData(series.data)} 
            fill="none" 
            stroke={series.color} 
            strokeWidth={hoveredSeries === series.name ? 3 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={hoveredSeries === null || hoveredSeries === series.name ? 1 : 0.3}
            className="transition-all duration-300"
          />
        ))}
        
        {/* 数据点 */}
        {displayData.map((series) => (
          <g key={`points-${series.name}`}>
            {series.data.map((value, i) => {
              const { x, y } = getPointCoordinates(value, i)
              return (
                <g key={`point-${series.name}-${i}`}>
                  <circle 
                    cx={x} 
                    cy={y} 
                    r={5}
                    fill="rgba(255, 255, 255, 0)"
                    stroke="rgba(0, 0, 0, 0)"
                    strokeWidth={2}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint({ series: series.name, index: i, value })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <circle 
                    cx={x} 
                    cy={y} 
                    r={hoveredSeries === series.name || (hoveredPoint && hoveredPoint.series === series.name && hoveredPoint.index === i) ? 5 : 3.5}
                    fill="white" 
                    stroke={series.color} 
                    strokeWidth={hoveredSeries === series.name || (hoveredPoint && hoveredPoint.series === series.name && hoveredPoint.index === i) ? 2.5 : 2}
                    opacity={hoveredSeries === null || hoveredSeries === series.name ? 1 : 0.3}
                    className="transition-all duration-200"
                  />
                </g>
              )
            })}
          </g>
        ))}
      </svg>
      
      {/* 下方的说明文字 */}
      <div className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">
        基于全网数据统计分析，显示各技术领域热度变化趋势
      </div>
    </div>
  )
} 