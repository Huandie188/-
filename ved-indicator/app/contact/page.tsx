"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import BackButton from "@/components/BackButton"
import { FormEvent } from "react"

export default function ContactPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 这里可以添加表单提交到后端的逻辑
    // 目前仅显示成功对话框
    setIsSubmitted(true)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    // 提交成功后重置表单
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900/80 dark:via-background dark:to-background pt-20">
      <BackButton />
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">联系我们</h1>
            <p className="text-lg text-muted-foreground">
              我们非常重视您的反馈。请填写以下表单，我们会尽快回复您。
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 md:p-8 border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  您的姓名
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  电子邮箱
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入您的电子邮箱"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  您的反馈
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="请输入您的反馈意见或建议"
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                提交反馈
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>感谢您的反馈</DialogTitle>
            <DialogDescription>
              您的意见我们已经收到，感谢反馈！
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleClose}>
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 