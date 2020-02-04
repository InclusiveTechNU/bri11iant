/*! validate.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { contrast } from "./util/contrast";
import { DiagnosticSeverity } from "vscode-languageserver";
import { JSDOM } from "jsdom";

import {
	a,
	altExists,
	altLong,
	altNonDescriptive,
	altNull,
	ariaId,
	ariaIdNonEmpty,
	ariaLabel,
	ariaLabelEmpty,
	ariaRole,
	altBadStart,
	headNonEmpty,
	inputHidden,
	language,
	metaMaxScale,
	metaScalable,
	metaViewport,
	tag,
	title,
	titleContent,
	titleFull,
	tagNoWhitespace,
	ariaLabelledBy,
	ariaLabelledByEmpty,
	tabIndexValid,
	titleNonEmpty
} from "./util/patterns";

// Checks for sufficient color contrast between elements
export function validateContrast(e: Element, DOM: JSDOM) {
	const style = DOM.window.getComputedStyle(e);
	const backgroundColor = style.getPropertyValue("background-color");
	const color = style.getPropertyValue("color");
	if (color && backgroundColor) {
		// TODO: Handle large-scale text
		const c = contrast(color, backgroundColor);
		if (c < 4.5) {
			return {
				message: `Color contrast between content and its background must be 4.5 or above (is ${c.toFixed(2)})`,
				severity: DiagnosticSeverity.Error
			};
		}
	}
}

// Checks that img tags use valid alt attributes
export function validateImg(e: HTMLImageElement) {
	if (e.hasAttributes()) {
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
			} else if (altLong.test(alt.value)) {
				return {
					message: "Alt text is too long - most screen readers cut off at 125 characters",
					severity: DiagnosticSeverity.Information
				};
			}
		} else {
			return {
				message: "Provide an alt text that describes the image, or alt=\"\" if image is purely decorative",
				severity: DiagnosticSeverity.Error
			};
		}
	}
}

/*
// Check that divs use WAI-ARIA roles
export async function validateDiv(m: RegExpExecArray) {
	if (!ariaRole.test(m[0])) {
		return {
			meta: m,
			mess: "Use Semantic HTML5 or specify a WAI-ARIA role [role=\"\"]",
			severity: DiagnosticSeverity.Information
		};
	}
}

export async function validateA(m: RegExpExecArray) {
	let aRegEx: RegExpExecArray | null;
	let oldRegEx: RegExpExecArray = m;

	// Matches any whitespace or non-whitespace in between brackets
	let filteredString = m[0].replace(tag, "");
	if (!tagNoWhitespace.test(filteredString)) {
		aRegEx = a.exec(oldRegEx[0]);
		if (aRegEx) {
			aRegEx.index = oldRegEx.index;
			return {
				meta: aRegEx,
				mess: "Provide a descriptive text in between the tags",
				severity: DiagnosticSeverity.Warning
			};
		}
	}
}

// Check for the presence of meta tags
export async function validateMeta(m: RegExpExecArray) {
	const metaRegEx: RegExpExecArray | null = metaViewport.exec(m[0]);
	if (metaRegEx) {
		metaRegEx.index = m.index + metaRegEx.index;
		if (!metaScalable.test(metaRegEx[0])) {
			return {
				meta: metaRegEx,
				mess: "Enable pinching to zoom [user-scalable=yes]",
				severity: DiagnosticSeverity.Information
			};
		}
		if (metaMaxScale.test(metaRegEx[0])) {
			return {
				meta: metaRegEx,
				mess: "Avoid using [maximum-scale=1]",
				severity: DiagnosticSeverity.Information
			};
		}
	}
}

// Checks that title tag follows standards
export async function validateTitle(m: RegExpExecArray) {
	let titleRegEx: RegExpExecArray | null;
	if (!title.test(m[0])) {
		titleRegEx = headNonEmpty.exec(m[0]);
		if (titleRegEx) {
			titleRegEx.index = m.index;
			return {
				meta: titleRegEx,
				mess: "Provide a title within the <head> tags",
				severity: DiagnosticSeverity.Error
			};
		}
	} else {
		titleRegEx = titleFull.exec(m[0]);
		if (titleRegEx) {
			if (titleContent.test(titleRegEx[0])) {
				titleRegEx.index = m.index + titleRegEx.index;
				return {
					meta: titleRegEx,
					mess: "Provide a text within the <title> tags",
					severity: DiagnosticSeverity.Error
				};
			}
		}
	}
}

export async function validateHtml(m: RegExpExecArray) {
	if (!language.test(m[0])) {
		return {
			meta: m,
			mess: "Provide a language [lang=\"\"]",
			severity: DiagnosticSeverity.Warning
		};
	}
}

export async function validateInput(m: RegExpExecArray) {
	switch (true) {
	case (inputHidden.test(m[0])):
		break;
	case (ariaLabel.test(m[0])):
		if (ariaLabelEmpty.test(m[0])) {
			return {
				meta: m,
				mess: "Provide a text within the aria label [aria-label=\"\"]",
				severity: DiagnosticSeverity.Information
			};
		} else { break; }
	case (ariaId.test(m[0])):
		if (ariaIdNonEmpty.test(m[0])) {
			let idRegEx: RegExpExecArray | null = ariaIdNonEmpty.exec(m[0]);
			if (idRegEx) {
				const idValue = idRegEx[1];
				let pattern: RegExp = new RegExp("for=\"" + idValue + "\"", "i");
				if (!pattern.test(m.input)) {
					return {
						meta: m,
						mess: "Provide an aria label [aria-label=\"\"] or a <label for=\"\">",
						severity: DiagnosticSeverity.Warning
					};
				} else { break; }
			}
		} else {
			return {
				meta: m,
				mess: "Provide an aria label [aria-label=\"\"]",
				severity: DiagnosticSeverity.Warning
			};
		}
	case (ariaLabelledBy.test(m[0])):
		if (ariaLabelledByEmpty.test(m[0])) {
			return {
				meta: m,
				mess: "Provide an id within the aria labelledby [aria-labelledby=\"\"]",
				severity: DiagnosticSeverity.Error
			};
		} else { break; }
	case (/role=/i.test(m[0])):
		break;
	default:
		return {
			meta: m,

			mess: "Provide an aria label [aria-label=\"\"]",
			severity: DiagnosticSeverity.Warning
		};
	}
}

export async function validateTab(m: RegExpExecArray) {
	if (!tabIndexValid.test(m[0])) {
		return {
			meta: m,
			mess: "A tabindex greater than 0 interferes with the focus order. Try restructuring the HTML",
			severity: DiagnosticSeverity.Error
		};
	}
}

export async function validateFrame(m: RegExpExecArray) {
	if (!titleNonEmpty.test(m[0])) {
		return {
			meta: m,
			mess: "Provide a title that describes the frame's content [title=\"\"]",
			severity: DiagnosticSeverity.Information
		};
	}
} */
