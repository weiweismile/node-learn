### node 入门（七） --- http模块（重要）

回调函数中的两大对象
* request
  >httpVersion:使用的http协议版本；
 headers:请求头中的信息；
 url:请求的地址；method：请求的方法  
* response
  >write(chunk, [encoding]):发送一个正文块到响应正文中；
  *end(chunk, [encoding]):当所有的正文和头部信息发送完成后调用该方法告诉服务器数据已经全部发送完成，这个方法是在每次发送完信息之后必须调用的，并且是最后调用;
  statusCode：该属性用来设置返回的状态码；
  setHeader(value,name)：设置返回头信息；
  writeHead(statusCode[statusMessage][headers]):发送一个响应头给请求,该方法只能在当前请求中使用一次，并且必须在end()之前调用。

  > 设置头信息的方法必须在之前进行调用。


#### url
* parse()


#### querystring 模块 --- 用于解析与格式化 URL 的查询字符串

* parse()
* stringify()

####获取GET请求内容
由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。node.js 中 url 模块中的 parse 函数提供了这个功能。
```
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
```
#### 获取 POST 请求内容
POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做.(使用req对象来监听data事件)
```
var http = require('http');
var querystring = require('querystring');
 
http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
 
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
```