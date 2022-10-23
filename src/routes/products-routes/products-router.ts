import {Request, Response, Router} from "express";
import {body} from 'express-validator'
import {middlewares} from "../../middlewares/middlewares";
import {productServices} from "../../domain/product-services";

export const productsRouter = Router();

const titleValidation = body('title').trim().isLength({min: 3, max: 20}).withMessage('title should be 3 or 20 characters');

productsRouter.get('/', async (req: Request, res: Response) => {
  const filteredProductsByTitle = await productServices.getFindProductsByTitleInQueryParams(req.query.title?.toString())
  res.send(filteredProductsByTitle)
});

productsRouter.get('/:productTitle', async (req: Request, res: Response) => {
  const filteredProductsByTitle = await productServices.getFindProductsByTitleInParams(req.params.productTitle?.toString())
  res.send(filteredProductsByTitle)
});

productsRouter.delete('/:id', async (req: Request, res: Response) => {
  const isDeleteProduct = await productServices.deleteProducts(req.params.id)
  if(isDeleteProduct){
   const products = productServices.getFindProductsByTitleInQueryParams('')
    res.send(products)
  }else{
    res.send(404)
  }
});

productsRouter.post('/',
  titleValidation,
  middlewares.inputValidationMiddleWare,
  async (req: Request, res: Response) => {
  const newProducts = await productServices.createProducts(req.body.title)
  res.status(201).send(newProducts)
});

productsRouter.put('/:id',
  titleValidation,
  middlewares.inputValidationMiddleWare,
  async (req: Request, res: Response) => {
  const updateProducts = await productServices.updateProducts(req.params.id, req.body.title)
  res.send(updateProducts)
})