const child_process = require('child_process');
// for (let index = 0; index < 5; index++) {
//     const childProcess = child_process.exec("node child_process.js " + index, function(err, stdout, stderr) {
//         if (err) {
//             console.log(err.stack);
//             console.log('error code' + err.code);
//             console.log('signal received' + err.signal);
//         }
//         console.log('stdout' + stdout);
//         console.log('stderr'+ stderr);
//     });
//     childProcess.on('exit', function(code) {
//         console.log('子程序已经退出,code=' + code);
//     });
// }

// spawn
// for (let index = 0; index < 5; index++) {
//   const workProcess = child_process.spawn('node', ['child_process.js', index]);
//   workProcess.stdout.on('data', function(data) {
//       console.log('进程执行' + data.toString());
//   });
//   workProcess.stderr.on('data', function(data) {
//       console.log('进程错误' + data)
//   });
//   workProcess.on('close', function(code) {
//       console.log('进程关闭' );
//   });
    
// }

// fork
for (let index = 0; index < 5; index++) {
    const workProcess = child_process.fork('child_process.js',[index]);
    workProcess.on('close', function(code) {
        console.log('进程关闭' + code);
    });
    
}