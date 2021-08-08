import { google } from "@google-cloud/translate/build/protos/protos";
import { zipObject } from "lodash";
import { SUPPORTED_LANGUAGES } from "../enums/SUPPORTED_LANGUAGES";
import { translationClient } from "./client";

export const translateText = async (
  text: string,
  targetLanguageCode: string
): Promise<google.cloud.translation.v3.ITranslation[]> => {
  // Construct request
  const request = {
    parent: `projects/${process.env.PROJECT_ID}/locations/${process.env.PROJECT_LOCATION}`,
    contents: [text],
    mimeType: "text/plain", // mime types: text/plain, text/html
    sourceLanguageCode: "en",
    targetLanguageCode,
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  return response.translations!;
};

export const translateTextBulk = async (text: string) => {
  const tasks = SUPPORTED_LANGUAGES.map(
    async (lan) => await translateText(text, lan)
  );
  const results = (await Promise.all(tasks))
    .flat()
    .flatMap((t) => t.translatedText);
  return zipObject(SUPPORTED_LANGUAGES, results);
};
