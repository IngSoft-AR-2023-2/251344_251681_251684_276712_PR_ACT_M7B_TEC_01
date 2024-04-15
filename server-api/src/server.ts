import express, { Express, Request, Response } from "express";
import { processWords } from "./pipes-and-filters/main";

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.post("/words", (req: Request, res: Response) => {
  console.log("Received data:", req.body);

  const words = req.body.words as string[];

  if (words.length === 0 || words.some((word) => !word)) {
    return res.status(400).send({ message: "Words are required" });
  }

  res
    .status(200)
    .send({ message: "Words recieved successfully", word: req.body.word });

  processWords(req.body.words);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
