import { MongoClient } from "mongodb";

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

main();