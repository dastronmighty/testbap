"use strict";

const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/config');
const webpackConfig = require('../webpack.config');
const isDev = process.env.NODE_ENV !== 'production';
const Port = process.env.PORT || 8080;
const Express = require("express");
const Mongoose = require("mongoose");
const CRMAPIRoute = require("./routes/CRMAPI");
const AuthAPIRoute = require('./routes/AuthAPI');
const HelperAPIRoute = require('./routes/HelperApi');
const config = require('../config/server.config');
const Cors = require("cors");
const App = Express();

dotenv.config();

// * Database
Mongoose.connect(config.DB_CONNECT_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(data => {
        console.log("<Connected to DB>");
    })
    .catch(error => {
        console.log(error);
    });

// * middleware
App.use(Express.json());
App.use(
    Express.urlencoded({
        extended: true
    })
);
App.use(Cors());

if (isDev) {
    const compiler = webpack(webpackConfig);

    app.use(historyApiFallback({
        verbose: false
    }));

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: path.resolve(__dirname, '../client/public'),
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    }));

    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../dist/index.html'));
        res.end();
    });
}

// * routes
CRMAPIRoute(App);
AuthAPIRoute(App);
HelperAPIRoute(App);

// * listen
app.listen(port, '0.0.0.0', (error) => {
    if (error) {
        console.log(error);
    }
    console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;