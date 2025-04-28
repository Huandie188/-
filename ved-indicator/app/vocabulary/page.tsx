"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Book, ChevronLeft, ChevronRight, Repeat, Star, Check, HelpCircle, Volume2, Volume } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// 模拟单词数据
const mockVocabulary = [
  { id: 1, word: "apple", meaning: "苹果", example: "I eat an apple every day.", difficulty: "简单" },
  { id: 2, word: "banana", meaning: "香蕉", example: "Monkeys love to eat bananas.", difficulty: "简单" },
  { id: 3, word: "computer", meaning: "电脑", example: "I bought a new computer last week.", difficulty: "中等" },
  { id: 4, word: "algorithm", meaning: "算法", example: "This algorithm is very efficient.", difficulty: "困难" },
  { id: 5, word: "implementation", meaning: "实现", example: "The implementation of this feature will take time.", difficulty: "困难" },
  { id: 6, word: "education", meaning: "教育", example: "Education is important for everyone.", difficulty: "中等" },
  { id: 7, word: "university", meaning: "大学", example: "She studies at a prestigious university.", difficulty: "中等" },
  { id: 8, word: "dictionary", meaning: "字典", example: "I always use a dictionary when learning new words.", difficulty: "中等" },
  { id: 9, word: "vocabulary", meaning: "词汇", example: "I'm trying to expand my vocabulary.", difficulty: "中等" },
  { id: 10, word: "language", meaning: "语言", example: "Chinese is a complex language to learn.", difficulty: "简单" },
]

