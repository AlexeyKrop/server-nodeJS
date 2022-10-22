import express from "express";
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-routes/products-router";
import {runDb} from "./dal/db";
const app = express();
const port = process.env.PORT || 3000

const parserMiddleWare = bodyParser({})
app.use(parserMiddleWare)

app.use('/products', productsRouter)

const startApp = async () => {
  await runDb()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
startApp()

