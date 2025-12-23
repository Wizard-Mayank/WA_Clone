import React, { useState, useContext } from "react";
import "tailwindcss";

const contextWrapper = React.createContext();

// whoever child wants to get gp msg, use this function
function useGetMessage() {
  return useContext(contextWrapper);
}

function Grandparent() {
  const contextMsg = useGetMessage();
  contextMsg.setMessage("This is the message from your gp, my child!");
  return (
    <div className="ring-black ring-1">
      <h3>I am GrandParent</h3>
      <Parent></Parent>
    </div>
  );
}
function Parent() {
  return (
    <div className="ring-black ring-1">
      <h3>I am Parent</h3>
      <Children></Children>
    </div>
  );
}

function Children() {
  const msg = useGetMessage();
  return (
    <div className="ring-black ring-1">
      <h3>I am children</h3>
      <p>Message passed from gp : {msg.message}</p>
    </div>
  );
}

function Context() {
  const [message, setMessage] = useState("");
  return (
    <div>
      <contextWrapper.Provider value={{ message, setMessage }}>
        <Grandparent></Grandparent>
      </contextWrapper.Provider>
    </div>
  );
}

export default Context;
