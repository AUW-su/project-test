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
    // let sh = path.resolve(__dirname, '../test.sh');
    // let sh = path.resolve(__dirname, '../test.sh');
    let sh = path.resolve(__dirname, '../create-branch.sh');
    execFile(sh, (err, stdout, stderr) => {
        if (err) {
            ws.send(stderr)
        } else {
            ws.send(stdout)
        }
    });
})
// app.get('/create', (req, res, next) => {
//     res.status(200);
//     let sh = path.resolve(__dirname, '../create-branch.sh');

//     doShell(sh).then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.log(err)
//         res.json({
//             error: err
//         });
//     });
//     next();
// });
// app.post('/test', bodyParser.json(), (req, res, next) => {
//     res.status(200);
//     let sh = path.resolve(__dirname, '../create-branch.sh');
    
//     doShell(sh).then((res1) => {
//         res.json(res1);
//     }).catch((err) => {
//         console.log(err)
//         res.json({
//             error: err
//         });
//     });
// });

// app.post('/staging', bodyParser.json(), (req, res, next) => {
//     res.status(200);
//     let sh = path.resolve(__dirname, '../staging.sh');
//     doShell(sh).then((res1) => {
//         res.json(res1);
//     }).catch((err) => {
//         res.json({
//             error: err
//         });
//     });
// });
// app.post('/production', bodyParser.json(), (req, res, next) => {
//     res.status(200);
//     let sh = path.resolve(__dirname, '../production.sh');
//     doShell(sh).then((res1) => {
//         res.json(res1);
//     }).catch((err) => {
//         res.json({
//             error: err
//         });
//     });
// });

app.listen(port);
console.log('Server started on port:' + port);