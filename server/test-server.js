const path = require("path")
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {execFile} = require('child_process');

app.use(bodyParser.json());
 
//Specify port
var port = process.env.PORT || 9999;
 
//Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,X-Original-Header1,X-Original-Header2");
    next();
});

const doShell = (cmd) => {
    let str = cmd;
    let result = {};
    return new Promise((resolve, reject) => {
        execFile(str, (err, stdout, stderr) => {
            if (err) {
                result.errCode = 500;
                result.err = stderr;
                reject(result);
            } else {
                result.errCode = 200;
                result.data = stdout;
                resolve(result);
            }
        })
    })
}
app.get('/create', (req, res, next) => {
    console.log('createcreate')
    res.status(200);

    let sh = path.resolve(__dirname, '../create-branch.sh');

    doShell(sh).then((result) => {
        // 提取当前分支名
        // console.log('1111')
        // console.log(result)
        // console.log(result.data)
        // console.log(typeof result.data)
        // let branchName = result.data.substring(0, 22);
        // console.log(branchName)
        // let re = JSON.stringify({
        //     success: true,
        //     branch_name: branchName,
        // })
        // res.send('hello')
        res.json(result);
    }).catch((err) => {
        console.log('222')
        console.log(err)
        res.json({
            error: err
        });
    });
    next();
});
app.post('/test', bodyParser.json(), (req, res, next) => {
    res.status(200);
    let sh = path.resolve(__dirname, '../create-branch.sh');
    
    doShell(sh).then((res1) => {
        // res.send('hello world');
        res.json(res1);
    }).catch((err) => {
        console.log('2222')
        console.log(err)
        res.json({
            error: err
        });
    });
});

app.post('/api', bodyParser.json(), (req, res, next) => {
    res.status(200);
    const data = req.body;
    if (data) {
        let message = "Hi,there! You say " + data.message;
        res.json({
            output: message
        });
    } else {
        let message = 'error:message not found.';
        res.json({
            error: message
        });
    }
});

app.listen(port);
console.log('Server started on port:' + port);