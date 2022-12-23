const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 8080;

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'pass',
    database        : 'wheel'
});

app.get('/ideas', (req, res) => {
    pool.query("select * from ideas", (err, results, fields) => {
        if (err) {
            res.status(500);
            res.send(err);
        }
        res.send(results);
    });
});

app.delete('/ideas', (req, res) => {
    pool.query(`delete from ideas where label = '${req.body.idea}'`, (err, results, fields) => {
        if (err) {
            res.status(500);
            res.send(err);
        }
        res.send();
    });
});

app.post('/ideas', (req, res) => {
    pool.query(`insert into ideas(label) values('${req.body.idea}')`, (err, results, fields) => {
        if (err) {
            res.status(500);
            res.send(err);
        }
        res.send();
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;