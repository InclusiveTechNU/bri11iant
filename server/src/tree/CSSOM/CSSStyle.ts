class CSSStyle {

    key: string; // TODO: convert to enum with every CSS property?
    values: [string];

    constructor(key: string, values: [string]) {
        this.key = key;
        this.values = values;
    }

}

export default CSSStyle;
