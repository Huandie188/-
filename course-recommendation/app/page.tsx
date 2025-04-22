"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import CourseRecommendationLanding from "@/components/course-recommendation-landing"

export default function Home() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start p-4 overflow-hidden">
      {/* 返回按钮 */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
          onClick={() => router.push(process.env.NEXT_PUBLIC_VED_INDICATOR_URL || 'http://localhost:3000')}
        >
          <ArrowLeft className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="sr-only">返回</span>
        </Button>
      </div>

      {/* 背景渐变效果 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]"></div>
      <div className="absolute top-0 -z-10 w-full h-full min-h-screen bg-white dark:bg-gray-950 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#88caf7_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#1e40af_100%)]"></div>
      
      {/* 内容区域 */}
      <div className="container max-w-6xl mx-auto pt-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-600 mb-6">智能课程推荐</h1>
        
        <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-950/30 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
          <CourseRecommendationLanding />
        </div>
      </div>
    </main>
  )
}
