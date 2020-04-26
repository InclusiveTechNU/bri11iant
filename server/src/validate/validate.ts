/*! validate.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { altText } from "../util/classifiers/imageClassifier";
import { contrast } from "../util/contrast";
import { DiagnosticSeverity } from "vscode-languageserver";
import * as messages from "../util/messages";
import {
	altNonDescriptive,
	altBadStart
} from "../util/patterns";
import { Result } from "./Result";
import * as roles from "../util/roles";
import { DOMWindow, JSDOM } from "jsdom";

// Check that anchor elements have descriptive text
export function validateA(e: HTMLAnchorElement): Result | undefined {
	if (e.innerHTML.length === 0) {
		return {
			extended: true,
			message: messages.validateAMessage,
			severity: DiagnosticSeverity.Warning
		};
	}

	// Check that the aria role for <a href=""> is valid
	if (e.attributes.getNamedItem("href")) {
		const value = e.attributes.getNamedItem("role")?.value;
		if (value && !roles.validARoleNames.has(value)) {
			return {
				message: messages.roleNotAllowedMessage(value, "<a>"),
				severity: DiagnosticSeverity.Information
			};
		}
	}
}

// Validate <area> tags
export function validateArea(e: HTMLAreaElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value) {
		return {
			message: messages.roleNotAllowedMessage(value, "<area>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Encourage the marking of dynamic regions as live
export function validateAriaLive(e: Element, window: DOMWindow): Result | undefined {
	// const $ = require("jquery")(window);
	// const events = $._data(e, "events");
	try {
		const element = (e as HTMLElement);
		console.log(element.onclick);
	} catch {
		return;
	}

}

// Looks at global event handlers set on the DOM window
export function validateAriaLiveGlobal(window: DOMWindow): Result | undefined {
	// TODO: This
	// onblur, onerror, onfocus, onload, and onscroll that are set on <body> are really set on the window
	return;
}

// Check that specified aria roles are valid
export function validateAriaRole(e: Element): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.roleNames.has(value)) {
		return {
			message: messages.validateAriaRoleMessage(value),
			severity: DiagnosticSeverity.Error
		};
	}
}

// Validate <article> tags
export function validateArticle(e: HTMLElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validArticleRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<article>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <aside> tags
export function validateAside(e: HTMLElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validAsideRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<aside>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <audio> tags
export function validateAudio(e: HTMLAudioElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validAudioRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<audio>"),
			severity: DiagnosticSeverity.Information
		};
	}
	// TODO: Check for captions and suggest/generate
}

// Validate <body> tags
export function validateBody(e: HTMLBodyElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value) {
		return {
			message: messages.roleNotAllowedMessage(value, "<body>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <br> tags
export function validateBR(e: HTMLBRElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validBRRoleNames.has(value) ) {
		return {
			message: messages.roleNotAllowedMessage(value, "<br>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <button> tags
export function validateButton(e: HTMLButtonElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validButtonRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<button>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <caption> tags
export function validateCaption(e: HTMLTableCaptionElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value) {
		return {
			message: messages.roleNotAllowedMessage(value, "<caption>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Checks for sufficient color contrast between elements
export function validateContrast(e: Element, window: Window): Result | undefined {
	const style = window.getComputedStyle(e);
	const backgroundColor = style.getPropertyValue("background-color");
	const color = style.getPropertyValue("color");
	const MINIMUM_CONTRAST_RATIO = 4.5; // TODO: Differentiate between large and small text
	if (color && backgroundColor) {
		const c = contrast(color, backgroundColor);
		if (c < MINIMUM_CONTRAST_RATIO) {
			return {
				message: messages.validateContrastMessage(c),
				severity: DiagnosticSeverity.Error
			};
		}
	}
}

// Validate <datalist> tags
export function validateDataList(e: HTMLDataListElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value) {
		return {
			message: messages.roleNotAllowedMessage(value, "<datalist>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <dd> tags
export function validateDD(e: HTMLElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value) {
		return {
			message: messages.roleNotAllowedMessage(value, "<dd>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <details> tags
export function validateDetails(e: HTMLDetailsElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value) {
		return {
			message: messages.roleNotAllowedMessage(value, "<details>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <dialog> tags
export function validateDialog(e: HTMLDialogElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validDialogRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<dialog>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check that divs use WAI-ARIA roles
export function validateDiv(e: HTMLDivElement): Result | undefined {
	const role = e.attributes.getNamedItem("role");
	if (!role) {
		return {
			message: messages.validateDivMessage,
			severity: DiagnosticSeverity.Information
		};
	}

	const ariaLabel = e.attributes.getNamedItem("aria-label");
	const ariaLabelledBy = e.attributes.getNamedItem("aria-labelledby");
	const ariaDescribedBy = e.attributes.getNamedItem("aria-describedby");
	if (ariaLabel || ariaLabelledBy || ariaDescribedBy) {
		return {
			message: messages.validateAriaLabelBadElementMessage("<div>"),
			severity: DiagnosticSeverity.Warning
		}
	}
}

// Validate <dl> tags
export function validateDL(e: HTMLDListElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validDLRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<dl>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <dialog> tags
export function validateDT(e: HTMLElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validDTRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<dt>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <embed> tags
export function validateEmbed(e: HTMLEmbedElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validEmbedRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<embed>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <fieldset> tags
export function validateFieldSet(e: HTMLFieldSetElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validFieldSetRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<fieldset>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <figcaption> tags
export function validateFigCaption(e: HTMLElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validFigCaptionRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<figcaption>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <figure> tags
export function validateFigure(e: HTMLElement): Result | undefined {
	// No non-global attributes allowed if the figure has a <figcaption> descendant
	if (e.querySelector("figcaption")) {
		const value = e.attributes.getNamedItem("role")?.value;
		if (value) {
			return {
				message: messages.roleNotAllowedMessage(value, "<figure>"),
				severity: DiagnosticSeverity.Information
			};
		}
	}
}

// Validate <footer> tags
export function validateFooter(e: HTMLElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validFooterRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<footer>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <form> tags
export function validateForm(e: HTMLFormElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validFormRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<form>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check various attributes of <head> and its children
export function validateHead(e: HTMLHeadElement): Result | undefined {
	// Check for a title tag
	if (!e.querySelector("title")) {
		return {
			message: messages.validateHeadTitleMessage,
			severity: DiagnosticSeverity.Error
		};
	}
}

// Validate h1-h6 tags
export function validateHeader(e: Element): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validHeaderRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Validate <hr> tags
export function validateHR(e: HTMLHRElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validHRRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<hr>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check for html's language specification and ARIA role
export function validateHtml(e: HTMLHtmlElement): Result | undefined {
	if (!e.attributes.getNamedItem("lang")) {
		return {
			message: messages.validateHtmlMessage,
			severity: DiagnosticSeverity.Warning
		};
	}
}

// Validate <iframe> tags
export function validateIFrame(e: HTMLIFrameElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validIFrameRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<iframe>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Checks that img tags use valid alt attributes
export async function validateImg(e: HTMLImageElement): Promise<Result | undefined> {
	const alt = e.attributes.getNamedItem("alt");
	if (alt) {
		const role = e.attributes.getNamedItem("role")?.value;
		if (role) {
			if (alt.value === "" && !roles.validImgEmptyAltRoleNames.has(role)) {
				return {
					message: messages.roleNotAllowedMessage(role, "<img>"),
					severity: DiagnosticSeverity.Information
				};
			} else if (alt.value !== "" && !roles.validImgWithAltRoleNames.has(role)) {
				return {
					message: messages.roleNotAllowedMessage(role, "<img>"),
					severity: DiagnosticSeverity.Information
				};
			}
		} else if (altNonDescriptive.test(alt.value)) {
			return {
				message: messages.validateAltDescriptiveMessage,
				severity: DiagnosticSeverity.Information
			};
		} else if (altBadStart.test(alt.value)) {
			return {
				message: messages.validateAltBadStartMessage,
				severity: DiagnosticSeverity.Information
			};
		} else if (alt.value.length > 125) {
			return {
				message: messages.validateAltLongMessage,
				severity: DiagnosticSeverity.Information
			};
		}
	} else {
		// Run TF object classifier on image to retrieve potential alt text
		/* const alt = await altText(e);
		if (alt) {
			return {
				message: messages.validateAltMessage(alt),
				severity: DiagnosticSeverity.Error
			};
		} else { */
			return {
				message: messages.validateAltMessage(),
				severity: DiagnosticSeverity.Error
			};
		// }
	}
}

