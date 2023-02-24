import { get3by3squareBaseIndex } from './puzzleFunctionsNormal';

function checkForErrorInCurrentSelectedSquare(numberArray, numToAdd, row, col){
    for (let i = 0; i < 9; i++){
        if (i != col) {
            if (numberArray[row][i] === numToAdd) {
                return true
            }
        }
        if (i != row) {
            if (numberArray[i][col] === numToAdd) {
                return true;
            }
        }
    }
    var {baseRow, baseCol} = get3by3squareBaseIndex(row,col);
    for (let j = baseRow; j < baseRow+3; j++){
        for (let k = baseCol; k < baseCol+3; k++){
            if ( !(j === row && k === col) ) {
                if (numberArray[j][k] === numToAdd){
                    return true;
                }
            }
        }
    }
    return false;
}

export {checkForErrorInCurrentSelectedSquare};

function checkIfContradictionStillExists(numberArray, currentNumber, row, col) {
    for (let i = 0; i < 9; i++){
        if (i != col) {
            if (numberArray[row][i] === currentNumber) {
                return true
            }
        }
        if (i != row) {
            if (numberArray[i][col] === currentNumber) {
                return true;
            }
        }
    }
    var {baseRow, baseCol} = get3by3squareBaseIndex(row,col);
    for (let j = baseRow; j < baseRow+3; j++){
        for (let k = baseCol; k < baseCol+3; k++){
            if ( !(j === row && k === col) ) {
                if (numberArray[j][k] === currentNumber){
                    return true;
                }
            }
        }
    }
    return false;
}

export {checkIfContradictionStillExists};