import React, { useEffect, useState, useContext } from 'react';
import Miniboard from './Miniboard';
import { PuzzleContext } from './Puzzlecontext';
import { get3by3squareBaseIndex, fillPossibilities } from '../utils/puzzleFunctionsNormal';
import { checkForErrorInCurrentSelectedSquare, checkIfContradictionStillExists } from '../utils/contradictionChecks';



// "start": "webpack-dev-server --hot --open",
// "build": "webpack --config webpack.config.js --mode production"

const getClassNameString = (row, col) => {
    var addOn = "";
    if ((row-1)%3 === 0){
        addOn += " topBlack";
    }
    if ((col-1)%3 === 0){
        addOn += " leftBlack";
    }
    if (col === 9){
        addOn += " rightBlack"
    }
    if (row === 9){
        addOn += " bottomBlack"
    }
    return addOn;
}

const renderChecks = false;
const print = false;
const basicChecks = false;


function Square({row, col, number, possiblities}){

    var addOnToClassNameString = "";
    if (number != -1){
        addOnToClassNameString = " starterSquare";
    }

    const baseClassString = "square" + getClassNameString(row,col) + addOnToClassNameString;
   
    const [classNameString, setClassNameString] = useState(baseClassString);
    const [addMiniBoard, setAddMiniBoard] = useState(false);
    const [options, setOptions] = useState(possiblities);
    const [squareNumber, setSquareNumber] = useState(number);
    const [puzzleContext, setPuzzleContext] = useContext(PuzzleContext);

    const handleDivClick = (e) => {
        e.preventDefault();
        if (number != -1){
            basicChecks &&  console.log("starter piece");
        } else {
            if (!classNameString.includes('squareIsSelected')){
            var newClassNameString = classNameString + " squareIsSelected";
            setClassNameString(newClassNameString);
            }
            var prevSelection = {
                row: puzzleContext.currRow,
                col: puzzleContext.currCol
            }
            if (prevSelection.row === undefined){
                prevSelection = {
                    row: "",
                    col: ""
                }
            }
            var changingNumber = false; //click on square shouldn't trigger change.
            setPuzzleContext((prevValues) => {
                return ({...prevValues, currRow: row, currCol: col, 
                    prevCol: prevSelection.col, prevRow: prevSelection.row,
                    changingNumber: changingNumber
                })
            })
        }
    }



    useEffect(() => {
        //console.log("infinite check");
        if (row === puzzleContext.prevRow && col === puzzleContext.prevCol
            && !(row === puzzleContext.currRow && col === puzzleContext.currCol)){
            //console.log("unselecting square");
            setClassNameString(classNameString.replace(' squareIsSelected', ''));
        }
        if (puzzleContext.changingNumber || puzzleContext.removingSquareNumber) {
            var currRow = puzzleContext.currRow;
            var currCol = puzzleContext.currCol;
            var { baseRow, baseCol } = get3by3squareBaseIndex(row - 1, col - 1);
            var currentBase = get3by3squareBaseIndex(currRow - 1, currCol - 1);
            var isBadSquare = false;
           // console.log ("currentBase: ", currentBase, "baseRow,col:", baseRow, baseCol, (currentBase.row === baseRow && currentBase.col === baseCol));
            if ((currRow === row) || (currCol === col) || (currentBase.baseRow === baseRow && currentBase.baseCol === baseCol)) {
                if (currRow === row && currCol === col){
                    isBadSquare = checkForErrorInCurrentSelectedSquare(puzzleContext.numberArray, puzzleContext.numberMenuSelection, row-1,col-1);
                }
                else {
                    //console.log("row", row, "col", col, puzzleContext.numberArray[row-1][col-1], puzzleContext.numberMenuSelection);
                    isBadSquare = (puzzleContext.numberArray[row-1][col-1] === puzzleContext.numberMenuSelection);
                } 
                if (isBadSquare) {
                  //  console.log("bad square", row, col);
                    if (!classNameString.includes(" contradiction")) {
                        //console.log("should see something happen");
                        setClassNameString(classNameString + " contradiction");
                    }
                } else { //not a bad square. Remove Contradiction class if its there.
                    if (classNameString.includes(" contradiction")) {
                        basicChecks && console.log("square has contradiction", row, col, currRow, currCol, puzzleContext.removingSquareNumber);
                        if (row === currRow && col === currCol && puzzleContext.removingSquareNumber){
                            isBadSquare = false;
                          //  console.log("removing square");
                        } else {
                            isBadSquare = checkIfContradictionStillExists(
                                puzzleContext.numberArray, puzzleContext.numberArray[row-1][col-1], row-1,col-1);
                        }
                       
                        if (!isBadSquare){
                            var newClassNameString = classNameString.replace(" contradiction", "");
                            setClassNameString(newClassNameString);
                        }    
                    }
                }
            }
        }
        if (row === puzzleContext.currRow && col === puzzleContext.currCol){          
            if (puzzleContext.valueTypeToChange === 'normal' && puzzleContext.changingNumber && puzzleContext.numberMenuSelection){
              //  console.log("changing number in square: ", row, col);
                if (puzzleContext.numberMenuSelection != 10){ //10 means remove value
                    if (squareNumber != -1 && (puzzleContext.removingSquareNumber === undefined || puzzleContext.removingSquareNumber === false)){ //changing square number again
                        setPuzzleContext((prevValues) => {
                            return ({...prevValues, removingSquareNumber: true, squareNumberToRemove: squareNumber})
                        });
                    }
                   setSquareNumber(puzzleContext.numberMenuSelection);
                   print && console.log("numberArray", puzzleContext.numberArray);
                   setAddMiniBoard(false);
                   print && console.log()
                   print && console.log("check: ---------------------------", [puzzleContext.numberArray[row-1][col-1]]);
                   puzzleContext.numberArray[row-1][col-1] = puzzleContext.numberMenuSelection;
                   
                   setPuzzleContext((prevValues) => {
                        return ({...prevValues});
                   });
                } else { //player selected X on a square. They want to remove it.
                    var squareNumberToRemove = squareNumber;
                    //make sure we don't get an infinite loop.
                   print && console.log("removing number");
                    setSquareNumber(-1);
                    setAddMiniBoard(true);
                    if (puzzleContext.removingSquareNumber === undefined || puzzleContext.removingSquareNumber != true) {
                        puzzleContext.numberArray[row-1][col-1] = -1;
                       print && console.log("numberArray", puzzleContext.numberArray);
                        setPuzzleContext((prevValues) => {
                            return ({ ...prevValues, removingSquareNumber: true, squareNumberToRemove: squareNumberToRemove, changingNumber: false })
                        });
                    }
                }  
            } 
            else if (puzzleContext.valueTypeToChange === "possibility" && puzzleContext.changingNumber){
               
                var numberToAddOrRemove = puzzleContext.numberMenuSelection;
                if (squareNumber === -1) {
                    if (options.includes(numberToAddOrRemove)) {
                        setOptions(options.replace(`${numberToAddOrRemove}`, ""));
                    } else {
                        setOptions(options + `${numberToAddOrRemove}`);
                    }
                }
            }
        } 
        if (puzzleContext.changingNumber && puzzleContext.numberMenuSelection != 10 && puzzleContext.valueTypeToChange === "normal"){
            var numToRemove = puzzleContext.numberMenuSelection;
            if (col === puzzleContext.currCol && row != puzzleContext.currRow){
                    setOptions(options.replace(`${numToRemove}`, ''));
            } else if (row === puzzleContext.currRow && col != puzzleContext.currCol){
                    setOptions(options.replace(`${numToRemove}`, ''));
            }
            var currCol = puzzleContext.currCol;
            var currRow = puzzleContext.currRow;
            //same grid
            var thisBaseIndex = get3by3squareBaseIndex(row-1, col-1);
            var currBaseIndex = get3by3squareBaseIndex(currRow-1, currCol-1);
           // console.log(thisBaseIndex, currBaseIndex, thisBaseIndex === currBaseIndex)
          
            if ( (thisBaseIndex.baseRow === currBaseIndex.baseRow && thisBaseIndex.baseCol === currBaseIndex.baseCol) && 
            !(row === currRow && col === currCol)) {
                   print && console.log(row,col);
                    var newOptions = options.replace(`${numToRemove}`, '');
                   print && console.log("changing within grid: ", numToRemove, newOptions);
                    setOptions(newOptions);
            }
            setPuzzleContext((prevValues) => {
                return ({...prevValues, changingNumber: false});
            })
        }
        if (puzzleContext.removingSquareNumber){ //add possibilities back in
            var possibilityToAdd = puzzleContext.squareNumberToRemove;
            var possibilities = fillPossibilities(puzzleContext.numberArray);
            var {currRow, currCol} = puzzleContext;
            var thisBaseIndex = get3by3squareBaseIndex(row-1,col-1);
            var currBaseIndex = get3by3squareBaseIndex(currRow, currCol); 
   
            if (col === currCol && row != currRow) {
                if (possibilities[row - 1][col - 1] != "filled") {
                    if (possibilities[row - 1][col - 1].includes(`${possibilityToAdd}`)) {
                        if (!options.includes(`${possibilityToAdd}`)) {
                            setOptions(options + `${possibilityToAdd}`);
                       
                        }
                    }
                }
                setPuzzleContext((prevValues) => {
                    return ({...prevValues, removingSquareNumber: false, changingNumber: false})
                })
            }
            else if (row === currRow && col != currCol){
                if (possibilities[row - 1][col - 1] != "filled") {
                    if (possibilities[row - 1][col - 1].includes(`${possibilityToAdd}`)) {
                        if (!options.includes(`${possibilityToAdd}`)) {
                            setOptions(options + `${possibilityToAdd}`);
                       
                        }
                    }
                }
                setPuzzleContext((prevValues) => {
                    return ({...prevValues, removingSquareNumber: false, changingNumber: false})
                })
            }
            else if (thisBaseIndex.row === currBaseIndex.row && thisBaseIndex.col === currBaseIndex.col
                && (row != currRow && col != currCol)){
                if (possibilities[row - 1][col - 1] != "filled") {
                    if (possibilities[row - 1][col - 1].includes(`${possibilityToAdd}`)) {
                        if (!options.includes(`${possibilityToAdd}`)) {
                            setOptions(options + `${possibilityToAdd}`);
                          
                        }
                    }
                }
                    setPuzzleContext((prevValues) => {
                        return ({...prevValues, removingSquareNumber: false, changingNumber: false})
                    })
                }
            else if (row === currRow && col === currCol){    
               // console.log("change occuring here");
                setOptions(possibilities[row-1][col-1]);
            }
        }
    }, [puzzleContext]);

    // useEffect(() => {
        
    // }, [puzzleContext])

    // useEffect(() => {
    //     console.log("classname: ", classNameString);
    // }, [classNameString]);

    if (renderChecks){
    console.log("number: ", number);
    }

    // if (row === puzzleContext.prevRow && col === puzzleContext.prevCol){
    //     console.log("classname: ", classNameString, row, col);
    // }


    useEffect(() => {
        if (number === -1){
            setAddMiniBoard(true);
           // console.log("adding mini board: ",possiblities);
        }
    }, [number]);

    useEffect(() => {
        if (puzzleContext.currCol === col && puzzleContext.currRow === row){
            basicChecks &&  console.log("options in current square: ", options);
        }
    }, [options])


    return (
        <div className={classNameString} onClick={handleDivClick} name="squareDiv">
        <p className="numberDisplay">{squareNumber != -1 && squareNumber}</p>
        {addMiniBoard === true && <Miniboard numberArray={options}/>}
        </div>
    );
}

export default Square;