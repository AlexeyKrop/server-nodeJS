import {MongoClient} from "mongodb";

const uri = process.env.URI || "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
export async function runDb() {
  try {
    await client.connect();
    await client.db("products").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    await client.close();
  }
}