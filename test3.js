const fs = require('fs');
// try {
//    fs.mkdirSync('./hh.js');  
// } catch (error) {
//     console.log(error);
// }

// fs.mkdir('./hh.js', function(err, file) {
//     console.log(err);
//     console.log(file);
//     console.log(arguments);
// });
try {
    fs.readdirSync('./demo/build-project-files').forEach(file => {
        console.log(file);
    });
} catch (error) {
    console.log(error);
}
