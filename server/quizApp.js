import express from "express";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";

export const quizApp = express.Router();

quizApp.get("/question", (req, res, next) => {
  const { id, category, question, answers } = randomQuestion();
  res.json({ id, category, question, answers });
});

quizApp.post("/question", (req, res, next) => {
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

quizApp.get("/score", (req, res, next) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  res.send(score);
});
