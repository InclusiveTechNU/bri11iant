/*! DOM.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { JSDOM } from "jsdom";

function setLinkToFullPath(dom: JSDOM, uriPath: string, elementType: string, srcAttr: string) {
    for (const link of dom.window.document.querySelectorAll(elementType)) {
        const attribute = link.getAttribute(srcAttr);
        if (attribute && attribute.charAt(0) !== "/") {
            link.setAttribute(srcAttr, uriPath + attribute);
        }
    }
}

export function createDOM(text: string, uri: string): Promise<JSDOM> {
    const tempDOM = new JSDOM(text);

    const uriPath = uri.substr(0, uri.lastIndexOf("\/") + 1);
    // Replace element links with full paths
    setLinkToFullPath(tempDOM, uriPath, "link", "href"); // CSS
    setLinkToFullPath(tempDOM, uriPath, "img", "src"); // img

	const DOM = new JSDOM(tempDOM.serialize(), {
		resources: "usable"
    });
    
    return new Promise(resolve => {
        DOM.window.addEventListener("load", () => {
            resolve(DOM);
        });
    });
}