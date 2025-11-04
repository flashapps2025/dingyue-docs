# 上报IDFA

```swift
let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
DYMobileSDK.reportIdfa(idfa: idfa)
```

```objective-c
NSString *idfa = [[ASIdentifierManager sharedManager].advertisingIdentifier UUIDString];
[DYMobileSDK reportIdfaWithIdfa:idfa];
```