# 订阅管理 API

订阅管理 API 提供了完整的订阅生命周期管理功能，包括订阅创建、状态查询、购买验证、续费管理等操作。

## 基础信息

- **基础路径**: `/subscriptions`
- **认证**: 需要 API Key
- **限制**: 标准用户 200 请求/分钟

## 接口列表

### 获取订阅列表

获取应用下的所有订阅记录，支持分页和筛选。

```http
GET /subscriptions
```

#### 请求参数

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| page | integer | 否 | 页码，默认 1 |
| limit | integer | 否 | 每页数量，默认 20，最大 100 |
| user_id | string | 否 | 用户 ID 筛选 |
| status | string | 否 | 订阅状态：active, expired, cancelled, pending |
| product_id | string | 否 | 产品 ID 筛选 |
| platform | string | 否 | 平台筛选：ios, android, web |

#### 响应示例

```json
{
  "data": [
    {
      "id": "sub_123456789",
      "user_id": "user_123456",
      "product_id": "premium_monthly",
      "platform": "ios",
      "status": "active",
      "price": 9.99,
      "currency": "USD",
      "started_at": "2024-10-04T10:30:00Z",
      "expires_at": "2024-11-04T10:30:00Z",
      "auto_renew": true,
      "trial_period": false,
      "created_at": "2024-10-04T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 856,
    "pages": 43
  }
}
```

### 获取订阅详情

根据订阅 ID 获取订阅的详细信息。

```http
GET /subscriptions/{subscription_id}
```

#### 响应示例

```json
{
  "data": {
    "id": "sub_123456789",
    "user_id": "user_123456",
    "product_id": "premium_monthly",
    "platform": "ios",
    "status": "active",
    "price": 9.99,
    "currency": "USD",
    "started_at": "2024-10-04T10:30:00Z",
    "expires_at": "2024-11-04T10:30:00Z",
    "auto_renew": true,
    "trial_period": false,
    "trial_expires_at": null,
    "created_at": "2024-10-04T10:30:00Z",
    "updated_at": "2024-11-04T08:15:00Z",
    "product_info": {
      "name": "Premium Monthly",
      "description": "高级功能月度订阅",
      "features": ["无广告", "高级分析", "优先支持"]
    },
    "payment_info": {
      "transaction_id": "txn_abc123def456",
      "receipt_data": "base64_encoded_receipt",
      "payment_method": "app_store",
      "last_payment": "2024-10-04T10:30:00Z",
      "next_billing": "2024-11-04T10:30:00Z"
    },
    "usage_stats": {
      "features_used": 15,
      "last_activity": "2024-11-04T14:20:00Z",
      "total_sessions": 45
    }
  }
}
```

### 创建订阅

创建新的订阅记录。

```http
POST /subscriptions
```

#### 请求体

```json
{
  "user_id": "user_123456",
  "product_id": "premium_monthly",
  "platform": "ios",
  "price": 9.99,
  "currency": "USD",
  "transaction_id": "txn_abc123def456",
  "receipt_data": "base64_encoded_receipt",
  "auto_renew": true,
  "trial_period": false
}
```

#### 响应示例

```json
{
  "data": {
    "id": "sub_987654321",
    "user_id": "user_123456",
    "product_id": "premium_monthly",
    "status": "pending_verification",
    "created_at": "2024-11-04T15:30:00Z"
  }
}
```

### 验证订阅购买

验证来自应用商店的购买凭证。

```http
POST /subscriptions/verify
```

#### 请求体

```json
{
  "platform": "ios",
  "receipt_data": "base64_encoded_receipt",
  "user_id": "user_123456",
  "transaction_id": "txn_abc123def456"
}
```

#### 响应示例

```json
{
  "data": {
    "verification_status": "valid",
    "subscription_id": "sub_123456789",
    "product_id": "premium_monthly",
    "expires_at": "2024-11-04T10:30:00Z",
    "auto_renew": true,
    "trial_period": false,
    "original_transaction_id": "original_txn_123",
    "purchase_date": "2024-10-04T10:30:00Z"
  }
}
```

### 更新订阅状态

更新订阅的状态或配置。

```http
PUT /subscriptions/{subscription_id}
```

#### 请求体

```json
{
  "status": "cancelled",
  "auto_renew": false,
  "cancellation_reason": "user_request",
  "cancellation_date": "2024-11-04T15:45:00Z"
}
```

### 取消订阅

取消用户的订阅。

```http
POST /subscriptions/{subscription_id}/cancel
```

#### 请求体

```json
{
  "reason": "user_request",
  "immediate": false,
  "refund": false
}
```

## 订阅状态管理

### 续费订阅

```http
POST /subscriptions/{subscription_id}/renew
```

#### 请求体