export default function VocabularyPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [learned, setLearned] = useState<number[]>([])
  const [difficulty, setDifficulty] = useState<"all" | "简单" | "中等" | "困难">("all")
  const [isSpeaking, setIsSpeaking] = useState(false)
  
  // 根据难度过滤单词
  const filteredWords = difficulty === "all" 
    ? mockVocabulary 
    : mockVocabulary.filter(word => word.difficulty === difficulty)
    
  const currentWord = filteredWords[currentWordIndex]
  const progress = (currentWordIndex / (filteredWords.length - 1)) * 100
  
  useEffect(() => {
    // 模拟加载
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleNext = () => {
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(prevIndex => prevIndex + 1)
      setShowMeaning(false)
    }
  }
  
  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prevIndex => prevIndex - 1)
      setShowMeaning(false)
    }
  }
  
  const toggleLearned = (id: number) => {
    if (learned.includes(id)) {
      setLearned(prev => prev.filter(wordId => wordId !== id))
    } else {
      setLearned(prev => [...prev, id])
    }
  }
  
  const speakWord = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  }
  
  // 骨架屏组件
  const SkeletonContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4 animate-pulse">
        <div className="h-12 bg-muted rounded-lg w-full" />
        <div className="h-52 bg-muted rounded-lg w-full" />
        <div className="flex justify-between">
          <div className="h-10 w-24 bg-muted rounded-lg" />
          <div className="h-10 w-24 bg-muted rounded-lg" />
        </div>
      </div>
      <div className="space-y-4 animate-pulse">
        <div className="h-32 bg-muted rounded-lg w-full" />
        <div className="h-32 bg-muted rounded-lg w-full" />
      </div>
    </div>
  )

  // 获取难度对应的样式
  const getDifficultyStyle = (difficulty: string) => {
    switch(difficulty) {
      case "简单":
        return "bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 dark:from-emerald-950/50 dark:to-emerald-900/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30";
      case "中等":
        return "bg-gradient-to-r from-blue-50 to-sky-50 text-sky-700 dark:from-sky-950/50 dark:to-sky-900/50 dark:text-sky-400 border-sky-200 dark:border-sky-800/30";
      case "困难":
        return "bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 dark:from-rose-950/50 dark:to-rose-900/50 dark:text-rose-400 border-rose-200 dark:border-rose-800/30";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 dark:from-gray-800 dark:to-gray-700 dark:text-gray-300";
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      {/* 复用与主页相同的顶栏 */}
      <header className="fixed top-0 z-50 w-full border-b bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <img src="/5.png" alt="EduFusion" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">EduFusion</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium flex-1 justify-center">
            {process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL ? (
              <Link href={process.env.NEXT_PUBLIC_COURSE_RECOMMENDATION_URL} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                AI课程推荐
              </Link>
            ) : null}
            <Link href="/courses" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              在线课程
            </Link>
            <Link href="/pomodoro" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              番茄钟
            </Link>
            {process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL ? (
              <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                个人学习路线
              </Link>
            ) : null}
            <Link href="/vocabulary" className="transition-colors text-primary-600 py-1 border-b-2 border-primary-500">
              背单词
            </Link>
            <Link href="/profile" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              个人信息
            </Link>
            <Link href="/community" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              用户社区
            </Link>
          </nav>
          <div className="flex items-center gap-4 w-[180px] justify-end">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">返回首页</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 pt-20 md:pt-20 pb-4">
        <div className="container max-w-7xl">
          {/* 页面标题和返回按钮 */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              单词学习
            </h1>
            <Link href="/">
              <Button variant="ghost" size="sm" className="group gap-2 hover:bg-primary-50 hover:text-primary-600">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                返回首页
              </Button>
            </Link>
          </div>
          
          {/* 两栏布局 */}
          {isLoading ? (
            <SkeletonContent />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧栏 - 单词卡片 */}
              <div className="lg:col-span-2 space-y-4">
                {/* 单词卡片 */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 via-white/40 to-gray-50/80 dark:from-gray-900/80 dark:via-gray-950/40 dark:to-gray-900/80 rounded-xl blur-xl opacity-70 -z-10 transform scale-[0.96]"></div>
                
                  <Card className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium",
                          getDifficultyStyle(currentWord.difficulty)
                        )}>
                          {currentWord.difficulty}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className={`rounded-full transition-all duration-300 ${learned.includes(currentWord.id) ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                          onClick={() => toggleLearned(currentWord.id)}
                        >
                          <Star className={`h-5 w-5 ${learned.includes(currentWord.id) ? 'fill-yellow-500' : ''}`} />
                        </Button>
                      </div>
                      
                      <div className="py-6 text-center">
                        <div className="flex flex-col items-center mb-4">
                          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{currentWord.word}</h2>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="rounded-full text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 mt-2"
                            onClick={() => speakWord(currentWord.word)}
                            disabled={isSpeaking}
                          >
                            {isSpeaking ? (
                              <Volume2 className="h-5 w-5 animate-pulse text-primary-600" />
                            ) : (
                              <Volume className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        
                        {showMeaning ? (
                          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
                            <p className="text-2xl font-medium text-primary-600 dark:text-primary-400">{currentWord.meaning}</p>
                            <p className="text-md italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 py-2 px-4 rounded-xl border-l-4 border-primary-200 dark:border-primary-800 max-w-xl mx-auto">
                              {currentWord.example}
                            </p>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="rounded-full px-6 py-2 h-10 text-sm shadow-sm hover:shadow-md transition-all duration-300 border-gray-300 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 bg-white dark:bg-gray-900 mt-4"
                            onClick={() => setShowMeaning(true)}
                          >
                            <HelpCircle className="h-4 w-4 mr-2 text-primary-500" />
                            显示含义
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* 导航按钮 */}
                <div className="flex justify-between mt-3">
                  <Button 
                    variant="outline" 
                    className="gap-2 rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 group"
                    onClick={handlePrevious}
                    disabled={currentWordIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    上一个
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      className="gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        setShowMeaning(!showMeaning)
                      }}
                    >
                      <Book className="h-4 w-4 text-primary-500" />
                      {showMeaning ? "隐藏含义" : "显示含义"}
                    </Button>
                    
                    <Button 
                      variant={learned.includes(currentWord.id) ? "destructive" : "secondary"}
                      className={`gap-2 rounded-full ${learned.includes(currentWord.id) ? 'hover:bg-red-600' : 'hover:bg-primary-600'}`}
                      onClick={() => toggleLearned(currentWord.id)}
                    >
                      {learned.includes(currentWord.id) ? (
                        <>
                          <Check className="h-4 w-4" />
                          取消标记
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4" />
                          标记为已学
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <Button 
                    variant="default" 
                    className="gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 border-0 group"
                    onClick={handleNext}
                    disabled={currentWordIndex === filteredWords.length - 1}
                  >
                    下一个
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
                
                {/* 进度展示 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        进度: <span className="text-gray-900 dark:text-gray-100">{currentWordIndex + 1} / {filteredWords.length}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative h-[26px] flex items-center w-full sm:w-44">
                    <Progress value={progress} className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner" />
                    <div 
                      className="absolute h-3 w-3 rounded-full bg-primary-500 border-2 border-white dark:border-gray-900 shadow-md transition-all duration-300"
                      style={{ left: `calc(${progress}% - 6px)` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* 右侧栏 - 学习统计和难度选择器 */}
              <div className="space-y-4">
                {/* 难度选择器 */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">难度筛选</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={difficulty === "all" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-lg text-sm"
                      onClick={() => {
                        setDifficulty("all")
                        setCurrentWordIndex(0)
                        setShowMeaning(false)
                      }}
                    >
                      全部
                    </Button>
                    <Button 
                      variant={difficulty === "简单" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-lg text-sm"
                      onClick={() => {
                        setDifficulty("简单")
                        setCurrentWordIndex(0)
                        setShowMeaning(false)
                      }}
                    >
                      简单
                    </Button>
                    <Button 
                      variant={difficulty === "中等" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-lg text-sm"
                      onClick={() => {
                        setDifficulty("中等")
                        setCurrentWordIndex(0)
                        setShowMeaning(false)
                      }}
                    >
                      中等
                    </Button>
                    <Button 
                      variant={difficulty === "困难" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-lg text-sm"
                      onClick={() => {
                        setDifficulty("困难")
                        setCurrentWordIndex(0)
                        setShowMeaning(false)
                      }}
                    >
                      困难
                    </Button>
                  </div>
                </div>
                
                {/* 学习统计 */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">学习进度</h3>
                    <Badge variant="outline" className="font-normal py-1 px-2 text-xs border-gray-300 dark:border-gray-700">
                      已学习: <span className="font-medium ml-1 text-primary-600 dark:text-primary-400">{learned.length}</span> / {mockVocabulary.length}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span className="text-gray-600 dark:text-gray-400">总进度</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{Math.round((learned.length / mockVocabulary.length) * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-purple-500" 
                          style={{ width: `${(learned.length / mockVocabulary.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 block">简单</span>
                        <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                          {learned.filter(id => mockVocabulary.find(w => w.id === id)?.difficulty === "简单").length}/
                          {mockVocabulary.filter(w => w.difficulty === "简单").length}
                        </span>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 block">中等</span>
                        <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                          {learned.filter(id => mockVocabulary.find(w => w.id === id)?.difficulty === "中等").length}/
                          {mockVocabulary.filter(w => w.difficulty === "中等").length}
                        </span>
                      </div>
                      <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-2 text-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 block">困难</span>
                        <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                          {learned.filter(id => mockVocabulary.find(w => w.id === id)?.difficulty === "困难").length}/
                          {mockVocabulary.filter(w => w.difficulty === "困难").length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 学习提示 */}
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800/30 p-4">
                  <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100 mb-2">学习小贴士</h3>
                  <p className="text-xs text-primary-700 dark:text-primary-300">
                    词汇学习最有效的方法是每天坚持、分散记忆。建议每天学习10-20个新单词，并定期复习已学习的内容。
                  </p>
                </div>
                
                {/* 最近学习的单词 */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">最近学习的单词</h3>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                    {learned.length > 0 ? (
                      [...learned].reverse().slice(0, 5).map(id => {
                        const word = mockVocabulary.find(w => w.id === id);
                        if (!word) return null;
                        return (
                          <div key={id} className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
                            <span className="font-medium text-gray-900 dark:text-gray-100">{word.word}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{word.meaning}</span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center py-2">
                        尚未学习任何单词
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 