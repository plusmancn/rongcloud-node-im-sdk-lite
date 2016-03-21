# rongcloud-node-im-sdk-lite

> [rongcloud-web-im-sdk-v2](https://github.com/rongcloud/rongcloud-web-im-sdk-v2) 的 node 部分移植版。

## .proto 数据格式描述文件
`.proto` 位置在 `config/rongcloud.proto`，配合 [protobufjs](https://github.com/dcodeIO/protobuf.js) 解析库，对融云消息体进行解析。

## 交互流程


## 消息类型
### QueryMessage 
> 请求历史消息报文如下

```
  +---> 类型标识符
  |
  |     长度
  |    |    |   p    u    l    l   M
[ |    |    |   |    |    |    |   |
  82,  0,   7, 112, 117, 108, 108, 77, 
  
                    |    用户ID
  s     g   长度    b    1    0    8
  |     |   |  |    |    |    |    |
  115, 103, 0, 6,   98,  49,  48,  56,
  
       |
  0    6
  |    |
  48,  54,  0, 1,   8,   0,   16,  0, 
  32,  1
]
```

需要变动的是用户ID以及前方长度部分，比如用户为 c1782，则输出为 `0, 5, 99, 49, 55, 56, 50`


## Tips
使用 QueryMessage 的时候，注意融云消息24点过期机制
