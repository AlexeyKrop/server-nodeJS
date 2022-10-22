import {v1} from "uuid";
import {client} from "./db";

const productsCollection = client.db("shop").collection("products")
export const productsRepositories = {
  async getFindProductsByTitleInQueryParams(title: string | undefined) {
    if (title) {
      return productsCollection.find({title: {$regex: title}}).toArray()
    } else {
      return client.db("shop").collection("products").find({}).toArray();
    }

  },
  async getFindProductsByTitleInParams(title: string | undefined) {
    const product = await productsCollection.find({title: {$regex: title}})
    if (product) {
      return product
    } else {
      return 404
    }
  },
  async createProducts(title: string) {
    const newProducts = {
      id: v1(),
      title: title
    }
    const result = await productsCollection.insertOne(newProducts)
    return newProducts
  },
  async updateProducts(id: string, title: string) {
    const product = await productsCollection.updateOne({id}, {$set: title})
    return product.matchedCount === 1
  },
  async deleteProducts(id: string) {
    const result = await productsCollection.deleteOne({id})
    return result.deletedCount === 1
  }
}