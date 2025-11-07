# 上报IDFA

<CodeGroup>

<CodeGroupItem title="swift">

```swift
let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
DYMobileSDK.reportIdfa(idfa: idfa)
```

</CodeGroupItem>

<CodeGroupItem title="objective-c">

```objective-c
NSString *idfa = [[ASIdentifierManager sharedManager].advertisingIdentifier UUIDString];
[DYMobileSDK reportIdfaWithIdfa:idfa];
```

</CodeGroupItem>

</CodeGroup>