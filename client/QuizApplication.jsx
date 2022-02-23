import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./Quiz";
import { FrontPage } from "./FrontPage";
import { ShowAnswer } from "./ShowAnswer";
import { fetchJSON } from "./http";

export function QuizApplication() {
  const quizApi = {
    getScore: async () => await fetchJSON("/api/score"),
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<FrontPage quizApi={quizApi} />} />
          <Route path={"/question"} element={<Quiz />} />
          <Route path={"/answer/*"} element={<ShowAnswer />} />
          <Route path={"*"} element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
