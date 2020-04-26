/*! DOM.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { JSDOM } from "jsdom";
import { setObserver } from "./mutation/mutation";

const uniqueIdAttributeName = '__br_uid__';

function setLinkToFullPath(dom: JSDOM, uriPath: string, elementType: string, srcAttr: string) {
    for (const link of dom.window.document.querySelectorAll(elementType)) {
        const attribute = link.getAttribute(srcAttr);
        if (attribute && attribute.charAt(0) !== "/" && !/http*/i.test(attribute)) {
            link.setAttribute(srcAttr, uriPath + attribute);
        }
    }
}

function addUniqueIds(DOM: JSDOM): JSDOM {
    let tagIndex: Map<string, number> = new Map();
    const recurse = (e: Element) => {
        // Set unique ID
        let tagUID = tagIndex.get(e.tagName) ?? 0;
        e.setAttribute(uniqueIdAttributeName, tagUID.toString());
        tagIndex.set(e.tagName, tagUID + 1);

        if (e.childElementCount > 0) {
            recurse(e.children[0]);
        }
        if (e.nextElementSibling !== null) {
            recurse(e.nextElementSibling);
        }
    }
    recurse(DOM.window.document.documentElement);
    return DOM;
}

export function getElementTagIndex(e: Element) {
    return parseInt(e.getAttribute(uniqueIdAttributeName)!)!;
}

function observerCallback() {
    console.log("woot!");
}

export function createDOM(text: string, uri: string): Promise<JSDOM> {
    // Create temporary DOM for initial parsing
    let tempDOM = new JSDOM(text);

    const uriPath = uri.substr(0, uri.lastIndexOf("\/") + 1);

    // Replace element links with full paths
    setLinkToFullPath(tempDOM, uriPath, "link", "href"); // CSS
    setLinkToFullPath(tempDOM, uriPath, "img", "src"); // img
    setLinkToFullPath(tempDOM, uriPath, "script", "src"); // JS

	let DOM = addUniqueIds(new JSDOM(tempDOM.serialize(), {
        resources: "usable",
        runScripts: "dangerously"
    }));

    // Set mutation observer
    // setObserver(DOM.window.document.documentElement, observerCallback);

    // Return DOM when the scripts have loaded
    return new Promise(resolve => {
        DOM.window.addEventListener("load", () => {
            resolve(DOM);
        });
    });
}
