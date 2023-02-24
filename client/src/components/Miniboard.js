import React from 'react';
import MiniSquare from './MiniSquare';

function fillIn(numberToFill, numberArray){
  //  console.log(numberToFill);
   // console.log(numberArray);
   if (numberArray === undefined){
   // console.log("Undefined number array");
    return -1;
   }
     if (numberArray.includes(numberToFill)){
        return numberToFill;
     } else {
        return -1;
     }
}

function Miniboard(props){
    return (
        <div>
                <div className='miniBoard'>
                    <MiniSquare number={fillIn(1, props.numberArray)}  />
                    <MiniSquare number={fillIn(2, props.numberArray)} />
                    <MiniSquare number={fillIn(3, props.numberArray)} />
                </div>
                <div className='miniBoard'>
                    <MiniSquare number={fillIn(4, props.numberArray)} />
                    <MiniSquare number={fillIn(5, props.numberArray)} />
                    <MiniSquare number={fillIn(6, props.numberArray)} />
                </div>
                <div className='miniBoard'>
                    <MiniSquare number={fillIn(7, props.numberArray)} />
                    <MiniSquare number={fillIn(8, props.numberArray)} />
                    <MiniSquare number={fillIn(9, props.numberArray)} />
                </div>
        </div>
    )
}


export default Miniboard;