import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Dingyue',
  description: 'Dingyue有效帮助运营和相关开发人员分析并增加订阅量，您可以用来维护老用户，拓宽新用户，甚至可以进行App Store广告投放。',
  lang: 'zh-CN',
  base: '/',
  // outDir 默认是 .vitepress/dist，与部署配置一致
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }]
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '快速入门', link: '/docs/为什么选择Dingyue' },
      { text: 'API 参考', link: '/api/' },
      { text: '更新日志', link: '/changelog' }
    ],
    
    sidebar: {
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '概览', link: '/api/' },
            { text: '订阅管理 API', link: '/api/subscriptions' },
            { text: '事件追踪 API', link: '/api/events' },
            // { text: '远程配置 API', link: '/api/config' },
            // { text: '数据分析 API', link: '/api/analytics' },
            // { text: '错误码参考', link: '/api/error-codes' },
            // { text: 'Webhook 文档', link: '/api/webhooks' }
          ]
        }
      ],
      '/docs/': [
        {
          text: '快速入门',
          items: [
            { text: '为什么选择Dingyue', link: '/docs/为什么选择Dingyue' },
            { text: '快速入门指南', link: '/docs/快速入门指南' },
            {
              text: '应用配置',
              items: [
                { text: '基本信息', link: '/docs/应用配置/基本信息' },
                { text: 'iOS', link: '/docs/应用配置/iOS' }
              ]
            },
            {
              text: '开发者账户管理',
              items: [
                { text: '邮箱配置指南', link: '/docs/开发者账户管理/邮箱配置指南' }
              ]
            },
            { text: '订阅配置', link: '/docs/订阅配置' },
            {
              text: '订阅分析',
              items: [
                { text: '数据', link: '/docs/订阅分析/数据' },
                { text: '图表', link: '/docs/订阅分析/图表' }
              ]
            },
            { text: '内购页', link: '/docs/内购页' },
            { text: '用户管理', link: '/docs/用户管理' },
            { text: 'A/B测试', link: '/docs/AB测试' },
            {
              text: '集成与归因',
              items: [
                {
                  text: '归因与分析',
                  items: [
                    { text: 'Appsflyer', link: '/docs/集成与归因/Appsflyer' },
                    { text: 'Amplitude', link: '/docs/集成与归因/Amplitude' },
                    { text: 'Facebook', link: '/docs/集成与归因/Facebook' },
                    { text: 'Adjust', link: '/docs/集成与归因/Adjust' },
                    { text: 'Mixpanel', link: '/docs/集成与归因/Mixpanel' }
                  ]
                },
                { text: '分析', link: '/docs/集成与归因/分析' }
              ]
            },
            {
              text: '广告优化',
              items: [
                { text: '添加广告账户', link: '/docs/广告优化/添加广告账户' },
                { text: '账户配置', link: '/docs/广告优化/账户配置' },
                { text: '参数配置', link: '/docs/广告优化/参数配置' }
              ]
            },
            { text: '远程开关', link: '/docs/远程开关' }
          ]
        },
        {
          text: 'iOS 集成DingYue SDK',
          items: [
            { text: '安装', link: '/docs/iOS集成/安装' },
            { text: 'Session 汇报', link: '/docs/iOS集成/Session汇报' },
            { text: '使用订阅内购页', link: '/docs/iOS集成/使用订阅内购页' },
            { text: '购买验证', link: '/docs/iOS集成/购买验证' },
            { text: '购买', link: '/docs/iOS集成/购买' },
            { text: '上报IDFA', link: '/docs/iOS集成/上报IDFA' },
            { text: '上报远程通知deviceToken', link: '/docs/iOS集成/上报远程通知deviceToken' },
            { text: '第三方归因汇报', link: '/docs/iOS集成/第三方归因汇报' },
            { text: '事件汇报', link: '/docs/iOS集成/事件汇报' },
            { text: '创建远程开关', link: '/docs/iOS集成/创建远程开关' },
            { text: '设置本地内购页路径', link: '/docs/iOS集成/设置本地内购页路径' }
          ]
        }
      ]
    },
    
    socialLinks: [
      // 可以添加社交媒体链接
    ],
    
    footer: {
      message: '',
      copyright: 'Copyright © 2025 Dingyue'
    },
    
    search: {
      provider: 'local'
    }
  }
})

