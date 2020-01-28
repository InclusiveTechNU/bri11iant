"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CSSOMTree_1 = require("./CSSOM/CSSOMTree");
const DOMTree_1 = require("./DOM/DOMTree");
class RenderTree {
    constructor(htmlFile, cssFile) {
        // Construct DOM from file
        const DOM = new DOMTree_1.default(htmlFile);
        // Construct CSSOM from file
        const CSSOM = new CSSOMTree_1.default(cssFile);
    }
}
exports.default = RenderTree;
//# sourceMappingURL=RenderTree.js.map