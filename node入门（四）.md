### node入门（四）--- 进程管理

* NodeJS可以感知和控制自身进程的运行环境和状态，也可以创建子进程并与其协同工作，这使得NodeJS可以把多个程序组合在一起共同完成某项工作，并在其中充当胶水和调度器的作用。

* 我们都知道 Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能。

* 每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。


#### process属性

> process是一个全局对象（global对象的属性, global.process === process），通过它我们可以对当前正在运行的程序的进程进行访问和控制。

 * argv  
 包含一行命令行参数的数组

 * env 
 返回用户环境信息(跟当前系统信息有关)

 * execPath
 返回启动进程的可执行文件的绝对路径。

 * version
 * versions
 * pid 属性返回进程的PID。
 * title
 * arch
 * platform
 * cwd()
 * child(directory)
 * memoryUsage()
 * exit(code)

 > 通常一个程序做完所有事情后就正常退出了，这时程序的退出状态码为0。或者一个程序运行时发生了异常后就挂了，这时程序的退出状态码不等于0。如果我们在代码中捕获了某个异常，但是觉得程序不应该继续运行下去，需要立即退出，并且需要把退出状态码设置为指定数字，比如1。

 ```
 try {
    // ...
} catch (err) {
    // ...
    process.exit(1);
}
 ```
 * kill(pid)

* stdin && stdout 标准输入输出流（IO）

> NodeJS程序的标准输入流（stdin）、一个标准输出流（stdout）、一个标准错误流（stderr）分别对应process.stdin、process.stdout和process.stderr，第一个是只读数据流，后边两个是只写数据流，对它们的操作按照对数据流的操作方式即可。



#### child_process 模块提供了衍生子进程的功能

> 使用child_process模块可以创建和控制子进程。该模块提供的API中最核心的是.spawn，其余API都是针对特定使用场景对它的进一步封装，算是一种语法糖。

子进程是异步运行的，通过回调函数返回执行结果。

* exec() 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。

exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容。

* spawn() 使用指定的命令行参数创建新进程。

spawn() 方法返回流 (stdout & stderr)，在进程返回大量数据时使用。进程一旦开始执行时 spawn() 就开始接收响应。

* fork()  是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。


* 项目中放了一个事例（node main_process.js），每次运行的结果都不一样，这就是子进程不可控制性。



### cluster模块

* 它是对child_process模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。
