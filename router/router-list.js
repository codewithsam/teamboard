let authRouter = require('./routes/Auth');
let boardRouter = require('./routes/Board');
let dashboard = require('./routes/dashboard');
let upload = require('./routes/Upload');

module.exports = function (app) {
    app.use('/auth', authRouter);
    app.use('/board', boardRouter);
    app.use('/', dashboard);
    app.use('/upload',upload);
}