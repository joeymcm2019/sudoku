const puzzleSize = 9;

// num >0
function getRow(num){
    if (num === 0){
        console.log("error: get row. num is 0");
    }
    return Math.floor((num-1)/9);
}

export {getRow};

function getCol(num){
    var row = getRow(num);
    return num-row*9-1;
}

export {getCol};

function validOption(puzzleArray, row, col, numToAdd){
    //console.log("uhhhhhh");
    var validplacement = true;
    for (let i = 0; i < 9; i++){
        if (i != col){
            if (puzzleArray[row][i] === numToAdd){
                //console.log("invalid placement")
                return false;
            }
        }
        if (i != row){
            if (puzzleArray[i][col] === numToAdd){
                //console.log("invalid placement");
                return false;
            }
        }
    }
    var gridIndex3by3 = get3by3squareIndex(row,col);
    var {baseRow, baseCol} = getSquareBaseIndex(gridIndex3by3);
   // console.log(baseRow, baseCol);
    for (let i = 0; i < 3; i++) { //checking 3by3 grid
        for (let j = 0; j < 3; j++) {
            if (!((baseRow+i === row) && (baseCol + j === col))) { 
                if (puzzleArray[baseRow+i][baseCol+j] === numToAdd) {
                    //console.log("invalid placement");
                    return false;
                }
            }
        }
    }
    return validplacement;

}

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

function fillPossibilities(puzzleArray){
    //console.log("puzzle: !!!!!!!!!!!!!!!!!!!!!!!!!!!! " + puzzleArray);
    var puzzlePossibilities = new Array(puzzleSize);
    for (let i = 0; i < 9; i++) {
        puzzlePossibilities[i] = new Array(puzzleSize);
        for (let j = 0; j < 9; j++) {
            
            try {    
                var a = document.getElementById(i*9+j+1);
                // console.log("a: " + a);
                if (a != undefined) {
                    if (a.innerHTML === "") {
                        //console.log(i);
                       // console.log("working on blank space", i, j);
                        // puzzlePossibilities[row][col] = new Array(puzzleSize);
                        puzzlePossibilities[i][j] = fillSquarePossibilities(puzzleArray, i, j);
                    }
                }
            } catch (error) {
                //console.log("error: row, col:", i, j);
            }

        }
    }
    return puzzlePossibilities;
}

export {fillPossibilities};

function fillSquarePossibilities(puzzleArray, row, col){
    //console.log("filling: ", row, col);
    var squarePossibilities = "";
    for (let i = 1; i <= 9; i++){
        if (validOption(puzzleArray, row, col, i)){
            
            squarePossibilities += i + " ";
            
        }
    }
   // console.log("square poss: " + squarePossibilities);
    if (squarePossibilities === ""){
        console.log("no possibilities");
        var header = document.getElementById(1000);
        var msg = document.createElement('p');
        msg.setAttribute("class", "status")
        msg.innerHTML = `Found no possibilites for a square: row: ${row+1} col: ${col+1}. Recommend refreshing page`;
        header.appendChild(msg);
    }
    return squarePossibilities;
}