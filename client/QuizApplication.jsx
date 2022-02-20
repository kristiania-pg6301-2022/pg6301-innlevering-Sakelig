import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Quiz from "./Quiz";
import {FrontPage} from "./FrontPage";
import {ShowAnswer} from "./ShowAnswer";


export function QuizApplication() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={"/"}
                        element={
                            <FrontPage

                            />
                        }
                    />
                    <Route
                        path={"/question"}
                        element={
                            <Quiz

                            />
                        }
                    />
                    <Route path={"/answer/*"} element={<ShowAnswer />} />
                    <Route path={"*"} element={<h1>Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
