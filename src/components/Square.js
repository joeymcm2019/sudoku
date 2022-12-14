import React, { useEffect, useState } from 'react';
import Possiblities from './Possibilities';
import Miniboard from './Miniboard';

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

const renderChecks = false;

function Square({row, col, number, possiblities, isStarterPiece}){

    var classNameString = 'square' + getClassNameString(row, col);
    //Selects square when clicked on.
    //Two different cases. Clicks on div or clicks on number.
    const handleDivClick = (e) => {
        e.preventDefault();
        if (isStarterPiece){
            console.log("starter piece");
        } else {
           // popUpMenu()
        }
    }

    const [addMiniBoard, setAddMiniBoard] = useState(false);
    const [startPiece, setStartPiece] = useState(isStarterPiece);
    const [options, setOptions] = useState(possiblities);

    //console.log("possibilites square: ", possiblities);
    if (renderChecks){
    console.log("number: ", number);
    }

    if (number != -1){
        classNameString += " starterSquare";
    }

    useEffect(() => {
        if (number === -1){
            setAddMiniBoard(true);
           // console.log("adding mini board: ",possiblities);
        }
    }, [number]);

    useEffect(() => {
        if (setAddMiniBoard){
       // possiblities = "1 2 3 4 5";
        //console.log("changed poss");
        }
    }, [setAddMiniBoard])

    return (
        <div className={classNameString} onClick={handleDivClick} name="squareDiv">
        <p className="numberDisplay">{number != -1 && number}</p>
        {addMiniBoard === true && <Miniboard numberArray={options}/>}
        </div>
    );
}

export default Square;