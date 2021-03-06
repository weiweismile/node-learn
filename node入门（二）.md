# node基础知识二 --- 模块

### 1、模块
在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，每个模块有自己的作用域（声明的变量只在该作用域中），而文件路径就是模块名。（这就是在js中定义一个var 变量，可以很轻易的在Window上面获取，但是node则不能通过global获取该变量的原因 --- 模块。需要使用global.a的形式定义。）

#### （1）模块变量
在编写每个模块时，都有require、exports、module三个预先定义好的变量可供使用。

* module对象也是该模块下的对象，而不是全局对象。它主要保存和提供了当前模块的一些细节信息。
其中exports是最重要的对象，我们可以通过这个对象对一个模块中局部变量进行访问。

* require方法的返回值就是加载模块的module.exports

* exports也是模块作用域的一个内置模块对象，而它其实就是module.exports
console.log(module.exports === exports); // true

> 需要注意的是，不要轻易对exports 或是 module.exports进行赋值，否则会断开这两者的联系。而require的文件永远返回的只跟module.exports有关，不论module.exports被赋值了什么。

#### （2）模块初始化
一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。NodeJS使用CMD模块系统。？？？

#### （3）主模块
通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。

#### (4) 模块作用域

> 当前模块下的属性，并非全局属性

* __dirname // 当前目录绝对路径
* __filename // 返回当前文件下被解析过的绝对路径

* 需要注意的是：它们两个返回的是当前模块的一些属性

#### （5）模块路径解析规则

> require()可以传入相对路径 || 绝对路径，但是在书写相对路径时一定要注意，加上'./'（eg:'./test'）,如果不加上'./'就会被node解析为内置模块或是node_modules模块。

a、内置模块

如果传递给require函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如require('fs')。

b、node_modules目录

c、NODE_PATH环境变量

NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径

>当使用require进行文件加载时，将按照以下步骤进行文件查找：
1、先按照加载加载模块名进行相应层查找 2、未找到则在文件名称后加上.js 3、未找到则在文件名称后加上.json 4、未找到则在文件名称后加上.node 5、未查找到则报错


### 2、包（package）

将多个子模块放在一起组成一个大模块就构成包。

#### （1）入口模块
在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。（就是exports对象）

index.js

当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径

package.json

使用package.json来自定义入口文件路径

命令行程序（Linux && Windows）

把程序部署在/home/user/bin/node-echo.js