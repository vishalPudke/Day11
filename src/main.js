import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); //Allowing everyone

async function addRecord(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("vishal");
  const messageColl = db.collection("message");
  let inputDoc = { message: req.query.message || "DEFAULT" };
  await messageColl.insertOne(inputDoc);

  await client.close();

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
async function loginHome(req, res) {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("vishal");
    const messageColl = db.collection("message");
    let query = { email: req.query.email, password: req.query.password };
    let userRef = await messageColl.findOne(query);
    await client.close();
    if (!userRef) {
      if (userRef.password != password) {
        throw new error(`Authentication Failure ${req.query.password}`);
      } else {
        throw new error(`Authentication Failure ${req.query.email}`);
      }
    } else {
      res.json(userRef);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function RegistrationRecord(req, res) {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("vishal");
    const messageColl = db.collection("message");

    let inputDoc = {
      username: req.query.username,
      password: req.query.password,
      email: req.query.email,
      mobile: req.query.mobile,
    };
    await messageColl.insertOne(inputDoc);

    await client.close();

    res.json({ opr: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function UserData(req, res) {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("vishal");
    const messageColl = db.collection("message");

    let list = await messageColl.find().toArray();

    await client.close();
    res.json(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//https://localhost:4000/addRecord
app.get("/addRecord", addRecord);
app.get("/findAll", findAllMessage);
app.get("/login", loginHome);
app.get("/RegistrationRecord", RegistrationRecord);
app.get("/UserData", UserData);

app.listen(4000);
