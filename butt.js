import React from "react";

const Butt = ({ digit, dispatch, work }) => {
  return (
    <>
      <button
        className="buttons"
        onClick={() => {
          dispatch({ type: "num_digit", load: { digit } })
            
        }}
      >
        {digit || work}
      </button>
    </>
  );
};

export default Butt;
