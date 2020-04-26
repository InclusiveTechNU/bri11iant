/*! contrast.ts
* Adopted from https://github.com/tmcw/relative-luminance
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { JSDOM } from "jsdom";

// red, green, and blue coefficients
const rc = 0.2126;
const gc = 0.7152;
const bc = 0.0722;

// low-gamma adjust coefficient
const lowc = 1 / 12.92;

function adjustGamma(_: number): number {
    return Math.pow((_ + 0.055) / 1.055, 2.4);
}

function relativeLuminance(color: number[]): number {
    color = color.map(c => c / 255);
    const [r, g, b] = color.map(c => c <= 0.03928 ? c * lowc : adjustGamma(c));
    return r * rc + g * gc + b * bc;
}

function convertColor(color: string): number[] {
    color = color.trim();
    if (color.indexOf("rgb") == 0) {
        // Handle rgb(redValue, greenValue, blueValue) formatting
        color = color.substring(color.indexOf('(') + 1, color.indexOf(')'));
        const rgbColors = color.split(',', 3);
        return rgbColors.map(c => parseInt(c, 10));
    } else if (color.substring(0,1) == "#") {
        // Handle #RRGGBB formatting
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);
        return [r, g, b];
    } else {
        const DOM = new JSDOM();
        const placeholder = DOM.window.document.createElement("div");
        placeholder.style.color = color;
        DOM.window.document.body.appendChild(placeholder);
        const style = DOM.window.getComputedStyle(placeholder);
        const c = style.getPropertyValue("color");
        let rgb = c.substr(4).split(")")[0].split(","),
              r = (+rgb[0]).toString(16),
              g = (+rgb[1]).toString(16),
              b = (+rgb[2]).toString(16);
        return [
            parseInt(r, 16),
            parseInt(g, 16),
            parseInt(b, 16)
        ];
    }
}

export function contrast(c1: string, c2: string): number {
    const r1 = relativeLuminance(convertColor(c1));
    const r2 = relativeLuminance(convertColor(c2));

    if (r1 > r2) {
        return r1 / r2;
    } else {
        return r2 / r1;
    }
}
