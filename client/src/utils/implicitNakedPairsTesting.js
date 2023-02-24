//import { getRowPossibilities, updatePossibilityGridRow} from './puzzleFunctionsNormal';
//import { printRow } from './hiddenPairs';


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

function useAllNakedImplicitTripples(possibilityGrid){
var changes = 0;

for (let row = 0; row < 9; row++){ //check rows for naked pairs
    changes += checkForNakedImplicitTrippleInSet(possibilityGrid, possibilityGrid[row], row, "row");
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

// var rowTuple, rowTupleCount, rowTupleDigits;
//     var rowTupleIndexes = ""; //track in


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
                    setPossibilities = 5;//getGridPossibiliites(possibilityGrid, baseRow, baseCol);
                    gridIndexPairs = getGridIndexPairs(setIndexes, baseRow, baseCol);
                }
                if (setCount === 3 && setPossibilities > 3 && num3count < 3) {   
                    console.log("setDigits", setDigits, "pairCount", setCount, "setIndexes", setIndexes);
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
                       console.log("something went wrong in naked implicit Tripple, type: ", setType);
                        return false;
                    }
                }

            }
        }
        return true;
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
                    console.log("setDigits", setDigits, "pairCount", setCount, "setIndexes", setIndexes);
                    try {
                        setDigits.forEach((number) => {
                            if (setType === 'row'){ 
                                changes += updatePossibilityGridRow(possibilityGrid, number, setIndex, 0, setIndexes); //col doesn't matter.
                            } else if (setType === 'col'){
                                changes += updatePossibilityGridCol(possibilityGrid, number, 0, setIndex, setIndexes);
                            } else if (setType === 'grid'){
                                var {baseRow, baseCol} = getSquareBaseIndex(setIndex);
                                changes += updateGridTuples(possibilityGrid, number, baseRow, baseCol, gridIndexPairs);
                            }
                        });

                    } catch (impossibleError) {
                       console.log("something went wrong in naked implicit Tripple, type: ", setType);
                        return false;
                    }
                }

            }
        }
        return changes;
    }

    function trippleExists(setDigits, secondMatchDigits, thirdMatchDigits, numSecondPoss, numThirdPoss){
        console.log("setOne", setDigits, "setTwo", secondMatchDigits, "setThree", thirdMatchDigits, "numSecond: ", numSecondPoss, "numThird: ", numThirdPoss);
        if (numSecondPoss === 3){
            if (digitsInCommon(secondMatchDigits, thirdMatchDigits).length === thirdMatchDigits.length){
                console.log("tripple found: case 1");
                return true;

            } else {
                return false;
            }
           
        } else if (numThirdPoss === 3 && 
            digitsInCommon(secondMatchDigits, thirdMatchDigits).length === 2 &&
            digitsInCommon(setDigits, thirdMatchDigits).length === 2) { 
            console.log("tripple found: case 2");
            return true;

        } else if (numThirdPoss === 2){ //two possibilities for everything.
            var oneInCommonWithTwo = digitsInCommon(setDigits, secondMatchDigits);
            var oneInCommonWithThree = digitsInCommon(setDigits, thirdMatchDigits);
            var twoInCommonWithThree = digitsInCommon(secondMatchDigits, thirdMatchDigits);
            if (oneInCommonWithTwo.length === 1 && oneInCommonWithThree.length === 1 && twoInCommonWithThree.length === 1){
                oneInCommonWithTwo = oneInCommonWithTwo[0];
                oneInCommonWithThree = oneInCommonWithThree[0];
                twoInCommonWithThree = twoInCommonWithThree[0];
                console.log("here", oneInCommonWithTwo, oneInCommonWithThree, twoInCommonWithThree);
                if (oneInCommonWithTwo != oneInCommonWithThree && oneInCommonWithTwo != twoInCommonWithThree && oneInCommonWithThree != twoInCommonWithThree){
                    console.log("tripple found: case 3");
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

    //helper function 
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


//console.log(printRow(grid[0]));



// for (let colToCheck = col + 1; col < 9; col++) {
//     var currentSquare = possibilityRow[colToCheck];
//     if (currentSquare != "filled") {
//         var numCurrentPoss = currentSquare.length;
//         //var differenceInNumPossibilities = Math.abs(pair.length - currentSquare.length);
//         if ((numCurrentPoss >= 2) && (numCurrentPoss <= 3)) { //if # square poss > setSize, we wont find naked set
//             var currentSquareDigits = getPairDigits(currentSquare);
//             var digitsInCommon = digitsInCommon(pairDigits, currentSquareDigits);
//             //if the current possibilities are less than 
//             if (numCurrentPoss < numPairPoss && digitsInCommon === numCurrentPoss) {
                
//             }
//         }
//     }
// }
// }
// }
// }

function digitsInCommon(numberSetOne, numberSetTwo){
    var commonDigits = [];
    for (let i = 0; i < numberSetOne.length; i++){
        if (numberSetTwo.includes(numberSetOne[i])){
            commonDigits.push(numberSetOne[i]);
        }
    }
    return commonDigits;
}






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



//get row possibilities
//delete later
function getRowPossibilities(puzzle, row){
    var count = 9;
    for (let i = 0; i < 9; i++){
        if (puzzle[row][i] === "filled"){
            count--;
        }
    }
    return count;
  }

//delete later
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

//delete later
function printGrid(grid){
    var printGrid = new Array(9).fill('');
    var whiteSpace;
    for (let v = 0; v < 9; v++){
        for (let w = 0; w < 9; w++){
            whiteSpace = '       ';
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


function getColPossibilities(puzzle, col){
    var count = 9;
    for (let i = 0; i < 9; i++){
        if (puzzle[i][col] === "filled"){
            count--;
        }
    }
    return count;
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




var grid1 =[['123', '123', '123', '12345', '12345', 'filled', 'filled', 'filled', 'filled'],
    ['123', '13', '12', '12345', '12345', 'filled', 'filled', 'filled', 'filled'],
    ['123', '12', '123', '12345', '12345', 'filled', 'filled', 'filled', 'filled'],
    ['12', '128', '123', '13', '12345', 'filled', 'filled', 'filled', 'filled'], /// 12 8 123 13 45
    ['12', '128', '123', '123', '12345', '12345', 'filled', 'filled', 'filled'], /// should get 12 8 123 123 45 45 
    ['12', '24', '13', '23', '12345', 'filled', 'filled', 'filled', 'filled'], /// should get 12 4 13 23 45 
    ['78', '12', '14', '23', '37', '31', '12345', 'filled', 'filled'], /// should get 78 12 4 23 7 31 45
    ['78', '12', '14', '123', '37', '31', '12345', 'filled', 'filled'], /// should get 78 123 4 23 7 31 45
    ['78', '12', '14', '23', '37', 'filled', '12345', 'filled', '123']]; ///should get 78 12 4 23 "" 45 "" 123

    var grid2 =[['12', '123', 'filled', '12345', '12345', 'filled', 'filled', 'filled', 'filled'],
    ['13', '13', '12', 'filled', '12345', 'filled', 'filled', 'filled', 'filled'],
    ['23', '12', 'filled', '12345', '12345', 'filled', 'filled', 'filled', 'filled'],
    ['12345', '128', 'filled', 'filled', '12345', 'filled', 'filled', 'filled', 'filled'], 
    ['12345', '12345', '123', '123', '12345', '12345', 'filled', 'filled', 'filled'], 
    ['12345', '12345', '13', '23', '12345', 'filled', 'filled', 'filled', 'filled'], 
    ['filled', 'filled', '14', 'filled', 'filled', '31', '12345', 'filled', 'filled'], 
    ['filled', 'filled', 'filled', '123', 'filled', '31', '12345', 'filled', 'filled'], 
    ['filled', 'filled', 'filled', 'filled', 'filled', 'filled', '12345', 'filled', '123']];


//checkForNakedImplicitTrippleInSet("", grid[0],0,"row");
// if (checkForAllNakedImplicitTripples(grid2)){
//     useAllNakedImplicitTripples(grid2);
//     printGrid(grid2);
// }
//printGrid(grid);

function get3by3squareBaseIndex(row, col) {
    return getSquareBaseIndex(Math.floor(row / 3) * 3 + Math.floor((col) / 3));
}

function getSquareBaseIndex(num){
    //const n = puzzleSize/3;
    var row = Math.floor(num/3)*3;
    var col = (num%3)*3;
    return {baseRow: row, baseCol: col}
}

//everything works
// console.log(getGridIndexPairs("012", 0, 0));
// console.log(getGridIndexPairs("345", 0, 0));
// console.log(getGridIndexPairs("678", 0, 0));
// console.log("");
// console.log(getGridIndexPairs("012", 0, 3));
// console.log(getGridIndexPairs("345", 0, 3));
// console.log(getGridIndexPairs("678", 0, 3));
// console.log("");
// console.log(getGridIndexPairs("012", 0, 6));
// console.log(getGridIndexPairs("345", 0, 6));
// console.log(getGridIndexPairs("678", 0, 6));
// console.log("");
// console.log(getGridIndexPairs("012", 3, 0));
// console.log(getGridIndexPairs("345", 3, 0));
// console.log(getGridIndexPairs("678", 3, 0));
// console.log("");
// console.log(getGridIndexPairs("012", 3, 3));
// console.log(getGridIndexPairs("345", 3, 3));
// console.log(getGridIndexPairs("678", 3, 3));
// console.log("");
// console.log(getGridIndexPairs("012", 3, 6));
// console.log(getGridIndexPairs("345", 3, 6));
// console.log(getGridIndexPairs("678", 3, 6));
// console.log("");
// console.log(getGridIndexPairs("012", 6, 0));
// console.log(getGridIndexPairs("345", 6, 0));
// console.log(getGridIndexPairs("678", 6, 0));
// console.log("");
// console.log(getGridIndexPairs("012", 6, 3));
// console.log(getGridIndexPairs("345", 6, 3));
// console.log(getGridIndexPairs("678", 6, 3));
// console.log("");
// console.log(getGridIndexPairs("012", 6, 6));
// console.log(getGridIndexPairs("345", 6, 6));
// console.log(getGridIndexPairs("678", 6, 6));
// console.log("");

var gridTest = ['filled', '348', 'filled', 'filled', '348', '38', 'filled', 'filled', '36'];
console.log(checkForNakedImplicitTrippleInSet("", gridTest, 7, 'grid'));