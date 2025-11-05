# DingYue Mobile API

欢迎使用 DingYue Mobile API 参考文档。本文档提供了完整的移动端 API 接口说明，帮助开发者快速集成 Dingyue 服务。

## 概述

DingYue Mobile API 是为移动应用设计的后端服务接口，提供以下核心功能：

- 归因数据上报（Attribution）
- 购买凭证验证（Receipt Verification）
- 会话和事件追踪（Sessions & Events）
- 用户属性管理（User Attributes）

**版本**: 1.0.0

## 快速开始

### 基础信息

- **API 基础 URL**: `https://mobile.dingyue.io`
- **认证方式**: API Key (通过 `X-API-KEY` 请求头)
- **数据格式**: JSON
- **字符编码**: UTF-8

### 认证

所有 API 请求都需要在请求头中包含您的 API Key：

```http
X-API-KEY: YOUR_API_KEY
Content-Type: application/json
Accept: application/json
```

### 通用请求头

除了认证头外，大多数接口还需要以下请求头：

| 请求头 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| `X-USER-ID` | string | 是 | 当前用户的唯一标识 |
| `User-Agent` | string | 是 | 用户代理信息 |
| `X-APP-ID` | string | 是 | 应用的唯一标识 |
| `X-PLATFORM` | string | 是 | 平台标识（iOS/Android） |
| `X-VERSION` | string | 是 | SDK 版本号 |

## API 接口

### Attribution（归因）

#### 上报归因数据

上报第三方归因网络的归因数据。

```http
POST /attribution/report
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/attribution/report" \
  -d '{
    "network": "appsflyer",
    "data": {}
  }'
```

#### 上报 Apple Search Ads 归因数据

上报 Apple Search Ads 的归因数据（仅限 iOS）。

```http
POST /searchads/report
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/searchads/report" \
  -d '{
    "attribution": {
      "Version3.1": {
        "iad-campaign-id": "123456",
        "iad-campaign-name": "Campaign Name",
        "iad-attribution": "true"
      }
    }
  }'
```

### Receipt（收据验证）

#### 验证首次购买

验证用户的首次内购凭证。

```http
POST /receipt/verify/first
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/receipt/verify/first" \
  -d '{
    "receipt": "base64_encoded_receipt_data",
    "productId": "com.example.premium_monthly"
  }'
```

#### 验证恢复购买

验证用户的购买恢复凭证。

```http
POST /receipt/verify/recover
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/receipt/verify/recover" \
  -d '{
    "receipt": "base64_encoded_receipt_data"
  }'
```

### Sessions（会话与事件）

#### 上报会话

上报用户会话数据。

```http
POST /sessions/report
POST /v2/sessions/report  # V2 版本
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/sessions/report" \
  -d '{
    "sessionId": "session_abc123",
    "startTime": 1699200000,
    "duration": 120
  }'
```

#### 上报订单

上报购买订单数据。

```http
POST /order/report
POST /v2/order/report  # V2 版本
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/order/report" \
  -d '{
    "orderId": "order_123456",
    "productId": "com.example.premium_monthly",
    "price": 9.99,
    "currency": "USD"
  }'
```

#### 上报事件

上报用户行为事件。

```http
POST /users/report/events
POST /v2/users/report/events  # V2 版本
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/users/report/events" \
  -d '{
    "events": [
      {
        "eventName": "app_opened",
        "timestamp": 1699200000,
        "properties": {
          "source": "push_notification"
        }
      }
    ]
  }'
```

#### 上报转化

上报转化事件。

```http
POST /conversion/report
POST /v2/conversion/report  # V2 版本
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/conversion/report" \
  -d '{
    "conversionType": "purchase",
    "value": 9.99
  }'
```

#### 上报特定类型数据

上报特定类型的数据（通过 URL 参数指定类型）。

```http
POST /report/{type}
POST /v2/report/{type}  # V2 版本
```

**路径参数**

- `type` - 数据类型（如：device_info, app_info 等）

#### 上报全局开关

上报应用全局开关状态。

```http
POST /report/global_switch
POST /v2/report/global_switch  # V2 版本
```

### User（用户）

#### 设置自定义属性

设置用户的自定义属性。

```http
POST /users/custom_properties/set
```

**请求示例**

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/users/custom_properties/set" \
  -d '{
    "properties": {
      "vip_level": "gold",
      "registration_date": "2024-01-01"
    }
  }'
