import { useLoader } from "./useLoader";
import { fetchJSON } from "./http";
import { Link } from "react-router-dom";
import * as React from "react";

export function FrontPage() {
  const {
    data: score,
    loading,
    reload,
  } = useLoader(async () => fetchJSON("/api/score"));

  return (
    <div>
      <h1>Quiz !</h1>
      {loading && <div>Loading ...</div>}
      {score && (
        <h3>
          You have answered {score.correct} of {score.answers} correctly so far!
        </h3>
      )}

      <ul>
        <li>
          <Link to={"/question"}>ny quiz</Link>
        </li>
      </ul>
    </div>
  );
}
