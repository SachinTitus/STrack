const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const createError = require('http-errors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const SpiderService = require('./services/SpiderService');


const configs = require('./config');
const config = configs[app.get('env')];



const spiderService = new SpiderService(config.data.items);

app.use(express.static(__dirname+'/../public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');
if(app.get('env') === 'development'){
    app.locals.pretty = true;
}
app.set('views', path.join(__dirname, './views'));

app.use(async(req, res, next) => {
    try {
        const items = await spiderService.getItems();
        res.locals.itemlist = items;
        return next();
    }catch (e) {
        return next(e);
    }
});

app.get('favicon.ico', (req,res,next) => {
    return res.sendStatus(204);
});
app.use('/', routes({spiderService}));

app.use((req,res,next) => {
    return next(createError(404, 'File not found'));
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status|| 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development'? err: {};
    res.status(status);
    return res.render('error');
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(3000, function () {
        console.log('Example app listening on port 3000! Go to https://localhost:3000/')
    });

module.export = app;