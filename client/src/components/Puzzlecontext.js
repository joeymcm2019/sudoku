import React, { useState } from "react";

const PuzzleContext = React.createContext([{}, () => {}]);

let initialState = {};

const PuzzleProvider = (props) => {
    const [puzzle, setPuzzle] = useState(initialState);
    
    return (
        <PuzzleContext.Provider value={[puzzle, setPuzzle]}>
            {props.children}
        </PuzzleContext.Provider>
    );
}

export { PuzzleContext, PuzzleProvider };
