import { v3 } from "@google-cloud/translate";

export const translationClient = new v3.TranslationServiceClient({
  projectId: process.env.PROJECT_ID,
});
