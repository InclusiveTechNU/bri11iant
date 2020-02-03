import { JSDOM } from "jsdom";

export function createDOM(text: string, uri: string): Promise<JSDOM> {
    const tempDOM = new JSDOM(text);
	let tempDoc = tempDOM.window.document;

	// Replace css links with full paths
	const uriPath = uri.substr(0, uri.lastIndexOf("\/") + 1);
	for (let link of tempDoc.querySelectorAll("link")) {
		link.setAttribute("href", uriPath + link.getAttribute("href"));
	}

	const DOM = new JSDOM(tempDOM.serialize(), {
		includeNodeLocations: true,
		resources: "usable"//,
		// runScripts: "dangerously" // TODO: Run .js scripts
    });
    
    return new Promise(resolve => {
        DOM.window.addEventListener("load", () => {
            resolve(DOM);
            
            // Example use
            /* const document = DOM.window.document;
            const h1 = document.querySelector('h1');
            if (h1) {
                const color = DOM.window.getComputedStyle(h1, null).getPropertyValue('color');
                console.log(color);
            } */
        });
    });
}