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
  },
  updateProducts(id: string, title: string){
    const product = products.find(product => product.id === id)
    if (product) {
      product.title = title
      return product
    } else {
      return 404
    }
  },
  deleteProducts(id: string){
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1)
        return true
      }
    }
    return false
  }
}