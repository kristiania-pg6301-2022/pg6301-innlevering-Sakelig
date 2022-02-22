import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJSON, postJSON } from "./http";

const Quiz = () => {
  const [question, setQuestion] = useState("");
  let [answer, setAnswer] = useState("");
  let id = question.id;

  const navigate = useNavigate();

  useEffect(async () => {
    setQuestion(await fetchJSON("/api/question"));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await postJSON("/api/question", { id, answer });

    if (data.result === true) {
      navigate("/answer/correct");
    } else {
      navigate("/answer/wrong");
    }
  }

  let test2 = "";

  if (question) {
    test2 = Object.keys(question.answers)
      .filter((x) => question.answers[x])
      .map((x) => (
        <div key={x}>
          <form onSubmit={handleSubmit}>
            <button
              name={"answer"}
              value={question.answers[x]}
              onClick={() => setAnswer(x)}
            >
              {question.answers[x]}
            </button>
          </form>
        </div>
      ));
  } else {
    test2 = "question is unidentified :c";
  }

  return (
    <div>
      <h1>Quiz</h1>
      <div>
        <h2>{question.question}</h2>
        <div>{test2}</div>
        {/*answer && isCorrectAnswer(question, answer) ? navigate("/answer/correct") : navigate("/answer/wrong")*/}
      </div>
    </div>
  );
};

export default Quiz;
