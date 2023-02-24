
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
                //console.log("check numberArray", numberArray[i][j])
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
                  //console.log("impossiible error: row: ",row, "col: ", col);
                   ////console.log("unsolvable puzzle error");
                    // throw (error) => {
                    //     return unSolvableError;
                    // }
                }

            } else {
                puzzlePossibilities[i][j] = "filled";
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
            squarePossibilities += `${i}`;
        }
    }
   ////console.log("square poss: " + squarePossibilities);
    if (squarePossibilities === ""){
        //console.log("no possibilities");
        return "";
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

     //console.log("UPDATE POSS --------------------------------------row, col ", row, col, "numtoadd", numToAdd);
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
    var changes = 0;
    for (let row = 0; row < 9; row++) {
        var rowPossibilities = getRowPossibilities(possibilityGrid, row);
        for (let col = 0; col < 9; col++) {
            if (possibilityGrid[row][col] != "filled" && possibilityGrid[row][col] != "") {
                rowTuple = possibilityGrid[row][col]
                rowTupleDigits = getTupleDigits(rowTuple);
                rowTupleCount = 1;
                rowTupleIndexes = `${col}`;
                //console.log(rowTuple);
                for (let k = col + 1; k < 9; k++) { //edge case [row][8] single pos not an issue.
                    if (rowTuple === possibilityGrid[row][k]) {
                        rowTupleCount++;
                        rowTupleIndexes += `${k}`;
                    }
                }
                    // if (i === 0){
                    //    //console.log("check: ", rowTuple, i, j, possibilityGrid[i][j], rowTupleCount);
                    // } 
                    if (rowTupleCount >= rowTuple.length && rowTupleCount < rowPossibilities) {
                       //console.log("found row tuple: ", rowTuple, "count: ", rowTupleCount, "poss: ", rowPossibilities, "row: ", row, "col: ", col);                        
                        try {
                            rowTupleDigits.forEach((number) => {
                                changes = updatePossibilityGridRow(possibilityGrid, number, row, col, rowTupleIndexes);
                            });

                            ////console.log("huh ", i, j, possibilityGrid[i]);
                        } catch (impossibleError) {
                           console.log("error row tuples: i", i, "j: ", j, possibilityGrid[i], "indexes: ", rowTupleIndexes);
                            return false;
                        }
                    }
            }
        }
    }
    return changes;
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
    for (let row = 0; row < 9; row++) {
        var rowPossibilities = getRowPossibilities(possibilityGrid, row);
        for (let col = 0; col < 9; col++) {
            if (possibilityGrid[row][col] != "filled" && possibilityGrid[row][col] != "") {
                rowTuple = possibilityGrid[row][col]
                rowTupleDigits = getTupleDigits(rowTuple);
                rowTupleCount = 1;
                rowTupleIndexes = `${col}`;
                //console.log(rowTuple);
                for (let k = col + 1; k < 9; k++) { //edge case [row][8] single pos not an issue.
                    if (rowTuple === possibilityGrid[row][k]) {
                        rowTupleCount++;
                        rowTupleIndexes += `${k}`;
                    }
                }
                    // if (i === 0){
                    //    //console.log("check: ", rowTuple, i, j, possibilityGrid[i][j], rowTupleCount);
                    // } 
                    if (rowTupleCount >= rowTuple.length && rowTupleCount < rowPossibilities) {
                       //console.log("found row tuple: ", rowTuple, "count: ", rowTupleCount, "poss: ", rowPossibilities, "row: ", row, "col: ", col);
                        try {
                            rowTupleDigits.forEach((number) => {
                                updatePossibilityGridRow(possibilityGrid, number, row, col, rowTupleIndexes);
                            });
                        }
                        ////console.log("huh ", i, j, possibilityGrid[i]);
                        catch (impossibleError) {
                            //console.log("error row tuples: i", i, "j: ", j, possibilityGrid[i], "indexes: ", rowTupleIndexes);
                            return false;
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
        if (puzzle[row][i] === "filled"){
            count--;
        }
    }
    return count;
  }

  export {getRowPossibilities};

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
   //console.log("check col tup array: ", puzzleArray);
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
                                //console.log("found tuple", colTuple, "col: ", col, "row: ", row, "Count: ", colTupleCount, "colPos: ", colPossibilities);
                                updatePossibilityGridCol(possibilityGrid, number, row, col, colTupleIndexes)
                            });

                            ////console.log("huh ", i, j, possibilityGrid[i]);
                        } catch (impossibleError) {
                          //console.log("impossible error in col tups: ", impossibleError());
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
    var changes = 0;
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
                        if (colTuple.length > 2)
                         //console.log("found col tuple to exploit: ", "tuple: ", colTuple, "count: ", colTupleCount, "poss: ", colPossibilities, row, col);
                        try {
                            colTupleDigits.forEach((number) => {
                                
                                //console.log("found tuple", colTuple, "col: ", col, "row: ", row, "Count: ", colTupleCount, "colPos: ", colPossibilities);
                                changes = updatePossibilityGridCol(possibilityGrid, number, row, col, colTupleIndexes)
                            });

                            ////console.log("huh ", i, j, possibilityGrid[i]);
                        } catch (impossibleError) {
                            //console.log("error in col tups");
                            console.log("error colTulpes: i", i, "j: ", j, possibilityGrid[i], "indexes: ", colTupleIndexes);
                            return false;
                        }
                    }
                }
            }
        }
        return changes;
    }


