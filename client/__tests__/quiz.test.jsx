import * as React from "react";
import * as ReactDOM from "react-dom";
import { FrontPage } from "../FrontPage";
import { MemoryRouter } from "react-router-dom";

describe("Quiz Application", () => {
  it("show frontpage", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
      element
    );
    //expect(element.querySelector("h1").innerHTML).toContain("Quiz 2 !");
    expect(element.innerHTML).toMatchSnapshot();
  });
});
