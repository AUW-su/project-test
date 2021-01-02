const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 10000;

const path = require("path")
const {execFile} = require('child_process');

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
    ws.send('stagingstagingstagingstaging')
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
    ws.send('productionproductionproductionproduction')

    execFile(sh, (err, stdout, stderr) => {
        if (err) {
            ws.send(stderr)
        } else {
            ws.send(stdout)
        }
    });
})

app.listen(port);
console.log('Server started on port:' + port);