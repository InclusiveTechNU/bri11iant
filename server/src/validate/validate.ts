/*! validate.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { altText } from "../util/classifiers/imageClassifier";
import { contrast } from "../util/contrast";
import { DiagnosticSeverity } from "vscode-languageserver";
import * as messages from "../util/messages";
import {
	altNonDescriptive,
	altBadStart,
} from "../util/patterns";
import { Result } from "./Result";
import { roleNames } from "../util/roles";

// Check for html's language specification
export function validateHtml(e: HTMLHtmlElement): Result | undefined {
	const language = e.attributes.getNamedItem("lang");
	if (!language) {
		return {
			message: messages.validateHtmlMessage,
			severity: DiagnosticSeverity.Warning
		};
	}
}

export function validateHead(e: HTMLHeadElement): Result | undefined {
	// Check for a title tag
	const title = e.querySelector("title");
	if (!title) {
		return {
			message: messages.validateHeadTitleMessage,
			severity: DiagnosticSeverity.Error
		};
	}

	// Check for the existance of a meta tag with user-scalable=yes
	// Other case handled by validateMeta
	e.querySelectorAll("meta").forEach(meta => {
		if (meta.attributes.getNamedItem("user-scalable")) {
			return;
		}
	});

	return {
		message: messages.validateHeadUserScalableMessage,
		severity: DiagnosticSeverity.Information
	};
}

// Check for valid meta tags
export function validateMeta(e: HTMLMetaElement): Result | undefined {
	// Need to handle having multiple meta tags
	const role = e.attributes.getNamedItem("user-scalable");
	if (role && role.value !== "yes") {
		return {
			extended: true,
			message: messages.validateMetaUserScalableMessage,
			severity: DiagnosticSeverity.Information
		};
	}

	const maximumScale = e.attributes.getNamedItem("maximum-scale");
	if (maximumScale && maximumScale.value === "1") {
		return {
			extended: true,
			message: messages.validateMetaMaximumScaleMessage,
			severity: DiagnosticSeverity.Information
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

// Checks that img tags use valid alt attributes
export async function validateImg(e: HTMLImageElement): Promise<Result | undefined> {
	const alt = e.attributes.getNamedItem("alt");
	if (alt) {
		if (altNonDescriptive.test(alt.value)) {
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
		const alt = await altText(e);
		if (alt) {
			return {
				message: messages.validateAltMessage(alt),
				severity: DiagnosticSeverity.Error
			};
		} else {
			return {
				message: messages.validateAltMessage(),
				severity: DiagnosticSeverity.Error
			};
		}
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
}

export function validateSpan(e: HTMLSpanElement): Result | undefined {
	const role = e.attributes.getNamedItem("role");
	if (!role) {
		return {
			message: messages.validateSpanMessage,
			severity: DiagnosticSeverity.Information
		};
	}
}
// Check that anchor elements have descriptive text
export function validateA(e: HTMLAnchorElement): Result | undefined {
	if (e.innerHTML.length === 0) {
		return {
			extended: true,
			message: messages.validateAMessage,
			severity: DiagnosticSeverity.Warning
		};
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
}

// Checks for sufficient color contrast between elements
export function validateContrast(e: Element, window: Window): Result | undefined {
	const style = window.getComputedStyle(e);
	const backgroundColor = style.getPropertyValue("background-color");
	const color = style.getPropertyValue("color");
	const MINIMUM_CONTRAST_RATIO = 4.5; // TODO: Move this into settings
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

// Validate that audio has captions and provides suggested captions if not
export function validateVideo(e: HTMLVideoElement): Result | undefined {
	// check if there are video captions

	
	// return clickable button that will generate captions

	return;
}

// Encourage use of a video tag with (1) audio as a source and (2) a track for captions
// https://www.iandevlin.com/blog/2015/12/html5/webvtt-and-audio/
export function validateAudio(e: HTMLAudioElement): Result {
	return {
		extended: true,
		message: messages.validateAudioMessage,
		severity: DiagnosticSeverity.Hint
	};
}

// Check that specified aria roles are valid
export function validateAriaRole(e: Element): Result | undefined {
	const role = e.attributes.getNamedItem("role");
	if (role && !roleNames.has(role.value)) {
		return {
			message: messages.validateAriaRoleMessage(role.value),
			severity: DiagnosticSeverity.Error
		};
	}
}

// Encourage the marking of dynamic regions as live
export function validateAriaLive(e: Element, document: Document): Result | undefined {
	const window = document.defaultView;
	const $ = require("jquery")(window);
	const events = $._data(e, "events");
	
	return;
}
