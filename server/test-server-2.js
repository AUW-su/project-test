const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 10000;

const path = require("path")
const {execFile} = require('child_process');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,X-Original-Header1,X-Original-Header2");
    next();
});

// websocket start
app.ws('/create', (ws, req) => {
    ws.on('message', (message) => {
        console.log('server received: %s', message);
    });
    let sh = path.resolve(__dirname, '../create-branch.sh');
    execFile(sh, (err, stdout, stderr) => {
        if (err) {
            ws.send(stderr)
        } else {
            ws.send(stdout)
        }
    });
})
app.ws('/staging', (ws, req) => {
    ws.on('message', (message) => {
        console.log('server received: %s', message);
    });
    let sh = path.resolve(__dirname, '../staging.sh');
    execFile(sh, (err, stdout, stderr) => {
        if (err) {
            ws.send(stderr)
        } else {
            ws.send(stdout)
        }
    });
})
app.ws('/production', (ws, req) => {
    ws.on('message', (message) => {
        console.log('server received: %s', message);
    });
    let sh = path.resolve(__dirname, '../production.sh');

    execFile(sh, (err, stdout, stderr) => {
        if (err) {
            ws.send(stderr)
        } else {
            ws.send(stdout)
        }
    });
})
// websocket end

// cache start
app.post('/cache1', bodyParser.json(), (req, res, next) => {
    res.status(200);
    res.send('hello world');
});
// cache 

app.listen(port);
console.log('Server started on port:' + port);