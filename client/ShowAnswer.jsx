import { Route, Routes } from "react-router-dom";
import * as React from "react";
import { BasicResponse } from "./BasicResponse";

export function ShowAnswer() {
  return (
    <div>
      <Routes>
        <Route path={"correct"} element={<BasicResponse response={true} />} />
        <Route path={"wrong"} element={<BasicResponse response={false} />} />
      </Routes>
    </div>
  );
}