export {colTuplesWork}

//avoid index pairs.
//used by gridTuplesWork
function updateGridTuples(grid, numToAdd, row, col, indexPairs) {
    //console.log("updating grid, removing:", numToAdd,  " tupIndexs (do not remove from these coords on grid): ", indexPairs,
   //"grid index: ", get3by3squareBaseIndex(row, col));
   var changes = 0;
    const { baseRow, baseCol } = get3by3squareBaseIndex(row, col);
    //console.log("row: ", row, "col: ", col);

    //console.log("baseRow: ", baseRow, "baseCol: ", baseCol);
    for (let i = baseRow; i < baseRow + 3; i++) {
        for (let j = baseCol; j < baseCol + 3; j++) {
            //console.log(indexPairs.includes(`${i},${j}`), "i: ", i, "j: ", j, "index: ", indexPairs);
            if (!indexPairs.includes(`${i},${j}`)) {
                if (grid[i][j] != "filled") { //will be blank if number is already placed on puzzleBoard
                    //console.log("used grid tupple to make change: row", i, "col", j, "numRemoved: ", numToAdd)
                    if (grid[i][j].includes(numToAdd)){
                    changes++;
                    grid[i][j] = grid[i][j].replace(`${numToAdd}`, '');
                    }
                    if (grid[i][j] === "") {
                        throw (error) => {
                            return `impossibility: row: ${i}, col: ${j}`;
                        }
                    }
                }
            }
        }
    }
    return changes;
}



    function updatePossibilityGridRow(possibilityGrid, numToAdd, row, col, tupleIndexes){
        //console.log("row: ", possibilityGrid[row])
        //possibilityGrid[row][col]
        //console.log("updating row, removing:", numToAdd,  " tupIndexs (do not remove from these cols): ", tupleIndexes);
        var changes = 0;
        for (let i = 0; i < 9; i++){
            //console.log(tupleIndexes.includes(i), i, "index: ", tupleIndexes);
            if (!tupleIndexes.includes(i)) {
                if (possibilityGrid[row][i] != "filled") { //will be blank if number is already placed on puzzleBoard
                    //console.log("used row tupple to make change: row", row, "col", i, "numRemoved: ", numToAdd)
                    if (possibilityGrid[row][i].includes(numToAdd)){
                        possibilityGrid[row][i] = possibilityGrid[row][i].replace(`${numToAdd}`, '');
                        changes++;
                    }
                    if (possibilityGrid[row][i] === "") {
                       //console.log("error location: ", row, i, possibilityGrid[row][i])
                        throw (error) => {
                           
                            return;
                        }
                    }
                }
            }
        }
        return changes;
    } 

function updatePossibilityGridCol(possibilityGrid, numToAdd, row, col, tupleIndexes){
    //console.log("updating col from col tups", numToAdd);
    var changes = 0;
    for (let i = 0; i < 9; i++) {
        //console.log(tupleIndexes.includes(i), i, "index: ", tupleIndexes);
        if (!tupleIndexes.includes(i)) {
            if (possibilityGrid[i][col] != "filled") {
               
                //console.log("used col tupple to make change: row", i, "col", col, "numRemoved: ", numToAdd, "tupIndexs: ", tupleIndexes)
                if (possibilityGrid[i][col].includes(numToAdd)){
                    possibilityGrid[i][col] = possibilityGrid[i][col].replace(numToAdd, '');
                    changes++;
                }
                if (possibilityGrid[i][col] === "") {
                    throw (error) => {
                        return;
                    }
                }
            }
        }
    }
    return changes;
} 

