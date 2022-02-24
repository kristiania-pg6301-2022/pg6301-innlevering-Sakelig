import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./Quiz";
import { FrontPage } from "./FrontPage";
import { ShowAnswer } from "./ShowAnswer";
import { fetchJSON, postJSON } from "./http";

export function QuizApplication() {
  const quizApi = {
    getScore: async () => await fetchJSON("/api/score"),
    getQuestion: async () => await fetchJSON("/api/question"),
    postAnswer: async ({ id, answer }) => {
      return postJSON("/api/question", { id, answer });
    },
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<FrontPage quizApi={quizApi} />} />
          <Route path={"/question"} element={<Quiz quizApi={quizApi} />} />
          <Route path={"/answer/*"} element={<ShowAnswer />} />
          <Route path={"*"} element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
