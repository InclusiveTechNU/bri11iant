/*! DOM.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { JSDOM } from "jsdom";

export function createDOM(text: string, uri: string): Promise<JSDOM> {
    // Create temporary DOM for initial parsing
    const tempDOM = new JSDOM(text);

    // Get absolute path to HTML file
    const uriPath = uri.substr(0, uri.lastIndexOf("\/") + 1);
    
    // Replace css links with full paths
	for (const link of tempDOM.window.document.querySelectorAll("link")) {
        const attribute = link.getAttribute("href");
        if (attribute && attribute.charAt(0) !== "/" && !/http*/i.test(attribute)) {
            link.setAttribute("href", uriPath + attribute);
        }
    }
    
    // Replace js scripts with full paths
    for (const link of tempDOM.window.document.querySelectorAll("script")) {
        const attribute = link.getAttribute("src");
        if (attribute && attribute.charAt(0) !== "/" && !/http*/i.test(attribute)) {
            link.setAttribute("src", uriPath + attribute);
        }
    }
    
    // Create DOM and run scripts
	const DOM = new JSDOM(tempDOM.serialize(), {
        resources: "usable",
        runScripts: "dangerously"
    });
    
    // Return DOM when the scripts have loaded
    return new Promise(resolve => {
        DOM.window.addEventListener("load", () => {
            resolve(DOM);
        });
    });
}