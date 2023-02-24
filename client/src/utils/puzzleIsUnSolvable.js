function puzzleIsUnSolvable(possibilityArray){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (possibilityArray[i][j] === ''){
                return true;
            }
        }
    }
    return false;
}

export {puzzleIsUnSolvable};