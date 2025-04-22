"use client"

import { useEffect, useState } from 'react'

export function AnimatedShapes() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // 添加一个简单的光点动画
    const interval = setInterval(() => {
      const dots = document.querySelectorAll('.dot')
      dots.forEach(dot => {
        const newSize = Math.random() * 3 + 1
        const newOpacity = Math.random() * 0.5 + 0.2
        ;(dot as HTMLElement).style.width = `${newSize}px`
        ;(dot as HTMLElement).style.height = `${newSize}px`
        ;(dot as HTMLElement).style.opacity = `${newOpacity}`
      })
    }, 1500)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* 背景粒子 */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="dot absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            transition: 'all 1.5s ease'
          }}
        />
      ))}
      
      {/* 浮动装饰元素 */}
      <div className="absolute left-[15%] top-[15%] h-20 w-20 animate-float-slow rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-md" />
      <div className="absolute left-[70%] top-[25%] h-16 w-16 animate-float-slow-reverse rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20 backdrop-blur-md" />
      <div className="absolute left-[20%] top-[60%] h-24 w-24 animate-float-slow-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-400/20 backdrop-blur-md" />
      <div className="absolute left-[65%] top-[70%] h-12 w-32 animate-float-slow rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-400/20 backdrop-blur-md" />
      
      {/* 动态连接线条 */}
      <svg className="absolute inset-0 h-full w-full opacity-30">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c026d3" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="url(#grad1)" strokeWidth="1" />
        <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="url(#grad1)" strokeWidth="1" />
        <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="url(#grad1)" strokeWidth="1" />
        <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="url(#grad1)" strokeWidth="1" />
      </svg>
    </div>
  )
} 