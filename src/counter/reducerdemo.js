import React, { useReducer } from "react";
//const intialvalue = { count: 0 };
const Welcome = (state, action) => {
  switch (action.type) {
    case "increment1":
      return { ...state, count1: state.count1 + 1 };

    case "decrement1":
      return { ...state, count1: state.count1 - 1 };
    case "increment2":
      return { ...state, count2: state.count2 + 1 };
    case "decrement2":
      return { ...state, count2: state.count2 - 1 };
    case "reset":
      return { count1: (state.count1 = 0), count2: (state.count2 = 0) };
    default:
      return Error();
  }
};

const Reducerdemo = () => {
  const [dare, setDare] = useReducer(Welcome, { count1: 0, count2: 0 });

  return (
    <div>
      <button onClick={() => setDare({ type: "increment1" })}>
        count1increment
      </button>
      {dare.count1}
      <button onClick={() => setDare({ type: "decrement1" })}>
        {" "}
        count1decrement
      </button>
      <br />
      <button onClick={() => setDare({ type: "decrement2" })}>
        count2decrement
      </button>
      {dare.count2}
      <button onClick={() => setDare({ type: "increment2" })}>
        count2increment
      </button>
      <div>
        <button onClick={() => setDare({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
};

export default Reducerdemo;
