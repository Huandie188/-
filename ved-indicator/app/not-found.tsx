"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  // 记录404错误，便于调试
  useEffect(() => {
    console.log("404页面被访问，路径:", window.location.pathname)
  }, [])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">页面未找到</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          很抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或返回首页。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              返回首页
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  )
} 