import {productsRepositories} from "../dal/products-repositories";
import {v1} from "uuid";

export const productServices = {
  async getFindProductsByTitleInQueryParams(title: string | undefined) {
    return productsRepositories.getFindProductsByTitleInQueryParams(title)
  },
  async getFindProductsByTitleInParams(title: string | undefined) {
    return productsRepositories.getFindProductsByTitleInParams(title)
  },
  async createProducts(title: string) {
    const newProducts = {
      id: v1(),
      title: title
    }
    return await productsRepositories.createProducts(newProducts)
  },
  async updateProducts(id: string, title: string) {
    return productsRepositories.updateProducts(id, title)
  },
  async deleteProducts(id: string) {
    return productsRepositories.deleteProducts(id)
  }
}