### node入门（四）--- process

* process是一个全局对象（global对象的属性, global.process === process），通过它我们可以对当前正在运行的程序的进程进行访问和控制。

#### process属性
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
 * kill(pid)

* stdin && stdout 标准输入输出流（IO）