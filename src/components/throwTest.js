

// function isCool(coolTest){
//     var errorMsg = {
//         msg: "not cool man",
//         cool: coolTest
//     }
//     if (!coolTest){
//         throw (error) => {
//             return errorMsg
//         }
//     } else {
//         return true;
//     }
// }

// var cool = true;
//  {
//     var hey = isCool(!cool);
// } catch (error){
//     hey = error();
// }

////console.log(hey.cool);


   

    let possibilities = new Array(9);
    for (let i = 0; i < 9; i++){
        possibilities[i] = new Array(9);
        for (let j = 0; j < 9; j++){
            possibilities[i][j] = "123456789";
        }
    }

    //console.log(possibilities);


    function removeCharacter(str, c){
        return str.replace(`${c}`, "a");
    }

    var str = "cat";
    str = removeCharacter(str, "c");
   //console.log(str);

    var str = "123456";
    str.replace(1,'')
   //console.log("test: ", str);

    //updatePossibilityGrid(possibilities, 1, 0,0);
    
    // possibilities = updatePossibilityGrid(possibilities, 2, 0,0);
    // possibilities = updatePossibilityGrid(possibilities, 3, 0,0);
    // possibilities = updatePossibilityGrid(possibilities, 4, 0,0);
    // possibilities = updatePossibilityGrid(possibilities, 5, 0,0);
    // possibilities = updatePossibilityGrid(possibilities, 6, 0,0);
    //possibilities = updatePossibilityGrid(possibilities, 7, 8,8);
    


    //only update row. Used by updateTuples. 
    //Tuples only affect row or col or 3by3 grid
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
    
    // possibilities = updatePossibilityGridRow(possibilities, 1, 8,8);
    // possibilities = updatePossibilityGridRow(possibilities, 2, 8,8);
    // possibilities = updatePossibilityGridRow(possibilities, 3, 8,8);
    // possibilities = updatePossibilityGridRow(possibilities, 4, 8,8);
    // possibilities = updatePossibilityGridRow(possibilities, 5, 8,8);
    // possibilities = updatePossibilityGridRow(possibilities, 6, 8,8);
    // possibilities = updatePossibilityGridRow(possibilities, 7, 8,8);
    // possibilities = updatePossibilityGridRow(possibilities, 8, 8,8);
    ////console.log(possibilities);
    function updatePossibilityGridCol(possibilityGrid, numToAdd, row, col, tupleIndexes){
        for (let i = 0; i < 9; i++) {
            if (!tupleIndexes.includes(i)) {
                if (possibilityGrid[i][col] != "filled") {
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
    //     possibilities = updatePossibilityGridCol(possibilities, 1, 8,8);
    // possibilities = updatePossibilityGridCol(possibilities, 2, 8,8);
    // possibilities = updatePossibilityGridCol(possibilities, 3, 8,8);
    // possibilities = updatePossibilityGridCol(possibilities, 4, 8,8);
    // possibilities = updatePossibilityGridCol(possibilities, 5, 8,8);
    // possibilities = updatePossibilityGridCol(possibilities, 6, 8,8);
    // possibilities = updatePossibilityGridCol(possibilities, 7, 8,8);
    // possibilities = updatePossibilityGridCol(possibilities, 8, 8,8);
   ////console.log(possibilities);


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

  //test
  //last row should have single tuple
  //console.log(tuplesWork(possibilities));

  //511 unique keys 
  //yeah no thanks
  // E (9 choose n) 1 <= n <= 9
  function hashString(string){

  }





function get3by3squareBaseIndex(row,col){
    return getSquareBaseIndex(Math.floor(row/3)*3+Math.floor((col)/3));
}

function getSquareBaseIndex(num){
    //const n = puzzleSize/3;
    var row = Math.floor(num/3)*3;
    var col = (num%3)*3;
    return {baseRow: row, baseCol: col}
}


function testReplace(str){
   //console.log(str.replace("a", ""));
}

testReplace("");



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


//console.log("what? ", possibilities);


function rowTuplesWork(possibilityGrid, rowPossibilities) {
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
                    if (rowTupleCount >= rowTuple.length && rowTupleCount < rowPossibilities.length) {
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

  function colTuplesWork(possibilityGrid, colPossibilities) {
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
                    // if (i === 0){
                    //    //console.log("check: ", colTuple, i, j, possibilityGrid[i][j], colTupleCount);
                    // } 
                    if (colTupleCount >= colTuple.length && colTupleCount < colPossibilities.length) {
                        // //console.log("found col tuple to exploit: ", "tuple: ", colTuple, "count: ", colTupleCount, "poss: ", colPossibilities);
                        try {
                            colTupleDigits.forEach((number) => {
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
    }
    return true;
}


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

function gridTuplesWork(possibilityGrid, gridPossibilities) {
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
                        if (gridTupleCount >= gridTuple.length && gridTupleCount < gridPossibilities.length) {
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

//row tuple test
//and grid tuple test.
 updatePossibilityGrid(possibilities, 2, 0, 1);
 updatePossibilityGrid(possibilities, 3, 0, 2);
 updatePossibilityGrid(possibilities, 4, 0, 3);
 updatePossibilityGrid(possibilities, 5, 0, 4);
 updatePossibilityGrid(possibilities, 6, 0, 5);
 updatePossibilityGrid(possibilities, 7, 0, 6);
 updatePossibilityGrid(possibilities, 8, 0, 7);
 updatePossibilityGrid(possibilities, 9, 0, 8);

 //coltuple test
//  updatePossibilityGrid(possibilities, 1, 1, 8);
//  updatePossibilityGrid(possibilities, 2, 2, 8);
//  updatePossibilityGrid(possibilities, 3, 3, 8);
//  updatePossibilityGrid(possibilities, 4, 4, 8);

 console.log(colTuplesWork(possibilities, "784","123456789"));
 //console.log(possibilities[0][0]);

 console.log(possibilities[0]);
 //console.log(gridTuplesWork(possibilities,"12345678"));
 console.log(possibilities[0][0]);
 console.log(possibilities[0][1]);
 console.log(possibilities[0][2]);
 console.log(possibilities[1][0]);
 console.log(possibilities[1][1]);
 console.log(possibilities[1][2]);
 console.log(possibilities[2][0]);
 console.log(possibilities[2][1]);
 console.log(possibilities[2][2]);
 console.log(possibilities[0][3]);
 console.log(possibilities[0][4]);
 console.log(possibilities[0][5]);
 console.log(possibilities[0][6]);
 console.log(possibilities[1][0]);
 console.log(possibilities[2][0]);
 console.log(possibilities[3][0]);
 console.log(possibilities[4][0]);
 console.log(possibilities[5][0]);
 console.log(possibilities[6][0]);
 //console.log(colTuplesWork(possibilities, "12345678"))
 ////console.log(possibilities);




//   valuesPairs = "1,23,4"

//   var a = 1;
//   var b = 2;

//  //console.log(valuesPairs.includes(`${a},${b}`));

var a = new Array(3).fill(1);
var b = a;
//b = [1,2];

console.log(a);
console.log(b);