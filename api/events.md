# 事件上报 API

事件上报 API 用于上报用户行为事件数据，支持批量上报多个事件。

## 基础信息

- **基础路径**: `/users/report/events`
- **V2 路径**: `/v2/users/report/events`
- **认证**: 需要 API Key (通过 `X-API-KEY` 请求头)
- **请求方法**: POST

## 接口说明

### 上报事件

上报用户行为事件数据，支持批量上报。

```http
POST /users/report/events
POST /v2/users/report/events  # V2 版本（推荐使用）
```

#### 请求头

| 请求头 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| `X-API-KEY` | string | 是 | API Key |
| `X-USER-ID` | string | 是 | 当前用户的唯一标识 |
| `User-Agent` | string | 是 | 用户代理信息 |
| `X-APP-ID` | string | 是 | 应用的唯一标识 |
| `X-PLATFORM` | string | 是 | 平台标识（iOS/Android） |
| `X-VERSION` | string | 是 | SDK 版本号 |
| `Content-Type` | string | 是 | application/json |
| `Accept` | string | 是 | application/json |

#### 请求体

```json
{
  "events": [
    {
      "name": "app_opened",
      "user": "user_123456",
      "sessionId": "session_abc123",
      "extra": {
        "source": "push_notification",
        "screen": "home"
      }
    },
    {
      "name": "purchase_completed",
      "user": "user_123456",
      "sessionId": "session_abc123",
      "extra": {
        "product_id": "premium_monthly",
        "price": 9.99,
        "currency": "USD"
      }
    }
  ]
}
```

#### 请求参数说明

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `events` | array | 是 | 事件数组 |
| `events[].name` | string | 是 | 事件名称 |
| `events[].user` | string | 是 | 用户标识 |
| `events[].sessionId` | string | 是 | 会话 ID |
| `events[].extra` | object | 否 | 事件额外属性（自定义属性） |

#### 响应示例

**成功响应**

```json
{
  "status": "success",
  "message": "Events reported successfully"
}
```

**错误响应**

```json
{
  "status": "error",
  "code": "INVALID_PARAMETER",
  "message": "Event name is required"
}
```

## 使用示例

### cURL 示例

```bash
curl -X POST \
  -H "X-API-KEY: YOUR_API_KEY" \
  -H "X-USER-ID: user_123456" \
  -H "User-Agent: YourApp/1.0" \
  -H "X-APP-ID: com.example.app" \
  -H "X-PLATFORM: iOS" \
  -H "X-VERSION: 1.0.0" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  "https://mobile.dingyue.io/users/report/events" \
  -d '{
    "events": [
      {
        "name": "app_opened",
        "user": "user_123456",
        "sessionId": "session_abc123",
        "extra": {
          "source": "push_notification"
        }
      },
      {
        "name": "feature_used",
        "user": "user_123456",
        "sessionId": "session_abc123",
        "extra": {
          "feature_name": "premium_analytics",
          "usage_duration": 120
        }
      }
    ]
  }'
```

### iOS Swift 示例

```swift
import Foundation

func reportEvents() {
    let url = URL(string: "https://mobile.dingyue.io/users/report/events")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    
    // 设置请求头
    request.setValue("YOUR_API_KEY", forHTTPHeaderField: "X-API-KEY")
    request.setValue("user_123456", forHTTPHeaderField: "X-USER-ID")
    request.setValue("YourApp/1.0", forHTTPHeaderField: "User-Agent")
    request.setValue("com.example.app", forHTTPHeaderField: "X-APP-ID")
    request.setValue("iOS", forHTTPHeaderField: "X-PLATFORM")
    request.setValue("1.0.0", forHTTPHeaderField: "X-VERSION")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue("application/json", forHTTPHeaderField: "Accept")
    
    // 构建请求体
    let events: [String: Any] = [
        "events": [
            [
                "name": "app_opened",
                "user": "user_123456",
                "sessionId": "session_abc123",
                "extra": [
                    "source": "push_notification"
                ]
            ],
            [
                "name": "purchase_completed",
                "user": "user_123456",
                "sessionId": "session_abc123",
                "extra": [
                    "product_id": "premium_monthly",
                    "price": 9.99,
                    "currency": "USD"
                ]
            ]
        ]
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: events)
    
    URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Error: \(error)")
            return
        }
        
        if let data = data {
            let result = try? JSONSerialization.jsonObject(with: data)
            print("Result: \(result ?? "nil")")
        }
    }.resume()
}
```

### Android Java 示例

```java
import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;

public class EventReporter {
    private static final String API_URL = "https://mobile.dingyue.io/users/report/events";
    private static final String API_KEY = "YOUR_API_KEY";
    
    public void reportEvents() {
        OkHttpClient client = new OkHttpClient();
        
        // 构建请求体
        JSONArray events = new JSONArray();
        
        JSONObject event1 = new JSONObject();
        event1.put("name", "app_opened");
        event1.put("user", "user_123456");
        event1.put("sessionId", "session_abc123");
        JSONObject extra1 = new JSONObject();
        extra1.put("source", "push_notification");
        event1.put("extra", extra1);
        events.put(event1);
        
        JSONObject event2 = new JSONObject();
        event2.put("name", "purchase_completed");
        event2.put("user", "user_123456");
        event2.put("sessionId", "session_abc123");
        JSONObject extra2 = new JSONObject();
        extra2.put("product_id", "premium_monthly");
        extra2.put("price", 9.99);
        extra2.put("currency", "USD");
        event2.put("extra", extra2);
        events.put(event2);
        
        JSONObject requestBody = new JSONObject();
        requestBody.put("events", events);
        
        RequestBody body = RequestBody.create(
            requestBody.toString(),
            MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
            .url(API_URL)
            .addHeader("X-API-KEY", API_KEY)
            .addHeader("X-USER-ID", "user_123456")
            .addHeader("User-Agent", "YourApp/1.0")
            .addHeader("X-APP-ID", "com.example.app")
            .addHeader("X-PLATFORM", "Android")
            .addHeader("X-VERSION", "1.0.0")
            .addHeader("Content-Type", "application/json")
            .addHeader("Accept", "application/json")
            .post(body)
            .build();
        
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }
            
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String result = response.body().string();
                    System.out.println("Success: " + result);
                } else {
                    System.out.println("Error: " + response.code());
                }
            }
        });
    }
}
```

