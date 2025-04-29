"use client"

import React, { useEffect, useState } from 'react';

// 虚拟数据 - 各省份学习人数数据
const provincesData = [
  { name: "北京", value: 1239, code: "110000" },
  { name: "广东", value: 587, code: "440000" },
  { name: "上海", value: 506, code: "310000" },
  { name: "江苏", value: 362, code: "320000" },
  { name: "山东", value: 320, code: "370000" },
  { name: "浙江", value: 298, code: "330000" },
  { name: "四川", value: 278, code: "510000" },
  { name: "河北", value: 245, code: "130000" },
  { name: "河南", value: 222, code: "410000" },
  { name: "湖北", value: 215, code: "420000" },
  { name: "福建", value: 198, code: "350000" },
  { name: "湖南", value: 187, code: "430000" },
  { name: "陕西", value: 168, code: "610000" },
  { name: "安徽", value: 159, code: "340000" },
  { name: "天津", value: 145, code: "120000" },
  { name: "辽宁", value: 138, code: "210000" },
  { name: "重庆", value: 129, code: "500000" },
  { name: "云南", value: 108, code: "530000" },
  { name: "广西", value: 97, code: "450000" },
  { name: "黑龙江", value: 92, code: "230000" },
  { name: "山西", value: 85, code: "140000" },
  { name: "江西", value: 82, code: "360000" },
  { name: "贵州", value: 76, code: "520000" },
  { name: "吉林", value: 73, code: "220000" },
  { name: "甘肃", value: 65, code: "620000" },
  { name: "内蒙古", value: 53, code: "150000" },
  { name: "新疆", value: 47, code: "650000" },
  { name: "宁夏", value: 42, code: "640000" },
  { name: "海南", value: 39, code: "460000" },
  { name: "青海", value: 35, code: "630000" },
  { name: "西藏", value: 28, code: "540000" },
  { name: "香港", value: 83, code: "810000" },
  { name: "澳门", value: 68, code: "820000" },
  { name: "台湾", value: 94, code: "710000" }
];

// 获取指定值的颜色 - OpenAI风格配色
const getColor = (value: number) => {
  // 使用冷灰色调
  if (value > 1000) return "#64748b"; // slate-500
  if (value > 500) return "#94a3b8";  // slate-400
  if (value > 300) return "#cbd5e1";  // slate-300
  if (value > 200) return "#e2e8f0";  // slate-200
  if (value > 100) return "#f1f5f9";  // slate-100
  return "#f8fafc";                   // slate-50
};

