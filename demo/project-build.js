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
function buildProject(options) {
    if (!options.project) return;
    // 创建目录就是创建一个文件夹
    fs.mkdirSync(options.project);
    console.log('创建'+ options.project + '目录成功');
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

buildProject(options);