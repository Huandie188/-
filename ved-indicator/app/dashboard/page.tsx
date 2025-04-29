"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, TrendingUp, Users, BookOpen, Clock, Target, BrainCircuit, BarChart3, PieChart, LineChart, Activity, Award, Lightbulb, Globe, Database, FileBarChart } from "lucide-react"
import { useRouter } from 'next/navigation'
import { TrendChart } from "@/components/TrendChart"
import { ChinaMap } from "@/components/ChinaMap"
import { CircleStats } from "@/components/CircleStats"
import { UserAnalytics } from "@/components/UserAnalytics"
import { HotwordCloud } from "@/components/HotwordCloud"
import { RegionBarChart } from "@/components/RegionBarChart"

// 模拟的实时数据状态和更新函数
const useRealTimeData = (initialValue: number, min: number, max: number) => {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // 随机波动但有一定趋势
      const trend = Math.random() > 0.7 ? 1 : -1;
      const change = Math.random() * 5 * trend;
      let newValue = value + change;
      
      // 确保在合理范围内
      newValue = Math.max(min, Math.min(max, newValue));
      setValue(newValue);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [value, min, max]);
  
  return value;
};

// 模拟数据洞察生成
const generateInsight = (data: any) => {
  const insights = [
    "数据显示，'大语言模型'学习热度继续保持上升趋势，增长率达23%。",
    "相比上月，'AI应用开发'学习人数增长了15%，成为增长最快的领域。",
    "近30天内，用户平均学习时长增加了18分钟，达到每日1.2小时。",
    "完课率数据显示，分散学习比集中学习效果提升约12%。",
    "基于用户学习路径分析，从基础Python到数据科学的转换是最常见路径。",
    "数据分析表明，夜间学习（20:00-23:00）的用户知识点掌握度提高了8.2%。",
    "短视频形式内容比长视频完课率高出31%，建议增加微课内容。",
    "AI对话辅助功能使用者的题目解答正确率提高了16.7%。",
    "'大模型训练'相关内容搜索量环比上月增长42%，用户需求强烈。",
    "跨平台学习用户（PC+移动端）的学习时长是单平台用户的2.3倍。"
  ];
  
  // 每次随机选择不同的洞察
  return insights[Math.floor(Math.random() * insights.length)];
};

// 饼图数据组件
const PieChartComponent = () => {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="absolute h-[180px] w-[180px] rounded-full border-8 border-slate-700/50"></div>
      <div className="absolute h-[180px] w-[180px] rounded-full border-t-8 border-l-8 border-blue-500 rotate-45 animate-spin-slow"></div>
      <div className="absolute h-[180px] w-[180px] rounded-full border-t-8 border-r-8 border-emerald-500 -rotate-45 animate-spin-slow-reverse"></div>
      <div className="absolute h-[180px] w-[180px] rounded-full border-b-8 border-r-8 border-violet-500 rotate-90 animate-spin-slow-reverse"></div>
      <div className="absolute h-[140px] w-[140px] rounded-full bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">72%</p>
          <p className="text-xs text-slate-400">完成率</p>
        </div>
      </div>
    </div>
  );
};

// 条形图组件
const BarChartComponent = () => {
  return (
    <div className="w-full h-full flex items-end justify-between gap-2 pt-8">
      {[65, 83, 47, 90, 56, 72, 35].map((value, i) => (
        <div key={i} className="flex flex-col items-center gap-1 w-full">
          <div 
            className={`w-full rounded-t-md ${
              i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-violet-500' : 'bg-emerald-500'
            } animate-pulse-subtle`} 
            style={{ height: `${value * 0.7}px` }}
          ></div>
          <span className="text-xs text-slate-400">{`周${i + 1}`}</span>
        </div>
      ))}
    </div>
  );
};

