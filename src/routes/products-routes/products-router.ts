import {Request, Response, Router} from "express";
import {productsRepositories} from "../../dal/products-repositories";
import {body} from 'express-validator'
import {middlewares} from "../../middlewares/middlewares";

export const productsRouter = Router();

const titleValidation = body('title').trim().isLength({min: 3, max: 20}).withMessage('title should be 3 or 20 characters');

productsRouter.get('/', async (req: Request, res: Response) => {
  const filteredProductsByTitle = await productsRepositories.getFindProductsByTitleInQueryParams(req.query.title?.toString())
  res.send(filteredProductsByTitle)
});

productsRouter.get('/:productTitle', async (req: Request, res: Response) => {
  const filteredProductsByTitle = await productsRepositories.getFindProductsByTitleInParams(req.params.productTitle?.toString())
  res.send(filteredProductsByTitle)
});

productsRouter.delete('/:id', async (req: Request, res: Response) => {
  const isDeleteProduct = await productsRepositories.deleteProducts(req.params.id)
  if(isDeleteProduct){
   const products = productsRepositories.getFindProductsByTitleInQueryParams('')
    res.send(products)
  }else{
    res.send(404)
  }
});

productsRouter.post('/',
  titleValidation,
  middlewares.inputValidationMiddleWare,
  async (req: Request, res: Response) => {
  const newProducts = await productsRepositories.createProducts(req.body.title)
  res.status(201).send(newProducts)
});

productsRouter.put('/:id',
  titleValidation,
  middlewares.inputValidationMiddleWare,
  async (req: Request, res: Response) => {
  const updateProducts = await productsRepositories.updateProducts(req.params.id, req.body.title)
  res.send(updateProducts)
})