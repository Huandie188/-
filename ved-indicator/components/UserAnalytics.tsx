"use client"

import React from 'react';

// 模拟在线用户数据，显示24小时内的变化
const generateOnlineUserData = () => {
  // 基础值
  const baseValue = 2;
  // 时间段数据点生成
  const hoursData = Array.from({ length: 24 }, (_, i) => {
    // 白天时间段 (8-22点) 增加在线人数
    const isDaytime = i >= 8 && i <= 22;
    // 早高峰与晚高峰有峰值
    const isPeak = (i >= 8 && i <= 9) || (i >= 18 && i <= 21);
    
    let value = baseValue;
    
    if (isDaytime) value += 1;
    if (isPeak) value += Math.random() * 5 + 2;
    
    // 随机波动
    value += Math.random() * 2 - 0.5;
    
    // 最高峰值（模拟突发事件）如果是晚上8点附近
    if (i === 20) value += Math.random() * 25 + 5;
    
    return Math.max(0, Math.round(value * 10) / 10);
  });
  
  return hoursData;
};

export function UserAnalytics() {
  const onlineData = generateOnlineUserData();
  const maxValue = Math.max(...onlineData);
  
  // 将原始数据转换为路径
  const createPath = () => {
    const width = 400;
    const height = 150;
    const points = onlineData.map((value, index) => {
      const x = (index / (onlineData.length - 1)) * width;
      const y = height - (value / maxValue) * height;
      return { x, y };
    });
    
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x},${points[i].y}`;
    }
    
    return path;
  };
  
  // 生成区域图阴影
  const createAreaPath = () => {
    const width = 400;
    const height = 150;
    const points = onlineData.map((value, index) => {
      const x = (index / (onlineData.length - 1)) * width;
      const y = height - (value / maxValue) * height;
      return { x, y };
    });
    
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x},${points[i].y}`;
    }
    
    // 封闭路径到底部
    path += ` L ${points[points.length - 1].x},${height}`;
    path += ` L ${points[0].x},${height}`;
    path += ' Z';
    
    return path;
  };
  
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative flex-1 border border-slate-700/70 rounded-lg overflow-hidden">
        {/* 装饰性边框 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 w-6 h-6 border-t border-l border-cyan-400/50 rounded-tl"></div>
          <div className="absolute right-0 top-0 w-6 h-6 border-t border-r border-cyan-400/50 rounded-tr"></div>
          <div className="absolute left-0 bottom-0 w-6 h-6 border-b border-l border-cyan-400/50 rounded-bl"></div>
          <div className="absolute right-0 bottom-0 w-6 h-6 border-b border-r border-cyan-400/50 rounded-br"></div>
        </div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        {/* 标题 */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 border-b border-slate-700/70">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-green-400 rounded-sm"></div>
            <span className="text-sm font-medium text-white">24小时在线人数</span>
          </div>
          <div className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            实时数据
          </div>
        </div>
        
        {/* 图表区域 */}
        <div className="pt-12 p-4 h-full w-full">
          <svg viewBox="0 0 400 150" className="w-full h-full">
            {/* 渐变定义 */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 255, 155, 0.5)" />
                <stop offset="100%" stopColor="rgba(0, 255, 155, 0)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* 水平网格线 */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line 
                key={`h-line-${i}`} 
                x1="0" 
                y1={150 - ratio * 150} 
                x2="400" 
                y2={150 - ratio * 150} 
                stroke="rgba(148, 163, 184, 0.1)" 
                strokeDasharray="2,3" 
              />
            ))}
            
            {/* 竖直网格线 */}
            {Array.from({ length: 8 }, (_, i) => (
              <line 
                key={`v-line-${i}`} 
                x1={i * 50} 
                y1="0" 
                x2={i * 50} 
                y2="150" 
                stroke="rgba(148, 163, 184, 0.1)" 
                strokeDasharray="2,3" 
              />
            ))}
            
            {/* 底部填充区域 */}
            <path 
              d={createAreaPath()} 
              fill="url(#lineGradient)" 
              opacity="0.2" 
            />
            
            {/* 数据线 */}
            <path 
              d={createPath()} 
              fill="none" 
              stroke="#0ffc98" 
              strokeWidth="2" 
              filter="url(#glow)" 
              className="opacity-70" 
            />
            
            {/* 数据点 */}
            {onlineData.map((value, index) => {
              const x = (index / (onlineData.length - 1)) * 400;
              const y = 150 - (value / maxValue) * 150;
              return (
                <circle 
                  key={`point-${index}`}
                  cx={x}
                  cy={y}
                  r={index === 20 ? 3 : 1.5} // 高峰点稍大
                  fill="#0ffc98"
                  className={index === 20 ? "animate-pulse" : ""} // 高峰点添加脉冲动画
                >
                  {index === 20 && (
                    <title>峰值: {value}人</title>
                  )}
                </circle>
              );
            })}
            
            {/* 时间轴标签 */}
            <g className="time-labels">
              {[0, 6, 12, 18, 23].map((hour, i) => (
                <text 
                  key={`time-${i}`} 
                  x={(hour / 23) * 400} 
                  y="150" 
                  dy="15" 
                  fontSize="10" 
                  fill="#94a3b8" 
                  textAnchor={hour === 0 ? "start" : hour === 23 ? "end" : "middle"}
                >
                  {hour}:00
                </text>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
} 