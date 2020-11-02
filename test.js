const chai = require('chai');
chai.use(require('chai-json-schema-ajv'));
const expect = chai.expect;
const { ok } = require("assert");

const FileManager = require("./FileManager");

const charactherFileManager = new FileManager("./data/characters.json");

const INSERTION_TEST_CHARACTER = {
    "id": "*",
    "name": "ConcernedApe",
    "birthday": "December 3rd",
    "gifts": ["An amazing community", "Sharing Experiences"]
};

const UPDATE_TEST_CHARACTER = {
    "name": "Eric Barone a.k.a. ConcernedApe"
};

const CHARACTHER_JSON_SCHEMA = {
    title: "Character JSON Schema",
    type: "array",
    minItems: 1,
    items: {
        type: "object",
        required: ["id", "name", "birthday", "gifts"],
        properties: {
            id: {
                type: "string"
            },
            name: {
                type: "string"
            },
            birthday: {
                type: "string"
            },
            gifts: {
                type: "array",
                minItems: 1,
                uniqueItems: true,
                items: {
                    type: "string"
                }
            }
        }
    }
};

describe("Stardew Characters CRUD", () => {

    it("Must be able to create a character in the file", async() => {
        await charactherFileManager.create(INSERTION_TEST_CHARACTER);
        const insertedCharacter = await charactherFileManager.list(INSERTION_TEST_CHARACTER.id);
       
        expect(insertedCharacter).to.be.jsonSchema(CHARACTHER_JSON_SCHEMA, 'Result not consistent to the JSON-Schema Validation');
    });

    it("Must be able to fetch an specific character in the file", async() => {
        const result = await charactherFileManager.list(INSERTION_TEST_CHARACTER.id);
        
        expect(result).to.be.jsonSchema(CHARACTHER_JSON_SCHEMA, 'Result not consistent to the JSON-Schema Validation');
    });

    it("Must be able to update an specific character in the file", async() => {
        await charactherFileManager.update(INSERTION_TEST_CHARACTER.id, UPDATE_TEST_CHARACTER);
        const updatedCharacter = await charactherFileManager.list(INSERTION_TEST_CHARACTER.id);

        expect(updatedCharacter).to.be.jsonSchema(CHARACTHER_JSON_SCHEMA, 'Result not consistent to the JSON-Schema Validation');
    });

    it("Must be able to delete an specific character in the file", async() => {
        const result = await charactherFileManager.delete(INSERTION_TEST_CHARACTER.id);

        ok(result, true);
    });

});