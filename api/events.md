# 事件追踪 API

事件追踪 API 提供了完整的用户行为分析功能，支持自定义事件上报、批量事件处理和实时数据分析。

## 基础信息

- **基础路径**: `/events`
- **认证**: 需要 API Key
- **限制**: 标准用户 1000 请求/分钟

## 接口列表

### 上报事件

上报单个用户事件。

```http
POST /events
```

#### 请求体

```json
{
  "user_id": "user_123456",
  "event_name": "purchase_completed",
  "properties": {
    "product_id": "premium_monthly",
    "price": 9.99,
    "currency": "USD",
    "payment_method": "app_store"
  },
  "timestamp": "2024-11-04T15:30:00Z"
}
```

#### 响应示例

```json
{
  "data": {
    "event_id": "evt_abc123def456",
    "status": "recorded",
    "timestamp": "2024-11-04T15:30:00Z"
  }
}
```

### 批量上报事件

批量上报多个事件，提高效率。

```http
POST /events/batch
```

#### 请求体

```json
{
  "events": [
    {
      "user_id": "user_123456",
      "event_name": "app_opened",
      "properties": {
        "source": "push_notification"
      },
      "timestamp": "2024-11-04T15:30:00Z"
    },
    {
      "user_id": "user_123456",
      "event_name": "feature_used",
      "properties": {
        "feature_name": "premium_analytics"
      },
      "timestamp": "2024-11-04T15:31:00Z"
    }
  ]
}
```

### 获取事件分析数据

获取事件的统计分析数据。

```http
GET /events/analytics
```

#### 请求参数

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| start_date | string | 是 | 开始日期 (YYYY-MM-DD) |
| end_date | string | 是 | 结束日期 (YYYY-MM-DD) |
| event_name | string | 否 | 事件名称筛选 |
| user_id | string | 否 | 用户 ID 筛选 |
| group_by | string | 否 | 分组方式：day, week, month |

#### 响应示例

```json
{
  "data": {
    "total_events": 15420,
    "unique_users": 3250,
    "period": {
      "start": "2024-10-01",
      "end": "2024-10-31"
    },
    "breakdown": [
      {
        "date": "2024-10-01",
        "events": 450,
        "unique_users": 125
      }
    ],
    "top_events": [
      {
        "event_name": "app_opened",
        "count": 5420,
        "percentage": 35.2
      },
      {
        "event_name": "purchase_completed",
        "count": 1250,
        "percentage": 8.1
      }
    ]
  }
}
```

## 预定义事件

### 标准事件列表

| 事件名称 | 描述 | 必需属性 |
|----------|------|----------|
| `app_opened` | 应用启动 | - |
| `app_closed` | 应用关闭 | - |
| `user_registered` | 用户注册 | `registration_method` |
| `user_login` | 用户登录 | `login_method` |
| `purchase_started` | 开始购买 | `product_id` |
| `purchase_completed` | 完成购买 | `product_id`, `price`, `currency` |
| `subscription_started` | 订阅开始 | `product_id`, `trial_period` |
| `subscription_renewed` | 订阅续费 | `product_id` |
| `subscription_cancelled` | 订阅取消 | `product_id`, `reason` |
| `feature_used` | 功能使用 | `feature_name` |
| `error_occurred` | 错误发生 | `error_code`, `error_message` |

## 使用示例

### iOS SDK 示例

```swift
import DingyueSDK

// 上报购买事件
DingyueSDK.trackEvent("purchase_completed", parameters: [
    "product_id": "premium_monthly",
    "price": 9.99,
    "currency": "USD",
    "payment_method": "app_store"
])

// 上报自定义事件
DingyueSDK.trackEvent("custom_action", parameters: [
    "action_type": "button_click",
    "button_name": "upgrade_now",
    "screen_name": "pricing"
])
```

### JavaScript 示例

```javascript
// 上报事件
async function trackEvent(eventName, properties) {
  const response = await fetch('https://api.dingyue.com/v1/events', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: 'user_123456',
      event_name: eventName,
      properties: properties,
      timestamp: new Date().toISOString()
    })
  });
  
  return response.json();
}

// 使用示例
trackEvent('feature_used', {
  feature_name: 'premium_analytics',
  usage_duration: 120
});
```

## 相关资源

- [用户管理 API](/api/users)
- [订阅管理 API](/api/subscriptions)
- [事件汇报指南](/docs/iOS集成/事件汇报)
