import React from "react"
import BackButton from "@/components/BackButton"

export default function CourseDetailLayout({
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