import React from "react"
import BackButton from "@/components/BackButton"

export const metadata = {
  title: "百本黑皮书PDF资源 | EduFusion",
  description: "精心收集的编程与技术领域经典书籍，助力你的学习与技术提升。",
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative">
      <BackButton />
      {children}
    </div>
  )
} 