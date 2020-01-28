import CSSSelectorLayer from "./CSSOMSelector/CSSOMSelectorLayer";
import CSSStyle from "./CSSOMStyle";

class CSSOMNode {

    selector: CSSSelectorLayer | undefined;
    styles: [CSSStyle] | undefined;

}

export default CSSOMNode;
