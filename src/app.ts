import express from 'express';
import connectToMongo from "./services/db/connectToMongo";
import runMiddlewares from "./middleware";

const app = express();
const port = 3000;

runMiddlewares(app)

app.listen(port, () => {
return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});

connectToMongo().catch((err: Error) => {
    console.log(err.message)})