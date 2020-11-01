const { deepStrictEqual, ok } = require("assert");
const { DEFAULT_ECDH_CURVE } = require("tls");
const FileManager = require("./FileManager");

const charactherFileManager = new FileManager("./data/characters.json");

const CHARACTER_SCHEMA = {
    "id": "1",
    "name": "Penny",
    "birthday": "Fall 2nd",
    "gifts": ["Diamond", "Emerald", "Melon", "Poppy"]
};

describe("Stardew Characters CRUD", () => {

    it("Must be able to create a character in the file", async() => {
        const expected = CHARACTER_SCHEMA;
        const result = await charactherFileManager.create(CHARACTER_SCHEMA);
        const [insertedCharacter] = await charactherFileManager.list(CHARACTER_SCHEMA.id);

        deepStrictEqual(insertedCharacter, expected);
    });

    it("Must be able to fetch an specific character in the file", async() => {
        const expected = CHARACTER_SCHEMA;
        const [result] = await charactherFileManager.list(CHARACTER_SCHEMA.id);
        
        deepStrictEqual(result, expected);
    });

    it("Must be able to update an specific character in the file", async() => {
        const expected = {
            "id": "1",
            "name": "Penny",
            "birthday": "Fall 2nd",
            "gifts": ["Poppyseed Muffin", "Red Plate", "Roots Platter", "Sandfish"]
        };

        const result = await charactherFileManager.update(CHARACTER_SCHEMA.id, expected);
        const [updatedCharacter] = await charactherFileManager.list(CHARACTER_SCHEMA.id);

        ok(updatedCharacter, expected);
    });

    it("Must be able to delete an specific character in the file", async() => {
        const expected = true;
        const result = await charactherFileManager.delete(CHARACTER_SCHEMA.id);

        ok(result, expected);
    });

});