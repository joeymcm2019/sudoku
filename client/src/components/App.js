import React, { useState } from 'react';
import Header from "./Header";
import Sudoku from "./Sudoku";

function App(){

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Sudoku />
            </div>
        </div>
    )
}

export default App;