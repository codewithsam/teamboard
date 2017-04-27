let authRouter = require('./routes/Auth');
let boardRouter = require('./routes/Board');
let dashboard = require('./routes/dashboard');

module.exports = function (app) {
    app.use('/auth', authRouter);
    app.use('/board', boardRouter);
    app.use('/', dashboard);
}