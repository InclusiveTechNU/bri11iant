import CSSSelectorType from "./CSSSelectorType";

class CSSSelector {

	name: string | undefined;
	type: CSSSelectorType;

	constructor(type: CSSSelectorType, name: string | undefined) {
        this.name = name;
        this.type = type;
	}

}

export default CSSSelector;
