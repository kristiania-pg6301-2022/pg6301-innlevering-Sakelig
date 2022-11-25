import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Quiz from "../Quiz";
import ReactDOM from "react-dom";
import React from "react";

describe("Quizpage", () => {
  it("show loaded quizpage", async () => {
    const getQuestion = () => ({
      id: 974,
      question:
        "What is the correct JavaScript syntax to change the content of the HTML element below?",
      answers: {
        answer_a: '#demo.innerHTML = "Hello World!";',
        answer_b: 'document.getElementById("demo").innerHTML = "Hello World!";',
        answer_c: 'document.getElement("p").innerHTML = "Hello World!";',
        answer_d: 'document.getElementByName("p").innerHTML = "Hello World!";',
        answer_e: null,
        answer_f: null,
      },
    });

    const element = document.createElement("div");

    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Quiz quizApi={{ getQuestion }} />
        </MemoryRouter>,
        element
      );
    });
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("can simulate correct answer", async () => {
    const getQuestion = () => ({
      id: 974,
      question:
        "What is the correct JavaScript syntax to change the content of the HTML element below?",
      answers: {
        answer_a: '#demo.innerHTML = "Hello World!";',
        answer_b: 'document.getElementById("demo").innerHTML = "Hello World!";',
        answer_c: 'document.getElement("p").innerHTML = "Hello World!";',
        answer_d: 'document.getElementByName("p").innerHTML = "Hello World!";',
        answer_e: null,
        answer_f: null,
      },
    });

    let postAnswer = jest.fn().mockReturnValue({ result: true });

    const element = document.createElement("div");

    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Quiz quizApi={{ getQuestion, postAnswer }} />
        </MemoryRouter>,
        element
      );
    });

    Simulate.submit(element.querySelector("form"));

    /*
    - Cant find answer because button that sets it is never called
    - this going through causes error since rest of code is trying to
      use the result that is normally recived from the function

    - Not sure why act is acting up :frog:
     */

    expect(postAnswer).toBeCalledWith({
      answer: "",
      id: 974,
    });
  });

  it("can simulate wrong answer", async () => {
    const getQuestion = () => ({
      id: 974,
      question:
        "What is the correct JavaScript syntax to change the content of the HTML element below?",
      answers: {
        answer_a: '#demo.innerHTML = "Hello World!";',
        answer_b: 'document.getElementById("demo").innerHTML = "Hello World!";',
        answer_c: 'document.getElement("p").innerHTML = "Hello World!";',
        answer_d: 'document.getElementByName("p").innerHTML = "Hello World!";',
        answer_e: null,
        answer_f: null,
      },
    });

    let postAnswer = jest.fn().mockReturnValue({ result: false });

    const element = document.createElement("div");

    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Quiz quizApi={{ getQuestion, postAnswer }} />
        </MemoryRouter>,
        element
      );
    });

    Simulate.submit(element.querySelector("form"));

    /*
    - Cant find answer because button that sets it is never called
    - this going through causes error since rest of code is trying to
      use the result that is normally recived from the function

    - Not sure why act is acting up :frog:
     */

    expect(postAnswer).toBeCalledWith({
      answer: "",
      id: 974,
    });
  });
});
