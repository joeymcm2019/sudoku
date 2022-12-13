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


function Square({position, row, col}){

    const classNameString = 'square' + getClassNameString(row, col);
    const [number, setNumber] = useState("");

    //Selects square when clicked on.
    //Two different cases. Clicks on div or clicks on number.
    const handleDivClick = (e) => {
        e.preventDefault();
        try {
            var a = e.target;
            if (a.parentNode.attributes.name.value === "squareDiv"){
                console.log("yeah baby");  
            } else {
                a = e.target.children.item("id");
            }
            console.log(a.innerHTML);
            if (a.innerHTML === ""){ //blank square.
                //console.log('yay');
            }
            //square successfully selected
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className={classNameString} onClick={handleDivClick} name="squareDiv" id={-position}>
        <p className="numberDisplay" id={position}></p>
        </div>
    );
}

export default Square;