import { MongoClient } from "mongodb";
import express from "express";

const app = express();

async function main() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("vishal");
  const messageColl = db.collection("message");
  let inputDoc = { message: "thank you God from vishal" };
  await messageColl.insertOne(inputDoc);

  await client.close();
  console.log("RecordAdded");
}
app.get("/main", main);

main();
app.listen(5000);
