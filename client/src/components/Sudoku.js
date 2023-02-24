//Author: Joseph McMahon. Hi, I built this project from scratch, algorithms included. Enjoy!

import React, { useEffect, useState, useContext } from 'react';
import Square from './Square';
import {getRow, getCol, fillPossibilities} from "../utils/puzzleFunctionsNormal";
import NumberChoiceUI from './userMenu/NumberChoiceUI';
import Puzzleboard from './PuzzleBoard';
import { PuzzleContext } from './Puzzlecontext';
import { printGrid } from '../utils/hiddenPairs';
import { checkUpdate } from '../utils/checkUpdate';
import { checkSolution } from '../utils/checkSolution';
import { puzzleIsSolvable } from '../utils/puzzleIsSolvable';
import SolutionSquare from './SolutionSquare';
import { puzzleIsUnSolvable } from '../utils/puzzleIsUnSolvable';

// "start": "webpack-dev-server --hot --open",
// "build": "webpack --config webpack.config.js --mode production"

const {easy, medium, hard, hardest} = {easy: 0, medium: 1, hard: 2,hardest: 3};
const difficulties = ["Easy", "Medium", "Hard", "Hardest"];
const puzzleSize = 9; //9 by 9 grid   could potentially scale this.
const numberOptions = 9; //9 number options. could potentially scale.

//less common error logs
const errorChecks = false;

const maxNumbersToFill = 81;


//common error logs.
var basicChecks = false;



