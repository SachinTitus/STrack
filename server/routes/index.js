const express = require('express');
const router = express.Router();

const userRoute = require('./user');
const adminRoute = require('./admin');

module.exports = (param) => {
    const { spiderService } = param;
    router.get('/', (req, res, next) => {
        console.log("called");
        return res.render('index', {
            title: 'SpiderTrack',
        });
    });
    router.post('/', async (req, res, next) => {
        const itemTitle = req.body.title;
        const itemDescription = req.body.description;
        await spiderService.addItem(itemTitle, itemDescription);
        return res.redirect('/');
    });
    router.use('/user', userRoute(param));
    router.use('/admin', adminRoute(param));
    return router;
};