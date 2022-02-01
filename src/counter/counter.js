import React, { useEffect, useLayoutEffect, useState } from "react";
import Help from "./help";
import Reducerdemo from "./reducerdemo";

const Counter = () => {
  const [bell, setBell] = useState(true);
 // const [count, setCount] = useState(0);
  console.log(bell);
  const Welcome = () => {
    // setCount(count + 1);
    // if (count == 2) {
    //   setCount(0);
     setBell((prev) => !prev);

    // } else {
    //   console.log("clickagain until count=2"+"       " + count);
    // }
  };
  useLayoutEffect(()=>{
      console.log("use layouteffect");
  },[])
  useEffect(() => {
    console.log("use effect called   bell changed");

  }, []);

  return (
    <div>
      {" "}
      <button onClick={Welcome}>Click me</button>
      {bell && <Help setBell={setBell} />}
      
    </div>
  );
};
export default Counter;
