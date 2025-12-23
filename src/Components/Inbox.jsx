import React from "react";
import { MessageSquareText } from "lucide-react";

function Inbox() {
  return (
    <>
      <MessageSquareText className="w-25 h-25" />
      <h4>select any contact to start a chat with.</h4>
    </>
  );
}

export default Inbox;
