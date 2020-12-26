const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 9082;

const server = http.createServer();



server.listen(port, '0.0.0.0', () => {
    console.log(`服务器正在端口号${port}上运行`);
    // console.log(path.dirname())
});

// console.log(path.join(dirname,'../app/img/favicon.ico'))

// server.on('request', (req, res) => {
//     res.writeHead(200, {"Content-Type": "text/html" + "; charset=utf-8"});
//     fs.readFile("../src/index.html" , (err, data) => {
//         if (err) {
//             throw err;
//         }
//         res.end(data);
//     });
// });


