/*! DOM.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { JSDOM } from "jsdom";

export function createDOM(text: string, uri: string): Promise<JSDOM> {
    const tempDOM = new JSDOM(text);
	let tempDoc = tempDOM.window.document;

    // Replace css links with full paths
	const uriPath = uri.substr(0, uri.lastIndexOf("\/") + 1);
	for (const link of tempDoc.querySelectorAll("link")) {
        const attribute = link.getAttribute("href");
        link.setAttribute("href", uriPath + attribute);
	}

	const DOM = new JSDOM(tempDOM.serialize(), {
		resources: "usable"
    });
    
    return new Promise(resolve => {
        DOM.window.addEventListener("load", () => {
            resolve(DOM);
            
            // Example use
            /* const document = DOM.window.document;
            const h1 = document.querySelector('h1');
            if (h1) {
                const color = DOM.window.getComputedStyle(h1, null)?.getPropertyValue('color');
                console.log(color);
            } */
        });
    });
}