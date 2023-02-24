



//Check for all hidden pairs on entire grid.
//Each function it uses recursively uses the other functions when a change is applied.
//This gets EVERYTHING
function applyHiddenPairs(possArray, isPrinting){
    var changes = 0;
    for (let i = 0; i < 9; i++){
        var rowChanges = 0;
        rowChanges += checkHiddenPairRow(possArray, possArray[i], i, isPrinting);
        isPrinting && console.log("changes from hiddenRow:", rowChanges);
    }
    for (let i = 0; i < 9; i++){
        var colChanges = 0;
        colChanges += checkHiddenPairCol(possArray, i, isPrinting);
        isPrinting && console.log("changes from hiddenCol:", colChanges);
    }
    for (let i = 0; i < 9; i++){
        var gridChanges = 0;
        gridChanges += checkHiddenPairGrid(possArray, i, isPrinting);
        isPrinting && console.log("changes from hiddenGrid:", gridChanges);
    }
    isPrinting && printGrid(possArray);
    return rowChanges + colChanges + gridChanges;
}

export {applyHiddenPairs}

//returns a number  0 <= n <= 8
function get3by3squareIndex(row,col){
    return (Math.floor(row/3)*3+Math.floor((col)/3));
}

//prints the entire grid in a nice orderly aligned fashion
function printGrid(grid){
    var printGrid = new Array(9).fill('');
    var whiteSpace = '    ';
    for (let v = 0; v < 9; v++){
        for (let w = 0; w < 9; w++){
            whiteSpace = '              ';
            for (let x = 0; x < Math.abs(grid[v][w].length-9); x++){
                whiteSpace += ' '; 
            }
            if (grid[v][w] === 'filled'){
                printGrid[v] += whiteSpace;
            } else {
                printGrid[v] += whiteSpace + grid[v][w];
            }
            
        }
    }
    console.log(printGrid);
}

export {printGrid}

//prints a single 3by3 grid
function printSingleGrid(grid, gridIndex){
    var printGrid = new Array(3).fill('');
    var whiteSpace = '    ';
    var baseRow = Math.floor(gridIndex/3)*3;
    var baseCol = (gridIndex%3)*3;
    var printIndex = 0;
    for (let v = baseRow; v < baseRow+3; v++){
        for (let w = baseCol; w < baseCol+3; w++){
            whiteSpace = '   ';
            for (let x = 0; x < Math.abs(grid[v][w].length-4); x++){
                whiteSpace += ' '; 
            }
            printGrid[printIndex] += whiteSpace + grid[v][w];
        }
        printIndex++;
    }
    return printGrid;
}

//prints a single col on a single line in row format
function printCol(grid, col){
    var printCol = ' ';
   // var whiteSpace = ' ';
    for (let v = 0; v < 9; v++){
           // whiteSpace = '    ';
            // for (let x = 0; x < Math.abs(grid[v][col].length-4); x++){
            //     whiteSpace += ' '; 
            // }
            printCol +=  ' ' + `${grid[v][col]}`;
    }
    return printCol;
}

//print row on single line
function printRow(rowPos){
    var row = '';
    for (let col = 0; col < 9; col++){
        row += ' ' + rowPos[col];
    }
    return row;
}

export {printRow}

//convert digit string to number array
function getDigits(numberStr) {
    var digits = [];
    for (let i = 0; i <= 8; i++) {
        if (numberStr.includes(i)) {
            digits.push(i);
        }
    }
    return digits;
}

