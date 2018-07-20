const fs = require("fs");
const path = "./Pokeapi.postman_collection.json";
const { buildHtml } = require("./src/services/buildHtml");

const readFile = function(path) {
    return fs.readFileSync(path);
};

const getJson = async function(file) {
    try {
        return JSON.parse(file);
    } catch (err) {
        console.error("Invalid JSON");
    }
};

(async () => {
    try {
        const file = await readFile(path);
        const json = await getJson(file);
        await buildHtml(json);
    } catch (err) {
        throw err;
    }
})();
