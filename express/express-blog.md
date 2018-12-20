express blog

### 目录结构

* db 数据库存储目录
* models 数据库模型文件目录
* node_modules node第三方模块目录
* public 公共文件目录（js\css\html）
* routers 公共路由文件
* schemas 数据库结构文件（schema）目录
* views 模板视图文件目录
* app.js 应用启动（入口）文件
* package.js


### 路由绑定
* app.get() 或者 app.post()
```
app.get(path, function(req, res, next) {
    req: // http.request
    res: // http.response
    next: //用于执行下一个和路由匹配的函数
})
```

### 内容输出

* res.send() 发送内容到用户端
* res.render() 读取views目录下的指定文件，解析并返回给客户端。第一个参数表示模板文件，相对于views目录，并自动添加模板引擎后缀。第一个参数是传递给模板的参数

### 模板配置(实现后端逻辑与页面表现分离)
app.engine(xxx, yyyyy) // 定义模板引擎，使用模板引擎解析该xxx后缀文件，第一个参数是模板引擎的名称，同时也是文件的后缀，第二个参数是用于解析处理模板内容的方法
app.set('views', './views') //设置模板存放目录
app.set('view engine', 'html) //注册模板引擎

> 模板引擎在第一次读取文件并解析之后会将该文件缓存在内存中，下一次再次请求该文件时就直接从缓存中获取文件，而不需要重新读取。即使是在文件修改之后也不会重新读取，只能重启。这对开发环境来说是不友好的，因此需要进行设置{cache:false}（每个模板不同）。


### 静态文件

* 当页面中含有CSS等文件时，浏览器会在收到HTML页面后，再次请求CSS文件，这个时候node需要提供一个关于CSS的路由文件。

例如：
```
Request URL: http://localhost:8081/main.css
```

```
app.get('/main.css', function(req, res) {
    res.setHeader('content-type', 'text/css');
    res.send("body {background:red}");
});
```

但这样并不友好，毕竟静态文件并不需要动态的变化里面的内容，因此后端可以直接向前端一次性发送过去。

* 静态文件托管
在express下面有个static的方法（中间件），用于处理这个问题。

当用户访问的url已/public开始时，那么直接返回对应的__dirname + '/public' 下的文件（当前目录下的public文件下的文件）,所以你在HTML中写入CSS的路径时需要将/public加进来。同时在node的public下写入对应的CSS文件。
```
app.use('/public', express.static(__dirname + '/public'))

<link rel="stylesheet" type="text/css" href="/public/main.css" >
```





### 总结：
> * 用户发送http请求 -> url -> 解析路由 -> 找到匹配的规则 -> 指定绑定的函数，返回函数对应的内容至用户

* /public -> 静态文件处理 -> 直接读取指定目录下的文件，返回给用户 -> 动态 -> 处理业务逻辑,加载模板,解析模板 -> 返回数据给用户