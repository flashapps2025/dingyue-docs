# 用户管理 API

用户管理 API 提供了完整的用户生命周期管理功能，包括用户注册、登录、信息更新和删除等操作。

## 基础信息

- **基础路径**: `/users`
- **认证**: 需要 API Key
- **限制**: 标准用户 100 请求/分钟

## 接口列表

### 获取用户列表

获取应用下的所有用户列表，支持分页和筛选。

```http
GET /users
```

#### 请求参数

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| page | integer | 否 | 页码，默认 1 |
| limit | integer | 否 | 每页数量，默认 20，最大 100 |
| status | string | 否 | 用户状态：active, inactive, banned |
| created_after | string | 否 | 创建时间筛选（ISO 8601 格式） |
| search | string | 否 | 搜索关键词（用户名、邮箱） |

#### 响应示例

```json
{
  "data": [
    {
      "id": "user_123456",
      "username": "john_doe",
      "email": "john@example.com",
      "status": "active",
      "subscription_status": "premium",
      "created_at": "2024-01-15T10:30:00Z",
      "last_active": "2024-11-04T14:20:00Z",
      "metadata": {
        "device_type": "iOS",
        "app_version": "2.1.0"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1250,
    "pages": 63
  }
}
```

### 获取用户详情

根据用户 ID 获取用户的详细信息。

```http
GET /users/{user_id}
```

#### 路径参数

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| user_id | string | 是 | 用户唯一标识符 |

#### 响应示例

```json
{
  "data": {
    "id": "user_123456",
    "username": "john_doe",
    "email": "john@example.com",
    "status": "active",
    "subscription_status": "premium",
    "subscription_expires_at": "2024-12-15T10:30:00Z",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-11-04T14:20:00Z",
    "last_active": "2024-11-04T14:20:00Z",
    "profile": {
      "first_name": "John",
      "last_name": "Doe",
      "avatar_url": "https://example.com/avatar.jpg",
      "timezone": "UTC+8",
      "language": "zh-CN"
    },
    "metadata": {
      "device_type": "iOS",
      "device_id": "ABC123DEF456",
      "app_version": "2.1.0",
      "os_version": "17.1",
      "registration_source": "app_store"
    },
    "analytics": {
      "total_sessions": 156,
      "total_events": 2340,
      "lifetime_value": 29.97,
      "last_purchase": "2024-10-15T09:15:00Z"
    }
  }
}
```

### 创建用户

创建新用户账户。

```http
POST /users
```

#### 请求体

```json
{
  "username": "new_user",
  "email": "newuser@example.com",
  "profile": {
    "first_name": "New",
    "last_name": "User",
    "timezone": "UTC+8",
    "language": "zh-CN"
  },
  "metadata": {
    "device_type": "iOS",
    "device_id": "XYZ789ABC123",
    "app_version": "2.1.0",
    "registration_source": "app_store"
  }
}
```

#### 响应示例

```json
{
  "data": {
    "id": "user_789012",
    "username": "new_user",
    "email": "newuser@example.com",
    "status": "active",
    "subscription_status": "free",
    "created_at": "2024-11-04T15:30:00Z",
    "profile": {
      "first_name": "New",
      "last_name": "User",
      "timezone": "UTC+8",
      "language": "zh-CN"
    }
  }
}
```

### 更新用户信息

更新现有用户的信息。

```http
PUT /users/{user_id}
```

#### 请求体

```json
{
  "status": "active",
  "profile": {
    "first_name": "Updated",
    "last_name": "Name",
    "avatar_url": "https://example.com/new-avatar.jpg"
  },
  "metadata": {
    "app_version": "2.1.1"
  }
}
```

### 删除用户

删除用户账户（软删除）。

```http
DELETE /users/{user_id}
```

#### 响应示例

```json
{
  "message": "用户已成功删除",
  "deleted_at": "2024-11-04T15:45:00Z"
}
```

## 用户状态管理

### 封禁用户

```http
POST /users/{user_id}/ban
```

#### 请求体

```json
{
  "reason": "违反服务条款",
  "duration": 7,
  "unit": "days"
}
```

### 解封用户

```http
POST /users/{user_id}/unban
```

## 批量操作

### 批量更新用户

```http
POST /users/batch
```

#### 请求体

```json
{
  "action": "update_status",
  "user_ids": ["user_123", "user_456", "user_789"],
  "data": {
    "status": "active"
  }
}
```

## 错误处理

### 常见错误码

| 错误码 | HTTP 状态 | 描述 |
|--------|-----------|------|
| USER_NOT_FOUND | 404 | 用户不存在 |
| DUPLICATE_EMAIL | 400 | 邮箱已被使用 |
| DUPLICATE_USERNAME | 400 | 用户名已被使用 |
| INVALID_EMAIL_FORMAT | 400 | 邮箱格式不正确 |
| USER_BANNED | 403 | 用户已被封禁 |

### 错误响应示例

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "指定的用户不存在",
    "details": {
      "user_id": "user_123456"
    }
  }
}
```

## 使用示例

### cURL 示例

```bash
# 获取用户列表
curl -X GET "https://api.dingyue.com/v1/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"

# 创建用户
curl -X POST "https://api.dingyue.com/v1/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com",
    "profile": {
      "first_name": "Test",
      "last_name": "User"
    }
  }'
```

### JavaScript 示例

```javascript
// 获取用户详情
async function getUser(userId) {
  const response = await fetch(`https://api.dingyue.com/v1/users/${userId}`, {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data;
}

// 更新用户信息
async function updateUser(userId, userData) {
  const response = await fetch(`https://api.dingyue.com/v1/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
}
```

## 相关资源

- [订阅管理 API](/api/subscriptions)
- [事件追踪 API](/api/events)
- [用户管理指南](/docs/用户管理)
