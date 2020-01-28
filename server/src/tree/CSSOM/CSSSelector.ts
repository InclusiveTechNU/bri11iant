import CSSSelectorType from "./CSSSelectorType";

class CSSSelector {

	name: string;
	type: CSSSelectorType;

	constructor(name: string, type: CSSSelectorType) {
		this.name = name;
		this.type = type;
	}

}

export default CSSSelector;
