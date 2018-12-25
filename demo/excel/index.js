// 读取Excel文件
const excel = require('node-xlsx');
const sheets  = excel.parse('./config.xlsx');
const obj = {
    moduleKey: 'customerInfo',
    moduleName: '客户信息',
    moduleAlias: 'userInfo',
    isShow: true,
    data: [],
};
// sheets.forEach(sheet => {
//     console.log(sheet);
// });
const data = sheets[0].data || [];
data.forEach((line, num) => {
    console.log(line, 88);
    if (num !== 0) {
        line.forEach((item, index) => {
            if (index === 0 && item) {
                // 如果第一列存在的话
                const obj = {
                    moduleKey: '',
                    moduleName: '',
                    moduleAlias: '',
                    isShow: true,
                    data: [],
                };
            }
        });
    }
});