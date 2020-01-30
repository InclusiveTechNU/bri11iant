/*! patterns.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

// Match a tags
export const a = /<a(?:.)+?>/i;

// Match aria id
export const ariaId = /id=/i;

// Match empty aria id
export const ariaIdNonEmpty = /id="(.*?[a-z].*?)"/i;

// Match aria labels
export const ariaLabel = /aria-label=/i;

// Match empty aria labels
export const ariaLabelEmpty = /aria-label="(?:(?![a-z]*?)|\s|)"/i;

// Match aria-labelled-by
export const ariaLabelledBy = /aria-labelledby=/i;

// Match empty aria-labelled-by
export const ariaLabelledByEmpty = /aria-labelledby="(?:(?![a-z]*?)|\s|)"/i;

// Match the use of a WAI-ARIA role
export const ariaRole = /role=(?:.*?[a-z].*?)"/i;

// Match nondescriptive alt tag starts
export const altBadStart: RegExp = new RegExp([
	"alt=\"image of",
	"alt=\"picture of",
	"alt=\"logo of",
	"alt=\"icon of",
	"alt=\"graphic of",
	"alt=\"an image of",
	"alt=\"a picture of",
	"alt=\"a logo of",
	"alt=\"an icon of",
	"alt=\"a graphic of",
].join("|"), "i");

// Match nonnull alt tags
export const altExists = /alt="(?:.*?[a-z].*?)"/i;

// Match alt tags > 125 characters
export const altLong = /alt="(?:.*?[a-z].*.{125,}?)"/i;

// Match nondescriptive words in alt text
export const altNonDescriptive: RegExp = new RegExp([
	"alt=\"image\"",
	"alt=\"picture\"",
	"alt=\"logo\"",
	"alt=\"icon\"",
	"alt=\"graphic\"",
	"alt=\"an image\"",
	"alt=\"a picture\"",
	"alt=\"a logo\"",
	"alt=\"an icon\"",
	"alt=\"a graphic\"",
].join("|"), "i");

// Match null alt tags
export const altNull = /alt=""/i;

// Match non-empty head tag
export const headNonEmpty = /<head(?:|.+?)>/i;

// Match hidden input
export const inputHidden = /type="hidden"/i;

// Match language meta tag
export const language = /lang=(?:.*?[a-z].*?)"/i;

// Match maximum-scale meta info
export const metaMaxScale = /maximum-scale=1/i;

// Match user-scalable meta info
export const metaScalable = /user-scalable=yes/i;

// Match viewport info
export const metaViewport = /<meta(?:.+?)viewport(?:.+?)>/i;

// Match common html tags
export const globalPattern: RegExp = new RegExp([
	"<div(>|)(?:.)+?>",
	"<span(>|)(?:.)+?>",
	"<a (?:.)+?>(?:(?:\\s|\\S)+?(?=</a>))</a>",
	"<img (?:.)+?>",
	"<input (?:.)+?>",
	"<head (?:.|)+?>(?:(?:\\s|\\S|)+?(?=</head>))</head>",
	"<html(>|)(?:.)+?>",
	"tabindex=\"(?:.)+?\"",
	"<(?:i|)frame (?:.|)+?>"
].join("|"), "ig");

// Matches non-zero|-1 tabindex
export const tabIndexValid = /tabindex="(?:0|-1)"/i;

// Matches a tag
export const tag = /<(?:\s|\S)+?>/ig;

// Matches a tag without whitespace
export const tagNoWhitespace = /(?:\S+?)/ig;

// Match title start tag
export const title = /<title>/i;

// Match content inside title tags
export const titleContent = />(?:|\s+?)</i;

// Match full title expression
export const titleFull = /<title>(?:|.*?[a-z].*?|\s+?)<\/title>/i;

export const titleNonEmpty = /title="(?:.*?[a-z].*?)"/i;
