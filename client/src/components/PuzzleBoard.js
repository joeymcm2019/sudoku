import React, { useState } from 'react';

import Square from './Square';

function Puzzleboard({filledSquares, puzzlePossibilities}){



// const fillBoard = () => {
//     if (filledSquares != ''){
//         var iterationArray = new Array(9).fill(0);
//         for (let i = 0; i < 9; i++){ //i is row.
//             iterationArray = filledSquares[i];
//             <div className='puzzleBoard' key={(i + 100)}>
//                 {iterationArray.map((value, j) => {  //j is col

//                     var isStarterPiece = (filledSquares[i][j] != -1);

//                     <Square key={i * 9 + j}
//                         number={filledSquares[i][j]}
//                         row={i + 1}
//                         col={j + 1}
//                         possiblities={puzzlePossibilities[i][j]}
//                         isStarterPiece={isStarterPiece}
//                     />;
//                 })}
//             </div>
//         }
//     }
// }

const iterationRow = new Array(9).fill(1); //use these simply for iteration
const iterationCol = new Array(9).fill(1);

    //console.log("puzzle board",filledSquares)

    return (
        <div>
        <div className='puzzleBoard'>
        <div className='square'>
        <p>why</p>
        </div>
        </div>
            {filledSquares.map((square, key) => {
               console.log("square",square);
                <div className='square' key={Math.floor(Math.random()*100+1)}>
                    <p>{square[0]}</p>
                </div>
            })}
        </div>
    );
}

export default Puzzleboard;



//puzzleHTML[i] = <div className='puzzleBoard' name="puzzleDiv" key={(i + 100)}>{puzzleArray[i]}</div>

// {filledSquares != '' && <div>
//                 {iterationRow.map((value, i) => {
//                     <div className='puzzleBoard' key={(i + 100)}>
//                         {iterationCol.map((value, j) => {
//                             console.log("hello?");
//                             var isStarterPiece = (filledSquares[i][j] != -1);
//                             <Square key={i * 9 + j}
//                                 number={filledSquares[i][j]}
//                                 row={i + 1}
//                                 col={j + 1}
//                                 possiblities={puzzlePossibilities[i][j]}
//                                 isStarterPiece={isStarterPiece} />
//                         })}
//                     </div>
//                 })}
//             </div>}