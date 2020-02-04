/*! DOM.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { JSDOM } from "jsdom";

export function createDOM(text: string, uri: string): Promise<JSDOM> {
    const tempDOM = new JSDOM(text);

    // Replace css links with full paths
	const uriPath = uri.substr(0, uri.lastIndexOf("\/") + 1);
	for (const link of tempDOM.window.document.querySelectorAll("link")) {
        const attribute = link.getAttribute("href");
        if (attribute && attribute.charAt(0) !== "/") {
            link.setAttribute("href", uriPath + attribute);
        }
	}

	const DOM = new JSDOM(tempDOM.serialize(), {
		resources: "usable"
    });
    
    return new Promise(resolve => {
        DOM.window.addEventListener("load", () => {
            resolve(DOM);
        });
    });
}