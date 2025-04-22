"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, MessageSquareText, Sparkles } from "lucide-react"
import CourseRecommendation from "./course-recommendation"
import AiRecommendation from "./ai-recommendation"

type Mode = "landing" | "survey" | "ai"

export default function CourseRecommendationLanding() {
  const [mode, setMode] = useState<Mode>("landing")
  const [username] = useState("张三")

  if (mode === "survey") {
    return <CourseRecommendation onBack={() => setMode("landing")} username={username} />
  }

  if (mode === "ai") {
    return <AiRecommendation onBack={() => setMode("landing")} username={username} />
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 欢迎消息 */}
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 dark:bg-gray-900/50 border border-blue-100 dark:border-blue-900/20 backdrop-blur-sm">
          <Sparkles className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          <p className="text-gray-700 dark:text-gray-300 font-medium">欢迎回来，{username}！</p>
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-lg text-center text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
          利用AI技术为您精选最适合的学习内容，选择您喜欢的方式获取专属课程推荐。
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="cursor-pointer group" onClick={() => setMode("survey")}>
            <Card className="h-full transition-all duration-300 border bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm border-blue-100 dark:border-blue-900/30 overflow-hidden hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-6 relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300">3分钟快速测评</h2>
                  <p className="text-base text-gray-600 dark:text-gray-300 mb-6">回答几个简单问题，我们将迅速为您匹配最适合的课程，高效节省您的时间。</p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-base px-6 py-2"
                  >
                    开始测评
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="cursor-pointer group" onClick={() => setMode("ai")}>
            <Card className="h-full transition-all duration-300 border bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm border-purple-100 dark:border-purple-900/30 overflow-hidden hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-6 relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquareText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-purple-700 dark:text-purple-300">AI对话推荐</h2>
                  <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
                    告诉AI您的目标，定制专属逆袭计划！支持语音/文字输入，像与导师交流一样自然。
                  </p>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors text-base px-6 py-2"
                  >
                    开始对话
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
