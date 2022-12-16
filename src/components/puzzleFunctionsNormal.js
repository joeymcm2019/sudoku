
const puzzleSize = 9;

const errorChecks = false;
const numberOfOptions = 9;
// num >0
function getRow(num){
    if (num === 0){
       //console.log("error: get row. num is 0");
    }
    if (errorChecks){
       //console.log("checking boundary: " + num);
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
           //console.log("out of bounds: ", col, row);
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
       //console.log("bad puzzle size");
        return false;
    } else { //3by3 grid checks
        
        var gridIndex3by3 = get3by3squareIndex(row,col);
        var {baseRow, baseCol}  = getSquareBaseIndex(gridIndex3by3);
        if (puzzleSize === 1 || puzzleSize === 3){
            baseRow = 0;
            baseCol = 0;
        }
        ////console.log(baseRow, baseCol);
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

    // var possibilites;
    // numberArray[row][col] = numToAdd;
    // try { possibilites = fillPossibilities(numberArray)
    // } catch (impossibleError){
    //     numberArray[row][col] = -1;
    //     return false;
    // }

    // if (!leavesGridOptions(possibilites,numToAdd, row, col)){
    //     return false;
    // }

    
    return validplacement;


}

//returns 0-8
function get3by3squareIndex(row,col){
    return (Math.floor(row/3)*3+Math.floor((col)/3));
}
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
                  //  console.log("impossiible error: row: ",row, "col: ", col);
                   ////console.log("unsolvable puzzle error");
                    // throw (error) => {
                    //     return unSolvableError;
                    // }
                }

            } else {
                puzzlePossibilities[i][j] = "";
            }
        }
    }

    //check for broken puzzle
    // if (puzzleIsBroken(puzzlePossibilities)){
    //    //console.log("uniqueness break: ", i, j);
    //     var unSolvableError = {
    //         badRow: i,
    //         badCol: j
    //     }
    //    ////console.log("unsolvable puzzle error");
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
       ////console.log("row: ", row, " col: ", col);
    }
        if (validOption(numberArray, row, col, i)){
            squarePossibilities += i + " ";
        }
    }
   ////console.log("square poss: " + squarePossibilities);
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
//            //console.log("not enough unique options on row: ", row);
//             return false;
//         }
//         if (uniqueChoicesForColumns[i] < holesToFillForCols){
//            //console.log("not enough unique options on col: ", col);
//             return false;
//         }
//     }
// }




function checkUpdatePossibilityOnGrid(puzzleToCheck, numToAdd, row, col){

    var possibilityGrid = new Array(9);
    for (let i = 0; i < 9; i++){
        possibilityGrid[i] = new Array(9);
        for (let j = 0; j < 9; j++){
            possibilityGrid[i][j] = puzzleToCheck[i][j];
        }
    }
    ////console.log("row, col ", row, col);
     possibilityGrid[row][col] = "filled";
     for (let i = 0; i < 9; i++){
         if (possibilityGrid[row][i] != "filled"){ //will be blank if number is already placed on puzzleBoard
             possibilityGrid[row][i] = possibilityGrid[row][i].replace(`${numToAdd}`, '');
            //console.log()
             if (possibilityGrid[row][i] === ""){
                 return false;
             } //          
         }
         if (possibilityGrid[i][col] != "filled"){
             possibilityGrid[i][col] = possibilityGrid[i][col].replace(numToAdd, '');
             if (possibilityGrid[i][col] === ""){
                 return false;
             }
         }
     }
     //update 3 by 3 Grid
     const {baseRow, baseCol} = get3by3squareBaseIndex(row,col);
     for (let i = baseRow; i < baseRow+3; i++){
         for (let j = baseCol; j < baseCol+3; j++){
             if (possibilityGrid[i][j] != "filled") { //will be blank if number is already placed on puzzleBoard
                 possibilityGrid[i][j] = possibilityGrid[i][j].replace(`${numToAdd}`, '');
                 if (possibilityGrid[i][j] === "") {
                     return false;
                }
            }
        }
    }

    return true;
}



export {checkUpdatePossibilityOnGrid}

