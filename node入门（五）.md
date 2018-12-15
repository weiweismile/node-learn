### node 入门（五） --- 网络（http）

#### http 模块
* request 对象
* response 对象


#### https 模块
* 区别在于https模块需要额外处理SSL证书。

```
  var options = {
      key: fs.readFileSync('./ssl/default.key'),
      cert: fs.readFileSync('./ssl/default.cer'),
  };

  var server = https.createServer(options, function(request, response) {});
```

> 与创建HTTP服务器相比，多了一个options对象，通过key和cert字段指定了HTTPS服务器使用的私钥和公钥。

* NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名提供服务。

```
  server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
  });

  server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
  });
```

> 但如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下https模块会拒绝连接，提示说有证书安全问题。在options里加入rejectUnauthorized: false字段可以禁用对证书有效性的检查，从而允许https模块请求开发环境下使用自制证书的HTTPS服务器。



#### URL模块

* parse(url) 方法来将一个URL字符串转换为URL对象

```
var url = require('url');
const baidu = 'https://www.baidu.com?a=1';
const obj = url.parse(baidu);
console.log(obj);
```
如下：
```
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?a=1',
  query: 'a=1',
  pathname: '/',
  path: '/?a=1',
  href: 'https://www.baidu.com/?a=1' }
```
> .parse方法还支持第二个和第三个布尔类型可选参数。第二个参数等于true时，该方法返回的URL对象中，query字段不再是一个字符串，而是一个经过querystring模块转换后的参数对象（就是将字符串变成了对象进行展示）。第三个参数等于true时，该方法可以正确解析不带协议头的URL，例如//www.example.com/foo/bar。(自己动手试试)

* format()  方法允许将一个URL对象转换为URL字符串

* resolve()  方法可以用于拼接URL

#### querystring()  模块用于实现URL参数字符串与参数对象的互相转换

* parse()

* stringify()

#### zlib模块   提供了数据压缩和解压的功能。当我们处理HTTP请求和响应时，可能需要用到这个模块。

>gzip是一种数据格式，默认且目前仅使用deflate算法压缩data部分；deflate是一种压缩算法,是huffman编码的一种加强。

* gizp()
* gunizp()

#### net模块 可用于创建Socket服务器或Socket客户端。

* Socket （自己去了解）

使用Socket搭建一个很不严谨的HTTP服务器的例子
```
net.createServer(function(connect) {
    connect.on('data', function(data) {
        connect.writeHead([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'hello world'
        ].join('/n'));
    });
}).listen(80);
```

使用Socket发起HTTP客户端请求的例子
```
var option = {
    port: 80,
    host: 'www.baidu.com',
};
const client = net.connect(option, function(connect) {
    connect.wirte([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'hello world'
        ].join('/n'));
});
client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});
```