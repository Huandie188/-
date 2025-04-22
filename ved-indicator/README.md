# Ved Indicator 项目

这是一个使用 Next.js 15 构建的 Web 应用程序。

## 部署到 Vercel

1. 在 GitHub 上创建仓库并推送代码
2. 在 [Vercel](https://vercel.com/) 上注册账号并创建新项目
3. 从 GitHub 导入您的仓库
4. 配置以下项目设置:
   - **框架预设**: 选择 Next.js
   - **根目录**: ./ved-indicator (如果您的项目在此子目录中)
   - **构建命令**: `npm run build` (已在 vercel.json 中配置)
   - **输出目录**: `.next` (已在 vercel.json 中配置)
5. 环境变量配置:
   - 点击 "Environment Variables" 选项卡
   - 从 `.env.production` 文件中添加所有环境变量
   - 根据您的实际域名修改所有 URL 地址
6. 点击 "Deploy" 按钮部署项目
7. 部署完成后，您可以在项目的 "Domains" 选项卡中找到您的应用 URL

## 注意事项

- 确保您的 Next.js 应用按照 App Router 方式组织 (Next.js 13+)
- 部署前确认 package.json 中的 Node.js 版本不低于 18.x
- 如果您使用了外部图片域名，请在 next.config.mjs 中配置相应的 domains 白名单

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 构建项目

```bash
npm run build
npm start
```

## 项目结构

- `/app`: 包含应用程序的所有页面组件
- `/components`: 包含可重用的 UI 组件
- `/hooks`: 包含自定义 React hooks
- `/lib`: 包含工具函数和库
- `/public`: 包含静态资源
- `/styles`: 包含全局样式 