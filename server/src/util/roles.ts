/*! roles.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

const specialRoles = new Set([
    "any",
    "none"
]);

export class Role {

    name: string
    url: string | null

    constructor(name: string) {
        this.name = name;
        this.url = specialRoles.has(name)? `https://www.w3.org/TR/wai-aria-1.1/#${name}` : null;
    }

}

const ariaRoles = [
    "any",
    "alert",
    "alertdialog",
    "application",
    "article",
    "banner",
    "button",
    "checkbox",
    "cell",
    "columnheader",
    "combobox",
    "complementary",
    "contentinfo",
    "definition",
    "dialog",
    "directory",
    "document",
    "feed",
    "figure",
    "form",
    "grid",
    "gridcell",
    "group",
    "heading",
    "img",
    "link",
    "list",
    "listbox",
    "listitem",
    "log",
    "main",
    "marquee",
    "math",
    "menu",
    "menubar",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "navigation",
    "none",
    "note",
    "option",
    "presentation",
    "progressbar",
    "radio",
    "radiogroup",
    "region",
    "row",
    "rowgroup",
    "rowheader",
    "scrollbar",
    "search",
    "searchbox",
    "separator",
    "slider",
    "spinbutton",
    "status",
    "switch",
    "tab",
    "table",
    "tablist",
    "tabpanel",
    "term",
    "textbox",
    "timer",
    "toolbar",
    "tooltip",
    "tree",
    "treegrid",
    "treeitem"
];

export const roleNames = new Set(ariaRoles);
export const roles = new Set(ariaRoles.map(e => new Role(e)));

// Valid role names found at https://www.w3.org/TR/html-aria/

export const validARoleNames = new Set([
    "button",
    "checkbox",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "switch",
    "tab",
    "treeitem"
]);

export const validArticleRoleNames = new Set([
    "application",
    "document",
    "feed",
    "main",
    "none",
    "presentation",
    "region"
]);

export const validAsideRoleNames = new Set([
    "feed",
    "none",
    "note",
    "presentation",
    "region",
    "search"
]);

export const validAudioRoleNames = new Set([
    "application"
]);

export const validBRRoleNames = new Set([
    "presentation",
    "none"
]);

export const validButtonRoleNames = new Set([
    "checkbox",
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "switch",
    "tab"
]);

export const validDialogRoleNames = new Set([
    "alertdialog"
]);

export const validDLRoleNames = new Set([
    "group",
    "list",
    "none",
    "presentation"
]);

export const validDTRoleNames = new Set([
    "listitem"
]);

export const validEmbedRoleNames = new Set([
    "application",
    "document",
    "img",
    "none",
    "presentation"
]);

export const validFieldSetRoleNames = new Set([
    "none",
    "presentation",
    "radiogroup"
]);

export const validFigCaptionRoleNames = new Set([
    "group",
    "none",
    "presentation"
]);

export const validFooterRoleNames = new Set([
    "group",
    "none",
    "presentation"
]);

export const validFormRoleNames = new Set([
    "none",
    "presentation",
    "search"
]);

export const validHeaderRoleNames = new Set([
    "none",
    "presentation",
    "tab"
]);

export const validHRRoleNames = new Set([
    "none",
    "presentation"
]);

export const validIFrameRoleNames = new Set([
    "application",
    "document",
    "img",
    "none",
    "presentation"
]);

export const validImgEmptyAltRoleNames = new Set([
    "none",
    "presentation"
]);

export const validImgWithAltRoleNames = new Set([
    "button",
    "checkbox",
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "progressbar",
    "scrollbar",
    "separator",
    "slider",
    "switch",
    "tab",
    "treeitem"
]);

export const inputTypesWithoutRoles = new Set([
    "color",
    "date",
    "datetime-local",
    "email",
    "file",
    "month",
    "number",
    "password",
    "range",
    "reset",
    "search",
    "submit",
    "tel",
    "time",
    "url",
    "week"
]);

export const validInputButtonRoleNames = new Set([
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "switch",
    "tab"
]);

export const validInputCheckboxRoleNames = new Set([
    "button",
    "menuitemcheckbox",
    "option",
    "switch"
]);

export const validInputImageRoleNames = new Set([
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "radio",
    "switch"
]);

export const validInputRadioRoleNames = new Set([
    "menuitemradio"
]);

export const validInputTextRoleNames = new Set([
    "combobox",
    "searchbox",
    "spinbutton"
]);

export const validLIRoleNames = new Set([
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "none",
    "option",
    "presentation",
    "radio",
    "separator",
    "tab",
    "treeitem"
]);
