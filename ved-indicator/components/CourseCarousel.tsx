"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, GraduationCap, Lightbulb, Users, BookOpen, Book } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CourseCardProps {
  title: string;
  progress: number;
  steps: {
    id: number;
    title: string;
    status: "completed" | "inProgress" | "locked";
    progress: number;
  }[];
  badges?: { text: string; type: "hot" | "new" | "recommended" }[];
}

interface ImageCardProps {
  type: "certification" | "itbooks";
  title: string;
  description: string;
  buttonText: string;
}

// 课程数据
const courseData: CourseCardProps[] = [
  {
    title: "机器学习基础",
    progress: 38,
    badges: [{ text: "热门领域", type: "hot" }],
    steps: [
      {
        id: 1,
        title: "数学与统计学基础",
        status: "completed",
        progress: 100
      },
      {
        id: 2,
        title: "Python编程与数据处理",
        status: "inProgress",
        progress: 60
      },
      {
        id: 3,
        title: "机器学习算法与应用",
        status: "locked",
        progress: 0
      }
    ]
  }
]

// 图片卡片数据
const imageCardData: ImageCardProps[] = [
  {
    type: "certification",
    title: "认证学习会员",
    description: "DeepSeek助教 | 3600+认证好课 | 免费获取证书",
    buttonText: "立即开通"
  },
  {
    type: "itbooks",
    title: "IT黑皮丛书PDF版本",
    description: "经典编程书籍，覆盖前后端、算法、系统架构等多个领域",
    buttonText: "点击查看"
  }
]

