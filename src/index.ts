import express, { Request, Response } from "express";
const app = express();
const port = 3001
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
