const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path")
const redis = require("redis");

const port = 9080;
let partFilePath = '';
let fullFilePath = '';
let statusCode = 200;
let maxAge = 120;
let useWeakcCache = 1;


const client = redis.createClient(6379, '127.0.0.1');

// 获取后缀名
const getExt = (extName) => {
    switch(extName) {
      case '.html': return 'text/html';
      case '.css': return 'text/css';
      case '.js': return 'text/javascript';
      default: return 'text/html';
    }
}

const server = http.createServer();

server.listen(port, () => {
    console.log(`服务器正在端口号${port}上运行`);
});

server.on('request', (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*"); 
    // res.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,X-Original-Header1,X-Original-Header2");

    let pathName = url.parse(req.url).pathname; //转换为url对象

    if (pathName == '/favicon.ico') {
        res.end();
        return;
    }

	//默认加载路径
	if(pathName == '/') {
		pathName = "/index.html";
    }

    if (pathName == '/dist/home.js') {
        partFilePath = path.resolve(__dirname, '../../../production/project-test/');
    } else {
        partFilePath =  path.resolve(__dirname, '../../../production/project-test/src/home/')
    }
    
	//获取文件后缀名
    let extName = path.extname(pathName);
    fullFilePath = partFilePath + pathName;

    let stat = fs.statSync(fullFilePath);

    // redis 获取相应值
    client.on("error", (error) => {
        console.error(error);
    });
    client.get("max-age", (err, value) => {
        if (err) {
            throw err;
        }
        maxAge = +value;
        console.log('maxAge:', maxAge);
        console.log('got:', value);
    });
    client.get("use-weak-cache", (err, value) => {
        if (err) {
            throw err;
        }
        useWeakcCache = +value;
        console.log('got:', value);
        console.log('useWeakcCache:', useWeakcCache);
        // client.quit();
    });

	fs.readFile(fullFilePath, (err, data) => {
		if (err) { 
            res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
            res.write("error");
            res.end();
		} else {
			// 获取对应后缀的文件类型
            let ext = getExt(extName);
            let Etag = `${data.length.toString(16)}${stat.mtime.toString(16)}`;
            
            // 根据useWeakcCache的值来判断是否要使用协商缓存
            if (useWeakcCache) {
                // 判断请求头的文件修改时间是否等于服务端的文件修改时间
                if (req.headers['If-Modified-Since'] === stat.mtime.toUTCString() || (req.headers['If-None-Match'] === Etag)) { 
                    // mtime为文件内容改变的时间戳
                    statusCode = 304;
                }
            }
            console.log('************')

            console.log(maxAge)
            console.log(useWeakcCache)
            
            // 设置请求头
            res.writeHead(statusCode, {
                "Content-Type": ext + "; charset=utf-8",
                'Cache-Control': `max-age=${maxAge}, public`,
                'Last-Modified': stat.mtime.toUTCString(),
                'Etag': Etag,
            });
            //返回请求文件
			res.write(data); 
			res.end();
		}
	});
});