function updatePossibilityGrid(possibilityGrid, numToAdd, row, col){

    ////console.log("row, col ", row, col);
     possibilityGrid[row][col] = "filled";
     for (let i = 0; i < 9; i++){
         if (possibilityGrid[row][i] != "filled"){ //will be blank if number is already placed on puzzleBoard
             possibilityGrid[row][i] = possibilityGrid[row][i].replace(`${numToAdd}`, '');
            //console.log()
             if (possibilityGrid[row][i] === ""){
                 throw (error) => {
                     return;
                 }
             } //          
         }
         if (possibilityGrid[i][col] != "filled"){
             possibilityGrid[i][col] = possibilityGrid[i][col].replace(numToAdd, '');
             if (possibilityGrid[i][col] === ""){
                 throw (error) => {
                     return;
                 }
             }
         }
     }
     //update 3 by 3 Grid
     const {baseRow, baseCol} = get3by3squareBaseIndex(row,col);
     for (let i = baseRow; i < baseRow+3; i++){
         for (let j = baseCol; j < baseCol+3; j++){
             if (possibilityGrid[i][j] != "filled") { //will be blank if number is already placed on puzzleBoard
                 possibilityGrid[i][j] = possibilityGrid[i][j].replace(`${numToAdd}`, '');
                 if (possibilityGrid[i][j] === "") {
                     throw (error) => {
                        return;
                    }
                }
            }
        }
    }

    return possibilityGrid;
}

export {updatePossibilityGrid}
//console.log("what? ", possibilities);


