const express = require('express');
const router = express.Router();


module.exports = (param) => {
    const { spiderService } = param;

    router.get('/', (req, res, next) => {
        return res.render('detail')
    });
    // router.get('/:id', async (req, res, next) => {
    //
    //     return res.render('detail', {
    //         id: req.body.id
    //     });
    // });


    router.post('/', async (req, res, next) => {
        return res.send("Form sent")
    });
    return router;
};