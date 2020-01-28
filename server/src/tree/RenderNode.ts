import CSSOMNode from "./CSSOM/CSSOMNode";
import DOMNode from "./DOM/DOMNode";

class RenderNode {

    children: [RenderNode] | undefined;
    cssomNode: CSSOMNode | undefined;
    domNode: DOMNode | undefined;

}

export default RenderNode;
