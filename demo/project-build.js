const options = {
    project: 'build-project-files',
    files: [
        {
            name: 'images',
            type: 'dir',
        },
        {
            name: 'js',
            type: 'dir',
        },
        {
            name: 'css',
            type: 'dir',
        },
        {
            name: 'index.html',
            type: 'file',
            content: '<html>\n\t<head></head>\n\t<body>\n\t\t<h1>node学习</h1>\n\t</body>\n</html>'
        },
    ],
};

const fs = require('fs');

// 自动构建项目代码
function buildProject(options) {
    if (!options.project) return;
    // 创建目录就是创建一个文件夹
    try {
       fs.mkdirSync(options.project);   
       console.log('创建'+ options.project + '目录成功');
    } catch (error) {
        if (error.code === 'EEXIST') {
            console.log('该项目已经创建');
        }
        return;
    }
    const files = options.files || [];
    files.forEach(file => {
        const filePath = './'+ options.project + '/' + file.name;
        if (file.type === 'dir') {
            fs.mkdirSync(filePath);
            console.log(file.name + '创建成功');
        } else if (file.type === 'file') {
            fs.writeFileSync(filePath, file.content);
            console.log(file.name + '创建成功');
        }
    });
}


// 自动打包工具,demo只展示监听js文件夹下的所有的文件，一个文件发生变化，就重新打包所有内容

function autoBuildProject(projectPath) {
    // 1、读取projectPath目录下的所有的文件
    const buildPath = projectPath + '/build.js';
    fs.readdir(projectPath, function(err, files) {
        files.forEach(file => {
            const filePath = projectPath + '/' + file;
            const isDirectory = fs.statSync(filePath).isDirectory();
            if (isDirectory) {
                 // 2、监听每一个文件夹（新增文件的时候就会触发事件）
                fs.watch(filePath, function(event, file) {
                    // 3、一旦某一个文件发生变化，就将所有文件内容读取一遍
                    const content = readEachFile(projectPath);
                    console.log(content, 'content');
                    fs.writeFileSync(buildPath, content);
                });
            }
        });
    });
}


function readEachFile(dir) {
    let content = '';
    const handler = function(path) {
        fs.readdirSync(path).forEach(file => {
                const filePath = path + '/' + file;
                if(fs.statSync(filePath).isFile()) {
                    content += fs.readFileSync(filePath).toString() + '\n';
                } else {
                    handler(filePath);
                }
            });
    }
    handler(dir);
    return content;
}

// 注意同步和异步，之前使用的异步使得content在返回时没有数据。


buildProject(options);
autoBuildProject(options.project);