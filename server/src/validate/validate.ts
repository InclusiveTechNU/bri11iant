/*! validate.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { altText } from "../util/objectClassifier";
import { contrast } from "../util/contrast";
import { DiagnosticSeverity } from "vscode-languageserver";
import { JSDOM } from "jsdom";
import {
	altNonDescriptive,
	altBadStart,
} from "../util/patterns";

// Check for html's language specification
export function validateHtml(e: HTMLHtmlElement) {
	const language = e.attributes.getNamedItem("lang");
	if (!language) {
		return {
			message: "Provide a language [lang=\"\"]",
			severity: DiagnosticSeverity.Warning
		}
	}
}

export function validateHead(e: HTMLHeadElement) {
	// Check for a title tag
	const title = e.querySelector("title");
	if (!title) {
		return {
			message: "Provide a title within the <head> tags",
			severity: DiagnosticSeverity.Error
		}
	}

	// Check for the existance of a meta tag with user-scalable=yes
	// Other case handled by validateMeta
	e.querySelectorAll("meta").forEach(meta => {
		if (meta.attributes.getNamedItem("user-scalable")) {
			return;
		}
	});

	return {
		message: "Enable pinching to zoom [user-scalable=yes]",
		severity: DiagnosticSeverity.Information
	}
}

// Check for valid meta tags
export function validateMeta(e: HTMLMetaElement) {
	// Need to handle having multiple meta tags
	const role = e.attributes.getNamedItem("user-scalable");
	if (role && role.value !== "yes") {
		return {
			extended: true,
			message: "Enable pinching to zoom [user-scalable=yes]",
			severity: DiagnosticSeverity.Information
		}
	}

	const maximumScale = e.attributes.getNamedItem("maximum-scale");
	if (maximumScale && maximumScale.value === "1") {
		return {
			extended: true,
			message: "Avoid using [maximum-scale=1]",
			severity: DiagnosticSeverity.Information
		}
	}
}

// Check for non-empty titles
export function validateTitle(e: HTMLTitleElement) {
	const text = e.innerText;
	if (!text || text === "") {
		return {
			extended: true,
			message: "Provide a text within the <title> tags",
			severity: DiagnosticSeverity.Error
		};
	}
}

// Checks that img tags use valid alt attributes
export async function validateImg(e: HTMLImageElement) {
	const alt = e.attributes.getNamedItem("alt");
	if (alt) {
		if (altNonDescriptive.test(alt.value)) {
			return {
				message: "Alt attribute must be specifically descriptive",
				severity: DiagnosticSeverity.Information
			};
		} else if (altBadStart.test(alt.value)) {
			return {
				message: "Alt text should not begin with \"image of\" or similar phrasing",
				severity: DiagnosticSeverity.Information
			};
		} else if (alt.value.length > 125) {
			return {
				message: "Alt text is too long - most screen readers cut off at 125 characters",
				severity: DiagnosticSeverity.Information
			};
		}
	} else {
		const message = `Provide an alt text that describes the image, `;
		let messageDecorative = "or alt=\"\" if image is purely decorative";

		// Run TF object classifier on image to retrieve potential alt text
		const alt = await altText(e);
		if (alt) {
			messageDecorative = alt;
		}

		return {
			message: message + messageDecorative,
			severity: DiagnosticSeverity.Error
		};
	}
}

// Check that divs use WAI-ARIA roles
export function validateDiv(e: HTMLDivElement) {
	const role = e.attributes.getNamedItem("role");
	if (!role) {
		return {
			message: "Use Semantic HTML5 or specify a WAI-ARIA role [role=\"\"]\nhttps://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles",
			severity: DiagnosticSeverity.Information
		}
	}
}

// Check that anchor elements have descriptive text
export function validateA(e: HTMLAnchorElement) {
	if (e.innerHTML.length === 0) {
		return {
			extended: true,
			message: "Provide descriptive text in between anchor tags",
			severity: DiagnosticSeverity.Warning
		};
	}
}

// Check that inputs are properly labelled
export function validateInput(e: HTMLInputElement) {
	if (e.style.getPropertyValue("display") === "none") {
		return;
	} else if (e.style.getPropertyValue("visibility") === "hidden") {
		return;
	}

	const ariaLabel = e.attributes.getNamedItem("aria-label");
	const ariaLabelledBy = e.attributes.getNamedItem("aria-labelled-by");
	const title = e.attributes.getNamedItem("title");
	if (ariaLabel) {
		if (ariaLabel.value === "") {
			return {
				message: "Provide a text within the aria label [aria-label=\"\"]",
				severity: DiagnosticSeverity.Hint
			};
		}
	} else if (ariaLabelledBy) {
		if (ariaLabelledBy.value === "") {
			return {
				message: "Provide a text within the aria-labelled-by tag [aria-labelled-by=\"\"]",
				severity: DiagnosticSeverity.Hint
			};
		}
	} else if (title) {
		return {
			message: "It's recommended to use aria-label or aria-labelled-by to identify form controls, as the title attribute is often used to provide non-essential information.",
			severity: DiagnosticSeverity.Hint
		};
	} else {
		return {
			message: "Provide an aria label to identify the input element [aria-label=\"\"]",
			severity: DiagnosticSeverity.Hint
		};
	}
}

// Checks for sufficient color contrast between elements
export function validateContrast(e: Element, DOM: JSDOM) {
	const style = DOM.window.getComputedStyle(e);
	const backgroundColor = style.getPropertyValue("background-color");
	const color = style.getPropertyValue("color");
	if (color && backgroundColor) {
		const c = contrast(color, backgroundColor);
		if (c < 4.5) {
			return {
				message: `Color contrast between content and its background must be 4.5:1 or above (is ${c.toFixed(2)}:1)`,
				severity: DiagnosticSeverity.Error
			};
		}
	}
}

// Check that tabindexes are 0 or -1
export function validateTabIndex(e: Element) {
	const tabIndex = e.attributes.getNamedItem("tabindex");
	if (tabIndex && tabIndex.value !== "-1" && tabIndex.value !== "0") {
		return {
			message: "A tabindex other than 0 or -1 interferes with the focus order.",
			severity: DiagnosticSeverity.Error
		}
	}
}
