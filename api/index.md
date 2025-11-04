# API 参考文档

欢迎使用 Dingyue API 参考文档。这里提供了完整的 API 接口说明，帮助开发者快速集成 Dingyue 服务。

## 快速开始

### 基础信息

- **API 基础 URL**: `https://api.dingyue.com/v1`
- **认证方式**: API Key
- **数据格式**: JSON
- **字符编码**: UTF-8

### 认证

所有 API 请求都需要在请求头中包含您的 API Key：

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

## API 概览

### 用户管理 API

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/users` | 获取用户列表 |
| GET | `/users/{id}` | 获取用户详情 |
| POST | `/users` | 创建用户 |
| PUT | `/users/{id}` | 更新用户信息 |
| DELETE | `/users/{id}` | 删除用户 |

### 订阅管理 API

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/subscriptions` | 获取订阅列表 |
| GET | `/subscriptions/{id}` | 获取订阅详情 |
| POST | `/subscriptions` | 创建订阅 |
| PUT | `/subscriptions/{id}` | 更新订阅状态 |
| POST | `/subscriptions/verify` | 验证订阅购买 |

### 事件追踪 API

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/events` | 上报事件 |
| GET | `/events/analytics` | 获取事件分析数据 |
| POST | `/events/batch` | 批量上报事件 |

### 远程配置 API

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/config` | 获取远程配置 |
| PUT | `/config` | 更新远程配置 |
| GET | `/config/switches` | 获取远程开关状态 |

## 详细文档

### [用户管理 API](/api/users)
完整的用户管理接口文档，包括用户注册、登录、信息更新等功能。

### [订阅管理 API](/api/subscriptions)
订阅相关的所有接口，包括订阅创建、状态查询、购买验证等。

### [事件追踪 API](/api/events)
事件上报和分析接口，支持自定义事件和预定义事件。

### 远程配置 API
远程配置和开关管理接口，支持实时配置更新。（开发中）

### 数据分析 API
数据分析相关接口，提供各种统计和报表数据。（开发中）

## SDK 集成

### iOS SDK

```swift
import DingyueSDK

// 初始化 SDK
DingyueSDK.initialize(apiKey: "YOUR_API_KEY")

// 用户登录
DingyueSDK.login(userId: "user123")

// 事件上报
DingyueSDK.trackEvent("purchase", parameters: [
    "product_id": "premium_monthly",
    "price": 9.99,
    "currency": "USD"
])
```

### JavaScript SDK

```javascript
import Dingyue from 'dingyue-js-sdk';

// 初始化 SDK
Dingyue.init({
  apiKey: 'YOUR_API_KEY',
  userId: 'user123'
});

// 事件上报
Dingyue.track('purchase', {
  product_id: 'premium_monthly',
  price: 9.99,
  currency: 'USD'
});
```

## 错误处理

### HTTP 状态码

| 状态码 | 描述 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 认证失败 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 429 | 请求频率限制 |
| 500 | 服务器内部错误 |

### 错误响应格式

```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "参数 'user_id' 不能为空",
    "details": {
      "field": "user_id",
      "reason": "required"
    }
  }
}
```

## 限制说明

### 请求频率限制

- **标准用户**: 1000 请求/小时
- **高级用户**: 10000 请求/小时
- **企业用户**: 100000 请求/小时

### 数据限制

- 单次请求最大数据量: 1MB
- 批量操作最大条数: 1000
- API Key 有效期: 永久（可手动撤销）

## 更新日志

API 更新记录将在这里显示。

## 支持与反馈

如果您在使用 API 过程中遇到任何问题，请联系我们的技术支持团队。

## 相关资源

- [快速入门指南](/docs/快速入门指南)
- [iOS SDK 集成](/docs/iOS集成/安装)
