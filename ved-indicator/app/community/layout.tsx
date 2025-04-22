import React from "react"
import BackButton from "@/components/BackButton"

export const metadata = {
  title: "用户社区 | EduFusion",
  description: "探索EduFusion的用户社区，与学习者建立连接，共同成长。",
}

export default function CommunityLayout({
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