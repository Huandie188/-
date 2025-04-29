"use client"

import React, { useState, useEffect } from 'react';

// 地区数据
const regionData = [
  { name: "北京", value: 1239 },
  { name: "上海", value: 856 },
  { name: "广东", value: 687 },
  { name: "江苏", value: 542 },
  { name: "浙江", value: 498 },
  { name: "山东", value: 420 }
];

export function RegionBarChart() {
  // 直接使用固定值而不是动画效果
  const maxValue = Math.max(...regionData.map(item => item.value));
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-700/70 bg-slate-800/60">
      {/* 装饰性边框 */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-0 top-0 w-6 h-6 border-t border-l border-blue-500/60 rounded-tl"></div>
        <div className="absolute right-0 top-0 w-6 h-6 border-t border-r border-blue-500/60 rounded-tr"></div>
        <div className="absolute left-0 bottom-0 w-6 h-6 border-b border-l border-blue-500/60 rounded-bl"></div>
        <div className="absolute right-0 bottom-0 w-6 h-6 border-b border-r border-blue-500/60 rounded-br"></div>
      </div>
      
      {/* 标题 */}
      <div className="h-10 flex justify-between items-center px-3 border-b border-slate-700/60 z-20 relative">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-blue-500 rounded-sm"></div>
          <span className="text-sm font-medium text-white">发帖用户数</span>
        </div>
      </div>
      
      {/* 图表内容 */}
      <div className="pt-6 px-4 pb-10 h-[calc(100%-40px)] flex flex-col">
        {/* 数据显示区域 */}
        <div className="flex h-48 items-end justify-between gap-2 mb-10 relative">
          {/* 背景网格线 - 水平 */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-px bg-slate-700/30"></div>
            ))}
          </div>
          
          {/* 柱状图 */}
          {regionData.map((item, index) => {
            // 调整百分比计算，让较小的值也有明显的高度
            // 使用60%作为最小高度，100%作为最大高度
            const percentage = 60 + (item.value / maxValue) * 40;
            const isActive = index === selectedBar;
            
            return (
              <div 
                key={index}
                className="relative flex flex-col items-center group"
                style={{ width: `calc(100% / ${regionData.length})` }}
                onMouseEnter={() => setSelectedBar(index)}
                onMouseLeave={() => setSelectedBar(null)}
              >
                {/* 值标签 */}
                <div className={`absolute -top-6 text-center text-xs font-medium transition-all duration-300 ${isActive ? 'text-blue-300' : 'text-slate-400'}`}>
                  {item.value}
                </div>
                
                {/* 柱条 */}
                <div 
                  className={`w-8 relative rounded-t-md overflow-hidden ${isActive ? 'z-10' : ''}`}
                  style={{ 
                    height: `${percentage}%`,
                    minHeight: '20px',
                    transition: 'all 0.3s ease-out',
                  }}
                >
                  {/* 柱条背景 */}
                  <div 
                    className={`absolute inset-0 ${isActive ? 'bg-blue-500' : 'bg-blue-600/80'} transition-colors duration-300`}
                  >
                    {/* 高亮动画 */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                {/* 地区名称 */}
                <div className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-300' : 'text-slate-400'} transition-colors duration-300`}>
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 底部刻度线 */}
        <div className="h-px w-full bg-gradient-to-r from-blue-900/30 via-blue-500/50 to-blue-900/30"></div>
      </div>
      
      {/* 装饰性网格背景 */}
      <div className="absolute inset-0 bg-grid-dot-pattern opacity-10 pointer-events-none"></div>
    </div>
  );
} 