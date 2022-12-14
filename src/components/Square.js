import React, { useState } from 'react';
import Possiblities from './Possibilities';

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


function Square({position, row, col, number}){

    const classNameString = 'square' + getClassNameString(row, col);
    const [currentNumber, setCurrentNumber] = useState(number);

    //Selects square when clicked on.
    //Two different cases. Clicks on div or clicks on number.
    const handleDivClick = (e) => {
        console.log("number " + number);
        setCurrentNumber(number);
        e.preventDefault();
        try {
            var a = e.target;
            if (a.parentNode.attributes.name.value === "squareDiv"){
                //console.log("yeah baby");  
            } else {
                a = e.target.children.item("id");
            }
          //  console.log(a.innerHTML);
            if (a.innerHTML === ""){ //blank square.
                //console.log('yay');
            }
            //square successfully selected
        } catch(err){
            console.log(err);
        }
    }


    const changeNumber = () => {
        console.log("change number");
        setCurrentNumber(number);
    }
    console.log("number " + number);

    return (
        <div className={classNameString} onClick={handleDivClick} name="squareDiv" id={-position}>
        <p className="numberDisplay"  onInput={changeNumber} id={position}>{currentNumber != -1 && currentNumber}</p>
        </div>
    );
}

export default Square;