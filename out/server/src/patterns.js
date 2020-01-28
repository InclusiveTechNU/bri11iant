"use strict";
/*! patterns.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */
Object.defineProperty(exports, "__esModule", { value: true });
// Match the use of a WAI-ARIA role
exports.ariaRole = /role=(?:.*?[a-z].*?)"/i;
// Match nondescriptive alt tag starts
exports.altBadStart = new RegExp([
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
exports.altExists = /alt="(?:.*?[a-z].*?)"/i;
// Match alt tags > 125 characters
exports.altLong = /alt="(?:.*?[a-z].*.{125,}?)"/i;
// Match nondescriptive words in alt text
exports.altNonDescriptive = new RegExp([
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
exports.altNull = /alt=""/i;
// Match non-empty head tag
exports.headNonEmpty = /<head(?:|.+?)>/i;
// Match hidden input
exports.inputHidden = /type="hidden"/i;
// Match language meta tag
exports.language = /lang=(?:.*?[a-z].*?)"/i;
// Match maximum-scale meta info
exports.metaMaxScale = /maximum-scale=1/i;
// Match user-scalable meta info
exports.metaScalable = /user-scalable=yes/i;
// Match viewport info
exports.metaViewport = /<meta(?:.+?)viewport(?:.+?)>/i;
// Match common html tags
exports.pattern = new RegExp([
    "<div(>|)(?:.)+?>",
    "<span(>|)(?:.)+?>",
    // "id=\"(?:.)+?\"",
    "<a (?:.)+?>(?:(?:\\s|\\S)+?(?=</a>))</a>",
    "<img (?:.)+?>",
    "<input (?:.)+?>",
    "<head (?:.|)+?>(?:(?:\\s|\\S|)+?(?=</head>))</head>",
    "<html(>|)(?:.)+?>",
    "tabindex=\"(?:.)+?\"",
    "<(?:i|)frame (?:.|)+?>"
].join("|"), "ig");
// Match title start tag
exports.title = /<title>/i;
// Match content inside title tags
exports.titleContent = />(?:|\s+?)</i;
// Match full title expression
exports.titleFull = /<title>(?:|.*?[a-z].*?|\s+?)<\/title>/i;
//# sourceMappingURL=patterns.js.map