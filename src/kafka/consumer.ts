import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-db-sync",
  brokers: ["localhost:9092"],
});

export const consumer = kafka.consumer({ groupId: "translation-api-group" });
