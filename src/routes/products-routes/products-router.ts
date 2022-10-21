import {Request, Response, Router} from "express";
import {v1} from "uuid";

const products = [
  {id: v1(), title: 'tomato'}, {id: v1(), title: 'apple'}
]


export const productsRouter = Router();
productsRouter.get('/', (req: Request, res: Response) => {
  if (req.query.title) {
    const searchStr = req.query.title.toString()
    const product = products.filter(product => product.title.indexOf(searchStr) > -1)
    res.send(product)
  }
  res.send(products);
});
productsRouter.get('/:productTitle', (req: Request, res: Response) => {
  const product = products.find((product) => product.title === req.params.productTitle)
  if (product) {
    res.send(product);
  } else {
    res.send(404)
  }
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      products.splice(i, 1)
      res.send(204)
      return
    }
  }
  res.send(404)
});

productsRouter.post('/', (req: Request, res: Response) => {
  const newProducts = {
    id: v1(),
    title: req.body.title
  }
  products.push(newProducts)
  res.json(201).send(newProducts)
});

productsRouter.put('/:id', (req: Request, res: Response) => {
  const product = products.find(product => product.id === req.params.id)
  if (product) {
    product.title = req.body.title
    res.send(product)
  } else {
    res.send(404)
  }

})