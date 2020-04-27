import * as fs from "fs";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

// Generate captions using Bing Speech
export function generateCaptions(uri: string, lang:string="en-US") {
    return new Promise((resolve, reject) => {       
        const subscriptionKey = "90db25ce64444e529de54bdea1a18383"; // Temp key, expires soon
        if (!subscriptionKey) {
            reject("No subscription key found");
            return;
        }
        const serviceRegion = "westus";
        
        // create the push stream we need for the speech sdk.
        const pushStream = sdk.AudioInputStream.createPushStream();
        
        // open the file and push it to the push stream.
        fs.createReadStream(uri).on('data', function(arrayBuffer:ArrayBuffer) {
            pushStream.write(arrayBuffer.slice(0));
        }).on('end', function() {
            pushStream.close();
        });
        
        // we are done with the setup
        console.log("Now recognizing from file: " + uri);
        
        // now create the audio-config pointing to our stream and
        // the speech config specifying the language.
        const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
        const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        
        // setting the recognition language
        speechConfig.speechRecognitionLanguage = lang;
        
        // create the speech recognizer.
        let recognizer: sdk.SpeechRecognizer | undefined = new sdk.SpeechRecognizer(speechConfig, audioConfig);
        
        // start the recognizer and wait for a result.
        recognizer.recognizeOnceAsync(
            (result: any) => {
                if (recognizer) {
                    recognizer.close();
                    recognizer = undefined;
                }
                resolve(result);
            },
            (err: string) => {
                if (recognizer) {
                    recognizer.close();
                    recognizer = undefined;
                }
                reject(err);
            }
        );
    });
}