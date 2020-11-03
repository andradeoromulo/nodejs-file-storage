## About
This is a simple project of a Stardew Valley Characters CRUD with Node.js and data storage in local files. The project is originally from a chapter of the course [Imersão em desenvolvimento de APIs com Node.js](https://erickwendel.teachable.com/p/node-js-para-iniciantes-nodebr) created by [Erick Wendel](https://github.com/ErickWendel). Therefore, the code was written while I followed the lessons, however I've changed a few aspects, such as adding JSON Schema Validation to the tests and taking some decisions to make the file manipulation class more generic.
## Technologies
A little bit of what's inside the project:
* **Mocha**, **chai** and **chai-json-schema-ajv** to develop and automate testing.
* **Commander.js** to create an interface through command line tools.
## How to use
After cloning or downloading this repository, just run on terminal: `npm install` <br>
And then, if you want to run the tests: `mocha` or `npm t` <br>
Finally, in order to manipulate the file and the characters database: `node index.js -h`.
## Feedback
I'm a student and I really would like to hear case you have any tips, correction suggestions or comments about any my of projects (🤓).
