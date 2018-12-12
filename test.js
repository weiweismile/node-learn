const fs = require('fs');
// /Users/weiweijiedetuhaomacji/node学习/fs.md

fs.rmdir('/Users/weiweijiedetuhaomacji/node学习/test', function(err) {
    if(err) return console.log(err);
    console.log('删除目录成功');
    console.log('读取当前目录');
    fs.readdir('/Users/weiweijiedetuhaomacji/node学习', function(err, files) {
        if(err) return console.log(err);
        files.forEach(file => {
            console.log(file);
        });
    });
});

console.log(__dirname, __filename);
console.log(module);