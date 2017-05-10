const utils = require('./../../modules/utils');
const upload = require('express').Router();
var webshot = require('url-to-image');

upload.post('/webshot', function (req, res) {
    console.log(req.body.width);
    var options = {
        width: req.body.width,
        height: req.body.height,
        requestTimeout: 100
    };
    var savepath = "./public/img/webshot/";
    randpath = utils.guid();
    savepath += randpath;
    savepath += ".png";
    console.log(req.body.url);
    console.log(savepath);
    webshot(req.body.url, savepath, options).then(function (result) {
        res.json(randpath);
    }).catch(function (err) {
        console.error(err);
        res.send(err);
    });
});


upload.post('/image', function (req, res) {
    var multerLoader = req.app.get('multerLoader').single('imagepath');
    multerLoader(req, res, function (err) {
        if (err) throw err;
        if (!req.file) {
            console.log('no file selected');
            res.status('500').send('no file seleted');
        } else {
            res.send({filename: req.file.filename});
        }
    });
});

module.exports = upload;