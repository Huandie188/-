# 跨服务部署和跳转配置指南

本文档说明如何将多个服务部署到 Vercel 并配置它们之间的跳转逻辑。

## 部署地址汇总

以下是已部署的服务地址:

1. **主平台**: https://test-ten-nu-93.vercel.app/
2. **认证服务**: https://login-lyart-one.vercel.app/login
3. **管理后台**: https://audio-analysis-platform.vercel.app/
4. **课程推荐**: https://course-recommendation-mu.vercel.app/
5. **学习路径**: https://cs-learning-path.vercel.app/

## 重新部署步骤

请对每个服务执行以下步骤，确保所有更改生效:

1. 将修改后的文件提交到 GitHub 仓库
2. 登录 Vercel 控制面板
3. 选择对应的项目
4. 转到"Settings"→"Environment Variables"
5. 添加或更新以下环境变量:

```
NEXT_PUBLIC_VED_INDICATOR_URL=https://test-ten-nu-93.vercel.app
NEXT_PUBLIC_AUTH_URL=https://login-lyart-one.vercel.app/login
NEXT_PUBLIC_ADMIN_URL=https://audio-analysis-platform.vercel.app
NEXT_PUBLIC_COURSE_RECOMMENDATION_URL=https://course-recommendation-mu.vercel.app
NEXT_PUBLIC_CS_LEARNING_PATH_URL=https://cs-learning-path.vercel.app
```

6. 点击"Deployments"→"Redeploy"→"Redeploy without Cache"

## 检查导航链接

完成部署后，请在每个服务中验证以下导航链接是否正确:

1. 主页 → 登录/注册 (应该跳转到 login 服务)
2. 主页 → AI课程推荐 (应该跳转到 course-recommendation 服务)
3. 主页 → 个人学习路线 (应该跳转到 cs-learning-path 服务)
4. 主页 → 后台管理 (应该跳转到 audio-analysis-platform 服务)
5. 登录页 → 成功登录后 (应该跳转回 ved-indicator 主页)

## 跨域问题解决

如果仍然出现跨域问题，请确认:

1. 所有服务的 vercel.json 文件都已包含正确的 CORS 头设置
2. 每个服务的 API 路由都正确返回 CORS 头
3. 浏览器开发者工具中没有任何 CORS 错误

## 常见问题排除

1. **链接不跳转或跳转到错误地址**:
   - 检查环境变量是否正确设置
   - 确认组件中的链接使用了环境变量而不是硬编码URL

2. **API 请求失败**:
   - 验证 CORS 头是否正确
   - 检查请求 URL 是否正确

3. **登录后无法保持状态**:
   - 确认使用的是跨域兼容的存储方式(如httpOnly cookie)
   - 检查登录重定向 URL 是否正确

如果经过以上步骤仍有问题，请查看 Vercel 的部署日志获取更详细的错误信息。 