const { writeFileSync, readFileSync } = require('fs');

class FileManager {
    constructor(filePath) {
        this.FILE_PATH = filePath;
    }

    async writeFileData(data) {
        await writeFileSync(this.FILE_PATH, JSON.stringify(data));
        return true;
    }

    async fetchFileData() {
        /* 
         * Reading the JSON file with readFile as a Promise.
         * We could just require the JSON file, but the goal is to practice the filesystem management.
        */
        const file = await readFileSync(this.FILE_PATH);
        return JSON.parse(file.toString());
    }

    async create(item) {
        const existingData = await this.fetchFileData();

        const updatedData = [
            ...existingData,
            item
        ];

        const result = await this.writeFileData(updatedData);

        return result;

    }
    
    async list(id) {
        const data = await this.fetchFileData();

        /*
         * If an id has been informed, we'll filter the data by the id.
         * Otherwise, we'll just send all the data.
        */
        const filteredData = data.filter(item => 
            (id 
                ? (item.id === id) 
                : true)
        ); 

        return filteredData;
    }

    async update(id, updatedProps) {
        const existingData = await this.fetchFileData();

        const itemIndex = existingData.findIndex((item) => item.id === id);

        if(itemIndex === -1)
            throw new Error("Not such item in the file");
        
        const existingItem = existingData[itemIndex];
        existingData.splice(itemIndex, 1);

        const updatedItem = {
            ...existingItem,
            ...updatedProps
        }
        
        return await this.writeFileData([...existingData, updatedItem]);
    }

    async delete(id) {
        if(!id) 
            return await this.writeFileData([]);

        const existingData = await this.fetchFileData();  

        const itemIndex = existingData.findIndex((item) => item.id === id);
        
        if(itemIndex === -1) 
            throw new Error("Not such item in the file");
        
        existingData.splice(itemIndex, 1);

        return await this.writeFileData(existingData);
    }
}

module.exports = FileManager;