const fs = require('fs');
fs.mkdir('./haha', function(err) {
    if (err) return console.log(err);
    console.log('/tmp/test 目录已经成建好了');
});