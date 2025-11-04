# Dingyue 文档

这是 Dingyue 的官方文档网站，使用 VitePress 构建。

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后会在本地端口（通常是 5173）打开文档网站。

### 构建

```bash
npm run build
```

构建后的文件会在 `.vitepress/dist` 目录中。

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
.
├── .vitepress/
│   └── config.js          # VitePress 配置文件
├── docs/                  # 文档目录
│   ├── 为什么选择Dingyue.md
│   ├── 快速入门指南.md
│   ├── 应用配置/
│   ├── 开发者账户管理/
│   ├── 订阅配置.md
│   ├── 订阅分析/
│   ├── 内购页.md
│   ├── 用户管理.md
│   ├── AB测试.md
│   ├── 集成与归因/
│   ├── 广告优化/
│   ├── 远程开关.md
│   └── iOS集成/
├── index.md              # 首页
├── package.json
└── README.md
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 构建命令：`npm run build`
4. 输出目录：`.vitepress/dist`

### Netlify 部署

1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. 构建命令：`npm run build`
4. 发布目录：`.vitepress/dist`

### GitHub Pages 部署

1. 在 `package.json` 中添加部署脚本
2. 配置 GitHub Actions 自动部署
3. 或使用 `gh-pages` 手动部署

## 内容更新

文档内容位于 `docs/` 目录中，使用 Markdown 格式编写。

编辑文档后，保存文件即可在开发服务器中看到更新。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进文档。

