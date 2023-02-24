import React, { useEffect, useState } from 'react';

const numberOptions = 9;
const basicChecks = false;
function NumberInterface({sendBackNumber}){


    const [numberMenu, setNumberMenu] = useState("");
    
    useEffect(() =>{
        var numbers = userInterface();
        setNumberMenu(numbers);
    }, [])

    const userInterface = () => {
        basicChecks && console.log("creating interface");
        var selectorHTML = [];
        for (let i = 1; i <= numberOptions +1; i++) {
            var numberHtml = (
                <div className='square selectorSquare' onClick={() => sendBackNumber(i)} key={i}>
                    <p>{i <= numberOptions ? i : "X"}</p>
                </div>
            )
            selectorHTML.push(numberHtml);
        }
        return (
            <div>
                <div className='puzzleBoard numberSelector'>
                    {selectorHTML}
                    
                </div>
            </div>
        )
    }

    return (
        <div>
            {numberMenu}
        </div>
    )
}

export default NumberInterface;