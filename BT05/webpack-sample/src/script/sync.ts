import mongoose from "mongoose";
import { esClient } from "../config/elastic.client";
import User from "../models/user.schema"; // ✅ import đúng model

const ES_INDEX = "users";

async function syncUsersToElasticsearch() {
  await mongoose.connect("mongodb://127.0.0.1:27017/user_db");

  const users = await User.find({});

  for (const user of users) {
    await esClient.index({
      index: ES_INDEX,
      id: user._id.toString(),
      document: {
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  await esClient.indices.refresh({ index: ES_INDEX });
  console.log("✅ Sync xong Mongo -> Elasticsearch");

  await mongoose.disconnect();
}

syncUsersToElasticsearch().catch((err) => {
  console.error("❌ Sync error:", err);
  mongoose.disconnect();
});
