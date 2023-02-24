import React from "react";
import ReactDOM from "react-dom";
//Import App
import App from "./components/App";
import './public/styles.css';
import { PuzzleProvider } from "./components/Puzzlecontext";


ReactDOM.render(
    <React.StrictMode>
        <PuzzleProvider>
            <App />
        </PuzzleProvider>
    </React.StrictMode>, 
    document.querySelector("#root"));
