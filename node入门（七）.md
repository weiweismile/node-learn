### node 入门（七） --- http模块（重要）

回调函数中的两大对象
* request
  >httpVersion:使用的http协议版本；
 headers:请求头中的信息；url:请求的地址；method：请求的方法  
* response
  >write(chunk, [encoding]):发送一个正文块到响应正文中；end(chunk, [encoding]):当所有的正文和头部信息发送完成后调用该方法告诉服务器数据已经全部发送完成，这个方法是在每次发送完信息之后必须调用的，并且是最后调用;statusCode：该属性用来设置返回的状态码；setHeader(value,name)：设置返回头信息；writeHead(statusCode[statusMessage][headers]):发送一个响应头给请求,该方法只能在当前请求中使用一次，并且必须在end()之前调用。

  > 设置头信息的方法必须在之前进行调用。


#### url
* parse()


#### querystring 模块 --- 用于解析与格式化 URL 的查询字符串

* parse()
* stringify()