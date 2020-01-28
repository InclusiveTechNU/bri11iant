import DOMNodeType from "./DOMNodeType";

class DOMNode {

    children: [DOMNode];
    classes: [string];
    id: string;
    type: DOMNodeType;
    visible: boolean;

    constructor(classes: [string], id: string, type: DOMNodeType, visible: boolean) {
        this.classes = classes;
        this.id = id;
        this.type = type;
        this.visible = visible;
    }

}

export default DOMNode;
