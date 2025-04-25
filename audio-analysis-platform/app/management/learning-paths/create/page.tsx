"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"

export default function CreateLearningPathPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "初级",
    status: "草稿",
    estimatedTime: "",
    objectives: [""],
    prerequisites: [""]
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [submitting, setSubmitting] = useState(false)

  // 添加学习目标项
  const addObjective = () => {
    setFormData({
      ...formData,
      objectives: [...formData.objectives, ""]
    })
  }

  // 更新学习目标项
  const updateObjective = (index: number, value: string) => {
    const updatedObjectives = [...formData.objectives]
    updatedObjectives[index] = value
    setFormData({
      ...formData,
      objectives: updatedObjectives
    })
  }

  // 删除学习目标项
  const removeObjective = (index: number) => {
    const updatedObjectives = [...formData.objectives]
    updatedObjectives.splice(index, 1)
    setFormData({
      ...formData,
      objectives: updatedObjectives
    })
  }

  // 添加预备知识项
  const addPrerequisite = () => {
    setFormData({
      ...formData,
      prerequisites: [...formData.prerequisites, ""]
    })
  }

  // 更新预备知识项
  const updatePrerequisite = (index: number, value: string) => {
    const updatedPrerequisites = [...formData.prerequisites]
    updatedPrerequisites[index] = value
    setFormData({
      ...formData,
      prerequisites: updatedPrerequisites
    })
  }

  // 删除预备知识项
  const removePrerequisite = (index: number) => {
    const updatedPrerequisites = [...formData.prerequisites]
    updatedPrerequisites.splice(index, 1)
    setFormData({
      ...formData,
      prerequisites: updatedPrerequisites
    })
  }

  // 提交表单
  const handleSubmit = () => {
    setSubmitting(true)
    
    // 这里应该有API调用保存数据
    // 模拟API调用
    setTimeout(() => {
      setSubmitting(false)
      router.push("/management/learning-paths")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/management/learning-paths">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-blue-800 dark:text-blue-600">创建学习路径</h1>
          </div>

          <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="basic">基本信息</TabsTrigger>
              <TabsTrigger value="details">详细设置</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="p-4 border rounded-md mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>基本信息</CardTitle>
                  <CardDescription>设置学习路径的基本信息，如标题、描述等。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">标题 *</Label>
                    <Input 
                      id="title" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="输入学习路径标题" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">描述 *</Label>
                    <Textarea 
                      id="description" 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="输入学习路径描述"
                      rows={4}
                    />
                  </div>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="difficulty">难度级别 *</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value) => setFormData({...formData, difficulty: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择难度级别" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="初级">初级</SelectItem>
                          <SelectItem value="中级">中级</SelectItem>
                          <SelectItem value="高级">高级</SelectItem>
                          <SelectItem value="初级到中级">初级到中级</SelectItem>
                          <SelectItem value="中级到高级">中级到高级</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">状态 *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({...formData, status: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择状态" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="草稿">草稿</SelectItem>
                          <SelectItem value="已发布">已发布</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="estimatedTime">预计完成时间</Label>
                    <Input
                      id="estimatedTime"
                      value={formData.estimatedTime}
                      onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                      placeholder="例如: 3-4个月"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/management/learning-paths">取消</Link>
                  </Button>
                  <Button onClick={() => setActiveTab("details")}>
                    下一步
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="p-4 border rounded-md mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>详细设置</CardTitle>
                  <CardDescription>设置学习目标和预备知识等详细信息。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="mb-2 block">学习目标</Label>
                    <div className="space-y-2">
                      {formData.objectives.map((objective, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={objective}
                            onChange={(e) => updateObjective(index, e.target.value)}
                            placeholder={`学习目标 ${index+1}`}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeObjective(index)}
                            disabled={formData.objectives.length === 1}
                          >
                            <span>✕</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={addObjective}
                    >
                      添加学习目标
                    </Button>
                  </div>

                  <div>
                    <Label className="mb-2 block">预备知识</Label>
                    <div className="space-y-2">
                      {formData.prerequisites.map((prerequisite, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={prerequisite}
                            onChange={(e) => updatePrerequisite(index, e.target.value)}
                            placeholder={`预备知识 ${index+1}`}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePrerequisite(index)}
                            disabled={formData.prerequisites.length === 1}
                          >
                            <span>✕</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={addPrerequisite}
                    >
                      添加预备知识
                    </Button>
                  </div>

                  <Alert>
                    <AlertDescription>
                      创建学习路径后，您可以在详情页面添加课程内容。
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("basic")}>
                    上一步
                  </Button>
                  <Button onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "正在创建..." : "创建学习路径"}
                    {!submitting && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 