### JavaScript 示例

```javascript
async function reportEvents() {
  const url = 'https://mobile.dingyue.io/users/report/events';
  
  const events = [
    {
      name: 'app_opened',
      user: 'user_123456',
      sessionId: 'session_abc123',
      extra: {
        source: 'push_notification'
      }
    },
    {
      name: 'purchase_completed',
      user: 'user_123456',
      sessionId: 'session_abc123',
      extra: {
        product_id: 'premium_monthly',
        price: 9.99,
        currency: 'USD'
      }
    }
  ];
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': 'YOUR_API_KEY',
        'X-USER-ID': 'user_123456',
        'User-Agent': 'YourApp/1.0',
        'X-APP-ID': 'com.example.app',
        'X-PLATFORM': 'iOS',
        'X-VERSION': '1.0.0',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ events })
    });
    
    const result = await response.json();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 使用示例
reportEvents();
```

## 常见事件类型

### 应用生命周期事件

| 事件名称 | 描述 | 建议属性 |
|----------|------|----------|
| `app_opened` | 应用启动 | `source` (启动来源) |
| `app_closed` | 应用关闭 | `duration` (使用时长) |
| `app_background` | 应用进入后台 | - |
| `app_foreground` | 应用回到前台 | - |

### 用户行为事件

| 事件名称 | 描述 | 建议属性 |
|----------|------|----------|
| `screen_view` | 页面浏览 | `screen_name` (页面名称) |
| `button_click` | 按钮点击 | `button_name` (按钮名称) |
| `feature_used` | 功能使用 | `feature_name` (功能名称) |

### 购买相关事件

| 事件名称 | 描述 | 建议属性 |
|----------|------|----------|
| `purchase_started` | 开始购买 | `product_id` (产品 ID) |
| `purchase_completed` | 完成购买 | `product_id`, `price`, `currency` |
| `purchase_cancelled` | 取消购买 | `product_id`, `reason` |
| `subscription_started` | 订阅开始 | `product_id`, `trial_period` |
| `subscription_renewed` | 订阅续费 | `product_id` |
| `subscription_cancelled` | 订阅取消 | `product_id`, `reason` |

## 最佳实践

### 1. 批量上报

为了提高效率，建议将多个事件合并到一次请求中批量上报：

```javascript
// ✅ 推荐：批量上报
const events = [
  { name: 'app_opened', user: 'user_123', sessionId: 'sess_1', extra: {} },
  { name: 'screen_view', user: 'user_123', sessionId: 'sess_1', extra: { screen: 'home' } },
  { name: 'button_click', user: 'user_123', sessionId: 'sess_1', extra: { button: 'upgrade' } }
];
await reportEvents({ events });

// ❌ 不推荐：逐个上报
for (const event of events) {
  await reportEvents({ events: [event] });
}
```

### 2. 事件命名规范

建议使用小写字母和下划线命名事件：

- ✅ `app_opened`
- ✅ `purchase_completed`
- ✅ `screen_view`
- ❌ `AppOpened`
- ❌ `purchaseCompleted`
- ❌ `screen-view`

### 3. 会话 ID 管理

确保同一个会话的所有事件使用相同的 `sessionId`：

```javascript
const sessionId = generateSessionId(); // 会话开始时生成

// 同一会话中的所有事件使用相同的 sessionId
reportEvent('app_opened', { sessionId });
reportEvent('screen_view', { sessionId, screen: 'home' });
reportEvent('button_click', { sessionId, button: 'upgrade' });
```

### 4. 错误处理

始终处理可能的错误情况：

```javascript
async function reportEventsWithRetry(events, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await reportEvents({ events });
      if (response.status === 'success') {
        return response;
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
```

## V2 版本

V2 版本的接口路径为 `/v2/users/report/events`，建议新项目使用 V2 版本，它提供了：

- 更好的数据结构
- 增强的错误处理
- 性能优化

V2 版本的请求格式与 V1 相同。

## 错误码

| 错误码 | 描述 |
|--------|------|
| `INVALID_API_KEY` | API Key 无效 |
| `MISSING_REQUIRED_HEADER` | 缺少必需的请求头 |
| `INVALID_PARAMETER` | 请求参数不合法 |
| `EVENT_NAME_REQUIRED` | 事件名称不能为空 |
| `USER_REQUIRED` | 用户标识不能为空 |
| `SESSION_ID_REQUIRED` | 会话 ID 不能为空 |

## 相关资源

- [API 概览](/api/)
- [事件汇报指南](/docs/iOS集成/事件汇报)
- [会话汇报指南](/docs/iOS集成/Session汇报)
- [快速入门指南](/docs/快速入门指南)
