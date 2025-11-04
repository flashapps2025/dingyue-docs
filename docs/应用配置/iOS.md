# iOS

## Dingyue SDK

##### 为什么要安装SDK？

DingYue 为 StoreKit 和 Google Play Billing 提供了一个后端和包装器，以简化应用内购买和订阅的实施。使用我们的 SDK，您可以在任何平台上构建和管理您的应用业务，而无需维护 IAP 基础架构。

## Bundle ID

Bundle ID是系统App唯一识别的ID，我们需要Bundle ID来区分您的应用程序。要查找 App Bundle ID，请登陆 App Store Connect，转到我的应用程序，然后选择您需要其 ID 的应用程序，在App信息中，复制"套装ID"即可。

![图片1.png](/images/07-1.png)

## App Store Connect 共享密钥

![图片4.png](/images/07-19.png)

此密钥是特定于应用程序的，用于接收此App 自动续订订阅收据的唯一代码，请确保为您的每个应用程序生成它。

登陆App Store Connect，找到功能 >订阅 > App专用共享密钥，复制粘贴即可。

![图片2.png](/images/07-2.png)

## App Store 服务器通知

基于Apple提供的最新的服务器通知版本2，在App Store Connect中的App Store 服务器通知设置URL，我们将会帮您接收Apple发送的订阅通知。如果您需要自己处理订阅事件，则填写"转发原始Apple 事件的URL"即可。 将 Apple 订阅状态URL设置为 Dingyue

1.复制沙盒环境服务器URL 和 生产环境服务器URL

![图片8.png](/images/07-3.png)

2.登录App Store Connect账户，选择要设置的应用程序，找到「综合」>「App信息」>「App Store服务器通知」,找到「生产环境服务器」和「沙盒环境服务器」并选择"编辑"

![图片9.png](/images/07-20.png)

3.通知版本选择"版本2"，并将复制的URL分别粘贴进沙盒和生产环境服务器的URL中，点击"存储"。

![图片1.png](/images/07-4.png)

服务器配置完成，您可以收到我们帮您处理的订阅推送。

## 原始事件转发

如果您希望在不失去对原始 Apple 事件的访问权限的情况下尝试 Dingyue SDK，那么您可以使用用于转发原始 Apple 事件的URL字段。将您希望用于处理推送的服务器链接粘贴在DingYue平台指定位置上，我们将在收到苹果服务器推送时将原始事件转发至您所配置的服务器上。

![图片11.png](/images/07-5.png)

## 推送通知

如果您更新了应用程序，或者您定制了新的优惠服务，想要为用户发送通知，那么需要配置iOS推送通知。配置iOS推送通知需要生成用于发送推送通知的证书，可能会花费您一些时间。配置完成后，则可以通过推送功能为用户发送促销活动、更新通知等等。

#### 在浏览器创建证书

打开[Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/authkeys/list)证书管理网站，选择「 Key」>「 Create a key」

![创建证书](/images/07-6.png)

在下一页中输入Key Name, 选择 Apple Push Notification service（APNs）,然后点击Continue按钮完成创建

![配置证书](/images/07-7.png)

点击注册按钮此证书即可生效

![注册证书](/images/07-8.png)

完成注册此页会有Key Id,Team Id等信息记录一下，然后下载此证书

![下载证书](/images/07-9.png)

点击下载后会生成一个p8格式的文件，读取文件内容（打开方式选文本编辑），复制证书内容。

![读取证书内容](/images/07-10.png)

最后将证书内容，Key Id , Team Id等信息填到DingYue网站相应位置保存即可完成推送证书到添加。

![填写证书信息](/images/07-11.png)

*注：此证书每个账号创建成功后仅可下载一次，请妥善保管。如不慎丢失此文件只能通过移除已创建的证书后重新创建新的推送证书的方式来恢复。下载后此账号下所有app通用此证书，无需针对单个APP重新申请。

## App Store Connect API

![App Store Connect API](/images/07-12.png)

**登录Apple Connect后台：**

![配置步骤1](/images/07-13.png)

![配置步骤2](/images/07-14.png)

![配置步骤3](/images/07-15.png)

![配置步骤4](/images/07-16.png)

## App Store Server API

![App Store Server API](/images/07-17.png)

**登录Apple Connect后台：**（操作方法同上方Connect API的位置不同，其他都一致，需要注意的是不要把Connect API和Sever API填错，另外密钥只能生成一次，请妥善保管）

![Server API配置](/images/07-18.png)