//Look for hidden pairs within 3by3 grid recursively (if a change occurs, run it again)
//Look for hidden pairs on changed rows and cols
function checkHiddenPairGrid(possArray, gridIndex, isPrinting){

    isPrinting && console.log('---------------Grid Check Commencing-------------------');
    isPrinting && console.log();
    var changes = 0;
    const n = 9;
    var gridPos = new Array(n);
   // console.log("possArray", possArray);
   var baseRow = Math.floor((gridIndex/3))*3;
   isPrinting && console.log("baseRow: ", baseRow);
  

   var baseCol = (gridIndex%3)*3;
   isPrinting && console.log("base col: ", baseCol);
   var posIndex = 0; //for gridPos.
    for (let i = baseRow; i < baseRow+3; i++){
        for (let j = baseCol; j < baseCol+3; j++){
          //  console.log("row, col",i,j, "pos: ", posIndex);
            gridPos[posIndex++] = possArray[i][j];
        }
    }
    isPrinting && console.log("grid ", gridIndex, " before change: ");
    isPrinting && console.log(printSingleGrid(possArray, gridIndex));
 //  console.log("gridPos: ", gridPos);
    //get indexes of each number
    //and get their count
    var indexesOfEachNumber = new Array(9).fill("");
    var countOfNumber = new Array(9).fill("");
    var possCount = new Array(9).fill("");
    for (let col = 0; col < n; col++) {
        for (let number = 1; number <= 9; number++) {
            if (gridPos[col].includes(`${number}`)) {
                indexesOfEachNumber[number-1] += `${col}`;
                countOfNumber[number-1]++;
                possCount[col]++;
            }
        }
    }

    //console.log(gridPos, "posscount: ", possCount);
    //console.log(indexesOfEachNumber, countOfNumber);
    var indexesChanged = "";
    for ( let number = 1; number <= 9; number++){
        //look for unique possibility of 1. Make sure there are possibilities to remove
        if (countOfNumber[number - 1] === 1 && possCount[indexesOfEachNumber[number - 1]] > 1) { //found hidden unique possibility
            isPrinting && console.log("unique number in grid: ", number, getDigits(indexesOfEachNumber[number - 1]));
            for (let i = 1; i <= 9; i++) {
                if (i != number) {
                    var index = getDigits(indexesOfEachNumber[number - 1]);
                    if (gridPos[index].includes(`${i}`)) {
                        gridPos[index] = gridPos[index].replace(`${i}`, '');
                        changes++;
                        indexesChanged += `${index}`;
                    }
                    // gridPos[getDigits(indexesOfEachNumber[number-1])].replace(`${i}`, '');
                    //console.log(gridPos);
                }
            }
        }
        if (countOfNumber[number-1] === 2){
            for (let i = number+1; i < 9; i++){ //skip numbers already checked
                if (i != number){
                    if (countOfNumber[i-1] === 2 && indexesOfEachNumber[i-1] === indexesOfEachNumber[number-1]){ //hidden pair
                        var indexes = getDigits(indexesOfEachNumber[number-1]);
                        isPrinting && console.log("found hidden pair", number, i, indexes);
                        indexes.forEach((index) => {
                            if (possCount[index] > 2) { //possibilities to remove
                                //console.log("check");
                                for (let j = 1; j <= 9; j++) {
                                    if (j != i && j != number) {
                                        if (gridPos[index].includes(`${j}`)) {
                                            gridPos[index] = gridPos[index].replace(`${j}`, '');
                                            changes++;
                                            indexesChanged += `${index}`;
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        if (countOfNumber[number - 1] === 3) {
            for (let i = number+1; i <= 9; i++) { //skip numbers already checked
                if (i != number) {
                    if (countOfNumber[i - 1] === 3 && indexesOfEachNumber[i - 1] === indexesOfEachNumber[number - 1]) {
                        for (let j = i+1; j <= 9; j++) { 
                            if (j != number && j != i) { //skip numbers already checked
                                if (countOfNumber[j - 1] === 3 && indexesOfEachNumber[j - 1] === indexesOfEachNumber[number - 1]) {
                                    //found hidden tripple. remove all other possibilities from these three squares.
                                    var indexes = getDigits(indexesOfEachNumber[number - 1]);
                                    isPrinting && console.log("found hidden tripple", number, i,j, indexes);
                                    indexes.forEach((index) => {
                                        if (possCount[index] > 3) { //possibilities to remove
                                            for (let k = 1; k <= 9; k++) {
                                                if (k != number && k != i && k != j) {
                                                    if (gridPos[index].includes(`${k}`)) {
                                                        gridPos[index] = gridPos[index].replace(`${k}`, '');
                                                        changes++;
                                                        indexesChanged += `${index}`;
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    posIndex = 0;
    for (let m = baseRow; m < baseRow+3; m++){ //fill in changes.
        for (let p = baseCol; p < baseCol+3; p++){
            possArray[m][p] = gridPos[posIndex++];
        }
        
    }
   
    if (changes > 0){
        isPrinting && console.log("grid ", gridIndex, " after change: ");
        isPrinting && console.log(printSingleGrid(possArray, gridIndex));
        isPrinting && console.log("changes: ", changes);
        isPrinting && console.log("recursion call on grid: ", gridIndex);
        checkHiddenPairGrid(possArray, gridIndex); //recursion.
    } else {
        isPrinting && console.log(0, " changes");
    }
    var changedRows = ' ';
    var changedCols = ' ';
    for (let z = 0; z < 9; z++){ //recursion
        if (indexesChanged.includes(z)){ //call checkRow and Check Col on changed rows/cols.
            var rowToChange = baseRow + Math.floor(z/3);
            var colToChange = baseCol = z%3;
            if (!changedRows.includes(rowToChange)){
            changedRows += `${rowToChange}`;
            isPrinting && console.log();
            isPrinting && console.log("recursion call on row", rowToChange);
            isPrinting && console.log();
            changes += checkHiddenPairRow(possArray, possArray[rowToChange], rowToChange);
            }
            if (!changedCols.includes(z)){
                changedCols += `${colToChange}`;
                isPrinting && console.log();
                isPrinting && console.log("recursion call on col", colToChange);
                isPrinting && console.log();
                changes += checkHiddenPairCol(possArray, colToChange);
            }
        }
    }
    isPrinting && console.log("-----------------End of Grid check function call on grid", gridIndex, "-----------------------");
    return changes;
}

//checks for hidden pairs on col recursively (if a change happens, run it again)
//checks for hidden pairs on changed rows and changed 3by3 grids
function checkHiddenPairCol(possArray, col, isPrinting) {
    isPrinting && console.log('-------------Checking hidden pairs in col----------------------');
    isPrinting && console.log();
    var changes = 0;
    const n = 9;
    var colPos = new Array(n);
    // console.log("possArray", possArray);
    for (let i = 0; i < n; i++) {
        colPos[i] = possArray[i][col];
    }
    //  console.log("colPos: ", colPos);
    //get indexes of each number
    //and get their count
    var indexesOfEachNumber = new Array(9).fill("");
    var countOfNumber = new Array(9).fill("");
    var possCount = new Array(9).fill("");
    for (let col = 0; col < n; col++) {
        for (let number = 1; number <= 9; number++) {
            if (colPos[col].includes(`${number}`)) {
                indexesOfEachNumber[number - 1] += `${col}`;
                countOfNumber[number - 1]++;
                possCount[col]++;
            }
        }
    }
    isPrinting && console.log("col pos before changes: ");
    isPrinting && console.log(printCol(possArray, col));
    //console.log(colPos, "posscount: ", possCount);
    //console.log(indexesOfEachNumber, countOfNumber);
    var indexesChanged = "";
    for (let number = 1; number <= 9; number++) {
        //look for unique possibility of 1. Make sure there are possibilities to remove
        if (countOfNumber[number - 1] === 1 && possCount[indexesOfEachNumber[number - 1]] > 1) { //found hidden unique possibility
            isPrinting && console.log("found unique number in col : ", number, getDigits(indexesOfEachNumber[number - 1]));
            for (let i = 1; i <= 9; i++) {
                if (i != number) {
                    var index = getDigits(indexesOfEachNumber[number - 1]);
                    if (colPos[index].includes(`${i}`)) {
                        colPos[index] = colPos[index].replace(`${i}`, '');
                        changes++;
                        indexesChanged += `${index}`;
                    }
                    // colPos[getDigits(indexesOfEachNumber[number-1])].replace(`${i}`, '');
                    //console.log(colPos);
                }
            }
        }
        if (countOfNumber[number - 1] === 2) {
            for (let i = number + 1; i < 9; i++) { //skip numbers already checked
                if (i != number) {
                    if (countOfNumber[i - 1] === 2 && indexesOfEachNumber[i - 1] === indexesOfEachNumber[number - 1]) { //hidden pair
                        var indexes = getDigits(indexesOfEachNumber[number - 1]);
                        isPrinting && console.log("found hidden pair", number, i, indexes);
                        indexes.forEach((index) => {
                            if (possCount[index] > 2) { //possibilities to remove
                                //console.log("check");
                                for (let j = 1; j <= 9; j++) {
                                    if (j != i && j != number) {
                                        if (colPos[index].includes(`${j}`)) {
                                            colPos[index] = colPos[index].replace(`${j}`, '');
                                            changes++;
                                            indexesChanged += `${index}`;
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        if (countOfNumber[number - 1] === 3) {
            for (let i = number + 1; i <= 9; i++) { //skip numbers already checked
                if (i != number) {
                    if (countOfNumber[i - 1] === 3 && indexesOfEachNumber[i - 1] === indexesOfEachNumber[number - 1]) {
                        for (let j = i + 1; j <= 9; j++) {
                            if (j != number && j != i) { //skip numbers already checked
                                if (countOfNumber[j - 1] === 3 && indexesOfEachNumber[j - 1] === indexesOfEachNumber[number - 1]) {
                                    //found hidden tripple. remove all other possibilities from these three squares.
                                    var indexes = getDigits(indexesOfEachNumber[number - 1]);
                                    isPrinting && console.log("found hidden tripple", number, i, j, indexes);
                                    indexes.forEach((index) => {
                                        if (possCount[index] > 3) { //possibilities to remove
                                            for (let k = 1; k <= 9; k++) {
                                                if (k != number && k != i && k != j) {
                                                    if (colPos[index].includes(`${k}`)) {
                                                        colPos[index] = colPos[index].replace(`${k}`, '');
                                                        changes++;
                                                        indexesChanged += `${index}`;
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (let m = 0; m < n; m++) { //fill in changes.
        possArray[m][col] = colPos[m];
    }
    if (changes > 0) { //recursion
        isPrinting && console.log("colPos: ");
        isPrinting && console.log(printCol(possArray, col));
        isPrinting && console.log("changes: ", changes);
        isPrinting && console.log("col recursion on col", col);
        isPrinting && console.log();
        checkHiddenPairCol(possArray, col, isPrinting);
    } else {
        isPrinting && console.log(0, "changes");
    }
    if (changes > 0) {
        var changedRows = ' ';
        var changedGrids = ' ';
        for (let row = 0; row < 9; row++) { //recursion
            if (indexesChanged.includes(row)) { //call checkRow and Check Col on changed rows/cols.
                var rowToChange = row;
                var gridToChange = get3by3squareIndex(row, col);
                if (!changedRows.includes(rowToChange)) {
                    changedRows += `${rowToChange}`;
                    isPrinting && console.log();
                    isPrinting && console.log("recursion call on row", rowToChange);
                    isPrinting && console.log();
                    changes += checkHiddenPairRow(possArray, possArray[rowToChange], row, isPrinting);
                }
                if (!changedGrids.includes(gridToChange)) {
                    changedGrids += `${gridToChange}`;
                    isPrinting && console.log();
                    isPrinting && console.log("recursion call on grid", gridToChange);
                    isPrinting && console.log();
                    changes += checkHiddenPairGrid(possArray, gridToChange, isPrinting);
                }
            }
        }
    }


    isPrinting && console.log('-------------end check hidden pairs in col----------------------');
    return changes;
}

//Checks for hidden pairs in row recursively
//then checks for hidden pairs on changed cols & in changed grids
function checkHiddenPairRow(possArray, rowPos, rowNum, isPrinting){
    isPrinting && console.log('-------------Checking hidden pairs in row----------------------');
    isPrinting && console.log();
    var changes = 0;
    const n = 9;

    //get indexes of each number
    //and get their count
    var indexesOfEachNumber = new Array(9).fill("");
    var countOfNumber = new Array(9).fill("");
    var possCount = new Array(9).fill("");
    for (let col = 0; col < n; col++) {
        for (let number = 1; number <= 9; number++) {
            if (rowPos[col].includes(`${number}`)) {
                indexesOfEachNumber[number-1] += `${col}`;
                countOfNumber[number-1]++;
                possCount[col]++;
            }
        }
    }
    isPrinting && console.log("row before changes: ");
    isPrinting && console.log(printRow(rowPos));
    //console.log(rowPos, "posscount: ", possCount);
    //console.log(indexesOfEachNumber, countOfNumber);
    var indexesChanged = "";
    for ( let number = 1; number <= 9; number++){
        //look for unique possibility of 1. Make sure there are possibilities to remove
        if (countOfNumber[number - 1] === 1 && possCount[indexesOfEachNumber[number - 1]] > 1) { //found hidden unique possibility
            isPrinting && console.log("unique number in row : ", number, getDigits(indexesOfEachNumber[number - 1]));
            for (let i = 1; i <= 9; i++) {
                if (i != number) {
                    var index = getDigits(indexesOfEachNumber[number - 1]);
                    if (rowPos[index].includes(`${i}`)) {
                        rowPos[index] = rowPos[index].replace(`${i}`, '');
                        changes++;
                        indexesChanged += `${index}`;
                    }
                    // rowPos[getDigits(indexesOfEachNumber[number-1])].replace(`${i}`, '');
                    //console.log(rowPos);
                }
            }
        }
        if (countOfNumber[number-1] === 2){
            for (let i = number+1; i < 9; i++){ //skip numbers already checked
                if (i != number){
                    if (countOfNumber[i-1] === 2 && indexesOfEachNumber[i-1] === indexesOfEachNumber[number-1]){ //hidden pair
                        var indexes = getDigits(indexesOfEachNumber[number-1]);
                        isPrinting && console.log("found hidden pair", number, i, indexes);
                        indexes.forEach((index) => {
                            if (possCount[index] > 2) { //possibilities to remove
                               // console.log("check");
                                for (let j = 1; j <= 9; j++) {
                                    if (j != i && j != number) {
                                        if (rowPos[index].includes(`${j}`)) {
                                            rowPos[index] = rowPos[index].replace(`${j}`, '');
                                            changes++;
                                            indexesChanged += `${index}`;
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        if (countOfNumber[number - 1] === 3) {
            for (let i = number+1; i <= 9; i++) { //skip numbers already checked
                if (i != number) {
                    if (countOfNumber[i - 1] === 3 && indexesOfEachNumber[i - 1] === indexesOfEachNumber[number - 1]) {
                        for (let j = i+1; j <= 9; j++) { 
                            if (j != number && j != i) { //skip numbers already checked
                                if (countOfNumber[j - 1] === 3 && indexesOfEachNumber[j - 1] === indexesOfEachNumber[number - 1]) {
                                    //found hidden tripple. remove all other possibilities from these three squares.
                                    var indexes = getDigits(indexesOfEachNumber[number - 1]);
                                    isPrinting && console.log("found hidden tripple", number, i,j, indexes);
                                    indexes.forEach((index) => {
                                        if (possCount[index] > 3) { //possibilities to remove
                                          //  console.log("check");
                                            for (let k = 1; k <= 9; k++) {
                                                if (k != number && k != i && k != j) {
                                                    if (rowPos[index].includes(`${k}`)) {
                                                        rowPos[index] = rowPos[index].replace(`${k}`, '');
                                                        changes++;
                                                        indexesChanged += `${index}`;
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (changes > 0){ //recursion
        isPrinting && console.log("row recursion on: ") 
        isPrinting && console.log(printRow(rowPos));
        isPrinting && console.log( "changes this round: ", changes);
        isPrinting && console.log();
        checkHiddenPairRow(possArray, rowPos, rowNum, isPrinting);
    } else {
        isPrinting && console.log(0, "changes");
    }
    if (changes > 0 && isPrinting) {
        var changedCols = ' ';
        var changedGrids = ' ';
        for (let col = 0; col < 9; col++) { //recursion
            if (indexesChanged.includes(col)) { //call checkRow and Check Col on changed rows/cols.
                var colToChange = col;
                var gridToChange = get3by3squareIndex(rowNum, col);
                if (!changedCols.includes(colToChange)) {
                    changedCols += `${colToChange}`;
                    isPrinting && console.log();
                    isPrinting && console.log("recursion call on col", colToChange);
                    isPrinting && console.log();
                    changes += checkHiddenPairCol(possArray, col, isPrinting);
                }
                if (!changedGrids.includes(gridToChange)) {
                    changedGrids += `${gridToChange}`;
                    isPrinting && console.log();
                    isPrinting && console.log("recursion call on grid", gridToChange);
                    isPrinting && console.log();
                    changes += checkHiddenPairGrid(possArray, gridToChange, isPrinting);
                }
            }
        }
    }
    isPrinting && console.log('-------------End hidden pairs call in row----------------------');
    return changes;
}


