import {Request, Response, Router} from "express";
import {productsRepositories} from "../../dal/products-repositories";


export const productsRouter = Router();

productsRouter.get('/', (req: Request, res: Response) => {
  const filteredProductsByTitle = productsRepositories.getFindProductsByTitleInQueryParams(req.query.title?.toString())
  res.send(filteredProductsByTitle)
});

productsRouter.get('/:productTitle', (req: Request, res: Response) => {
  const filteredProductsByTitle = productsRepositories.getFindProductsByTitleInParams(req.params.productTitle?.toString())
  res.send(filteredProductsByTitle)
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
  const isDeleteProduct = productsRepositories.deleteProducts(req.params.id)
  if(isDeleteProduct){
   const products = productsRepositories.getFindProductsByTitleInQueryParams('')
    res.send(products)
  }else{
    res.send(404)
  }
});

productsRouter.post('/', (req: Request, res: Response) => {
  const newProducts = productsRepositories.createProducts(req.body.title)
  res.json(201).send(newProducts)
});

productsRouter.put('/:id', (req: Request, res: Response) => {
  const updateProducts = productsRepositories.updateProducts(req.params.id, req.body.title)
  res.send(updateProducts)
})