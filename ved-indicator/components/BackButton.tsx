"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const pathname = usePathname();
  
  // 如果是主页，不显示返回按钮
  if (pathname === '/') {
    return null;
  }
  
  return (
    <div className="fixed top-20 left-4 z-[9999]">
      <Link href="/">
        <button 
          className="p-3 bg-primary-500/90 hover:bg-primary-600 rounded-full backdrop-blur-sm transition-colors shadow-md"
          aria-label="返回主页"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </Link>
    </div>
  );
} 