# Adjust

## 服务器回传

要接受 Adjust 服务器回传，请转到「集成」 > Adjust 并打开接受回传数据开关。

![选择对象](/images/38.png)

然后将服务器回传 URL 粘贴至 Adjust 配置“服务器回传”的位置，并配置占位符（参考官方文档：https://help.adjust.com/zh/article/server-callbacks）。

![选择对象](/images/39.png)

![选择对象](/images/40.png)

![选择对象](/images/41.png)

![选择对象](/images/42.png)


建议添加以下占位符大类：User Data、Attribution Settings、Engagement Data、Google Ads、Facebook。
![选择对象](/images/43.png)
完成后可在 DingYue 进行归因（注意保存设置生效）。

## 活动

要集成 Adjust 广告，请转到「集成」 > Adjust 广告并设置参数。
![选择对象](/images/44.png)


需要填写三个参数：appToken、eventToken 和 authToken。

- appToken：在 Adjust 控制面板中进入应用，复制 App Token 粘贴至 DingYue。

![选择对象](/images/45.png)

![选择对象](/images/46.png)


- eventToken：在“所有设置”里找到事件令牌，复制粘贴至 DingYue。

![选择对象](/images/47.png)

![选择对象](/images/48.png)


- authToken：管理员在“所有设置 > S2S 安全”中获取 auth token，粘贴至 DingYue。