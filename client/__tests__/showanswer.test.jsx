import React from "react";
import ReactDOM from "react-dom";
import { ShowAnswer } from "../ShowAnswer";
import { BasicResponse } from "../BasicResponse";
import { MemoryRouter } from "react-router-dom";

describe("ShowAnswer", () => {
  it("should route to correct basicResponse Route", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["correct"]}>
        <ShowAnswer />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toContain("wow");
  });
});
