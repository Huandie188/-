"use client";

import { useEffect, useState } from 'react';

export default function MapParticles() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 如果不是客户端，不渲染任何内容，避免服务器端生成随机值
  if (!isClient) return null;

  return (
    <div className="absolute inset-0">
      {/* 东南沿海地区亮点 - 密度较大 */}
      {[...Array(40)].map((_, i) => (
        <div 
          key={`southeast-${i}`}
          className={`absolute w-2 h-2 rounded-full ${
            i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-amber-400' : 'bg-violet-400'
          } opacity-80 shadow-[0_0_10px_currentColor] animate-pulse`}
          style={{
            left: `${56 + Math.random() * 16}%`, // 东南沿海区域 (56%-72%)
            top: `${52 + Math.random() * 23}%`,  // 下半部分和中部偏下
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* 中部地区亮点 - 密度中等 */}
      {[...Array(30)].map((_, i) => (
        <div 
          key={`central-${i}`}
          className={`absolute w-2 h-2 rounded-full ${
            i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-amber-400' : 'bg-violet-400'
          } opacity-80 shadow-[0_0_10px_currentColor] animate-pulse`}
          style={{
            left: `${35 + Math.random() * 18}%`, // 中部区域 (35%-53%)
            top: `${35 + Math.random() * 30}%`,  // 中部纵向分布
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* 西北地区亮点 - 密度较小 */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={`northwest-${i}`}
          className={`absolute w-2 h-2 rounded-full ${
            i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-amber-400' : 'bg-violet-400'
          } opacity-80 shadow-[0_0_10px_currentColor] animate-pulse`}
          style={{
            left: `${24 + Math.random() * 10}%`, // 西北区域，缩小范围避免超出边界
            top: `${25 + Math.random() * 15}%`,  // 上半部分，确保不超出上边缘
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* 东北地区亮点 - 适量分布 */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={`northeast-${i}`}
          className={`absolute w-2 h-2 rounded-full ${
            i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-amber-400' : 'bg-violet-400'
          } opacity-80 shadow-[0_0_10px_currentColor] animate-pulse`}
          style={{
            left: `${66 + Math.random() * 10}%`, // 东北区域，缩小范围
            top: `${18 + Math.random() * 17}%`,  // 上半部分，避开最上边缘
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* 西南地区亮点 - 适量分布 */}
      {[...Array(18)].map((_, i) => (
        <div 
          key={`southwest-${i}`}
          className={`absolute w-2 h-2 rounded-full ${
            i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-amber-400' : 'bg-violet-400'
          } opacity-80 shadow-[0_0_10px_currentColor] animate-pulse`}
          style={{
            left: `${27 + Math.random() * 13}%`, // 西南区域
            top: `${60 + Math.random() * 15}%`,  // 下半部分，避开底边
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
} 