const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class itemService {
    constructor(dataFile){
        this.dataFile = dataFile;
    }
    async getItems() {
        const data = await this.fetchData();
        return data.map((item) => {
            return { id: item.id, title: item.title,
                description: item.description, price: item.price, image: item.image};
        });
    }
    async getItemsByID(id){
        const data = await this.fetchData();

        return data.filter((item) => {
            return (item.id === id);
        });
    }
    async addItem(title, description, price){
        const data = await this.fetchData();
        let id = data.length;
        const image = "/images/specs.png";
        data.unshift({id, title, image, description, price});
        return writeFile(this.dataFile, JSON.stringify(data));
    }
    async deleteItem(id){
        const data = await this.fetchData();
        data.splice(id, 1);
        return writeFile(this.dataFile, JSON.stringify(data));
    }
    async fetchData(){
        const data = await readFile(this.dataFile, 'utf8');
        if(!data) return [];
        return JSON.parse(data);
    }
}
module.exports = itemService;