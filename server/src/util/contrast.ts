/*! contrast.ts
* Adopted from https://github.com/tmcw/relative-luminance
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { Color } from "vscode-languageserver";

// red, green, and blue coefficients
const rc = 0.2126;
const gc = 0.7152;
const bc = 0.0722;

// low-gamma adjust coefficient
const lowc = 1 / 12.92;

function adjustGamma(_: number) {
    return Math.pow((_ + 0.055) / 1.055, 2.4);
}

function relativeLuminance(color: Color) {
    const rsrgb = color.red / 255;
    const gsrgb = color.green / 255;
    const bsrgb = color.blue / 255;

    const r = rsrgb <= 0.03928 ? rsrgb * lowc : adjustGamma(rsrgb);
    const g = gsrgb <= 0.03928 ? gsrgb * lowc : adjustGamma(gsrgb);
    const b = bsrgb <= 0.03928 ? bsrgb * lowc : adjustGamma(bsrgb);

    return r * rc + g * gc + b * bc;
}

export default function contrast(c1: Color, c2: Color) {
    const r1 = relativeLuminance(c1);
    const r2 = relativeLuminance(c2);

    if (r1 > r2) {
        return r1 / r2;
    } else {
        return r2 / r1;
    }
}