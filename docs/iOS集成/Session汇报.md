# Session 汇报

当首次汇报已激活SDK，之后每次汇报将不再记录为新用户

在 AppDelegate 文件中：

```swift
import DingYue_iOS_SDK
```

```objective-c
@import DingYue_iOS_SDK;
```

在 application(_:didFinishLaunchingWithOptions:) 添加session 汇报：

```swift
/** - returns: ([String:Any]?,Error?) */
DYMobileSDK.activate { results, error in
    if error == nil {
        if let result = results {
            // 开关
            if let switchs = result["switchs"] as? [SwitchItem] {
            }
            // 购买过的有效产品
            if let subscribedOjects = result["subscribedOjects"] as? [[String:Any]] {
                // subscribedOject["platformProductId"]
                // subscribedOject["originalTransactionId"]
                // subscribedOject["expiresAt"]
            }
            // 远程开关
            if let globalSwitchItems = result["globalSwitchItems"] as? [GlobalSwitch] {
            }
            // 是否使用本地内购页
            if let isUseNativePaywall = result["isUseNativePaywall"] as? Bool {
                // 本地内购页ID（须和内购页包名一致）
                if let nativePaywallId = result["nativePaywallId"] as? String {
                    // 使用本地内购页的话，需要工程师提前通过‘loadNativePaywall(paywallFullPath: String,basePath:String)’方法设置本地内购页Path
                }
            }
        }
    }
}
```

```objective-c
/** - returns: (NSDictionary<NSString *,id> * results, NSError * error) */
[DYMobileSDK activateWithCompletion:^(NSDictionary<NSString *,id> * results, NSError * error) {
    if (error == nil) {
        if (results) {
            // 网页自定义开关
            NSArray<SwitchItem *> *switchs = results[@"switchs"];
            // 购买过的有效产品
            NSArray<NSDictionary<NSString *,id>*> *subscribedOjects = results[@"subscribedOjects"];
            // 远程开关
            NSArray<GlobalSwitch *> *globalSwitchs = results[@"globalSwitchItems"];
            // 是否使用本地内购页
            BOOL isUseNativePaywall = results[@"isUseNativePaywall"];
            if (isUseNativePaywall == YES) {
                // 本地内购页ID（须和内购页包名一致）
                NSString *nativePaywallId = results[@"nativePaywallId"];
                // 使用本地内购页的话，需要工程师提前通过‘[DYMobileSDK loadNativePaywallWithPaywallFullPath: basePath:]’方法设置本地内购页Path
            }
        }
    }
}];
```
