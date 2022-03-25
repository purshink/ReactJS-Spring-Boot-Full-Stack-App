import React from "react";
import { Popover } from "@varld/popover";

const DeletePopUp = () => {
  return (
    <Popover
      popover={({ visible, open, close }) => {
        return (
          <>
            I am a popover and i am {visible ? "visible" : "not visible"} and{" "}
            {open ? "open" : "not open"}
            <button onClick={() => close()}>Close me</button>
          </>
        );
      }}
    >
      <button>I have a popover</button>
    </Popover>
  );
};

export default DeletePopUp;
