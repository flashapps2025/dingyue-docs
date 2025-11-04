# 部署指南

本文档介绍如何部署 Dingyue 文档网站到各种平台。

## 部署前准备

### 1. 安装依赖

```bash
npm install
```

### 2. 本地测试

在部署前，建议先在本地测试：

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署方式

### 方式一：Vercel（推荐）

Vercel 是最简单快捷的部署方式，支持自动部署。

#### 步骤

1. **安装 Vercel CLI**（可选）

```bash
npm i -g vercel
```

2. **在 Vercel 部署**

   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - 配置项目：
     - **Framework Preset**: VitePress
     - **Build Command**: `npm run build`
     - **Output Directory**: `.vitepress/dist`
     - **Install Command**: `npm install`
   - 点击 "Deploy"

3. **使用 CLI 部署**（可选）

```bash
# 在项目根目录执行
vercel
```

#### 自动部署

推送到 GitHub 后，Vercel 会自动部署。你也可以在 Vercel 后台配置自定义域名。

### 方式二：Netlify

#### 步骤

1. **访问 Netlify**

   - 访问 [netlify.com](https://www.netlify.com)
   - 使用 GitHub 账号登录
   - 点击 "Add new site" > "Import an existing project"

2. **配置构建**

   - 选择你的 GitHub 仓库
   - 配置构建设置：
     - **Build command**: `npm run build`
     - **Publish directory**: `.vitepress/dist`
   - 点击 "Deploy site"

3. **添加构建配置文件**（可选）

创建 `netlify.toml` 文件：

```toml
[build]
  command = "npm run build"
  publish = ".vitepress/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 方式三：GitHub Pages

#### 步骤

1. **创建 GitHub Actions 工作流**

创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - name: Build
        run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

2. **启用 GitHub Pages**

   - 在 GitHub 仓库设置中
   - 进入 "Pages" 设置
   - Source 选择 "GitHub Actions"

3. **更新 VitePress 配置**

如果部署到子路径，需要更新 `.vitepress/config.js`：

```javascript
export default defineConfig({
  base: '/dingyue-docs/', // 替换为你的仓库名
  // ... 其他配置
})
```

### 方式四：Cloudflare Pages

#### 步骤

1. **访问 Cloudflare Dashboard**

   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 "Pages" > "Create a project"

2. **连接 GitHub 仓库**

   - 选择你的 GitHub 仓库
   - 配置构建设置：
     - **Framework preset**: VitePress
     - **Build command**: `npm run build`
     - **Build output directory**: `.vitepress/dist`
   - 点击 "Save and Deploy"

### 方式五：传统服务器部署

#### 步骤

1. **构建项目**

```bash
npm run build
```

2. **上传文件**

将 `.vitepress/dist` 目录中的所有文件上传到服务器。

3. **配置 Nginx**（示例）

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/.vitepress/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 配置自定义域名

### Vercel

1. 在项目设置中进入 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS 记录

### Netlify

1. 在站点设置中进入 "Domain management"
2. 添加自定义域名
3. 配置 DNS 记录

### GitHub Pages

1. 在仓库设置中进入 "Pages"
2. 在 "Custom domain" 中输入域名
3. 在域名服务商配置 CNAME 记录

## 环境变量配置

如果需要配置环境变量（如 API 密钥），在各平台的项目设置中添加。

## 持续部署

推送到 GitHub 主分支后，大多数平台会自动触发部署。你也可以手动触发部署。

## 故障排查

### 构建失败

- 检查 Node.js 版本（推荐 18+）
- 确保所有依赖已正确安装
- 查看构建日志中的错误信息

### 页面 404

- 检查 `base` 配置是否正确
- 确保服务器配置了正确的路由重定向

### 样式丢失

- 检查资源路径是否正确
- 确保构建输出目录配置正确

## 性能优化

- 启用 CDN（Vercel、Netlify 等已自动启用）
- 配置缓存策略
- 压缩静态资源

## 更多信息

- [VitePress 部署文档](https://vitepress.dev/guide/deploy)
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com)

