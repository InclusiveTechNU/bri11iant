/*! html.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

export interface IndexRange {
    start: number;
    end: number;
}

export function getNthIndexOfTag(tagName: string, index: number, source: string): IndexRange {
    // Get nth start position
    const tagQuery = `<${tagName}`;
    let currentIndex = 1;
    let indexStart = source.indexOf(tagQuery);
    while (currentIndex <= index) {
        indexStart = source.indexOf(tagQuery, indexStart+1);
        currentIndex++;
    }

    // Increase end index until non quoted > character is found
    let indexEnd = indexStart+1;
    let insideDoubleQuotes = false;
    let insideSingleQuotes = false;
    const isEndBracket = () => {
        if (source[indexEnd] === ">") {
            return !insideSingleQuotes && !insideDoubleQuotes;
        }
        return false;
    }
    while (!isEndBracket()) {
        if (source[indexEnd] === "\"" && !insideSingleQuotes && !insideDoubleQuotes) {
            insideDoubleQuotes = true;
        } else if (source[indexEnd] === "\"" && !insideSingleQuotes && insideDoubleQuotes) {
            insideDoubleQuotes = false;
        } else if (source[indexEnd] === "'" && !insideSingleQuotes && !insideDoubleQuotes) {
            insideSingleQuotes = true;
        } else if (source[indexEnd] === "'" && insideSingleQuotes && !insideDoubleQuotes) {
            insideSingleQuotes = false;
        }
        indexEnd++;
    }

    return {
        start: indexStart,
        end: indexEnd+1
    };
}