export function ChinaMap() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [highlightedProvince, setHighlightedProvince] = useState<string | null>(null);
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
  const [showPulse, setShowPulse] = useState(false);
  
  // 随机高亮省份的效果 - 更加克制的频率
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * provincesData.length);
      const province = provincesData[randomIndex];
      setHighlightedProvince(province.name);
      
      // 2秒后取消高亮
      setTimeout(() => {
        setHighlightedProvince(null);
      }, 2000);
    }, 10000); // 更长的间隔，减少视觉干扰
    
    return () => clearInterval(interval);
  }, []);
  
  // 随机展示脉冲效果 - 更加克制的频率
  useEffect(() => {
    const pulsesInterval = setInterval(() => {
      // 随机位置坐标
      const x = 150 + Math.random() * 300;
      const y = 100 + Math.random() * 200;
      setCenterPoint({ x, y });
      setShowPulse(true);
      
      setTimeout(() => {
        setShowPulse(false);
      }, 2000);
    }, 8000); // 更长的间隔，减少视觉干扰
    
    return () => clearInterval(pulsesInterval);
  }, []);
  
  // 获取最大数据值
  const maxValue = Math.max(...provincesData.map(item => item.value));
  
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-800/30">
      {/* 简化的扫描线效果 */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(203,213,225,0.03)_30%,rgba(203,213,225,0.05)_50%,rgba(203,213,225,0.03)_70%,transparent_100%)] animate-scan"></div>
      
      {/* 脉冲点效果 - 更加克制 */}
      {showPulse && (
        <div 
          className="absolute w-1.5 h-1.5 rounded-full bg-slate-400 z-20"
          style={{ 
            left: `${centerPoint.x}px`, 
            top: `${centerPoint.y}px`,
            boxShadow: '0 0 15px 1px rgba(203, 213, 225, 0.4)'
          }}
        >
          <div className="absolute inset-0 rounded-full bg-slate-400 animate-ping opacity-75"></div>
          <div className="absolute inset-[-6px] rounded-full border border-slate-400/30 animate-pulse-ring"></div>
        </div>
      )}
      
      {/* 地图SVG */}
      <svg 
        viewBox="0 0 600 400" 
        className="w-full h-full opacity-90 transition-transform duration-300"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
            <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
          </filter>
          <radialGradient id="mapGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* 背景光效 */}
        <circle cx="300" cy="200" r="180" fill="url(#mapGradient)" opacity="0.3" />
        
        {/* 简化版中国地图 */}
        <g>
          {/* 北京 */}
          <circle cx="320" cy="150" r={hoveredProvince === "北京" || highlightedProvince === "北京" ? 10 : 8} 
            fill={getColor(1239)} 
            stroke="#64748b" 
            strokeWidth="0.5"
            opacity="0.85" 
            filter={hoveredProvince === "北京" || highlightedProvince === "北京" ? "url(#glow)" : "none"}
            onMouseEnter={() => setHoveredProvince("北京")}
            onMouseLeave={() => setHoveredProvince(null)}
            className="transition-all duration-300 cursor-pointer"
          />
          <text x="320" y="150" textAnchor="middle" dominantBaseline="middle" fill="#1e293b" fontSize="9" fontWeight="medium">京</text>
          
          {/* 上海 */}
          <circle cx="370" cy="210" r={hoveredProvince === "上海" || highlightedProvince === "上海" ? 9 : 7} 
            fill={getColor(506)} 
            stroke="#64748b" 
            strokeWidth="0.5"
            opacity="0.85"
            filter={hoveredProvince === "上海" || highlightedProvince === "上海" ? "url(#glow)" : "none"}
            onMouseEnter={() => setHoveredProvince("上海")}
            onMouseLeave={() => setHoveredProvince(null)}
            className="transition-all duration-300 cursor-pointer"
          />
          <text x="370" y="210" textAnchor="middle" dominantBaseline="middle" fill="#1e293b" fontSize="8" fontWeight="medium">沪</text>
          
          {/* 广东 */}
          <circle cx="330" cy="280" r={hoveredProvince === "广东" || highlightedProvince === "广东" ? 10 : 8} 
            fill={getColor(587)} 
            stroke="#64748b" 
            strokeWidth="0.5"
            opacity="0.85"
            filter={hoveredProvince === "广东" || highlightedProvince === "广东" ? "url(#glow)" : "none"}
            onMouseEnter={() => setHoveredProvince("广东")}
            onMouseLeave={() => setHoveredProvince(null)}
            className="transition-all duration-300 cursor-pointer"
          />
          <text x="330" y="280" textAnchor="middle" dominantBaseline="middle" fill="#1e293b" fontSize="8" fontWeight="medium">粤</text>
          
          {/* 江苏 */}
          <circle cx="360" cy="190" r={hoveredProvince === "江苏" || highlightedProvince === "江苏" ? 9 : 7} 
            fill={getColor(362)} 
            stroke="#64748b" 
            strokeWidth="0.5"
            opacity="0.85"
            filter={hoveredProvince === "江苏" || highlightedProvince === "江苏" ? "url(#glow)" : "none"}
            onMouseEnter={() => setHoveredProvince("江苏")}
            onMouseLeave={() => setHoveredProvince(null)}
            className="transition-all duration-300 cursor-pointer"
          />
          <text x="360" y="190" textAnchor="middle" dominantBaseline="middle" fill="#1e293b" fontSize="8" fontWeight="medium">苏</text>
          
          {/* 山东 */}
          <circle cx="340" cy="170" r={hoveredProvince === "山东" || highlightedProvince === "山东" ? 9 : 7} 
            fill={getColor(320)} 
            stroke="#64748b" 
            strokeWidth="0.5"
            opacity="0.85"
            filter={hoveredProvince === "山东" || highlightedProvince === "山东" ? "url(#glow)" : "none"}
            onMouseEnter={() => setHoveredProvince("山东")}
            onMouseLeave={() => setHoveredProvince(null)}
            className="transition-all duration-300 cursor-pointer"
          />
          <text x="340" y="170" textAnchor="middle" dominantBaseline="middle" fill="#1e293b" fontSize="8" fontWeight="medium">鲁</text>
          
          {/* 其他省份以简化圆点表示 */}
          {/* 西部 */}
          <circle cx="200" cy="180" r="25" fill="#94a3b8" opacity="0.2" />
          <text x="200" y="180" textAnchor="middle" dominantBaseline="middle" fill="#f8fafc" fontSize="9">西部地区</text>
          
          {/* 华南 */}
          <circle cx="300" cy="300" r="18" fill="#94a3b8" opacity="0.2" />
          <text x="300" y="300" textAnchor="middle" dominantBaseline="middle" fill="#f8fafc" fontSize="9">华南</text>
          
          {/* 东北 */}
          <circle cx="370" cy="100" r="20" fill="#94a3b8" opacity="0.2" />
          <text x="370" y="100" textAnchor="middle" dominantBaseline="middle" fill="#f8fafc" fontSize="9">东北</text>
        </g>
        
        {/* 连线效果 - 更加克制 */}
        <g className="map-connections">
          <line x1="320" y1="150" x2="370" y2="210" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
          <line x1="320" y1="150" x2="330" y2="280" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
          <line x1="320" y1="150" x2="360" y2="190" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
          <line x1="320" y1="150" x2="340" y2="170" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
        </g>
        
        {/* 图例 - 更加简洁 */}
        <g transform="translate(20, 320)">
          <text x="0" y="0" fill="#f8fafc" fontSize="9" fontWeight="medium">数据分布</text>
          <rect x="0" y="10" width="12" height="8" fill="#64748b" rx="1" />
          <text x="16" y="16" fill="#94a3b8" fontSize="7">1000+</text>
          <rect x="0" y="22" width="12" height="8" fill="#94a3b8" rx="1" />
          <text x="16" y="28" fill="#94a3b8" fontSize="7">500+</text>
          <rect x="0" y="34" width="12" height="8" fill="#cbd5e1" rx="1" />
          <text x="16" y="40" fill="#94a3b8" fontSize="7">300+</text>
          <rect x="0" y="46" width="12" height="8" fill="#e2e8f0" rx="1" />
          <text x="16" y="52" fill="#94a3b8" fontSize="7">100+</text>
        </g>
        
        {/* 弹出信息 - 更加现代化 */}
        {hoveredProvince && (
          <g className="popup" transform={`translate(${hoveredProvince === "北京" ? 340 : hoveredProvince === "广东" ? 350 : 390}, ${hoveredProvince === "北京" ? 140 : hoveredProvince === "广东" ? 270 : 200})`}>
            <rect x="0" y="0" width="80" height="32" rx="3" fill="rgba(30, 41, 59, 0.85)" stroke="#475569" strokeWidth="0.5" />
            <text x="8" y="14" fill="#f8fafc" fontSize="9" fontWeight="medium">{hoveredProvince}</text>
            <text x="8" y="26" fill="#94a3b8" fontSize="8">
              {provincesData.find(p => p.name === hoveredProvince)?.value || 0} 用户
            </text>
          </g>
        )}
      </svg>
      
      {/* 简化的边框装饰 */}
      <div className="absolute inset-0 border border-slate-700/30 rounded-lg pointer-events-none"></div>
    </div>
  );
} 