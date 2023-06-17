import { MongoClient } from "mongodb";
import express from "express";
import cors from cors;

const app = express();
app.use(cors());

async function addRecord(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("vishal");
  const messageColl = db.collection("message");
  let inputDoc = { message: req.query.message || "DEFAULT" };
  await messageColl.insertOne(inputDoc);

  await client.close();
  //   console.log("RecordAdded");
  {
    /**String response */
  }
  //   res.send("Record Added");

  //{/**JSON RESPONSE */}
  res.json({ opr: "success" });
}

async function findAllMessage(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("vishal");
  const messageColl = db.collection("message");

  let list = await messageColl.find().toArray();

  await client.close();
  res.json(list);
}
//https://localhost:4000/addRecord
app.get("/addRecord", addRecord);
app.get("/findAll", findAllMessage);

app.listen(4000);
