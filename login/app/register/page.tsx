import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* 动态背景元素 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-20 right-10 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute bottom-32 left-1/2 h-[250px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* 格子背景 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* 动态光点 */}
        <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-blue-400 shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"></div>
        <div className="absolute left-3/4 top-1/2 h-1 w-1 rounded-full bg-purple-400 shadow-[0_0_15px_5px_rgba(167,139,250,0.5)]"></div>
        <div className="absolute bottom-1/3 left-1/2 h-1 w-1 rounded-full bg-teal-400 shadow-[0_0_15px_5px_rgba(45,212,191,0.5)]"></div>
      </div>

      {/* 系统名称和标语 */}
      <div className="absolute left-0 top-10 z-10 w-full text-center">
        <div className="inline-block">
          <h1 className="mb-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            EduFusion
          </h1>
          <p className="text-sm font-light text-gray-400">基于大数据与多模态感知融合的教育生态优化系统</p>
        </div>
      </div>

      {/* 注册表单容器 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 pt-16 md:p-10 md:pt-20">
        <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
} 