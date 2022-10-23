import {productsCollection} from "./db";


export const productsRepositories = {
  async getFindProductsByTitleInQueryParams(title: string | undefined) {
    const filter: any = {}
    if (title) {
      filter.title = {$regex: title}
    }
    return productsCollection.find(filter).toArray()

  },
  async getFindProductsByTitleInParams(title: string | undefined) {
    const product = await productsCollection.find({title: {$regex: title}})
    if (product) {
      return product
    } else {
      return 404
    }
  },
  async createProducts(newProducts: any) {
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