function rowTuplesWork(possibilityGrid) {
    var rowTuple, rowTupleCount, rowTupleDigits;
    var rowTupleIndexes = ""; //track indexes where we have a certain tuple
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (possibilityGrid[i][j] != "filled" && possibilityGrid[i][j] != "") {
                rowTuple = possibilityGrid[i][j]
                rowTupleDigits = getTupleDigits(rowTuple);
                rowTupleCount = 1;
                rowTupleIndexes = `${j}`;
                //console.log(rowTuple);
                for (let k = j + 1; k < 9; k++) { //edge case [row][8] single pos not an issue.
                    if (rowTuple === possibilityGrid[i][k]) {
                        rowTupleCount++;
                        rowTupleIndexes += `${k}`;
                    }
                    // if (i === 0){
                    //    //console.log("check: ", rowTuple, i, j, possibilityGrid[i][j], rowTupleCount);
                    // } 
                    if (rowTupleCount >= rowTuple.length && rowTupleCount < getRowPossibilities(possibilityGrid, i)) {
                        // //console.log("found row tuple to exploit: ", "tuple: ", rowTuple, "count: ", rowTupleCount, "poss: ", rowPossibilities);
                        try {
                            rowTupleDigits.forEach((number) => {
                                updatePossibilityGridRow(possibilityGrid, number, i, j, rowTupleIndexes);
                            });

                            ////console.log("huh ", i, j, possibilityGrid[i]);
                        } catch (impossibleError) {
                           //console.log("error row tuples: i", i, "j: ", j, possibilityGrid[i], "indexes: ", rowTupleIndexes);
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
  }

  export{rowTuplesWork}

  function checkRowTuplesWork(puzzleToCheck) {
    
    var possibilityGrid = new Array(9);
    for (let i = 0; i < 9; i++){
        possibilityGrid[i] = new Array(9);
        for (let j = 0; j < 9; j++){
            possibilityGrid[i][j] = puzzleToCheck[i][j];
        }
    }

    var rowTuple, rowTupleCount, rowTupleDigits;
    var rowTupleIndexes = ""; //track indexes where we have a certain tuple
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (possibilityGrid[i][j] != "filled" && possibilityGrid[i][j] != "") {
                rowTuple = possibilityGrid[i][j]
                rowTupleDigits = getTupleDigits(rowTuple);
                rowTupleCount = 1;
                rowTupleIndexes = `${j}`;
                //console.log(rowTuple);
                for (let k = j + 1; k < 9; k++) { //edge case [row][8] single pos not an issue.
                    if (rowTuple === possibilityGrid[i][k]) {
                        rowTupleCount++;
                        rowTupleIndexes += `${k}`;
                    }
                    // if (i === 0){
                    //    //console.log("check: ", rowTuple, i, j, possibilityGrid[i][j], rowTupleCount);
                    // } 
                    if (rowTupleCount >= rowTuple.length && rowTupleCount < getRowPossibilities(possibilityGrid, i)) {
                        // //console.log("found row tuple to exploit: ", "tuple: ", rowTuple, "count: ", rowTupleCount, "poss: ", rowPossibilities);
                        try {
                            rowTupleDigits.forEach((number) => {
                                updatePossibilityGridRow(possibilityGrid, number, i, j, rowTupleIndexes);
                            });

                            ////console.log("huh ", i, j, possibilityGrid[i]);
                        } catch (impossibleError) {
                           //console.log("error row tuples: i", i, "j: ", j, possibilityGrid[i], "indexes: ", rowTupleIndexes);
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
  }

  export {checkRowTuplesWork}


  function getColPossibilities(puzzle, col){
    var count = 9;
    for (let i = 0; i < 9; i++){
        if (puzzle[i][col] === "filled"){
            count--;
        }
    }
    return count;
  }

  function getRowPossibilities(puzzle, row){
    var count = 9;
    for (let i = 0; i < 9; i++){
        if (puzzle[i][col] === "filled"){
            count--;
        }
    }
    return count;
  }

  function getGridPossibiliites(puzzle, row, col){
    const {baseRow, baseCol} = get3by3squareBaseIndex(row,col);
    var count = 9;
    for (let i = baseRow; i < baseRow + 3; i++){
        for (let j = baseCol; j < baseCol + 3; j++){
                if (puzzle[i][j] === "filled"){
                    count--;
                }
        }
    }
    return count;
  }

  function checkColTuplesWork(puzzleArray) {
   // console.log("check col tup array: ", puzzleArray);
    var possibilityGrid = new Array(9);
    for (let i = 0; i < 9; i++){
        possibilityGrid[i] = new Array(9);
        for (let j = 0; j < 9; j++){
            possibilityGrid[i][j] = puzzleArray[i][j];
        }
    }
    var colTuple, colTupleCount, colTupleDigits;
    var colTupleIndexes = ""; //track indexes where we have a certain tuple
    for (let col = 0; col < 9; col++) {
        for (let row = 0; row < 9; row++) {
            if (possibilityGrid[row][col] != "filled" && possibilityGrid[row][col] != "") {
                
                colTuple = possibilityGrid[row][col];
                colTupleDigits = getTupleDigits(colTuple);
                colTupleCount = 1;
                colTupleIndexes = `${row}`;
                //console.log(colTuple);
                for (let k = row + 1; k < 9; k++) {
                    if (colTuple === possibilityGrid[k][col]) {
                        colTupleCount++;
                        colTupleIndexes += `${k}`;
                    }
                }
                    // if (i === 0){
                    //    //console.log("check: ", colTuple, i, j, possibilityGrid[i][j], colTupleCount);
                    // } 
                    var colPossibilities = (getColPossibilities(possibilityGrid, col));
                    if (colTupleCount >= colTuple.length && colTupleCount < colPossibilities) {
                        // //console.log("found col tuple to exploit: ", "tuple: ", colTuple, "count: ", colTupleCount, "poss: ", colPossibilities);
                        try {
                            colTupleDigits.forEach((number) => {
                                console.log("found tuple", colTuple, "col: ", col, "row: ", row, "Count: ", colTupleCount, "colPos: ", colPossibilities);
                                updatePossibilityGridCol(possibilityGrid, number, row, col, colTupleIndexes)
                            });

                            ////console.log("huh ", i, j, possibilityGrid[i]);
                        } catch (impossibleError) {
                            console.log("error in col tups");
                            //console.log("error colTulpes: i", i, "j: ", j, possibilityGrid[i], "indexes: ", colTupleIndexes);
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

export {checkColTuplesWork}


function colTuplesWork(possibilityGrid) {
    var colTuple, colTupleCount, colTupleDigits;
    var colTupleIndexes = ""; //track indexes where we have a certain tuple
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (possibilityGrid[i][j] != "filled" && possibilityGrid[i][j] != "") {
                colTuple = possibilityGrid[i][j]
                colTupleDigits = getTupleDigits(colTuple);
                colTupleCount = 1;
                colTupleIndexes = `${j}`;
                //console.log(colTuple);
                for (let k = j + 1; k < 9; k++) {
                    if (colTuple === possibilityGrid[k][i]) {
                        colTupleCount++;
                        colTupleIndexes += `${k}`;
                    }
                }
                    // if (i === 0){
                    //    //console.log("check: ", colTuple, i, j, possibilityGrid[i][j], colTupleCount);
                    // } 
                    if (colTupleCount >= colTuple.length && colTupleCount < getColPossibilities(possibilityGrid,i)) {
                        // //console.log("found col tuple to exploit: ", "tuple: ", colTuple, "count: ", colTupleCount, "poss: ", colPossibilities);
                        try {
                            colTupleDigits.forEach((number) => {
                                console.log("found tuple", colTuple, "col: ", col, "Count: ", colTupleCount);
                                updatePossibilityGridCol(possibilityGrid, number, i, j, colTupleIndexes)
                            });

                            ////console.log("huh ", i, j, possibilityGrid[i]);
                        } catch (impossibleError) {
                            //console.log("error colTulpes: i", i, "j: ", j, possibilityGrid[i], "indexes: ", colTupleIndexes);
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }


export {colTuplesWork}

//avoid index pairs.
//used by gridTuplesWork
function updateGridTuples(grid, numToAdd, row, col, indexPairs) {
    const { baseRow, baseCol } = get3by3squareBaseIndex(row, col);
    for (let i = baseRow; i < baseRow + 3; i++) {
        for (let j = baseCol; j < baseCol + 3; j++) {
            if (!indexPairs.includes(`${i},${j}`)) {
                if (grid[i][j] != "filled") { //will be blank if number is already placed on puzzleBoard
                    grid[i][j] = grid[i][j].replace(`${numToAdd}`, '');
                    if (grid[i][j] === "") {
                        throw (error) => {
                            return;
                        }
                    }
                }
            }
        }
    }
}

    function updatePossibilityGridRow(possibilityGrid, numToAdd, row, col, tupleIndexes){
        //console.log("row: ", possibilityGrid[row])
        //possibilityGrid[row][col]
        for (let i = 0; i < 9; i++){
            if (!tupleIndexes.includes(i)) {
                if (possibilityGrid[row][i] != "filled") { //will be blank if number is already placed on puzzleBoard
                    possibilityGrid[row][i] = possibilityGrid[row][i].replace(`${numToAdd}`, '');
                    if (possibilityGrid[row][i] === "") {
                       //console.log("error location: ", row, i, possibilityGrid[row][i])
                        throw (error) => {
                           
                            return;
                        }
                    }
                }
            }
        }
        return possibilityGrid;
    } 

function updatePossibilityGridCol(possibilityGrid, numToAdd, row, col, tupleIndexes){
    console.log("updating col from col tups", numToAdd);
    for (let i = 0; i < 9; i++) {
        console.log(tupleIndexes.includes(i), i, "index: ", tupleIndexes);
        if (!tupleIndexes.includes(i)) {
            if (possibilityGrid[i][col] != "filled") {
                console.log("used col tupple to make change: row", i, "col", col, "numRemoved: ", numToAdd, "tupIndexs: ", tupleIndexes)
                possibilityGrid[i][col] = possibilityGrid[i][col].replace(numToAdd, '');
                if (possibilityGrid[i][col] === "") {
                    throw (error) => {
                        return;
                    }
                }
            }
        }
    }
    return possibilityGrid;
} 

function gridTuplesWork(possibilityGrid) {
    var gridTuple, gridTupleCount, gridTupleDigits;
    var gridTupleIndexes = ""; //track indexes where we have a certain tuple
    for (let i = 0; i < 9; i++) {
        baseRow = Math.floor(i / 3) * 3;
        baseCol = (i % 3) * 3;
        for (let h = 0; h < 9; h++) {
            for (let row = baseRow+Math.floor(h/3); row < baseRow + 3; row++) {
                let col = baseRow+h%3;
                gridTupleIndexes = `${row},${col}`;
                if (possibilityGrid[row][col] != "filled" && possibilityGrid[row][col] != "") {
                    gridTuple = possibilityGrid[row][col];
                    gridTupleDigits = getTupleDigits(gridTuple);
                    gridTupleCount = 1;
                    for (; col < baseCol + 3; col++) {
                        if (gridTuple === possibilityGrid[col][row]) {
                            gridTupleCount++;
                            gridTupleIndexes += ` ${row}${col}`;
                        }
                        // if (i === 0){
                        //    //console.log("check: ", gridTuple, i, j, possibilityGrid[i][j], gridTupleCount);
                        // } 
                        if (gridTupleCount >= gridTuple.length && gridTupleCount < getGridPossibiliites(possibilityGrid, row, col)) {
                            // //console.log("found grid tuple to exploit: ", "tuple: ", gridTuple, "count: ", gridTupleCount, "poss: ", gridPossibilities);
                            try {
                                gridTupleDigits.forEach((number) => {
                                    updateGridTuples(possibilityGrid, number, row, col, gridTupleIndexes);
                                });

                                ////console.log("huh ", i, j, possibilityGrid[i]);
                            } catch (impossibleError) {
                                //console.log("error gridTuples: i", i, "j: ", j, possibilityGrid[i], "indexes: ", gridTupleIndexes);
                                return false;
                            }
                        }
                    }
                }
            }

        }
    }
    return true;
}

export {gridTuplesWork}


function checkGridTuplesWork(puzzle) {

    var possibilityGrid = new Array(9);
    for (let i = 0; i < 9; i++){
        possibilityGrid[i] = new Array(9);
        for (let j = 0; j < 9; j++){
            possibilityGrid[i][j] = puzzle[i][j];
        }
    }
    var gridTuple, gridTupleCount, gridTupleDigits;
    var gridTupleIndexes = ""; //track indexes where we have a certain tuple
    for (let i = 0; i < 9; i++) {
        baseRow = Math.floor(i / 3) * 3;
        baseCol = (i % 3) * 3;
        for (let h = 0; h < 9; h++) {
            for (let row = baseRow+Math.floor(h/3); row < baseRow + 3; row++) {
                let col = baseRow+h%3;
                gridTupleIndexes = `${row},${col}`;
                if (possibilityGrid[row][col] != "filled" && possibilityGrid[row][col] != "") {
                    gridTuple = possibilityGrid[row][col];
                    gridTupleDigits = getTupleDigits(gridTuple);
                    gridTupleCount = 1;
                    for (; col < baseCol + 3; col++) {
                        if (gridTuple === possibilityGrid[col][row]) {
                            gridTupleCount++;
                            gridTupleIndexes += ` ${row}${col}`;
                        }
                        // if (i === 0){
                        //    //console.log("check: ", gridTuple, i, j, possibilityGrid[i][j], gridTupleCount);
                        // } 
                        if (gridTupleCount >= gridTuple.length && gridTupleCount < getGridPossibiliites(possibilityGrid, row, col)) {
                            // //console.log("found grid tuple to exploit: ", "tuple: ", gridTuple, "count: ", gridTupleCount, "poss: ", gridPossibilities);
                            try {
                                gridTupleDigits.forEach((number) => {
                                    updateGridTuples(possibilityGrid, number, row, col, gridTupleIndexes);
                                });

                                ////console.log("huh ", i, j, possibilityGrid[i]);
                            } catch (impossibleError) {
                                //console.log("error gridTuples: i", i, "j: ", j, possibilityGrid[i], "indexes: ", gridTupleIndexes);
                                return false;
                            }
                        }
                    }
                }
            }

        }
    }
    return true;
}

export {checkGridTuplesWork}


  function getTupleDigits(numberStr){
    var digits = [];
    for (let i = 1; i <= 9; i++){
        if (numberStr.includes(i)){
            digits.push(i);
        }
    }
    if (digits === ""){
       //console.log("Error getting digits from digit string");
        return -1;
    }
    return digits;
  }

  function get3by3squareBaseIndex(row,col){
    return getSquareBaseIndex(Math.floor(row/3)*3+Math.floor((col)/3));
}