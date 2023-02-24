import React, { useContext, useEffect, useState } from 'react';
import NumberInterface from './NumberInterface';
import { PuzzleContext } from '../Puzzlecontext';


function NumberChoiceUI({handleClick}) {

   

    const [normalNumberSelectorClassName, setNormalNumberSelectorClassName] = useState("normalNumberSelector selected");
    const [possibilitySelectorClassName, setPossibilitySelectorClassName] = useState("possibilitySelector notSelected");
    const [puzzleContext, setPuzzleContext] = useContext(PuzzleContext);

    const sendBackNumber = (i) => {
        handleClick(i);
    }

    useEffect(() => {
        setPuzzleContext((prevValues) => {
            return ({...prevValues, valueTypeToChange: "normal", changingNumber: false})
        });
    }, [])

    const handleChangeNumber = () => {
        if (normalNumberSelectorClassName != "normalNumberSelector selected") {
            setNormalNumberSelectorClassName("normalNumberSelector selected");
            setPossibilitySelectorClassName("possibilitySelector notSelected");
            setPuzzleContext((prevValues) => {
                return ({...prevValues, valueTypeToChange: "normal", changingNumber: false})
            });
        }
    }

    const handleChangePossibility = () => {
        if (possibilitySelectorClassName != "possibilitySelector selected") {
            setNormalNumberSelectorClassName("normalNumberSelector notSelected");
            setPossibilitySelectorClassName("possibilitySelector selected");
            setPuzzleContext((prevValues) => {
                return ({...prevValues, valueTypeToChange: "possibility", changingNumber: false})
            });
        }
    }

    const normalOrPossibility = () => {
        return (
            <div className="normalOrPossibility" onClick={handleChangeNumber}>
                <div className={normalNumberSelectorClassName}>
                    <p>Normal</p>
                </div>
                <div className={possibilitySelectorClassName} onClick={handleChangePossibility}>
                    <p>Possibility</p>
                </div>
            </div>
        )
    }

    return (
        <div>
        {normalOrPossibility()}
        <NumberInterface sendBackNumber={sendBackNumber}/>
        </div>
        );
}
export default NumberChoiceUI;