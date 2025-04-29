"use client"

import React, { useState, useEffect } from 'react';

interface CircleStatsProps {
  title: string;
  value: number;
  color: string;
  maxValue?: number;
  icon?: React.ReactNode;
}

export function CircleStats({ title, value, color, maxValue = 100, icon }: CircleStatsProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // 动画效果 - 计数器从0增长到目标值
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2秒完成动画
    
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // 计算当前应该显示的值（使用easeOutQuart缓动函数）
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const t = Math.min(progress / duration, 1);
      const easedT = easeOutQuart(t);
      
      const currentValue = Math.round(easedT * value);
      setAnimatedValue(currentValue);
      
      if (progress < duration) {
        requestAnimationFrame(animateCount);
      }
    };
    
    requestAnimationFrame(animateCount);
    
    return () => {
      startTime = null;
    };
  }, [value]);
  
  // 计算圆环进度的描边偏移（SVG的stroke-dashoffset属性）
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = (value / maxValue) * 100;
  const dashOffset = circumference - (circumference * fillPercentage) / 100;
  
  // 根据颜色获取渐变相关类
  const getGradientClasses = () => {
    switch (color) {
      case 'blue':
        return {
          ringClass: 'stroke-blue-500',
          bgClass: 'bg-blue-500/20',
          textClass: 'text-blue-500',
          borderClass: 'border-blue-500/20',
          shadowClass: 'shadow-blue-500/10',
          glowClass: 'after:bg-blue-500/20',
          gradientFrom: 'from-blue-600',
          gradientTo: 'to-blue-400',
        };
      case 'cyan':
        return {
          ringClass: 'stroke-cyan-500',
          bgClass: 'bg-cyan-500/20',
          textClass: 'text-cyan-500',
          borderClass: 'border-cyan-500/20',
          shadowClass: 'shadow-cyan-500/10',
          glowClass: 'after:bg-cyan-500/20',
          gradientFrom: 'from-cyan-600',
          gradientTo: 'to-cyan-400',
        };
      case 'indigo':
        return {
          ringClass: 'stroke-indigo-500',
          bgClass: 'bg-indigo-500/20',
          textClass: 'text-indigo-500',
          borderClass: 'border-indigo-500/20',
          shadowClass: 'shadow-indigo-500/10',
          glowClass: 'after:bg-indigo-500/20',
          gradientFrom: 'from-indigo-600',
          gradientTo: 'to-indigo-400',
        };
      default:
        return {
          ringClass: 'stroke-slate-500',
          bgClass: 'bg-slate-500/20',
          textClass: 'text-slate-500',
          borderClass: 'border-slate-500/20',
          shadowClass: 'shadow-slate-500/10',
          glowClass: 'after:bg-slate-500/20',
          gradientFrom: 'from-slate-600',
          gradientTo: 'to-slate-400',
        };
    }
  };
  
  const gradient = getGradientClasses();
  
  return (
    <div 
      className={`relative w-full h-full flex flex-col items-center justify-center border border-slate-700/50 rounded-lg ${gradient.shadowClass} overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f4622_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
      
      {/* 四个角的装饰 */}
      <div className="absolute left-0 top-0 w-5 h-5 border-t border-l border-slate-500/50 rounded-tl-sm"></div>
      <div className="absolute right-0 top-0 w-5 h-5 border-t border-r border-slate-500/50 rounded-tr-sm"></div>
      <div className="absolute left-0 bottom-0 w-5 h-5 border-b border-l border-slate-500/50 rounded-bl-sm"></div>
      <div className="absolute right-0 bottom-0 w-5 h-5 border-b border-r border-slate-500/50 rounded-br-sm"></div>
      
      {/* 发光效果 */}
      <div className={`absolute inset-0 after:content-[''] after:absolute after:w-20 after:h-20 after:rounded-full ${gradient.glowClass} after:blur-xl after:opacity-70 after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 ${isHovered ? 'after:scale-125' : ''} after:transition-transform after:duration-300`}></div>
      
      {/* 圆环 */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* 底部轨道圆环 */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(100, 116, 139, 0.2)"
            strokeWidth="6"
          />
        </svg>
        
        {/* 进度圆环 */}
        <svg 
          className={`absolute w-full h-full -rotate-90 transition-all duration-500 ${isHovered ? 'scale-105' : ''}`} 
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${gradient.gradientFrom} stop-opacity:1`} />
              <stop offset="100%" className={`${gradient.gradientTo} stop-opacity:1`} />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`url(#gradient-${color})`}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${isHovered ? 'opacity-90 animate-pulse-subtle' : 'opacity-70'}`}
          />
          
          {/* 首尾的圆点装饰 */}
          <circle
            cx="50"
            cy={50 - radius}
            r="3"
            className={gradient.ringClass}
            filter="url(#glow)"
          />
        </svg>
        
        {/* 滤镜定义 */}
        <svg width="0" height="0">
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </svg>
        
        {/* 中心文字 */}
        <div className={`flex flex-col items-center justify-center ${isHovered ? 'scale-110' : ''} transition-transform duration-300`}>
          <span className={`text-2xl font-bold ${gradient.textClass}`}>
            {animatedValue.toLocaleString()}
          </span>
        </div>
      </div>
      
      {/* 标题 */}
      <div className="text-sm font-medium text-slate-300 mt-2">{title}</div>
    </div>
  );
} 