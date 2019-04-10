const path = require('path');

module.exports = {
    development: {
        data: {
            items: path.join(__dirname, '../data/items.json'),
        }
    },
};