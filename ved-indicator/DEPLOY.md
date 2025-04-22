# Vercel 部署指南

## 部署过程

1. 在 GitHub 上创建仓库并将代码推送到仓库中
2. 在 [Vercel](https://vercel.com/) 上注册并登录
3. 点击"Add New"→"Project"
4. 导入您的 GitHub 仓库
5. 按照以下配置进行设置:

### 构建配置

| 配置项 | 值 |
|-------|-----|
| Framework Preset | Next.js |
| Build Command | npm run build |
| Output Directory | .next |
| Install Command | pnpm install --no-frozen-lockfile |

### 环境变量

部署前，请在 Vercel 的"Environment Variables"部分添加以下环境变量：

```
NEXT_PUBLIC_VED_INDICATOR_URL=https://你的域名.vercel.app
NEXT_PUBLIC_AUTH_URL=https://你的认证服务域名.vercel.app
NEXT_PUBLIC_ADMIN_URL=https://你的管理服务域名.vercel.app
NEXT_PUBLIC_COURSE_RECOMMENDATION_URL=https://你的课程推荐服务域名.vercel.app
NEXT_PUBLIC_CS_LEARNING_PATH_URL=https://你的学习路径服务域名.vercel.app
```

## 常见问题

### 1. 构建失败：`useSearchParams` 须包装在 Suspense 中

确保所有使用 `useSearchParams` 钩子的组件都被 `Suspense` 组件包装。例如：

```jsx
import { Suspense } from 'react';

// 创建一个单独的组件使用 useSearchParams
function SearchParamsHandler() {
  const searchParams = useSearchParams();
  // ...处理逻辑
  return null;
}

export default function Page() {
  // ...
  return (
    <div>
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>
      {/* 其他内容 */}
    </div>
  );
}
```

### 2. 构建错误：Next.js 组件必须添加 "use client" 指令

所有使用 React hooks (如 useState, useEffect 等) 的组件都必须添加 `"use client"` 指令在文件顶部。

### 3. 安装依赖错误

如果在 CI 环境中出现 lock 文件不匹配的错误，已在 vercel.json 中添加了 `installCommand` 配置项来解决此问题。

## 线上测试与监控

部署完成后，请检查以下功能是否正常工作：

1. 页面加载与样式显示
2. 用户认证流程
3. API 调用 (`/api/hello`)
4. 跨服务导航

如有问题，请查看 Vercel 构建和部署日志以获取更多详细信息。 