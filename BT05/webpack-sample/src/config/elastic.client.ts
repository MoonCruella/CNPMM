import { Client } from "@elastic/elasticsearch";

export const esClient = new Client({
  node: "http://localhost:9200", // Elasticsearch server
});
export const ES_INDEX = "users";
