const express = require('express');
const router = express.Router();

module.exports = (param) => {
    const { spiderService } = param;

    router.get('/', (req, res, next) => {
        return res.render('admin')
    });



    router.delete('/:id', async (req, res, next) => {
        const id = req.body.id;
        await spiderService.deleteItem(id);
        return res.send("hurra");
        // return res.redirect('/admin/');
    });
    router.post('/', async (req, res, next) => {
        const itemTitle = req.body.title;
        console.log(itemTitle.toString());
        const itemDescription = req.body.description;
        const itemPrice = req.body.price;
        await spiderService.addItem(itemTitle, itemDescription, itemPrice);
        return res.redirect('/admin/');
    });

    return router;
};