export const CourseCard = ({ course }: { course: CourseCardProps }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900/50 dark:to-blue-900/50 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative rounded-lg bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 flex flex-col justify-between border overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold">{course.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">完成度: {course.progress}%</p>
              {course.badges?.map((badge, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className={`text-[10px] py-0 h-4 
                    ${badge.type === 'hot' ? 'border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20' : 
                      badge.type === 'new' ? 'border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 
                      'border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                    }`
                  }
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <p className="font-medium">完成进度</p>
              <p className="text-sm font-medium text-primary-600">{course.progress}%</p>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-blue-500" 
                style={{ width: `${course.progress}%` }}
              >
                <div className="w-full h-full animate-shimmer"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {course.steps.map((step) => (
              <div key={step.id} className="flex gap-2 text-sm">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
                  step.status === 'completed' ? 'bg-gradient-to-br from-primary-500 to-violet-500' : 
                  step.status === 'inProgress' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 
                  'bg-gray-200 dark:bg-gray-700 text-white/70'
                } shadow-sm`}>
                  <span className="text-xs">{step.id}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className={`font-medium ${step.status === 'locked' ? 'text-muted-foreground' : ''}`}>{step.title}</p>
                    <span className={`text-xs ${
                      step.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
                      step.status === 'inProgress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 
                      'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    } px-2 rounded-full`}>
                      {step.status === 'completed' ? '完成' : 
                       step.status === 'inProgress' ? '学习中' : 
                       '待解锁'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${
                      step.status === 'completed' ? 'bg-green-500' : 
                      step.status === 'inProgress' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 
                      'bg-gray-200 dark:bg-gray-700'
                    }`} style={{ width: `${step.progress}%` }}>
                      {step.status === 'inProgress' && <div className="w-full h-full animate-shimmer"></div>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-br from-primary-500/10 to-amber-500/10 rounded-full blur-xl"></div>
      </div>
    </div>
  )
}

export const ImageCard = ({ card }: { card: ImageCardProps }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 z-10"></div>
      
      {card.type === "certification" ? (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-600 bg-opacity-80">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute left-10 top-10 w-20 h-20 rounded-full border-4 border-dashed border-amber-200/30 rotate-12"></div>
            <div className="absolute right-10 bottom-20 w-16 h-16 rounded-full border-4 border-dashed border-amber-200/30 -rotate-12"></div>
            <div className="absolute right-1/4 top-1/4 w-12 h-12 bg-amber-400/10 rotate-45"></div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950 bg-opacity-90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            <div className="absolute left-10 top-10 w-20 h-24 border-2 border-blue-400/20 transform rotate-6"></div>
            <div className="absolute right-10 bottom-20 w-14 h-20 border-2 border-blue-400/20 transform -rotate-3"></div>
            <div className="absolute right-1/4 top-1/3 w-8 h-8 border-2 border-blue-400/20 transform rotate-12"></div>
          </div>
        </div>
      )}
      
      <div className="relative z-20 flex flex-col justify-between h-full p-5">
        {/* 卡片徽标 */}
        {card.type === "certification" && (
          <div className="absolute top-3 right-3">
            <div className="bg-amber-500/90 text-white text-xs font-bold rounded-full px-3 py-1 rotate-12 shadow-lg">
              学海破浪
            </div>
          </div>
        )}
        
        {card.type === "itbooks" && (
          <div className="absolute top-3 right-3">
            <div className="bg-blue-600/90 text-white text-xs font-bold rounded-full px-3 py-1 rotate-12 shadow-lg">
              新上线
            </div>
          </div>
        )}
        
        <div className="flex-1 flex flex-col justify-center">
          {card.type === "certification" ? (
            <>
              <div className="flex flex-col items-start mb-3">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 mr-3 rounded-lg bg-amber-500/70 flex items-center justify-center">
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-white/80 text-xs uppercase tracking-wider font-semibold bg-amber-700/60 px-2 py-1 rounded">会员专属</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{card.title}</h3>
                <p className="text-amber-200 text-sm mb-4">{card.description}</p>
                
                <div className="flex gap-2 mt-1 mb-1">
                  {['认证课程', '学习路径', '就业指导'].map((tag, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-amber-800/60 text-amber-200 border border-amber-700/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-start mb-2">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 mr-3 rounded-lg bg-blue-600/70 flex items-center justify-center">
                    <Book className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-white/80 text-xs uppercase tracking-wider font-semibold bg-blue-800/60 px-2 py-1 rounded">精选系列</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-blue-200 text-sm mb-6 max-w-[90%]">{card.description}</p>
                
                <div className="flex gap-2 mt-2 mb-1">
                  {['前端开发', '算法理论', '系统架构', '网络安全'].map((tag, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-700/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {card.type === "certification" ? (
          <Link href="/membership" className="w-full">
            <Button 
              className="w-full rounded-full shadow-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              {card.buttonText}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Link href="/resources" className="w-full">
            <Button 
              className="w-full rounded-full shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              {card.buttonText}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        )}
        
        {/* 装饰元素 */}
        {card.type === "certification" ? (
          <>
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-amber-500/20 blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-amber-600/20 blur-2xl"></div>
            <div className="absolute bottom-12 right-8 flex flex-col items-center transform rotate-12">
              <div className="w-16 h-20 bg-amber-900 border border-amber-700/50 rounded shadow-md relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-500 to-amber-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 text-amber-200/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-16 h-20 bg-amber-800 border border-amber-700/50 rounded shadow-md relative overflow-hidden -mt-16 ml-4">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-600 to-amber-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 text-amber-200/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-600/20 blur-2xl"></div>
            <div className="absolute bottom-12 right-8 flex flex-col items-center transform rotate-12">
              <div className="w-16 h-20 bg-blue-950 border border-blue-800/50 rounded shadow-md relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 text-blue-200/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-16 h-20 bg-slate-950 border border-blue-800/50 rounded shadow-md relative overflow-hidden -mt-16 ml-4">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-800 to-indigo-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 text-indigo-200/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export const CourseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    if (isSliding) return
    setIsSliding(true)
    setActiveIndex((prev) => (prev === courseData.length + imageCardData.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsSliding(false), 600) // 增加过渡时间到600ms
  }, [isSliding])

  const prevSlide = useCallback(() => {
    if (isSliding) return
    setIsSliding(true)
    setActiveIndex((prev) => (prev === 0 ? courseData.length + imageCardData.length - 1 : prev - 1))
    setTimeout(() => setIsSliding(false), 600) // 增加过渡时间到600ms
  }, [isSliding])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && !isSliding) {
      nextSlide()
    }

    if (isRightSwipe && !isSliding) {
      prevSlide()
    }

    // 重置触摸状态
    setTouchStart(0)
    setTouchEnd(0)
  }, [touchStart, touchEnd, isSliding, nextSlide, prevSlide])

  // 自动轮播 - 降低频率到10000ms (10秒)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 10000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // 暂停自动轮播当用户与轮播交互时
  useEffect(() => {
    const carousel = carouselRef.current
    
    if (!carousel) return
    
    const pauseAutoplay = () => {
      clearInterval(interval)
    }
    
    const resumeAutoplay = () => {
      clearInterval(interval)
      interval = setInterval(() => {
        nextSlide()
      }, 10000) // 调整为10秒
    }
    
    let interval = setInterval(() => {
      nextSlide()
    }, 10000) // 调整为10秒
    
    carousel.addEventListener('mouseenter', pauseAutoplay)
    carousel.addEventListener('mouseleave', resumeAutoplay)
    carousel.addEventListener('touchstart', pauseAutoplay)
    carousel.addEventListener('touchend', resumeAutoplay)
    
    return () => {
      clearInterval(interval)
      carousel.removeEventListener('mouseenter', pauseAutoplay)
      carousel.removeEventListener('mouseleave', resumeAutoplay)
      carousel.removeEventListener('touchstart', pauseAutoplay)
      carousel.removeEventListener('touchend', resumeAutoplay)
    }
  }, [nextSlide])

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-0.5">
          <h3 className="font-semibold">AI 个性化学习路径</h3>
          <p className="text-sm text-muted-foreground">基于您的兴趣和目标定制</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={prevSlide} 
            disabled={isSliding}
            variant="outline" 
            size="icon" 
            className="rounded-full h-8 w-8 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform duration-150 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            onClick={nextSlide} 
            disabled={isSliding}
            variant="outline" 
            size="icon" 
            className="rounded-full h-8 w-8 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform duration-150 active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full gap-1 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 ml-2">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> 
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">生成路径</span>
          </Button>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className="relative overflow-hidden rounded-lg group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={`flex transition-transform duration-600 ease-in-out ${isSliding ? '' : 'hover:pause-animation'}`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {/* 课程进度卡片 */}
          {courseData.map((course, index) => (
            <div key={`course-${index}`} className="w-full flex-shrink-0 px-0.5">
              <CourseCard course={course} />
            </div>
          ))}
          
          {/* 图片式卡片 */}
          {imageCardData.map((card, index) => (
            <div key={`image-${index}`} className="w-full flex-shrink-0 px-0.5 h-full">
              <ImageCard card={card} />
            </div>
          ))}
        </div>
        
        {/* 左右滑动箭头指示器 - 在卡片上悬停时显示 */}
        <div className="absolute inset-y-0 left-0 flex items-center opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity">
          <Button 
            onClick={prevSlide} 
            disabled={isSliding}
            variant="outline" 
            size="icon" 
            className="ml-2 rounded-full h-8 w-8 bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 shadow-md transition-transform duration-150 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity">
          <Button 
            onClick={nextSlide} 
            disabled={isSliding}
            variant="outline" 
            size="icon" 
            className="mr-2 rounded-full h-8 w-8 bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 shadow-md transition-transform duration-150 active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        {[...courseData, ...imageCardData].map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isSliding) {
                setIsSliding(true)
                setActiveIndex(idx)
                setTimeout(() => setIsSliding(false), 600)
              }
            }}
            className={`h-2 mx-1 rounded-full transition-all ${
              idx === activeIndex 
                ? 'bg-primary-500 w-6' 
                : 'bg-gray-300 dark:bg-gray-700 w-2 hover:bg-gray-400 dark:hover:bg-gray-600'
            }`}
            aria-label={`转到幻灯片 ${idx + 1}`}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-800 group hover:border-primary-200 dark:hover:border-primary-900 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-medium">推荐课程</p>
              <p className="text-xs text-muted-foreground">基于当前阶段</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs justify-start bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 group-hover:text-primary-600">
            查看 <ChevronRight className="ml-auto h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-800 group hover:border-primary-200 dark:hover:border-primary-900 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-medium">学习社区</p>
              <p className="text-xs text-muted-foreground">同行者: 1,328</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs justify-start bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 group-hover:text-primary-600">
            加入 <ChevronRight className="ml-auto h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseCarousel 