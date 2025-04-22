"use client"

import { useState } from "react"
import Header from "@/components/header"
import LearningPathTree from "@/components/learning-path-tree"
import { Button } from "@/components/ui/button"
import { DownloadIcon, FileIcon, Sparkles, BookOpen, ChevronRight, GraduationCap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { learningPaths } from "@/lib/learning-paths-data"

export default function Home() {
  const [selectedPathId, setSelectedPathId] = useState("computer-science");
  
  const selectedPath = learningPaths.find(path => path.id === selectedPathId) || learningPaths[0];
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed top-20 left-8 z-[99999]">
        {process.env.NEXT_PUBLIC_VED_INDICATOR_URL ? (
          <Link href={process.env.NEXT_PUBLIC_VED_INDICATOR_URL}>
            <button 
              className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full backdrop-blur-sm transition-colors shadow-xl border-2 border-white/20 animate-pulse"
              aria-label="返回主页"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
        ) : (
          <button 
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full backdrop-blur-sm transition-colors shadow-xl border-2 border-white/20 animate-pulse"
            aria-label="返回主页"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
      
      <Header />
      
      {/* 背景图案 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_120%)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]"></div>
      </div>
      
      {/* 英雄区 */}
      <section className="pt-8 pb-8 md:pt-12 md:pb-12 relative">
        <div className="openai-container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="openai-heading mb-6 relative">
              {selectedPath.title}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"> 
                学习路线 
              </span>
              <div className="absolute -top-6 -right-6 text-blue-600 dark:text-blue-400 animate-pulse">
                <Sparkles className="h-5 w-5" />
              </div>
            </h1>
            <p className="openai-subheading mb-8">
              由 AI 智能分析规划，助你高效系统地学习{selectedPath.title}知识体系
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="openai-button px-5 py-2 h-11">
                <GraduationCap className="mr-2 h-4 w-4" />
                开始学习
              </Button>
              <Button variant="outline" className="openai-button px-5 py-2 h-11">
                <FileIcon className="mr-2 h-4 w-4" />
                浏览课程资源
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 领域选择 */}
      <section className="pb-8 md:pb-12">
        <div className="openai-container">
          <h2 className="text-xl font-semibold tracking-tight mb-4 text-center">
            选择学习领域
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col items-center text-center gap-2 hover:shadow-md ${
                  selectedPathId === path.id 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 ring-2 ring-blue-500/50" 
                    : "border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
                onClick={() => setSelectedPathId(path.id)}
              >
                <div className={`w-10 h-10 rounded-full ${path.color} flex items-center justify-center text-white`}>
                  {path.icon}
                </div>
                <h3 className="font-medium text-sm">{path.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 学习路线提示卡片 */}
      <section className="py-4">
        <div className="openai-container">
          <div className="mb-8 mx-auto max-w-3xl">
            <div className="openai-card gradient-border p-6 flex flex-col md:flex-row items-center gap-4 relative">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium mb-1">AI 生成的学习路线</h3>
                <p className="text-muted-foreground text-sm">
                  这个个性化学习路线由 EduFusion AI 系统生成，基于{selectedPath.title}课程体系和行业需求，旨在帮助您高效地规划学习进度。
                </p>
              </div>
              <Button variant="outline" size="sm" className="openai-button mt-3 md:mt-0 flex-shrink-0">
                了解更多
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* 学习路线 */}
      <section className="py-8 md:py-16 bg-gray-50/50 dark:bg-gray-900/20 border-t border-b relative">
        <div className="openai-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-1">{selectedPath.title}学习路线图</h2>
              <p className="text-muted-foreground">跟随路线图系统化学习，掌握关键技能</p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" className="h-9">
                <DownloadIcon className="mr-1 h-4 w-4" />
                导出路线图
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 md:p-6 shadow-sm">
            <LearningPathTree treeData={selectedPath.data} />
          </div>
        </div>
      </section>
      
      {/* 学习建议 */}
      <section className="py-12 md:py-24">
        <div className="openai-container">
          <h2 className="text-2xl font-semibold tracking-tight mb-8 text-center">高效学习建议</h2>
          <div className="openai-grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                title: "循序渐进",
                icon: <GraduationCap className="h-5 w-5" />,
                description: "按照路线图顺序学习，确保基础知识扎实后再进阶"
              },
              {
                title: "动手实践",
                icon: <BookOpen className="h-5 w-5" />,
                description: "学习需要大量实践，每学一个概念就尝试应用相关知识"
              },
              {
                title: "定期复习",
                icon: <Sparkles className="h-5 w-5" />,
                description: "使用间隔重复法，定期回顾已学内容，巩固记忆"
              },
            ].map((item, i) => (
              <div key={i} className="openai-card hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-blue-100 dark:bg-blue-900/30 h-8 w-8 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 页脚 */}
      <footer className="mt-auto py-8 border-t">
        <div className="openai-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                E
              </div>
              <span className="text-sm font-medium">EduFusion © 2024</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">关于我们</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">隐私政策</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">使用条款</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">帮助中心</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
