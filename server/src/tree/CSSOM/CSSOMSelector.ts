import CSSSelectorType from "./CSSOMSelectorType";

class CSSSelector {

	name: string | undefined;
	type: CSSSelectorType;

	constructor(type: CSSSelectorType, name: string | undefined) {
        this.name = name;
        this.type = type;
	}

}

export default CSSSelector;
