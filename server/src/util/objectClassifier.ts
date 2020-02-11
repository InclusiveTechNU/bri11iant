/*! objectClassifier.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import {load} from '@tensorflow-models/coco-ssd';

export async function classifyObjects(): Promise<string[]> {
    let preds: string[] = [];
    let cocoModel = await load()
                          .catch(() => { return preds });
    //let cocoPreds = cocoModel?.detect();
    return preds;
};