import React from 'react';

const Operation = ({work,dispatch}) => {
    return (
        <button className='buttons' onClick={()=>{dispatch({type:"operation",load:{work}})}}>{work}</button>

    );
};

export default Operation;