function gridTuplesWork(possibilityGrid) {

    var gridTuple, gridTupleCount, gridTupleDigits;
    var gridTupleIndexes = ""; //track indexes where we have a certain tuple
    var changes = 0;
    
   //Grid Indexes
    // 0 1 2
    // 3 4 5
    // 6 7 8
    for (let start3by3GridIndex = 0; start3by3GridIndex < 9; start3by3GridIndex++) { //9 3by3 grids
        
        //0, 3, or 6
        var baseRow = Math.floor(start3by3GridIndex / 3) * 3; //base row and col in current grid to iterate

        //0, 3, or 6
        var baseCol = (start3by3GridIndex % 3) * 3;

        //Now we iterate through each square in the grid, starting with the first.
        //Each iteration goes through every square beyond the one we started at. 

        // 9 squares to iterate in each grid 
        //check for tuples every time we iterate through new starting square within grid.
        for (let startSquare = 0; startSquare < 9; startSquare++) { 
           //console.log("grid Index: ", start3by3GridIndex, "square index: ", startSquare);
            let startRow = baseRow + Math.floor(startSquare / 3);  // add 0, 1, or 2 to row.
            let startCol = baseCol + startSquare % 3; //col changes by mod 3.


            if (possibilityGrid[startRow][startCol] != "filled" && possibilityGrid[startRow][startCol] != "") {
          //console.log("??");
                gridTuple = possibilityGrid[startRow][startCol]; //tuple to check
                
                gridTupleDigits = getTupleDigits(gridTuple); //Extract numbers from tuple string
                gridTupleCount = 1;  //count starts at 1.
                gridTupleIndexes = `${startRow},${startCol}`; //store index pairs
                //iterate through all squares beyond starting square. See if there's something we can use
                
                let row = startRow;
                let col = startCol+1;
                //if we are on last col, need to move to next row, set col to base col.
                //Boundary in loop will prevent error if we go beyond grid scope
                if ((startCol+1)%3 === 0){
                    row += 1;
                    col = baseCol;
                }
                
                for (; row < baseRow + 3; row++) { //base row + 3, base col + 3 keeps us within grid bounds
                    if (row != startRow){ //don't forget to start at base col as we move to next row in grid
                        col = baseCol;
                    }
                    for (; col < baseCol + 3; col++) {
                      //console.log("row: ", row , "col: ", col);
                        if (possibilityGrid[row][col] === gridTuple) {
                            gridTupleCount++;
                           //console.log("matching tuple: ", gridTuple, "count: ", gridTupleCount, "grid: ", start3by3GridIndex);
                            gridTupleIndexes += `${row},${col}`; //Index of current tuple
                        }
                    }
                }                
               
                //now we have all we need to know about current tuple. 
                //If conditions are met for it being useful (it eliminates other possibilities wihtin grid), 
                //then update possibilities within grid.
                  
                var numGridPossibilities = getGridPossibiliites(possibilityGrid, baseRow, baseCol);
                       
                        if (gridTupleCount >= gridTuple.length && gridTupleCount < numGridPossibilities) {
                             //touple count is sufficient and less than the number of remaining unfilled squares
                             //therefore, we can eliminate the numbers in the touple from the remaining squares 
                            try {
                                gridTupleDigits.forEach((number) => {
                
                                   //console.log("grid tuple found: ", gridTuple, "3by3Grid: ", start3by3GridIndex, "row: ", startRow, "col", 
                                   // startCol, "count: ", gridTupleCount, "grid possibilities", numGridPossibilities);
                                    changes = updateGridTuples(possibilityGrid, number, startRow, startCol, gridTupleIndexes);
                                });

                                ////console.log("huh ", i, j, possibilityGrid[i]);
                            } catch (impossibleError) {
                                //console.log("grid tuple error", impossibleError());
                                console.log("error gridTuples: i", i, "j: ", j, possibilityGrid[i], "indexes: ", gridTupleIndexes);
                                return false;
                            }
                        }
                    }
                }
            }
    return changes;
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

    //Grid Indexes
    // 0 1 2
    // 3 4 5
    // 6 7 8
    for (let start3by3GridIndex = 0; start3by3GridIndex < 9; start3by3GridIndex++) { //9 3by3 grids
        
        //0, 3, or 6
        var baseRow = Math.floor(start3by3GridIndex / 3) * 3; //base row and col in current grid to iterate

        //0, 3, or 6
        var baseCol = (start3by3GridIndex % 3) * 3;

        //Now we iterate through each square in the grid, starting with the first.
        //Each iteration goes through every square beyond the one we started at. 

        // 9 squares to iterate in each grid 
        //check for tuples every time we iterate through new starting square within grid.
        for (let startSquare = 0; startSquare < 9; startSquare++) { 
           //console.log("grid Index: ", start3by3GridIndex, "square index: ", startSquare);
            let startRow = baseRow + Math.floor(startSquare / 3);  // add 0, 1, or 2 to row.
            let startCol = baseCol + startSquare % 3; //col changes by mod 3.


            if (possibilityGrid[startRow][startCol] != "filled" && possibilityGrid[startRow][startCol] != "") {
          //console.log("??");
                gridTuple = possibilityGrid[startRow][startCol]; //tuple to check
                
                gridTupleDigits = getTupleDigits(gridTuple); //Extract numbers from tuple string
                gridTupleCount = 1;  //count starts at 1.
                gridTupleIndexes = `${startRow},${startCol}`; //store index pairs
                //iterate through all squares beyond starting square. See if there's something we can use
                
                let row = startRow;
                let col = startCol+1;
                //if we are on last col, need to move to next row, set col to base col.
                //Boundary in loop will prevent error if we go beyond grid scope
                if ((startCol+1)%3 === 0){
                    row += 1;
                    col = baseCol;
                }
                
                for (; row < baseRow + 3; row++) { //base row + 3, base col + 3 keeps us within grid bounds
                    if (row != startRow){ //don't forget to start at base col as we move to next row in grid
                        col = baseCol;
                    }
                    for (; col < baseCol + 3; col++) {
                      //console.log("row: ", row , "col: ", col);
                        if (possibilityGrid[row][col] === gridTuple) {
                            gridTupleCount++;
                         //onsole.log("matching tuple: ", gridTuple, "count: ", gridTupleCount, "grid: ", start3by3GridIndex);
                            gridTupleIndexes += `${row},${col}`; //Index of current tuple
                        }
                    }
                }                
               
                //now we have all we need to know about current tuple. 
                //If conditions are met for it being useful (it eliminates other possibilities wihtin grid), 
                //then update possibilities within grid.
                  
                var numGridPossibilities = getGridPossibiliites(possibilityGrid, baseRow, baseCol);
                       
                        if (gridTupleCount >= gridTuple.length && gridTupleCount < numGridPossibilities) {
                             //touple count is sufficient and less than the number of remaining unfilled squares
                             //therefore, we can eliminate the numbers in the touple from the remaining squares 
                            try {
                                gridTupleDigits.forEach((number) => {
                
                              //console.log("grid tuple found: ", gridTuple, "3by3Grid: ", start3by3GridIndex, "row: ", startRow, "col", 
                                //    startCol, "count: ", gridTupleCount, "grid possibilities", numGridPossibilities);
                                    updateGridTuples(possibilityGrid, number, startRow, startCol, gridTupleIndexes);
                                });

                                ////console.log("huh ", i, j, possibilityGrid[i]);
                            } catch (impossibleError) {
                                //console.log("grid tuple error", impossibleError());
                                //console.log("error gridTuples: i", i, "j: ", j, possibilityGrid[i], "indexes: ", gridTupleIndexes);
                                return false;
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

function get3by3squareBaseIndex(row, col) {
    return getSquareBaseIndex(Math.floor(row / 3) * 3 + Math.floor((col) / 3));
}

export {get3by3squareBaseIndex};




//------------------------------------------Naked Pairs: Implicit Tripple--------------------------------------------

function getSetDigits(numberStr){
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

  function digitsInCommon(numberSetOne, numberSetTwo){
    var commonDigits = [];
    for (let i = 0; i < numberSetOne.length; i++){
        if (numberSetTwo.includes(numberSetOne[i])){
            commonDigits.push(numberSetOne[i]);
        }
    }
    return commonDigits;
}

 //needed because I transformed each 3by3 grid into a single row for processing.
    //converts col indexes to grid indexes
    //returns index pairs which are needed for making adjustments based on grid pairs.
    function getGridIndexPairs(setIndexes, baseRow, baseCol){
        var gridIndexPairs = "";
        for (let i = 0; i < 9; i++){
            if (setIndexes.includes(i)){
                const row = Math.floor(i/3)+baseRow;
                const col = i%3+baseCol;
                var gridIndex = `${row},${col}`;
                gridIndexPairs += gridIndex;
            }
        }
        return gridIndexPairs;
    }

function getTrippleSetDigits(secondMatchDigits, thirdMatchDigits){
    var trippleSetDigits = [...secondMatchDigits];
    if (secondMatchDigits.length === 3){
        return secondMatchDigits;
    } else if (thirdMatchDigits.length ===  3){
        return thirdMatchDigits;
    } else { //everything has two digits
        for (let i = 0; i < 2; i++){
            if ( !(secondMatchDigits.includes(thirdMatchDigits[i])) ){ //unique possibiliity found
                trippleSetDigits.push(thirdMatchDigits[i]);
            }
        }
    }
    return trippleSetDigits;
}

function trippleExists(setDigits, secondMatchDigits, thirdMatchDigits, numSecondPoss, numThirdPoss){
    //console.log("setOne", setDigits, "setTwo", secondMatchDigits, "setThree", thirdMatchDigits, "numSecond: ", numSecondPoss, "numThird: ", numThirdPoss);
    if (numSecondPoss === 3){
        if (digitsInCommon(secondMatchDigits, thirdMatchDigits).length === thirdMatchDigits.length){
        //    console.log("tripple found: case 1");
            return true;

        } else {
            return false;
        }
       
    } else if (numThirdPoss === 3 && 
        digitsInCommon(secondMatchDigits, thirdMatchDigits).length === 2 &&
        digitsInCommon(setDigits, thirdMatchDigits).length === 2) { 
      //  console.log("tripple found: case 2");
        return true;

    } else if (numThirdPoss === 2){ //two possibilities for everything.
        var oneInCommonWithTwo = digitsInCommon(setDigits, secondMatchDigits);
        var oneInCommonWithThree = digitsInCommon(setDigits, thirdMatchDigits);
        var twoInCommonWithThree = digitsInCommon(secondMatchDigits, thirdMatchDigits);
        if (oneInCommonWithTwo.length === 1 && oneInCommonWithThree.length === 1 && twoInCommonWithThree.length === 1){
            oneInCommonWithTwo = oneInCommonWithTwo[0];
            oneInCommonWithThree = oneInCommonWithThree[0];
            twoInCommonWithThree = twoInCommonWithThree[0];
            //console.log("here", oneInCommonWithTwo, oneInCommonWithThree, twoInCommonWithThree);
            if (oneInCommonWithTwo != oneInCommonWithThree && oneInCommonWithTwo != twoInCommonWithThree && oneInCommonWithThree != twoInCommonWithThree){
              //  console.log("tripple found: case 3");
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
       
    }
    return false;
}

function checkForAllNakedImplicitTripples(possibilityArray){

    var possibilityGrid = new Array(9);
        for (let i = 0; i < 9; i++){
            possibilityGrid[i] = new Array(9);
            for (let j = 0; j < 9; j++){
                possibilityGrid[i][j] = possibilityArray[i][j];
            }
        }
    
    var everyThingIsFine = true; 
    
    for (let row = 0; row < 9; row++){ //check rows for naked pairs
        everyThingIsFine = checkForNakedImplicitTrippleInSet(possibilityGrid, possibilityGrid[row], row, "row");
        if (!everyThingIsFine){
            return false;
        }
    }
    
    for (let col = 0; col < 9; col++){
        var colPossibilities = [];
        for (let row = 0; row < 9; row++){
            colPossibilities[row] = possibilityGrid[row][col]; //transform col into single row for processing
        }
        everyThingIsFine = checkForNakedImplicitTrippleInSet(possibilityGrid, colPossibilities, col, "col");
        if (!everyThingIsFine){
            return false;
        }
    }
    
    for (let gridIndex = 0; gridIndex < 9; gridIndex++) {
        var gridPos = new Array(9);
        var baseRow = Math.floor((gridIndex / 3)) * 3;
        var baseCol = (gridIndex % 3) * 3;
        var posIndex = 0; //for gridPos.
        for (let i = baseRow; i < baseRow + 3; i++) {
            for (let j = baseCol; j < baseCol + 3; j++) {
                //  console.log("row, col",i,j, "pos: ", posIndex);
                gridPos[posIndex++] = possibilityGrid[i][j];
            }
        }
        everyThingIsFine = checkForNakedImplicitTrippleInSet(possibilityGrid, gridPos, gridIndex, "grid");
        if (!everyThingIsFine){
            return false;
        }
    }
    
    return everyThingIsFine;
    
    }

    export {checkForAllNakedImplicitTripples};
    
    function useAllNakedImplicitTripples(possibilityGrid){
    var changes = 0;
    
    for (let row = 0; row < 9; row++){ //check rows for naked pairs
        changes += useNakedImplicitTrippleInSet(possibilityGrid, possibilityGrid[row], row, "row");
    }
    
    for (let col = 0; col < 9; col++){
        var colPossibilities = [];
        for (let row = 0; row < 9; row++){
            colPossibilities[row] = possibilityGrid[row][col]; //transform col into single row for processing
        }
        changes += useNakedImplicitTrippleInSet(possibilityGrid, colPossibilities, col, "col");
    }
    
        for (let gridIndex = 0; gridIndex < 9; gridIndex++) {
            var gridPos = new Array(9);
            var baseRow = Math.floor((gridIndex / 3)) * 3;
            var baseCol = (gridIndex % 3) * 3;
            var posIndex = 0; //for gridPos.
            for (let i = baseRow; i < baseRow + 3; i++) {
                for (let j = baseCol; j < baseCol + 3; j++) {
                    //  console.log("row, col",i,j, "pos: ", posIndex);
                    gridPos[posIndex++] = possibilityGrid[i][j];
                }
            }
            changes += useNakedImplicitTrippleInSet(possibilityGrid, gridPos, gridIndex, "grid");
        }
    
    return changes;
    }

    export {useAllNakedImplicitTripples};

//assuming no contradictions are currently present. 
//assuming regular pairs (non implicit) have already been ran and do not exists in current set
function checkForNakedImplicitTrippleInSet(possibilityGrid, possibilitySet, setIndex, setType) {
    var set, setCount, setDigits, setIndexes;
    var numSetPoss;
    var num3count = 0; //how many squares did we find that had all three values (and none else)? Don't want three. Then its not implicit
    var usedIndexes = ""; //might use to speed up algorithm 
    for (let col = 0; col < 9-2; col++) { //7 is pointless to start from because we need tripple
        if (possibilitySet[col] != "filled") {
            set = possibilitySet[col];
            numSetPoss = set.length;
            setCount = 1;
            setDigits = getSetDigits(set);
            setIndexes = `${col}`;
            if (numSetPoss === 3) {
                num3count++; //only have to worry about this variable in this case
                for (let colToCheck = col + 1; colToCheck < 9-1; colToCheck++) { //8 is pointless to start from since we need tripple
                    var currentSquare = possibilitySet[colToCheck];
                    if (currentSquare != "filled") {
                        var numCurrentPoss = currentSquare.length;
                        //var differenceInNumPossibilities = Math.abs(pair.length - currentSquare.length);
                        if ((numCurrentPoss >= 2) && (numCurrentPoss <= 3)) {
                            if (set === currentSquare){  //tripple matching with tripple
                                setIndexes += `${colToCheck}`;
                                num3count++;
                                setCount++;
                            } else if (currentSquare.length === 2){                    //current double might be subset of tripple
                                var currentSquareDigits = getSetDigits(currentSquare);
                                var commonDigits = digitsInCommon(setDigits, currentSquareDigits);
                                if (commonDigits.length === 2){ //both numbers match
                                    setIndexes += `${colToCheck}`;
                                    setCount++;
                                }
                            }
                        }
                    }
                }
            } else if (numSetPoss === 2){ //try to find two other squares that work.
                //var potentialMatches = [];
                for (let colToCheck = col + 1; colToCheck < 9-1; colToCheck++) { //pointless to start at 8 if looking for trip
                    var secondMatch = possibilitySet[colToCheck];
                    if (secondMatch != "filled") {
                        var numSecondPoss = secondMatch.length;
                        if ((numSecondPoss >= 2) && (numSecondPoss <= 3)){
                            var secondMatchDigits = getSetDigits(secondMatch);
                            var commonDigits = digitsInCommon(setDigits, secondMatchDigits);
                            if ((numSecondPoss === 3 && commonDigits.length === 2) || 
                                (numSecondPoss === 2 && commonDigits.length === 1)){ //potentialTripple

                                for (let thirdMatchCol = colToCheck+1; thirdMatchCol < 9; thirdMatchCol++){
                                    var thirdMatch = possibilitySet[thirdMatchCol];
                                    if (thirdMatch != "filled"){
                                        var numThirdPoss = thirdMatch.length;
                                        if ( (numThirdPoss >= 2) && (numThirdPoss <= 3)){ //potential tripple
                                            var thirdMatchDigits = getSetDigits(thirdMatch);
                                            if (trippleExists(setDigits, secondMatchDigits, thirdMatchDigits, numSecondPoss, numThirdPoss)){
                                                setIndexes += `${colToCheck}${thirdMatchCol}`;
                                                setCount += 2;
                                                thirdMatchCol = 9; //break out of loops
                                                colToCheck = 9;
                                                setDigits = getTrippleSetDigits(secondMatchDigits, thirdMatchDigits);
                                            }
                                        }
                                    }
                                }

                            }

                        }

                    }

                }

            }
                if (setCount ===  3){
                    usedIndexes += setIndexes;
                }
                var gridIndexPairs; 
                var setPossibilities;
                if (setType === 'row'){
                    setPossibilities = getRowPossibilities(possibilityGrid, setIndex);
                } else if (setType === 'col'){
                    setPossibilities = getColPossibilities(possibilityGrid, setIndex);
                } else if (setType === 'grid'){
                    var {baseRow, baseCol} = getSquareBaseIndex(setIndex);
                    setPossibilities = getGridPossibiliites(possibilityGrid, baseRow, baseCol);
                    gridIndexPairs = getGridIndexPairs(setIndexes, baseRow, baseCol);
                }
                if (setCount === 3 && setPossibilities > 3 && num3count < 3) {   
                   // console.log("setDigits", setDigits, "pairCount", setCount, "setIndexes", setIndexes);
                    try {
                        setDigits.forEach((number) => {
                            if (setType === 'row'){ 
                                updatePossibilityGridRow(possibilityGrid, number, setIndex, 0, setIndexes); //col doesn't matter.
                            } else if (setType === 'col'){
                                updatePossibilityGridCol(possibilityGrid, number, 0, setIndex, setIndexes);
                            } else if (setType === 'grid'){
                                var {baseRow, baseCol} = getSquareBaseIndex(setIndex);
                                updateGridTuples(possibilityGrid, number, baseRow, baseCol, gridIndexPairs);
                            }
                        });

                    } catch (impossibleError) {
                      // console.log("something went wrong in checking naked implicit Tripple, type: ", setType);
                        return false;
                    }
                }

            }
        }
        return true;
    }

//assuming no contradictions are currently present. 
//assuming regular pairs (non implicit) have already been ran and do not exists in current set
function useNakedImplicitTrippleInSet(possibilityGrid, possibilitySet, setIndex, setType) {
    var changes = 0;
    var set, setCount, setDigits, setIndexes;
    var numSetPoss;
    var num3count = 0; //how many squares did we find that had all three values (and none else)? Don't want three. Then its not implicit
    var usedIndexes = ""; //might use to speed up algorithm 
    for (let col = 0; col < 9-2; col++) { //7 is pointless to start from because we need tripple
        if (possibilitySet[col] != "filled") {
            set = possibilitySet[col];
            numSetPoss = set.length;
            setCount = 1;
            setDigits = getSetDigits(set);
            setIndexes = `${col}`;
            if (numSetPoss === 3) {
                num3count++; //only have to worry about this variable in this case
                for (let colToCheck = col + 1; colToCheck < 9-1; colToCheck++) { //8 is pointless to start from since we need tripple
                    var currentSquare = possibilitySet[colToCheck];
                    if (currentSquare != "filled") {
                        var numCurrentPoss = currentSquare.length;
                        //var differenceInNumPossibilities = Math.abs(pair.length - currentSquare.length);
                        if ((numCurrentPoss >= 2) && (numCurrentPoss <= 3)) {
                            if (set === currentSquare){  //tripple matching with tripple
                                setIndexes += `${colToCheck}`;
                                num3count++;
                                setCount++;
                            } else if (currentSquare.length === 2){                    //current double might be subset of tripple
                                var currentSquareDigits = getSetDigits(currentSquare);
                                var commonDigits = digitsInCommon(setDigits, currentSquareDigits);
                                if (commonDigits.length === 2){ //both numbers match
                                    setIndexes += `${colToCheck}`;
                                    setCount++;
                                }
                            }
                        }
                    }
                }
            } else if (numSetPoss === 2){ //try to find two other squares that work.
                //var potentialMatches = [];
                for (let colToCheck = col + 1; colToCheck < 9-1; colToCheck++) { //pointless to start at 8 if looking for trip
                    var secondMatch = possibilitySet[colToCheck];
                    if (secondMatch != "filled") {
                        var numSecondPoss = secondMatch.length;
                        if ((numSecondPoss >= 2) && (numSecondPoss <= 3)){
                            var secondMatchDigits = getSetDigits(secondMatch);
                            var commonDigits = digitsInCommon(setDigits, secondMatchDigits);
                            if ((numSecondPoss === 3 && commonDigits.length === 2) || 
                                (numSecondPoss === 2 && commonDigits.length === 1)){ //potentialTripple

                                for (let thirdMatchCol = colToCheck+1; thirdMatchCol < 9; thirdMatchCol++){
                                    var thirdMatch = possibilitySet[thirdMatchCol];
                                    if (thirdMatch != "filled"){
                                        var numThirdPoss = thirdMatch.length;
                                        if ( (numThirdPoss >= 2) && (numThirdPoss <= 3)){ //potential tripple
                                            var thirdMatchDigits = getSetDigits(thirdMatch);
                                            if (trippleExists(setDigits, secondMatchDigits, thirdMatchDigits, numSecondPoss, numThirdPoss)){
                                                setIndexes += `${colToCheck}${thirdMatchCol}`;
                                                setCount += 2;
                                                thirdMatchCol = 9; //break out of loops
                                                colToCheck = 9;
                                                setDigits = getTrippleSetDigits(secondMatchDigits, thirdMatchDigits);
                                            }
                                        }
                                    }
                                }

                            }

                        }

                    }

                }

            }
                if (setCount ===  3){
                    usedIndexes += setIndexes;
                }
                var gridIndexPairs; 
                var setPossibilities;
                if (setType === 'row'){
                    setPossibilities = getRowPossibilities(possibilityGrid, setIndex);
                } else if (setType === 'col'){
                    setPossibilities = getColPossibilities(possibilityGrid, setIndex);
                } else if (setType === 'grid'){
                    var {baseRow, baseCol} = getSquareBaseIndex(setIndex);
                    setPossibilities = getGridPossibiliites(possibilityGrid, baseRow, baseCol);
                    gridIndexPairs = getGridIndexPairs(setIndexes, baseRow, baseCol);
                }
                if (setCount === 3 && setPossibilities > 3 && num3count < 3) {   
                   // console.log("setDigits", setDigits, "pairCount", setCount, "setIndexes", setIndexes);
                    try {
                        setDigits.forEach((number) => {
                            if (setType === 'row'){ 
                                changes += updatePossibilityGridRow(possibilityGrid, number, setIndex, 0, setIndexes); //col doesn't matter.
                                // if (changes > 0){
                                //     console.log("updated with row NIT", setIndexes);
                                // }
                            } else if (setType === 'col'){
                                changes += updatePossibilityGridCol(possibilityGrid, number, 0, setIndex, setIndexes);
                                //   if (changes > 0){
                                //     console.log("updated with col NIT", setIndexes);
                                // }
                            } else if (setType === 'grid'){
                                var {baseRow, baseCol} = getSquareBaseIndex(setIndex);
                                changes += updateGridTuples(possibilityGrid, number, baseRow, baseCol, gridIndexPairs);
                                // if (changes > 0){
                                //     console.log("updated with grid NIT", gridIndexPairs);
                                // }
                            }
                        });

                    } catch (impossibleError) {
                       //console.log("------------------Should not have happened-----------------");
                       console.log("something went wrong in using naked implicit Tripple, type: ", setType);
                        return false;
                    }
                }

            }
        }
        return changes;
    }