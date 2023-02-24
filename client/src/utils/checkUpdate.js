import { checkColTuplesWork, checkGridTuplesWork, checkRowTuplesWork, 
    rowTuplesWork, colTuplesWork, gridTuplesWork, checkUpdatePossibilityOnGrid, 
    updatePossibilityGrid, checkForAllNakedImplicitTripples, useAllNakedImplicitTripples } from './puzzleFunctionsNormal';
import { applyHiddenPairs } from './hiddenPairs';

const basicChecks = false;


//revision to make.
//use just checking first. If it returns true, use the number. If not, don't use the number.
function checkUpdate(numberArray, puzzlePossibilities, row, col, numToAdd, justChecking) {
    var filledInSpaces = 0;
    var filledIn2 = 0;
    var totalChanges = 0;
    var print = false;
    //console.log("checking update on: numarray", numberArray, "poss", puzzlePossibilities, "row", row, "col", col);
    if (numToAdd === 10){
        return true;
    }
    var changes = 0;
    var copyNumberArray = new Array(9);
    var copyPuzzlePossibilites = new Array(9);
    for (let i = 0; i < 9; i++) {
        copyNumberArray[i] = new Array(9);
        copyPuzzlePossibilites[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
            copyNumberArray[i][j] = numberArray[i][j];
            copyPuzzlePossibilites[i][j] = puzzlePossibilities[i][j];
        }
    }
    var fillingInSpaces = false;
    if (justChecking || !justChecking && checkUpdatePossibilityOnGrid(copyPuzzlePossibilites, numToAdd, row, col)
                                      && updatePossibilityGrid(copyPuzzlePossibilites, numToAdd, row, col)) { //initial check is good. Proceed
        
        if (fillingInSpaces) {
            filledInSpaces = fillInSinglePossibilities(copyNumberArray, copyPuzzlePossibilites);
        }
        basicChecks && console.log("checking----------------------------");
        if (filledInSpaces === false && filledInSpaces != 0){
            basicChecks && console.log("--------------------fillInSinglePoss failed", filledInSpaces);
            return false;
        }
        do {
            changes = 0;
            try {
            var colChanges, rowChanges, gridChanges = 0;
            var implicitNakedTrippleChanges = 0;
            if (checkColTuplesWork(copyPuzzlePossibilites)) {
                colChanges = colTuplesWork(copyPuzzlePossibilites);
            } else {
                basicChecks && console.log("checkUpdate: error in colTuples");
                return false;
            }
            if (checkRowTuplesWork(copyPuzzlePossibilites)) {
                rowChanges = rowTuplesWork(copyPuzzlePossibilites);
            } else {
                basicChecks && console.log("checkUpdate: error in rowTuples");
                return false;
            }
            if (checkGridTuplesWork(copyPuzzlePossibilites)) {
                gridChanges = gridTuplesWork(copyPuzzlePossibilites);
            } else {
                basicChecks && console.log("checkUpdate: error in gridTuples");
                return false;
            }
            if (checkForAllNakedImplicitTripples(copyPuzzlePossibilites)){
                implicitNakedTrippleChanges = useAllNakedImplicitTripples(copyPuzzlePossibilites);
            } else {
                basicChecks && console.log("checkUpdate: error in naked implicit tripples");
                return false;
            }
            } catch (tuplesError){
                basicChecks && console.log("error in tuples: ", "leaving checkUpdate");
                return false;
            }
            basicChecks && console.log(`col changes: ${colChanges} row changes: ${rowChanges} grid changes: ${gridChanges} I.N.T: ${implicitNakedTrippleChanges}`);
            var hiddenChanges = applyHiddenPairs(copyPuzzlePossibilites, false);
            print && console.log("changes from hidden pairs: ", hiddenChanges);
            changes += colChanges + rowChanges + gridChanges + hiddenChanges + implicitNakedTrippleChanges;
            totalChanges += changes;
            // if (justChecking){
            //     console.log("totalChanges: ", totalChanges);
            // }
            basicChecks && console.log("changes: ", changes);
            if (changes > 0) {
                if (filledInSpaces){
                    filledIn2 = fillInSinglePossibilities(copyNumberArray, copyPuzzlePossibilites);
                }
                if (filledIn2 === false && filledIn2 != 0) {
                    basicChecks && console.log("fillInSinglePoss try 2 failed", filledIn2);
                    return false;
                }  
            }
        } while (changes > 0);
    } else {
        basicChecks && console.log("check update failed on possibility grid failed");
        basicChecks && console.log("copyPuzzle: ", copyPuzzlePossibilites, "numToAdd: ", numToAdd, "row", row, "col: ", col);
        return false;
    }
    if (justChecking || !justChecking && checkUpdatePossibilityOnGrid(copyPuzzlePossibilites,numToAdd,row,col)){
       basicChecks && console.log("end result: numberArray", copyNumberArray, "poss: ", "copy poss", copyPuzzlePossibilites);
        if (!justChecking) {
            for (let y = 0; y < 9; y++) { //update arrays we were given
                for (let z = 0; z < 9; z++) {
                    numberArray[y][z] = copyNumberArray[y][z];
                    puzzlePossibilities[y][z] = copyPuzzlePossibilites[y][z];
                }
            }
            basicChecks && console.log("total changes: ", filledInSpaces+filledIn2);
            return true;
        } else { //just checking
            return totalChanges;
        }
    } else {
        return false;
    }
}

export {checkUpdate}


function fillInSinglePossibilities(numberArray, possArray){
    var print = false;
    var changes = 0;
    print && console.log("fillInSinglePoss: ", "numArray", numberArray, "poss", possArray);
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (possArray[i][j].length === 1){
               print && console.log("one poss: row: ", i, "col: ", j, "value:", possArray[i][j]);
                var numToAdd = getDigitsFromPoss(possArray[i][j]);
                if (checkUpdatePossibilityOnGrid(possArray, numToAdd, i, j)){
                    print && console.log("before update: fill in singles: ", possArray);
                    updatePossibilityGrid(possArray,numToAdd,i,j);
                    print && console.log("updated: poss grid: ", possArray);
                    numberArray[i][j] = numToAdd;
                    changes++;
                } else {
                    return false;
                }
            }
        }
    }
    var filledIn3 = 0;
    if (changes > 0){
        basicChecks && console.log("recursive call on fillInSinglePoss");
        filledIn3 = fillInSinglePossibilities(numberArray, possArray);
        if (filledIn3 === false && filledIn3 != 0){
            basicChecks && console.log("error in fill3", filledIn3);
            return false;
        }
    }
    return changes + filledIn3;
}


function getDigitsFromPoss(numberStr) {
    var digits = "error";
    if (numberStr.length > 1){
        print && console.log("error: more than one poss left");
        return digits;
    }
    for (let i = 1; i <= 9; i++) {
        if (numberStr.includes(i)) {
            digits = i;
        }
    }
    return digits;
}

//console.log(getDigitsFromPoss('1'));