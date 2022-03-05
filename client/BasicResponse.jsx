import { Link } from "react-router-dom";
import * as React from "react";

export function BasicResponse({ response }) {
  return (
    <div>
      {response ? <h1>Det var rikitg!</h1> : <h1>Det var feil!</h1>}
      <Link to={"/question"}> nytt spørmål</Link>
      <br />
      <Link to={"/"}> back home</Link>
    </div>
  );
}
