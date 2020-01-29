import CSSOMTree from "./CSSOM/CSSOMTree";
import DOMTree from "./DOM/DOMTree";
import RenderNode from "./RenderNode";

class RenderTree {

    head: RenderNode | undefined;

    constructor(htmlFile: string, cssFile: string) {

        // Construct DOM from file
        const DOM: DOMTree = new DOMTree(htmlFile);
        
        // Construct CSSOM from file
        const CSSOM: CSSOMTree = new CSSOMTree(cssFile);



    }

}

export default RenderTree;
