/*! objectClassifier.ts
* Copyright (c) 2020 Northwestern University Inclusive Technology Lab */
import * as tf from '@tensorflow/tfjs';
import { load } from '@tensorflow-models/coco-ssd';
import { Image } from "image-js";

export async function classifyObjects(e: HTMLImageElement): Promise<Map<string, number>> {
    console.log(e.src);
    let preds: Map<string, number> = new Map();
    const image = await Image.load("/Users/tommymchugh/Desktop/apple.jpg");
    const imageData = {data: image.data, width: image.width, height: image.height};

    // Determine potential objects in image element
    const cocoModel = await load()
                            .catch(() => {
                                throw "Failed to load coco model";
                            });
    const cocoPreds = await cocoModel?.detect(imageData)
                                      .catch((err) => {
                                        return null;
                                      });

    // Store predictions as map
    cocoPreds?.forEach((pred) => {
        const objectName: string = pred.class;
        const existingCount: number = preds.get(objectName) ?? 0;
        preds.set(objectName, existingCount+1);
    });
    return preds;
};