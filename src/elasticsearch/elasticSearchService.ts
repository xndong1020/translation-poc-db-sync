import { ApiResponse } from "@elastic/elasticsearch";
import { esClient } from "./esClient";

interface ITranslateProps {
  keyName: string;
  description: string;
  translation: ITranslation;
}

interface ITranslation {
  en: string;
  fr: string;
  zh: string;
  es: string;
  po: string;
  ko: string;
  ar: string;
}

export const indexRecord = async (
  payload: ITranslateProps
): Promise<ApiResponse<Record<string, any>, unknown>> => {
  const result = await esClient.index({
    index: "translation_data",
    body: payload,
  });

  return result;
};

export const checkExistingKeyName = async (keyName: string) => {
  const query = {
    match: {
      "keyName.keyword": keyName,
    },
  };

  const { body } = await esClient.search({
    index: "translation_data",
    body: {
      query,
    },
  });
  const {
    hits: { hits, max_score, total },
  } = body;
  return hits.map((item) => item._source);
};

export const indexRecordsBulk = async (
  dataset: ITranslateProps[]
): Promise<ApiResponse<Record<string, any>, unknown>> => {
  const body = dataset.flatMap((doc) => [
    { index: { _index: "translation_data" } },
    doc,
  ]);
  console.log("indexRecordsBulk body", body);
  const results = await esClient.bulk({
    index: "translation_data",
    body,
  });
  console.log("indexRecordsBulk results", results);
  return results;
};
