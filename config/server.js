require('dotenv').load();

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const validator = require('express-validator');

module.exports = () => {

    const app = express();

    app.use(express.static('./src/public'));
    app.set('view engine', 'ejs');
    app.set('views', './src/views');

    app.use(bodyParser.urlencoded( { extended: true}));
    app.use(bodyParser.json());
    app.use(validator());

    consign({ cwd : 'src'})
        .include('routes')
        .then('connection')
        .into(app);

    app.use( (req, res, next) => {
        res.render('erros/404');
        next();
    });

    app.use( (error, req, res, next) => {
        res.render('erros/500');
        next();
    });

    return app;
}