import CSSSelector from "./CSSOMSelector";

class CSSSelectorLayer {

	children: CSSSelectorLayer | undefined;
	selectors: [CSSSelector] | undefined;

}

export default CSSSelectorLayer;
