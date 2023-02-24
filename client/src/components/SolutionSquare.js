import React from 'react';

const getClassNameString = (row, col) => {
    var addOn = "";
    if ((row-1)%3 === 0){
        addOn += " topBlack";
    }
    if ((col-1)%3 === 0){
        addOn += " leftBlack";
    }
    if (col === 9){
        addOn += " rightBlack"
    }
    if (row === 9){
        addOn += " bottomBlack"
    }
    return addOn;
}

function SolutionSquare({row, col, number, isStarterSquare}){

    var addOnToClassNameString = "";
    if (isStarterSquare){
        addOnToClassNameString = " starterSquare";
    }

    const baseClassString = "square" + getClassNameString(row,col) + addOnToClassNameString;


    return (
        <div className={baseClassString} name="squareDiv">
        <p className="numberDisplay">{number}</p>
        </div>
    );
}

export default SolutionSquare;