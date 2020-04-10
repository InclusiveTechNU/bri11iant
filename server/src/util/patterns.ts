/*! patterns.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

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
