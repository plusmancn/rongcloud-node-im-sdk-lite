# rongcloud-node-im-sdk-lite

> [rongcloud-web-im-sdk-v2](https://github.com/rongcloud/rongcloud-web-im-sdk-v2) 的 node 部分移植版。

## protobuf 解析
`.proto` 位置在 `config/rongcloud.proto`，配合 [protobufjs](https://github.com/dcodeIO/protobuf.js) 解析库，对融云消息体进行解析，详情查看 `lib/protobuf.js`。

## 交互流程



## 消息类型
类型转换公式
```
(标识符号 >> 4) & 15
```

### ConnAckMessage
> WebSocket 连接认证通过 server 返回

```
  +---> 类型标识符
[ |
  |          长度
  |          |   |   |   用户聊天ID
  32, 0,  0, 0,  5,  98,  53,  52,
  
      |
  48, 50, 0, 22, 97, 122, 112, 97,
  .... 后面位暂时未用到 .....
]
```
取出的用户ID，在 QueryMessage 里作为输入

### QueryMessage 
> client 请求历史消息报文如下

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

需要变动的是用户ID以及前方长度部分，比如用户为 c1782，则对应 Ascii 码为 `0, 5, 99, 49, 55, 56, 50`

### QueryAckMessage
> QueryMessage 请求的 Server 应答

```
  +---> 类型标识符
  |
[ |         |  unix（秒）  |
  99, 0, 1, 86, 236, 255, 212, 0,
  0,  10, .............protobuf..
  ..消息体.......................
]
```
此处的 protobuf 消息体，需要用 `Modules['DownStreamMessage'].decode` 方法解析。  
此处的时间转换也很有意思
```
                      转换为16进制，长度为2，缺位前方补 0
[86, 236, 255, 212] =======================================> ["56", "ec", "ff", "d4"]
parseInt("56ecffd4", 16) =====> 1458372564 
```
### QueryConMessage
> client 收到 QueryAckMessage 后向服务器做出的应答

```
  +---> 类型标识符
  |       + 本次会话内，第几次发送此类型消息
[ |       |
  112, 0, 1
]
```

### PublishMessage
> server 向 client 递送聊天消息

```
  +---> 类型标识符
  |
  |
[ |    |    unix（秒） |
  51,  86,  238, 6,   212, 0,  5,  115, 
                               |
  95,  109, 115, 103, 0,   8,  99, 49, 
  55,  50,  48,  53,  56,  50, 0,  1,
  ........protobuf 消息体............
]
```

### PingReqMessage
> client 发送给服务器的 💓 心跳包

```
[
  -64
];
```
此处使用 Typedarray 的时候，记得选择 Int8Array，带符号位数组。

### PingRespMessage
> 服务器  💓  心跳包返回

```
[
  -64
]
```

## Tips
使用 QueryMessage 的时候，注意融云消息24点过期机制
