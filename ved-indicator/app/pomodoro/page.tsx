"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, Play, Pause, RotateCcw, Volume2, Clock, CheckCircle, ListTodo, Coffee, Plus, ChevronRight, AlertCircle, Book } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import useAuth from "@/hooks/useAuth"

type TimerMode = "work" | "short-break" | "long-break";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  completedPomodoros: number;
};

export default function PomodoroPage() {
  // 获取登录状态
  const { isLoggedIn, setLoggedIn } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 使用 requestAnimationFrame 来延迟一帧，确保状态更新和渲染同步
    requestAnimationFrame(() => {
      setIsLoading(false)
    })
  }, [])
  
  // 计时器设置
  const [workTime, setWorkTime] = useState(25); // 默认工作时间25分钟
  const [shortBreakTime, setShortBreakTime] = useState(5); // 默认短休息5分钟
  const [longBreakTime, setLongBreakTime] = useState(15); // 默认长休息15分钟
  const [longBreakInterval, setLongBreakInterval] = useState(4); // 默认4个工作周期后长休息

  // 计时器状态
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
  
  // 声音设置
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  
  // 任务管理
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // 音频引用
  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // 初始化音频
  useEffect(() => {
    if (typeof window !== "undefined") {
      alarmSoundRef.current = new Audio("/sounds/bell.mp3"); // 假设有这个音频文件
    }
  }, []);

  // 计时器逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // 计时结束
      playAlarmSound();
      
      if (mode === "work") {
        const newCompletedSessions = completedSessions + 1;
        setCompletedSessions(newCompletedSessions);
        
        // 更新当前活动任务的已完成番茄数
        if (activeTaskId) {
          setTasks(prevTasks => 
            prevTasks.map(task => 
              task.id === activeTaskId 
                ? { ...task, completedPomodoros: task.completedPomodoros + 1 } 
                : task
            )
          );
        }
        
        // 判断是短休息还是长休息
        if (newCompletedSessions % longBreakInterval === 0) {
          setMode("long-break");
          setTimeLeft(longBreakTime * 60);
        } else {
          setMode("short-break");
          setTimeLeft(shortBreakTime * 60);
        }
        
        // 如果设置了自动开始休息
        setIsRunning(autoStartBreaks);
      } else {
        // 休息结束后回到工作模式
        setMode("work");
        setTimeLeft(workTime * 60);
        
        // 如果设置了自动开始工作
        setIsRunning(autoStartPomodoros);
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, completedSessions, workTime, shortBreakTime, longBreakTime, longBreakInterval, autoStartBreaks, autoStartPomodoros, activeTaskId]);

  // 更新时间设置时重置计时器
  useEffect(() => {
    if (mode === "work") {
      setTimeLeft(workTime * 60);
    } else if (mode === "short-break") {
      setTimeLeft(shortBreakTime * 60);
    } else {
      setTimeLeft(longBreakTime * 60);
    }
  }, [workTime, shortBreakTime, longBreakTime, mode]);
  
  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 播放提示音
  const playAlarmSound = () => {
    if (alarmSoundRef.current && !isMuted) {
      alarmSoundRef.current.volume = volume / 100;
      alarmSoundRef.current.play().catch(err => console.error("播放音频失败:", err));
    }
  };
  
  // 重置计时器
  const resetTimer = () => {
    setIsRunning(false);
    if (mode === "work") {
      setTimeLeft(workTime * 60);
    } else if (mode === "short-break") {
      setTimeLeft(shortBreakTime * 60);
    } else {
      setTimeLeft(longBreakTime * 60);
    }
  };
  
  // 切换模式
  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    
    if (newMode === "work") {
      setTimeLeft(workTime * 60);
    } else if (newMode === "short-break") {
      setTimeLeft(shortBreakTime * 60);
    } else {
      setTimeLeft(longBreakTime * 60);
    }
  };
  
  // 添加新任务
  const addTask = () => {
    if (newTaskTitle.trim() === "") return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      pomodoros: 1,
      completedPomodoros: 0
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };
  
  // 删除任务
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
  };
  
  // 切换任务完成状态
  const toggleTaskCompleted = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // 设置活动任务
  const setActiveTask = (id: string) => {
    setActiveTaskId(id === activeTaskId ? null : id);
  };
  
  // 计算进度百分比
  const calculateProgress = () => {
    let totalTime;
    if (mode === "work") {
      totalTime = workTime * 60;
    } else if (mode === "short-break") {
      totalTime = shortBreakTime * 60;
    } else {
      totalTime = longBreakTime * 60;
    }
    
    return 100 - (timeLeft / totalTime * 100);
  };

  // 获取当前模式的颜色
  const getModeColor = () => {
    return mode === "work" 
      ? "from-rose-500 to-red-500" 
      : mode === "short-break" 
        ? "from-emerald-500 to-green-500" 
        : "from-sky-500 to-blue-500";
  };

  // 获取当前模式的浅色
  const getModeLightColor = () => {
    return mode === "work" 
      ? "bg-rose-50 text-rose-700 border-rose-200" 
      : mode === "short-break" 
        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
        : "bg-sky-50 text-sky-700 border-sky-200";
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 共享顶栏 */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
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
            <Link href="/pomodoro" className="transition-colors text-primary-600 py-1 border-b-2 border-primary-500">
              <Clock className="inline-block mr-1 h-4 w-4" /> 番茄钟
            </Link>
            <Link href="/vocabulary" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              <Book className="inline-block mr-1 h-4 w-4" /> 背单词
            </Link>
            {process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL ? (
              <Link href={process.env.NEXT_PUBLIC_CS_LEARNING_PATH_URL} className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
                个人学习路线
              </Link>
            ) : null}
            <Link href="/profile" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              个人信息
            </Link>
            <Link href="/community" className="transition-colors hover:text-primary-600 py-1 border-b-2 border-transparent hover:border-primary-500">
              用户社区
            </Link>
          </nav>
          <div className="flex items-center gap-4 w-[180px] justify-end">
            {!isLoading && (
              isLoggedIn ? (
                <>
                  <Link href="/vocabulary" className="md:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                      <Book className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/pomodoro" className="md:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                      <Clock className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href={process.env.NEXT_PUBLIC_ADMIN_URL || '#'}>
                    <Button variant="ghost" className="rounded-full hover:bg-primary-50 text-primary-700">后台管理</Button>
                  </Link>
                  <Button variant="outline" className="rounded-full" onClick={() => setLoggedIn(false)}>
                    登出
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/vocabulary" className="md:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                      <Book className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/pomodoro" className="md:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-50 text-primary-700">
                      <Clock className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href={process.env.NEXT_PUBLIC_AUTH_URL || '#'}>
                    <Button className="rounded-full shadow-subtle">登录/注册</Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </header>
      
      {/* 内容区域 */}
      <main className="flex-1 pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* 页面标题 */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                  返回首页
                </Link>
              </div>
              <h1 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white">番茄工作法时钟</h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400 max-w-3xl">
                使用番茄工作法提高专注力和工作效率，每25分钟工作配合短暂休息
              </p>
            </div>
            <div>
              {completedSessions > 0 && (
                <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 border rounded-full text-sm font-medium">
                  <CheckCircle className="h-3.5 w-3.5" /> 
                  今日已完成 {completedSessions} 个番茄钟
                </Badge>
              )}
            </div>
          </div>
          
          {/* 主体内容 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧番茄钟区域 */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader className="pb-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">专注计时器</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setShowSettings(!showSettings)}
                      className="rounded-full h-8 w-8"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {mode === "work" 
                      ? "工作时段 - 专注于当前任务" 
                      : mode === "short-break" 
                        ? "短休息 - 放松一下，准备下一个番茄钟" 
                        : "长休息 - 充分放松，恢复精力"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                  {/* 时间模式选择器 */}
                  <Tabs value={mode} className="mb-8">
                    <TabsList className="w-full grid grid-cols-3 h-11 p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <TabsTrigger 
                        value="work" 
                        onClick={() => switchMode("work")} 
                        className="rounded-full data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700 dark:data-[state=active]:bg-rose-900/20 dark:data-[state=active]:text-rose-300"
                      >
                        <Clock className="h-4 w-4 mr-2" /> 工作
                      </TabsTrigger>
                      <TabsTrigger 
                        value="short-break" 
                        onClick={() => switchMode("short-break")} 
                        className="rounded-full data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/20 dark:data-[state=active]:text-emerald-300"
                      >
                        <Coffee className="h-4 w-4 mr-2" /> 短休息
                      </TabsTrigger>
                      <TabsTrigger 
                        value="long-break" 
                        onClick={() => switchMode("long-break")} 
                        className="rounded-full data-[state=active]:bg-sky-100 data-[state=active]:text-sky-700 dark:data-[state=active]:bg-sky-900/20 dark:data-[state=active]:text-sky-300"
                      >
                        <Coffee className="h-4 w-4 mr-2" /> 长休息
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {/* 设置面板 */}
                  {showSettings && (
                    <div className="mb-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 space-y-5 border border-gray-100 dark:border-gray-700/50 transition-all duration-300 animate-in fade-in">
                      <div>
                        <h3 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">时间设置（分钟）</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <Label className="text-gray-600 dark:text-gray-400">工作时间</Label>
                              <span className="font-medium">{workTime}分钟</span>
                            </div>
                            <Slider
                              value={[workTime]}
                              min={5}
                              max={60}
                              step={1}
                              onValueChange={(value) => setWorkTime(value[0])}
                              className="[&>span:nth-child(3)]:bg-rose-500"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <Label className="text-gray-600 dark:text-gray-400">短休息时间</Label>
                              <span className="font-medium">{shortBreakTime}分钟</span>
                            </div>
                            <Slider
                              value={[shortBreakTime]}
                              min={1}
                              max={15}
                              step={1}
                              onValueChange={(value) => setShortBreakTime(value[0])}
                              className="[&>span:nth-child(3)]:bg-emerald-500"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <Label className="text-gray-600 dark:text-gray-400">长休息时间</Label>
                              <span className="font-medium">{longBreakTime}分钟</span>
                            </div>
                            <Slider
                              value={[longBreakTime]}
                              min={5}
                              max={30}
                              step={1}
                              onValueChange={(value) => setLongBreakTime(value[0])}
                              className="[&>span:nth-child(3)]:bg-sky-500"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <Label className="text-gray-600 dark:text-gray-400">
                            长休息间隔（工作周期数）
                          </Label>
                          <span className="font-medium">{longBreakInterval}个</span>
                        </div>
                        <Slider
                          value={[longBreakInterval]}
                          min={1}
                          max={8}
                          step={1}
                          onValueChange={(value) => setLongBreakInterval(value[0])}
                          className="[&>span:nth-child(3)]:bg-violet-500"
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer flex-1" htmlFor="auto-breaks">
                            自动开始休息
                          </Label>
                          <Switch
                            id="auto-breaks"
                            checked={autoStartBreaks}
                            onCheckedChange={setAutoStartBreaks}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer flex-1" htmlFor="auto-pomodoros">
                            自动开始工作
                          </Label>
                          <Switch
                            id="auto-pomodoros"
                            checked={autoStartPomodoros}
                            onCheckedChange={setAutoStartPomodoros}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer flex-1" htmlFor="sound-enabled">
                            声音提醒
                          </Label>
                          <Switch
                            id="sound-enabled"
                            checked={!isMuted}
                            onCheckedChange={(v) => setIsMuted(!v)}
                          />
                        </div>
                      </div>
                      
                      {!isMuted && (
                        <div className="pt-3">
                          <div className="flex items-center gap-3">
                            <Volume2 className="h-4 w-4 text-gray-500" />
                            <Slider
                              value={[volume]}
                              min={0}
                              max={100}
                              step={1}
                              onValueChange={(value) => setVolume(value[0])}
                              className="flex-1"
                            />
                            <span className="text-sm font-medium w-9 text-right">{volume}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* 主计时器显示 */}
                  <div className="flex flex-col items-center justify-center py-10 transition-all duration-300 backdrop-blur-sm">
                    <div className={cn(
                      "text-8xl font-mono font-bold tracking-tighter relative",
                      mode === "work" ? "text-rose-500" : mode === "short-break" ? "text-emerald-500" : "text-sky-500"
                    )}>
                      {formatTime(timeLeft)}
                      <div className={cn(
                        "absolute -inset-10 -z-10 opacity-10 blur-2xl rounded-full",
                        mode === "work" ? "bg-rose-500" : mode === "short-break" ? "bg-emerald-500" : "bg-sky-500"
                      )}></div>
                    </div>
                    
                    <div className="w-full mt-12 mb-6">
                      <Progress 
                        value={calculateProgress()} 
                        className={cn(
                          "h-2 w-full transition-all duration-500",
                          mode === "work" 
                            ? "[&>div]:bg-gradient-to-r [&>div]:from-rose-500 [&>div]:to-red-500" 
                            : mode === "short-break" 
                              ? "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-green-500" 
                              : "[&>div]:bg-gradient-to-r [&>div]:from-sky-500 [&>div]:to-blue-500"
                        )} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <Button
                        onClick={() => setIsRunning(!isRunning)}
                        size="lg"
                        className={cn(
                          "rounded-full h-14 min-w-[160px] text-white shadow-lg hover:shadow-xl transition-all",
                          "bg-gradient-to-r",
                          getModeColor()
                        )}
                      >
                        {isRunning ? (
                          <>
                            <Pause className="mr-2 h-5 w-5" /> 暂停
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-5 w-5" /> 开始
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={resetTimer}
                        variant="outline"
                        size="icon"
                        className="rounded-full h-14 w-14 border-2"
                      >
                        <RotateCcw className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 当前任务提示 */}
              {activeTaskId && (
                <Card className="overflow-hidden border bg-white dark:bg-gray-900 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                      当前专注任务
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {tasks.find(t => t.id === activeTaskId)?.title && (
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate max-w-[70%]">
                          {tasks.find(t => t.id === activeTaskId)?.title}
                        </div>
                        <Badge className={cn(
                          "rounded-full font-normal border px-3 py-1",
                          getModeLightColor()
                        )}>
                          {tasks.find(t => t.id === activeTaskId)?.completedPomodoros} / 
                          {tasks.find(t => t.id === activeTaskId)?.pomodoros} 个番茄钟
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* 右侧任务列表 */}
            <div>
              <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900 h-full">
                <CardHeader className="pb-4 border-b">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <ListTodo className="mr-2 h-4 w-4" /> 任务列表
                  </CardTitle>
                  <CardDescription>
                    添加并管理您的番茄钟任务
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex mb-5">
                    <input
                      type="text"
                      placeholder="添加新任务..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTask()}
                      className="flex-1 px-4 py-2.5 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 bg-transparent"
                    />
                    <Button
                      onClick={addTask}
                      className="rounded-l-none bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      <Plus className="h-4 w-4 mr-1" /> 添加
                    </Button>
                  </div>
                  
                  <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-2 pt-2">
                    {tasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <ListTodo className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            没有待办任务
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            添加任务来规划您的番茄钟工作
                          </p>
                        </div>
                      </div>
                    ) : (
                      tasks.map(task => (
                        <div 
                          key={task.id}
                          className={cn(
                            "p-4 border rounded-xl flex items-start justify-between gap-3 group transition-all hover:shadow-sm",
                            activeTaskId === task.id ? "bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700" : "border-gray-200 dark:border-gray-800",
                            task.completed ? "bg-gray-50/50 dark:bg-gray-800/20" : ""
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompleted(task.id)}
                                className="mr-3 h-4 w-4 rounded-sm border-gray-300 text-primary focus:ring-primary/20"
                              />
                              <span className={cn(
                                "truncate font-medium",
                                task.completed ? "line-through text-gray-400 dark:text-gray-600" : ""
                              )}>
                                {task.title}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1.5 ml-7">
                              已完成: {task.completedPomodoros}/{task.pomodoros} 个番茄钟
                            </div>
                          </div>
                          
                          <div className="flex gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setActiveTask(task.id)}
                              className={cn(
                                "h-8 px-2.5 text-xs rounded-full hover:bg-gray-100 dark:hover:bg-gray-800",
                                activeTaskId === task.id 
                                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100" 
                                  : "text-gray-700 dark:text-gray-300"
                              )}
                            >
                              {activeTaskId === task.id ? "停止" : "开始"}
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteTask(task.id)}
                              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
                
                {tasks.length > 0 && (
                  <CardFooter className="flex justify-between border-t px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div>
                      总计: {tasks.length} 个任务
                    </div>
                    <div>
                      已完成: {tasks.filter(t => t.completed).length} 个
                    </div>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 