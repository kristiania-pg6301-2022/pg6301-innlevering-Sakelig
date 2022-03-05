import * as React from "react";
import * as ReactDOM from "react-dom";
import { FrontPage } from "../FrontPage";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe("Frontpage", () => {
  it("show unloaded frontpage", () => {
    const getScore = () => new Promise((resolve) => {});

    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage quizApi={{ getScore }} />
      </MemoryRouter>,
      element
    );

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("show loaded frontpage", async () => {
    const getScore = () => ({
      answers: 3,
      correct: 2,
    });

    const element = document.createElement("div");

    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <FrontPage quizApi={{ getScore }} />
        </MemoryRouter>,
        element
      );
    });
    expect(element.innerHTML).toMatchSnapshot();
    expect(element.querySelector("h3").textContent).toContain("2");
  });

  it("show get error frontpage", async () => {
    const getScore = () => {
      throw new Error("Failed to load");
    };

    const element = document.createElement("div");

    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <FrontPage quizApi={{ getScore }} />
        </MemoryRouter>,
        element
      );
    });
    expect(element.querySelector("div").textContent).toContain(
      "Something went wrong D:"
    );
  });
});
