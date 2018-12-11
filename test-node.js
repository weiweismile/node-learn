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