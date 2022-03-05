import ReactDOM from "react-dom";
import React from "react";
import { BasicResponse } from "../BasicResponse";
import { MemoryRouter } from "react-router-dom";

describe("BasicresponsePage", () => {
  it("should show true answer page", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <BasicResponse response={true} />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show wrong answer page", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <BasicResponse response={false} />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
