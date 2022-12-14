import { set } from "lodash";

const puzzleSize = 9;

const errorChecks = false;
const numberOfOptions = 9;
// num >0
function getRow(num){
    if (num === 0){
        console.log("error: get row. num is 0");
    }
    if (errorChecks){
        console.log("checking boundary: " + num);
    }

    return Math.floor((num-1)/puzzleSize);
}

export {getRow};

function getCol(num){
    var row = getRow(num);
    return num-row*puzzleSize-1;
}

export {getCol};

function validOption(numberArray, row, col, numToAdd){
    //numToAdd = Math.floor(Math.random()*9+1);
    //console.log("umm: ",  numberArray,row, col, numToAdd);
    if (puzzleSize === 1){
        return true;
    }
    // if (puzzleArray[row][col] != -1){
    //     return false;
    // }
    //console.log("uhhhhhh");
    var validplacement = true;
    const n = puzzleSize;
    if (errorChecks) {
        if (col > puzzleSize || row > puzzleSize) {
            console.log("out of bounds: ", col, row);
            return false;
        }
    }

    for (let i = 0; i < n; i++){
        if (i != col){
            if (numberArray[row][i] === numToAdd){
                //console.log("invalid placement")
                return false;
            }
        }
        if (i != row){
            if (numberArray[i][col] === numToAdd){
                //console.log("invalid placement");
                return false;
            }
        }
    }
    
    if (puzzleSize%3 != 0){
        console.log("bad puzzle size");
        return false;
    } else { //3by3 grid checks
        
        var gridIndex3by3 = get3by3squareIndex(row,col);
        var {baseRow, baseCol}  = getSquareBaseIndex(gridIndex3by3);
        if (puzzleSize === 1 || puzzleSize === 3){
            baseRow = 0;
            baseCol = 0;
        }
        // console.log(baseRow, baseCol);
        if (n === 1){
            return true;
        }
        for (let i = 0; i < 3; i++) { //checking 3by3 grid
            for (let j = 0; j < 3; j++) {
                if (!((baseRow + i === row) && (baseCol + j === col))) {
                    if (numberArray[baseRow + i][baseCol + j] === numToAdd) {
                        //console.log("invalid placement");
                        return false;
                    }
                }
            }
        }
    } 

    var possibilites;
    numberArray[row][col] = numToAdd;
    try { possibilites = fillPossibilities(numberArray)
    } catch (impossibleError){
        numberArray[row][col] = -1;
        return false;
    }

    // if (!leavesGridOptions(possibilites,numToAdd, row, col)){
    //     return false;
    // }

    
    return validplacement;


}

//returns 0-8
function get3by3squareIndex(row,col){
    return (Math.floor(row/3)*3+Math.floor((col)/3));
}
// 0 3 6 
// 9 12 15
// 18 21 24
// 25 28 31 ...
// 0 1 2
// 3 4 5
// 6 7 8
//0 3 6
//0 3 6
//num 0-8
function getSquareBaseIndex(num){
    //const n = puzzleSize/3;
    var row = Math.floor(num/3)*3;
    var col = (num%3)*3;
    return {baseRow: row, baseCol: col}
}

function testGetSquareBaseIndex(){
console.log(getSquareBaseIndex(0));
console.log(getSquareBaseIndex(1));
console.log(getSquareBaseIndex(2));
console.log(getSquareBaseIndex(3));
console.log(getSquareBaseIndex(4));
console.log(getSquareBaseIndex(5));
console.log(getSquareBaseIndex(6));
console.log(getSquareBaseIndex(7));
console.log(getSquareBaseIndex(8));
console.log(get3by3squareIndex(0,0) === 0);
console.log(get3by3squareIndex(0,1) === 0);
console.log(get3by3squareIndex(1,1) === 0);
console.log(get3by3squareIndex(2,1) === 0);
console.log(get3by3squareIndex(3,1) === 3);
console.log(get3by3squareIndex(2,3) === 1);
console.log(get3by3squareIndex(1,3) === 1);
console.log(get3by3squareIndex(1,6) === 2);
console.log(get3by3squareIndex(3,1) === 3);
console.log(get3by3squareIndex(3,3) === 4);
console.log(get3by3squareIndex(3,6) === 5);
console.log(get3by3squareIndex(6,1) === 6);
console.log(get3by3squareIndex(6,3) === 7);
console.log(get3by3squareIndex(6,6) === 8);
}

//testGetSquareBaseIndex();


export {validOption}