```json
{
  "transaction_id": "txn_new_renewal",
  "receipt_data": "base64_encoded_receipt",
  "expires_at": "2024-12-04T10:30:00Z"
}
```

### 暂停订阅

```http
POST /subscriptions/{subscription_id}/pause
```

#### 请求体

```json
{
  "pause_duration": 30,
  "unit": "days",
  "reason": "user_request"
}
```

### 恢复订阅

```http
POST /subscriptions/{subscription_id}/resume
```

## 产品管理

### 获取产品列表

```http
GET /subscriptions/products
```

#### 响应示例

```json
{
  "data": [
    {
      "id": "premium_monthly",
      "name": "Premium Monthly",
      "description": "高级功能月度订阅",
      "price": 9.99,
      "currency": "USD",
      "billing_period": "monthly",
      "trial_period_days": 7,
      "features": ["无广告", "高级分析", "优先支持"],
      "platforms": ["ios", "android"],
      "active": true
    },
    {
      "id": "premium_yearly",
      "name": "Premium Yearly",
      "description": "高级功能年度订阅",
      "price": 99.99,
      "currency": "USD",
      "billing_period": "yearly",
      "trial_period_days": 14,
      "features": ["无广告", "高级分析", "优先支持", "年度报告"],
      "platforms": ["ios", "android"],
      "active": true
    }
  ]
}
```

## 收入分析

### 获取收入统计

```http
GET /subscriptions/revenue
```

#### 请求参数

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| start_date | string | 是 | 开始日期 (YYYY-MM-DD) |
| end_date | string | 是 | 结束日期 (YYYY-MM-DD) |
| group_by | string | 否 | 分组方式：day, week, month |
| product_id | string | 否 | 产品 ID 筛选 |

#### 响应示例

```json
{
  "data": {
    "total_revenue": 15420.50,
    "currency": "USD",
    "period": {
      "start": "2024-10-01",
      "end": "2024-10-31"
    },
    "breakdown": [
      {
        "date": "2024-10-01",
        "revenue": 450.30,
        "subscriptions": 45,
        "new_subscriptions": 12,
        "renewals": 33
      }
    ],
    "products": [
      {
        "product_id": "premium_monthly",
        "revenue": 8950.20,
        "percentage": 58.1
      },
      {
        "product_id": "premium_yearly",
        "revenue": 6470.30,
        "percentage": 41.9
      }
    ]
  }
}
```

## Webhook 通知

### 订阅状态变更通知

当订阅状态发生变化时，系统会发送 Webhook 通知。

#### 通知格式

```json
{
  "event": "subscription.status_changed",
  "timestamp": "2024-11-04T15:30:00Z",
  "data": {
    "subscription_id": "sub_123456789",
    "user_id": "user_123456",
    "old_status": "active",
    "new_status": "expired",
    "expires_at": "2024-11-04T10:30:00Z",
    "auto_renew": false
  }
}
```

## 错误处理

### 常见错误码

| 错误码 | HTTP 状态 | 描述 |
|--------|-----------|------|
| SUBSCRIPTION_NOT_FOUND | 404 | 订阅不存在 |
| INVALID_RECEIPT | 400 | 无效的购买凭证 |
| RECEIPT_ALREADY_USED | 400 | 凭证已被使用 |
| PRODUCT_NOT_FOUND | 404 | 产品不存在 |
| SUBSCRIPTION_EXPIRED | 400 | 订阅已过期 |
| VERIFICATION_FAILED | 400 | 购买验证失败 |

## 使用示例

### iOS 购买验证

```swift
// Swift 示例
func verifyPurchase(receiptData: String, transactionId: String) {
    let url = URL(string: "https://api.dingyue.com/v1/subscriptions/verify")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("Bearer YOUR_API_KEY", forHTTPHeaderField: "Authorization")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    
    let body = [
        "platform": "ios",
        "receipt_data": receiptData,
        "user_id": "user_123456",
        "transaction_id": transactionId
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: body)
    
    URLSession.shared.dataTask(with: request) { data, response, error in
        // 处理响应
    }.resume()
}
```

### JavaScript 示例

```javascript
// 获取用户订阅状态
async function getUserSubscriptions(userId) {
  const response = await fetch(`https://api.dingyue.com/v1/subscriptions?user_id=${userId}`, {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  return data.data;
}

// 取消订阅
async function cancelSubscription(subscriptionId, reason) {
  const response = await fetch(`https://api.dingyue.com/v1/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reason: reason,
      immediate: false
    })
  });
  
  return response.json();
}
```

## 相关资源

- [事件追踪 API](/api/events)
- [订阅配置指南](/docs/订阅配置)
- [iOS 购买验证](/docs/iOS集成/购买验证)
