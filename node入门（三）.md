# node基础知识三

### 1、文件操作

#### 小文件的copy可以使用先读取后写入的方式进行
writeFile & writeFileSync

readFile & readFileSync

#### 大文件的copy，为了防止内存爆仓，最好还是使用边读边写的方式--pipe（流模式）

createReadStream & createWriteStream

拓展：

process 对象是一个全局变量，提供 Node.js 进程的有关信息以及控制进程。 因为是全局变量，所以无需使用 require()。

process.argv

### 2、相关操作方法

* 打开文件 fs.open()
* 获取文件信息 fs.stat(), 会将stat对象返回给callback函数，对象中有很多属性可以进行判断。
* 写入文件 fs.writeFile()  
writeFile 直接打开文件默认是 w 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。
* 读取文件 fs.read()
* 关闭文件 fs.close()
* 截取文件 fs.ftruncate()
* 删除文件 fs.unlink()
* 创建目录 fs.mkdir()
* 读取目录 fs.readdir()
* 删除目录 fs.rmdir()
### 3、文件操作相关接口

#### （1）Buffer（数据块）二进制数据类型

> 在操作文件或者网络数据时，其实就是在操作二进制数据流，node为我们提供了一个更好操作的类。它是一个全局的类（也就是说不需要require引入就可以使用）

> 创建了buffer对象时，不论传入size还是array，它的长度都固定了，不能随意扩展。

1、Buffer与字符串类似，除了可以用.length属性得到字节长度外，还可以用[index]方式读取指定位置的字节

2、Buffer与字符串能够互相转化

3、Buffer与字符串的区别：
* 字符串是不可以改变的，但是buffer是可以改变的。buffer的index相当于是一个指针。

* 字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于Buffer，更像是可以做指针操作的C语言数组。例如，可以用[index]方式直接修改某个位置的字节。(因此在操作buffer的时候要特别的注意，可能会修改到buffer原数据)

* 如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去。

4、buffer对象还提供了一些类方法（静态方法）

5、buffer在跟字符串拼接时（例如 + ）会自动调用toString方法。

总之，Buffer将JS的数据处理能力从字符串扩展到了任意二进制数据。

#### (2) Stream（数据流）

当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。

>知识点： Stream基于事件机制工作，所有Stream的实例都继承于NodeJS提供的EventEmitter。

stream常用的事件有：

data - 当有数据可读时触发。

end - 没有更多的数据可读时触发。

error - 在接收和写入过程中发生错误时触发。

finish - 所有数据已被写入到底层系统时触发。

### 3、File System（文件系统）

NodeJS通过fs内置模块提供对文件的操作。fs模块提供的API基本上可以分为以下三类：

* 文件属性读写。

其中常用的有fs.stat、fs.chmod、fs.chown等等。

* 文件内容读写。

其中常用的有fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等。

* 底层文件操作。

其中常用的有fs.open、fs.read、fs.write、fs.close等等。


### 4、Path（路径）
Path.normalize // 将传入的路径转换为标准路径

* 坑出没注意： 标准化之后的路径里的斜杠在Windows系统下是\，而在Linux系统下是/。如果想保证任何系统下都使用/作为路径分隔符的话，需要用.replace(/\\/g, '/')再替换一下标准路径。

Path.join

Path.extname


### 5、遍历目录

（1）递归算法

> 陷阱： 使用递归算法编写的代码虽然简洁，但由于每递归一次就产生一次函数调用，在需要优先考虑性能时，需要把递归算法转换为循环算法，以减少函数调用次数。

(2)遍历算法（深度 & 广度）

### 6、文本编码
* BOM的移除
* GBK转UTF8
* 单字节编码








#### 拓展知识：
##### （1）EventEmitter类
* events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

* EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件被触发。

* EventEmitter 提供了多个属性，如 on 和 emit。on 函数用于绑定事件函数，emit 属性用于触发一个事件。

* 继承 EventEmitter

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

为什么要这样做呢？原因有两点：

首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发生应该是一个对象的方法。

其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

