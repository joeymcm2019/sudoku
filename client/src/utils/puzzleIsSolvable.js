function puzzleIsSolvable(possArray) {
    var solvable = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
           // console.log(possArray[i][j]);
            if (possArray[i][j] != 'filled') {
                if (possArray[i][j].length > 1) {
                  //  console.log("puzzle is not solvable");
                    return false;
                }
            }
        }
    }
    return solvable;
}

export {puzzleIsSolvable};