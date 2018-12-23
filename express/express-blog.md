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
### 小结：
> * 用户发送http请求 -> url -> 解析路由 -> 找到匹配的规则 -> 指定绑定的函数，返回函数对应的内容至用户

* /public -> 静态文件处理 -> 直接读取指定目录下的文件，返回给用户 -> 动态 -> 处理业务逻辑,加载模板,解析模板 -> 返回数据给用户


### 模块划分
使用app.use()进行模块划分，根据不同模块进行路由模块的加载。

>  app.use():用来给path注册中间函数的。这个path默认是“/”，也就是处理任何请求，同时注意的是他会处理path下的子路径，如果设置path为‘/hello’,那么请求路径为‘/hello/’,'/hello/nihao','/hello/bye'这样的请求都会交给中间函数处理的。于是我们现在知道了app.use(express.static(_dirname + '/public'))是将所有请求，先交给express.static(_dirname + '/public')来处理一下。


### schemas数据库结构设计
这里使用的是MongoDB,项目中使用Mongoose,它是在node.js异步环境下对mongodb进行便捷操作的对象模型工具。

* 一些基础知识
   * MongoDB： 它是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以文档的形式存储。它与一些关系型数据库相比，它更显得轻巧、灵活，非常适合在数据规模很大、事务性不强的场合下使用。
（1）由c++语言编写，是一个分布式文件存储的开源NoSQL数据库系统。在高负载的情况下，添加更多的节点，可以保证服务器性能。
（2）mongoDB旨在为web应用提供可扩展的高性能数据存储解决方案
（3） mongoDB将数据存储为一个文档，数据结构由键值对组成。mongoDB文档类似于JSON对象，字段值可以包含其他文档、数组及文档数组。

    * mongoose: 是mongoDB的一个对象模型工具，是基于node-mongodb-native开发的mongoDB的nodejs驱动，可以在异步的环境下执行。同时它也是针对mongoDB操作的一个对象模型库，封装了mongoDB对文档的一些增删改查等常用方法，让nodejs操作mongoDB数据库变得更加容易。

        > 如果要通过mongoose创建一个集合并对其进行增删改查，就需要用到Schema(数据属性模型)、Model、Entity
    * Schema简述（类似于mysql中的表，定义数据库表的存储结构）
    这是一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型（传统意义的表结构），又或者是集合的模型骨架。基本属性类型有字符串、日期型、数值型、布尔型、null、数组、内嵌文档等。
        ```
        var PersonSchema = new monoose.Schema({
            name:{type:String},
            age:{type:Number,default:0}  ,
            time:{type:Date,default:Date.now},
            email:{type:String,default:''}  
        })
        ```
    * Model简述 (类似于mysql中的对象构造函数)
    由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据属性、行为的类。
    通过Schema创建Model:
        ```
        //创建模型，可以用它来操作数据库中的person集合，指的是整体。创建一个person集合
        var PersonModel = db.model("person", PersonSchema);
        ```
        person：数据库中的集合名称，当我们对其添加数据时如果person已经存在，则会保存到其目录下，如果未存在，则会创建person集合，然后再保存数据。有了model，也就有了操作数据的能力。创建一个Model模型，需要指定两点：1，集合名称；2，集合的Schema结构对象。满足这两点，就可以操作数据库啦。
        > (1) 根据用户表结构，创建一个模型类（构造函数）。
          (2) 注意：我们不是直接通过这个模型类对数据库进行操作，而是通过这个模型类构造一个对象，通过对象进行数据库的操作
          (3) 注意：model下面有两种方法，一个是.的方法，表示是自己类的方法。一个是#的方法，表示要通过模型类构造出对象实例才能用的方法。
          (4) 返回的是一个promise对象
    * Entity简述（由上面的构造函数创建的对象，我们通过对象对数据库进行操作，而不是使用Schema）
        由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性。创建Entity成功后，Schema的属性就变成了Model和Entity的公共属性了。
        使用Model创建Entity：
        ```
        //根据模型创建实体，是指的个体对象
        var personEntity = new PersonModel({
            name : "zf",
            age  : 6,
            email: "zf@qq.com",
            home:'beijing'
        });
        ```

        ### 小结
        ```
        // 先通过schema，创建表结构
        var schema = new mongoose.Schema({ name: 'string', size: 'string' });
        // 再通过表结构，创建一个模型类
        var Tank = mongoose.model('Tank', schema);
        ```


### post参数解析
使用中间件body-parser进行参数的解析

### cookies模块
对登录状态进行保存
？？？思考使用cookies和session的区别










相关文档:
[mongoDB与mongoose](https://www.cnblogs.com/web-fengmin/p/6435681.html)