import React, { useEffect } from "react";

const Help = ({ setBell}) => {
    const  Matter=()=>{
        console.log("welcome");
    
      //  setBell((e)=>!e);
        
    }
  useEffect(() => {

    console.log(" use effect mounted" );
    return (()=>{console.log("unmounted");})
  },[]);
  return (
    <div>

      <button onClick={Matter}>i will be there</button>
    </div>
  );
};

export default Help;