function fillPossibilities(numberArray){
    //console.log("puzzle: !!!!!!!!!!!!!!!!!!!!!!!!!!!! " + puzzleArray);
    const n = puzzleSize;
    if (n === 1){
        return null;
    }
    
    var puzzlePossibilities = new Array(puzzleSize);
    for (let i = 0; i < n; i++) {
        puzzlePossibilities[i] = new Array(puzzleSize);
        for (let j = 0; j < n; j++) {
            if (numberArray[i][j] === -1) {
                var temp = fillSquarePossibilities(numberArray, i, j);
                //check for error: no possibilites means puzzle is unsolvable
                if (temp != null){ 
                puzzlePossibilities[i][j] = temp;
                } else { //no possibility found. Throw error. 
                    var unSolvableError = {
                        badRow: i,
                        badCol: j
                    }
                   // console.log("unsolvable puzzle error");
                    throw (error) => {
                        return unSolvableError;
                    }
                }

            } else {
                puzzlePossibilities[i][j] = "";
            }
        }
    }

    //check for broken puzzle
    // if (puzzleIsBroken(puzzlePossibilities)){
    //     console.log("uniqueness break: ", i, j);
    //     var unSolvableError = {
    //         badRow: i,
    //         badCol: j
    //     }
    //    // console.log("unsolvable puzzle error");
    //     throw (error) => {
    //         return unSolvableError;
    //     }
    // }

    return puzzlePossibilities;
}

export {fillPossibilities};

function fillSquarePossibilities(numberArray, row, col){
    //console.log("filling: ", row, col);
    var squarePossibilities = "";
    const n = numberOfOptions;
    for (let i = 1; i <= n; i++){
        if (errorChecks){
       // console.log("row: ", row, " col: ", col);
    }
        if (validOption(numberArray, row, col, i)){
            squarePossibilities += i + " ";
        }
    }
   // console.log("square poss: " + squarePossibilities);
    if (squarePossibilities === ""){
        //console.log("no possibilities");
        return null;
      //  var header = document.getElementById(1000);
      //  var msg = document.createElement('p');
      //  msg.setAttribute("class", "status")
      //  msg.innerHTML = `Found no possibilites for a square: row: ${row+1} col: ${col+1}. Recommend refreshing page`;
      //  header.appendChild(msg);
    }


    return squarePossibilities;
}

//Can it be beat?
function isSolvable(possibilities){
    for (let i = 0; i < puzzleSize; i++){
        for (let j = 0; j < puzzleSize; j++){

        }
    }
}

//break conditions:
// one number is only option for multiple spaces where a rule for uniqueness applies: row col, 3by3 grid.
// a given choice removes all possibilities for a given number somewhere where rules apply.
// need to see if choice removes last remaining possibilies.

//need to check rows cols, 3by3 grids for broken condition
//I think I already have rows and cols for the most part


//If all unused numbers are possible in 3by3 grid, return true. 
function allAvailableNumbersArePossibleIn3by3Grids(possibilities){

}




//1. choose random piece to fill with random number
//2. check if that number will create a contradiction by seeing if there will be no possibilities for a square
//3. 

//returns false if choice removes last remaining possibities for number in affected grids
function leavesGridOptions(possibilities, numToAdd, row, col){
    var gridIndex3by3 = get3by3squareIndex(row,col); //1-9
    var {baseRow, baseCol}  = getSquareBaseIndex(gridIndex3by3);
}

export default leavesGridOptions;



//Pretty cool algorithm.

// function hasUniqueNessProblem(possilities){
//     var broken = false;
//     //uniquenessTestRowsColumns
//     var uniqueChoicesForRows = new Array(numberOfOptions).fill(0);
//     var uniqueChoicesForColumns = new Array(numberOfOptions).fill(0);
//     var holesToFillForRows = new Array(numberOfOptions).fill(puzzleSize);
//     var holesToFillForCols = new Array(numberOfOptions).fill(puzzleSize);
//     for (let i = 0; i < puzzleSize; i++){
//        //  uniqueChoicesForRows[i] = new Array(numberOfOptions).fill(0);
//         // uniqueChoicesForColumns[i] = new Array(numberOfOptions).fill(0);
//         for (let j = 0; j < puzzleSize; j++){
//             if (possilities[i][j] != '') { //make sure square isn't filled
//                 for (let k = 0; k < puzzleSize; k++) {
//                     if (possilities[i][j].includes(k)) {
//                        uniqueChoicesForRows[i]++;
//                        uniqueChoicesForColumns[j]++;
//                     }
//                 }
//             } else {
//                 holesToFillForRows[i]--;
//                 holesToFillForCols[j]--;
//             }
//         }   
//     }
//     for (let i = 0; i < puzzleSize; i++){
//         if (uniqueChoicesForRows[i] < holesToFillForRows[i]){
//             console.log("not enough unique options on row: ", row);
//             return false;
//         }
//         if (uniqueChoicesForColumns[i] < holesToFillForCols){
//             console.log("not enough unique options on col: ", col);
//             return false;
//         }
//     }
// }

function puzzleIsBroken(possibilities){
    var broken = false;
    broken = !isSolvable(possibilities);
}