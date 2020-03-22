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