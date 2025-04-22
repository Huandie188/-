import React from "react"
import BackButton from "@/components/BackButton"

export const metadata = {
  title: "认证学习会员 | EduFusion",
  description: "加入EduFusion认证学习会员，享受专属学习资源和指导，加速你的学习之旅。",
}

export default function MembershipLayout({
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