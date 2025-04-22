"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { FileAudio, Upload, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setProgress(0)
    setUploading(false)
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[2.25rem] font-bold tracking-tight text-blue-800 dark:text-blue-600">上传录音</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">上传音频录音</CardTitle>
              <CardDescription>上传通话录音进行AI分析</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">音频文件</Label>
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/10">
                  {!file ? (
                    <>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full bg-primary/10 p-4 transition-all duration-200 hover:scale-110">
                          <FileAudio className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">拖放您的音频文件到这里或点击浏览</p>
                          <p className="text-xs text-muted-foreground">支持MP3、WAV、M4A格式，最大100MB</p>
                        </div>
                        <Input id="file" type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("file")?.click()}
                          className="transition-all duration-200 hover:scale-105"
                        >
                          浏览文件
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileAudio className="h-8 w-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                          className="transition-all duration-200 hover:scale-110 hover:bg-red-100 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {uploading && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>上传中...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">录音标题</Label>
                <Input
                  id="title"
                  placeholder="输入录音标题"
                  className="transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agent">客服</Label>
                  <Select>
                    <SelectTrigger
                      id="agent"
                      className="transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                    >
                      <SelectValue placeholder="选择客服" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zhang-san">张三</SelectItem>
                      <SelectItem value="li-si">李四</SelectItem>
                      <SelectItem value="wang-wu">王五</SelectItem>
                      <SelectItem value="zhao-liu">赵六</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">通话类别</Label>
                  <Select>
                    <SelectTrigger
                      id="category"
                      className="transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                    >
                      <SelectValue placeholder="选择类别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">客户支持</SelectItem>
                      <SelectItem value="technical-support">技术支持</SelectItem>
                      <SelectItem value="sales">销售</SelectItem>
                      <SelectItem value="billing">账单</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">备注</Label>
                <Textarea
                  id="notes"
                  placeholder="添加关于此录音的任何附加说明"
                  rows={4}
                  className="transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="transition-all duration-200 hover:scale-105">
                取消
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="transition-all duration-200 hover:scale-105"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "上传中..." : "上传录音"}
              </Button>
            </CardFooter>
          </Card>
          <Card className="col-span-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-600">分析选项</CardTitle>
              <CardDescription>配置如何分析此录音</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="script">参考脚本</Label>
                <Select defaultValue="default">
                  <SelectTrigger
                    id="script"
                    className="transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                  >
                    <SelectValue placeholder="选择脚本" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">默认客户支持脚本</SelectItem>
                    <SelectItem value="technical">技术支持脚本</SelectItem>
                    <SelectItem value="sales">销售脚本</SelectItem>
                    <SelectItem value="billing">账单支持脚本</SelectItem>
                    <SelectItem value="none">无脚本（通用分析）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="analysis-depth">分析深度</Label>
                <Select defaultValue="standard">
                  <SelectTrigger
                    id="analysis-depth"
                    className="transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                  >
                    <SelectValue placeholder="选择深度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">基础（快速分析）</SelectItem>
                    <SelectItem value="standard">标准（推荐）</SelectItem>
                    <SelectItem value="deep">深度（详细分析）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="focus-areas">关注领域</Label>
                <Select defaultValue="all">
                  <SelectTrigger
                    id="focus-areas"
                    className="transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                  >
                    <SelectValue placeholder="选择关注领域" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有领域</SelectItem>
                    <SelectItem value="adherence">仅脚本遵循度</SelectItem>
                    <SelectItem value="agent">仅客服表现</SelectItem>
                    <SelectItem value="customer">仅客户情绪</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification">通知</Label>
                <Select defaultValue="email">
                  <SelectTrigger
                    id="notification"
                    className="transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
                  >
                    <SelectValue placeholder="选择通知方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">无通知</SelectItem>
                    <SelectItem value="email">电子邮件</SelectItem>
                    <SelectItem value="dashboard">仅仪表盘</SelectItem>
                    <SelectItem value="both">电子邮件和仪表盘</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
