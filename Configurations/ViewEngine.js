const hbs = require('express-handlebars');
const path = require('path');

const hbsHelpers = require('./../modules/hbs-helpers/helpers');

var handlebars = hbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, '../', 'views', 'layouts'),
    helpers: hbsHelpers
})

//view engine configurations
module.exports = function (app) {
    app.engine('hbs', handlebars.engine);
    app.set('view engine', 'hbs');
}