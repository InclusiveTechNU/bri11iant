/*! validate.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import {
    altExists,
    altLong,
    altNonDescriptive,
    altNull,
    ariaRole,
    altBadStart,
    headNonEmpty,
    metaMaxScale,
    metaScalable,
    metaViewport,
    title
} from './patterns';

// import {
// 	createConnection,
// 	ProposedFeatures
// } from 'vscode-languageserver';

// connection is used for debuging > connection.console.log();
// let connection = createConnection(ProposedFeatures.all);

// Check that divs use WAI-ARIA roles
export async function validateDiv(m: RegExpExecArray) {
	if (!ariaRole.test(m[0])) {
		return {
			meta: m,
			mess: 'Use Semantic HTML5 or specify a WAI-ARIA role [role=""]',
			severity: 3
		};
	}
}

/* Not actually sure what standard this is checking
export async function validateSpan(m: RegExpExecArray) {
	if (ariaRole.test(m[0])) {
		if (/<span(?:.+?)(?:button|btn)(?:.+?)>/.test(m[0])) {
			return {
				meta: m,
				mess: 'Change the span to a <button>',
				severity: 3
			};
		} else {
			return {
				meta: m,
				mess: 'Provide a WAI-ARIA role [role=""]',
				severity: 2
			};
		}
	}
} */

export async function validateA(m: RegExpExecArray) {
	let aRegEx: RegExpExecArray;
    let oldRegEx: RegExpExecArray = m;

    // Matches any whitespace or non-whitespace in between brackets
	let filteredString = m[0].replace(/<(?:\s|\S)+?>/ig, "");
		if (!/(?:\S+?)/ig.test(filteredString)) {
			aRegEx = /<a(?:.)+?>/i.exec(oldRegEx[0]);
			aRegEx.index = oldRegEx.index;
			return {
				meta: aRegEx,
				mess: 'Provide a descriptive text in between the tags',
				severity: 2
			};
		}
}

// Checkes that img tags meet standards
export async function validateImg(m: RegExpExecArray) {
	if ((!altExists.test(m[0])) && (!altNull.test(m[0]))) {
		return {
			meta: m,
			mess: 'Provide an alt text that describes the image, or alt="" if image is purely decorative',
			severity: 1
		};
	}
	if (altNonDescriptive.test(m[0])) {
		return {
			meta: m,
			mess: 'Alt attribute must be specifically descriptive',
			severity: 3
		};
	}
	if (altBadStart.test(m[0])) {
		return {
			meta: m,
			mess: 'Alt text should not begin with "image of" or similar phrasing',
			severity: 3
		};
	}
	if ((altLong.test(m[0]))) {
		return {
			meta: m,
			mess: 'Alt text is too long - most screen readers cut off at 125 characters',
			severity: 1
		};
	}
}

export async function validateMeta(m: RegExpExecArray) {
	let metaRegEx: RegExpExecArray;
	let oldRegEx: RegExpExecArray = m;
	if ((metaRegEx = metaViewport.exec(oldRegEx[0]))) {
		metaRegEx.index = oldRegEx.index + metaRegEx.index;
		if (!metaScalable.test(metaRegEx[0])) {
			return {
				meta: metaRegEx,
				mess: 'Enable pinching to zoom [user-scalable=yes]',
				severity: 3
			};
		}
		if (metaMaxScale.test(metaRegEx[0])) {
			return {
				meta: metaRegEx,
				mess: 'Avoid using [maximum-scale=1]',
				severity: 3
			};
		}
	}
}

// Checks that title tag follows standards
export async function validateTitle(m: RegExpExecArray) {
	let titleRegEx: RegExpExecArray;
	let oldRegEx: RegExpExecArray = m;
	if (!title.test(oldRegEx[0])) {
		titleRegEx = headNonEmpty.exec(oldRegEx[0]);
		titleRegEx.index = oldRegEx.index;
		return {
			meta: titleRegEx,
			mess: 'Provide a title within the <head> tags',
			severity: 1
		};
	} else {
		titleRegEx = /<title>(?:|.*?[a-z].*?|\s+?)<\/title>/i.exec(oldRegEx[0]);
		if (/>(?:|\s+?)</i.test(titleRegEx[0])) {
			titleRegEx.index = oldRegEx.index + titleRegEx.index;
			return {
				meta: titleRegEx,
				mess: 'Provide a text within the <title> tags',
				severity: 1
			};
		}
	}
}

export async function validateHtml(m: RegExpExecArray) {
	if (!/lang=(?:.*?[a-z].*?)"/i.test(m[0])) {
		return {
			meta: m,
			mess: 'Provide a language [lang=""]',
			severity: 2
		};
	}
}

export async function validateInput(m: RegExpExecArray) {
	switch (true) {
		case (/type="hidden"/i.test(m[0])):
			break;
		case (/aria-label=/i.test(m[0])):
			if (!/aria-label="(?:(?![a-z]*?)|\s|)"/i.test(m[0])){
				break;
			} else {
				return {
					meta: m,
					mess: 'Provide a text within the aria label [aria-label=""]',
					severity: 3
				};
			}
		case (/id=/i.test(m[0])):
			if (/id="(?:.*?[a-z].*?)"/i.test(m[0])){
					let idValue = /id="(.*?[a-z].*?)"/i.exec(m[0])[1];
					let pattern: RegExp = new RegExp('for="' + idValue + '"', 'i');
					if (pattern.test(m.input)) {
						break;
					} else {
						return {
							meta: m,
							mess: 'Provide an aria label [aria-label=""] or a <label for="">',
							severity: 2
						};
					}
				} else {
					return {
						meta: m,
						mess: 'Provide an aria label [aria-label=""]',
						severity: 2
					};
				}
		case (/aria-labelledby=/i.test(m[0])):
			if (!/aria-labelledby="(?:(?![a-z]*?)|\s|)"/i.test(m[0])) {
				// TODO: needs to check elements with the same value.
				break;
			} else {
				return {
					meta: m,
					mess: 'Provide an id within the aria labelledby [aria-labelledby=""]',
					severity: 1
				};
			}
		case (/role=/i.test(m[0])):
			// TODO: needs to check if <label> is surrounded.
			break;
		default:
			return {
				meta: m,
				mess: 'Provide an aria label [aria-label=""]',
				severity: 2
			};
	}
}

export async function validateTab(m: RegExpExecArray) {
	if (!/tabindex="(?:0|-1)"/i.test(m[0])) {
		return {
			meta: m,
			mess: 'A tabindex greater than 0 interferes with the focus order. Try restructuring the HTML',
			severity: 1
		};
	}
}

export async function validateFrame(m: RegExpExecArray) {
	if (!/title=(?:.*?[a-z].*?)"/i.test(m[0])) {
		return {
			meta: m,
			mess: 'Provide a title that describes the frame\'s content [title=""]',
			severity: 3
		};
	}
}

// export async function validateId(m: RegExpExecArray) {
// 	let connection = createConnection(ProposedFeatures.all);
// 	let idValue = /id="(.*?[a-z].*?)"/i.exec(m[0])[1]; 
// 	let pattern: RegExp = new RegExp(idValue, 'i');
// 	// connection.console.log(idValue);
// 	if (pattern.exec(m.input).length == 2) {
// 		return {
// 			meta: m,
// 			mess: 'Duplicated id'
// 		};
// 	}
// }