// 波形图组件
const WaveChartComponent = () => {
  return (
    <div className="relative w-full h-[100px] mt-4">
      <svg viewBox="0 0 800 100" className="w-full h-full">
        <path 
          d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,50 800,50" 
          fill="none" 
          stroke="rgba(59, 130, 246, 0.5)" 
          strokeWidth="3"
          className="animate-wave"
        />
        <path 
          d="M0,50 C100,80 200,20 300,50 C400,80 500,20 600,50 C700,80 800,50 800,50" 
          fill="none" 
          stroke="rgba(139, 92, 246, 0.5)" 
          strokeWidth="3"
          className="animate-wave-reverse"
        />
      </svg>
      
      <div className="flex justify-between absolute bottom-0 w-full px-4">
        {['一月', '二月', '三月', '四月', '五月', '六月', '七月'].map((month, i) => (
          <div key={i} className="text-xs text-slate-400">{month}</div>
        ))}
      </div>
    </div>
  );
};

// 数据卡片内用的带标题和边框的容器组件
const DataCard = ({ title, icon: Icon, color, children, className = "" }: any) => {
  return (
    <Card className={`overflow-hidden border-none shadow-xl bg-slate-800/90 backdrop-blur-lg h-full relative ${className}`}>
      <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${color}`}></div>
      <CardContent className="p-3 relative z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <Icon className={`h-4 w-4 ${color.replace('from-', 'text-').split(' ')[0]}`} />
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>
        {children}
      </CardContent>
      
      {/* 装饰边框 */}
      <div className="absolute left-0 top-0 w-4 h-4 border-t border-l border-sky-500/40"></div>
      <div className="absolute right-0 top-0 w-4 h-4 border-t border-r border-sky-500/40"></div>
      <div className="absolute left-0 bottom-0 w-4 h-4 border-b border-l border-sky-500/40"></div>
      <div className="absolute right-0 bottom-0 w-4 h-4 border-b border-r border-sky-500/40"></div>
    </Card>
  );
};

export default function DataDashboard() {
  // 使用模拟的实时数据
  const activeUsers = useRealTimeData(2467, 2300, 2600);
  const completionRate = useRealTimeData(68, 60, 75);
  const averageLearningTime = useRealTimeData(72, 65, 80);
  const newCourses = useRealTimeData(124, 110, 140);
  
  const [insightText, setInsightText] = useState(generateInsight(null));
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  
  // 固定的洞察数据集
  const fixedInsights = [
    {
      text: "用户行为分析显示，每周坚持学习3-4次的用户，课程完成率提高了27%。",
      type: "info",
      icon: "📊"
    },
    {
      text: "推荐：基于当前趋势，建议增加\"大语言模型应用开发\"相关课程内容。",
      type: "success",
      icon: "💡"
    },
    {
      text: "警告：检测到\"Web安全\"领域内容较弱，建议补充相关课程。",
      type: "warning",
      icon: "⚠️"
    },
    {
      text: "热点：ChatGPT相关课程的参与度较上月提升35%，成为增长最快的课程类别。",
      type: "info",
      icon: "🔥"
    },
    {
      text: "用户满意度调查显示，实践项目型课程的评分比纯理论课程高出1.8分。",
      type: "success",
      icon: "👍"
    },
    {
      text: "发现：周末学习用户比工作日学习用户更倾向于选择长时间视频课程。",
      type: "info",
      icon: "🔍"
    }
  ];
  
  // 定期更新数据洞察
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightText(generateInsight(null));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // 自动滚动展示所有洞察
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setCurrentInsightIndex((prevIndex) => (prevIndex + 1) % fixedInsights.length);
    }, 5000);
    
    return () => clearInterval(scrollInterval);
  }, []);

  // 引用用于自动滚动的容器
  const insightContainerRef = useRef<HTMLDivElement>(null);
  
  // 自动垂直滚动效果
  useEffect(() => {
    if (!insightContainerRef.current) return;
    
    const container = insightContainerRef.current;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    
    if (scrollHeight <= clientHeight) return; // 如果内容不足以滚动，则退出
    
    let currentPosition = 0;
    let direction = 1; // 1 表示向下滚动，-1 表示向上滚动
    const scrollSpeed = 0.5; // 每次滚动的像素数
    
    const scrollAnimation = () => {
      if (!container) return;
      
      // 更新位置
      currentPosition += scrollSpeed * direction;
      
      // 检查是否需要改变方向
      if (currentPosition >= maxScrollTop) {
        // 当到达底部时，暂停一下然后改变方向
        setTimeout(() => {
          direction = -1;
        }, 2000);
      } else if (currentPosition <= 0) {
        // 当到达顶部时，暂停一下然后改变方向
        setTimeout(() => {
          direction = 1;
        }, 2000);
      }
      
      // 应用滚动位置
      container.scrollTop = currentPosition;
    };
    
    // 设置动画间隔
    const animationInterval = setInterval(scrollAnimation, 50);
    
    // 清理函数
    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      </div>
    
      {/* 顶部导航条 */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg">
        <div className="container flex h-10 items-center px-2">
          <Link href="/" className="flex items-center space-x-2 mr-4">
            <img src="/5.png" alt="EduFusion" className="h-6 w-6" />
            <span className="text-base font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">EduFusion</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 text-xs font-medium flex-1 justify-center">
            <Link href="/" className="transition-colors hover:text-blue-400 py-1 border-b-2 border-transparent hover:border-blue-500">
              首页
            </Link>
            <Link href="/dashboard" className="text-blue-400 py-1 border-b-2 border-blue-500">
              数据大屏
            </Link>
          </nav>
          <div className="flex items-center gap-2 w-[120px] justify-end">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 hover:bg-slate-800 text-slate-400 hover:text-blue-400">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">返回首页</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container max-w-screen-2xl pt-12 pb-3 relative z-10 px-2">
        {/* 页面标题和时间 */}
        <div className="mb-2 flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              教育数据可视化分析平台
            </h1>
            <div className="flex flex-row items-center justify-center text-xs text-slate-400 mt-0.5">
              <span>实时数据监控与教育趋势分析</span>
              <div className="h-3 w-px bg-slate-700 mx-3"></div>
              <span>数据更新时间: {new Date().toLocaleString('zh-CN', { hour12: false })}</span>
            </div>
          </div>
        </div>
        
        {/* 总数据量 - 圆形指标 */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
          <CircleStats title="发帖量" value={260} color="cyan" />
          <CircleStats title="数据量" value={12408} color="blue" />
          <CircleStats title="参与人数" value={13131} color="indigo" />
          <div className="hidden sm:block sm:col-span-2 bg-slate-800/80 border border-slate-700/50 rounded-lg overflow-hidden">
            <div className="h-full p-2 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 mb-1">
                <Database className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-xs font-medium text-white">平台数据摘要</span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-1">
                <div className="flex flex-col">
                  <div className="text-[10px] text-slate-400">系统状态</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs text-white">运行正常</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-[10px] text-slate-400">CPU利用率</div>
                  <div className="text-xs text-white">
                    {Math.floor(Math.random() * 20) + 30}%
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-[10px] text-slate-400">存储空间</div>
                  <div className="text-xs text-white">
                    <span className="text-emerald-400">{(Math.random() * 2 + 6.5).toFixed(1)}</span>/10 TB
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-[10px] text-slate-400">今日API调用</div>
                  <div className="text-xs text-white">
                    {Math.floor(Math.random() * 500) + 12000}
                  </div>
                </div>
              </div>
              
              <div className="mt-1 pt-1 border-t border-slate-700/50 flex justify-between items-center">
                <div className="text-[10px] text-slate-400">上次更新: 今天 12:35</div>
                <div className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/70 text-cyan-300">v2.4.1</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 主内容：左侧热词云+中国地图+右侧指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-2 mb-2">
          {/* 左侧：热词云 */}
          <div className="md:col-span-1 lg:col-span-3 h-[350px]">
            <HotwordCloud />
          </div>
          
          {/* 中间：中国地图 */}
          <div className="md:col-span-1 lg:col-span-6 h-[350px] border border-slate-700/50 rounded-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 border-b border-slate-700/30 bg-slate-800/30">
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">地图数据</span>
              </div>
              <div className="flex items-center text-xs gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-slate-400">活跃用户</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-slate-400">数据流向</span>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-center bg-slate-800/50 relative overflow-hidden">
              {/* 背景装饰网格 */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              
              {/* 使用img标签替换占位图 */}
              <img 
                src="/china-map.png" 
                alt="中国地图数据可视化"
                className="w-[95%] h-[95%] object-contain"
              />
              
              {/* 装饰性连接线 */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30"></div>
            </div>
          </div>
          
          {/* 右侧：实时热度+用户数 */}
          <div className="md:col-span-1 lg:col-span-3 grid grid-rows-2 gap-2 h-[350px]">
            <div className="row-span-1">
              <DataCard title="实时热度" icon={TrendingUp} color="from-red-500 to-orange-500">
                <div className="h-36 px-0.5">
                  <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="realTimeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(239, 68, 68, 0.6)" />
                        <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                      </linearGradient>
                    </defs>
                    
                    {/* 网格线 */}
                    {[0, 30, 60, 90, 120, 150, 180].map((val, i) => (
                      <g key={`grid-${i}`}>
                        <line 
                          x1="0" 
                          y1={150 - (val / 180) * 150} 
                          x2="400" 
                          y2={150 - (val / 180) * 150}
                          stroke="rgba(148, 163, 184, 0.1)" 
                          strokeDasharray="2,3" 
                        />
                        <text 
                          x="-5" 
                          y={150 - (val / 180) * 150} 
                          fontSize="8" 
                          fill="#94a3b8" 
                          dominantBaseline="middle" 
                          textAnchor="end"
                        >
                          {val}
                        </text>
                      </g>
                    ))}
                    
                    {/* 时间轴 */}
                    {["2024-04-18", "2024-04-21", "2024-04-24"].map((date, i) => (
                      <text 
                        key={`date-${i}`}
                        x={(i / 2) * 400} 
                        y="155" 
                        fontSize="8" 
                        fill="#94a3b8" 
                        textAnchor="middle"
                      >
                        {date}
                      </text>
                    ))}
                    
                    {/* 热度线 */}
                    <path 
                      d="M0,120 L50,60 L100,80 L150,60 L200,63 L250,60 L300,100 L350,105 L400,30" 
                      fill="none" 
                      stroke="rgb(239, 68, 68)" 
                      strokeWidth="2"
                      filter="url(#glow)"
                    />
                    <path 
                      d="M0,120 L50,60 L100,80 L150,60 L200,63 L250,60 L300,100 L350,105 L400,30 L400,150 L0,150 Z" 
                      fill="url(#realTimeGradient)" 
                    />
                    
                    {/* 数据点 */}
                    {[
                      { x: 0, y: 120 },
                      { x: 50, y: 60 },
                      { x: 100, y: 80 },
                      { x: 150, y: 60 },
                      { x: 200, y: 63 },
                      { x: 250, y: 60 },
                      { x: 300, y: 100 },
                      { x: 350, y: 105 },
                      { x: 400, y: 30 }
                    ].map((point, i) => (
                      <circle
                        key={`point-${i}`}
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill="rgb(239, 68, 68)"
                        className={i === 8 ? "animate-pulse" : ""}
                      />
                    ))}
                    
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </svg>
                </div>
              </DataCard>
            </div>
            <div className="row-span-1">
              <UserAnalytics />
            </div>
          </div>
        </div>
        
        {/* 底部区域：地区发帖数、学习热点、AI洞察 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2">
          {/* 发帖用户区域分布 */}
          <div className="lg:col-span-5 h-[260px]">
            <RegionBarChart />
          </div>
          
          {/* AI数据洞察 */}
          <div className="lg:col-span-3 h-[260px]">
            <DataCard title="AI数据洞察" icon={BrainCircuit} color="from-violet-500 to-purple-700" className="h-full">
              <div 
                ref={insightContainerRef}
                className="space-y-2 h-[200px] pr-1 overflow-hidden"
              >
                <div className="p-2 bg-slate-700/50 rounded-md border border-slate-700/70 animate-pulse-slow">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-violet-500 rounded-sm"></div>
                    <span className="text-xs font-medium text-violet-300">AI实时预测</span>
                  </div>
                  <p className="text-xs text-slate-300">{insightText}</p>
                </div>
                
                {fixedInsights.map((insight, index) => {
                  const isActive = index === currentInsightIndex;
                  let bgClass = "bg-blue-900/20";
                  let borderClass = "border-blue-900/40";
                  let textClass = "text-blue-300";
                  
                  if (insight.type === "success") {
                    bgClass = "bg-emerald-900/20";
                    borderClass = "border-emerald-900/40";
                    textClass = "text-emerald-300";
                  } else if (insight.type === "warning") {
                    bgClass = "bg-amber-900/20";
                    borderClass = "border-amber-900/40";
                    textClass = "text-amber-300";
                  }
                  
                  return (
                    <div 
                      key={index}
                      className={`p-2 ${bgClass} rounded-md border ${borderClass} transition-all duration-300 relative 
                                ${isActive ? 'transform scale-[1.02] ring-1 ring-white/20 z-10' : 'opacity-85'}`}
                    >
                      <div className="flex gap-1.5 items-start">
                        <span className={`text-sm leading-none ${isActive ? 'animate-pulse' : ''}`}>{insight.icon}</span>
                        <p className={`text-xs ${textClass}`}>
                          {insight.text}
                        </p>
                      </div>
                      {isActive && (
                        <div className="absolute right-1 top-1 animate-pulse">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </DataCard>
          </div>
          
          {/* 热门技能排行 */}
          <div className="lg:col-span-4 h-[260px]">
            <DataCard title="热门技能榜单" icon={Award} color="from-blue-500 to-sky-700" className="h-full">
              <div className="grid grid-cols-2 gap-1.5 overflow-auto h-[200px] pr-1">
                {[
                  { name: "大语言模型", percentage: 92, color: "bg-blue-500", animate: "animate-pulse" },
                  { name: "AI应用开发", percentage: 87, color: "bg-violet-500" },
                  { name: "云原生开发", percentage: 76, color: "bg-emerald-500", animate: "animate-pulse" },
                  { name: "Web3/区块链", percentage: 65, color: "bg-amber-500" },
                  { name: "网络安全", percentage: 61, color: "bg-rose-500", animate: "animate-pulse" },
                  { name: "DevOps", percentage: 58, color: "bg-sky-500" },
                  { name: "数据分析", percentage: 54, color: "bg-teal-500" },
                  { name: "UI/UX设计", percentage: 49, color: "bg-fuchsia-500", animate: "animate-pulse" },
                ].map((skill, index) => (
                  <div key={index} className="bg-slate-800 border border-slate-700 rounded-md p-1.5 relative overflow-hidden">
                    <div className={`absolute bottom-0 left-0 h-1 ${skill.color} ${skill.animate || ''}`} style={{ width: `${skill.percentage}%` }}></div>
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="font-medium text-xs text-white">{skill.name}</p>
                      <span className="text-xs font-medium text-slate-400">{skill.percentage}%</span>
                    </div>
                    <div className="text-[10px] text-slate-500">兴趣热度</div>
                  </div>
                ))}
              </div>
            </DataCard>
          </div>
        </div>
        
        {/* 数据大屏信息标签 */}
        <div className="flex justify-between mt-1 items-center text-xs text-slate-500">
          <div>© 2024 EduFusion 教育数据平台 v2.4.1</div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>数据实时更新中</span>
          </div>
        </div>
      </main>
    </div>
  );
} 