"use client"

import React, { useState, useEffect } from 'react';

// 热词数据
const hotwords = [
  { text: "大模型应用", value: 86, category: "AI" },
  { text: "ChatGPT", value: 72, category: "AI" },
  { text: "Python实战", value: 65, category: "编程" },
  { text: "前端开发", value: 58, category: "编程" },
  { text: "数据分析", value: 52, category: "数据" },
  { text: "教学课程", value: 48, category: "教育" },
  { text: "微课制作", value: 46, category: "教育" },
  { text: "NLP技术", value: 43, category: "AI" },
  { text: "情感分析", value: 40, category: "AI" },
  { text: "学习路径", value: 39, category: "教育" },
  { text: "React框架", value: 38, category: "编程" },
  { text: "教学反馈", value: 37, category: "教育" },
  { text: "TensorFlow", value: 35, category: "AI" },
  { text: "学习习惯", value: 33, category: "教育" },
  { text: "算法设计", value: 32, category: "编程" },
];

// 根据分类获取颜色 - 更鲜明多彩的配色方案
const getCategoryColor = (category: string) => {
  switch (category) {
    case "AI":
      return { bg: "bg-blue-600", text: "text-white", border: "border-blue-400", shadow: "shadow-blue-500/50" };
    case "编程":
      return { bg: "bg-emerald-600", text: "text-white", border: "border-emerald-400", shadow: "shadow-emerald-500/50" };
    case "教育":
      return { bg: "bg-violet-600", text: "text-white", border: "border-violet-400", shadow: "shadow-violet-500/50" };
    case "数据":
      return { bg: "bg-amber-600", text: "text-white", border: "border-amber-400", shadow: "shadow-amber-500/50" };
    default:
      return { bg: "bg-indigo-600", text: "text-white", border: "border-indigo-400", shadow: "shadow-indigo-500/50" };
  }
};

// 预定义位置 - 使用固定的位置布局而非随机，确保更均匀的分布
const predefinedPositions = [
  { x: 50, y: 50 },  // 中心
  { x: 25, y: 25 },  // 左上
  { x: 75, y: 25 },  // 右上
  { x: 25, y: 75 },  // 左下
  { x: 75, y: 75 },  // 右下
  { x: 50, y: 25 },  // 上中
  { x: 50, y: 75 },  // 下中
  { x: 25, y: 50 },  // 左中
  { x: 75, y: 50 },  // 右中
  { x: 40, y: 40 },  // 中心偏左上
  { x: 60, y: 40 },  // 中心偏右上
  { x: 40, y: 60 },  // 中心偏左下
  { x: 60, y: 60 },  // 中心偏右下
  { x: 35, y: 30 },  // 左上区域
  { x: 65, y: 30 },  // 右上区域
];

// 确保位置对每个词语都有定义，根据需要扩展预定义位置
const getPositionForIndex = (index: number) => {
  if (index < predefinedPositions.length) {
    return predefinedPositions[index];
  } else {
    // 为额外的词语创建新位置
    const basePos = predefinedPositions[index % predefinedPositions.length];
    const offset = Math.floor(index / predefinedPositions.length) * 10;
    return {
      x: (basePos.x + offset) % 85 + 10, // 保持在10-95范围内
      y: (basePos.y + offset) % 85 + 10
    };
  }
};

// 使用Fisher-Yates洗牌算法打乱数组
const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export function HotwordCloud() {
  const [words, setWords] = useState<typeof hotwords>([]);
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
  
  // 初始化时设置词云数据
  useEffect(() => {
    // 按值排序，确保大的词有更优先的位置
    const sortedWords = [...hotwords].sort((a, b) => b.value - a.value);
    setWords(sortedWords);
    
    // 周期性随机高亮某个热词
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * hotwords.length);
      setHighlightedWord(hotwords[randomIndex].text);
      
      // 2秒后取消高亮
      setTimeout(() => {
        setHighlightedWord(null);
      }, 2000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative flex-1 border border-slate-700/50 rounded-lg overflow-hidden bg-slate-800/50">
        {/* 更鲜明的装饰性边框 */}
        <div className="absolute inset-0 pointer-events-none border border-indigo-500/30 rounded-lg"></div>
        
        {/* 更醒目的网格背景 */}
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e522_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        
        {/* 标题 */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 border-b border-slate-700/30 bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-violet-500 rounded-sm"></div>
            <span className="text-sm font-medium text-white">热门话题云图</span>
          </div>
        </div>
        
        {/* 热词云 */}
        <div className="pt-12 p-3 h-full w-full">
          <div className="relative w-full h-full">
            {words.map((word, index) => {
              const isHighlighted = word.text === highlightedWord;
              // 根据值确定大小，但范围更合理
              const scale = 0.6 + (word.value / 100) * 0.9;
              const colors = getCategoryColor(word.category);
              
              // 使用预定义位置
              const position = getPositionForIndex(index);
              
              return (
                <div
                  key={word.text}
                  className={`absolute cursor-pointer px-2 py-1 ${colors.bg} ${colors.text} rounded-md border ${colors.border} whitespace-nowrap transition-all duration-300 ease-in-out ${isHighlighted ? 'z-30 ' + colors.shadow : 'z-10'}`}
                  style={{
                    transform: `translate(-50%, -50%) scale(${scale}) ${isHighlighted ? 'scale(1.1)' : ''}`,
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    opacity: 0.85 + (word.value / 100) * 0.15,
                    boxShadow: isHighlighted ? '0 0 12px rgba(255, 255, 255, 0.4)' : 'none',
                  }}
                  onMouseEnter={() => setHighlightedWord(word.text)}
                  onMouseLeave={() => setHighlightedWord(null)}
                >
                  <span className="text-xs font-medium">{word.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 