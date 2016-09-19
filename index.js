const express = require('express');
const app = express();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

app.use(express.static('static'));

app.get('/', function(req,res) {
  res.sendFile('./index.html');
});

app.post('/upload', function(req,res) {
    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.uploadDir = path.join(__dirname, '/uploads');

    form.on('file', function(field, file) {
        file.name = `${Math.random()}-${file.name}`
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function() {
        res.end('success');
    });


    form.parse(req);
});

app.listen(3856);
console.log("Serving on port 3856")
