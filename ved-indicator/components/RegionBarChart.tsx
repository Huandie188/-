"use client"

import React, { useState } from 'react';

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
  const maxValue = Math.max(...regionData.map(item => item.value));
  const minValue = Math.min(...regionData.map(item => item.value));
  const [selectedBar, setSelectedBar] = useState<number | null>(null);

  // 计算最大和最小高度（像素）- 减小最大高度确保底部文字可见
  const maxHeight = 100; // 最高柱子的高度（像素）- 从150减少到100
  const minHeight = 25;  // 最低柱子的高度（像素）- 从35减少到25
  
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
      <div className="h-8 flex justify-between items-center px-3 border-b border-slate-700/60 z-20 relative">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-blue-500 rounded-sm"></div>
          <span className="text-sm font-medium text-white">发帖用户数</span>
        </div>
      </div>
      
      {/* 图表内容 */}
      <div className="h-[calc(100%-32px)] flex flex-col px-4 py-2">
        {/* 最大值和最小值标注 */}
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <div>最高: {maxValue}</div>
          <div>最低: {minValue}</div>
        </div>
        
        {/* 柱状图显示区域 - 调整高度比例，并确保底部有空间显示文字 */}
        <div className="flex-1 flex items-end justify-between px-2" style={{height: 'calc(100% - 70px)'}}>
          {regionData.map((item, index) => {
            // 计算具体高度（像素）- 线性映射从最小值到最大值
            const ratio = (item.value - minValue) / (maxValue - minValue);
            const height = Math.round(minHeight + ratio * (maxHeight - minHeight));
            const isActive = index === selectedBar;
            
            return (
              <div 
                key={index}
                className="flex flex-col items-center group"
                onMouseEnter={() => setSelectedBar(index)}
                onMouseLeave={() => setSelectedBar(null)}
              >
                {/* 值标签 */}
                <div className={`text-center mb-1 text-xs font-medium ${isActive ? 'text-blue-300' : 'text-slate-400'}`}>
                  {item.value}
                </div>
                
                {/* 柱条 - 直接使用固定像素高度 */}
                <div 
                  className={`w-12 rounded-t-md ${isActive ? 'ring-1 ring-blue-400 z-10' : 'opacity-90'}`}
                  style={{ 
                    height: `${height}px`,
                    background: isActive 
                      ? 'linear-gradient(to top, #1e40af, #3b82f6)' 
                      : 'linear-gradient(to top, #1e40af, #60a5fa)',
                    transition: 'all 0.3s ease-out',
                  }}
                >
                  {/* 高亮效果 */}
                  {isActive && (
                    <div className="w-full h-full bg-gradient-to-t from-transparent via-white/10 to-transparent animate-pulse"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 地区名称区域 - 独立出来确保可见 */}
        <div className="h-16 flex justify-between px-2 mt-1">
          {regionData.map((item, index) => {
            const isActive = index === selectedBar;
            return (
              <div key={index} className="flex flex-col items-center">
                {/* 地区名称 */}
                <div className={`text-xs font-medium ${isActive ? 'text-blue-300' : 'text-slate-400'}`}>
                  {item.name}
                </div>
                
                {/* 百分比 */}
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {Math.round((item.value / maxValue) * 100)}%
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 底部刻度线和图例 */}
        <div className="mt-1 pt-1 border-t border-slate-700/30">
          <div className="flex justify-center text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-12 h-1.5 bg-gradient-to-r from-blue-800 to-blue-500 rounded-full"></div>
              <span>{minValue} - {maxValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 