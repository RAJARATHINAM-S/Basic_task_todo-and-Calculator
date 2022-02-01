import React, { useEffect, useReducer, useRef, useState } from "react";
import "../src/task.css";
const added = (add, sub) => {
  switch (sub.type) {
    case "add": {
      return [...add, sub.load];
    }
    case "delete": {
      return add.filter((data) => {
        return sub.load !== data;
      });
    }
    case "update": {
      console.log(sub.load);

      return sub.load;
    }
  }
  console.log(add);
};
const Taskmanager = () => {
  const [add, sub] = useReducer(added, []);
  const addref = useRef();
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (fetch === true) {
      return window.localStorage.setItem("data", JSON.stringify(add));
    } else {
      sub({
        type: "update",
        load: JSON.parse(window.localStorage.getItem("data")),
      });
      setFetch(true);
    }
  }, [add, fetch]);

  console.log(add);
  return (
    <div className="container">
      <div className="addtask">
        <input className="ip" ref={addref} autoFocus />{" "}
        <button
          onClick={() => {
            sub({ type: "add", load: addref.current.value });
            addref.current.value = "";
          }}
        >
          Add
        </button>
      </div>
      <div className="textbox">
        {add.map((data, index) => {
        //    let key=index;
        //    console.log(key);
          return (
            <div className="box">
              <span>
                {data}
                {/* {console.log(data)} */}
              </span>
              <button className="butto"
                onClick={() => {
                  sub({ type: "delete", load: data });
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Taskmanager;
