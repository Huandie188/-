import React from "react"
import BackButton from "@/components/BackButton"

export const metadata = {
  title: "个人资料 | EduFusion",
  description: "管理您的个人资料和设置，个性化您的学习体验。",
}

export default function ProfileLayout({
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