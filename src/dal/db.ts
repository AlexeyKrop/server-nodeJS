import {MongoClient} from "mongodb";

const uri = process.env.URI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(uri);
export const db = client.db("shop")
export const productsCollection = db.collection("products")
export async function runDb() {
  try {
    await client.connect();
    await client.db("products").command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch {
    await client.close();
  }
}