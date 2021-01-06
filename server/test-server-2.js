const path = require("path")
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const bodyParser = require('body-parser');
const {execFile, spawn} = require('child_process');

app.use(bodyParser.json());

const port = 10000;



//Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,X-Original-Header1,X-Original-Header2");
    next();
});

app.ws('/create', (ws, req) => {
    ws.on('message', (message) => {
        console.log('server received: %s', message);
    });
    let sh = path.resolve(__dirname, '../create-branch.sh');

    const ls = spawn(sh);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        ws.send(data)
    });
    
    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        ws.send(data)
    });
    
    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        ws.send(`child process exited with code ${code}`)
        ws.send('create end')
    });

    // execFile(sh, (err, stdout, stderr) => {
    //     if (err) {
    //         ws.send(stderr)
    //     } else {
    //         ws.send(stdout)
    //     }
    // });
})
app.ws('/staging', (ws, req) => {
    ws.on('message', (message) => {
        console.log('server received: %s', message);
    });
    let sh = path.resolve(__dirname, '../staging.sh');
})
app.ws('/production', (ws, req) => {
    ws.on('message', (message) => {
        console.log('server received: %s', message);
    });
    let sh = path.resolve(__dirname, '../production.sh');
})

app.listen(port);
console.log('Server started on port:' + port);