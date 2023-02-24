function checkSolution(numberArray){
    var goodResult = true;
    goodResult = checkRows(numberArray);
    if (!goodResult){
        return false;
    }
    goodResult = checkCols(numberArray);
    if (!goodResult){
        return false;
    }
    goodResult = checkGrids(numberArray);
    if (!goodResult){
        return false;
    }
    return goodResult;
}

export {checkSolution};

function checkGrids(numberArray){
    var goodResult = true;
    for (let grid = 0; grid < 9; grid++){
        goodResult = checkSingleGrid(numberArray, grid);
        if (!goodResult){
            return false;
        }
    }
    return goodResult;
}

function checkSingleGrid(numberArray, grid){
    const n = 9;
   // var gridNumbers = new Array(n);
   // console.log("possArray", possArray);
   var goodResult = true;
   var baseRow = Math.floor((grid/3))*3;
   var baseCol = (grid%3)*3;
   var numbersToCheck = '123456789';
    for (let i = baseRow; i < baseRow+3; i++){
        for (let j = baseCol; j < baseCol+3; j++){
          //  console.log("row, col",i,j, "pos: ", posIndex);
            numbersToCheck = numbersToCheck.replace(numberArray[i][j], ''); //remove numbers to check.
        }
    }
    if (numbersToCheck.length === 0){
        return goodResult;
    } else {
       /// console.log("failure on grid: ", grid, numbersToCheck);
        return !goodResult;
    }
}

function checkRows(numberArray){
    var goodResult = true;
    for (let i = 0; i < 9; i++){
        goodResult = checkSingleRow(numberArray, i);
        if (!goodResult){
            return false;
        }
    }
    return goodResult;
}

function checkSingleRow(numberArray, row){
    var goodResult = true;  
    var numbersToCheck = '123456789';  
    //console.log("check number array: ", numberArray[row])
    for (let i = 0; i < 9; i++){
       // console.log("check number: ",numberArray[row][i], numbersToCheck.includes(numberArray[row][i]));
        numbersToCheck = numbersToCheck.replace(numberArray[row][i], '');
    }
    if (numbersToCheck.length === 0){
        return goodResult;
    } else{
        //console.log("failure on row ", row, numbersToCheck, numberArray[row]);
        return !goodResult;
    }
}

function checkCols(numberArray){
    var goodResult = true;
    for (let i = 0; i < 9; i++){
        goodResult = checkSingleCol(numberArray, i);
        if (!goodResult){
            return false;
        }
    }
    return goodResult;
}

function checkSingleCol(numberArray, col){
    var goodResult = true;  
    var numbersToCheck = '123456789';  
    for (let i = 0; i < 9; i++){
        numbersToCheck = numbersToCheck.replace(numberArray[i][col], '');
    }
    if (numbersToCheck.length === 0){
        return goodResult;
    } else{
        //console.log("failure on col ", col, numbersToCheck);
        return !goodResult;
    }
}



