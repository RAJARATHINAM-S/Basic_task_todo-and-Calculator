import React, { useReducer, useRef, useState } from "react";
import "../calculator/calc.css";
import Butt from "../calculator/butt";
import Operation from "./operation";

const initialvalue = {
  prevValue: null,
  currentValue: null,
  work: null,
  override: false,
};
const operation = (state, action) => {
  switch (action.type) {
    case "num_digit": {
     // //console.log("fvd", typeof state.currentValue);

      if (state.override == true) {
        //console.log(state.override, "null");
        return {
          prevValue: null,
          currentValue: action.load.digit,
          work: null,
          override: false,
        };
      }
      if (
        (state.currentValue || "").includes("0") &&
        action.load.digit === "0"
      ) {
        return state;
      }
      if (
        (state?.currentValue || "").includes(".") &&
        action.load.digit === "."
      ) {
        return state;
      }
      if (
        state.currentValue == null &&
        state.prevValue == null &&
        state.work == null
      ) {
        //console.log("nnn");
        return {
          ...state,
          currentValue: `${state.currentValue || ""}${action.load.digit}`,
        };
      }
      if (
        state.prevValue !== null &&
        state.work !== null &&
        state.currentValue == null
      ) {
        //console.log("vv cv=null");
        return {
          ...state,
          currentValue: `${state.currentValue || ""}${action.load.digit}`,
        };
      }
      if (
        state.prevValue !== null &&
        state.work !== null &&
        state.currentValue !== null
      ) {
        //console.log("digit all val");
        return {
          ...state,
          currentValue: `${state.currentValue || ""}${action.load.digit}`,
        };
      }

      if (
        state.prevValue == null &&
        state.work == null &&
        state.currentValue !== null
      ) {
        //console.log("digit null null value");
        return {
          ...state,
          currentValue: `${state.currentValue || ""}${action.load.digit}`,
        };
      }
    }
    case "operation": {
      if (state.prevValue == null && state.currentValue == null) {
        return state;
      }

      if (state.prevValue == null || state.override === true) {
        //console.log("null,null");

        return {
          ...state,
          work: action.load.work,
          prevValue: state.currentValue,
          currentValue: null,
          override: false,
        };
      }
      if (
        state.currentValue == null &&
        action.load.digit == null &&
        state.prevValue !== null &&
        state.work !== null
      ) {
        //console.log("opertion again performed");
        return {
          ...state,
             work: action.load.work,
          //   prevValue: calc(state),
          //   currentValue: null,
        };
      }
      if (
        state.currentValue !== null &&
        state.prevValue !== null &&
        state.work !== null
      ) {
        //console.log("opertion performed");
        return {
          ...state,
          work: action.load.work,
          prevValue: calc(state),
          currentValue: null,
        };
      }
    }

    case "allclear": {
      return initialvalue;
    }
    case "delete": {
      //console.log("delete");
      if (state.currentValue !== null) {
        return {
          ...state,
          currentValue:
            "" || state.currentValue.slice(0, state.currentValue.length - 1),
        };
      }
    }
    case "result": {
      if (
        state.currentValue == null ||
        state.prevValue == null ||
        state.work == null
      )
        return state;
      else //console.log(action.override);
      return {
        ...state,
        currentValue: action.value,
        prevValue: null,
        work: null,
        override: true,
      };
    }
  }
};

const calc = ({ prevValue, currentValue, work }) => {
  var value = "";

  //console.log(prevValue, currentValue, work);
  let prev = parseFloat(prevValue);
  let curr = parseFloat(currentValue);

  switch (work) {
    case "+": {
      value = prev + curr;
      //console.log(value);
      break;
    }
    case "-":
      value = prev - curr;
      //console.log(value);
      break;
    case "*":
      value = prev * curr;
      //console.log(value);
      break;
    case "/":
      value = prev / curr;
      //console.log(value);
      break;

    default:
      break;
  }
  value = value.toString();
  let result = value;
  return result;
};

const Calc = () => {
  const [{ prevValue, currentValue, work }, dispatch] = useReducer(
    operation,
    initialvalue
  );
  const submit = () => {
    
   
    let res = calc({ prevValue, currentValue, work });

    dispatch({ type: "result" || "operation", value: res, override: true });
  };

  return (
    <div className="container">
      <div className="main">
        <div className="display">
          <div className="displayinp" placeholder="display">
            {prevValue} {work}
          </div>
          {/* <div> operation:{work}</div> */}
          <div className="displayinp"> {currentValue}</div>
        </div>
        <div className="typing">
          <div className="typ1">
            <button
              className="ac buttons"
              onClick={() => dispatch({ type: "allclear" })}
            >
              AC
            </button>
            <button className='buttons' onClick={() => dispatch({ type: "delete" })}>DEL</button>
            <Operation work="/" dispatch={dispatch}>
              %
            </Operation>
          </div>
          <div className="butt">
            <Butt digit="1" dispatch={dispatch}>
              1
            </Butt>
            <Butt digit="2" dispatch={dispatch}>
              2
            </Butt>
            <Butt digit="3" dispatch={dispatch}>
              3
            </Butt>
            <Operation work="*" dispatch={dispatch}>
              *
            </Operation>
            <Butt digit="4" dispatch={dispatch}>
              4
            </Butt>
            <Butt digit="5" dispatch={dispatch}>
              5
            </Butt>
            <Butt digit="6" dispatch={dispatch}>
              6
            </Butt>
            <Operation work="+" dispatch={dispatch}>
              +
            </Operation>
            <Butt digit="7" dispatch={dispatch}>
              7
            </Butt>
            <Butt digit="8" dispatch={dispatch}>
              8
            </Butt>
            <Butt digit="9" dispatch={dispatch}>
              9
            </Butt>
            <Operation work="-" dispatch={dispatch}>
              -
            </Operation>
          </div>
          <div className="typ1">
            <Butt digit="." dispatch={dispatch}>
              .
            </Butt>
            <Butt digit="0" dispatch={dispatch} >
              0
            </Butt>
            <button className= 'buttons ac'
              onClick={() => {
                submit();
              }}
              
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calc;
