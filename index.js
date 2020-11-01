const Commander = require("commander");
const FileManager = require("./FileManager");
const Character = require("./Character");

async function main() {

    const charactherFileManager = new FileManager("./data/characters.json");

    Commander
        .version("v1.0.0")

        .option("-i, --id [value]", "Character ID")
        .option("-n, --charname [value]", "Character name")
        .option("-b, --birthday [value]", "Character birthday")
        .option("-g, --gifts [values...]", "Character favorite gifts")

        .option("-c, --create", "Create a new character")
        .option("-l, --list", "List all characters")
        .option("-d, --delete", "Delete an specific character")
        .option("-u, --update", "Update an specific character")

        .parse(process.argv);
    
    try {

        if (Commander.create) {
            const newCharacter = new Character(Commander);
            const result = await charactherFileManager.create(newCharacter);

            if (result) 
                console.log("New character successfully created");
            else
                console.error("Not possible to create a new Character");
                

        } else if (Commander.list) {

            const result = await charactherFileManager.list();
            
            if (result === null || result.length === 0) 
                console.log("There is no character yet in our base")
            else
                console.log(result);

        } else if (Commander.delete) {

            if (Commander.id) {
                
                const result = await charactherFileManager.delete(Commander.id);

                if (result)
                    console.log("Character successfully deleted")
                else    
                    console.error("Not possible to delete the character")

            } else {

                console.error("You must inform an id in order to delete a character");

            }

        } else if (Commander.update) {

            if (Commander.id) {

                let newCharacter = new Character(Commander);

                // Transforming data into JSON and back so undefined and null properties are removed
                const newCharacterJSON = JSON.stringify(newCharacter);
                newCharacter = JSON.parse(newCharacterJSON);
                
                const result = await charactherFileManager.update(Commander.id, newCharacter);

                if (result)
                    console.log("Character successfully updated")
                else    
                    console.error("Not possible to update the character")

            } else {

                console.error("You must inform an id in order to update a character");

            }

        } else {

            console.log("Hey! You must inform an operation or -h for help.");

        }

    } catch(error) {
        console.log("An error ocurred: ", error);
    }
}

main();