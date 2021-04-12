### Net 模块

主要的方法:

- connect() 建立 IPC TCP 连接。 socket.connect() 初始化链接，然后返回启动连接的 net.Socket
- createConnetction() 一个用于创建 net.Socket 的工厂函数
- createServer() 相当于 new Server()
- isIP()
- isIPV4()
- isIPV6()

主要的类:

#### Server (用于创建 TCP 或 IPC 服务器，继承自 EventEmitter)

服务器事件:

- listening 在调用 server.listen()绑定端口或者 Domian Socket 后触发。server.listen(prot, listeningListener)。
- connection 每个客户端套接字连接到服务器时触发。net.createServer()最后一个参数。
- close 当前服务器关闭时触发。在调用 server.close()后，服务器将停止接受新的套接字连接，但保持当前存在的连接。所有连接都断开后会触发该事件。
- error 当服务器发生异常时，将会触发该事件。如果不监听 error 事件，服务器将会抛出异常。

方法:

- close() 参数: callback 函数 阻止接受新的连接并保持现在的连接
- address() 获取 address,port,family
- listen() 启动一个服务器来监听连接 参数: 端口，callback 函数
- getConnections() 获取连接数
- ref()
- unref()

#### Socket

连接事件:

- data 当一端调用 write()发送数据时，另一端会触发 data 事件，事件传送的数据即是 write()发送的数据。
- end 当前连接中的任意一端发送了 FIN 数据时，将会触发该事件。
- connect 该事件仅用于客户端，当套接字与服务端连接成功时会被触发。
- drain 当任意一端调用 write()发送数据时，当前这端会触发该事件。
- error 发生异常触发
- close 当套接字完全关闭时，触发该事件。
- timeout 当一定时间后连接不再活跃时，该事件将会被触发，通知用户当前连接已经被闲置。

主要方法:

- address()
- connect() 通常使用 net.createConnetcion()
- destroy() 确保在此 socket 上不再有 I/O 活动。 销毁流并关闭连接
- end() 半关闭 socket。 例如发送一个 FIN 包。 服务端仍可以发送数据
- write() 在 socket 上发送数据 data: String, Buffer, Uint8Array
- resume() 在调用 socket.pause() 之后恢复读取数据
- pause() 暂停读写数据。也就是说，'data' 事件将不会再被触发。可以用于上传节流。
- setNoDelay() 当 TCP 连接被创建时，它会启用 Nagle 算法。Nagle 算法会延迟数据，然后再通过网络发送数据。它会尝试以延迟为代价优化吞吐量。

#### dgram (建立 UDP 连接)

自定义事件

- message
- listening
- close
- error

主要的类:

- Socket

#### Http 模块

主要的类:

- Agent
- ClientRequest
- Server
- ServerResponse
- IncomingMessage

主要的方法:

- createServer()
- get()
- request()
- validateHeaderName()
- validateHeaderValue()

属性:

- METHODS: 请求方法
- STATUS_CODE: 状态码
- globalAgent
- maxHeaerSize

#### Https 模块

主要的类:

- Agent
- Server

主要的方法

- createServer()
- get()
- requeset()

- 属性
  globalAgent
