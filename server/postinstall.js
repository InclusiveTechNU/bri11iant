const exec = require("child_process").exec;
const os = require("os");

if (os.type() === "Darwin") {
    exec("rm -rf node_modules/@tensorflow-models/coco-ssd/tsconfig.json && rm -rf node_modules/@tensorflow-models/coco-ssd/*.ts");
}