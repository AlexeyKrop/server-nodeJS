import express, {Request, Response} from "express";

const app = express();
const port = process.env.PORT || 3001
const products = [
  {id: 1, title: 'tomato'}, {id: 2, title: 'apple'}
]

app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    const searchStr = req.query.title.toString()
    const product = products.filter(product => product.title.indexOf(searchStr) > -1)
    res.send(product)
  }
  res.send(products);
});
app.get('/products/:productTitle', (req: Request, res: Response) => {
  const product = products.find((product) => product.title === req.params.productTitle)
  if (product) {
    res.send(product);
  } else {
    res.send(404)
  }
});

app.delete('/products/:id', (req: Request, res: Response) => {
  const newProducts = products.filter(product => product.id !== +req.params.id)
  if(newProducts.length === products.length){
    res.send(404)
  }else{
    res.send(newProducts)
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