// Check that inputs are properly labelled
export function validateInput(e: HTMLInputElement): Result | undefined {
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
				message: messages.validateAriaEmptyMessage,
				severity: DiagnosticSeverity.Hint
			};
		}
	} else if (ariaLabelledBy) {
		if (ariaLabelledBy.value === "") {
			return {
				message: messages.validateAriaLabelledByEmptyMessage,
				severity: DiagnosticSeverity.Hint
			};
		}
	} else if (title) {
		return {
			message: messages.validateAriaLabelledByEmptyMessage,
			severity: DiagnosticSeverity.Hint
		};
	} else {
		return {
			message: messages.validateAriaLabelMessage,
			severity: DiagnosticSeverity.Hint
		};
	}

	const role = e.attributes.getNamedItem("role")?.value;
	const type = e.attributes.getNamedItem("type")?.value;
	if (role && type) {
		if (roles.inputTypesWithoutRoles.has(type)) {
			return {
				message: messages.noRolesAllowedMessage,
				severity: DiagnosticSeverity.Information
			};
		} else if (type === "button" && !roles.validInputButtonRoleNames.has(role)) {
			return {
				message: messages.roleNotAllowedMessage(role, "<input type=\"button\">"),
				severity: DiagnosticSeverity.Information
			};
		} else if (type === "checkbox" && !roles.validInputCheckboxRoleNames.has(role)) {
			return {
				message: messages.roleNotAllowedMessage(role, "<input type=\"checkbox\">"),
				severity: DiagnosticSeverity.Information
			};
		} else if (type === "image" && !roles.validInputImageRoleNames.has(role)) {
			return {
				message: messages.roleNotAllowedMessage(role, "<input type=\"image\">"),
				severity: DiagnosticSeverity.Information
			};
		} else if (type === "radio" && !roles.validInputRadioRoleNames.has(role)) {
			return {
				message: messages.roleNotAllowedMessage(role, "<input type=\"radio\">"),
				severity: DiagnosticSeverity.Information
			};
		} else if (type === "text" && !e.attributes.getNamedItem("list") && !roles.validInputTextRoleNames.has(role)) {
			return {
				message: messages.roleNotAllowedMessage(role, "<input type=\"text\">"),
				severity: DiagnosticSeverity.Information
			};
		}
	}
}

