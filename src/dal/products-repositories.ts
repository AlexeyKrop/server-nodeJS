import {v1} from "uuid";

const products = [
  {id: v1(), title: 'tomato'}, {id: v1(), title: 'apple'}
]
export const productsRepositories = {
  getFindProductsByTitleInQueryParams(title: string | undefined) {
    if (title) {
      const searchStr = title.toString()
      return products.filter(product => product.title.indexOf(searchStr) > -1)
    }
    return products;
  },
  getFindProductsByTitleInParams(title: string | undefined) {
    const product = products.find((product) => product.title === title)
    if (product) {
      return product
    } else {
      return 404
    }
  },
  createProducts(title: string){
    const newProducts = {
      id: v1(),
      title: title
    }
    products.push(newProducts)
    return products
  }
}