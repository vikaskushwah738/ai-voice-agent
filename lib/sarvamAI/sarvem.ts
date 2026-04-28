// import { SarvamAIClient } from "sarvamai";

// const client = new SarvamAIClient({
//     apiSubscriptionKey: "YOUR_API_KEY"
// });

// const response = await client.text.translate({
//     input: "Hi, My Name is Vinayak.",
//     source_language_code: "auto",
//     target_language_code: "gu-IN",
//     speaker_gender: "Male"
// });

// console.log(response);



// import { SarvamAIClient } from "sarvamai";
// import fs from 'fs';

// const client = new SarvamAIClient({
//     apiSubscriptionKey: process.env.SARVAM_API_KEY
// });

// // Read your audio file
// const audioFile = fs.createReadStream("recording.wav");

// const response = await client.speechToText.transcribe({
//     file: audioFile,
//     model: "saaras:v3",
//     mode: "transcribe"  // or "translate", "verbatim", "translit", "codemix"
// });

// console.log(response);


// from sarvamai import SarvamAI

// client = SarvamAI(
//     api_subscription_key = "YOUR_SARVAM_API_KEY",
// )

// response = client.text_to_speech.convert(
//     text = "Hello, how are you?",
//     target_language_code = "hi-IN",
// )

// print(response)
