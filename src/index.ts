import express, {Request, Response} from "express";

const app = express();
const port = process.env.PORT || 3001
const products = [
  {title: 'tomato'}, {title: 'apple'}
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
