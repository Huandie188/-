import React from "react"
import BackButton from "@/components/BackButton"

export default function CourseListLayout({
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