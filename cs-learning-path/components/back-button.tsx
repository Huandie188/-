"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const pathname = usePathname();
  
  // 所有页面都显示返回按钮
  return (
    <div className="fixed top-28 left-8 z-[99999]">
      <Link href={process.env.NEXT_PUBLIC_VED_INDICATOR_URL || "http://localhost:3000"}>
        <button 
          className="p-4 bg-blue-600 hover:bg-blue-700 rounded-full backdrop-blur-sm transition-colors shadow-lg border-2 border-white/20"
          aria-label="返回主页"
        >
          <ArrowLeft className="w-8 h-8 text-white" />
        </button>
      </Link>
    </div>
  );
} 