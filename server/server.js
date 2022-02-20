import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";
dotenv.config();

const app = express();
app.use(cookieParser("test secret"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/api/question", (req, res, next) => {
  const { id, category, question, answers } = randomQuestion();
  res.json({ id, category, question, answers });
});

app.post("/api/question", (req, res, next) => {
  const { id, answer } = req.body;
  const question = Questions.find((q) => q.id === id);
  if (!question) {
    return res.sendStatus(404);
  }
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  score.answers += 1;
  if (isCorrectAnswer(question, answer)) {
    score.correct += 1;
    res.cookie("score", JSON.stringify(score), { signed: true });
    res.json({ result: true });
  } else {
    res.cookie("score", JSON.stringify(score), { signed: true });
    res.json({ result: false });
  }
});

app.get("/api/score", (req, res, next) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  res.send(score);
});

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`started on http://localhost:${server.address().port}`);
});
