const express = require('express');
const router = express.Router();

const detailRoute = require('./detail');

module.exports = (param) => {
    const { spiderService } = param;

    router.get('/', (req, res, next) => {
        return res.render('user')
    });
    // router.get('/:id', (req, res, next) => {
    //     return res.render('user/detail', {
    //         id: req.body.id
    //     });
    // });


    router.get('/:id', async (req, res, next) => {
        const item = await spiderService.getItemsByID(req.params.id);
        const i = item;
        console.log(req.params.id);
        return res.render('user/detail',{
            i
        })
    });
    // router.delete('/:id', async (req, res, next) => {
    //     const id = req.body.id;
    //     await spiderService.deleteItem(id);
    //     return res.redirect('/');
    // });
    router.use('/detail', detailRoute(param));
    return router;
};