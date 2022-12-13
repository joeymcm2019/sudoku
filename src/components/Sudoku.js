import React, { useEffect, useState } from 'react';
import Square from './Square';
import Minisquare from './Minisquare';
import {getRow, getCol, validOption, fillPossibilities} from "./functions";


const {easy, medium, hard, hardest} = {easy: 0, medium: 1, hard: 2,hardest: 3};
const difficulties = ["Easy", "Medium", "Hard", "Hardest"];
const puzzleSize = 9;




function Sudoku(){


    const [difficulty, setDifficulty] = useState(difficulties[hardest]);
    const [puzzleBoard, setPuzzleBoard] = useState([]);
    const [puzzleFilled, setPuzzleFilled] = useState(false);
    const [puzzleArray, setPuzzleArray] = useState([]); //for running calculations on puzzle;
    const [puzzlePossibilities, setPuzzlePossibilities] = useState([]);

    useEffect(() => {
        const n = puzzleSize;
        let puzzlePieces = new Array(n);
        let puzzleHTML = new Array(n);
        for (let i = 0; i < 9; i++){
            puzzlePieces[i] = new Array(n);
            
            for (let j = 0; j < 9; j++){
                puzzlePieces[i][j] = <Square key={i*9+j} position={(i)*9+j+1} row={i+1} col={j+1}/>;
            }
            puzzleHTML[i] = <div className='puzzleBoard' name="puzzleDiv" key={(i+1)*100}>{puzzlePieces[i]}</div>;
        }
        setPuzzleBoard(puzzleHTML);

        let puzzleArrayTemp = new Array(n);
        for (let i = 0; i < 9; i++){
            puzzleArrayTemp[i] = new Array(n);
            for (let j = 0; j < 9; j++){
                puzzleArrayTemp[i][j] = -1; //initial value;
            }
        }
        setPuzzleArray(puzzleArrayTemp);
    }, []);

    useEffect(() => {
        if (puzzleBoard != "") {
            if (!puzzleFilled) {
                fillPuzzle();
            }
        }
    }, [puzzleBoard]);

    useEffect(() => {
        if (puzzleFilled){
            console.log("puzzle filled: " + puzzleFilled);
            solvePuzzle();
        }
    
    }, [puzzleFilled])

    const allNumbersTried = (numberTried) => {
        for (let i = 0; i < 9; i ++){
            if (numberTried[i] === 0){
                return false;
            } 
        }
        console.log("all numbers tried");
        return true;
    }

    

    //todo: make it so Math.random doesn't have to retry so many times. Only allow it to fill in valid values.
    //would have to map each random number to one of the valid options.
    const fillPuzzle = () => {
        var pieceTaken = new Array(81);
        for (let i = 0; i < 81; i++){
            pieceTaken[i] = 0;
        }
        for (let i = 0; i < 24; i++){            
        var randPieceNum = Math.floor(Math.random()*81+1); //finds random piece out of 81 pieces
        while (pieceTaken[randPieceNum]) {
            if (!pieceTaken[randPieceNum]) {
                pieceTaken[randPieceNum] = 1;
            } else {
                randPieceNum = Math.floor(Math.random() * 81 + 1);
                //console.log("changed");
            }
        }
        if (!pieceTaken[randPieceNum]) {
           // console.log("goodvalue: " + randPieceNum);
            pieceTaken[randPieceNum] = 1;
        }
        
        var numberTried = new Array(9).fill(0);
        //console.log(numberTried);
        var randNum = Math.floor(Math.random()*9+1);
        numberTried[randNum-1] = 1;
        var row = getRow(randPieceNum);
        var col = getCol(randPieceNum);
        var validPlacement = false;
        var triedAllNumbers = false;
        do {
            validPlacement = validOption(puzzleArray, row, col, randNum)
            if (validPlacement) {
                puzzleArray[row][col] = randNum;
            } else {
                randNum = Math.floor(Math.random()*9+1);
                do {
                    if (numberTried[randNum]){
                        randNum = Math.floor(Math.random()*9+1);
                        console.log(numberTried);
                        numberTried[randNum-1] = 1;
                        triedAllNumbers = allNumbersTried(numberTried);
                    } 
                } while (numberTried[randNum] && !triedAllNumbers);
            }
            console.log(triedAllNumbers);
        } while (!validPlacement && !triedAllNumbers);
        
        console.log(`i: ${i} randNum ${randNum} randIndex: ${randPieceNum}: ${row} ${col}`);
        var randPiece = document.getElementById(randPieceNum);
        console.log(randPiece);
        try {
            if (validPlacement){
            randPiece.innerHTML = randNum;
            randPiece.parentNode.setAttribute("style", "background-color: rgb(220, 220, 220);");
            }
        } catch (err){
            console.log(err);
        }
        
        }
        
        setPuzzleFilled(true);
    }

    // let puzzlePieces = new Array(n);
    // let puzzleHTML = new Array(n);
    // for (let i = 0; i < 9; i++){
    //     puzzlePieces[i] = new Array(n);
        
    //     for (let j = 0; j < 9; j++){
    //         puzzlePieces[i][j] = <Square key={i*9+j} position={(i)*9+j+1} row={i+1} col={j+1}/>;
    //     }
    //     puzzleHTML[i] = <div className='puzzleBoard' name="puzzleDiv" key={(i+1)*100}>{puzzlePieces[i]}</div>;
    // }

    const solvePuzzle = () => {
         var puzzlePossibilities = fillPossibilities(puzzleArray);
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                console.log(i,j);
                if (puzzlePossibilities[i][j] != undefined){
                    //console.log("check : ", puzzlePossibilities[i][j]);
                    var a = document.getElementById(i*9+j+1);
                    var squareHtml = new Array(3);
                    var miniSquares = new Array(3);
                    for (let m = 0; m < 3; m++){
                    squareHtml[m] = document.createElement("div");
                    squareHtml[m].setAttribute("class", "miniBoard")
                    for (let k = 0; k < 3; k++){
                        //<div className='miniSquare'></div>
                        miniSquares[k] = document.createElement('div');
                        var p = document.createElement('p');
                        if (puzzlePossibilities[i][j].includes(m*3+k+1)){
                            console.log("found possibility ",(3*m+k+1));
                            p.innerHTML = 3*m+k+1;
                        }
                        p.setAttribute("class", "mini");
                        miniSquares[k].appendChild(p);
                        miniSquares[k].setAttribute("class", "miniSquare");
                        squareHtml[m].appendChild(miniSquares[k]);
                    }
                    a.appendChild(squareHtml[m]);
                    }
                    console.log(a);
                }
            }
        }

        //var a = document.getElementById(-(i*9+j+1));
                    // var squareHtml = new Array(3);
                    // var miniSquares = new Array(3);
                    // for (let m = 0; m < 3; m++){
                    // for (let k = 0; k < 3; k++){
                    //     //<div className='miniSquare'></div>
                    //     miniSquares[k] = <div key={m*3+k} className='miniSquare'>
                    //         <p className='mini'>2</p>
                    //     </div>
                    // }
                    // squareHtml[m] = <div key={m} className='miniBoard'>{miniSquares}</div>
                    // //a.appendChild(squareHtml[m]);
                    // }
                    //var a = document.getElementById(-5);
                    
                    //setPuzzlePossibilities(squareHtml);
    }

    //console.log(hardest);
    return (
        <div>
        <h2 className='difficulty'>{difficulty === "Hardest" ? <>Difficulty: Hardest 🧠!</> : <>Difficulty: {difficulty}</>} </h2>
        {puzzleBoard}
        <div id={999}></div>
        </div>
    );
}

export default Sudoku;