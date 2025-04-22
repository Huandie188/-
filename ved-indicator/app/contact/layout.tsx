export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}

export const metadata = {
  title: '联系我们 - EduFusion',
  description: '欢迎联系我们，提供您的宝贵意见和建议。',
} 