// Check for valid <li> tags
export function validateLI(e: HTMLLIElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validLIRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<li>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check for valid <link> tags
export function validateLink(e: HTMLLinkElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && e.attributes.getNamedItem("href")) {
		return {
			message: messages.roleNotAllowedMessage(value, "<link>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check for valid <menu> tags
export function validateMenu(e: HTMLMenuElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validMenuRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<menu>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check for valid meta tags
export function validateMeta(e: HTMLMetaElement): Result | undefined {
	const content = e.attributes.getNamedItem("content");
	if (content) {
		if (content.value.includes("maximum-scale")) {
			return {
				extended: true,
				message: messages.validateMetaMaximumScaleMessage,
				severity: DiagnosticSeverity.Information
			};
		}
		if (content.value.includes("user-scalable")) {
			return {
				extended: true,
				message: messages.validateMetaUserScalableMessage,
				severity: DiagnosticSeverity.Information
			};
		}
	}
}

// Validate that the tag does not contain an ARIA role
export function validateNoAriaRole(e: HTMLElement): Result | undefined {
	if (e.attributes.getNamedItem("role")) {
		return {
			message: messages.noRolesAllowedMessage,
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check for valid <object> tags
export function validateObject(e: HTMLObjectElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validObjectRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<object>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check for valid <ol> tags
export function validateOl(e: HTMLOListElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validOlRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<ol>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Make sure <span> tags have roles, if used
export function validateP(e: HTMLParagraphElement): Result | undefined {
	const ariaLabel = e.attributes.getNamedItem("aria-label");
	const ariaLabelledBy = e.attributes.getNamedItem("aria-labelledby");
	const ariaDescribedBy = e.attributes.getNamedItem("aria-describedby");
	if (ariaLabel || ariaLabelledBy || ariaDescribedBy) {
		return {
			message: messages.validateAriaLabelBadElementMessage("<p>"),
			severity: DiagnosticSeverity.Warning
		};
	}
}

// Check for valid <section> tags
export function validateSection(e: HTMLElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validSectionRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<section>"),
			severity: DiagnosticSeverity.Information
		};
	}
}
 
// Make sure <select> tags follow specifications
export function validateSelect(e: HTMLSelectElement): Result | undefined {
	if (e.attributes.getNamedItem("multiple")) {
		return {
			message: messages.validateSelectMultipleMessage,
			severity: DiagnosticSeverity.Hint
		};
	}
	
	if (!(e.attributes.getNamedItem("aria-live"))) {
		return {
			message: messages.validateSelectAriaLiveMessage,
			severity: DiagnosticSeverity.Hint
		};
	}
}

export function validateSpan(e: HTMLSpanElement): Result | undefined {
	// Make sure <span> tags have roles, if used
	const role = e.attributes.getNamedItem("role");
	if (!role) {
		return {
			message: messages.validateSpanMessage,
			severity: DiagnosticSeverity.Information
		};
	}

	const ariaLabel = e.attributes.getNamedItem("aria-label");
	const ariaLabelledBy = e.attributes.getNamedItem("aria-labelledby");
	const ariaDescribedBy = e.attributes.getNamedItem("aria-describedby");
	if (ariaLabel || ariaLabelledBy || ariaDescribedBy) {
		return {
			message: messages.validateAriaLabelBadElementMessage("<span>"),
			severity: DiagnosticSeverity.Warning
		};
	}
}

// Check for valid <SVG> tags
export function validateSVG(e: Element): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validSVGRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<SVG>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check that tabindexes are 0 or -1
export function validateTabIndex(e: Element): Result | undefined {
	const tabIndex = e.attributes.getNamedItem("tabindex");
	if (tabIndex && tabIndex.value !== "-1" && tabIndex.value !== "0") {
		return {
			message: messages.validateTabIndex,
			severity: DiagnosticSeverity.Error
		};
	}
}

// Check for non-empty titles
export function validateTitle(e: HTMLTitleElement): Result | undefined {
	const text = e.innerText;
	if (!text || text === "") {
		return {
			extended: true,
			message: messages.validateTitleMessage,
			severity: DiagnosticSeverity.Error
		};
	}
}

// Check for valid <ul> tags
export function validateUl(e: HTMLUListElement): Result | undefined {
	const value = e.attributes.getNamedItem("role")?.value;
	if (value && !roles.validUlRoleNames.has(value)) {
		return {
			message: messages.roleNotAllowedMessage(value, "<ul>"),
			severity: DiagnosticSeverity.Information
		};
	}
}

// Check for valid <video> tags
export function validateVideo(): Result {
	return {
		message: messages.validateVideoMessage,
		severity: DiagnosticSeverity.Hint
	};
}
