/*! objectClassifier.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */

import { load } from '@tensorflow-models/coco-ssd';
import * as pluralize from 'pluralize';

async function classifyObjects(e: HTMLImageElement): Promise<Map<string, number> | undefined> {
    let preds: Map<string, number> = new Map();
    const src = e.attributes.getNamedItem("src");
    if (src && src.value) { 
        const cocoModel = await load()
                                .catch(() => { return; });
        if (!cocoModel) { return; }
        
        const cocoPreds = await cocoModel?.detect(e)
                                          .catch(err => {
                                              // console.log(err);
                                              return null;
                                          });

        // Store predictions as map
        cocoPreds?.forEach((pred) => {
            const objectName: string = pred.class;
            const existingCount: number = preds.get(objectName) ?? 0;
            preds.set(objectName, existingCount + 1);
        });

        return preds;
    }
};

function getAltText(imageObjects: Map<string, number>): string {
    let sampleAltText = "";
    let imageObjectNames = imageObjects.keys();
    let index = 0;
    for (let objectName of imageObjectNames) {
        let extra = "";
        if (imageObjects.size !== 1) {
            if (imageObjects.size !== 2) {
                if (index !== imageObjects.size - 1) {
                    if (index !== imageObjects.size - 2) {
                        extra = ", ";
                    } else {
                        extra = ", and ";
                    }
                }
            } else {
                extra = " and ";
            }
        }

        const nameCount = imageObjects.get(objectName);
        const pluralName = pluralize(objectName, nameCount);
        sampleAltText += `${nameCount} ${pluralName}${extra}`;
        index++;
    }

    return sampleAltText;
}

export async function altText(e: HTMLImageElement): Promise<string | undefined> {
    const imageObjects = await classifyObjects(e);
    console.log(imageObjects?.size);
    if (imageObjects && imageObjects?.size > 0) {
        return getAltText(imageObjects);
    }
}