```

#### 更新用户属性

更新用户的标准属性。

```http
PUT /users/attribute/update
PUT /v2/users/attribute/update  # V2 版本
```

**请求示例**

```bash
curl -X PUT \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  "https://mobile.dingyue.io/users/attribute/update" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe"
  }'
```

### Segment（分段）

#### 获取分段信息

获取用户分段信息。

```http
GET /segment/info
```

**请求示例**

```bash
curl -X GET \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "X-APP-ID: com.example.app" \
  "https://mobile.dingyue.io/segment/info"
```

### Google Ads

#### 获取 Google Ads 信息

获取 Google Ads 相关信息。

```http
GET /googlead/{platform}/{appId}/{appleId}
```

**路径参数**

- `platform` - 平台（ios/android）
- `appId` - 应用 ID
- `appleId` - Apple ID（iOS 特定）

## SDK 集成

### iOS SDK 示例

```swift
import DingyueSDK

// 初始化 SDK
DingyueSDK.initialize(apiKey: "YOUR_API_KEY")

// 设置用户 ID
DingyueSDK.setUserId("user_123456")

// 上报会话
DingyueSDK.reportSession(sessionId: "session_abc123", duration: 120)

// 上报事件
DingyueSDK.reportEvent(name: "purchase_completed", properties: [
    "product_id": "premium_monthly",
    "price": 9.99,
    "currency": "USD"
])

// 验证购买
DingyueSDK.verifyReceipt(receiptData: receiptData) { result in
    switch result {
    case .success(let response):
        print("Purchase verified: \(response)")
    case .failure(let error):
        print("Verification failed: \(error)")
    }
}
```

### Android SDK 示例

```java
import io.dingyue.sdk.DingyueSDK;

// 初始化 SDK
DingyueSDK.initialize(context, "YOUR_API_KEY");

// 设置用户 ID
DingyueSDK.setUserId("user_123456");

// 上报会话
DingyueSDK.reportSession("session_abc123", 120);

// 上报事件
Map<String, Object> properties = new HashMap<>();
properties.put("product_id", "premium_monthly");
properties.put("price", 9.99);
properties.put("currency", "USD");
DingyueSDK.reportEvent("purchase_completed", properties);
```

## API 响应

### 成功响应

```json
{
  "status": "success",
  "message": "Operation completed successfully"
}
```

### 错误响应

```json
{
  "status": "error",
  "code": "INVALID_API_KEY",
  "message": "The provided API key is invalid"
}
```

### 常见状态码

| 状态码 | 描述 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | API Key 无效或未提供 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 429 | 请求频率超限 |
| 500 | 服务器内部错误 |

## 错误码

| 错误码 | 描述 |
|--------|------|
| `INVALID_API_KEY` | API Key 无效 |
| `MISSING_REQUIRED_HEADER` | 缺少必需的请求头 |
| `INVALID_RECEIPT` | 无效的购买凭证 |
| `RECEIPT_ALREADY_USED` | 凭证已被使用 |
| `INVALID_PARAMETER` | 请求参数不合法 |
| `USER_NOT_FOUND` | 用户不存在 |

## 版本说明

### V2 接口

部分接口提供了 V2 版本，通常包含以下改进：

- 更好的数据结构
- 增强的错误处理
- 性能优化
- 新增字段支持

建议新项目使用 V2 版本接口。

### 接口版本对照

| V1 接口 | V2 接口 |
|---------|---------|
| `/sessions/report` | `/v2/sessions/report` |
| `/order/report` | `/v2/order/report` |
| `/users/report/events` | `/v2/users/report/events` |
| `/conversion/report` | `/v2/conversion/report` |
| `/report/{type}` | `/v2/report/{type}` |
| `/report/global_switch` | `/v2/report/global_switch` |
| `/users/attribute/update` | `/v2/users/attribute/update` |

## 详细文档

### [事件上报 API](/api/events)
完整的事件上报接口文档，包括事件上报、批量上报等功能。

## 相关资源

- [快速入门指南](/docs/快速入门指南)
- [iOS SDK 集成](/docs/iOS集成/安装)
- [事件汇报指南](/docs/iOS集成/事件汇报)
- [购买验证指南](/docs/iOS集成/购买验证)
- [会话汇报指南](/docs/iOS集成/Session汇报)
