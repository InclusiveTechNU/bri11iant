/*! mutation.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { DOMWindow } from "jsdom";

export function setObserver(e: Element, callback: MutationCallback) {
    const mutationObserver = new MutationObserver(callback);
    mutationObserver.observe(e, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });
}
