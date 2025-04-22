import { type Metadata } from "next"
import BackButton from "@/components/BackButton"

export const metadata: Metadata = {
  title: "在线课程 - EduFusion",
  description: "探索丰富多样的在线课程，提升您的技能和知识，找到适合您职业发展的学习路径。",
}

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <BackButton />
      {children}
    </div>
  )
} 