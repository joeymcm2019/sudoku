import React, { useState } from 'react';


function MiniSquare({number}) {
    return (
        <div className='miniSquare'>
        <p className='mini'>{number != -1 && number}</p>
        </div>
    )
}

export default MiniSquare;