import express from "express";
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-routes/products-router";
const app = express();
const port = process.env.PORT || 3000

const parserMiddleWare = bodyParser({})
app.use(parserMiddleWare)

app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
