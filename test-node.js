// 尝试运行node程序

var  a = new Date();
console.log( a.getFullYear() );

global.qq = 'qq';
console.log(global.qq);

console.log( __filename );
console.log(__filename);



// copy 小文件

var fs = require('fs');
function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}
function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

// copy大文件

const fs = require('fs');
function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));


// buffer
const bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
// buffer转化为string
bin.toString('utf-8');
// 将string转化为buffer
new Buffer('hello', 'utf-8');

// buffer copy
const bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
const dup = new Buffer(bin.length);

bin.copy(dup);
console.log(bin);
console.log(dup);


// event emitter
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function(){
    console.log('listener some events');
});

setTimeout(function() {
    event.emit('some_event');
}, 1000);


// event stream
var fs = require('fs');
var file = fs.createReadStream(pathName);
file.on('data', function(chunk) {
    doSomething(chunk);
});

file.on('end', function() {
    cleanUp();
});

file.on('data', function(chunk) {
    fs.pause()
    doSomething(chunk, function() {
        fs.resume();
    });
});


fs.readFile(pathname, function(err, str) {
    if (err) {
        console.log(err);
    }else{
        console.log(str);
    }
});

// 打开文件

fs.open('test.md', 'r+', function(err, fd) {
    if (err) {
        return console.log(err);
    }
    console.log('打开文件成功');
});

// 打开文件属性
fs.stat('fs.md', function(err, stat) {
    if (err) {
        return console.log(err);
    } 
    console.log(stat);
    console.log('是否是文件'+ stat.isFile());
    console.log('是否是目录' + stat.isDirectory());
})

// 写入文件内容 data是要写入的数据
fs.writeFile('fs.md', data, function(err){
    if (err) {
        return console.log(err);
}
    console.log('写入数据成功');
    console.log('开始读取数据');
    fs.readFile('fs.md', function(err, data) {
        if(err) {
            return console.log(err);
        }
        console.log('异步读取数据' + data.toString());
    });
});

// 读取文件
// 创建一个缓冲区   file是通过 fs.open() 方法返回的文件描述符。？？？？？
const buf = new Buffer.alloc(1024);
fs.open('/Users/weiweijiedetuhaomacji/node学习/fs.md', 'r+', function(err, file) {
    if (err) {
        return console.log(err);
    }
    console.log('打开文件成功');
    fs.read(file, buf, 0, buf.length, 0, function(err, bytes) {
        if (err) {
            console.log(err);
        }
        console.log(bytes + "  字节被读取");
    if (bytes > 0) {
        console.log(buf.slice(0, bytes).toString());
    }
    fs.close(file, function(err) {
        if (err) {
            return console.log('文件关闭失败');
        }
        console.log('文件关闭成功');
    });
});
});
console.log('读取文件开始');

// 截取文件
const buf = new Buffer.alloc(1024);
fs.open('fs.md', 'r+', function(err, file) {
    if (err) {
        return console.log(err);
    }
    console.log('文件被打开');
    fs.ftruncate(file, 10, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('文件截取成功');
        fs.read(file, buf, 0, buf.length, 0, function(err, bytes) {
            if (err) {
                return console.log(err);
            }
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
            }
            fs.close(file,function(err) {
                if (err) {
                   return console.log(err);
                }
                console.log('文件关闭成功');
            });
        });
    });
});


// 判断文件是否存在
function isExistFile(sourceFile, targetFile) {
    fs.exists(targetFile, function(isExist) {
        if (isExist) {
            fs.appendFile(targetFile, '121212', function() {
                console.log('append 成功');
            });
        } else {
            fs.writeFile(targetFile, 'eeeee', function(){
                console.log('添加文件成功');
            });
        }
    });
}

// 创建目录
// tmp 目录必须存在
fs.mkdir('/tmp/test', function(err) {
    if (err) return console.log(err);
    console.log('/tmp/test 目录已经成建好了');
});

// 读取目录, files为一个数组
fs.readdir('/tmp', function(err, files) {
    if(err) return console.log(err);
    files.forEach(file => {
        console.log(file);
    });
});

// 删除目录
fs.rmdir('/tmp', function(err) {
    if(err) return console.log(err);
    console.log('删除目录成功');
    console.log('读取当前目录');
    fs.readdir('/tmp', function(err, files) {
        if(err) return console.log(err);
        files.forEach(file => {
            console.log(file);
        });
    });
});


// 同步深度遍历文件目录
function traveDir(dir) {
    fs.readdirSync(dir).forEach((file, index) => {
    const pathName = path.join(dir, file);
        if (fs.statSync(pathName).isFile()) {
            console.log(pathName, index);
        } else {
            traveDir(pathName);
        }
    });
}


// 创建HTTP服务器
const http = require('http');
http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('hello node.js');
}).listen(8080);


// 用zlib模块压缩HTTP响应体数据的例子
const zlib = require('zlib');
http.createServer(function(request, response) {
    var i = 1024;
    var data = '';
    while(i>0){
        data += '.';
    }
    console.log(request.headers, 999);
    if ((request.headers['Content-Encoding'] || '').indexOf('gzip') > -1) {
        zlib.gzip(data, function(err, data) {
            if (err) return false;
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip',
            });
            response.end(data);
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/plain',
        });
        response.end(data);
    }
}).listen(8080);

var options = {
    hostname: 'www.example.com',
    port: 80,
    path: '/',
    method: 'GET',
    headers: {
        'Accept-Encoding': 'gzip, deflate'
    }
};

// 解压data
http.request(options, function(response) {
    var body = [];
    response.on(data, function(chunk) {
        console.log(chunk, 'chunk');
        body.push(chunk);
    });
    response.on('end', function() {
        body = Buffer.concat(body);
        if (response.headers['content-encoding'] === 'gzip') {
            zlib.gunzip(body, function(err, data) {
                console.log(data.toString());
            })
        } else {
            console.log(data.toString());
        }
    });
}).end();


// child_process
var child_process = require('child_process');
var util = require('util');
function copy(source, target, callback) {
    child_process.exec(util.format('cp -r %s/ %s', source, target), callback);
}


// stdout 
function log() {
    process.stdout.write(util.format.apply(util, arguments) + '\n');
}


// 计算a * b
var a, b;
console.log('请输入a的值:');
process.stdin.on('data', function(chunk) {
    if (!a) {
        a = Number(chunk);        
    } else {
        b = Number(chunk);
        process.stdout.write('a*b的结果是'+ a*b);
    }
});
