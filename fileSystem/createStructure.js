const fs = require("fs");

const state = fs.readdirSync("../child-processes");
console.log(state);
for (let prop in state) {
    console.log(`${prop} : ${state[prop]}`);
}
console.log("-zzzz-");

const sample = createStructureObj("../../../../../home/react.dev");
console.log(sample);

function createStructureObj(path) {
    try {
        let result = {};
        let structure = fs.readdirSync(path);

        for (let prop in structure) {
            let current = structure[prop];
            let isDir = fs.statSync(path + "/" + current).isDirectory();
            if (isDir) {
                result[current] = createStructureObj(`${path}/${current}`);
            } else result[current] = "file";
        }
        return result;
    } catch (e) {
        console.error(e);
    }
}
