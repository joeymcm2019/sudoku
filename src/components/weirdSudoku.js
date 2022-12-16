import React, { useEffect, useState } from 'react';
import Square from './Square';
import {getRow, getCol, validOption, fillPossibilities} from "./puzzleFunctions2";
import { fill, set } from 'lodash';
import { use } from 'passport';


const {easy, medium, hard, hardest} = {easy: 0, medium: 1, hard: 2,hardest: 3};
const difficulties = ["Easy", "Medium", "Hard", "Hardest"];
const puzzleSize = 9;
const numberOptions = 9;
const errorChecks = false;

var calls = 0;


function WeirdSudoku(){




    const [difficulty, setDifficulty] = useState(difficulties[hardest]);

    const[puzzleStarted, setPuzzleStarted] = useState(false);

    //for running calculations on puzzle;
    //filled in spaces from puzzle
    const [numberArray, setNumberArray] = useState([]); 
    const [numberArrayFilled, setNumberArrayFilled] = useState(false);


    //puzzle react objects
    const [puzzleArray, setPuzzleArray] = useState([]); 

    //possibility grid
    const [puzzlePossibilities, setPuzzlePossibilities] = useState([]);
    const [puzzlePossibilitiesFilled, setPuzzlePossibilitiesFilled] = useState(false);
    //possibility html
   // const [possibilityHTML, setPossibilityHTML] = useState([]);

    //puzzle board html
    const [puzzleBoard, setPuzzleBoard] = useState([]);
    const [gridCreated, setGridCreated] = useState(false); 

    //testing variables
    const [testing, setTesting] = useState(true);
    const [tests, setTests] = useState(0);
  
    const [changingNumberArray, setChangingNumberArray] = useState(false);
    const [changingGridArray, setChangingGridArray] = useState(false);
    const [changedGridArray, setChangedGridArray] = useState(false);

    //testingMiniSquareComponent
    const [numberTest, setNumberTest] = useState(2);
   // const [runMiniTest, setRunMiniTest] = useState(false);
   // const [mininumbers, setminiNumbers] = useState([]);
   
    //initialize number array and puzzle possibilites
    useEffect(() => {
        const n = puzzleSize;
        let numberArrayTemp = new Array(n);
        let stringArray = new Array(n);
        for (let i = 0; i < n; i++) {
            numberArrayTemp[i] = new Array(n);
            stringArray[i] = new Array(n);
            for (let j = 0; j < n; j++) {
                numberArrayTemp[i][j] = -1;
                stringArray[i] = "";
            }
        }
        setPuzzlePossibilities(stringArray);
        setNumberArray(numberArrayTemp);
    }, []);

    //fill number array will puzzle numbers
    useEffect(() => {
        if (numberArray != '' && !numberArrayFilled) {
           //console.log("fillingpuzzle");
            fillPuzzle(true);
        } else {
            if (errorChecks) {
                console.log("changed number array: ", numberArray);
            }
        }
    }, [numberArray]);

    //todo: make it so Math.random doesn't have to retry so many times. Only allow it to fill in valid values.
    //would have to map each random number to one of the valid options.
    const fillPuzzle = (recursion) => {
        const n = puzzleSize;
        var minNumbersToFill = n*2;
        if (n === 9){
            minNumbersToFill = 35;
        }
        var pieceTaken = new Array(n*n);
        for (let i = 0; i < n*n; i++) {
            pieceTaken[i] = 0;
        }
        for (let i = 1; i < minNumbersToFill; i++) {
            var randPieceNum = Math.floor(Math.random()*n*n + 1); //finds random piece out of 81 pieces
            while (pieceTaken[randPieceNum]) {
                if (!pieceTaken[randPieceNum]) {
                    pieceTaken[randPieceNum] = 1;
                } else {
                    randPieceNum = Math.floor(Math.random()*n*n + 1);
                    //console.log("changed");
                }
            }
            if (!pieceTaken[randPieceNum]) {
                ////console.log("goodvalue: " + randPieceNum);
                pieceTaken[randPieceNum] = 1;
            }

            var numbersTried = new Array(numberOptions).fill(0);
            //console.log(numberTried);
            var randNum = Math.floor(Math.random() * numberOptions + 1);
            numbersTried[randNum - 1] = 1;
            var row = getRow(randPieceNum);
            var col = getCol(randPieceNum);
            if (true){
            console.log("fillSquares random: randomSquare: ", randPieceNum,  "row: ", row, " col: ", col);
            }
            var validPlacement = false;
            var triedAllNumbers = false;
            do {
                try { 
                    validPlacement = validOption(numberArray, row, col, randNum, recursion);
                    console.log("valid ?" ,validPlacement);
                } catch (error){
                    validPlacement = false;
                    randNum = Math.floor(Math.random() * numberOptions + 1);
                    numbersTried[randNum-1] = 1;
                }
               // console.log("calls: ", calls);
                if (validPlacement) {
                    numberArray[row][col] = randNum;
                    //console.log("umm: ", row, col, randNum);
                } else {
                    randNum = Math.floor(Math.random() * numberOptions + 1);
                    do {
                        if (numbersTried[randNum]) {
                            randNum = Math.floor(Math.random() * numberOptions + 1);
                            ////console.log(numberTried);
                            numbersTried[randNum - 1] = 1;
                            triedAllNumbers = allNumbersTried(numbersTried);
                        }
                    } while (numbersTried[randNum] && !triedAllNumbers);
                }
                //console.log(triedAllNumbers);
            } while (!validPlacement && !triedAllNumbers);

            if (triedAllNumbers && !validPlacement){
                console.log("Something went wrong");
            }
            //console.log(`i: ${i} randNum ${randNum} randIndex: ${randPieceNum}: ${row} ${col}`);
            ////console.log(randPiece);
            //numberArray[row][col] = randNum;
            
        }
        //console.log("number array, just filled: ", numberArray);
        setNumberArray(numberArray);
        setNumberArrayFilled(true);
    }

    const changeNumberArray = (badRow, badCol) => {
        console.log("changing: ", badRow, badCol);
    }

    useEffect(() => {
        if (numberArrayFilled) {
            console.log("number array filled");
            try {
            var possibilities = fillPossibilities(numberArray, false);
            // console.log("possibilities", possibilities);
            setPuzzlePossibilities(possibilities);
            setPuzzlePossibilitiesFilled(true);
            } catch (unSolvablePuzzleError){
                const {badRow, badCol} = unSolvablePuzzleError();
                changeNumberArray(badRow, badCol);
            }

        }
    }, [numberArrayFilled]);

    //give each square its html
    //if filled, use square, if not, use possibilities
    useEffect(() => {
        if (puzzlePossibilitiesFilled) {
           //console.log("numberArray", numberArray);
          if (errorChecks){
           console.log("check possibilities before puzzle html setup: ", puzzlePossibilities);
          }
            const n = puzzleSize;
            let puzzleArrayTemp = new Array(n);
            for (let i = 0; i < n; i++) {
                puzzleArrayTemp[i] = new Array(n);
                for (let j = 0; j < n; j++) {
                    var isStarterPiece = (numberArray[i][j] != -1);

                    puzzleArrayTemp[i][j] = 

                    <Square key={i * n + j} 
                            number={numberArray[i][j]}
                            row={i + 1} 
                            col={j + 1} 
                            possiblities={puzzlePossibilities[i][j]}
                            isStarterPiece={isStarterPiece}
                    />;
                }
            }
            setPuzzleArray(puzzleArrayTemp);
            //console.log("making grid with this puzzle", puzzleArray);
        }
    }, [puzzlePossibilitiesFilled]);

    useEffect(() => {
        if (puzzleArray != "" && !gridCreated) {
           //console.log("puzzleArray: ", puzzleArray);
           //console.log("filling puzzle");
            createGrid();
        }
    }, [puzzleArray]);

    const createGrid = () => {
        const n = puzzleSize;

        let puzzleHTML = new Array(n);
        for (let i = 0; i < n; i++) {
            puzzleHTML[i] = <div className='puzzleBoard' name="puzzleDiv" key={(i + 100)}>{puzzleArray[i]}</div>;
        }
        setPuzzleBoard(puzzleHTML);
        setGridCreated(true);
    }

    useEffect(() => {
        if (gridCreated && puzzleBoard != ''){
            if (errorChecks){
              console.log("grid created: ", puzzleBoard, "solving puzzle");
            }
        }
    }, [gridCreated]);




    const allNumbersTried = (numberTried) => {
        for (let i = 0; i < numberOptions; i++) {
            if (numberTried[i] === 0) {
                return false;
            }
        }
       //console.log("all numbers tried");
        return true;
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

    // const fillAllPuzzlePossibilities = () => {
    //     //console.log("filling puzzle possibilities");
    //     const n = puzzleSize;
    //     var possibilityHTMLTemp = new Array(n);
    //     for (let i = 0; i < n; i++) {
    //         possibilityHTMLTemp[i] = new Array(n);
    //         for (let j = 0; j < n; j++) {
    //             if (puzzlePossibilities[i][j] != "") {
    //                 possibilityHTMLTemp[i][j] = <Miniboard numberArray={puzzlePossibilities[i][j]} />
    //             }
    //         }
    //     }
    //     setPossibilityHTML(possibilityHTMLTemp);
    // }

    // useEffect(() =>{
    //     if (puzzlePossibilitiesFilled){
    //         test();
    //     }

    // }, [puzzlePossibilitiesFilled])

    //test useState variable grid
    const test = () =>{
        if (testing){
            setTests(1);
            setChangingNumberArray(true);
        } 
    }

useEffect(() => {
    if (changingNumberArray){
        if (numberArray[0][0] != -1){
            return;
        }
        var testUpdate = -1;
        console.log("numberArray: ", numberArray);
        for (let i = 1; i < 9; i++){
            if (validOption(numberArray,0,0,i)){
                testUpdate = i;
                console.log("valid option: " + i);
                break;
            }
        }
        console.log("piece to change: ",numberArray[0][0]);
      
        puzzleArray[0][0] = <Square key={0} number={testUpdate} position={1} row={1} col={1}/>
        setPuzzleArray(puzzleArray);
        setChangingGridArray(true);
    }
},[changingNumberArray]);

useEffect(() => {
    if (changingGridArray){
       //console.log("puzzle array", puzzleArray);
        createGrid();
        setChangedGridArray(true);
    }
}, [changingGridArray]);

useEffect(() =>{
    if (changedGridArray){
        //solvePuzzle();
    }
},[changedGridArray]);



    const handleMiniChange = (e) => {
        console.log("change requested from mini square");
    }

 
    //console.log(hardest);
    const [possibilityString, setPossibilityString] = useState("");
    useEffect(() => {
        if (possibilityString === ""){
            setPossibilityString('1 2 3 4 5 6');
        }
    }, [])


       useEffect(() => {
        if (numberTest === 2){
            setNumberTest(3);
            setPossibilityString('7 8 9');
        }
    }, [numberTest])


    
    return (
        <div>
            <h2 className='difficulty' >{difficulty === "Hardest" ? <>Difficulty: Hardest 🧠!</> : <>Difficulty: {difficulty}</>} </h2>
            {puzzleBoard}
            <p className='status' id={1000}></p>
            <h2 className='status'>Note: puzzle may not be solvable due to pattern being randomly generated</h2>
            <h2 className='status'>Currently no user interface. Need more time to develop</h2>
            <div className='puzzleBoard'>
            </div>
        </div>
    );
}

export default WeirdSudoku;