function Sudoku(){

    //only one difficulty for now. I beleive it's medium. 
    const [difficulty, setDifficulty] = useState(difficulties[medium]);

    //track everything that the user is doing with the puzzle and react appropriately.
    const [puzzleContext, setPuzzleContext] = useContext(PuzzleContext);


    //will contain filled in square values.
    const [numberArray, setNumberArray] = useState([]); 
    //true when we have finished generating random solvable puzzle
    const [numberArrayFilled, setNumberArrayFilled] = useState(false);

    //for the user to see what possibilities there are for current puzzle
    const [userPossibilitiesFilled, setUserPossibilitiesFilled] = useState(false);

    //will contain all the square components
    const [puzzleArray, setPuzzleArray] = useState([]); 

    //possibility grid. will contain solution when only one possibility is left in unfilled squares.
    const [puzzlePossibilities, setPuzzlePossibilities] = useState([]);
    const [puzzlePossibilitiesFilled, setPuzzlePossibilitiesFilled] = useState(false);

    //user possibility grid
    //Minimum solving applied. Lets user solve puzzle.
    const [userPossibilities, setUserPossibilites] = useState([]);

    //puzzle board html
    const [puzzleBoard, setPuzzleBoard] = useState([]);
    const [gridCreated, setGridCreated] = useState(false); 

    //true if we have a the random solvable puzzle ready to go.
    const [readyToFillPuzzle, setReadyToFillPuzzle] = useState(false);

    //is the user changing the board?
    const [changingPuzzle, setChangingPuzzle] = useState({changing: false, numToAdd: ""});

    //whether or not the puzzle is solved
    const [puzzleSolved, setPuzzleSolved] = useState(false);


    //Puzzle solution. 
    const [solutionArray, setSolutionArray] = useState([]);
    const [solutionBoard, setSolutionBoard] = useState([]);


    //gets things rolling
    useEffect(() => {
        const n = puzzleSize;
        let array = new Array(n);
        for (let i = 0; i < n; i++) {
            array[i] = new Array(n);
            for (let j = 0; j < n; j++) {
                array[i][j] = "123456789";
               //d console.log("i j", i, j, array[i])
                //update as puzzle is filled
            }
        }
        //console.log("initializer: ", numberArrayTemp);
        setPuzzlePossibilities(array)
        setPuzzlePossibilitiesFilled(true);
    }, []);

    useEffect(() => {
        if (puzzlePossibilitiesFilled){
            basicChecks && console.log("puzzle possibilities initialized?: ", puzzlePossibilities);
            const n = puzzleSize;
            let numberArrayTemp = new Array(n);
            for (let i = 0; i < n; i++) {
                numberArrayTemp[i] = new Array(n);
                for (let j = 0; j < n; j++) {
                    numberArrayTemp[i][j] = "123456789";
                    //update as puzzle is filled
                }
            }
           // console.log("initializer: ", numberArrayTemp);
            setUserPossibilites(numberArrayTemp);
            setUserPossibilitiesFilled(true);
        }
    }, [puzzlePossibilitiesFilled]);

    useEffect(() => {
        if (userPossibilitiesFilled){
            const n = puzzleSize;
            let numberArrayTemp = new Array(n);
            for (let i = 0; i < n; i++) {
                numberArrayTemp[i] = new Array(n);
                for (let j = 0; j < n; j++) {
                    numberArrayTemp[i][j] = -1;
                    //update as puzzle is filled
                }
            }
           // console.log("initializer: ", numberArrayTemp);
            setNumberArray(numberArrayTemp);
            setNumberArrayFilled(true);
        }
    }, [userPossibilitiesFilled])

    //fill number array will puzzle numbers
    useEffect(() => {
        if (numberArrayFilled) {
           //console.log("fillingpuzzle");
         //  console.log("blank puzzle ", puzzlePossibilities)
            fillPuzzle();
        } else {
            if (errorChecks) {
                basicChecks && console.log("changed number array: ", numberArray);
            }
        }
    }, [numberArrayFilled]);
    //todo: make it so Math.random doesn't have to retry so many times. Only allow it to fill in valid values.
    //would have to map each random number to one of the valid options.
    const fillPuzzle = () => {
        var numbersFilledIn = 0;
        var maxNumbers = 28;
        while (!puzzleSolvable || numbersFilledIn >= maxNumbers) {
            var puzzleSolvable = false;
            numbersFilledIn = 0;
            //basicChecks && 
            console.log('------------------------------starting puzzle fresh--------------------------------');
            var copyNumberArray = new Array(9);
            var copyPuzzlePossibilities = new Array(9);
            for (let y = 0; y < 9; y++) {
                copyNumberArray[y] = new Array(9);
                copyPuzzlePossibilities[y] = new Array(9);
                for (let z = 0; z < 9; z++) {
                    copyNumberArray[y][z] = numberArray[y][z];
                    copyPuzzlePossibilities[y][z] = puzzlePossibilities[y][z];
                }
            }
            const n = 9;
            if (n > 0) {
                var pieceTaken = new Array(n * n);
                for (let i = 0; i < n * n; i++) {
                    pieceTaken[i] = 0;
                }
                var validPlacement = false;
                for (let i = 0; i < maxNumbersToFill; i++) {
                    var randPieceNum = Math.floor(Math.random() * n * n + 1); //finds random piece out of 81 pieces
                    while (pieceTaken[randPieceNum]) {
                        if (!pieceTaken[randPieceNum]) {
                            pieceTaken[randPieceNum] = 1;
                        } else {
                            randPieceNum = Math.floor(Math.random() * n * n + 1);
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
                    if (errorChecks) {
                        basicChecks && console.log("fillSquares random: randomSquare: ", randPieceNum, "row: ", row, " col: ", col);
                    }
                    var triedAllNumbers = false;
                    do {
                        errorChecks &&  console.log("trying to fill piece", row, col, randNum);
                        //   console.log("poss", puzzlePossibilities);
                        validPlacement = (copyPuzzlePossibilities[row][col].includes(randNum)); //randNum is a possible placement
                        //console.log("helllo????: ");
                        if (validPlacement) {
                            try {
                                // console.log("check for break");                     copyPuzzlePossibilites
                                validPlacement = checkUpdate(copyNumberArray, copyPuzzlePossibilities, row, col, randNum, false);
                                //there's a bug in checkUpdateSomewhere. Not sure where though.
                                if (validPlacement && puzzleIsUnSolvable(copyPuzzlePossibilities)){
                                    console.log("--------------------unsolvable puzzle--------------------");
                                    validPlacement = false;
                                }
                                  //console.log("---------------------changes", changes);
                                // if (changes === false){
                                //  validPlacement = false;   
                                // } else {
                                //     //numbersFilledIn += changes;
                                //     //i += numbersFilledIn;
                                //     numbersFilledIn += changes;
                                //     console.log("numbers filled in: ", changes);
                                // }
                                if (validPlacement) {
                                   errorChecks && console.log("check update returned true");
                                } else {
                                    //console.log();
                                    errorChecks && console.log("wasn't able to add change to grid", "row", row, "col", col, "num", randNum);
                                    //console.log();
                                }
                            } catch (unSolvablePuzzleError) {
                                //console.log();
                                errorChecks && console.log("error: catch", "row", row, "col", col, "Trying to add: ", randNum, "error: ", unSolvablePuzzleError);
                               // console.log();
                                validPlacement = false;
                                //puzzlePossibilities[row][col] = temp; //reset
                                // randNum = Math.floor(Math.random() * numberOptions + 1);
                                // numbersTried[randNum-1] = 1;
                                // triedAllNumbers = allNumbersTried(numbersTried);
                            }
                        }
                        //console.log("did it change?: ", temp, randNum, row, col);
                        // console.log("calls: ", calls);
                        var numberTried = false;
                        if (validPlacement) {
                            copyNumberArray[row][col] = randNum;
                            numbersFilledIn++;
                            // setPuzzlePossibilities(temp);
                            if (puzzleIsSolvable(copyPuzzlePossibilities)) { //break out of the loop. puzzlecanbesolved.
                                basicChecks && console.log("puzzle Is SOLVABLE!");
                                basicChecks && console.log("check solvability", copyPuzzlePossibilities);
                                puzzleSolvable = true;
                                //console.log("numbers filled in", numbersFilledIn);
                                i = 81;
                            } else {
                               // copyNumberArray[row][col] = randNum; //leave last move out if puzzle is solvable
                               
                               basicChecks && console.log("successfully addded: ", row, col, randNum);
                            }
                        } else {
                            do {
                                //    console.log("infinte?");
                                // randNum = Math.floor(Math.random() * numberOptions + 1);
                                // numbersTried[randNum-1]
                                if (numbersTried[randNum - 1] === 1) {
                                    randNum = Math.floor(Math.random() * numberOptions + 1); //change number
                                    ////console.log(numberTried);
                                    if (numbersTried[randNum - 1] === 1) {
                                        numberTried = true;
                                    } else { //new number
                                        numberTried = false;
                                        numbersTried[randNum - 1] = 1;
                                        triedAllNumbers = allNumbersTried(numbersTried);
                                    }
                                }
                            } while (numberTried && !triedAllNumbers);
                        }
                        // console.log("numbersTried", numbersTried);
                    } while (!validPlacement && !triedAllNumbers || !numberTried && !validPlacement);
                    if (triedAllNumbers && !validPlacement) {
                        basicChecks && console.log("check: impossible error?", triedAllNumbers, validPlacement);
                        //console.log('\n');
                        //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        errorChecks && console.log("Something went wrong", "row: ", row, "col: ", col);
                        //console.log('\n');
                        i = 81; //break out of loop. restart.
                    }
                    //console.log(`i: ${i} randNum ${randNum} randIndex: ${randPieceNum}: ${row} ${col}`);
                    ////console.log(randPiece);
                    //numberArray[row][col] = randNum;
                }
            }
            //console.log("number array, just filled: ", numberArray);
                      
            if (puzzleSolvable && numbersFilledIn <= maxNumbers) {
                basicChecks && console.log("numbersFilledIn", numbersFilledIn, "solvable?: ", puzzleSolvable)
               
                //console.log("number array before solution check", numberArray);
               // console.log("checking solution: ", checkSolution(numberArray));
            
               errorChecks && console.log("what's in copy? ", copyNumberArray);
                for (let t = 0; t < 9; t++){
                    for (let u = 0; u < 9; u++){
                        numberArray[t][u] = copyNumberArray[t][u];
                        puzzlePossibilities[t][u] = copyPuzzlePossibilities[t][u];
                    }
                }
                //console.log("checking moves!")
                copyNumberArray[row][col] = randNum;
                errorChecks && console.log(row, col, randNum);
                //var moves = checkUpdate(copyNumberArray, copyPuzzlePossibilities, row, col, randNum, false);
                //console.log("possible moves on this grid: ", moves);
                //console.log("numArray before set ", numberArray);
                //console.log("possBefore set", puzzlePossibilities);
                console.log("numbers filled in", numbersFilledIn);
                setNumberArray(numberArray);
                setNumberArrayFilled(true);
                return;
                //setPuzzlePossibilities(copyPuzzlePossibilities);
                //setNumPiecesLeftToFill(81 - numbersFilledIn);
            }
        }
    }

    useEffect(() => {
        if (numberArrayFilled) {
            errorChecks && console.log("number array filled!!!!!!!!", numberArray);
            ///try {
            var possibilities = fillPossibilities(numberArray);
            // var addedOne = false;
            // console.log("before update: ", printGrid(possibilities));
            // for (let i = 0; i < 9 && !addedOne; i++){
            //     for (let j = 0; j < 9 && !addedOne; j++){
            //         if (possibilities[i][j].length ===1 ){
            //             console.log("checking it out yo");
            //             console.log(checkUpdate(numberArray, possibilities,i,j, possibilities[i][j],false));
            //             addedOne = true;
            //         }
            //     }
            // }
            
            errorChecks && console.log("possibilities: ", possibilities);
            // console.log("possibilities", possibilities);
            setUserPossibilites(possibilities);
            setReadyToFillPuzzle(true);
            // } catch (unSolvablePuzzleError){
            //    // const {badRow, badCol} = unSolvablePuzzleError();
            //     //changeNumberArray(badRow, badCol);
            //     console.log("impossible puzzle error: ");
            // }

        }
    }, [numberArrayFilled]);
    //give each square its html
    //if filled, use square, if not, use possibilities
    useEffect(() => {
        if (readyToFillPuzzle) {
           //console.log("numberArray", numberArray);
          if (errorChecks){
            basicChecks && console.log("check possibilities before puzzle html setup: ", userPossibilities);
          }
            const n = puzzleSize;
            let puzzleArrayTemp = new Array(n);
            var solutionArrayTemp = new Array(n);
            for (let i = 0; i < n; i++) {
                puzzleArrayTemp[i] = new Array(n);
                solutionArrayTemp[i] = new Array(n);
                for (let j = 0; j < n; j++) {
                    var numberToAddToSolution = numberArray[i][j];
                    var useStarterSquare = true;
                    if (numberToAddToSolution === -1){
                        useStarterSquare = false;
                        numberToAddToSolution = puzzlePossibilities[i][j];
                    }
                    puzzleArrayTemp[i][j] = 

                    <Square key={i * n + j} 
                            number={numberArray[i][j]}
                            row={i + 1} 
                            col={j + 1} 
                            possiblities={userPossibilities[i][j]}
                    />;

                    solutionArrayTemp[i][j] = 

                    <SolutionSquare key={100 + i*n + j} 
                            number={numberToAddToSolution}
                            row={i + 1} 
                            col={j + 1} 
                            isStarterSquare = {useStarterSquare}
                    />;

                }
            }
            setPuzzleArray(puzzleArrayTemp);
            setSolutionArray(solutionArrayTemp);
            //console.log("making grid with this puzzle", puzzleArray);
        }
    }, [readyToFillPuzzle]);

    useEffect(() => {
        if (puzzleArray != "" && !gridCreated) {
           //console.log("puzzleArray: ", puzzleArray);
           //console.log("filling puzzle");
           //console.log(solutionArray);
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

    useEffect( () => {
        if (solutionArray != '' ){
            createSolutionGrid();
        }
    }, [solutionArray])

    const createSolutionGrid = () => {
        const n = puzzleSize;

        let puzzleHTML = new Array(n);
        for (let i = 0; i < n; i++) {
            puzzleHTML[i] = <div className='puzzleBoard' name="puzzleDiv" key={(i + 200)}>{solutionArray[i]}</div>;
        }
        setSolutionBoard(puzzleHTML);
    }

    useEffect(() => {
        if (gridCreated && puzzleBoard != ''){
            if (errorChecks){
                errorChecks && console.log("grid created: ", puzzleBoard, "solving puzzle");
            }
            //console.log("testing ");
            setPuzzleContext((prevValues) => {
               return ({...prevValues, numberArray})
            });
            errorChecks && console.log("check number array: ", numberArray);
           // test();
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

    useEffect(() => {
       var print = false;
        print && console.log("check context: ", puzzleContext);
        if (changingPuzzle.changing) {
           print && console.log("check row: ", puzzleContext.currRow);
            if (puzzleContext.currRow != undefined && puzzleContext.currRow != '') {
                var applyChange = true;
                var numToAdd = ' ';
                numToAdd = changingPuzzle.numToAdd;
               print && console.log("numToAdd-----------------------------", numToAdd);
                if (numToAdd != 10 && puzzleContext.valueTypeToChange === 'normal') {

                    // var copyNumberArray = new Array(9);
                    // for (let i = 0; i < 9; i++) {
                    //     copyNumberArray[i] = new Array(9);
                    //     for (let j = 0; j < 9; j++) {
                    //         copyNumberArray[i][j] = numberArray[i][j];
                    //     }
                    // }
                    // var row = puzzleContext.currRow - 1;
                    // var col = puzzleContext.currCol - 1;
                  // print && console.log("row: ", row, "col: ", col, "numToAdd", changingPuzzle.numToAdd);
                 //   var temp = numberArray[row][col];
                  // print && console.log("temp: ", temp);
                 //   copyNumberArray[row][col] = changingPuzzle.numToAdd;
                  //  var checkPoss = fillPossibilities(copyNumberArray);
                  // print && console.log("before update: numArray:", copyNumberArray, "poss", checkPoss, "changingPuzzle", changingPuzzle);
                    //console.log(applyChange = checkUpdate(copyNumberArray, checkPoss, row, col, changingPuzzle.numToAdd));
                }
                if (applyChange) {
                    // var row = puzzleContext.currRow;
                    // var col = puzzleContext.currCol;
                    // if (puzzleContext.valueTypeToChange === "normal" && changingPuzzle.numToAdd != 10 
                    //      && row != undefined && puzzleContext.numberArray[row-1][col-1] === -1){ //adding number
                    //     //setNumPiecesLeftToFill(numPiecesLeftToFill-1);
                    // } else if (puzzleContext.valueTypeToChange === "normal" && changingPuzzle.numToAdd === 10
                    //             && row != undefined && puzzleContext.numberArray[row-1][col-1] != -1){
                    //     //setNumPiecesLeftToFill(numPiecesLeftToFill+1);
                    // 
                    setPuzzleContext((prevValues) => {
                        return ({ ...prevValues, numberMenuSelection: changingPuzzle.numToAdd, changingNumber: true })
                    })
                } else {
                   print && console.log("change blocked:  impossible error");
                }
            }
        }
    }, [changingPuzzle]);


    useEffect(() => {
        basicChecks && console.log(puzzleContext);
        if (puzzleContext != undefined && numberArray != "" && numberArray != undefined){
            if (checkSolution(numberArray)){
                errorChecks && console.log("----------------------puzzleSolved!-------------------");
                setPuzzleSolved(true);
            }
        }
    }, [puzzleContext]);


    const handleClick = (i) => {
        //console.log("handle click-------------------------", i);
        setChangingPuzzle({ changing: true, numToAdd: i });
    }

    const [showAbout, setShowAbout] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    const changeShowAbout = () => {
        setShowAbout(!showAbout);
    }
    const changeShowHowToPlay = () => {
        setShowHowToPlay(!showHowToPlay);
    }


    const [userWantsSolution, setUserWantsSolution] = useState(false);

    const showSolution = () => {
        setUserWantsSolution(!userWantsSolution);
    }

    return ( //use .map
        <div>
            {!puzzleSolved ? <h2 className='difficulty' >{difficulty === "Hardest" ? <>Difficulty: Hardest 🧠!</> : <>Difficulty: {difficulty}</>}</h2> 
            : <h2 className='difficulty'>Puzzle Solved!</h2> }
            {puzzleBoard}
            {/* <Puzzleboard filledSquares={numberArray} puzzlePossibilities={puzzlePossibilities}/> */}
            <NumberChoiceUI handleClick={handleClick}/>
            <h2 className='statusLink' onClick={changeShowAbout}>About</h2>
            {
                showAbout &&
                <div className='statusMsg'>
                    <p className='statusTitle'>Author: Joey McMahon</p>
                    <p>
                    This sudoku app currently creates a random solvable puzzle from sratch, 
                    using naked candidates and hidden candidates. I didn't implement the implicit 
                    cases for hidden candidates. It only finds the obvious hidden sets where all squares
                    part of the hidden set contain the same unique numbers rather than having to account for 
                    if one or more of the squares only contains part of the set. That is a much harder algorithm. 
                    For Naked Candidates, I included the implicit tripple, but no other implicit cases. 
                    Again, it gets very complicated.
                    </p>
                    <p>
                    There are still more algorithms I could implement which would likely
                    drastically increase the difficulty. I may do that sometime. Stay tuned!
                    Pointing pairs/triples would be next. 
                    </p>
                    <p onClick={changeShowHowToPlay} className='statusLink'>How to play</p>
                    {
                        showHowToPlay && 
                            <div>
                                <p>

                                Each row, col, and 3 by 3 grid must contain numbers 1 through 9. 
                                Thus no number should be repeated within a row, col, or grid.
                                The little numbers are the possibilities for each square. 
                                For V1.0, the current version, these are autofilled with the 
                                most basic elimination algorithm. To change big numbers, make 
                                sure the normal button is selected. Press the X button when a 
                                big number is selected to remove it. To change possibilities, 
                                make sure the possibility button is selected. 

                                </p>
                            </div>
                    }
                </div>
            }
            {
                solutionBoard != '' &&
                <div className='puzzleBoard'>
                    <div className='rectangle' onClick={showSolution}>
                        <p>
                            Check Solution
                        </p>
                    </div>
                </div>
            }
            {
                userWantsSolution && 
                <div className='breathingRoom'>
                {solutionBoard}
                </div>    

            }
            
        </div>


    );
}

export default Sudoku;